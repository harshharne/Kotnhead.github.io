/* =====================================================================
   PROJECT TILES: image, title, tags. Nothing else.
   - [data-work="featured"]  the landing page's Selected work: projects
     marked featured, in pairs that alternate wide | narrow, narrow | wide
   - [data-work="all"]       the Work page: every project, filterable by tag
   Until a project has a cover image, its title is drawn in dots.
   Needs content.js and dots.js.
   ===================================================================== */
(() => {
  const S = window.SITE; if (!S) return;
  const projects = S.projects.filter(p => !p.hidden);
  const esc = s => String(s).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

  const tile = (p, shape = "") => `
    <a class="tile ${shape}" href="project.html?p=${encodeURIComponent(p.slug)}">
      <div class="media tile-media${p.coverStyle === "diagram" ? " is-diagram" : ""}">${p.cover
        ? `<img src="${esc(p.cover)}" alt="" loading="lazy">`
        : `<span class="dots-m" data-dots>${esc(p.title)}</span>`}</div>
      <div class="tile-meta">
        <h3 class="tile-title">${esc(p.title)}</h3>${p.year ? `<span class="tile-year">${esc(p.year)}</span>` : ""}
      </div>
      <ul class="tags">${p.tags.map(t => `<li>${esc(t)}</li>`).join("")}</ul>
    </a>`;

  /* ---------- landing: selected work ---------- */
  const feat = document.querySelector('[data-work="featured"]');
  if (feat) {
    const list = projects.filter(p => p.featured);
    let html = "";
    for (let i = 0; i < list.length; i += 2) {
      const flip = (i / 2) % 2 === 1;
      html += `<div class="work-row${flip ? " flip" : ""}">${tile(list[i], flip ? "narrow" : "wide")}${list[i + 1] ? tile(list[i + 1], flip ? "wide" : "narrow") : ""}</div>`;
    }
    feat.innerHTML = html;
  }

  /* ---------- work page: everything, filterable by tag ---------- */
  const all = document.querySelector('[data-work="all"]');
  if (all) {
    const filter = document.querySelector("[data-work-filter]");
    const count = document.querySelector("[data-work-count]");
    const tags = [...new Set(projects.flatMap(p => p.tags))].sort((a, b) => a.localeCompare(b));
    let active = new URLSearchParams(location.search).get("tag") || "";
    if (active && !tags.includes(active)) active = "";

    const render = () => {
      const shown = active ? projects.filter(p => p.tags.includes(active)) : projects;
      all.innerHTML = shown.map(p => tile(p)).join("");
      if (count) count.textContent = `${shown.length} ${shown.length === 1 ? "project" : "projects"}${active ? ` tagged ${active}` : ""}`;
      if (filter) filter.querySelectorAll("button").forEach(b => b.setAttribute("aria-pressed", String(b.dataset.tag === active)));
      if (window.Dots) window.Dots.run(all);
    };
    // a filter only helps once tags are shared; with every tag unique it would just isolate one project
    const shared = tags.some(t => projects.filter(p => p.tags.includes(t)).length > 1);
    if (filter && !shared) { filter.hidden = true; active = ""; }
    if (filter && shared) {
      filter.innerHTML = ["", ...tags].map(t => `<button type="button" class="filter" data-tag="${esc(t)}" aria-pressed="false">${t ? esc(t) : "All"}</button>`).join("");
      filter.addEventListener("click", e => {
        const b = e.target.closest("button"); if (!b) return;
        active = b.dataset.tag;
        const url = new URL(location.href);
        if (active) url.searchParams.set("tag", active); else url.searchParams.delete("tag");
        try { history.replaceState(null, "", url); } catch (e) { /* sandboxed preview */ }
        render();
      });
    }
    render();
  }

  if (window.Dots) window.Dots.run();
})();
