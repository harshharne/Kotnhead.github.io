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
     figure    { src, alt, caption, style: "diagram"|"photo"|"dark", size: "full"|"wide"|"half" }
     video     { src, caption, size, loop }       YouTube or Vimeo link, or an .mp4 (loop: plays silently on repeat)
     side      { figure: {...}, blocks: [...], flip }  a figure beside text
     pair      { items: [figure, figure] }             two figures side by side, equal height
     lotus     { center, petals: [{ label, note }] }   the UX lotus diagram
     quote     { text, by }                           a pull quote
     statement { text }                               one large line
     bubbles   { center, centerAt, items: [{ label, size: "s"|"m"|"l" }] }
     stairs    { steps: [{ kicker, title, questions: [], answers: [] }] }  questions rising into mechanics
     system    { columns, output, flows }             a system map (see the Neev entry)
     track     { arcs: [], more }                      a journey of arcs and scenario cards
     scenario  { single: { label, q, options }, multi: { label, steps: [...] } }
     venn      { circles: [{ label, note }] }          three overlapping scores
     identity  { icon: { src, alt }, typeface, colours: [] }
     evolution { items: [{ title, text, gave }] }      versions in a row, the last one current
     chosen    {}                                      the Chosen-event flow (Playing Against Chance)
     targets   { rows: [{ label, target, hits: [] }] } die faces that count for each target
     plaques   { items: [{ event, name, line, target }] }  cards that reveal a line on hover
     fluke     { at, event, quiet, back, outcomes: [] }    a small event and what it becomes
     pipeline  {}                                      the build pipeline (Playing Against Chance)
     annotated { src, alt, pins: [{ x, y, label, note }], caption }  an image with numbered pins and a key (x, y in %)
     score     { phases: [], under: [], lines: [{ label, values: [], style }], caption }  qualities rising and falling across acts
     table     { head: [], rows: [[...]] }              a simple table; first column in bold; stacks on phones
     text      { text, size: "lead" }                  size "lead" sets it larger
   Anything decided by random.org is drawn in the accent: violet is always chance.
   figure style "dark" puts an image on a black panel.
   A project can set pageCover: false to keep its cover on the tile only.
     list      { title, items: [] }
     photos    { items: [{ src, alt, caption, date, r }] }  a row of photos at their own shapes
     sources   { items: [{ label, url }] }
   Needs content.js and dots.js.
   ===================================================================== */
(() => {
  const esc = s => String(s ?? "").replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const paras = t => String(t || "").split(/\n\s*\n/).filter(x => x.trim()).map(p => `<p>${esc(p.trim())}</p>`).join("");

  /* ---------- blocks ---------- */
  const figure = f => `
    <figure class="cs-figure ${f.style === "photo" ? "is-photo" : f.style === "dark" ? "is-photo is-dark" : "is-diagram"} size-${f.size || "wide"}">
      <div class="cs-figure-media"><img src="${esc(f.src)}" alt="${esc(f.alt)}" loading="lazy"></div>
      ${f.caption ? `<figcaption>${esc(f.caption)}</figcaption>` : ""}
    </figure>`;

  const R = {
    section: b => `<header class="cs-section"><span class="cs-label">${esc(b.label)}</span><h2 class="cs-title">${esc(b.title)}</h2>${b.sub ? `<p class="cs-sub">${esc(b.sub)}</p>` : ""}</header>`,
    text: b => `<div class="cs-text${b.size === "lead" ? " is-lead" : ""}">${paras(b.text)}</div>`,
    question: b => `<p class="cs-question">${esc(b.text)}</p>`,
    stats: b => `<div class="cs-stats">${b.items.map(s => `
      <div class="cs-stat"><span class="cs-stat-value">${esc(s.value)}</span><span class="cs-stat-label">${esc(s.label)}</span><span class="cs-source">${esc(s.source)}</span></div>`).join("")}</div>`,
    compare: b => `<div class="cs-compare">${b.items.map(s => `
      <div class="cs-side"><h3>${esc(s.title)}</h3>${paras(s.text)}<span class="cs-source">${esc(s.source)}</span></div>`).join("")}</div>`,
    bars: b => `<div class="cs-chart"><p class="cs-chart-q">${esc(b.question)}</p><ul class="cs-bars">${b.rows.map(([l, n]) => `
      <li><span class="cs-bar-label">${esc(l)}</span><span class="cs-bar"><i style="width:${(n / b.total) * 100}%"></i></span><span class="cs-bar-n">${b.unit ? `${n}${esc(b.unit)}` : `${n} of ${b.total}`}</span></li>`).join("")}</ul>${b.note ? `<p class="cs-source">${esc(b.note)}</p>` : ""}</div>`,
    split: b => `<div class="cs-chart"><p class="cs-chart-q">${esc(b.question)}</p>
      <div class="cs-split">${b.rows.map(([l, n], k) => `<i class="tone-${k}" style="flex:${n}"></i>`).join("")}</div>
      <ul class="cs-split-key">${b.rows.map(([l, n], k) => `<li><i class="tone-${k}"></i>${esc(l)} <span>${Math.round((n / b.total) * 1000) / 10}%</span></li>`).join("")}</ul></div>`,
    cards: b => `<div class="cs-cards cols-${b.cols || b.items.length}">${b.items.map(c => `
      <div class="cs-card${c.chance ? " is-chance" : ""}">${c.kicker ? `<span class="cs-kicker">${esc(c.kicker)}</span>` : ""}<h3>${esc(c.title)}</h3>${paras(c.text)}${c.list ? `<ul class="cs-card-list">${c.list.map(x => `<li>${esc(x)}</li>`).join("")}</ul>` : ""}</div>`).join("")}</div>`,
    list: b => `<div class="cs-list">${b.title ? `<h3>${esc(b.title)}</h3>` : ""}<ul>${b.items.map(x => `<li>${esc(x)}</li>`).join("")}</ul></div>`,
    figure: b => figure(b),
    image: b => figure(b),
    video: b => video(b),
    photos: b => photos(b),
    pair: b => `<div class="cs-pair">${b.items.map(f => figure({ ...f, size: "fill" })).join("")}</div>`,
    side: b => `<div class="cs-side-by-side${b.flip ? " flip" : ""}">${figure({ ...b.figure, size: "fill" })}<div class="cs-side-text">${b.blocks.map(render).join("")}</div></div>`,
    lotus: b => lotus(b),
    quote: b => `<blockquote class="cs-quote"><p>“${esc(b.text)}”</p>${b.by ? `<footer>${esc(b.by)}</footer>` : ""}</blockquote>`,
    statement: b => `<p class="cs-statement">${esc(b.text)}</p>`,
    bubbles: b => {
      const items = b.items.map(x => `<span class="cs-bubble s-${x.size || "m"}" role="listitem">${esc(x.label)}</span>`);
      if (b.center) items.splice(b.centerAt ?? 0, 0, `<span class="cs-bubble is-center" role="listitem">${esc(b.center)}</span>`);
      return `<div class="cs-bubbles" role="list">${items.join("")}</div>`;
    },
    identity: b => `<div class="cs-identity">
      <figure class="cs-identity-icon"><img src="${esc(b.icon.src)}" alt="${esc(b.icon.alt)}" loading="lazy"></figure>
      <div class="cs-identity-spec">
        <div><span class="cs-kicker">Typeface</span><p class="cs-specimen">${[700, 500, 400].map(w => `<span style="font-weight:${w}">${esc(b.typeface)}</span>`).join("")}<span style="font-weight:400;font-style:italic">${esc(b.typeface)}</span></p></div>
        <div><span class="cs-kicker">Colour</span><div class="cs-swatches">${b.colours.map(c => `<span style="background:#${esc(c)}"><b>${esc(c)}</b></span>`).join("")}</div></div>
      </div></div>`,
    stairs: b => `<div class="cs-stairs" style="--n:${b.steps.length}">${b.steps.map((s, k) => `
      <div class="cs-stair" style="--k:${k}">
        <span class="cs-kicker">${esc(s.kicker || `Step ${k + 1}`)}</span>
        <h3>${esc(s.title)}</h3>
        <ul class="cs-stair-q">${s.questions.map(q => `<li>${esc(q)}</li>`).join("")}</ul>
        <div class="cs-stair-line" aria-hidden="true"></div>
        <ul class="cs-stair-a">${s.answers.map(a => `<li>${esc(a)}</li>`).join("")}</ul>
      </div>`).join("")}</div>`,
    system: b => system(b),
    track: b => track(b),
    scenario: b => scenario(b),
    venn: b => venn(b),
    evolution: b => `<ol class="cs-evo" style="--n:${b.items.length}">${b.items.map((it, k) => `
      <li class="${k === b.items.length - 1 ? "is-now" : ""}"><span class="cs-evo-dot" aria-hidden="true"></span><span class="cs-kicker">v${k + 1}</span><h3>${esc(it.title)}</h3><p>${esc(it.text)}</p>${it.gave ? `<span class="cs-evo-gave">gave it ${esc(it.gave)}</span>` : ""}</li>`).join("")}</ol>`,
    chosen: b => chosen(b),
    targets: b => `<div class="cs-targets"><span class="cs-kicker">Targets</span><ul>${b.rows.map(r => `
      <li><span class="cs-tg-label">${esc(r.label)}</span><span class="cs-tg-faces" aria-hidden="true">${[1, 2, 3, 4, 5, 6].map(n => die(n, r.hits.includes(n))).join("")}</span><span class="cs-tg-target">${esc(r.target)}</span></li>`).join("")}</ul></div>`,
    plaques: b => `<div class="cs-plaques" role="list">${b.items.map(c => `
      <div class="cs-plaque" role="listitem" tabindex="0"><span class="cs-kicker">${esc(c.event)}</span><h3>${esc(c.name)}</h3><p>${esc(c.line)}</p><span class="cs-plaque-target">Throw ${esc(c.target)}</span></div>`).join("")}</div><p class="cs-plaque-hint">Hover a card to reach for it.</p>`,
    fluke: b => fluke(b),
    pipeline: b => pipeline(b),
    annotated: b => `<figure class="cs-figure cs-annot is-photo size-${b.size || "full"}">
      <div class="cs-figure-media"><img src="${esc(b.src)}" alt="${esc(b.alt)}" loading="lazy">${(b.pins || []).map((p, k) => `<span class="cs-pin" style="left:${+p.x}%;top:${+p.y}%" aria-hidden="true">${k + 1}</span>`).join("")}</div>
      <ol class="cs-annot-key">${(b.pins || []).map(p => `<li><b>${esc(p.label)}</b>${p.note ? `<span>${esc(p.note)}</span>` : ""}</li>`).join("")}</ol>
      ${b.caption ? `<figcaption>${esc(b.caption)}</figcaption>` : ""}</figure>`,
    score: b => score(b),
    table: b => `<div class="cs-table" style="--cols:${b.head.length}" role="table">
      <div class="cs-tr cs-th" role="row">${b.head.map(h => `<span role="columnheader">${esc(h)}</span>`).join("")}</div>
      ${b.rows.map(r => `<div class="cs-tr" role="row">${b.head.map((h, k) => `<span role="cell" data-h="${esc(h)}">${k === 0 ? `<b>${esc(r[k])}</b>` : esc(r[k] ?? "")}</span>`).join("")}</div>`).join("")}</div>`,
    sources: b => `<div class="cs-sources"><h3>Sources</h3><ol>${b.items.map(s => `<li>${s.url ? `<a class="link" href="${esc(s.url)}" target="_blank" rel="noopener">${esc(s.label)}</a>` : esc(s.label)}</li>`).join("")}</ol></div>`,
  };
  // other scripts can add block types (window.CaseStudyExtra) and wire them up after drawing (window.CaseStudyInit)
  const render = b => { const f = R[b.type] || (window.CaseStudyExtra || {})[b.type]; return f ? f(b) : ""; };

  /* ---------- photos: a row of photos at their own shapes, one shared height ----------
     items [{ src, alt, caption, date, r }]; r is width ÷ height (read from the image when it loads).
     The row fills the width but never gets taller than about a screen. */
  function photos(b) {
    const items = b.items || [], sum = items.reduce((t, f) => t + (+f.r || 1), 0);
    return `<div class="cs-photos${items.length > 1 ? " is-row" : ""}" style="--sum:${sum};--n:${items.length}">${items.map(f => `
      <figure class="cs-photo" style="flex-grow:${+f.r || 1}"><img src="${esc(f.src)}" alt="${esc(f.alt)}" loading="lazy" onload="this.parentNode.style.flexGrow=this.naturalWidth/this.naturalHeight">${f.caption || f.date ? `<figcaption>${f.caption ? `<span>${esc(f.caption)}</span>` : ""}${f.date ? `<span class="cs-photo-date">${esc(f.date)}</span>` : ""}</figcaption>` : ""}</figure>`).join("")}</div>`;
  }

  /* ---------- video: YouTube, Vimeo or an .mp4 file ---------- */
  function video(b) {
    const u = String(b.src || ""), yt = u.match(/(?:youtu\.be\/|v=|shorts\/|embed\/)([\w-]{11})/), vm = u.match(/vimeo\.com\/(?:video\/)?(\d+)/);
    const media = yt ? `<iframe src="https://www.youtube-nocookie.com/embed/${yt[1]}" title="${esc(b.caption || "Video")}" allow="autoplay; encrypted-media; picture-in-picture; fullscreen" loading="lazy"></iframe>`
      : vm ? `<iframe src="https://player.vimeo.com/video/${vm[1]}" title="${esc(b.caption || "Video")}" allow="autoplay; fullscreen; picture-in-picture" loading="lazy"></iframe>`
      : u ? `<video src="${esc(u)}" controls playsinline preload="metadata"${b.loop ? " autoplay muted loop" : ""}></video>` : "";
    return `<figure class="cs-figure cs-video is-photo size-${b.size || "wide"}"><div class="cs-figure-media">${media}</div>${b.caption ? `<figcaption>${esc(b.caption)}</figcaption>` : ""}</figure>`;
  }

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

  /* ---------- shared bits for the drawn diagrams ---------- */
  const arrowDefs = id => `<defs><marker id="${id}" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path class="dg-head" d="M1,1 L9,5 L1,9"/></marker></defs>`;
  const lines = (x, y, text, cls, anchor = "start", lh = 17) => {
    const ls = String(text).split("\n");
    return `<text class="${cls}" x="${x}" y="${y}" text-anchor="${anchor}">${ls.map((t, j) => `<tspan x="${x}" dy="${j ? lh : 0}">${esc(t)}</tspan>`).join("")}</text>`;
  };
  let uid = 0;

  /* ---------- system map: three parts side by side, flows between them, an outcome on top ----------
     columns: [{ kicker, title, items: [{ label, sub }] }] (three)
     output:  { title, text }        sits above the third column
     flows:   [{ from, to, label }]  column indexes; "out" for the outcome */
  function system(b) {
    const id = `dg${uid++}`, X = [40, 385, 730], BW = 230, BY = 168, BH = 262;
    let svg = "";
    b.columns.forEach((c, k) => {
      const x = X[k];
      svg += `<rect class="dg-box" x="${x}" y="${BY}" width="${BW}" height="${BH}" rx="14"/>`;
      svg += `<text class="dg-k" x="${x + 20}" y="${BY + 32}">${esc(c.kicker || "")}</text><text class="dg-t" x="${x + 20}" y="${BY + 60}">${esc(c.title)}</text>`;
      let y = BY + 82;
      c.items.forEach(it => {
        const h = it.sub ? 56 : 40;
        svg += `<rect class="dg-pill" x="${x + 16}" y="${y}" width="${BW - 32}" height="${h}" rx="10"/>`;
        svg += `<text class="dg-i" x="${x + 30}" y="${y + (it.sub ? 24 : 25)}">${esc(it.label)}</text>`;
        if (it.sub) svg += `<text class="dg-s" x="${x + 30}" y="${y + 43}">${esc(it.sub)}</text>`;
        y += h + 10;
      });
    });
    if (b.output) {
      const x = X[2];
      svg += `<rect class="dg-out" x="${x}" y="24" width="${BW}" height="74" rx="14"/>`;
      svg += `<text class="dg-i" x="${x + 20}" y="54">${esc(b.output.title)}</text><text class="dg-s" x="${x + 20}" y="77">${esc(b.output.text || "")}</text>`;
    }
    const used = {};
    b.flows.forEach(f => {
      let d, lx, ly, anchor = "middle";
      if (f.to === "out") {
        const cx = X[2] + BW / 2;
        d = `M${cx},${BY} L${cx},${100}`; lx = cx - 14; ly = 138; anchor = "end";
      } else if (Math.abs(f.from - f.to) === 1) {
        const gap = Math.min(f.from, f.to), x0 = X[gap] + BW, x1 = X[gap + 1], slot = used[gap] = (used[gap] || 0) + 1;
        const y = BY + (slot === 1 ? 96 : 182), l2r = f.to > f.from;
        d = l2r ? `M${x0 + 4},${y} L${x1 - 4},${y}` : `M${x1 - 4},${y} L${x0 + 4},${y}`;
        lx = (x0 + x1) / 2; ly = y - 12 - (f.label.split("\n").length - 1) * 16;
      } else {
        const a = X[f.from] + BW / 2, c = X[f.to] + BW / 2, yb = BY + BH + 46;
        d = `M${a},${BY + BH} L${a},${yb} L${c},${yb} L${c},${BY + BH + 4}`;
        lx = (a + c) / 2; ly = yb + 24;
      }
      svg += `<path class="dg-a" d="${d}" marker-end="url(#${id})"/>` + lines(lx, ly, f.label, "dg-l", anchor, 16);
    });
    const name = k => (k === "out" ? b.output.title : b.columns[k].title);
    const listed = `<div class="cs-sys-list">${b.columns.map(c => `
        <div class="cs-sys-col"><span class="cs-kicker">${esc(c.kicker || "")}</span><h3>${esc(c.title)}</h3><ul>${c.items.map(it => `<li>${esc(it.label)}${it.sub ? `<span>${esc(it.sub)}</span>` : ""}</li>`).join("")}</ul></div>`).join("")}
        <ul class="cs-sys-flows">${b.flows.map(f => `<li><b>${esc(name(f.from))} → ${esc(name(f.to))}</b> ${esc(f.label.replace(/\n/g, " "))}</li>`).join("")}</ul></div>`;
    return `<figure class="cs-dg cs-system"><svg class="cs-dg-svg" viewBox="0 0 1000 ${BY + BH + 100}" role="img" aria-label="${esc(b.alt || "System map")}">${arrowDefs(id)}${svg}</svg>${listed}${b.caption ? `<figcaption>${esc(b.caption)}</figcaption>` : ""}</figure>`;
  }

  /* ---------- journey track: arcs as big dots, scenario cards as small ones, snaking down ---------- */
  function track(b) {
    const rows = [56, 156, 256], L = 44, R = 556, step = 34;
    const path = `M${L},${rows[0]} L${R - 16},${rows[0]} A50,50 0 0 1 ${R - 16},${rows[1]} L${L + 16},${rows[1]} A50,50 0 0 0 ${L + 16},${rows[2]} L${R - 40},${rows[2]}`;
    let dots = "";
    const run = (y, a, z) => { const dir = z > a ? 1 : -1; for (let x = a; dir > 0 ? x <= z : x >= z; x += dir * step) dots += `<circle class="dg-dot" cx="${x}" cy="${y}" r="4.2"/>`; };
    run(rows[0], L + step, R - 16); run(rows[1], R - 16 - step, L + 16); run(rows[2], L + 16 + step, R - 40 - step);
    const nodes = [[L, rows[0], 0], [R - 16, rows[1], 1], [L + 16, rows[2], 2]];
    let arcs = "";
    nodes.forEach(([x, y, k]) => {
      if (!b.arcs[k]) return;
      arcs += `<circle class="dg-arc tone-${k}" cx="${x}" cy="${y}" r="12"/>`;
      arcs += lines(k === 1 ? x : x, y + 40, b.arcs[k], "dg-tl", k === 1 ? "end" : "start");
    });
    const end = `<path class="dg-fade" d="M${R - 40},${rows[2]} L${R + 8},${rows[2]}"/><circle class="dg-next" cx="${R - 40}" cy="${rows[2]}" r="12"/>` + lines(R - 40, rows[2] + 40, b.more || "…", "dg-tl muted", "end");
    return `<figure class="cs-dg cs-track"><svg class="cs-dg-svg" viewBox="0 0 600 320" role="img" aria-label="Journey: arcs (${esc(b.arcs.join(", "))}) linked by scenario cards"><path class="dg-path" d="${path}"/>${dots}${arcs}${end}</svg>
      <ul class="cs-track-key"><li><i class="k-arc"></i>${esc(b.keyArc || "Arc")}</li><li><i class="k-card"></i>${esc(b.keyCard || "Scenario card")}</li></ul></figure>`;
  }

  /* ---------- scenario cards: the real questions, drawn as cards ---------- */
  function scenario(b) {
    const card = s => `<div class="cs-scn-card"><p class="cs-scn-q">${esc(s.q)}</p><ul class="cs-scn-opts">${s.options.map(o => `<li>${esc(o)}</li>`).join("")}</ul><span class="cs-scn-submit">Submit</span></div>`;
    return `<div class="cs-scn">
      <div class="cs-scn-col"><span class="cs-kicker">${esc(b.single.label)}</span>${card(b.single)}</div>
      <div class="cs-scn-col is-multi"><span class="cs-kicker">${esc(b.multi.label)}</span><div class="cs-scn-flow">${b.multi.steps.map(card).join(`<span class="cs-scn-then" aria-hidden="true">→</span>`)}</div></div>
    </div>`;
  }

  /* ---------- venn: three overlapping scores with notes outside ---------- */
  function venn(b) {
    const C = [[440, 250], [560, 250], [500, 352]], r = 118;
    const lab = [[392, 240, "middle"], [608, 240, "middle"], [500, 404, "middle"]];
    const notes = [
      { x: 262, y: 230, anchor: "end", lead: `M${C[0][0] - r + 4},${250} L270,${250}` },
      { x: 752, y: 118, anchor: "start", lead: `M${C[1][0] + 84},${C[1][1] - 84} L744,${128}` },
      { x: 700, y: 440, anchor: "start", lead: `M${C[2][0] + 104},${C[2][1] + 52} L692,${448}` },
    ];
    let s = `<circle class="dg-disc" cx="500" cy="290" r="214"/>`;
    C.forEach(([x, y]) => (s += `<circle class="dg-ring" cx="${x}" cy="${y}" r="${r}"/>`));
    b.circles.forEach((c, k) => {
      s += lines(lab[k][0], lab[k][1] - 8, c.label, "dg-tl", lab[k][2], 22);
      if (c.note) s += `<path class="dg-lead notes" d="${notes[k].lead}"/>` + `<g class="notes">${lines(notes[k].x, notes[k].y, c.note, "dg-n", notes[k].anchor, 18)}</g>`;
    });
    const listed = `<dl class="cs-lotus-list">${b.circles.filter(x => x.note).map(x => `<div><dt>${esc(x.label.replace("\n", " "))}</dt><dd>${esc(x.note.replace(/\n/g, " "))}</dd></div>`).join("")}</dl>`;
    return `<figure class="cs-dg cs-venn"><svg class="cs-dg-svg" viewBox="0 0 1000 560" data-narrow="270 60 460 460" role="img" aria-label="${esc(b.alt || "")}">${s}</svg>${listed}</figure>`;
  }


  /* ---------- a die face: pips drawn in a small svg ---------- */
  const PIPS = { 1: [[2, 2]], 2: [[1, 1], [3, 3]], 3: [[1, 1], [2, 2], [3, 3]], 4: [[1, 1], [3, 1], [1, 3], [3, 3]], 5: [[1, 1], [3, 1], [2, 2], [1, 3], [3, 3]], 6: [[1, 1], [3, 1], [1, 2], [3, 2], [1, 3], [3, 3]] };
  const die = (n, on) => `<svg class="cs-die${on ? " on" : ""}" viewBox="0 0 40 40"><rect x="1" y="1" width="38" height="38" rx="8"/>${PIPS[n].map(([x, y]) => `<circle cx="${x * 10}" cy="${y * 10}" r="3.4"/>`).join("")}</svg>`;

  /* ---------- a Chosen event: one throw, two outcomes ---------- */
  function chosen(b) {
    const id = `dg${uid++}`, Y = 70, W = 168, H = 56;
    const box = (x, y, t, sub, cls = "dg-pill") => `<rect class="${cls}" x="${x}" y="${y}" width="${W}" height="${H}" rx="12"/>` +
      `<text class="dg-i" x="${x + W / 2}" y="${y + (sub ? 25 : 33)}" text-anchor="middle">${esc(t)}</text>` + (sub ? `<text class="dg-s" x="${x + W / 2}" y="${y + 44}" text-anchor="middle">${esc(sub)}</text>` : "");
    const X = [20, 240, 460];
    let s = box(X[0], Y, "Pick a card") + box(X[1], Y, "Target shows", "e.g. throw 4 or more") + box(X[2], Y, "Throw the die");
    s += `<path class="dg-a" d="M${X[0] + W + 6},${Y + H / 2} L${X[1] - 6},${Y + H / 2}" marker-end="url(#${id})"/><path class="dg-a" d="M${X[1] + W + 6},${Y + H / 2} L${X[2] - 6},${Y + H / 2}" marker-end="url(#${id})"/>`;
    const dx = 740, dy = Y + H / 2;   // the decision
    s += `<path class="dg-a" d="M${X[2] + W + 6},${dy} L${dx - 50},${dy}" marker-end="url(#${id})"/>`;
    s += `<polygon class="dg-pill" points="${dx - 44},${dy} ${dx},${dy - 40} ${dx + 44},${dy} ${dx},${dy + 40}"/><text class="dg-i" x="${dx}" y="${dy + 5}" text-anchor="middle">Hit?</text>`;
    const oy = 210, ox = [560, 800];
    s += `<path class="dg-a" d="M${dx - 22},${dy + 22} L${ox[0] + W / 2},${oy - 6}" marker-end="url(#${id})"/>` + lines(dx - 60, dy + 62, "yes", "dg-l", "end");
    s += `<path class="dg-a is-chance" d="M${dx + 22},${dy + 22} L${ox[1] + W / 2},${oy - 6}" marker-end="url(#${id}c)"/>` + lines(dx + 60, dy + 62, "no", "dg-l", "start");
    s += box(ox[0], oy, "Your card", "as you chose it") + box(ox[1], oy, "Allotted", "random.org picks", "dg-pill is-chance");
    s += `<path class="dg-a" d="M${ox[0] + W / 2},${oy + H + 6} L${ox[0] + W / 2},${oy + H + 44} L${ox[0] - 26},${oy + H + 44}" marker-end="url(#${id})"/><path class="dg-a" d="M${ox[1] + W / 2},${oy + H + 6} L${ox[1] + W / 2},${oy + H + 44} L${ox[0] + W / 2},${oy + H + 44}"/>`;
    s += `<text class="dg-t" x="${ox[0] - 40}" y="${oy + H + 52}" text-anchor="end">The life moves on</text>`;
    const defs = arrowDefs(id) + arrowDefs(id + "c").replace('class="dg-head"', 'class="dg-head is-chance"');
    const listed = `<ol class="cs-dg-alt"><li>Pick a card</li><li>The target shows</li><li>Throw the die</li><li><b>Hit:</b> your card, as you chose it</li><li class="is-chance"><b>Miss:</b> random.org allots one instead</li><li>Either way, the life moves on</li></ol>`;
    return `<figure class="cs-dg cs-chosen"><svg class="cs-dg-svg" viewBox="0 0 1000 330" role="img" aria-label="${esc(b.alt || "")}">${defs}${s}</svg>${listed}</figure>`;
  }

  /* ---------- a fluke: a tiny event early, its consequence later ---------- */
  function fluke(b) {
    const id = `dg${uid++}`, Y = 80, x0 = 40, x1 = 960, age = a => x0 + (a / 100) * (x1 - x0);
    const xa = age(b.at), xb = age(b.back);
    let s = `<path class="dg-path" d="M${x0},${Y} L${x1},${Y}"/>`;
    [0, 20, 40, 60, 80, 100].forEach(a => (s += `<path class="dg-path" d="M${age(a)},${Y - 5} L${age(a)},${Y + 5}"/><text class="dg-s" x="${age(a)}" y="${Y + 26}" text-anchor="middle">${a}</text>`));
    s += `<circle class="dg-dot" cx="${xa}" cy="${Y}" r="7"/><text class="dg-k" x="${xa}" y="${Y - 22}" text-anchor="middle">${b.at}</text>`;
    s += `<path class="dg-a is-chance dashed" d="M${xa + 8},${Y - 6} Q${(xa + xb) / 2},${Y - 70} ${xb - 8},${Y - 8}" marker-end="url(#${id})"/>`;
    s += `<circle class="dg-arc is-chance" cx="${xb}" cy="${Y}" r="9"/><text class="dg-k" x="${xb}" y="${Y - 22}" text-anchor="middle">${b.back}</text>`;
    s += lines(xa - 10, Y + 64, wrap(b.event, 30), "dg-n", "end", 19) + `<text class="dg-l" x="${xa - 10}" y="${Y + 64 + 19 * wrap(b.event, 30).split("\n").length + 6}" text-anchor="end">${esc(b.quiet)}</text>`;
    const oy = Y + 70;
    b.outcomes.forEach((o, k) => {
      const y = oy + k * 62;
      s += `<path class="dg-lead" d="M${xb},${Y + 10} L${xb},${y - 4} L${xb + 18},${y - 4}"/>` + lines(xb + 26, y, wrap(o, 40), "dg-s", "start", 17);
    });
    const defs = arrowDefs(id).replace('class="dg-head"', 'class="dg-head is-chance"');
    const listed = `<ol class="cs-dg-alt"><li><b>At ${b.at}:</b> ${esc(b.event)} ${esc(b.quiet)}</li><li class="is-chance"><b>At ${b.back}, it comes back as one of:</b><ul>${b.outcomes.map(o => `<li>${esc(o)}</li>`).join("")}</ul></li></ol>`;
    return `<figure class="cs-dg cs-fluke"><svg class="cs-dg-svg" viewBox="0 0 1000 ${oy + b.outcomes.length * 62}" role="img" aria-label="A fluke at ${b.at}, its consequence at ${b.back}">${defs}${s}</svg>${listed}</figure>`;
  }
  const wrap = (t, n) => String(t).split(" ").reduce((a, w) => { const l = a[a.length - 1]; (l && (l + " " + w).length <= n) ? (a[a.length - 1] = l + " " + w) : a.push(w); return a; }, []).join("\n");

  /* ---------- the build: three lanes meeting on one screen ---------- */
  function pipeline(b) {
    const id = `dg${uid++}`, W = 168, H = 60, C = [20, 222, 424, 626], SX = 836, SW = 144;
    const box = (x, y, t, sub, cls = "dg-pill") => `<rect class="${cls}" x="${x}" y="${y}" width="${W}" height="${H}" rx="12"/>` +
      `<text class="dg-i" x="${x + 16}" y="${y + (sub ? 26 : 35)}">${esc(t)}</text>` + (sub ? `<text class="dg-s" x="${x + 16}" y="${y + 45}">${esc(sub)}</text>` : "");
    const arrow = (x0, y0, x1, y1, cls = "dg-a", m = id) => `<path class="${cls}" d="M${x0},${y0} L${x1},${y1}" marker-end="url(#${m})"/>`;
    const R0 = 60, R1 = 196, mid = y => y + H / 2, OY = R1 + 36, QY = R1 + 2 * H + 12 + 70;
    let s = `<text class="dg-k" x="${C[0]}" y="${R0 - 16}">Body</text><text class="dg-k" x="${C[0]}" y="${R1 - 16}">Chance and world</text><text class="dg-k" x="${C[0]}" y="${QY - 16}">Planned</text>`;
    // body lane
    s += box(C[0], R0, "Camera", "the player") + box(C[1], R0, "MediaPipe", "pose, in the browser") + box(C[2], R0, "Avatar", "a baby who ages");
    s += arrow(C[0] + W + 6, mid(R0), C[1] - 6, mid(R0)) + arrow(C[1] + W + 6, mid(R0), C[2] - 6, mid(R0)) + arrow(C[2] + W + 6, mid(R0), SX - 6, mid(R0));
    // chance and world lane: the die and random.org meet in one outcome
    s += box(C[0], R1, "Die", "Chosen events") + box(C[0], R1 + H + 12, "random.org", "everything else", "dg-pill is-chance");
    const xm = C[0] + W + 18;
    s += `<path class="dg-a" d="M${C[0] + W},${mid(R1)} L${xm},${mid(R1)} L${xm},${mid(OY)}"/>`;
    s += `<path class="dg-a is-chance" d="M${C[0] + W},${mid(R1 + H + 12)} L${xm},${mid(R1 + H + 12)} L${xm},${mid(OY)}"/>`;
    s += arrow(xm, mid(OY), C[1] - 6, mid(OY));
    s += box(C[1], OY, "Outcome") + box(C[2], OY, "Prompt", "outcome, place, year, age") + box(C[3], OY, "SD-Turbo", "512² in 0.35 s");
    s += arrow(C[1] + W + 6, mid(OY), C[2] - 6, mid(OY)) + arrow(C[2] + W + 6, mid(OY), C[3] - 6, mid(OY)) + arrow(C[3] + W + 6, mid(OY), SX - 6, mid(OY));
    // planned: a story engine that writes the prompts, a live voice
    s += box(C[2], QY, "Story engine", "an LLM, writes prompts", "dg-pill dashed") + box(C[3], QY, "Voice", "the Bookkeeper, live", "dg-pill dashed");
    s += arrow(C[2] + W / 2, QY - 6, C[2] + W / 2, OY + H + 6, "dg-a dashed") + arrow(C[3] + W + 6, mid(QY), SX - 6, mid(QY), "dg-a dashed");
    // the screen, and the panel that times it
    const sy = R0 - 4, sb = QY + H + 4;
    s += `<rect class="dg-out" x="${SX}" y="${sy}" width="${SW}" height="${sb - sy}" rx="14"/><text class="dg-t" x="${SX + 18}" y="${sy + 38}">Screen</text>`;
    s += lines(SX + 18, sy + 66, "avatar in front,\nworld behind,\ncrossfades,\none thing\nat a time", "dg-s", "start", 18);
    const py = sb + 36;
    s += box(SX - 12, py, "Control panel", "every timing").replace(`width="${W}"`, `width="${SW + 12}"`);
    s += arrow(SX + SW / 2, py - 6, SX + SW / 2, sb + 6);
    const defs = arrowDefs(id);
    const listed = `<div class="cs-dg-alt cs-pipe-list">
      <div><span class="cs-kicker">Body</span><p>Camera → MediaPipe pose → the avatar, a baby who ages</p></div>
      <div><span class="cs-kicker">Chance and world</span><p>Die (Chosen events) or <b class="is-chance">random.org</b> (everything else) → outcome → prompt (outcome, place, year, age) → SD-Turbo, 512² in 0.35 s</p></div>
      <div><span class="cs-kicker">Screen</span><p>Avatar in front, world behind, crossfades, one thing at a time. Every timing set from a control panel.</p></div>
      <div><span class="cs-kicker">Planned</span><p>A story engine (an LLM writes the prompts) and a live voice for the Bookkeeper.</p></div></div>`;
    return `<figure class="cs-dg cs-pipeline"><svg class="cs-dg-svg" viewBox="0 0 1000 ${py + H + 10}" role="img" aria-label="${esc(b.alt || "")}">${defs}${s}</svg>${listed}</figure>`;
  }

  /* ---------- score: how two qualities rise and fall across acts ----------
     { phases: [], under: [], lines: [{ label, values: [0..1], style: "solid"|"dashed" }], caption } */
  function score(b) {
    const n = b.phases.length, X = k => 70 + k * (880 / (n - 1)), Y = v => 40 + (1 - v) * 240;
    let s = [0, 0.5, 1].map(v => `<path class="dg-path" d="M50,${Y(v)} L970,${Y(v)}" stroke-dasharray="${v ? "2 5" : ""}"/><text class="dg-s" x="40" y="${Y(v) + 4}" text-anchor="end">${v === 1 ? "high" : v ? "" : "low"}</text>`).join("");
    const [a, c] = b.lines;
    if (a && c) s += `<path class="cs-score-band" d="M${a.values.map((v, k) => `${X(k)},${Y(v)}`).join(" L")} L${c.values.map((v, k) => `${X(k)},${Y(v)}`).reverse().join(" L")} Z"/>`;
    b.lines.forEach((l, i) => {
      s += `<path class="cs-score-line${l.style === "dashed" ? " is-dashed" : ""}" d="M${l.values.map((v, k) => `${X(k)},${Y(v)}`).join(" L")}"/>`;
      s += l.values.map((v, k) => `<circle class="cs-score-dot${i ? " is-2" : ""}" cx="${X(k)}" cy="${Y(v)}" r="${i ? 4 : 5}"/>`).join("");
    });
    s += b.phases.map((p, k) => `<path class="dg-path" d="M${X(k)},285 L${X(k)},292"/>` + lines(X(k), 314, wrap(p, 12), "dg-i", "middle", 19) + (b.under && b.under[k] ? `<text class="dg-s" x="${X(k)}" y="${314 + 19 * wrap(p, 12).split("\n").length + 6}" text-anchor="middle">${esc(b.under[k])}</text>` : "")).join("");
    const key = `<ul class="cs-score-key">${b.lines.map(l => `<li><i class="${l.style === "dashed" ? "is-dashed" : ""}"></i>${esc(l.label)}</li>`).join("")}</ul>`;
    return `<figure class="cs-dg cs-score"><div class="cs-score-scroll"><svg viewBox="0 0 1000 400" role="img" aria-label="${esc(b.caption || "Score")}">${s}</svg></div>${key}${b.caption ? `<figcaption>${esc(b.caption)}</figcaption>` : ""}</figure>`;
  }

  /* ---------- page parts (the editor uses these too) ---------- */
  const intro = p => {
    const facts = Object.entries(p.meta || {}).filter(([, v]) => v);
    return `
    <section class="cs-intro">
      <h1 class="dots-xl" data-dots>${esc(p.title)}</h1>
      ${p.summary ? `<p class="cs-summary">${esc(p.summary)}</p>` : ""}
      <ul class="tags">${(p.tags || []).map(t => `<li>${esc(t)}</li>`).join("")}</ul>
      ${facts.length ? `<dl class="cs-facts">${facts.map(([k, v]) => `<div><dt>${esc(k)}</dt><dd>${esc(v)}</dd></div>`).join("")}</dl>` : ""}
    </section>`;
  };
  const cover = p => (p.cover && p.pageCover !== false ? figure({ src: p.cover, alt: p.coverAlt || "", style: p.coverStyle || "diagram", size: "full" }) : "");

  // on phones the lotus zooms in to the flower; its notes are listed underneath instead
  const narrow = matchMedia("(max-width: 720px)");
  const fit = root => root.querySelectorAll(".cs-lotus-svg, svg[data-narrow]").forEach(svg => {
    svg.dataset.full = svg.dataset.full || svg.getAttribute("viewBox");
    svg.setAttribute("viewBox", narrow.matches ? (svg.dataset.narrow || "196 26 608 608") : svg.dataset.full);
  });

  window.CaseStudy = { block: render, intro, cover, fit, types: Object.keys(R), esc };

  /* ---------- the page ---------- */
  const S = window.SITE, root = document.querySelector("[data-project]");
  if (!S || !root) return;
  const list = S.projects.filter(p => !p.hidden);
  const slug = new URLSearchParams(location.search).get("p") || window.PROJECT_SLUG;   // PROJECT_SLUG: lets a saved single-file preview open one project
  const i = list.findIndex(p => p.slug === slug);
  if (i < 0) {
    root.innerHTML = `<section class="page-intro"><h1 class="dots-xl" data-dots>Not found</h1></section>
      <p class="placeholder-line">That project isn’t here. <a class="link" href="work.html">See all work</a>.</p>`;
    if (window.Dots) window.Dots.run(root);
    return;
  }
  const p = list[i], next = list[(i + 1) % list.length];
  document.title = `${p.title} · Harshwardhan Harne`;
  const body = p.body && p.body.length
    ? `<div class="cs-body">${p.body.map(render).join("")}</div>`
    : `<p class="placeholder-line">The full case study is being written.</p>`;
  const nextLink = list.length > 1 ? `<nav class="cs-next" aria-label="Next project"><span class="cs-label">Next</span><a class="cs-next-link" href="project.html?p=${encodeURIComponent(next.slug)}"><span class="dots-l" data-dots>${esc(next.title)}</span><span class="arrow" aria-hidden="true">→</span></a></nav>` : "";

  root.innerHTML = intro(p) + cover(p) + body + nextLink;
  if (window.Dots) window.Dots.run(root);
  fit(root);
  (window.CaseStudyInit || []).forEach(f => f(root));
  narrow.addEventListener("change", () => fit(root));
})();
