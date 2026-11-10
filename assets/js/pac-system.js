/* =====================================================================
   PLAYING AGAINST CHANCE: two diagrams for the case study.

   pacsystem  the whole system as columns of parts, wired together. Pick a
              run (a Chosen event, a Happens event, a fluke…) and step
              through it: the parts and wires it uses light up, one step at
              a time. Parts marked chance glow in the chance colour; planned
              parts are dashed.
              { type: "pacsystem", title, caption,
                cols: [{ label, sub, nodes: [{ id, title, sub, chance, planned }] }],
                edges: [[from, to, "planned" | "below" | "planned below"?]],
                (a wire that skips a column runs along a lane above the parts, or below with "below")
                runs: [{ name, steps: [{ on: [ids or "a>b" wires], text }] }] }

   route      stations on one line, left to right (top to bottom on phones).
              { type: "route", items: [{ kicker, title, text }] }

   Registers with project.js through CaseStudyExtra / CaseStudyInit.
   ===================================================================== */
(() => {
  const esc = s => String(s ?? "").replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const still = matchMedia("(prefers-reduced-motion: reduce)");

  /* ---------- the system ---------- */
  const system = b => `
    <div class="px" data-px>
      <div class="px-head">
        <div>${b.title ? `<p class="px-title">${esc(b.title)}</p>` : ""}${b.caption ? `<p class="px-caption">${esc(b.caption)}</p>` : ""}</div>
        <div class="px-runs" role="tablist" aria-label="Runs">${(b.runs || []).map((r, i) => `<button role="tab" class="px-run" data-run="${i}" aria-selected="${i === 0}">${esc(r.name)}</button>`).join("")}</div>
      </div>
      <div class="px-map" style="--px-cols:${(b.cols || []).length}">
        <svg class="px-wires" aria-hidden="true"></svg>
        ${(b.cols || []).map(c => `
          <div class="px-col">
            <p class="px-col-label">${esc(c.label)}${c.sub ? `<span>${esc(c.sub)}</span>` : ""}</p>
            ${c.nodes.map(n => `<div class="px-node${n.chance ? " is-chance" : ""}${n.planned ? " is-planned" : ""}" data-node="${esc(n.id)}"><b>${esc(n.title)}</b>${n.sub ? `<span>${esc(n.sub)}</span>` : ""}</div>`).join("")}
          </div>`).join("")}
      </div>
      <div class="px-foot">
        <span class="px-count" data-count></span>
        <p class="px-text" data-text aria-live="polite"></p>
        <div class="px-ctrl">
          <button class="px-btn" data-prev aria-label="Previous step">←</button>
          <button class="px-btn px-play" data-play aria-label="Play">Play</button>
          <button class="px-btn" data-next aria-label="Next step">→</button>
        </div>
      </div>
      <ul class="px-key"><li><i class="k-chance"></i>Chance</li><li><i class="k-planned"></i>Planned</li><li><i class="k-on"></i>In use, this step</li></ul>
      <script type="application/json" data-px-data>${JSON.stringify({ edges: b.edges || [], runs: b.runs || [] }).replace(/</g, "\\u003c")}</script>
    </div>`;

  function wireSystem(el) {
    if (el._px) return; el._px = true;
    const D = JSON.parse(el.querySelector("[data-px-data]").textContent);
    const map = el.querySelector(".px-map"), svg = el.querySelector(".px-wires");
    const node = id => el.querySelector(`[data-node="${CSS.escape(id)}"]`);
    let run = 0, step = 0, timer = null;

    const draw = () => {
      const m = map.getBoundingClientRect();
      const gap = parseFloat(getComputedStyle(map).columnGap) || 48;
      // lanes for wires that skip a column: just above the first row, or just below the lowest part
      const laneY = below => below
        ? Math.max(...[...map.querySelectorAll(".px-node")].map(n => n.getBoundingClientRect().bottom)) - m.top + 12
        : map.querySelector(".px-node").getBoundingClientRect().top - m.top - 7;
      svg.setAttribute("viewBox", `0 0 ${m.width} ${m.height}`);
      svg.innerHTML = D.edges.map(([a, z, kind]) => {
        const A = node(a), Z = node(z); if (!A || !Z) return "";
        const r1 = A.getBoundingClientRect(), r2 = Z.getBoundingClientRect();
        let d;
        if (r2.left >= r1.right - 2) {           // side by side: right edge to left edge
          const x1 = r1.right - m.left, y1 = r1.top + r1.height / 2 - m.top, x2 = r2.left - m.left, y2 = r2.top + r2.height / 2 - m.top, k = Math.max(24, (x2 - x1) / 2);
          if (x2 - x1 > gap * 2.2) {             // skips a column: run along the lane above the parts, not behind them
            const lane = laneY(/below/.test(kind || "")), r = Math.min(18, gap / 3);
            d = `M${x1},${y1} C${x1 + gap / 2},${y1} ${x1 + gap / 2},${lane} ${x1 + gap / 2 + r},${lane} L${x2 - gap / 2 - r},${lane} C${x2 - gap / 2},${lane} ${x2 - gap / 2},${y2} ${x2},${y2}`;
          } else d = `M${x1},${y1} C${x1 + k},${y1} ${x2 - k},${y2} ${x2},${y2}`;
        } else if (r2.right <= r1.left + 2) {    // backwards: loop under
          const x1 = r1.left - m.left, y1 = r1.top + r1.height / 2 - m.top, x2 = r2.right - m.left, y2 = r2.top + r2.height / 2 - m.top;
          d = `M${x1},${y1} C${x1 - 30},${y1} ${x2 + 30},${y2} ${x2},${y2}`;
        } else {                                 // stacked (phones): bottom to top, or along the side
          const down = r2.top >= r1.bottom - 2;
          const x1 = r1.left + 14 - m.left, y1 = (down ? r1.bottom : r1.top) - m.top, x2 = r2.left + 14 - m.left, y2 = (down ? r2.top : r2.bottom) - m.top;
          const side = Math.min(r1.left, r2.left) - m.left - 10, k = Math.abs(y2 - y1) / 2;
          d = Math.abs(y2 - y1) > 140 ? `M${r1.left - m.left},${r1.top + r1.height / 2 - m.top} C${side - 20},${r1.top + r1.height / 2 - m.top} ${side - 20},${r2.top + r2.height / 2 - m.top} ${r2.left - m.left},${r2.top + r2.height / 2 - m.top}`
            : `M${x1},${y1} C${x1},${y1 + (down ? k : -k)} ${x2},${y2 - (down ? k : -k)} ${x2},${y2}`;
        }
        const chance = node(a).classList.contains("is-chance");
        return `<path d="${d}" data-wire="${esc(a)}>${esc(z)}" class="${/planned/.test(kind || "") ? "is-planned" : ""}${chance ? " is-chance" : ""}"/>`;
      }).join("");
      light();
    };

    const light = () => {
      const r = D.runs[run]; if (!r) return;
      const s = r.steps[step], on = new Set(s.on);
      el.querySelectorAll("[data-node]").forEach(n => n.classList.toggle("is-on", on.has(n.dataset.node)));
      // a node is "touched" if any step of this run uses it, so the run's whole path stays faintly visible
      const touched = new Set(r.steps.flatMap(x => x.on));
      el.querySelectorAll("[data-node]").forEach(n => n.classList.toggle("is-path", touched.has(n.dataset.node)));
      svg.querySelectorAll("[data-wire]").forEach(p => { p.classList.toggle("is-on", on.has(p.dataset.wire)); p.classList.toggle("is-path", touched.has(p.dataset.wire)); });
      el.querySelector("[data-count]").textContent = `${String(step + 1).padStart(2, "0")} / ${String(r.steps.length).padStart(2, "0")}`;
      el.querySelector("[data-text]").textContent = s.text;
      el.querySelector("[data-prev]").disabled = step === 0;
      el.querySelector("[data-next]").disabled = step === r.steps.length - 1;
    };
    const stop = () => { clearInterval(timer); timer = null; el.querySelector("[data-play]").textContent = "Play"; };
    const play = () => {
      if (timer) return stop();
      if (step >= D.runs[run].steps.length - 1) step = 0;
      light(); el.querySelector("[data-play]").textContent = "Pause";
      timer = setInterval(() => { if (step < D.runs[run].steps.length - 1) { step++; light(); } else stop(); }, 2600);
    };

    el.addEventListener("click", e => {
      const t = e.target.closest("button"); if (!t) return;
      if (t.dataset.run != null) { stop(); run = +t.dataset.run; step = 0; el.querySelectorAll("[data-run]").forEach(x => x.setAttribute("aria-selected", x === t)); light(); }
      else if (t.hasAttribute("data-next")) { stop(); step = Math.min(step + 1, D.runs[run].steps.length - 1); light(); }
      else if (t.hasAttribute("data-prev")) { stop(); step = Math.max(step - 1, 0); light(); }
      else if (t.hasAttribute("data-play")) play();
    });
    new ResizeObserver(() => requestAnimationFrame(draw)).observe(map);
    draw();
    // start playing once, the first time it comes into view
    if (!still.matches && "IntersectionObserver" in window) {
      const io = new IntersectionObserver(es => { if (es.some(x => x.isIntersecting)) { io.disconnect(); play(); } }, { threshold: 0.5 });
      io.observe(map);
    }
  }

  /* ---------- the route ---------- */
  const route = b => `
    <ol class="rt">${(b.items || []).map((s, i) => `
      <li class="rt-stop${s.chance ? " is-chance" : ""}${i === b.items.length - 1 ? " is-now" : ""}">
        <span class="rt-dot" aria-hidden="true"></span>
        ${s.kicker ? `<span class="rt-kicker">${esc(s.kicker)}</span>` : ""}
        <h3>${esc(s.title)}</h3>
        ${s.text ? `<p>${esc(s.text)}</p>` : ""}
      </li>`).join("")}
    </ol>`;

  const X = (window.CaseStudyExtra = window.CaseStudyExtra || {});
  X.pacsystem = system; X.route = route;
  (window.CaseStudyInit = window.CaseStudyInit || []).push(root => root.querySelectorAll("[data-px]").forEach(wireSystem));
})();
