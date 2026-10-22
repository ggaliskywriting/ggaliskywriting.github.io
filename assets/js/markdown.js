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

   Everything is HTML-escaped first, so pasting <, > or & is safe.
   ============================================================ */

window.md = (function () {

  function esc(s) {
    return String(s)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');
  }

  // inline: code -> links -> bold -> italic
  function inline(s) {
    return s
      .replace(/`([^`]+)`/g, (_, c) => '<code>' + c + '</code>')
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

    const flushPara = () => {
      if (para.length) { out.push('<p>' + fmt(para.join(' ')) + '</p>'); para = []; }
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
    const flushAll = () => { flushPara(); flushList(); flushQuote(); };

    for (const line of trimmed) {

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
