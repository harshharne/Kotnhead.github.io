/* Renders the Work, Project and Notes pages from content.js,
   draws dot-matrix tiles, and handles small site-wide details.
   You shouldn't need to edit this file to add content. */
(() => {
  const SITE = window.SITE || { projects: [], notes: [] };
  const projects = SITE.projects.filter(p => !p.hidden);
  const notes = (SITE.notes || []).slice().sort((a, b) => String(b.date).localeCompare(String(a.date)));
  const page = document.body.dataset.page;
  const $ = (s, el = document) => el.querySelector(s);

  const esc = s => String(s ?? "").replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const paras = s => String(s ?? "").split(/\n\s*\n/).map(p => p.trim()).filter(Boolean).map(p => `<p>${p}</p>`).join("");
  const projectUrl = p => `project.html?p=${encodeURIComponent(p.slug)}`;
  const store = {
    get(k) { try { return localStorage.getItem(k); } catch { return null; } },
    set(k, v) { try { localStorage.setItem(k, v); } catch {} },
  };
  const fmtDate = d => {
    const t = new Date(d + "T00:00:00");
    return isNaN(t) ? esc(d) : t.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });
  };

  /* ---------- site-wide ---------- */
  // Hide any link still pointing at a placeholder (e.g. YOUR-HANDLE)
  document.querySelectorAll('a[href*="YOUR-"]').forEach(a => (a.closest("li") || a).hidden = true);
  // Hide optional links (like the CV) until the file has actually been uploaded
  document.querySelectorAll("a[data-optional]").forEach(a => {
    const el = a.closest("li") || a;
    if (location.protocol === "file:") return;
    el.style.visibility = "hidden";
    fetch(a.href, { method: "HEAD" }).then(r => { if (r.ok) el.style.visibility = ""; else el.hidden = true; }).catch(() => (el.hidden = true));
  });
  document.querySelectorAll("[data-year]").forEach(el => (el.textContent = new Date().getFullYear()));

  /* ---------- dot-matrix tiles ---------- */
  let COL = {};
  function readColors() {
    const css = getComputedStyle(document.documentElement);
    COL = {
      idle: css.getPropertyValue("--muted").trim() || "#aca89f",
      hover: css.getPropertyValue("--text").trim() || "#ebe8e2",
      accent: css.getPropertyValue("--accent").trim() || "#ff5b1f",
    };
  }
  readColors();


  function drawTile(canvas, hot) {
    const { cols, wrap, path, GH, LINE } = window.DotFont;
    const text = canvas.dataset.text || "";
    const big = canvas.dataset.size === "big";
    const r = canvas.getBoundingClientRect();
    if (!r.width || !r.height) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.round(r.width * dpr); canvas.height = Math.round(r.height * dpr);
    const ctx = canvas.getContext("2d");
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, r.width, r.height);

    const pad = Math.max(16, r.width * 0.035);
    const maxP = big ? 9 : 5;
    let p = Math.min(maxP, (r.width - pad * 2) / cols(text), (r.height - pad * 2) / GH);
    let lines = [text];
    if (p < (big ? 4 : 2.6)) {           // too long for one line: wrap
      p = big ? 4 : 2.6;
      lines = wrap(text, Math.floor((r.width - pad * 2) / p));
    }
    const h = lines.length * LINE * p - (LINE - GH) * p;
    const y0 = canvas.dataset.align === "center" ? (r.height - h) / 2 : r.height - pad - h;
    ctx.fillStyle = hot ? COL.hover : COL.idle;
    ctx.beginPath();
    lines.forEach((line, i) => {
      const x = canvas.dataset.align === "center" ? (r.width - cols(line) * p) / 2 : pad;
      path(ctx, line, x, y0 + i * LINE * p, p);
    });
    ctx.fill();

    // a single orange "power" dot in the corner
    ctx.fillStyle = COL.accent; ctx.beginPath();
    ctx.arc(r.width - pad, pad, Math.max(2, p * 0.4), 0, Math.PI * 2);
    ctx.fill();
  }

  function initTiles(root = document) {
    if (!window.DotFont) return;
    root.querySelectorAll("canvas[data-text]:not([data-ready])").forEach(c => {
      c.dataset.ready = "";
      const redraw = () => drawTile(c, c.closest("a")?.matches(":hover"));
      new ResizeObserver(redraw).observe(c);
      const a = c.closest("a");
      if (a) {
        a.addEventListener("mouseenter", () => drawTile(c, true));
        a.addEventListener("mouseleave", () => drawTile(c, false));
      }
    });
  }

  /* ---------- dot-matrix headings ----------
     Any element with data-dots is redrawn in the dot-matrix font.
     Its CSS font-size sets the size, its CSS color sets the colour. */
  function initDots(root = document) {
    if (!window.DotFont) return;
    const { cols, wrap, path, GH, LINE } = window.DotFont;
    root.querySelectorAll("[data-dots]:not([data-ready])").forEach(el => {
      el.dataset.ready = "";
      const text = el.textContent.trim().replace(/\s+/g, " ");
      el.innerHTML = `<span class="sr-only">${esc(text)}</span><canvas aria-hidden="true"></canvas>`;
      const c = el.querySelector("canvas");
      const draw = () => {
        const cs = getComputedStyle(el);
        const p = parseFloat(cs.fontSize) / GH;
        const avail = el.dataset.dots === "nowrap" ? Infinity : (el.parentElement.clientWidth || 600);
        const lines = wrap(text, Math.max(1, Math.floor(avail / p)));
        const w = Math.max(...lines.map(cols)) * p, h = lines.length * LINE * p - (LINE - GH) * p;
        const dpr = Math.min(window.devicePixelRatio || 1, 2);
        c.style.width = w + "px"; c.style.height = h + "px";
        c.width = Math.ceil(w * dpr); c.height = Math.ceil(h * dpr);
        const ctx = c.getContext("2d");
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        ctx.clearRect(0, 0, w, h);
        ctx.fillStyle = cs.color; ctx.beginPath();
        lines.forEach((line, i) => path(ctx, line, 0, i * LINE * p, p));
        ctx.fill();
      };
      draw();
      new ResizeObserver(draw).observe(el.parentElement);
      const a = el.closest("a") || (el.tagName === "A" ? el : null);
      if (a) { a.addEventListener("mouseenter", () => requestAnimationFrame(draw)); a.addEventListener("mouseleave", () => requestAnimationFrame(draw)); }
    });
  }

  // Cover image if there is one, otherwise the title in dots
  function tileInner(p, size) {
    if (p.cover) return `<img src="${esc(p.cover)}" alt="${esc(p.title)}" loading="lazy">`;
    return `<canvas data-text="${esc(p.title)}" ${size ? `data-size="${size}"` : ""} aria-hidden="true"></canvas><span class="sr-only">${esc(p.title)}</span>`;
  }

  /* ---------- Work ---------- */
  const tagLine = p => [(p.tags || []).join(", "), p.year].filter(Boolean).join(" · ");

  function renderWork() {
    const list = $("#work-list");
    if (!projects.length) { list.innerHTML = `<li class="empty">Nothing here yet.</li>`; return; }
    list.innerHTML = projects.map(p => `<li class="work-item"><a href="${projectUrl(p)}">
      <div class="work-label"><span class="work-title">${esc(p.title)}</span><span class="work-meta">${esc(tagLine(p))}</span></div>
      <div class="tile">${tileInner(p)}</div>
      ${p.summary ? `<p class="work-summary">${esc(p.summary)}</p>` : ""}
    </a></li>`).join("");
  }

  /* ---------- Project ---------- */
  function embed(src) {
    const yt = src.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([\w-]{6,})/);
    if (yt) return `<div class="embed"><iframe src="https://www.youtube-nocookie.com/embed/${yt[1]}" title="Video" allow="autoplay; encrypted-media; picture-in-picture" allowfullscreen loading="lazy"></iframe></div>`;
    const vm = src.match(/vimeo\.com\/(?:video\/)?(\d+)/);
    if (vm) return `<div class="embed"><iframe src="https://player.vimeo.com/video/${vm[1]}" title="Video" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen loading="lazy"></iframe></div>`;
    return `<video src="${esc(src)}" controls playsinline preload="metadata"></video>`;
  }

  function block(b) {
    switch (b.type) {
      case "text":
        return `<section class="prose">${b.heading ? `<h3>${esc(b.heading)}</h3>` : ""}${paras(b.text)}</section>`;
      case "image":
        return `<figure><img src="${esc(b.src)}" alt="${esc(b.alt || b.caption || "")}" loading="lazy">${b.caption ? `<figcaption>${esc(b.caption)}</figcaption>` : ""}</figure>`;
      case "gallery":
        return `<div class="gallery">${(b.items || []).map(i => block({ type: "image", ...i })).join("")}</div>`;
      case "video":
        return `<figure>${embed(String(b.src || ""))}${b.caption ? `<figcaption>${esc(b.caption)}</figcaption>` : ""}</figure>`;
      case "quote":
        return `<blockquote>${esc(b.text)}${b.by ? `<cite>${esc(b.by)}</cite>` : ""}</blockquote>`;
      default: return "";
    }
  }

  function renderProject() {
    const root = $("#project");
    const slug = new URLSearchParams(location.search).get("p");
    const idx = projects.findIndex(p => p.slug === slug);
    const p = projects[idx];

    if (!p) {
      root.innerHTML = `<p class="empty">That project doesn't exist (yet). <a href="work.html" style="color:var(--text)">Back to all work →</a></p>`;
      return;
    }
    document.title = `${p.title} — Harshwardhan Harne`;
    const desc = document.querySelector('meta[name="description"]');
    if (desc && p.summary) desc.content = p.summary;

    const meta = [["Year", p.year], ["Tags", (p.tags || []).join(", ")], ...Object.entries(p.meta || {})].filter(([, v]) => v && String(v).trim());
    const body = (p.body || []).map(block).join("");
    const prev = projects[(idx - 1 + projects.length) % projects.length];
    const next = projects[(idx + 1) % projects.length];

    root.innerHTML = `
      <ol class="crumbs">
        <li><a href="work.html">Work</a></li>
        <li aria-current="page">${esc(p.title)}</li>
      </ol>
      <div class="project-hero tile">${tileInner(p, "big")}</div>
      <div class="project-grid">
        <dl class="project-meta">${meta.map(([k, v]) => `<div><dt>${esc(k)}</dt><dd>${esc(v)}</dd></div>`).join("")}</dl>
        <article>
          <h1 class="project-title" data-dots>${esc(p.title)}</h1>
          ${p.summary ? `<p class="lead">${esc(p.summary)}</p>` : ""}
          <div class="project-body" style="margin-top:var(--s7)">
            ${body || `<p class="coming-soon"><span class="led"></span>Full write-up coming soon.</p>`}
          </div>
        </article>
      </div>
      ${projects.length > 1 ? `<nav class="pager" aria-label="More work">
        <a href="${projectUrl(prev)}"><span class="label">← Previous</span><span class="t">${esc(prev.title)}</span></a>
        <a href="${projectUrl(next)}"><span class="label">Next →</span><span class="t">${esc(next.title)}</span></a>
      </nav>` : ""}`;
    initTiles(root);
    initDots(root);
  }

  /* ---------- Notes ---------- */
  function renderNotes() {
    const list = $("#notes-list"), tabs = $("#notes-tabs");
    const FILTERS = ["All", ...(notes.some(n => n.url) ? ["Links"] : []), ...[...new Set(notes.flatMap(n => n.tags || []))].sort()];
    const has = (n, f) => f === "All" || (f === "Links" ? !!n.url : (n.tags || []).includes(f));
    let filter = "All";

    tabs.innerHTML = FILTERS.map(f =>
      `<li><button type="button" data-f="${f}">${f}<span class="count">${notes.filter(n => has(n, f)).length}</span></button></li>`).join("");

    function render() {
      tabs.querySelectorAll("button").forEach(b => b.setAttribute("aria-pressed", b.dataset.f === filter));
      const shown = notes.filter(n => has(n, filter));
      if (!shown.length) { list.innerHTML = `<p class="empty">${notes.length ? "No notes under this tag yet." : "No notes yet. Check back soon."}</p>`; return; }
      list.innerHTML = shown.map(n => {
        const rel = projects.find(p => p.slug === n.related);
        const tags = [...(n.tags || []), ...(n.url ? ["Link"] : [])].join(", ");
        return `<details class="note">
          <summary>
            <span class="note-date">${fmtDate(n.date)}</span>
            <span class="note-title">${esc(n.title)}</span>
            <span class="note-tags">${esc(tags)}<span class="sign" aria-hidden="true">+</span></span>
          </summary>
          <div class="note-body">
            <div class="prose">${paras(n.body)}</div>
            ${rel || n.url ? `<div class="note-links">
              ${n.url ? `<a href="${esc(n.url)}" target="_blank" rel="noopener">Open link ↗</a>` : ""}
              ${rel ? `<a href="${projectUrl(rel)}">Related work: ${esc(rel.title)}</a>` : ""}
            </div>` : ""}
          </div>
        </details>`;
      }).join("");
    }
    tabs.addEventListener("click", e => { const b = e.target.closest("button"); if (b) { filter = b.dataset.f; render(); } });
    render();
  }

  /* ---------- Playground: show best scores from the games ---------- */
  document.querySelectorAll("[data-best]").forEach(el => {
    const v = store.get("hh-best-" + el.dataset.best);
    if (v && parseFloat(v) > 0) { el.textContent = `Best ${v}${el.dataset.unit || ""}   `; el.style.whiteSpace = "pre"; }
  });

  if (page === "work") renderWork();
  if (page === "project") renderProject();
  if (page === "notes") renderNotes();
  initTiles();
  initDots();
})();
