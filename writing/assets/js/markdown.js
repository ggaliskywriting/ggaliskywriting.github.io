/* ============================================================
   A very small Markdown subset, so entries can be written in
   plain text instead of HTML.

   Supported:
     ## Heading          ### Smaller heading
     **bold**            *italic*
     [text](https://…)
     > blockquote
     - bullet list       1. numbered list
     ---                 (horizontal rule)
     `code`
     blank line          = new paragraph

     ![what it shows](images/photo.jpg)
     ![what it shows](images/photo.jpg "a caption under the photo")

   A photo on its own line drops into the writing full width. Put two or
   more on consecutive lines and they share a row instead. Either way they
   open in the lightbox when clicked.

   Everything is HTML-escaped first, so pasting <, > or & is safe.
   ============================================================ */

window.md = (function () {

  function esc(s) {
    return String(s)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');
  }

  // for anything going inside a quoted HTML attribute
  function escAttr(s) {
    return esc(s == null ? '' : s).replace(/"/g, '&quot;').replace(/'/g, '&#39;');
  }

  /* A photo path is nearly always a plain relative one like
     images/foo.jpg. Anything carrying a scheme has to be a real image
     source, so that a pasted 'javascript:' can't ride in on an img tag. */
  function imgSrc(src) {
    const s = String(src).trim();
    if (!/^[a-z0-9+.-]+:/i.test(s)) return s;              // relative, fine
    return /^(https?:|data:image\/)/i.test(s) ? s : '';
  }

  // inline: code -> images -> links -> bold -> italic.
  // Images come before links so that the '[...](...)' inside an image
  // doesn't get picked up as a link, leaving a stray '!' behind.
  function inline(s) {
    return s
      .replace(/`([^`]+)`/g, (_, c) => '<code>' + c + '</code>')
      .replace(/!\[([^\]]*)\]\(\s*([^)\s"]+)[^)]*\)/g, (_, alt, src) =>
        `<img src="${escAttr(imgSrc(src))}" alt="${escAttr(alt)}" loading="lazy" decoding="async">`)
      .replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, (_, t, href) => {
        const safe = /^(https?:|mailto:|#|\/|\.)/i.test(href) ? href : '#';
        const ext = /^https?:/i.test(safe) ? ' target="_blank" rel="noopener noreferrer"' : '';
        return `<a href="${safe}"${ext}>${t}</a>`;
      })
      .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
      .replace(/(^|[^*])\*([^*\n]+)\*/g, '$1<em>$2</em>');
  }

  // text -> safe HTML. Escaping happens here, at emit time, so that the
  // structural parsing below still sees real '>' and '<' characters.
  function fmt(s) { return inline(esc(s)); }

  function render(src) {
    if (!src) return '';

    // normalise newlines, strip the leading indentation that comes from
    // writing template literals inside an indented object
    const lines = String(src).replace(/\r\n?/g, '\n').split('\n');
    const trimmed = lines.map(l => l.replace(/^[ \t]+/, ''));

    const out = [];
    let para = [];
    let list = null;      // 'ul' | 'ol' | null
    let quote = [];
    let shots = [];       // a run of photos written on consecutive lines

    const flushPara = () => {
      if (para.length) { out.push('<p>' + fmt(para.join(' ')) + '</p>'); para = []; }
    };
    /* One photo gets the full column; a run of them shares a row, which
       keeps a long stretch of pictures from pushing the writing apart.
       The markup matches the galleries app.js builds, so these open in
       the lightbox too. */
    const flushShots = () => {
      if (!shots.length) return;
      const cols = shots.length === 1 ? 1 : 2;
      out.push('<div class="gallery inline-shots cols-' + cols + '">' +
        shots.map(s =>
          '<figure class="shot" data-full="' + escAttr(imgSrc(s.src)) + '" ' +
                  'data-cap="' + escAttr(s.cap || s.alt) + '">' +
            '<img src="' + escAttr(imgSrc(s.src)) + '" alt="' + escAttr(s.alt) + '" ' +
                 'loading="lazy" decoding="async">' +
            (s.cap ? '<figcaption>' + fmt(s.cap) + '</figcaption>' : '') +
          '</figure>'
        ).join('') +
      '</div>');
      shots = [];
    };
    const flushList = () => {
      if (list) { out.push('</' + list + '>'); list = null; }
    };
    const flushQuote = () => {
      if (quote.length) {
        out.push('<blockquote>' + fmt(quote.join(' ')) + '</blockquote>');
        quote = [];
      }
    };
    const flushAll = () => { flushPara(); flushList(); flushQuote(); flushShots(); };

    for (const line of trimmed) {

      /* --- a photo on a line of its own. Gathered up rather than emitted
             straight away so neighbouring ones can share a row. */
      const im = line.match(/^!\[([^\]]*)\]\(\s*([^)\s"]+)(?:\s+"([^"]*)")?\s*\)$/);
      if (im) {
        flushPara(); flushList(); flushQuote();
        shots.push({ alt: im[1], src: im[2], cap: im[3] });
        continue;
      }
      flushShots();

      if (!line.trim()) { flushAll(); continue; }

      // --- horizontal rule
      if (/^(---+|\*\*\*+)$/.test(line.trim())) { flushAll(); out.push('<hr>'); continue; }

      // --- headings. The entry title is already an <h2>, so '##' starts at
      //     <h3> to keep the document outline sane for screen readers.
      const h = line.match(/^(#{2,4})\s+(.*)$/);
      if (h) { flushAll(); const n = h[1].length + 1; out.push(`<h${n}>${fmt(h[2])}</h${n}>`); continue; }

      // --- blockquote
      const q = line.match(/^>\s?(.*)$/);
      if (q) { flushPara(); flushList(); quote.push(q[1]); continue; }
      flushQuote();

      // --- lists
      const ul = line.match(/^[-+*]\s+(.*)$/);
      const ol = line.match(/^\d+[.)]\s+(.*)$/);
      if (ul || ol) {
        const want = ul ? 'ul' : 'ol';
        flushPara();
        if (list !== want) { flushList(); out.push('<' + want + '>'); list = want; }
        out.push('<li>' + fmt((ul || ol)[1]) + '</li>');
        continue;
      }
      flushList();

      // --- plain paragraph text
      para.push(line);
    }

    flushAll();
    return out.join('\n');
  }

  return { render, esc, inline, fmt };
})();
