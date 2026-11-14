/* =====================================================================
   CRAYON. On the first screen, the cursor leaves a crayon line, the way a
   child draws on a wall. Only in the margins: never over the centre piece,
   the name, the menu or the link at the bottom. Each line holds for a few
   seconds, then fades from its oldest end, so the wall cleans itself.

   - mouse and pen only (on touch, a finger is for scrolling)
   - the line follows a smoothed copy of the cursor, so it never jitters
   - each new line picks the next crayon; violet is left out (it is chance's)
   - drawn under the page's text, on a canvas the pointer passes through
   ===================================================================== */
(() => {
  const hero = document.querySelector(".hero");
  if (!hero || !matchMedia("(hover: hover) and (pointer: fine)").matches) return;

  const HOLD = 4500, FADE = 2500, LIFE = HOLD + FADE;   // ms a point stays, then fades
  const GAP = 700;                                       // a pause this long lifts the crayon
  const CRAYONS = ["#d4543c", "#e38d34", "#e2b832", "#5f9f4a", "#3a7fc2", "#2f9c96", "#d0618f"];
  const AVOID = [[".sy-grid", 28], [".sy-foot", 20], [".brand", 12], [".nav", 12], [".hero-base .action", 14]];

  const cv = document.createElement("canvas");
  cv.className = "crayon"; cv.setAttribute("aria-hidden", "true");
  hero.prepend(cv);
  const ctx = cv.getContext("2d");
  let W = 0, H = 0, dpr = 1, grain = null;

  // paper tooth: a fixed field of specks rubbed out of every line
  const makeGrain = () => {
    const g = document.createElement("canvas"); g.width = g.height = 160;
    const c = g.getContext("2d"), img = c.createImageData(160, 160);
    for (let i = 0; i < img.data.length; i += 4) { const v = Math.random(); img.data[i + 3] = v > 0.55 ? (v - 0.55) * 420 : 0; }
    c.putImageData(img, 0, 0);
    return ctx.createPattern(g, "repeat");
  };
  const size = () => {
    const r = hero.getBoundingClientRect();
    dpr = Math.min(devicePixelRatio || 1, 2); W = r.width; H = r.height;
    cv.width = W * dpr; cv.height = H * dpr; cv.style.width = W + "px"; cv.style.height = H + "px";
    grain = makeGrain(); kick();
  };

  // where the crayon may not go, in hero coordinates
  let zones = [];
  const measure = () => {
    const h = hero.getBoundingClientRect();
    zones = AVOID.flatMap(([sel, pad]) => [...hero.querySelectorAll(sel)].map(el => {
      const r = el.getBoundingClientRect();
      return r.width ? [r.left - h.left - pad, r.top - h.top - pad, r.right - h.left + pad, r.bottom - h.top + pad] : null;
    })).filter(Boolean);
  };
  const blocked = (x, y) => zones.some(([a, b, c, d]) => x > a && x < c && y > b && y < d);

  /* strokes: [{ col, pts: [{ x, y, t, w, o }] }] */
  let strokes = [], cur = null, colour = Math.floor(Math.random() * CRAYONS.length);
  let target = null, pen = null, lastMove = 0, raf = 0, measured = 0;

  const lift = () => { cur = null; };
  const add = (x, y, now) => {
    if (blocked(x, y) || x < 0 || y < 0 || x > W || y > H) return lift();
    if (!cur) { colour = (colour + 1) % CRAYONS.length; cur = { col: CRAYONS[colour], pts: [] }; strokes.push(cur); }
    const p = cur.pts[cur.pts.length - 1];
    if (p && Math.hypot(x - p.x, y - p.y) < 1.5) return;
    cur.pts.push({ x, y, t: now, w: 2.2 + Math.random() * 1.1, o: (Math.random() - 0.5) * 1.6 });
  };

  addEventListener("pointermove", e => {
    if (e.pointerType === "touch") return;
    const h = hero.getBoundingClientRect(), x = e.clientX - h.left, y = e.clientY - h.top, now = performance.now();
    if (y < 0 || y > h.height) { target = null; pen = null; lift(); return; }
    if (!pen || now - lastMove > GAP) { lift(); pen = { x, y }; }
    if (now - measured > 250) { measure(); measured = now; }
    lastMove = now; target = { x, y };
    kick();
  }, { passive: true });
  hero.addEventListener("pointerleave", () => { target = null; pen = null; lift(); });
  addEventListener("scroll", () => { lift(); measure(); }, { passive: true });

  const segment = (a, b, c, width, alpha, col, off) => {
    // a smooth curve through the midpoints, so corners round off like a hand's
    ctx.beginPath();
    ctx.moveTo((a.x + b.x) / 2 + off * b.o, (a.y + b.y) / 2 - off * b.o);
    ctx.quadraticCurveTo(b.x + off * b.o, b.y - off * b.o, (b.x + c.x) / 2 + off * c.o, (b.y + c.y) / 2 - off * c.o);
    ctx.globalAlpha = alpha; ctx.strokeStyle = col; ctx.lineWidth = width; ctx.stroke();
  };

  const frame = now => {
    raf = 0;
    // the pen chases the cursor with a little lag: smooth, never twitchy
    if (target && pen) {
      pen.x += (target.x - pen.x) * 0.38; pen.y += (target.y - pen.y) * 0.38;
      if (now - lastMove < GAP) add(pen.x, pen.y, now);
    }
    strokes = strokes.filter(s => (s.pts = s.pts.filter(p => now - p.t < LIFE)).length > 1 || s === cur);

    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, W, H);
    ctx.globalCompositeOperation = "source-over"; ctx.lineCap = ctx.lineJoin = "round";
    for (const s of strokes) {
      const P = s.pts;
      for (let i = 1; i < P.length - 1; i++) {
        const age = now - P[i].t, a = age < HOLD ? 1 : 1 - (age - HOLD) / FADE;
        if (a <= 0) continue;
        const k = a * a * (3 - 2 * a);                       // ease the fade
        segment(P[i - 1], P[i], P[i + 1], P[i].w, 0.62 * k, s.col, 0);          // the body of the line
        segment(P[i - 1], P[i], P[i + 1], 1.1, 0.34 * k, s.col, 1);             // wax that caught on one side
        segment(P[i - 1], P[i], P[i + 1], 0.9, 0.22 * k, s.col, -1.2);          // and the other
      }
    }
    if (grain) { ctx.globalCompositeOperation = "destination-out"; ctx.globalAlpha = 1; ctx.fillStyle = grain; ctx.fillRect(0, 0, W, H); }
    ctx.globalCompositeOperation = "source-over"; ctx.globalAlpha = 1;
    if (strokes.some(s => s.pts.length) || (target && now - lastMove < GAP)) kick();
  };
  function kick() { if (!raf) raf = requestAnimationFrame(frame); }

  new ResizeObserver(() => { size(); measure(); }).observe(hero);
  addEventListener("load", measure);
  setTimeout(measure, 1200);   // the centre piece settles its size after the font loads
  size(); measure();
})();
