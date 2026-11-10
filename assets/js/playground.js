/* =====================================================================
   PLAYGROUND. Smaller and older things, grouped.
   content.js → playground: [{ group, title, brand, kind, text, images: [{ src, alt, r }] }]
   Images in one piece sit in a row at their own shapes (the photos block).
   Needs content.js, dots.js and project.js.
   ===================================================================== */
(() => {
  const S = window.SITE, CS = window.CaseStudy, root = document.querySelector("[data-playground]");
  const items = ((S && S.playground) || []).filter(x => !x.hidden);
  if (!root || !CS || !items.length) return;
  const esc = CS.esc;
  const groups = [...new Set(items.map(x => x.group || ""))];
  root.innerHTML = groups.map(g => `
    <section class="pg-group">
      ${g ? `<h2 class="pg-group-title">${esc(g)}</h2>` : ""}
      ${items.filter(x => (x.group || "") === g).map(x => `
        <article class="pg-piece">
          ${CS.block({ type: "photos", items: x.images || [] })}
          <div class="pg-meta">
            <div class="pg-name"><h3>${esc(x.title)}</h3>${x.brand || x.kind ? `<p>${esc([x.brand, x.kind].filter(Boolean).join(" · "))}</p>` : ""}</div>
            ${x.text ? `<p class="pg-text">${esc(x.text)}</p>` : ""}
          </div>
        </article>`).join("")}
    </section>`).join("");
})();
