/* Draws any element with data-dots in the dot-matrix font.
   - CSS font-size sets the size (one dot every font-size / 9 px)
   - CSS color sets the dot colour
   - data-dots="nowrap" keeps it on one line; otherwise it wraps to its container
   The real text stays in the page for screen readers and search. Needs dotfont.js. */
(() => {
  if (!window.DotFont) return;
  const { cols, wrap, path, GH, LINE } = window.DotFont;
  const esc = s => String(s).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

  function mount(el) {
    if (el.dataset.dotsReady != null) return;
    el.dataset.dotsReady = "";
    const text = el.textContent.trim().replace(/\s+/g, " ");
    el.innerHTML = `<span class="sr-only">${esc(text)}</span><canvas aria-hidden="true"></canvas>`;
    const c = el.querySelector("canvas");

    const draw = () => {
      const cs = getComputedStyle(el);
      let p = parseFloat(cs.fontSize) / GH;
      const avail = el.dataset.dots === "nowrap" ? Infinity : (el.parentElement.clientWidth || 600);
      const lines = wrap(text, Math.max(1, Math.floor(avail / p)));
      const widest = Math.max(...lines.map(cols));
      if (widest * p > avail) p = avail / widest;   // one word longer than the line: draw it smaller rather than spill
      const w = widest * p;
      const h = lines.length * LINE * p - (LINE - GH) * p;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      c.style.width = w + "px"; c.style.height = h + "px";
      c.width = Math.ceil(w * dpr); c.height = Math.ceil(h * dpr);
      const ctx = c.getContext("2d");
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, w, h);
      ctx.fillStyle = cs.color;
      ctx.beginPath();
      lines.forEach((line, i) => path(ctx, line, 0, i * LINE * p, p));
      ctx.fill();
    };
    el._dotsDraw = draw;
    draw();
    new ResizeObserver(() => requestAnimationFrame(draw)).observe(el.parentElement);
    const hoverHost = el.closest("a, button");
    if (hoverHost) ["mouseenter", "mouseleave", "focus", "blur"].forEach(ev => hoverHost.addEventListener(ev, () => requestAnimationFrame(draw)));
  }

  const run = (root = document) => root.querySelectorAll("[data-dots]").forEach(mount);
  window.Dots = { run, redraw: () => document.querySelectorAll("[data-dots]").forEach(el => el._dotsDraw && el._dotsDraw()) };
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(() => window.Dots.redraw());
  run();
})();
