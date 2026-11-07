/* =====================================================================
   The name in the header, drawn in dots.
   1. Types itself in, with the violet cursor.
   2. Then a random letter explodes every few seconds and snaps back.
   3. Dots shy away from the pointer; click or tap a letter to pop it.
   Respects reduced motion: drawn once, no explosions.
   Needs dotfont.js. Markup: <a data-name>Harshwardhan Harne</a>
   ===================================================================== */
(() => {
  /* ================= EDIT THESE ================= */
  const EXPLODE_EVERY = 3000;  // ms between explosions
  const TYPE_SPEED = [60, 100];// ms per typed letter (min, max)
  const TYPE_ON_PAGES = ["home"];  // only the landing page types the name in
  /* ============================================== */

  const host = document.querySelector("[data-name]");
  if (!host || !window.DotFont) return;
  const { glyph, cols, GH } = window.DotFont;
  const text = host.textContent.trim();
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const typeIn = !reduce && TYPE_ON_PAGES.includes(document.body.dataset.page);
  const DT = 1000 / 60;
  const rand = (a, b) => a + Math.random() * (b - a);

  host.innerHTML = `<span class="sr-only">${text}</span><canvas aria-hidden="true"></canvas>`;
  host.style.position = "relative";
  host.style.display = "inline-block";
  const canvas = host.querySelector("canvas");
  canvas.style.position = "absolute";
  canvas.style.pointerEvents = "none";
  const ctx = canvas.getContext("2d");

  let p = 3, M = 100, W = 0, H = 0, letters = [], dots = [];
  let colText = "#1b1a17", colAcc = "#5e5297";

  function layout() {
    const cs = getComputedStyle(host);
    p = parseFloat(cs.fontSize) / GH;
    colText = cs.color;
    colAcc = getComputedStyle(document.documentElement).getPropertyValue("--accent").trim() || colAcc;
    const w = cols(text) * p, h = 7 * p;               // name has no descenders
    host.style.width = w + "px"; host.style.height = h + "px";
    M = Math.round(p * 26);                             // room for dots to fly
    W = w + M * 2; H = h + M * 2;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.style.left = -M + "px"; canvas.style.top = -M + "px";
    canvas.style.width = W + "px"; canvas.style.height = H + "px";
    canvas.width = Math.round(W * dpr); canvas.height = Math.round(H * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    letters = []; dots = [];
    for (let i = 0; i < text.length; i++) {
      if (text[i] === " ") continue;
      const x0 = M + i * 6 * p, y0 = M;
      const l = { i, x: x0, cx: x0 + 2.5 * p, cy: y0 + 3.5 * p, ps: [], cool: 0 };
      for (const [gc, gr] of glyph(text[i])) {
        const hx = x0 + gc * p + p / 2, hy = y0 + gr * p + p / 2;
        const d = { hx, hy, x: hx, y: hy, vx: 0, vy: 0, i, free: false, back: -1 };
        l.ps.push(d); dots.push(d);
      }
      letters.push(l);
    }
  }

  /* ---------- motion ---------- */
  function burst(l, power = 1) {
    if (!l || l.ps.some(d => d.free) || clock < l.cool) return;
    let cx = 0, cy = 0;
    for (const d of l.ps) { cx += d.x; cy += d.y; }
    cx /= l.ps.length; cy /= l.ps.length;
    for (const d of l.ps) {
      const dx = d.x - cx, dy = d.y - cy;
      const a = (Math.abs(dx) + Math.abs(dy) < 0.5 ? Math.random() * 6.28 : Math.atan2(dy, dx)) + (Math.random() - 0.5) * 0.9;
      const s = p * rand(1.2, 3.0) * power;
      d.vx = Math.cos(a) * s; d.vy = Math.sin(a) * s;
      d.free = true; d.back = 48 + Math.floor(Math.random() * 24);
    }
    l.cool = clock + 1400;
    wake();
  }
  const nearest = (x, y, max) => {
    let best = null, bd = max * max;
    for (const l of letters) { const d = (l.cx - x) ** 2 + (l.cy - y) ** 2; if (d < bd) { bd = d; best = l; } }
    return best;
  };

  /* ---------- timeline ---------- */
  let clock = 0, shown = typeIn ? 0 : text.length, typing = typeIn, nextType = 300, typedAt = 0;
  let nextBurst = typeIn ? Infinity : 1500;

  function step() {
    clock += DT;
    if (typing && clock >= nextType) {
      shown++;
      nextType = clock + rand(...TYPE_SPEED);
      if (shown >= text.length) { typing = false; typedAt = clock; nextBurst = clock + 1000; }
    }
    if (!typing && clock >= nextBurst) {
      burst(letters[Math.floor(Math.random() * letters.length)]);
      nextBurst = clock + EXPLODE_EVERY;
    }
    for (const d of dots) {
      if (d.free) {
        d.vx *= 0.9; d.vy *= 0.9; d.x += d.vx; d.y += d.vy;
        if (d.back >= 0 && d.back-- === 0) d.free = false;
      } else {
        let ax = (d.hx - d.x) * 0.075, ay = (d.hy - d.y) * 0.075;
        if (pointer.on) {                                  // dots shy away from the pointer
          const dx = d.x - pointer.x, dy = d.y - pointer.y, d2 = dx * dx + dy * dy, R = p * 6;
          if (d2 < R * R && d2 > 0.01) { const k = Math.sqrt(d2), f = (1 - k / R) * 2.2; ax += dx / k * f; ay += dy / k * f; }
        }
        d.vx = (d.vx + ax) * 0.8; d.vy = (d.vy + ay) * 0.8;
        d.x += d.vx; d.y += d.vy;
      }
    }
  }

  let visible = true;
  const busy = () => visible;

  function draw() {
    ctx.clearRect(0, 0, W, H);
    const r = p * 0.36;
    ctx.fillStyle = colText; ctx.beginPath();
    for (const d of dots) {
      if (d.i >= shown) continue;
      ctx.moveTo(d.x + r, d.y); ctx.arc(d.x, d.y, r, 0, Math.PI * 2);
    }
    ctx.fill();
    // the violet cursor: shown while typing, blinks briefly after
    const showCursor = typing || (typeIn && clock < typedAt + 2200 && clock % 1000 < 560);
    if (showCursor) {
      const x0 = M + shown * 6 * p;
      ctx.fillStyle = colAcc; ctx.beginPath();
      for (let gr = 0; gr < 7; gr++) for (let gc = 0; gc < 5; gc++) {
        const cx = x0 + gc * p + p / 2, cy = M + gr * p + p / 2;
        ctx.moveTo(cx + r, cy); ctx.arc(cx, cy, r, 0, Math.PI * 2);
      }
      ctx.fill();
    }
  }

  /* ---------- loop: runs only while something moves ---------- */
  let raf = null, last = 0, acc = 0;
  function loop(now) {
    acc += Math.min(now - last, 100); last = now;
    while (acc >= DT) { step(); acc -= DT; }
    draw();
    raf = busy() ? requestAnimationFrame(loop) : null;
  }
  function wake() { if (!raf && !reduce) { last = performance.now(); raf = requestAnimationFrame(loop); } }

  /* ---------- interaction ---------- */
  const pointer = { x: 0, y: 0, on: false };
  const local = e => { const r = canvas.getBoundingClientRect(); return [e.clientX - r.left, e.clientY - r.top]; };
  // Track the pointer over the whole header area so dots can move away before you touch them
  const zone = host.closest("header") || host;
  zone.addEventListener("pointermove", e => { [pointer.x, pointer.y] = local(e); pointer.on = true; });
  zone.addEventListener("pointerleave", () => { pointer.on = false; });
  host.addEventListener("pointerdown", e => {
    if (reduce || typing) return;
    const [x, y] = local(e); burst(nearest(x, y, p * 6));
  });
  new IntersectionObserver(es => { visible = es[0].isIntersecting; if (visible) wake(); }).observe(host);

  const redo = () => { layout(); draw(); wake(); };
  new ResizeObserver(() => requestAnimationFrame(redo)).observe(host.parentElement);
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(redo);
  layout(); draw(); wake();
})();
