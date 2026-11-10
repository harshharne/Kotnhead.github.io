/* =====================================================================
   NEEV, PLAYABLE. A phone you can play inside the case study.
   Block: { type: "neevplay", title, caption, notes: [[label, text]], arcs: [{ name, line, cards: [{ layer,
            steps: [{ scene, alt, q, hint, article, options: [{ text, sound, why }] }] }] }] }
   Each card's scene "develops" dot by dot as the card opens: a fixed set,
   drawn by code here, standing in for scenes generated per card.
   Registers itself with project.js (CaseStudyExtra / CaseStudyInit), so load
   it before project.js.
   ===================================================================== */
(() => {
  const esc = s => String(s ?? "").replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const still = matchMedia("(prefers-reduced-motion: reduce)");
  const BOLT = `<svg class="nv-bolt" viewBox="0 0 10 14" aria-hidden="true"><path d="M6 0 0 8h4l-1 6 6-8H5z" fill="currentColor"/></svg>`;

  /* ---------- scenes: shapes on an 80 × 60 grid, shown as dots ---------- */
  const GW = 80, GH = 60;
  const P = ctx => ({
    rect: (x, y, w, h) => ctx.fillRect(x, y, w, h),
    circ: (x, y, r) => { ctx.beginPath(); ctx.arc(x, y, r, 0, Math.PI * 2); ctx.fill(); },
    poly: (...pts) => { ctx.beginPath(); pts.forEach(([x, y], i) => (i ? ctx.lineTo(x, y) : ctx.moveTo(x, y))); ctx.closePath(); ctx.fill(); },
    line: (x1, y1, x2, y2, w = 1.6) => { ctx.lineWidth = w; ctx.lineCap = "round"; ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(x2, y2); ctx.stroke(); },
    ring: (x, y, r, w = 2.4) => { ctx.lineWidth = w; ctx.beginPath(); ctx.arc(x, y, r, 0, Math.PI * 2); ctx.stroke(); },
    erase: f => { ctx.save(); ctx.globalCompositeOperation = "destination-out"; f(); ctx.restore(); },
    soft: (a, f) => { ctx.save(); ctx.globalAlpha = a; f(); ctx.restore(); },
    person: (x, base, h, cap) => {
      const r = h * 0.13, top = base - h;
      ctx.beginPath(); ctx.arc(x, top + r, r, 0, Math.PI * 2); ctx.fill();
      ctx.fillRect(x - h * 0.16, top + r * 2 + 1, h * 0.32, h * 0.42);
      ctx.fillRect(x - h * 0.14, top + r * 2 + 1 + h * 0.42, h * 0.11, base - (top + r * 2 + 1 + h * 0.42));
      ctx.fillRect(x + h * 0.03, top + r * 2 + 1 + h * 0.42, h * 0.11, base - (top + r * 2 + 1 + h * 0.42));
      if (cap) { ctx.fillRect(x - r * 1.2, top - 1, r * 2.4, r * 0.9); ctx.fillRect(x - r * 1.6, top + r * 0.6 - 1, r * 3.2, 1.2); }
    },
  });
  const SCENES = {
    protest: d => {
      d.rect(4, 55, 72, 1);
      [10, 19, 28, 37].forEach((x, i) => d.person(x, 54, 24 + (i % 2) * 4));
      d.line(28, 30, 28, 12, 1.4); d.rect(18, 4, 22, 10); d.erase(() => { d.rect(21, 7, 16, 1.4); d.rect(21, 10, 11, 1.4); });
      d.rect(52, 28, 22, 15); d.rect(57, 24, 8, 5); d.erase(() => d.circ(63, 35.5, 5)); d.circ(63, 35.5, 2.6);
    },
    rti: d => {
      d.soft(.3, () => d.rect(25, 5, 32, 44));
      d.rect(19, 10, 32, 44); d.erase(() => { for (let y = 16; y < 46; y += 5) d.rect(23, y, y % 2 ? 18 : 24, 1.5); });
      d.ring(55, 44, 9, 2.6); d.erase(() => d.circ(55, 44, 4.4)); d.circ(55, 44, 3);
    },
    comment: d => {
      d.rect(26, 3, 28, 54); d.erase(() => d.rect(29, 8, 22, 44)); d.circ(40, 54.5, 1.3);
      d.rect(31, 11, 15, 7); d.rect(34, 21, 15, 7); d.soft(.35, () => d.rect(31, 31, 18, 9));
      d.line(30, 30, 50, 41, 1.8); d.line(50, 30, 30, 41, 1.8); d.rect(34, 44, 12, 5);
    },
    arrest: d => {
      d.rect(4, 55, 72, 1);
      d.person(26, 54, 34, true); d.person(54, 54, 32);
      d.ring(37, 36, 3.6, 1.8); d.ring(44, 36, 3.6, 1.8); d.line(40, 36, 41, 36, 1.4);
    },
    family: d => {
      d.poly([8, 30], [26, 14], [44, 30]); d.rect(12, 30, 28, 24); d.erase(() => { d.rect(23, 40, 7, 14); d.rect(15, 34, 5, 5); d.rect(32, 34, 5, 5); });
      d.rect(56, 22, 14, 26); d.erase(() => d.rect(58, 26, 10, 17));
      d.soft(.5, () => { d.ring(63, 16, 4, 1.4); }); d.soft(.3, () => d.ring(63, 16, 8, 1.4));
      d.rect(4, 55, 72, 1);
    },
    clock: d => {
      d.ring(40, 30, 22, 3); for (let k = 0; k < 12; k++) { const a = k * Math.PI / 6; d.circ(40 + Math.sin(a) * 17, 30 - Math.cos(a) * 17, k % 3 ? .9 : 1.6); }
      d.line(40, 30, 40, 16, 2.2); d.line(40, 30, 49, 36, 2.2); d.circ(40, 30, 2.4);
      d.soft(.3, () => { d.ctx.beginPath(); d.ctx.moveTo(40, 30); d.ctx.arc(40, 30, 21, -Math.PI / 2, Math.PI * 1.17); d.ctx.closePath(); d.ctx.fill(); });
    },
    room: d => {
      d.line(40, 0, 40, 6, 1.2); d.poly([35, 6], [45, 6], [47, 11], [33, 11]);
      d.soft(.22, () => d.poly([34, 11], [46, 11], [64, 40], [16, 40]));
      d.rect(16, 40, 48, 3); d.rect(19, 43, 2, 13); d.rect(59, 43, 2, 13);
      d.circ(10, 27, 4.5); d.rect(5, 32, 10, 12); d.circ(70, 27, 4.5); d.rect(65, 32, 10, 12);
    },
    podium: d => {
      d.person(40, 34, 22); d.poly([28, 30], [52, 30], [49, 52], [31, 52]); d.erase(() => d.rect(35, 36, 10, 1.6));
      d.line(44, 30, 47, 20, 1.2); d.circ(47.5, 19, 1.8);
      for (let x = 6; x < 80; x += 8) { d.circ(x, 56, 3); d.rect(x - 3.5, 58, 7, 2); }
    },
    well: d => {
      d.rect(4, 55, 72, 1);
      d.rect(16, 32, 30, 22); d.erase(() => { for (let y = 36; y < 54; y += 5) d.rect(16, y, 30, 1); for (let y = 32, k = 0; y < 54; y += 5, k++) for (let x = 16 + (k % 2) * 5; x < 46; x += 10) d.rect(x, y, 1, 4); });
      d.rect(14, 29, 34, 3); d.rect(18, 8, 2.4, 21); d.rect(42, 8, 2.4, 21); d.rect(16, 7, 30, 3);
      d.line(31, 10, 31, 22, 1); d.rect(28, 22, 6, 5);
      d.person(64, 54, 30); d.circ(64, 21, 4.4);
    },
    ballot: d => {
      d.rect(20, 28, 40, 26); d.erase(() => { d.rect(30, 31, 20, 2); d.rect(26, 40, 28, 1.4); });
      d.ctx.save(); d.ctx.translate(40, 22); d.ctx.rotate(-0.18); d.ctx.fillRect(-6, -14, 12, 16); d.ctx.restore();
      d.erase(() => { d.ctx.save(); d.ctx.translate(40, 22); d.ctx.rotate(-0.18); d.ctx.fillRect(-3, -10, 6, 1.4); d.ctx.fillRect(-3, -6, 6, 1.4); d.ctx.restore(); });
      d.rect(4, 55, 72, 1);
    },
    voices: d => {
      const b = (x, y, w, h, a) => d.soft(a, () => { d.rect(x, y, w, h); d.poly([x + 3, y + h], [x + 8, y + h], [x + 3, y + h + 4]); });
      b(6, 8, 22, 9, 1); b(34, 4, 16, 8, .45); b(54, 12, 20, 9, 1); b(14, 28, 16, 8, .45); b(38, 24, 24, 10, 1); b(8, 44, 20, 8, .45); b(48, 42, 22, 9, .45);
    },
  };
  const BAYER = [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5].map(v => (v + 0.5) / 16);
  const sceneCells = name => {
    const c = document.createElement("canvas"); c.width = GW; c.height = GH;
    const ctx = c.getContext("2d"); ctx.fillStyle = ctx.strokeStyle = "#000";
    const d = P(ctx); d.ctx = ctx;
    (SCENES[name] || SCENES.voices)(d);
    const a = ctx.getImageData(0, 0, GW, GH).data, on = [];
    for (let y = 0; y < GH; y++) for (let x = 0; x < GW; x++) if (a[(y * GW + x) * 4 + 3] / 255 > BAYER[(y % 4) * 4 + (x % 4)]) on.push(y * GW + x);
    return on;
  };

  /* draws a scene into a canvas; dots arrive in a loose sweep, like an image resolving */
  function develop(cv, name, done) {
    const box = cv.getBoundingClientRect(), dpr = Math.min(devicePixelRatio || 1, 2);
    const W = box.width || 280, H = W * GH / GW;
    cv.width = W * dpr; cv.height = H * dpr;
    const ctx = cv.getContext("2d"); ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    const s = W / GW, r = s * 0.36, on = new Set(sceneCells(name));
    const ink = getComputedStyle(cv).color, faint = "rgba(0,0,0,.09)";
    const dot = (i, col, rr) => { ctx.fillStyle = col; ctx.beginPath(); ctx.arc((i % GW + .5) * s, (Math.floor(i / GW) + .5) * s, rr, 0, Math.PI * 2); ctx.fill(); };
    const paintAll = () => { ctx.clearRect(0, 0, W, H); for (let i = 0; i < GW * GH; i++) dot(i, on.has(i) ? ink : faint, on.has(i) ? r : s * 0.12); };
    if (cv._raf) cancelAnimationFrame(cv._raf);
    if (still.matches) { paintAll(); done && done(); return; }
    ctx.clearRect(0, 0, W, H);
    for (let i = 0; i < GW * GH; i++) dot(i, faint, s * 0.12);
    const order = [...on].map(i => [i, (i % GW) / GW * 0.55 + Math.random() * 0.45]).sort((a, b) => a[1] - b[1]).map(x => x[0]);
    const T = 1100, t0 = performance.now(); let k = 0;
    const step = now => {
      const n = Math.min(order.length, Math.floor(order.length * Math.min(1, (now - t0) / T) ** 0.8));
      for (; k < n; k++) dot(order[k], ink, r);
      if (k < order.length) cv._raf = requestAnimationFrame(step); else done && done();
    };
    cv._raf = requestAnimationFrame(step);
  }

  /* ---------- the block's markup: the start screen, drawn statically ---------- */
  const phone = b => `
    <div class="nv" data-neev>
      <div class="nv-stage"><div class="nv-device"><div class="nv-screen" data-nv-screen aria-live="polite">${home(b, fresh())}</div></div></div>
      <div class="nv-side">
        ${b.title ? `<p class="nv-side-title">${esc(b.title)}</p>` : ""}
        ${b.caption ? `<p class="nv-caption">${esc(b.caption)}</p>` : ""}
        ${b.notes ? `<ol class="nv-notes">${b.notes.map(([k, v]) => `<li><b>${esc(k)}</b><span>${esc(v)}</span></li>`).join("")}</ol>` : ""}
      </div>
      <script type="application/json" data-nv-data>${JSON.stringify(b.arcs || []).replace(/</g, "\\u003c")}</script>
    </div>`;
  const fresh = () => ({ xp: 0, crit: 0, mom: 3, learnt: [], done: [] });
  const bar = (st, left = `<span class="nv-brand"><img src="assets/projects/neev/logo.png" alt="">Neev</span>`) => `
    <div class="nv-top">${left}<span class="nv-pills"><span class="nv-pill" title="Momentum points">${BOLT}<span class="sr-only">Momentum </span>${st.mom}</span><span class="nv-pill" title="Neevsense">◆<span class="sr-only"> Neevsense</span> ${score(st)}</span></span></div>`;
  const score = st => st.xp + st.crit * 2;
  const home = (b, st) => `
    ${bar(st)}
    <div class="nv-home">
      <p class="nv-eyebrow">Journey</p>
      <h3 class="nv-h">Choose an arc</h3>
      <p class="nv-sub">Play a role. Every card is a real situation; the Constitution is how you get through it.</p>
      <ul class="nv-arcs">${(b.arcs || []).map((a, i) => `
        <li><button class="nv-arc" data-arc="${i}"><span class="nv-arc-n">${String(i + 1).padStart(2, "0")}</span><span class="nv-arc-t"><b>${esc(a.name)}</b><span>${esc(a.line)}</span></span><span class="nv-arc-c">${st.done.includes(i) ? "Played" : `${a.cards.length} cards`}</span></button></li>`).join("")}
      </ul>
    </div>`;

  /* ---------- play ---------- */
  function wire(root) {
    root.querySelectorAll("[data-neev]").forEach(el => {
      if (el._nv) return; el._nv = true;
      const arcs = JSON.parse(el.querySelector("[data-nv-data]").textContent || "[]");
      const scr = el.querySelector("[data-nv-screen]");
      let st = fresh(), arc = 0, card = 0, step = 0, hinted = false, tried = false;
      const cur = () => arcs[arc].cards[card].steps[step];

      const showHome = () => { scr.innerHTML = home({ arcs }, st); };
      const showCard = () => {
        const c = arcs[arc].cards[card], s = cur(), multi = c.steps.length > 1;
        hinted = false; tried = false;
        scr.innerHTML = `
          ${bar(st, `<button class="nv-back" data-home aria-label="Back to arcs">←</button><span class="nv-where">${esc(arcs[arc].name)}</span>`)}
          <div class="nv-progress" aria-label="Card ${card + 1} of ${arcs[arc].cards.length}">${arcs[arc].cards.map((_, i) => `<i class="${i < card ? "is-done" : i === card ? "is-now" : ""}"></i>`).join("")}</div>
          <div class="nv-card">
            <div class="nv-port"><canvas role="img" aria-label="${esc(s.alt)}"></canvas><span class="nv-gen" data-gen>Generating scene</span></div>
            <p class="nv-layer">${multi ? `Multi-layered · ${step + 1} of ${c.steps.length}` : "Single-layered"}</p>
            <p class="nv-q">${esc(s.q)}</p>
            <div class="nv-opts">${s.options.map((o, i) => `<button class="nv-opt" data-opt="${i}">${esc(o.text)}</button>`).join("")}</div>
            <button class="nv-guru" data-guru ${st.mom < 1 ? "disabled" : ""}>Ask Guru <span>${BOLT} 1</span></button>
            <p class="nv-hint" data-hint hidden></p>
          </div>`;
        const cv = scr.querySelector("canvas"), gen = scr.querySelector("[data-gen]");
        requestAnimationFrame(() => develop(cv, s.scene, () => { gen.textContent = `Scene ${card + 1}`; gen.classList.add("is-done"); }));
      };
      const showResult = i => {
        const s = cur(), o = s.options[i], c = arcs[arc].cards[card];
        const first = !tried; tried = true;
        if (first) { st.xp += 10; if (o.sound) { st.crit += 5; st.mom += 1; } }
        if (o.sound && !st.learnt.includes(s.article)) st.learnt.push(s.article);
        const last = step === c.steps.length - 1 && card === arcs[arc].cards.length - 1;
        scr.querySelector(".nv-card").insertAdjacentHTML("beforeend", `
          <div class="nv-sheet ${o.sound ? "is-sound" : "is-not"}" role="dialog" aria-label="Outcome">
            <p class="nv-verdict">${o.sound ? "Sound call" : "Think again"}</p>
            <p class="nv-why">${esc(o.why)}</p>
            <p class="nv-art">${esc(s.article)}</p>
            <p class="nv-gain">${first ? `+10 XP${o.sound ? " · +5 critical · +1 momentum" : ""}` : "Points count on your first answer"}</p>
            <div class="nv-sheet-acts">
              ${o.sound ? "" : `<button class="nv-ghost" data-retry>Try again</button>`}
              <button class="nv-go" data-next>${last ? "See your Neevsense" : step < c.steps.length - 1 ? "What happens next" : "Next card"}</button>
            </div>
          </div>`);
        scr.querySelectorAll(".nv-opt, [data-guru]").forEach(x => (x.disabled = true));
        scr.querySelector(`[data-opt="${i}"]`).classList.add(o.sound ? "is-sound" : "is-not");
        scr.querySelector(".nv-top").outerHTML = bar(st, `<button class="nv-back" data-home aria-label="Back to arcs">←</button><span class="nv-where">${esc(arcs[arc].name)}</span>`);
        scr.querySelector("[data-next]").focus({ preventScroll: true });
      };
      const showEnd = () => {
        if (!st.done.includes(arc)) st.done.push(arc);
        scr.innerHTML = `
          ${bar(st)}
          <div class="nv-end">
            <p class="nv-eyebrow">${esc(arcs[arc].name)} · arc complete</p>
            <p class="nv-score"><span>${score(st)}</span>Neevsense</p>
            <dl class="nv-stats"><div><dt>XP</dt><dd>${st.xp}</dd></div><div><dt>Critical</dt><dd>${st.crit}</dd></div><div><dt>Momentum</dt><dd>${st.mom}</dd></div></dl>
            ${st.learnt.length ? `<p class="nv-eyebrow">Rights you used</p><ul class="nv-learnt">${st.learnt.map(a => `<li>${esc(a)}</li>`).join("")}</ul>` : ""}
            <button class="nv-go" data-home>Play another arc</button>
          </div>`;
      };

      el.addEventListener("click", e => {
        const t = e.target.closest("button"); if (!t || !el.contains(t)) return;
        if (t.dataset.arc != null) { arc = +t.dataset.arc; card = 0; step = 0; showCard(); }
        else if (t.hasAttribute("data-home")) showHome();
        else if (t.dataset.opt != null) showResult(+t.dataset.opt);
        else if (t.hasAttribute("data-retry")) { scr.querySelector(".nv-sheet").remove(); scr.querySelectorAll(".nv-opt").forEach(x => { x.disabled = false; x.classList.remove("is-not"); }); const g = scr.querySelector("[data-guru]"); g.disabled = hinted || st.mom < 1; }
        else if (t.hasAttribute("data-guru")) {
          if (st.mom < 1 || hinted) return; st.mom -= 1; hinted = true;
          const h = scr.querySelector("[data-hint]"); h.textContent = `Guru: ${cur().hint}`; h.hidden = false; t.disabled = true;
          scr.querySelector(".nv-top").outerHTML = bar(st, `<button class="nv-back" data-home aria-label="Back to arcs">←</button><span class="nv-where">${esc(arcs[arc].name)}</span>`);
        }
        else if (t.hasAttribute("data-next")) {
          const c = arcs[arc].cards[card];
          if (step < c.steps.length - 1) step++;
          else if (card < arcs[arc].cards.length - 1) { card++; step = 0; }
          else return showEnd();
          showCard();
        }
      });
    });
  }

  (window.CaseStudyExtra = window.CaseStudyExtra || {}).neevplay = phone;
  (window.CaseStudyInit = window.CaseStudyInit || []).push(wire);
})();
