/* =====================================================================
   THE CENTRE PIECE: chance synthesises a sentence in a field of cells.
   A rectangle of small units. A few cells quietly carry noise.
   Chance joins one of my lines with one line from the greats, and the
   words come up into the cells as blocks: each cell fills, rolls up
   through a few characters like a slot reel, then settles.
     my words: ink · the greats' words: grey, in quotes
     the accent word turns violet as it lands, last
   Phrases arrive top to bottom. The sentence holds for 15s, rolls away
   and a new one comes up. Runs only while on screen and the tab is
   open; hovering holds the sentence.
   Needs dotfont.js, chance.js and synth-data.js.
   ===================================================================== */
(() => {
  /* ================= EDIT THESE ================= */
  const HOLD = 15000;        // ms a finished sentence stays
  const PHRASE_GAP = 320;    // ms between phrases starting, top to bottom
  const LETTER_GAP = 30;     // ms between letters within a phrase
  const STEP = 85;           // ms per roll of the reel
  const ROLLS = [2, 4];      // how many characters a cell rolls through before settling
  const SETTLE = 300;        // ms for the final letter to rise into place
  const ACCENT_LAG = 500;    // ms after the rest before the accent word lands
  const LEAVE = 360;         // ms for a letter to roll away
  const DISSOLVE = 700;      // ms window over which the old sentence rolls away
  const NOISE_TICK = 140;    // ms between quiet changes in the field
  const REROLL = 0.035;      // share of field cells that change each tick
  const DENSITY = { char: 0.2, grey: 0.045, violet: 0.025 };
  const UNIT = "rgba(27, 26, 23, 0.035)";   // the faint tile behind every cell
  const BLOCK = "rgba(27, 26, 23, 0.075)";   // a cell holding a letter of the sentence
  const NOISE_BLOCK = "rgba(27, 26, 23, 0.055)";
  const NOISE_CHARS = "00011101%$&@!?{}()*#=<>:;AJFKPUYELZ";
  /* ============================================== */

  const root = document.querySelector("[data-synth]");
  if (!root || !window.Synth || !window.Chance || !window.DotFont) return;
  const { mine, greats, frames } = window.Synth;
  const C = window.Chance, { glyph } = window.DotFont;

  /* What the word "chance" under the sentence says when you hover or tap it.
     It names the real source: atmospheric noise only once random.org is on. */
  const CHANCE_TIP = {
    "random.org": "The word in violet is picked from a pool of words using atmospheric noise, via random.org.",
    other: "The word in violet is picked by chance from a pool of words.",
  };
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const $ = s => root.querySelector(s);
  const cv = $(".sy-grid"), ctx = cv.getContext("2d");
  const note = $("[data-sy-note]"), live = $("[data-sy-live]"), share = $("[data-sy-share]");
  const rnd = n => (Math.random() * n) | 0;   // visual texture only; the sentence itself comes from Chance
  const easeOut = u => 1 - Math.pow(1 - u, 3);

  /* ---------- building a sentence ---------- */
  const accentOptions = h => (mine[h].text.match(/\*([^*]+)\*/) || [, ""])[1].split("|");
  function compose(hi, gi, fi, ai = 0) {  // → [{ ch, who: "me" | "them" | "join", accent }]
    const g = greats[gi], frame = frames[g.stance][fi], out = [];
    const opts = accentOptions(hi);
    const m = { text: mine[hi].text.replace(/\*[^*]+\*/, `*${opts[ai % opts.length]}*`) };   // chance's word goes in the accent slot
    const push = (text, who) => { let acc = false; for (const ch of text) { if (ch === "*") { acc = !acc; continue; } out.push({ ch, who, accent: acc }); } };
    frame.split(/(\{A\}|\{B\})/).forEach(part => {
      if (part === "{A}") push("“" + g.text + "”", "them");
      else if (part === "{B}") push(m.text, "me");
      else push(part, "join");
    });
    const first = out.find(c => /[a-z]/i.test(c.ch)); if (first) first.ch = first.ch.toUpperCase();
    return out;
  }
  function pick(avoid) {
    let gi = C.int(greats.length);
    if (gi === avoid && greats.length > 1) gi = (gi + 1) % greats.length;
    const g = greats[gi];
    const mineIdx = mine.map((m, i) => [m, i]).filter(([m]) => m.theme === g.theme).map(([, i]) => i);
    const hi = mineIdx[C.int(mineIdx.length)];
    return [hi, gi, C.int(frames[g.stance].length), C.int(accentOptions(hi).length)];
  }
  // Words packed into short, balanced phrases, one per row. Words are never split.
  function phrases(chars) {
    const words = []; let w = [];
    for (const c of chars) { if (c.ch === " ") { if (w.length) words.push(w); w = []; } else w.push(c); }
    if (w.length) words.push(w);
    const maxW = Math.min(cols - padX * 2, Math.max(12, Math.min(28, Math.round(cols * 0.5))));   // lines stay short enough to compose
    const total = words.reduce((n, w) => n + w.length + 1, -1);
    const per = total / Math.ceil(total / maxW);
    const chunks = [[]]; let len = 0;
    for (const word of words) {
      const cur = chunks[chunks.length - 1], add = cur.length ? word.length + 1 : word.length;
      if (cur.length && (len + add > maxW || len >= per * 0.85)) { chunks.push([word]); len = word.length; }
      else { cur.push(word); len += add; }
    }
    return chunks.map(chunk => { const line = []; chunk.forEach((word, wi) => { if (wi) line.push({ ch: " ", who: "gap" }); line.push(...word); }); return line; });
  }
  // Each sentence gets one composition, picked by chance. Every phrase
  // snaps to the same few axes, so the variety still looks designed.
  const COMPOSITIONS = ["left", "right", "centre", "alternate", "step"];
  function arrange(lines, compo) {
    const n = lines.length, L = padX, R = cols - padX, usable = rows - 2;
    const gap = (n - 1) * 2 + 1 <= usable ? 2 : 1;            // a row of air between phrases when there is room
    const span = (n - 1) * gap + 1, top = 1 + Math.max(0, Math.floor((usable - span) / 2));
    const maxLen = Math.max(...lines.map(l => l.length));
    const stepW = Math.max(0, Math.floor((R - L - maxLen) / 3));
    return lines.map((line, k) => {
      const len = line.length; let x;
      if (compo === "left") x = L;
      else if (compo === "right") x = R - len;
      else if (compo === "centre") x = Math.round((cols - len) / 2);
      else if (compo === "alternate") x = k % 2 ? R - len : L;
      else x = Math.min(R - len, L + (k % 4) * stepW);         // step: four fixed indents
      return { row: top + k * gap, x, line, k };
    });
  }

  /* ---------- grid ---------- */
  let p = 2.2, CW = 15, CH = 24, cols = 34, rows = 12, padX = 2, dpr = 1, field = [], col = {};
  function measure() {
    const cs = getComputedStyle(document.documentElement), v = n => cs.getPropertyValue(n).trim();
    col = { bg: v("--bg"), ink: v("--text"), ink2: v("--text-2"), faint: v("--faint"), muted: v("--muted"), s2: v("--surface-2"), accent: v("--accent") };
    const rs = getComputedStyle(root);
    const avail = root.clientWidth - parseFloat(rs.paddingLeft) - parseFloat(rs.paddingRight);
    const wide = avail >= 640;
    p = wide ? 2.5 : 2.2;                         // dot pitch, same dot construction as the name
    CW = wide ? 17 : 15; CH = wide ? 27 : 24;   // each unit, with a hairline gutter
    cols = Math.max(16, Math.floor((wide ? Math.min(avail * 0.84, 1040) : Math.min(avail, 380)) / CW));   // wide and low on desktop
    padX = cols >= 28 ? 2 : 1;
    // just enough rows for the longest sentence chance can make
    let most = 0;
    greats.forEach((g, gi) => mine.forEach((m, hi) => { if (m.theme === g.theme) frames[g.stance].forEach((f, fi) => accentOptions(hi).forEach((o, ai) => { most = Math.max(most, phrases(compose(hi, gi, fi, ai)).length); })); }));
    rows = wide ? Math.max(9, most + 3) : Math.max(12, most + 2);
    dpr = Math.min(devicePixelRatio || 1, 2);
    const W = cols * CW, H = rows * CH;
    cv.style.width = W + "px"; cv.style.height = H + "px";
    cv.width = Math.round(W * dpr); cv.height = Math.round(H * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    root.style.setProperty("--grid-w", W + "px");
    field = Array.from({ length: cols * rows }, roll);
  }
  function roll() {
    const r = Math.random();
    const bg = r < DENSITY.violet ? 2 : r < DENSITY.violet + DENSITY.grey ? 1 : 0;
    return { bg, ch: bg || Math.random() < DENSITY.char ? NOISE_CHARS[rnd(NOISE_CHARS.length)] : "" };
  }

  /* ---------- the sentence in the cells ---------- */
  let cells = new Map(), leaving = null, current = null, compo = "left", phaseStart = 0, settleAt = 0;
  function place(combo, start, instant) {
    if (!instant || !current) compo = COMPOSITIONS[C.int(COMPOSITIONS.length)];
    const lines = arrange(phrases(compose(...combo)), compo), next = new Map();
    let lastEnd = 0;
    lines.forEach(({ row, x, line, k }) => line.forEach((c, ci) => {
      if (c.who === "gap") return;
      const rolls = ROLLS[0] + rnd(ROLLS[1] - ROLLS[0] + 1);
      const seq = Array.from({ length: rolls }, () => NOISE_CHARS[rnd(NOISE_CHARS.length)]);
      const at = instant ? -1e9 : k * PHRASE_GAP + ci * LETTER_GAP + Math.random() * 60;
      const cell = { ...c, seq, at, dur: rolls * STEP + SETTLE };
      next.set(row * cols + x + ci, cell);
      if (!c.accent) lastEnd = Math.max(lastEnd, at + cell.dur);
    }));
    let end = lastEnd;
    for (const c of next.values()) if (c.accent) { if (!instant) c.at = lastEnd + ACCENT_LAG + Math.random() * 120; end = Math.max(end, c.at + c.dur); }
    cells = next; current = combo; phaseStart = start;
    settleAt = start + (instant ? 0 : end) + 100;
    root.classList.remove("is-settled");
  }
  function calm(i, now) {  // the noise clears around words as they come up
    const r = (i / cols) | 0, c = i % cols;
    for (let dr = -1; dr <= 1; dr++) for (let dc = -2; dc <= 2; dc++) {
      const rr = r + dr, cc = c + dc;
      if (rr < 0 || cc < 0 || rr >= rows || cc >= cols) continue;
      const t = cells.get(rr * cols + cc);
      if (t && now - phaseStart >= t.at) return true;
    }
    return false;
  }

  /* ---------- drawing ---------- */
  function glyphAt(ch, x, y, color) {  // round dots, centred in the unit, like the name
    if (!ch) return;
    const ox = x + (CW - 5 * p) / 2, oy = y + (CH - 9 * p) / 2 + p * 0.3, r = p * 0.49;
    ctx.fillStyle = color; ctx.beginPath();
    for (const [gc, gr] of glyph(ch)) { const cx = ox + gc * p + p / 2, cy = oy + gr * p + p / 2; ctx.moveTo(cx + r, cy); ctx.arc(cx, cy, r, 0, 6.2832); }
    ctx.fill();
  }
  const letterColour = c => (c.accent ? col.bg : c.who === "them" ? col.ink2 : col.ink);
  const blockColour = c => (c.accent ? col.accent : BLOCK);

  function drawWordCell(c, t, x, y) {  // t = ms since this cell started
    const roll = c.seq.length * STEP, landed = t >= roll;
    ctx.save(); ctx.beginPath(); ctx.rect(x + 1, y + 1, CW - 2, CH - 2); ctx.clip();
    // the block fills in; the accent word's block turns violet as its letter lands
    ctx.globalAlpha = Math.min(1, t / 160);
    ctx.fillStyle = BLOCK; ctx.fillRect(x, y, CW, CH);
    if (c.accent && landed) { ctx.globalAlpha = Math.min(1, (t - roll) / SETTLE); ctx.fillStyle = col.accent; ctx.fillRect(x, y, CW, CH); }
    ctx.globalAlpha = 1;
    if (t >= c.dur) { glyphAt(c.ch, x, y, letterColour(c)); ctx.restore(); return; }
    // the reel: characters roll upwards through the cell, then the letter rises in
    let from, to, u, toColour = col.faint;
    if (!landed) { const j = Math.floor(t / STEP); from = j ? c.seq[j - 1] : ""; to = c.seq[j]; u = (t % STEP) / STEP; }
    else { from = c.seq[c.seq.length - 1]; to = c.ch; u = easeOut((t - roll) / SETTLE); toColour = letterColour(c); }
    glyphAt(from, x, y - u * CH, col.faint);
    glyphAt(to, x, y + (1 - u) * CH, toColour);
    ctx.restore();
  }
  function drawLeaving(c, u, x, y) {  // the letter rolls up and away, the block fades
    ctx.save(); ctx.beginPath(); ctx.rect(x + 1, y + 1, CW - 2, CH - 2); ctx.clip();
    ctx.globalAlpha = 1 - u; ctx.fillStyle = blockColour(c); ctx.fillRect(x, y, CW, CH); ctx.globalAlpha = 1;
    glyphAt(c.ch, x, y - easeOut(u) * CH, letterColour(c));
    ctx.restore();
  }
  function draw(now) {
    ctx.clearRect(0, 0, cols * CW, rows * CH);
    for (let i = 0; i < field.length; i++) {
      const x = (i % cols) * CW, y = ((i / cols) | 0) * CH;
      ctx.fillStyle = UNIT; ctx.fillRect(x + 1, y + 1, CW - 2, CH - 2);
      const L = leaving && leaving.get(i);
      if (L && now < L.at + LEAVE) { drawLeaving(L, Math.max(0, (now - L.at) / LEAVE), x, y); continue; }
      const c = cells.get(i);
      if (c) { const t = now - phaseStart - c.at; if (t >= 0) { drawWordCell(c, t, x, y); continue; } }
      if (calm(i, now)) continue;
      const n = field[i];
      if (n.bg) { ctx.globalAlpha = n.bg === 2 ? 0.14 : 1; ctx.fillStyle = n.bg === 2 ? col.accent : NOISE_BLOCK; ctx.fillRect(x + 1, y + 1, CW - 2, CH - 2); ctx.globalAlpha = 1; }
      ctx.globalAlpha = 0.75; glyphAt(n.ch, x, y, n.bg === 2 ? col.muted : col.faint); ctx.globalAlpha = 1;
    }
  }

  /* ---------- the chance tooltip: hover, focus or tap ---------- */
  function tipWire(wrap, word, tip) {
    const place = () => {   // keep it inside the screen
      tip.style.setProperty("--shift", "0px");
      const r = tip.getBoundingClientRect(), pad = 12;
      const shift = r.left < pad ? pad - r.left : r.right > innerWidth - pad ? innerWidth - pad - r.right : 0;
      tip.style.setProperty("--shift", `${shift}px`);
    };
    let shownAt = 0;
    const show = () => { if (!wrap.classList.contains("is-open")) shownAt = performance.now(); wrap.classList.add("is-open"); word.setAttribute("aria-expanded", "true"); tipOpen = true; place(); };
    const hide = () => { wrap.classList.remove("is-open"); word.setAttribute("aria-expanded", "false"); tipOpen = false; };
    tipOpen = false; tipHide = hide; tipWrap = wrap;
    wrap.addEventListener("pointerenter", e => e.pointerType === "mouse" && show());
    wrap.addEventListener("pointerleave", e => e.pointerType === "mouse" && hide());
    word.addEventListener("focus", show);
    word.addEventListener("blur", hide);
    word.addEventListener("click", () => (wrap.classList.contains("is-open") && performance.now() - shownAt > 300 ? hide() : show()));   // a tap toggles
    word.addEventListener("keydown", e => e.key === "Escape" && (hide(), word.blur()));
  }
  let tipHide = null, tipWrap = null;
  document.addEventListener("pointerdown", e => { if (tipHide && !tipWrap.contains(e.target)) tipHide(); });   // tap anywhere else closes it

  /* ---------- the small line underneath ---------- */
  function noteIn() {
    const g = greats[current[1]];
    const el = (tag, cls, txt) => { const n = document.createElement(tag); if (cls) n.className = cls; if (txt) n.textContent = txt; return n; };
    note.textContent = "";
    note.append("From ", el("span", "sy-who", "me"), ", ", el("span", "sy-who", g.who), " ");
    const src = el("span", "sy-src", "");
    if (g.url) { const a = el("a", null, g.src); a.href = g.url; a.target = "_blank"; a.rel = "noopener"; src.append("(", a, ")"); } else src.textContent = `(${g.src})`;
    const tip = el("span", "sy-tip", CHANCE_TIP[C.source] || CHANCE_TIP.other);
    tip.id = "sy-tip"; tip.setAttribute("role", "tooltip");
    const word = el("button", "sy-chance", "chance");   // violet, like the word chance picked
    word.type = "button"; word.setAttribute("aria-describedby", "sy-tip"); word.setAttribute("aria-expanded", "false");
    const wrap = el("span", "sy-chance-wrap"); wrap.append(word, tip);
    note.append(src, " and ", wrap, ".");
    tipWire(wrap, word, tip);
    root.classList.add("is-settled");
    const text = compose(...current).map(c => c.ch).join("");
    live.textContent = text; cv.setAttribute("aria-label", text);
  }

  /* ---------- timeline: come up → hold 11s → roll away → come up ---------- */
  let active = false, onScreen = true, hover = false, tipOpen = false, raf = null, last = 0, lastNoise = 0, holdLeft = HOLD, settled = false;
  function regenerate(now) {
    leaving = new Map();
    for (const [i, c] of cells) leaving.set(i, { ...c, at: now + Math.random() * DISSOLVE });
    place(pick(current ? current[1] : -1), now + DISSOLVE * 0.7, false);
    settled = false; holdLeft = HOLD;
  }
  function frame(now) {
    raf = null;
    if (!active) return;
    const dt = last ? Math.min(now - last, 100) : 0; last = now;
    if (now - lastNoise >= NOISE_TICK) {
      const n = Math.ceil(field.length * REROLL);
      for (let k = 0; k < n; k++) field[rnd(field.length)] = roll();
      lastNoise = now;
    }
    if (!settled && now >= settleAt) { settled = true; noteIn(); }
    if (leaving && now > phaseStart + DISSOLVE + LEAVE) leaving = null;
    if (settled && !hover && !tipOpen) { holdLeft -= dt; if (holdLeft <= 0) regenerate(now); }
    draw(now);
    raf = requestAnimationFrame(frame);
  }
  function setActive(on) {
    active = on && !document.hidden;
    if (active && !raf && !reduce && current) { last = 0; raf = requestAnimationFrame(frame); }
  }
  new IntersectionObserver(es => { onScreen = es[0].isIntersecting; setActive(onScreen); }, { threshold: 0.25 }).observe(cv);
  document.addEventListener("visibilitychange", () => setActive(onScreen));
  cv.addEventListener("pointerenter", () => (hover = true));
  cv.addEventListener("pointerleave", () => (hover = false));

  /* ---------- share: the sentence lives in the link ---------- */
  function decode() {
    const m = location.hash.match(/^#s=(\d+)-(\d+)-(\d+)-(\d+)$/);
    if (!m) return null;
    const combo = [+m[1], +m[2], +m[3], +m[4]], g = greats[combo[1]], h = mine[combo[0]];
    if (!g || !h || h.theme !== g.theme || !frames[g.stance][combo[2]] || combo[3] >= accentOptions(combo[0]).length) return null;
    return combo;
  }
  share.addEventListener("click", async () => {
    const hash = `#s=${current.join("-")}`, url = location.href.split("#")[0] + hash;
    let ok = false;
    try { await navigator.clipboard.writeText(url); ok = true; } catch (e) { /* clipboard blocked */ }
    try { history.replaceState(null, "", hash); } catch (e) { /* sandboxed preview */ }
    const label = share.querySelector("[data-label]"), was = label.textContent;
    label.textContent = ok ? "Link copied" : "Link in address bar";
    setTimeout(() => (label.textContent = was), 1800);
  });

  /* ---------- start ---------- */
  measure();
  let lastW = root.clientWidth;
  new ResizeObserver(() => requestAnimationFrame(() => {   // deferred a frame so resizing never loops
    if (root.clientWidth === lastW) return;
    lastW = root.clientWidth; measure();
    if (current) place(current, performance.now(), true);
    draw(performance.now());
  })).observe(root);
  C.ready.then(() => {
    const now = performance.now(), shared = decode();
    place(shared || pick(-1), now + (shared || reduce ? 0 : 500), reduce || !!shared);
    if (reduce) { settled = true; draw(now + 1e6); noteIn(); return; }  // reduced motion: one still sentence
    draw(now);
    setActive(onScreen);
  });
})();
