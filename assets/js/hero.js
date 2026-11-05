/* =====================================================================
   Landing page: the dot-matrix name + taglines.
   By default a random letter explodes every few seconds (click one to
   pop it yourself). Four games are built in but switched off: set
   PLAY_GAMES to true to pick one at random on every reload.
   Any game can still be opened with ?game=still | chain | odds | rebuild
   Needs dotfont.js first.
   ===================================================================== */
(() => {
  /* ================= EDIT THESE ================= */
  const NAME = "Harshwardhan Harne";
  const TAGLINES = [
    "Designer who builds",
    "Part designer, part engineer, part storyteller",
    "Making tech that helps people flourish",
  ];
  const PLAY_GAMES = false;      // true = a random game on every reload
  const EXPLODE_EVERY = 3000;    // ms between letter explosions when games are off
  /* ============================================== */

  const { glyph, cols, wrap, GH, LINE } = window.DotFont;
  const canvas = document.getElementById("dots");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  const hud = document.getElementById("score");
  const params = new URLSearchParams(location.search);
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const store = {
    get(k) { try { return localStorage.getItem(k); } catch { return null; } },
    set(k, v) { try { localStorage.setItem(k, v); } catch {} },
  };
  const DT = 1000 / 60;
  const rand = (a, b) => a + Math.random() * (b - a);
  const secs = ms => (ms / 1000).toFixed(1);

  let C = {};
  function readColors() {
    const css = getComputedStyle(document.documentElement);
    C = {
      on: css.getPropertyValue("--text").trim() || "#ebe8e2",
      tag: css.getPropertyValue("--text-2").trim() || "#d4d0c8",
      acc: css.getPropertyValue("--accent").trim() || "#ff5b1f",
    };
  }
  readColors();

  function say(text) {
    if (!hud) return;
    if (hud.textContent !== text) hud.textContent = text;
    hud.classList.toggle("on", !!text);
  }

  /* ---------------- layout ---------------- */
  let W = 0, H = 0, np = 6, tp = 3;
  let namePlace = [], tagPlaces = [];
  let P = [];   // every dot of the name
  let L = [];   // letters: { i, ch, x, y, cx, cy, ps: [dots] }

  function place(lines, left, width, y0, p) {
    const out = []; let i = 0;
    lines.forEach((line, li) => {
      const x0 = left + (width - cols(line) * p) / 2;
      for (let k = 0; k < line.length; k++) out.push({ ch: line[k], x: x0 + k * 6 * p, y: y0 + li * LINE * p, i: i++ });
      i++;
    });
    return out;
  }

  function layout() {
    const r = canvas.getBoundingClientRect();
    W = r.width; H = r.height;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.round(W * dpr); canvas.height = Math.round(H * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    const pad = window.innerWidth <= 600 ? 20 : 40;
    const left = Math.max(0, (W - 1200) / 2) + pad;
    const maxW = Math.min(W, 1200) - pad * 2;

    let lines = [NAME], p = maxW / cols(NAME);
    if (p < 4.5) { lines = NAME.split(" "); p = maxW / Math.max(...lines.map(cols)); }
    np = Math.min(p, 6.5);
    tp = Math.max(2.6, np * 0.5);

    const tagWrapped = TAGLINES.map(t => wrap(t, Math.floor(maxW / tp)));
    const tagLinesMax = Math.max(...tagWrapped.map(l => l.length));
    const nameH = lines.length * LINE * np - (LINE - GH) * np;
    const gap = Math.max(18, np * 3);
    const tagH = tagLinesMax * LINE * tp - (LINE - GH) * tp;
    const top = Math.max(48, (H - (nameH + gap + tagH)) * 0.47);

    namePlace = place(lines, left, maxW, top, np);
    tagPlaces = tagWrapped.map(l => place(l, left, maxW, top + nameH + gap, tp));

    P = []; L = [];
    for (const c of namePlace) {
      if (c.ch === " ") continue;
      const l = { i: c.i, ch: c.ch, x: c.x, y: c.y, cx: c.x + 2.5 * np, cy: c.y + 3.5 * np, ps: [] };
      for (const [gc, gr] of glyph(c.ch)) {
        const hx = c.x + gc * np + np / 2, hy = c.y + gr * np + np / 2;
        const d = { hx, hy, x: hx, y: hy, vx: 0, vy: 0, l, free: false, back: -1, hot: false, hotT: 0, live: 0,
                    carried: false, ox: rand(-1, 1), oy: rand(-1, 1) };
        l.ps.push(d); P.push(d);
      }
      L.push(l);
    }
  }

  /* ---------------- shared moves ---------------- */
  // Blow a letter apart from wherever its dots currently are
  function burst(l, { speed = [1.2, 3.4], hot = false } = {}) {
    let cx = 0, cy = 0;
    for (const p of l.ps) { cx += p.x; cy += p.y; }
    cx /= l.ps.length; cy /= l.ps.length;
    for (const p of l.ps) {
      const dx = p.x - cx, dy = p.y - cy;
      const a = (Math.abs(dx) + Math.abs(dy) < 0.5 ? Math.random() * 6.28 : Math.atan2(dy, dx)) + (Math.random() - 0.5) * 0.9;
      const s = np * rand(speed[0], speed[1]);
      p.vx = Math.cos(a) * s; p.vy = Math.sin(a) * s;
      p.free = true; p.back = -1; p.hot = hot;
    }
  }
  // Send free dots home after a short, staggered delay (in frames)
  function release(ps, delay = 0, spread = 18) {
    for (const p of ps) if (p.free) p.back = delay + Math.floor(Math.random() * spread);
  }
  function nearestLetter(x, y, max = Infinity) {
    let best = null, bd = max * max;
    for (const l of L) { const d = (l.cx - x) ** 2 + (l.cy - y) ** 2; if (d < bd) { bd = d; best = l; } }
    return best;
  }
  const settled = () => P.every(p => !p.free && Math.abs(p.x - p.hx) + Math.abs(p.y - p.hy) < 0.6);

  /* ---------------- pointer ---------------- */
  const pointer = { x: 0, y: 0, on: false, lx: null, ly: null };
  const local = e => { const r = canvas.getBoundingClientRect(); return [e.clientX - r.left, e.clientY - r.top]; };
  canvas.addEventListener("pointermove", e => {
    const [x, y] = local(e);
    const dx = pointer.lx == null ? 0 : x - pointer.lx, dy = pointer.ly == null ? 0 : y - pointer.ly;
    pointer.x = x; pointer.y = y; pointer.lx = x; pointer.ly = y; pointer.on = true;
    if (ready) game.move?.(x, y, dx, dy);
  });
  canvas.addEventListener("pointerdown", e => {
    const [x, y] = local(e);
    pointer.x = x; pointer.y = y; pointer.lx = x; pointer.ly = y; pointer.on = true;
    if (ready) game.down?.(x, y);
  });
  const off = e => { if (e.type === "pointerleave" || e.pointerType !== "mouse") { pointer.on = false; pointer.lx = pointer.ly = null; } };
  canvas.addEventListener("pointerup", off);
  canvas.addEventListener("pointercancel", off);
  canvas.addEventListener("pointerleave", off);
  document.addEventListener("keydown", e => {
    if (!ready || (e.key !== " " && e.key !== "Enter")) return;
    if (document.activeElement && document.activeElement !== document.body) return;
    if (game.key) { e.preventDefault(); game.key(); }
  });

  /* =====================================================================
     THE GAMES
     Each one: physics (drag / spring k / repel), start(), and any of
     step(), move(), down(), key(). Scores are kept per game in the browser.
     ===================================================================== */
  let spin = null;        // used by "odds": letters currently spinning → shown char
  let tagOn = true;       // games can hold the taglines back until they're won

  const games = {

    /* ---- 0. No game: a random letter explodes every few seconds ---- */
    calm: {
      drag: 0.9, k: 0.075, repel: true,
      start() { this.next = clock + 1000; say(""); },
      pop(l) { if (l && !l.ps.some(p => p.free)) { burst(l); release(l.ps, 48 + Math.floor(Math.random() * 24), 18); } },
      step() {
        if (clock < this.next) return;
        this.pop(L[Math.floor(Math.random() * L.length)]);
        this.next = clock + EXPLODE_EVERY;
      },
      down(x, y) { this.pop(nearestLetter(x, y, np * 6)); },
    },

    /* ---- 1. Stay still: moving breaks the name, stillness rebuilds it ---- */
    still: {
      drag: 0.94, k: 0.03, repel: false,
      start() {
        this.since = clock; this.best = parseFloat(store.get("hh-best-still")) || 0;
        tagOn = false;
        for (const l of L) burst(l, { speed: [0.5, 1.4] });
        say("Hold still.");
      },
      shake(x, y, power) {
        const held = clock - this.since;
        if (held > 1000 && held / 1000 > this.best) { this.best = +(held / 1000).toFixed(1); store.set("hh-best-still", this.best); }
        this.since = clock; tagOn = false;
        for (const p of P) if (p.free) p.back = -1;       // nothing comes back while you move
        for (const l of L) {
          if (Math.hypot(l.cx - x, l.cy - y) < np * 10 && l.ps.some(p => !p.free)) burst(l, { speed: [0.5, 1.2 + power * 0.04] });
        }
      },
      move(x, y, dx, dy) { const s = Math.hypot(dx, dy); if (s > 1.5) this.shake(x, y, s); },
      step() {
        const held = clock - this.since;
        if (held > 900) for (const p of P) if (p.free && p.back < 0) p.back = Math.floor(rand(0, 70));
        if (held > 2600 && settled()) tagOn = true;
        if (held < 900) say("Hold still.");
        else {
          const now = +(held / 1000).toFixed(1);
          say(`Still for ${secs(held)}s` + (this.best ? `   ·   Best ${Math.max(this.best, now).toFixed(1)}s` : ""));
        }
      },
    },

    /* ---- 2. Chain reaction: one click, flying dots set off other letters ---- */
    chain: {
      drag: 0.93, k: 0.075, repel: true, walls: false,
      tune: { reach: 0.8, live: 12, speed: [0.7, 1.8] },   // higher = longer chains
      start() {
        this.best = parseInt(store.get("hh-best-chain")) || 0;
        this.armed = true; this.done = false; this.hit = new Set(); this.count = 0;
        say("One click. Start a chain reaction.");
      },
      fire(l) {
        this.hit.add(l); this.count++; this.last = clock;
        burst(l, { speed: this.tune.speed, hot: true });
        for (const p of l.ps) p.live = this.tune.live;
        say(`Chain ${this.count}`);
      },
      down(x, y) {
        if (!this.armed) return;
        const l = nearestLetter(x, y, np * 14);
        if (!l) return;
        this.armed = false; this.done = false; this.hit = new Set(); this.count = 0;
        this.fire(l);
      },
      step() {
        if (this.armed) return;
        if (!this.done) {
          const R = np * this.tune.reach;
          for (const p of P) {
            if (p.live <= 0) continue;
            p.live--;
            for (const l of L) if (!this.hit.has(l) && Math.abs(p.x - l.cx) < R && Math.abs(p.y - l.cy) < R * 1.4) this.fire(l);
          }
          if (clock - this.last > 1300) {
            this.done = true; this.rearm = clock + 1800;
            release(P, 0, 30);
            if (this.count > this.best) { this.best = this.count; store.set("hh-best-chain", this.best); }
            say(this.count === L.length
              ? `Full chain! All ${L.length} letters.   ·   Best ${this.best}`
              : `Chain ${this.count} of ${L.length}   ·   Best ${this.best}`);
          }
        } else if (clock > this.rearm) {
          this.armed = true;
          say(`Chain ${this.count} of ${L.length}   ·   Best ${this.best}   ·   Again?`);
        }
      },
    },

    /* ---- 3. Against the odds: letters spin like slot reels, tap to stop ---- */
    odds: {
      drag: 0.9, k: 0.075, repel: true,
      start() {
        this.best = parseInt(store.get("hh-best-odds")) || 0;
        this.n = 0; this.matched = 0; this.tick = 0;
        spin = new Map(L.map(l => [l, this.pick(l.ch)]));
        say("Tap to stop each letter.");
      },
      pick(ch) {
        const A = "ABCDEFGHIJKLMNOPQRSTUVWXYZ", a = A.toLowerCase();
        const set = ch === ch.toUpperCase() ? A : a;
        return set[Math.floor(Math.random() * set.length)];
      },
      odds(n) {
        const v = 26 ** n, names = ["", "thousand", "million", "billion", "trillion", "quadrillion", "quintillion", "sextillion", "septillion", "octillion"];
        const e = Math.min(names.length - 1, Math.floor(Math.log10(v) / 3));
        return `${(v / 10 ** (e * 3)).toFixed(1)} ${names[e]}`;
      },
      key() { this.down(); },
      down() {
        if (!spin) { this.start(); return; }
        const l = L[this.n++], ch = spin.get(l);
        spin.delete(l);
        if (ch === l.ch) {                     // landed it
          this.matched++;
          for (const p of l.ps) p.hotT = 1100;
        } else {                               // wrong letter: it explodes and re-forms as the right one
          const pts = glyph(ch);
          l.ps.forEach((p, j) => {
            const [gc, gr] = pts.length ? pts[j % pts.length] : [2, 3];
            p.x = l.x + gc * np + np / 2; p.y = l.y + gr * np + np / 2;
          });
          burst(l, { speed: [0.8, 2.2] });
          release(l.ps, 22, 16);
        }
        if (this.n < L.length) { say(`${this.matched} of ${this.n} matched`); return; }
        spin = null;
        if (this.matched > this.best) { this.best = this.matched; store.set("hh-best-odds", this.best); }
        say(`Matched ${this.matched} of ${L.length}   ·   Best ${this.best}\nOdds of all ${L.length}: 1 in ${this.odds(L.length)}   ·   Tap to spin again`);
      },
      step() {
        if (spin && clock > this.tick) {
          for (const l of spin.keys()) spin.set(l, this.pick(l.ch));
          this.tick = clock + 75;
        }
      },
    },

    /* ---- 4. Rebuild me: the name starts in pieces, sweep the dots home ---- */
    rebuild: {
      drag: 0.9, k: 0.12, repel: false,
      start() {
        this.best = parseFloat(store.get("hh-best-rebuild")) || 0;
        this.done = false; this.t0 = clock; this.touched = false; this.grace = clock + 900;
        tagOn = false;
        for (const l of L) burst(l, { speed: [3, 10] });
        for (const p of P) p.carried = false;
        say("Sweep the dots back into place.");
      },
      move() { this.touched = true; },
      down() {
        this.touched = true;
        if (this.done && clock - this.doneAt > 800) this.start();
      },
      step() {
        if (this.done || clock < this.grace) return;
        // the magnet grows as the name fills in, so the last stragglers are easy to find
        const done0 = P.reduce((n, p) => n + !p.free, 0) / P.length;
        const pick = np * (8 + 14 * done0), lock = np * 1.3, pull = np * 9;
        let home = 0;
        for (const p of P) {
          if (!p.free) { home++; continue; }
          const hd = Math.hypot(p.hx - p.x, p.hy - p.y);
          if (hd < lock) { p.free = false; p.carried = false; home++; continue; }
          if (pointer.on && Math.hypot(p.x - pointer.x, p.y - pointer.y) < pick) p.carried = true;
          if (!pointer.on) p.carried = false;
          if (p.carried) {
            // follow the cursor, but once a dot is close to its own spot, home wins
            const tx = pointer.x + p.ox * np * 4, ty = pointer.y + p.oy * np * 4;
            const follow = hd < pull ? 0.005 : 0.02;
            p.vx += (tx - p.x) * follow + rand(-0.25, 0.25);
            p.vy += (ty - p.y) * follow + rand(-0.25, 0.25);
            if (hd < pull) { p.vx += (p.hx - p.x) * 0.1; p.vy += (p.hy - p.y) * 0.1; }
          } else {
            p.vx += rand(-0.06, 0.06); p.vy += rand(-0.06, 0.06);
          }
        }
        const pct = home / P.length;
        if (pct >= 1) {
          this.done = true; this.doneAt = clock;
          const t = (clock - this.t0) / 1000;
          if (!this.best || t < this.best) { this.best = +t.toFixed(1); store.set("hh-best-rebuild", this.best); }
          tagOn = true;
          say(`Rebuilt in ${t.toFixed(1)}s   ·   Best ${this.best.toFixed(1)}s   ·   Click to scatter again`);
        } else if (this.touched && pct > 0.01) {
          say(`${Math.floor(pct * 100)}% rebuilt`);
        }
      },
    },
  };

  // Pick a game: from the URL, otherwise random (not the same as last time)
  const ids = Object.keys(games).filter(g => g !== "calm");
  let id = params.get("game");
  if (!games[id] || id === "calm") {
    if (PLAY_GAMES) {
      const lastId = store.get("hh-last-game");
      const pool = ids.filter(g => g !== lastId);
      id = pool[Math.floor(Math.random() * pool.length)];
      store.set("hh-last-game", id);
    } else id = "calm";
  }
  const game = games[id];
  document.documentElement.dataset.game = id;

  /* ---------------- timeline ---------------- */
  let phase = reduce ? "static" : "name";
  let clock = 0, timer = 400, typing = false, ready = false;
  let nameN = reduce ? NAME.length : 0;
  let tagIdx = 0, tagN = reduce ? TAGLINES[0].length : 0;

  function step() {
    clock += DT; timer -= DT;
    if (timer <= 0) {
      switch (phase) {
        case "name":
          nameN++; typing = true; timer = 70 + Math.random() * 50;
          if (nameN >= NAME.length) { phase = "pause"; timer = 700; typing = false; ready = true; game.start(); }
          break;
        case "pause": phase = tagOn ? "type" : "gap"; timer = 0; break;
        case "type":
          if (!tagOn) { phase = "del"; break; }
          tagN++; typing = true; timer = 35 + Math.random() * 35;
          if (tagN >= TAGLINES[tagIdx].length) { phase = "hold"; timer = 2800; typing = false; }
          break;
        case "hold": phase = "del"; timer = 0; break;
        case "del":
          tagN--; typing = true; timer = 16;
          if (tagN <= 0) { tagN = 0; phase = "gap"; timer = 450; typing = false; }
          break;
        case "gap":
          if (!tagOn) { timer = 150; break; }
          tagIdx = (tagIdx + 1) % TAGLINES.length; phase = "type"; timer = 0; break;
      }
    }
    if (!tagOn && phase === "hold") { phase = "del"; timer = 0; }

    if (ready) game.step?.();

    const drag = game.drag ?? 0.9, k = game.k ?? 0.075;
    const rad = np * 0.36;
    for (const p of P) {
      if (p.hotT > 0) p.hotT -= DT;
      if (p.free) {
        p.vx *= drag; p.vy *= drag;
        p.x += p.vx; p.y += p.vy;
        // keep dots on screen, clear of the menu and footer (chain reaction lets them fly off)
        const top = 76, bottom = H - 110;
        if (game.walls !== false) if (p.x < rad) { p.x = rad; p.vx = Math.abs(p.vx) * 0.6; } else if (p.x > W - rad) { p.x = W - rad; p.vx = -Math.abs(p.vx) * 0.6; }
        if (game.walls !== false) if (p.y < top) { p.y = top; p.vy = Math.abs(p.vy) * 0.6; } else if (p.y > bottom) { p.y = bottom; p.vy = -Math.abs(p.vy) * 0.6; }
        if (p.back >= 0 && p.back-- === 0) p.free = false;
      } else {
        let ax = (p.hx - p.x) * k, ay = (p.hy - p.y) * k;
        if (game.repel && pointer.on) {
          const dx = p.x - pointer.x, dy = p.y - pointer.y, d2 = dx * dx + dy * dy, R = np * 6;
          if (d2 < R * R && d2 > 0.01) { const d = Math.sqrt(d2), f = (1 - d / R) * 2.2; ax += dx / d * f; ay += dy / d * f; }
        }
        p.vx = (p.vx + ax) * 0.8; p.vy = (p.vy + ay) * 0.8;
        p.x += p.vx; p.y += p.vy;
        if (p.hot && Math.abs(p.x - p.hx) + Math.abs(p.y - p.hy) < 1) p.hot = false;
      }
    }
  }

  /* ---------------- drawing ---------------- */
  function dot(x, y, r) { ctx.moveTo(x + r, y); ctx.arc(x, y, r, 0, Math.PI * 2); }
  function cell(c, p, rows) {
    const r = p * 0.36;
    for (let gr = 0; gr < rows; gr++) for (let gc = 0; gc < 5; gc++) dot(c.x + gc * p + p / 2, c.y + gr * p + p / 2, r);
  }
  function cursorAt(places, n, p) {
    if (!places.length) return null;
    if (n <= 0) return { x: places[0].x, y: places[0].y };
    let last = places[0];
    for (const c of places) { if (c.i < n) last = c; else break; }
    return { x: last.x + 6 * p, y: last.y };
  }

  function draw() {
    ctx.clearRect(0, 0, W, H);
    const rN = np * 0.36;
    const lit = p => p.hot || p.hotT > 0;

    ctx.fillStyle = C.on; ctx.beginPath();
    for (const l of L) {
      if (l.i >= nameN) continue;
      if (spin && spin.has(l)) {
        for (const [gc, gr] of glyph(spin.get(l))) dot(l.x + gc * np + np / 2, l.y + gr * np + np / 2, rN);
        continue;
      }
      for (const p of l.ps) if (!lit(p)) dot(p.x, p.y, rN);
    }
    ctx.fill();

    ctx.fillStyle = C.acc; ctx.beginPath();
    for (const p of P) if (p.l.i < nameN && lit(p) && !(spin && spin.has(p.l))) dot(p.x, p.y, rN);
    ctx.fill();

    const tag = tagPlaces[tagIdx] || [];
    ctx.fillStyle = C.tag; ctx.beginPath();
    const rT = tp * 0.36;
    for (const c of tag) {
      if (c.i >= tagN) continue;
      for (const [gc, gr] of glyph(c.ch)) dot(c.x + gc * tp + tp / 2, c.y + gr * tp + tp / 2, rT);
    }
    ctx.fill();

    if (phase === "static") return;
    const onName = phase === "name";
    const cp = onName ? np : tp;
    const cur = onName ? cursorAt(namePlace, nameN, np) : cursorAt(tag, tagN, tp);
    if (cur && (typing || clock % 1000 < 560)) {
      ctx.fillStyle = C.acc; ctx.beginPath(); cell(cur, cp, 7); ctx.fill();
    }
  }

  /* ---------------- phone movement (Android; iOS needs a permission prompt) ---------------- */
  window.addEventListener("devicemotion", e => {
    if (!ready || id !== "still" || !e.acceleration) return;
    const a = Math.hypot(e.acceleration.x || 0, e.acceleration.y || 0, e.acceleration.z || 0);
    if (a > 1.6) game.shake(rand(0, W), H * 0.45, a * 4);
  });

  /* ---------------- loop ---------------- */
  let raf = null, last = 0, acc = 0, visible = true;
  function loop(now) {
    if (!visible) { raf = null; return; }
    acc += Math.min(now - last, 100); last = now;
    while (acc >= DT) { step(); acc -= DT; }
    draw();
    raf = requestAnimationFrame(loop);
  }
  function start() { if (!raf && !reduce) { last = performance.now(); raf = requestAnimationFrame(loop); } }

  new ResizeObserver(() => {
    layout();
    if (ready) { spin = null; game.start(); }
    draw();
  }).observe(canvas);
  new IntersectionObserver(es => { visible = es[0].isIntersecting; if (visible) start(); }).observe(canvas);
  layout(); draw(); start();

  if (params.has("debug")) window.__hero = { games, get id() { return id; }, get L() { return L; }, get P() { return P; }, get np() { return np; }, get ready() { return ready; } };
})();
