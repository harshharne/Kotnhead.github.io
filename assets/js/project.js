/* =====================================================================
   PROJECT PAGE (project.html?p=slug)
   For now: the title in dots, its tags, and a note that the case study
   is on its way, plus a link to the next project. The full case-study
   layout arrives in step 5b. Needs content.js and dots.js.
   ===================================================================== */
(() => {
  const S = window.SITE; if (!S) return;
  const list = S.projects.filter(p => !p.hidden);
  const slug = new URLSearchParams(location.search).get("p");
  const i = list.findIndex(p => p.slug === slug);
  const root = document.querySelector("[data-project]");
  if (!root) return;
  const esc = s => String(s).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

  if (i < 0) {
    root.innerHTML = `<section class="page-intro"><h1 class="dots-xl" data-dots>Not found</h1></section>
      <p class="placeholder-line">That project isn’t here. <a class="link" href="work.html">See all work</a>.</p>`;
  } else {
    const p = list[i], next = list[(i + 1) % list.length];
    document.title = `${p.title} · Harshwardhan Harne`;
    root.innerHTML = `
      <section class="page-intro project-intro">
        <h1 class="dots-xl" data-dots>${esc(p.title)}</h1>
        <ul class="tags">${p.tags.map(t => `<li>${esc(t)}</li>`).join("")}</ul>
      </section>
      <div class="media project-cover">${p.cover ? `<img src="${esc(p.cover)}" alt="">` : ""}</div>
      <p class="placeholder-line">The full case study is being written.</p>
      ${list.length > 1 ? `<a class="action next-project" href="project.html?p=${encodeURIComponent(next.slug)}">Next: ${esc(next.title)} <span class="arrow" aria-hidden="true">→</span></a>` : ""}`;
  }
  if (window.Dots) window.Dots.run(root);
})();
