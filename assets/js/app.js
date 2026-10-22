/* ============================================================================
   The engine. You shouldn't need to edit this file to add entries —
   everything lives in entries.js.

   What happens here:
     1. entries are sorted newest-first and rendered into the feed
     2. the three timeline dials (year / month / day) are built. They all read
        the same continuous position, but each reel holds a different number
        of cells, so they travel at different rates — the year reel barely
        creeps while the day reel ticks over on every entry.
     3. #backdrop is painted with one tall gradient containing every entry's
        colour, positioned at that entry's place in the page, so each colour
        genuinely fades into the next as you scroll
     4. deep links (#slug), lightbox and filters are wired up
   ============================================================================ */

(function () {
  'use strict';

  /* ── the colour behind the hero, before the first entry takes over ── */
  const HERO_BG = '#f7e9f3';

  const KINDS = {
    'photos':      { label: 'Photos' },
    'photo-essay': { label: 'Photos + Writing' },
    'writing':     { label: 'Writing' },
    'quote':       { label: 'Quote' },
    'music':       { label: 'Music' },
  };

  const MONTHS = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

  const LINK_ICON =
    '<svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" ' +
    'stroke-width="1.8" stroke-linecap="round" aria-hidden="true">' +
    '<path d="M9.6 14.4l4.8-4.8"/>' +
    '<path d="M12.7 7.6l1.7-1.7a3.2 3.2 0 014.5 4.5l-1.7 1.7"/>' +
    '<path d="M11.3 16.4l-1.7 1.7a3.2 3.2 0 01-4.5-4.5l1.7-1.7"/></svg>';

  const $  = (s, r) => (r || document).querySelector(s);
  const $$ = (s, r) => Array.prototype.slice.call((r || document).querySelectorAll(s));

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const wantedHash   = location.hash.replace(/^#/, '');

  const feed      = $('#feed');
  const backdrop  = $('#backdrop');
  const readout   = $('#dialReadout');
  const reels     = { year: $('#reelYear'), month: $('#reelMonth'), day: $('#reelDay') };

  let entries   = [];   // { data, el, slug }
  let visible   = [];   // subset currently shown
  let activeIdx = -1;
  let filter    = 'all';

  /* while a jump is animating we still move the dials, but we stop the
     scroll-spy from rewriting the address bar — otherwise the hash flickers
     through every entry the scroll passes on the way */
  let hashLockUntil = 0;
  const hashLocked = () => Date.now() < hashLockUntil;

  /* ======================================================================
     small helpers
     ====================================================================== */

  function esc(s) {
    return String(s == null ? '' : s)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
  }

  function slugify(s) {
    return String(s).toLowerCase().trim()
      .replace(/[^\w\s-]/g, '')
      .replace(/[\s_]+/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '');
  }

  function parseDate(iso) {
    const m = /^(\d{4})-(\d{2})-(\d{2})/.exec(String(iso || ''));
    if (!m) return { y: 0, m: 0, d: 0, bad: true };
    return { y: +m[1], m: +m[2], d: +m[3] };
  }

  const clamp = (v, lo, hi) => Math.max(lo, Math.min(hi, v));

  /* deterministic pseudo-random, so generated art is stable per seed */
  function seedOf(str) {
    let h = 2166136261;
    for (let i = 0; i < str.length; i++) { h ^= str.charCodeAt(i); h = Math.imul(h, 16777619); }
    return h >>> 0;
  }
  function rng(seed) {
    let a = seed;
    return function () {
      a = (a + 0x6D2B79F5) | 0;
      let t = Math.imul(a ^ (a >>> 15), 1 | a);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }

  /* abstract pastel stand-in for a photo you haven't added yet */
  function placeholderArt(seedStr) {
    const r = rng(seedOf(seedStr));
    const baseHue = Math.floor(r() * 360);
    const blobs = [];
    for (let i = 0; i < 5; i++) {
      const hue = (baseHue + i * 47 + r() * 30) % 360;
      blobs.push(
        '<circle cx="' + (60 + r() * 480).toFixed(0) +
        '" cy="' + (60 + r() * 630).toFixed(0) +
        '" r="' + (90 + r() * 180).toFixed(0) +
        '" fill="hsl(' + hue.toFixed(0) + ',72%,' + (74 + r() * 12).toFixed(0) + '%)"/>'
      );
    }
    const svg =
      '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 750">' +
        '<defs><filter id="b" x="-30%" y="-30%" width="160%" height="160%">' +
          '<feGaussianBlur stdDeviation="55"/></filter></defs>' +
        '<rect width="600" height="750" fill="hsl(' + baseHue + ',55%,93%)"/>' +
        '<g filter="url(#b)">' + blobs.join('') + '</g>' +
        '<rect width="600" height="750" fill="none" stroke="rgba(255,255,255,.5)" stroke-width="2"/>' +
      '</svg>';
    return 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svg);
  }

  function imgSrc(src, seed) {
    if (!src || /^placeholder:/i.test(src)) {
      return placeholderArt(src ? src.replace(/^placeholder:/i, '') : seed);
    }
    return src;
  }

  /* Spotify share link -> embeddable player URL */
  function spotifyEmbed(url) {
    const m = /(?:open\.spotify\.com\/(?:intl-\w+\/)?|spotify:)(track|album|playlist|episode|show|artist)[/:]([A-Za-z0-9]+)/.exec(String(url));
    if (!m) return null;
    return 'https://open.spotify.com/embed/' + m[1] + '/' + m[2] + '?utm_source=generator&theme=0';
  }

  /* ======================================================================
     build the entry list
     ====================================================================== */

  function prepare() {
    const raw = Array.isArray(window.ENTRIES) ? window.ENTRIES.slice() : [];

    raw.sort((a, b) => String(b.date || '').localeCompare(String(a.date || '')));

    const used = Object.create(null);

    entries = raw.map(function (data, i) {
      let slug = data.slug ? slugify(data.slug)
               : slugify((data.title || (KINDS[data.type] || {}).label || 'entry') + '-' + (data.date || i));
      if (!slug) slug = 'entry-' + (i + 1);
      while (used[slug]) slug = slug + '-2';
      used[slug] = true;
      return { data: data, slug: slug, el: null };
    });
  }

  /* ======================================================================
     render one entry
     ====================================================================== */

  function galleryHTML(photos, cols, seed) {
    if (!photos || !photos.length) return '';
    const n = clamp(cols || (photos.length === 1 ? 1 : 2), 1, 3);
    const shots = photos.map(function (p, i) {
      const src = imgSrc(p.src, seed + '-' + i);
      return '<figure class="shot" data-full="' + esc(src) + '" data-cap="' + esc(p.caption || p.alt || '') + '">' +
               '<img src="' + esc(src) + '" alt="' + esc(p.alt || '') + '" loading="lazy" decoding="async">' +
               (p.caption ? '<figcaption>' + esc(p.caption) + '</figcaption>' : '') +
             '</figure>';
    }).join('');
    return '<div class="gallery cols-' + n + '">' + shots + '</div>';
  }

  function proseHTML(body, dropcap) {
    if (!body) return '';
    return '<div class="prose' + (dropcap ? ' dropcap' : '') + '">' + window.md.render(body) + '</div>';
  }

  function headHTML(e, slug) {
    const kind = KINDS[e.type] || { label: e.type || 'Entry' };
    const d = parseDate(e.date);
    const pretty = d.bad ? '' : MONTHS[d.m - 1] + ' ' + d.d + ', ' + d.y;
    return '<div class="e-head">' +
             '<span class="e-meta">' +
               '<span class="e-kind">' + esc(kind.label) + '</span>' +
               (pretty ? '<time datetime="' + esc(e.date) + '">' + pretty + '</time>' : '') +
             '</span>' +
             '<button class="e-link" data-slug="' + esc(slug) + '" ' +
                     'title="Copy a link straight to this entry" ' +
                     'aria-label="Copy link to this entry">' + LINK_ICON + '</button>' +
           '</div>';
  }

  function renderEntry(item) {
    const e = item.data;
    const sec = document.createElement('section');
    sec.className = 'entry';
    sec.id = item.slug;
    sec.dataset.bg = e.bg || HERO_BG;
    sec.dataset.type = e.type || 'writing';

    let inner = headHTML(e, item.slug);

    if (e.type === 'quote') {
      inner += '<blockquote class="quote">' +
                 '<p class="quote-text">' + window.md.fmt(e.quote || '') + '</p>' +
                 (e.by ? '<p class="quote-by">&mdash; ' + esc(e.by) + '</p>' : '') +
               '</blockquote>';
      if (e.body) inner += '<div class="prose quote-note">' + window.md.render(e.body) + '</div>';

    } else if (e.type === 'photos') {
      if (e.title) inner += '<h2 class="e-title">' + esc(e.title) + '</h2>';
      inner += galleryHTML(e.photos, e.cols, item.slug);

    } else if (e.type === 'photo-essay') {
      if (e.title) inner += '<h2 class="e-title">' + esc(e.title) + '</h2>';
      inner += '<div class="essay' + (e.flip ? ' flip' : '') + '">' +
                 galleryHTML(e.photos, e.cols, item.slug) +
                 proseHTML(e.body, e.dropcap) +
               '</div>';

    } else if (e.type === 'music') {
      if (e.title) inner += '<h2 class="e-title">' + esc(e.title) + '</h2>';
      const embed = spotifyEmbed(e.spotify);
      const player = embed
        ? '<iframe class="music-embed" src="' + esc(embed) + '" title="' + esc((e.title || 'Spotify') + ' \u2014 Spotify player') + '" ' +
          'loading="lazy" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"></iframe>'
        : '<a class="music-card" href="' + esc(e.link || '#') + '" target="_blank" rel="noopener noreferrer">' +
            '<div class="mc-art" aria-hidden="true"></div>' +
            '<div class="mc-track">' + esc(e.track || e.title || 'Untitled') + '</div>' +
            '<div class="mc-artist">' + esc(e.artist || '') + '</div>' +
            '<div class="mc-cta">Listen &nearr;</div>' +
          '</a>';
      inner += '<div class="music">' + player + proseHTML(e.body, e.dropcap) + '</div>';

    } else {
      if (e.title) inner += '<h2 class="e-title">' + esc(e.title) + '</h2>';
      inner += proseHTML(e.body, e.dropcap);
    }

    sec.innerHTML = inner;
    item.el = sec;
    return sec;
  }

  function renderFeed() {
    const frag = document.createDocumentFragment();
    entries.forEach(function (item) { frag.appendChild(renderEntry(item)); });
    feed.appendChild(frag);
  }

  /* ======================================================================
     THE DIALS
     ====================================================================== */

  /* per-entry index into each reel */
  let yearOf = [], monthOf = [];
  let geom = { cell: 38, dial: 342 };

  function buildDials() {
    const years = [], months = [];
    yearOf = []; monthOf = [];

    visible.forEach(function (item, i) {
      const d = parseDate(item.data.date);

      let yi = -1;
      for (let k = 0; k < years.length; k++) if (years[k].y === d.y) { yi = k; break; }
      if (yi === -1) { years.push({ y: d.y, idx: i }); yi = years.length - 1; }

      let mi = -1;
      for (let k = 0; k < months.length; k++) if (months[k].y === d.y && months[k].m === d.m) { mi = k; break; }
      if (mi === -1) { months.push({ y: d.y, m: d.m, idx: i }); mi = months.length - 1; }

      yearOf.push(yi);
      monthOf.push(mi);
    });

    fillReel(reels.year,  years.map(r => ({ label: r.bad ? '----' : String(r.y), idx: r.idx })));
    fillReel(reels.month, months.map(r => ({ label: (MONTHS[r.m - 1] || '---').toUpperCase(), idx: r.idx })));
    fillReel(reels.day,   visible.map(function (item, i) {
      const d = parseDate(item.data.date);
      return { label: d.bad ? '--' : String(d.d).padStart(2, '0'), idx: i };
    }));

    measureDials();
  }

  function fillReel(reel, cells) {
    if (!reel) return;
    reel.innerHTML = cells.map(function (c) {
      return '<li class="cell"><button type="button" data-idx="' + c.idx + '">' + esc(c.label) + '</button></li>';
    }).join('');
  }

  function measureDials() {
    const dial = $('.dial');
    const cell = reels.day && reels.day.firstElementChild;
    if (dial && dial.clientHeight) geom.dial = dial.clientHeight;
    if (cell && cell.offsetHeight) geom.cell = cell.offsetHeight;
  }

  function placeReel(reel, pos) {
    if (!reel) return;
    const y = geom.dial / 2 - geom.cell / 2 - pos * geom.cell;
    reel.style.transform = 'translate3d(0,' + y.toFixed(2) + 'px,0)';

    const read = Math.round(pos);
    const cells = reel.children;
    for (let k = 0; k < cells.length; k++) {
      const dist = Math.abs(k - pos);
      const btn = cells[k].firstElementChild;
      if (btn) {
        btn.style.opacity = (clamp(1 - dist * 0.4, 0, 1) * 0.86 + 0.14).toFixed(3);
        btn.style.transform = 'scale(' + clamp(1 - dist * 0.075, 0.78, 1).toFixed(3) + ')';
      }
      const isRead = k === read;
      if (cells[k].classList.contains('is-read') !== isRead) {
        cells[k].classList.toggle('is-read', isRead);
      }
    }
  }

  /* p is a fractional entry index: 2.5 means "halfway between entry 2 and 3" */
  function layoutDials(p) {
    if (!visible.length) return;
    const i0 = clamp(Math.floor(p), 0, visible.length - 1);
    const i1 = clamp(i0 + 1, 0, visible.length - 1);
    const f  = p - i0;

    placeReel(reels.year,  yearOf[i0]  + (yearOf[i1]  - yearOf[i0])  * f);
    placeReel(reels.month, monthOf[i0] + (monthOf[i1] - monthOf[i0]) * f);
    placeReel(reels.day,   p);
  }

  /* the reels carry a little weight instead of snapping to the scrollbar */
  let targetP = 0, shownP = 0, dialRaf = null;

  function spinDials() {
    const diff = targetP - shownP;
    if (Math.abs(diff) < 0.0008) {
      shownP = targetP;
      layoutDials(shownP);
      dialRaf = null;
      return;
    }
    shownP += diff * 0.17;
    layoutDials(shownP);
    dialRaf = requestAnimationFrame(spinDials);
  }

  function setDials(p) {
    targetP = p;
    /* A hidden tab never runs rAF, so settle instantly rather than leaving
       the reels unpositioned until the tab is looked at again. */
    if (reduceMotion || document.hidden) { shownP = p; layoutDials(p); return; }
    if (!dialRaf) dialRaf = requestAnimationFrame(spinDials);
  }

  /* ======================================================================
     where are we? — the reference line the dials read from
     ====================================================================== */

  let anchors = [];

  /* The viewport line an entry has to sit on to count as "current".
     On desktop that's literally where the dial window is once the rail has
     stuck to the top — measured as an offset inside the rail, because before
     you've scrolled past the hero the rail itself is still way down the page. */
  function refLine() {
    const rail = $('.rail');
    const win  = $('.dial-window');
    if (rail && win && !window.matchMedia('(max-width: 720px)').matches) {
      const wr = win.getBoundingClientRect();
      const rr = rail.getBoundingClientRect();
      if (wr.height) return (wr.top - rr.top) + wr.height / 2;
    }
    return window.innerHeight * 0.4;
  }

  /* scrollY at which each entry sits exactly on the reference line */
  function measure() {
    const line = refLine();
    anchors = visible.map(function (item) {
      const r = item.el.getBoundingClientRect();
      return r.top + window.scrollY + r.height / 2 - line;
    });
    measureDials();
  }

  function progressAt(sy) {
    const n = anchors.length;
    if (!n) return 0;
    if (sy <= anchors[0]) return 0;
    if (sy >= anchors[n - 1]) return n - 1;
    for (let i = 0; i < n - 1; i++) {
      if (sy >= anchors[i] && sy < anchors[i + 1]) {
        const span = anchors[i + 1] - anchors[i];
        return i + (span > 0 ? (sy - anchors[i]) / span : 0);
      }
    }
    return n - 1;
  }

  function setActive(idx) {
    if (idx === activeIdx) return;
    activeIdx = idx;

    if (readout) {
      if (idx >= 0) {
        const e = visible[idx].data;
        readout.textContent = e.title || e.by || (KINDS[e.type] || {}).label || '';
      } else {
        readout.textContent = '';
      }
    }

    if (idx >= 0) {
      if (hashLocked()) return;
      const slug = visible[idx].slug;
      if (location.hash.replace(/^#/, '') !== slug) {
        history.replaceState(null, '', '#' + slug);
      }
    } else if (location.hash && !hashLocked()) {
      // up in the hero: keep the address bar clean
      history.replaceState(null, '', location.pathname + location.search);
    }
  }

  /* ======================================================================
     the gradient backdrop
     ====================================================================== */

  function paintBackdrop() {
    const docH = Math.max(
      document.documentElement.scrollHeight,
      document.body.scrollHeight
    );
    backdrop.style.height = docH + 'px';

    if (!visible.length) {
      backdrop.style.backgroundImage = 'linear-gradient(to bottom,' + HERO_BG + ',' + HERO_BG + ')';
      return;
    }

    const stops = [HERO_BG + ' 0%'];
    let lastColor = HERO_BG;

    visible.forEach(function (item) {
      const r = item.el.getBoundingClientRect();
      const center = r.top + window.scrollY + r.height / 2;
      const pct = clamp((center / docH) * 100, 0, 100);
      lastColor = item.data.bg || HERO_BG;
      stops.push(lastColor + ' ' + pct.toFixed(2) + '%');
    });

    stops.push(lastColor + ' 100%');
    backdrop.style.backgroundImage = 'linear-gradient(to bottom,' + stops.join(',') + ')';
  }

  function makeBlobs() {
    const host = $('#blobs');
    if (!host || reduceMotion) return;
    const r = rng(1337);
    const tints = ['#ffffff', '#ffd9e8', '#d4f5e9', '#dfe1ff', '#fff3c4', '#ecdcff'];
    let html = '';
    for (let i = 0; i < 6; i++) {
      const size = 26 + r() * 34;
      html += '<span style="' +
        'width:' + size.toFixed(1) + 'vw;height:' + size.toFixed(1) + 'vw;' +
        'left:' + (r() * 92).toFixed(1) + 'vw;top:' + (r() * 88).toFixed(1) + 'vh;' +
        'background:' + tints[i % tints.length] + ';' +
        'animation-duration:' + (18 + r() * 22).toFixed(1) + 's;' +
        'animation-delay:-' + (r() * 16).toFixed(1) + 's;' +
      '"></span>';
    }
    host.innerHTML = html;
  }

  /* ======================================================================
     scroll handling
     ====================================================================== */

  let ticking = false;

  /* The pill bar floats over the text, so tuck it away while the reader is
     moving forward and bring it back the moment they scroll up. */
  let lastY = 0, tucked = false;

  function updateFilterBar() {
    const bar = $('#filters');
    if (!bar) return;
    const y = window.scrollY;
    const dy = y - lastY;
    if (Math.abs(dy) < 8) return;
    lastY = y;
    const hide = dy > 0 && y > 320;
    if (hide !== tucked) {
      tucked = hide;
      bar.classList.toggle('is-tucked', hide);
    }
  }

  function update() {
    updateFilterBar();
    if (!visible.length) { setActive(-1); return; }

    const p = progressAt(window.scrollY);
    setDials(p);

    /* nothing is active while we're still up in the hero */
    const firstTop = visible[0].el.getBoundingClientRect().top;
    const past = firstTop <= refLine();
    setActive(past ? clamp(Math.round(p), 0, visible.length - 1) : -1);
  }

  /* scrolling is noisy, so coalesce it to one update per frame */
  function onScroll() {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(function () { ticking = false; update(); });
  }

  function relayout() {
    measure();
    paintBackdrop();
    update();
  }

  function observeReveal() {
    if (reduceMotion || !('IntersectionObserver' in window)) {
      entries.forEach(function (i) { i.el.classList.add('in'); });
      return;
    }
    const io = new IntersectionObserver(function (rows) {
      rows.forEach(function (row) {
        if (row.isIntersecting) { row.target.classList.add('in'); io.unobserve(row.target); }
      });
    }, { rootMargin: '0px 0px -12% 0px', threshold: 0.08 });
    entries.forEach(function (i) { io.observe(i.el); });
  }

  /* ======================================================================
     deep links
     ====================================================================== */

  function jumpTo(slug, smooth) {
    let item = null;
    for (let i = 0; i < entries.length; i++) if (entries[i].slug === slug) { item = entries[i]; break; }
    if (!item) return false;

    // if a filter is hiding it, drop back to "everything" so the link works
    if (item.el.style.display === 'none') setFilter('all');

    history.replaceState(null, '', '#' + slug);
    hashLockUntil = Date.now() + (smooth && !reduceMotion ? 1400 : 250);

    if (!smooth || reduceMotion) {
      const prev = document.documentElement.style.scrollBehavior;
      document.documentElement.style.scrollBehavior = 'auto';
      item.el.scrollIntoView({ block: 'start' });
      document.documentElement.style.scrollBehavior = prev;
    } else {
      item.el.scrollIntoView({ block: 'start', behavior: 'smooth' });
    }
    return true;
  }

  function toast(msg) {
    const t = $('#toast');
    if (!t) return;
    t.textContent = msg;
    t.classList.add('show');
    clearTimeout(toast._t);
    toast._t = setTimeout(function () { t.classList.remove('show'); }, 2200);
  }

  function copyLink(slug) {
    const url = location.origin + location.pathname + '#' + slug;

    function fallback() {
      const ta = document.createElement('textarea');
      ta.value = url;
      ta.setAttribute('readonly', '');
      ta.style.cssText = 'position:fixed;top:-1000px;opacity:0';
      document.body.appendChild(ta);
      ta.select();
      let ok = false;
      try { ok = document.execCommand('copy'); } catch (err) { ok = false; }
      document.body.removeChild(ta);
      toast(ok ? 'Link copied' : url);
    }

    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(url).then(function () { toast('Link copied'); }, fallback);
    } else {
      fallback();
    }
    history.replaceState(null, '', '#' + slug);
  }

  /* ======================================================================
     lightbox
     ====================================================================== */

  const lb = {
    root: $('#lightbox'), img: $('#lbImg'), cap: $('#lbCap'),
    list: [], i: 0, lastFocus: null,
  };

  function lbOpen(figures, index) {
    lb.list = figures.map(function (f) {
      return { src: f.dataset.full, cap: f.dataset.cap, alt: (f.querySelector('img') || {}).alt || '' };
    });
    lb.i = index;
    lb.lastFocus = document.activeElement;
    lb.root.hidden = false;
    document.body.style.overflow = 'hidden';
    lbShow();
    $('#lbClose').focus();
  }

  function lbShow() {
    const cur = lb.list[lb.i];
    if (!cur) return;
    lb.img.src = cur.src;
    lb.img.alt = cur.alt;
    lb.cap.textContent = cur.cap || '';
    const many = lb.list.length > 1;
    $('#lbPrev').style.visibility = many ? 'visible' : 'hidden';
    $('#lbNext').style.visibility = many ? 'visible' : 'hidden';
  }

  function lbClose() {
    lb.root.hidden = true;
    lb.img.src = '';
    document.body.style.overflow = '';
    if (lb.lastFocus && lb.lastFocus.focus) lb.lastFocus.focus();
  }

  function lbStep(n) {
    if (!lb.list.length) return;
    lb.i = (lb.i + n + lb.list.length) % lb.list.length;
    lbShow();
  }

  /* ======================================================================
     filters
     ====================================================================== */

  function buildFilters() {
    const host = $('#filters');
    if (!host) return;

    const present = [];
    entries.forEach(function (i) {
      const t = i.data.type;
      if (KINDS[t] && present.indexOf(t) === -1) present.push(t);
    });

    let html = '<button data-filter="all" aria-pressed="true">Everything</button>';
    present.forEach(function (t) {
      html += '<button data-filter="' + t + '" aria-pressed="false">' + esc(KINDS[t].label) + '</button>';
    });
    host.innerHTML = html;

    host.addEventListener('click', function (ev) {
      const btn = ev.target.closest('button[data-filter]');
      if (btn) setFilter(btn.dataset.filter);
    });
  }

  function setFilter(type) {
    if (filter === type) return;
    filter = type;

    $$('#filters button[data-filter]').forEach(function (b) {
      b.setAttribute('aria-pressed', String(b.dataset.filter === type));
    });

    entries.forEach(function (item) {
      const show = type === 'all' || item.data.type === type;
      item.el.style.display = show ? '' : 'none';
      if (show) item.el.classList.add('in');
    });

    visible = entries.filter(function (i) { return i.el.style.display !== 'none'; });
    activeIdx = -1;
    shownP = 0; targetP = 0;
    buildDials();
    layoutDials(0);
    relayout();
  }

  /* ======================================================================
     wire everything up
     ====================================================================== */

  function bind() {
    /* dial clicks: jump to the entry that cell represents */
    $('#dials').addEventListener('click', function (ev) {
      const btn = ev.target.closest('button[data-idx]');
      if (!btn) return;
      const item = visible[+btn.dataset.idx];
      if (item) jumpTo(item.slug, true);
    });

    /* copy-link buttons and photo clicks */
    feed.addEventListener('click', function (ev) {
      const link = ev.target.closest('.e-link');
      if (link) { copyLink(link.dataset.slug); return; }

      const fig = ev.target.closest('figure.shot');
      if (fig) {
        const figs = $$('figure.shot', fig.closest('.gallery'));
        lbOpen(figs, figs.indexOf(fig));
      }
    });

    /* lightbox */
    $('#lbClose').addEventListener('click', lbClose);
    $('#lbPrev').addEventListener('click', function () { lbStep(-1); });
    $('#lbNext').addEventListener('click', function () { lbStep(1); });
    lb.root.addEventListener('click', function (ev) {
      if (ev.target === lb.root || ev.target.classList.contains('lb-figure')) lbClose();
    });
    document.addEventListener('keydown', function (ev) {
      if (lb.root.hidden) return;
      if (ev.key === 'Escape')     { lbClose(); }
      if (ev.key === 'ArrowLeft')  { lbStep(-1); }
      if (ev.key === 'ArrowRight') { lbStep(1); }
    });

    /* scroll + resize */
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', relayout);
    window.addEventListener('orientationchange', relayout);

    /* late-loading images change the page height, so re-measure */
    window.addEventListener('load', relayout);
    $$('img', feed).forEach(function (img) {
      img.addEventListener('load', relayout, { once: true });
    });

    /* someone edits the hash, or follows an in-page link */
    window.addEventListener('hashchange', function () {
      const h = location.hash.replace(/^#/, '');
      if (h && h !== 'top' && h !== 'feed') jumpTo(h, true);
    });

    /* fonts arriving can reflow text */
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(relayout);
    }
  }

  function init() {
    if (!feed) return;

    prepare();
    renderFeed();
    visible = entries.slice();

    buildDials();
    layoutDials(0);
    buildFilters();
    makeBlobs();
    observeReveal();
    bind();
    relayout();

    /* honour a #slug the visitor arrived with */
    requestAnimationFrame(function () {
      if (wantedHash && wantedHash !== 'top' && wantedHash !== 'feed') {
        jumpTo(wantedHash, false);
      }
      relayout();
    });

    /* one more pass once fonts and images have settled */
    setTimeout(relayout, 600);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
