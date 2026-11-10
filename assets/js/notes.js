/* =====================================================================
   NOTES. The list (notes.html) and a single note (note.html?n=slug).
   - a note with blocks opens on its own page, drawn like a case study
   - a note with body text opens in place
   - a note with neither is listed as coming soon
   Needs content.js, dots.js, and project.js on note.html.
   ===================================================================== */
(() => {
  const S = window.SITE; if (!S) return;
  const esc = s => String(s ?? "").replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const paras = t => String(t || "").split(/\n\s*\n/).filter(x => x.trim()).map(p => `<p>${esc(p.trim())}</p>`).join("");
  const projects = S.projects.filter(p => !p.hidden);
  const notes = (S.notes || []).filter(n => !n.hidden).slice().sort((a, b) => String(b.date || "").localeCompare(String(a.date || "")));
  const projectUrl = p => `project.html?p=${encodeURIComponent(p.slug)}`;
  const noteUrl = n => `note.html?n=${encodeURIComponent(n.slug)}`;
  const date = d => {
    d = String(d || "");
    if (/^\d{4}$/.test(d)) return d;
    const t = new Date(/^\d{4}-\d{2}$/.test(d) ? d + "-01T00:00:00" : d + "T00:00:00");
    if (isNaN(t)) return esc(d);
    return t.toLocaleDateString("en-GB", /^\d{4}-\d{2}$/.test(d) ? { month: "short", year: "numeric" } : { day: "numeric", month: "short", year: "numeric" });
  };

  /* ---------- the list ---------- */
  const list = document.querySelector("[data-notes]");
  if (list) {
    list.innerHTML = notes.length ? notes.map(n => {
      const kind = [...(n.tags || []), ...(n.url ? ["Link"] : [])].join(", ");
      const meta = `<span class="note-kind">${esc(kind)}</span><span class="note-date">${date(n.date)}</span>`;
      if (n.blocks && n.blocks.length) return `<li><a class="note-row" href="${noteUrl(n)}"><span class="note-title">${esc(n.title)}</span>${meta}<span class="note-mark arrow" aria-hidden="true">→</span></a></li>`;
      if (n.body || n.url) {
        const rel = projects.find(p => p.slug === n.related);
        return `<li><details class="note"><summary class="note-row"><span class="note-title">${esc(n.title)}</span>${meta}<span class="note-mark" aria-hidden="true">+</span></summary>
          <div class="note-body">${paras(n.body)}
            ${n.url ? `<p><a class="link" href="${esc(n.url)}" target="_blank" rel="noopener">Open link ↗</a></p>` : ""}
            ${rel ? `<p><a class="link" href="${projectUrl(rel)}">Related work: ${esc(rel.title)}</a></p>` : ""}
          </div></details></li>`;
      }
      return `<li><div class="note-row is-soon"><span class="note-title">${esc(n.title)}</span><span class="note-kind">Coming soon</span><span class="note-date"></span><span class="note-mark"></span></div></li>`;
    }).join("") : `<li class="note-empty">No notes yet. Check back soon.</li>`;
  }

  /* ---------- one note ---------- */
  const root = document.querySelector("[data-note]"), CS = window.CaseStudy;
  if (root && CS) {
    const slug = new URLSearchParams(location.search).get("n");
    const n = notes.find(x => x.slug === slug && x.blocks && x.blocks.length);
    if (!n) {
      root.innerHTML = `<section class="page-intro"><h1 class="dots-xl" data-dots>Not found</h1></section>
        <p class="placeholder-line">That note isn’t here. <a class="link" href="notes.html">See all notes</a>.</p>`;
    } else {
      document.title = `${n.title} · Harshwardhan Harne`;
      const rel = projects.find(p => p.slug === n.related);
      root.innerHTML = CS.intro({ ...n, meta: { ...(n.date ? { Date: date(n.date) } : {}), ...(n.meta || {}) } })
        + `<div class="cs-body">${n.blocks.map(CS.block).join("")}</div>`
        + `<nav class="cs-next" aria-label="More"><span class="cs-label">${rel ? "Related work" : "More"}</span>
            <a class="cs-next-link" href="${rel ? projectUrl(rel) : "notes.html"}"><span class="dots-l" data-dots>${esc(rel ? rel.title : "All notes")}</span><span class="arrow" aria-hidden="true">→</span></a></nav>`;
    }
    if (window.Dots) window.Dots.run(root);
  }
})();
