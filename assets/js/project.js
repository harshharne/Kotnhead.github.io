/* =====================================================================
   CASE STUDY PAGE (project.html?p=slug)
   Builds the page from a project's `body` in content.js, block by block.
   A project with an empty body shows a short "being written" note.

   Block types (see the Binni entry in content.js for real examples):
     section   { label, title }                       a numbered section start
     text      { text }                               short paragraph(s); blank line = new paragraph
     stats     { items: [{ value, label, source }] }  big numbers with their source
     compare   { items: [{ title, text, source }] }   two sides of an argument
     question  { text }                               the question the work answers
     bars      { question, total, rows: [[label, n]], note }
     split     { question, total, rows: [[label, n]] } one bar split into parts
     cards     { items: [{ title, text }], cols }     short labelled statements
     figure    { src, alt, caption, style: "diagram"|"photo", size: "full"|"wide"|"half" }
     side      { figure: {...}, blocks: [...], flip }  a figure beside text
     pair      { items: [figure, figure] }             two figures side by side, equal height
     lotus     { center, petals: [{ label, note }] }   the UX lotus diagram
     list      { title, items: [] }
     sources   { items: [{ label, url }] }
   Needs content.js and dots.js.
   ===================================================================== */
(() => {
  const S = window.SITE; if (!S) return;
  const list = S.projects.filter(p => !p.hidden);
  const slug = new URLSearchParams(location.search).get("p") || window.PROJECT_SLUG;   // PROJECT_SLUG: lets a saved single-file preview open one project
  const i = list.findIndex(p => p.slug === slug);
  const root = document.querySelector("[data-project]");
  if (!root) return;
  const esc = s => String(s ?? "").replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const paras = t => String(t || "").split(/\n\s*\n/).filter(x => x.trim()).map(p => `<p>${esc(p.trim())}</p>`).join("");

  if (i < 0) {
    root.innerHTML = `<section class="page-intro"><h1 class="dots-xl" data-dots>Not found</h1></section>
      <p class="placeholder-line">That project isn’t here. <a class="link" href="work.html">See all work</a>.</p>`;
    if (window.Dots) window.Dots.run(root);
    return;
  }

  const p = list[i], next = list[(i + 1) % list.length];
  document.title = `${p.title} · Harshwardhan Harne`;

  /* ---------- blocks ---------- */
  const figure = f => `
    <figure class="cs-figure ${f.style === "photo" ? "is-photo" : "is-diagram"} size-${f.size || "wide"}">
      <div class="cs-figure-media"><img src="${esc(f.src)}" alt="${esc(f.alt)}" loading="lazy"></div>
      ${f.caption ? `<figcaption>${esc(f.caption)}</figcaption>` : ""}
    </figure>`;

  const R = {
    section: b => `<header class="cs-section"><span class="cs-label">${esc(b.label)}</span><h2 class="cs-title">${esc(b.title)}</h2>${b.sub ? `<p class="cs-sub">${esc(b.sub)}</p>` : ""}</header>`,
    text: b => `<div class="cs-text">${paras(b.text)}</div>`,
    question: b => `<p class="cs-question">${esc(b.text)}</p>`,
    stats: b => `<div class="cs-stats">${b.items.map(s => `
      <div class="cs-stat"><span class="cs-stat-value">${esc(s.value)}</span><span class="cs-stat-label">${esc(s.label)}</span><span class="cs-source">${esc(s.source)}</span></div>`).join("")}</div>`,
    compare: b => `<div class="cs-compare">${b.items.map(s => `
      <div class="cs-side"><h3>${esc(s.title)}</h3>${paras(s.text)}<span class="cs-source">${esc(s.source)}</span></div>`).join("")}</div>`,
    bars: b => `<div class="cs-chart"><p class="cs-chart-q">${esc(b.question)}</p><ul class="cs-bars">${b.rows.map(([l, n]) => `
      <li><span class="cs-bar-label">${esc(l)}</span><span class="cs-bar"><i style="width:${(n / b.total) * 100}%"></i></span><span class="cs-bar-n">${n} of ${b.total}</span></li>`).join("")}</ul>${b.note ? `<p class="cs-source">${esc(b.note)}</p>` : ""}</div>`,
    split: b => `<div class="cs-chart"><p class="cs-chart-q">${esc(b.question)}</p>
      <div class="cs-split">${b.rows.map(([l, n], k) => `<i class="tone-${k}" style="flex:${n}"></i>`).join("")}</div>
      <ul class="cs-split-key">${b.rows.map(([l, n], k) => `<li><i class="tone-${k}"></i>${esc(l)} <span>${Math.round((n / b.total) * 1000) / 10}%</span></li>`).join("")}</ul></div>`,
    cards: b => `<div class="cs-cards cols-${b.cols || b.items.length}">${b.items.map(c => `
      <div class="cs-card">${c.kicker ? `<span class="cs-kicker">${esc(c.kicker)}</span>` : ""}<h3>${esc(c.title)}</h3>${paras(c.text)}${c.list ? `<ul class="cs-card-list">${c.list.map(x => `<li>${esc(x)}</li>`).join("")}</ul>` : ""}</div>`).join("")}</div>`,
    list: b => `<div class="cs-list">${b.title ? `<h3>${esc(b.title)}</h3>` : ""}<ul>${b.items.map(x => `<li>${esc(x)}</li>`).join("")}</ul></div>`,
    figure: b => figure(b),
    pair: b => `<div class="cs-pair">${b.items.map(f => figure({ ...f, size: "fill" })).join("")}</div>`,
    side: b => `<div class="cs-side-by-side${b.flip ? " flip" : ""}">${figure({ ...b.figure, size: "fill" })}<div class="cs-side-text">${b.blocks.map(render).join("")}</div></div>`,
    lotus: b => lotus(b),
    sources: b => `<div class="cs-sources"><h3>Sources</h3><ol>${b.items.map(s => `<li>${s.url ? `<a class="link" href="${esc(s.url)}" target="_blank" rel="noopener">${esc(s.label)}</a>` : esc(s.label)}</li>`).join("")}</ol></div>`,
  };
  const render = b => (R[b.type] ? R[b.type](b) : "");

  /* ---------- the lotus: user at the centre, eight petals, notes outside ---------- */
  function lotus(b) {
    const cx = 500, cy = 330, r0 = 46, L = 250, W = 92;
    const at = (deg, r) => { const a = (deg - 90) * Math.PI / 180; return [cx + Math.cos(a) * r, cy + Math.sin(a) * r]; };
    const petal = `M0,${-r0} C${W},${-(r0 + L * 0.3)} ${W * 0.62},${-(r0 + L * 0.86)} 0,${-(r0 + L)} C${-W * 0.62},${-(r0 + L * 0.86)} ${-W},${-(r0 + L * 0.3)} 0,${-r0} Z`;
    // petals clockwise from the top
    const angles = [0, 45, 90, 135, 180, 225, 270, 315];
    let petals = "", labels = "", notes = "";
    b.petals.forEach((pt, k) => {
      const deg = angles[k], [lx, ly] = at(deg, r0 + L * 0.56);
      petals += `<path class="lp${k === 0 ? " lp-core" : ""}" d="${petal}" transform="translate(${cx} ${cy}) rotate(${deg})"/>`;
      const lines = pt.label.split("\n");
      labels += `<text class="lt" x="${lx}" y="${ly - (lines.length - 1) * 9}" text-anchor="middle">${lines.map((t, j) => `<tspan x="${lx}" dy="${j ? 18 : 5}">${esc(t)}</tspan>`).join("")}</text>`;
      if (!pt.note) return;
      const [ox, oy] = at(deg, r0 + L * 0.9), right = deg > 0 && deg < 180, bottom = deg === 180;
      const nl = pt.note.split("\n");
      if (bottom) {
        notes += `<text class="ln" x="${cx}" y="${cy + r0 + L + 34}" text-anchor="middle">${nl.map((t, j) => `<tspan x="${cx}" dy="${j ? 17 : 0}">${esc(t)}</tspan>`).join("")}</text>`;
      } else {
        const tx = right ? 828 : 172, anchor = right ? "start" : "end";
        notes += `<path class="ll" d="M${ox},${oy} L${right ? tx - 12 : tx + 12},${oy}"/>`;
        notes += `<text class="ln" x="${tx}" y="${oy - (nl.length - 1) * 8.5 + 4}" text-anchor="${anchor}">${nl.map((t, j) => `<tspan x="${tx}" dy="${j ? 17 : 0}">${esc(t)}</tspan>`).join("")}</text>`;
      }
    });
    const centre = `<circle class="lc" cx="${cx}" cy="${cy}" r="${r0 + 6}"/><text class="lct" x="${cx}" y="${cy + 5}" text-anchor="middle">${esc(b.center)}</text>`;
    const svg = `<svg class="cs-lotus-svg" viewBox="0 0 1000 ${cy + r0 + L + 80}" role="img" aria-label="Lotus diagram: ${esc(b.center)} at the centre, surrounded by ${b.petals.map(x => x.label.replace("\n", " ")).join(", ")}">
      <g class="petals">${petals}</g>${centre}<g class="labels">${labels}</g><g class="notes">${notes}</g></svg>`;
    // on small screens the notes become a list under the flower
    const listed = `<dl class="cs-lotus-list">${b.petals.filter(x => x.note).map(x => `<div><dt>${esc(x.label.replace("\n", " "))}</dt><dd>${esc(x.note.replace(/\n/g, " "))}</dd></div>`).join("")}</dl>`;
    return `<figure class="cs-lotus">${svg}${listed}${b.caption ? `<figcaption>${esc(b.caption)}</figcaption>` : ""}</figure>`;
  }

  /* ---------- page ---------- */
  const facts = Object.entries(p.meta || {}).filter(([, v]) => v);
  const intro = `
    <section class="cs-intro">
      <h1 class="dots-xl" data-dots>${esc(p.title)}</h1>
      ${p.summary ? `<p class="cs-summary">${esc(p.summary)}</p>` : ""}
      <ul class="tags">${p.tags.map(t => `<li>${esc(t)}</li>`).join("")}</ul>
      ${facts.length ? `<dl class="cs-facts">${facts.map(([k, v]) => `<div><dt>${esc(k)}</dt><dd>${esc(v)}</dd></div>`).join("")}</dl>` : ""}
    </section>`;
  const cover = p.cover ? figure({ src: p.cover, alt: p.coverAlt || "", style: p.coverStyle || "diagram", size: "full" }) : "";
  const body = p.body && p.body.length
    ? `<div class="cs-body">${p.body.map(render).join("")}</div>`
    : `<p class="placeholder-line">The full case study is being written.</p>`;
  const nextLink = list.length > 1 ? `<nav class="cs-next" aria-label="Next project"><span class="cs-label">Next</span><a class="cs-next-link" href="project.html?p=${encodeURIComponent(next.slug)}"><span class="dots-l" data-dots>${esc(next.title)}</span><span class="arrow" aria-hidden="true">→</span></a></nav>` : "";

  root.innerHTML = intro + cover + body + nextLink;
  if (window.Dots) window.Dots.run(root);

  // on phones the lotus zooms in to the flower; its notes are listed underneath instead
  const narrow = matchMedia("(max-width: 720px)");
  const fitLotus = () => root.querySelectorAll(".cs-lotus-svg").forEach(svg => {
    svg.dataset.full = svg.dataset.full || svg.getAttribute("viewBox");
    svg.setAttribute("viewBox", narrow.matches ? "196 26 608 608" : svg.dataset.full);
  });
  fitLotus();
  narrow.addEventListener("change", fitLotus);
})();
