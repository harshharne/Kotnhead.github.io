/* =====================================================================
   THE EDITOR. Draws a case study on the canvas with the site's own code,
   lets you select, type into, drag, add and remove blocks, and publishes
   the result to GitHub as content.js.

   State lives in one object (site). Every change goes through commit(),
   which keeps undo history, saves a draft on this device, and redraws.
   Images you add are shrunk here, kept on this device until Publish,
   then uploaded in the same commit as the text.
   ===================================================================== */
(() => {
  try { localStorage.setItem("skipgc", "t"); } catch {}   // this browser is yours: the visit counter (count.js) leaves it out
  const $ = s => document.querySelector(s);
  const B = window.EdBlocks, GH = window.EdGitHub;
  const frame = $("#canvas"), stage = $("#stage"), panel = $("#panel"), panelBody = $("#panelBody");
  const DRAFT = "ed.draft", HEADER = `/* =====================================================================
   SITE CONTENT. Written by the editor (edit.html), so it is plain data:
   no comments inside, keys and strings in double quotes.
   Edit it in the editor; by hand works too if you keep it valid JSON.

   projects  order here = order on the Work page
     slug, title, year, summary, tags [], featured, hidden,
     cover, coverStyle "photo"|"diagram", coverAlt, pageCover false,
     meta { label: value }, body [ blocks ]  (block types: assets/js/project.js)
   notes     title, date "2026-11-05", tags [], related (a project slug),
             url (makes it a link note), body (blank line = new paragraph)
   ===================================================================== */
`;

  let site = null;            // the content being edited
  let base = { text: "", sha: null, from: "" };   // what's published, to know what changed
  let baseJSON = "";
  let slug = null;            // the project on the canvas
  let sel = null;             // selected: a block index, "intro", or null
  let undo = [], redo = [];
  let cd = null, cw = null;   // the canvas document and window
  const staged = new Map();   // path → { blob, url }: images waiting for Publish
  const shown = new Map();    // path → object URL, kept after publishing until the site catches up

  const clone = o => JSON.parse(JSON.stringify(o));
  const project = () => site.projects.find(p => p.slug === slug);
  const contentText = () => HEADER + "window.SITE = " + JSON.stringify(site, null, 2) + ";\n";
  const dirty = () => !!site && (JSON.stringify(site) !== baseJSON || staged.size > 0);

  /* ---------- paths into nested data: "items.2.title", "icon.src" ---------- */
  const getAt = (o, path) => path.split(".").reduce((a, k) => (a == null ? a : a[k]), o);
  const setAt = (o, path, v) => {
    const ks = path.split("."), last = ks.pop();
    const t = ks.reduce((a, k, i) => (a[k] == null ? (a[k] = /^\d+$/.test(ks[i + 1] || last) ? [] : {}) : a[k]), o);
    if (v === "" || v == null || (Array.isArray(v) && !v.length && last !== "items")) delete t[last]; else t[last] = v;
  };

  /* ================= loading ================= */
  const parse = text => {
    const m = text.match(/window\.SITE\s*=\s*([\s\S]*?);?\s*$/);
    try { return JSON.parse(m[1].replace(/;\s*$/, "")); } catch {}
    const w = {}; new Function("window", text)(w); return w.SITE;   // older hand-written content.js
  };

  async function boot() {
    status("Loading…");
    let from = "site";
    try {
      if (GH.ready()) {
        const r = await GH.readContent();
        base = { text: r.text, sha: r.sha, from: "github" }; from = "github";
      } else {
        const t = await (await fetch(`${GH.CONTENT}?v=${Date.now()}`, { cache: "no-store" })).text();
        base = { text: t, sha: null, from: "site" };
      }
    } catch (e) {
      toast(e.message + " Loading the copy on the site instead.", true);
      const t = await (await fetch(`${GH.CONTENT}?v=${Date.now()}`, { cache: "no-store" })).text();
      base = { text: t, sha: null, from: "site" };
    }
    site = parse(base.text); baseJSON = JSON.stringify(site);
    await restoreImages();
    const d = readDraft();
    if (d && JSON.stringify(d.site) !== JSON.stringify(site)) {
      site = d.site; slug = d.slug;
      toast(`Picked up your unpublished changes from ${new Date(d.at).toLocaleString()}.`, false, ["Discard them", discardDraft]);
    }
    if (!slug || !project()) slug = new URLSearchParams(location.search).get("p") || site.projects[0].slug;
    fillPicker(); draw(); showPanel(); refreshBar();
    if (from === "site" && !GH.ready()) status("Not connected: add your key in Settings to publish");
  }

  /* ================= drafts on this device ================= */
  const readDraft = () => { try { return JSON.parse(localStorage.getItem(DRAFT)); } catch { return null; } };
  const saveDraft = () => { try { dirty() ? localStorage.setItem(DRAFT, JSON.stringify({ site, slug, at: Date.now() })) : localStorage.removeItem(DRAFT); } catch {} };
  function discardDraft() {
    site = parse(base.text); staged.clear(); idb("clear"); undo = []; redo = [];
    if (!project()) slug = site.projects[0].slug;
    localStorage.removeItem(DRAFT); sel = null; fillPicker(); draw(); showPanel(); refreshBar();
    toast("Back to the published version.");
  }

  /* staged images survive a reload in IndexedDB */
  function idb(op, path, blob) {
    return new Promise(ok => {
      const r = indexedDB.open("ed-images", 1);
      r.onupgradeneeded = () => r.result.createObjectStore("files");
      r.onerror = () => ok(null);
      r.onsuccess = () => {
        const tx = r.result.transaction("files", op === "all" ? "readonly" : "readwrite"), st = tx.objectStore("files");
        if (op === "put") st.put(blob, path); if (op === "del") st.delete(path); if (op === "clear") st.clear();
        if (op === "all") { const out = []; st.openCursor().onsuccess = e => { const c = e.target.result; if (c) { out.push([c.key, c.value]); c.continue(); } else ok(out); }; }
        else tx.oncomplete = () => ok(true);
      };
    });
  }
  async function restoreImages() {
    const all = (await idb("all")) || [];
    all.forEach(([path, blob]) => staged.set(path, { blob, url: URL.createObjectURL(blob) }));
  }

  /* ================= changes and history ================= */
  function commit(fn, { redraw = true, keepPanel = false } = {}) {
    undo.push(JSON.stringify({ site, slug, sel })); if (undo.length > 150) undo.shift();
    redo = [];
    fn();
    saveDraft();
    if (redraw) draw();
    if (!keepPanel) showPanel(); else syncPanel();
    refreshBar();
  }
  function step(from, to) {
    if (!from.length) return;
    to.push(JSON.stringify({ site, slug, sel }));
    const s = JSON.parse(from.pop()); site = s.site; slug = s.slug; sel = s.sel;
    saveDraft(); fillPicker(); draw(); showPanel(); refreshBar();
  }

  /* ================= the canvas ================= */
  const srcFor = path => (staged.get(path) || {}).url || shown.get(path) || null;

  function draw() {
    if (!cd || !site) return;
    const p = project(), C = cw.CaseStudy, root = cd.querySelector("[data-canvas]");
    const scroll = cw.scrollY;
    root.innerHTML = "";
    const intro = cd.createElement("div");
    intro.innerHTML = C.intro(p) + C.cover(p);
    [...intro.children].forEach(el => { el.dataset.cell = "intro"; root.appendChild(el); });
    const body = cd.createElement("div"); body.className = "cs-body"; root.appendChild(body);
    (p.body || []).forEach((b, i) => {
      const t = cd.createElement("div");
      let html = "";
      try { html = C.block(b); } catch (e) { html = ""; }
      t.innerHTML = html || `<div class="ed-unknown">${C.esc(B.name(b.type))}: nothing to show yet. Fill it in on the right.</div>`;
      [...t.children].forEach(el => { el.dataset.cell = i; body.appendChild(el); });
    });
    const add = cd.createElement("button");
    add.className = (p.body || []).length ? "ed-add" : "ed-empty";
    add.textContent = (p.body || []).length ? "+ Add a block" : "This case study is empty. Add the first block.";
    add.onclick = () => openPalette((p.body || []).length);
    body.appendChild(add);
    // show staged images, and hide nothing that's missing
    root.querySelectorAll("img[src], video[src]").forEach(m => { const u = srcFor(m.getAttribute("src")); if (u) m.src = u; });
    if (cw.Dots) cw.Dots.run(root);
    C.fit(root);
    cw.scrollTo(0, scroll);
    overlays();
    inline();
  }

  const cellEls = i => [...cd.querySelectorAll(`[data-cell="${i}"]`)];
  const rectOf = els => {
    const rs = els.map(e => e.getBoundingClientRect()).filter(r => r.width || r.height);
    if (!rs.length) return null;
    const x = cw.scrollX, y = cw.scrollY;
    const l = Math.min(...rs.map(r => r.left)), t = Math.min(...rs.map(r => r.top)), r = Math.max(...rs.map(r => r.right)), b = Math.max(...rs.map(r => r.bottom));
    return { left: l + x, top: t + y, width: r - l, height: b - t, right: r + x, bottom: b + y };
  };
  const box = (cls, r) => { const d = cd.createElement("div"); d.className = cls; Object.assign(d.style, { left: r.left + "px", top: r.top + "px", width: r.width + "px", height: r.height + "px" }); cd.body.appendChild(d); return d; };

  const ICON = {
    drag: '<svg viewBox="0 0 16 16"><circle cx="5.5" cy="3.5" r=".9"/><circle cx="10.5" cy="3.5" r=".9"/><circle cx="5.5" cy="8" r=".9"/><circle cx="10.5" cy="8" r=".9"/><circle cx="5.5" cy="12.5" r=".9"/><circle cx="10.5" cy="12.5" r=".9"/></svg>',
    up: '<svg viewBox="0 0 16 16"><path d="M8 13V3M4 7l4-4 4 4"/></svg>',
    down: '<svg viewBox="0 0 16 16"><path d="M8 3v10M4 9l4 4 4-4"/></svg>',
    add: '<svg viewBox="0 0 16 16"><path d="M8 3v10M3 8h10"/></svg>',
    copy: '<svg viewBox="0 0 16 16"><rect x="5" y="5" width="8" height="8" rx="1.5"/><path d="M3 10.5V4a1 1 0 0 1 1-1h6.5"/></svg>',
    del: '<svg viewBox="0 0 16 16"><path d="M3 4.5h10M6.5 4.5V3h3v1.5M4.5 4.5l.6 8.5h5.8l.6-8.5"/></svg>',
    edit: '<svg viewBox="0 0 16 16"><path d="M3 13h3l7-7-3-3-7 7v3z"/></svg>',
  };

  function overlays() {
    cd.querySelectorAll(".ed-sel, .ed-bar").forEach(e => e.remove());
    if (sel == null) return;
    const r = rectOf(cellEls(sel)); if (!r) return;
    box("ed-sel", r);
    const bar = cd.createElement("div"); bar.className = "ed-bar";
    const p = project(), n = (p.body || []).length;
    if (sel === "intro") {
      bar.innerHTML = `<span class="ed-type">Project</span><button data-act="panel" title="Project settings">${ICON.edit}</button>`;
    } else {
      bar.innerHTML = `<span class="ed-type">${cw.CaseStudy.esc(B.name(p.body[sel].type))}</span>
        <button data-act="drag" title="Drag to move">${ICON.drag}</button>
        <button data-act="up" title="Move up"${sel === 0 ? " disabled" : ""}>${ICON.up}</button>
        <button data-act="down" title="Move down"${sel === n - 1 ? " disabled" : ""}>${ICON.down}</button>
        <button data-act="add" title="Add a block below">${ICON.add}</button>
        <button data-act="copy" title="Duplicate">${ICON.copy}</button>
        <button data-act="panel" title="Settings">${ICON.edit}</button>
        <button data-act="del" title="Delete">${ICON.del}</button>`;
    }
    cd.body.appendChild(bar);
    const bw = bar.offsetWidth, maxL = cd.documentElement.clientWidth - bw - 8;
    Object.assign(bar.style, { left: Math.max(8, Math.min(r.right - bw + 8, maxL)) + "px", top: Math.max(cw.scrollY + 44, r.top - 14) + "px" });
    if (r.top - 14 < cw.scrollY + 44) bar.style.transform = "none";
    bar.addEventListener("pointerdown", e => { const b = e.target.closest("button"); if (b && b.dataset.act === "drag") startDrag(e); e.stopPropagation(); });
    bar.addEventListener("click", e => { const b = e.target.closest("button"); if (b) act(b.dataset.act); });
  }

  function act(a) {
    const p = project(), body = p.body || (p.body = []);
    if (a === "panel") return openSheet();
    if (a === "add") return openPalette(sel + 1);
    if (a === "up" && sel > 0) return commit(() => { [body[sel - 1], body[sel]] = [body[sel], body[sel - 1]]; sel--; });
    if (a === "down" && sel < body.length - 1) return commit(() => { [body[sel + 1], body[sel]] = [body[sel], body[sel + 1]]; sel++; });
    if (a === "copy") return commit(() => { body.splice(sel + 1, 0, clone(body[sel])); sel++; });
    if (a === "del") {
      const name = B.name(body[sel].type);
      commit(() => { body.splice(sel, 1); sel = body.length ? Math.min(sel, body.length - 1) : null; });
      toast(`${name} deleted.`, false, ["Undo", () => step(undo, redo)]);
    }
  }

  /* ---------- hover and select ---------- */
  function wireCanvas() {
    cd.addEventListener("pointermove", e => {
      if (dragging) return;
      const c = e.target.closest && e.target.closest("[data-cell]");
      cd.querySelectorAll(".ed-hover").forEach(x => x.remove());
      if (c && c.dataset.cell !== String(sel)) { const r = rectOf(cellEls(c.dataset.cell)); if (r) box("ed-hover", r); }
    });
    cd.addEventListener("pointerleave", () => cd.querySelectorAll(".ed-hover").forEach(x => x.remove()));
    cd.addEventListener("pointerdown", e => {
      if (e.target.closest(".ed-bar, .ed-add, .ed-empty")) return;
      if (e.target.closest("[contenteditable]")) return;   // typing
      const c = e.target.closest("[data-cell]");
      const next = c ? (c.dataset.cell === "intro" ? "intro" : +c.dataset.cell) : null;
      if (next !== sel) { sel = next; cd.querySelectorAll(".ed-hover").forEach(x => x.remove()); requestAnimationFrame(() => { overlays(); inline(); showPanel(); }); }
    }, true);
    cd.addEventListener("click", e => { if (e.target.closest("a")) e.preventDefault(); });
    cw.addEventListener("resize", () => overlays());
    cd.addEventListener("keydown", keys);
    // files dropped on the canvas
    cd.addEventListener("dragover", e => { if (!hasFile(e)) return; e.preventDefault(); markDrop(e); });
    cd.addEventListener("dragleave", e => { if (e.target === cd.documentElement) clearDrop(); });
    cd.addEventListener("drop", e => { if (!hasFile(e)) return; e.preventDefault(); dropOnCanvas(e); });
  }

  /* ---------- typing straight onto the canvas ---------- */
  function inline() {
    cd.querySelectorAll("[contenteditable]").forEach(el => { el.removeAttribute("contenteditable"); });
    if (typeof sel !== "number") return;
    const b = project().body[sel], def = B.T[b.type]; if (!def || !def.inline) return;
    const els = cellEls(sel);
    def.inline.forEach(([selector, path, mode]) => {
      const found = els.flatMap(root => (root.matches(selector) ? [root] : [...root.querySelectorAll(selector)]));
      found.forEach((el, k) => {
        const full = path.replace("*", k);
        if (path.includes("*") && getAt(b, full.split(".").slice(0, -1).join(".")) == null) return;
        el.setAttribute("contenteditable", "plaintext-only");
        el.spellcheck = true;
        el.dataset.path = full; el.dataset.mode = mode || ""; el.dataset.block = sel;
        el.addEventListener("keydown", e => {
          if (e.key === "Escape") el.blur();
          if (e.key === "Enter" && mode !== "paras" && !e.shiftKey) { e.preventDefault(); el.blur(); }
        });
        el.addEventListener("blur", () => readInline(el));
        el.addEventListener("paste", e => { e.preventDefault(); cd.execCommand("insertText", false, e.clipboardData.getData("text/plain")); });
      });
    });
  }
  function readInline(el) {
    const b = project().body[+el.dataset.block]; if (!b) return;
    let v = el.innerText;
    if (el.dataset.mode === "paras") v = v.split(/\n+/).map(s => s.trim()).filter(Boolean).join("\n\n");
    else v = v.replace(/\s*\n\s*/g, " ").trim();
    if (el.dataset.mode === "quote") v = v.replace(/^[“"]\s*|\s*[”"]$/g, "");
    if (v === (getAt(b, el.dataset.path) ?? "")) return;
    const path = el.dataset.path;
    commit(() => setAt(b, path, v), { keepPanel: true });
  }

  /* ---------- drag to reorder ---------- */
  let dragging = null;
  function startDrag(e) {
    if (typeof sel !== "number") return;
    e.preventDefault();
    const from = sel, n = project().body.length;
    const line = cd.createElement("div"); line.className = "ed-line"; cd.body.appendChild(line);
    const chip = cd.createElement("div"); chip.className = "ed-chip"; chip.textContent = B.name(project().body[from].type); cd.body.appendChild(chip);
    cd.documentElement.classList.add("ed-dragging");
    cellEls(from).forEach(el => el.classList.add("is-moving"));
    cd.querySelectorAll(".ed-sel, .ed-bar, .ed-hover").forEach(x => x.remove());
    let to = from, y = e.clientY, raf;
    const bodyRect = cd.querySelector(".cs-body").getBoundingClientRect();
    const place = () => {
      const rects = [...Array(n).keys()].map(i => rectOf(cellEls(i)));
      const py = y + cw.scrollY;
      to = n;
      for (let i = 0; i < n; i++) if (rects[i] && py < rects[i].top + rects[i].height / 2) { to = i; break; }
      const ly = to < n ? rects[to].top - 14 : rects[n - 1].bottom + 14;
      Object.assign(line.style, { left: bodyRect.left + cw.scrollX + "px", width: bodyRect.width + "px", top: ly + "px", display: to === from || to === from + 1 ? "none" : "block" });
    };
    const tick = () => { const edge = 70; if (y < edge) cw.scrollBy(0, -14); else if (y > cw.innerHeight - edge) cw.scrollBy(0, 14); place(); raf = requestAnimationFrame(tick); };
    const move = ev => { y = ev.clientY; chip.style.left = ev.clientX + "px"; chip.style.top = ev.clientY + "px"; };
    const end = () => {
      cancelAnimationFrame(raf); cd.removeEventListener("pointermove", move); cd.removeEventListener("pointerup", end); cd.removeEventListener("pointercancel", end);
      line.remove(); chip.remove(); cd.documentElement.classList.remove("ed-dragging"); dragging = null;
      const target = to > from ? to - 1 : to;
      if (target === from) { draw(); return; }
      commit(() => { const body = project().body; const [b] = body.splice(from, 1); body.splice(target, 0, b); sel = target; });
    };
    dragging = true; move(e);
    cd.addEventListener("pointermove", move); cd.addEventListener("pointerup", end); cd.addEventListener("pointercancel", end);
    tick();
  }

  /* ---------- keys ---------- */
  function keys(e) {
    const mod = e.metaKey || e.ctrlKey, typing = e.target.closest && e.target.closest("input, textarea, select, [contenteditable]");
    if (mod && e.key.toLowerCase() === "z" && !typing) { e.preventDefault(); return e.shiftKey ? step(redo, undo) : step(undo, redo); }
    if (mod && e.key.toLowerCase() === "y" && !typing) { e.preventDefault(); return step(redo, undo); }
    if (typing || typeof sel !== "number") { if (e.key === "Escape" && !typing && sel != null) { sel = null; overlays(); showPanel(); } return; }
    if (e.key === "Backspace" || e.key === "Delete") { e.preventDefault(); act("del"); }
    else if (mod && e.key.toLowerCase() === "d") { e.preventDefault(); act("copy"); }
    else if (e.altKey && e.key === "ArrowUp") { e.preventDefault(); act("up"); }
    else if (e.altKey && e.key === "ArrowDown") { e.preventDefault(); act("down"); }
    else if (e.key === "ArrowUp" && sel > 0) { e.preventDefault(); select(sel - 1); }
    else if (e.key === "ArrowDown" && sel < project().body.length - 1) { e.preventDefault(); select(sel + 1); }
    else if (e.key === "Escape") { sel = null; overlays(); inline(); showPanel(); }
  }
  function select(i) { sel = i; overlays(); inline(); showPanel(); const r = rectOf(cellEls(i)); if (r && (r.top < cw.scrollY + 60 || r.top > cw.scrollY + cw.innerHeight - 120)) cw.scrollTo({ top: r.top - 120, behavior: "smooth" }); setTimeout(overlays, 350); }

  /* ================= add a block ================= */
  let insertAt = 0;
  function openPalette(at) {
    insertAt = at;
    const list = $("#paletteList");
    list.innerHTML = B.PALETTE.map(([group, types]) => `<section><h3>${group}</h3><ul>${types.map(t => `<li><button type="button" data-type="${t}"><b>${B.T[t].name}</b><span>${B.T[t].hint || ""}</span></button></li>`).join("")}</ul></section>`).join("");
    list.onclick = e => {
      const b = e.target.closest("button[data-type]"); if (!b) return;
      $("#palette").close();
      const block = B.T[b.dataset.type].make();
      commit(() => { const p = project(); (p.body || (p.body = [])).splice(insertAt, 0, block); sel = insertAt; });
      setTimeout(() => { select(sel); if (["figure", "pair"].includes(block.type)) pickFile(block.type === "pair" ? "items.0.src" : "src"); }, 50);
    };
    $("#palette").showModal();
  }

  /* ================= the settings panel ================= */
  function showPanel() {
    const p = project();
    if (sel === "intro") return projectPanel(p);
    if (typeof sel !== "number" || !p.body[sel]) {
      closeSheet();
      panelBody.innerHTML = `<div class="ed-empty-panel"><h2>${esc(p.title)}</h2>
        <p>Click a block on the page to edit it. Click the title area for the project’s settings.</p>
        <ul><li>Type straight into headings and text.</li><li>Drag a block by its <b>⠿</b> handle, or use the arrows.</li><li>Drop an image file onto an image to replace it, or anywhere to add one.</li><li>Changes save on this device as you go. <b>Publish</b> puts them live.</li></ul></div>`;
      return;
    }
    const b = p.body[sel], def = B.T[b.type] || { name: b.type };
    panelBody.innerHTML = `<div class="ed-panel-head"><div><span class="ed-kind">Block ${sel + 1} of ${p.body.length}</span><h2>${esc(def.name)}</h2></div></div>`;
    const form = document.createElement("div");
    (def.fields || []).forEach(f => form.appendChild(field(f, b, f.key)));
    if (!def.fields) form.appendChild(note("This one is a drawn diagram. Edit its words in the data below; I can add proper fields for it later."));
    const adv = document.createElement("details"); adv.className = "ed-adv"; if (!def.fields) adv.open = true;
    adv.innerHTML = "<summary>Edit as data (advanced)</summary>";
    adv.appendChild(jsonField(b));
    form.appendChild(adv);
    const actions = document.createElement("div"); actions.className = "ed-panel-actions";
    actions.innerHTML = `<button class="ed-btn ghost" data-a="copy">Duplicate</button><button class="ed-btn ghost" data-a="add">Add below</button><button class="ed-btn danger" data-a="del">Delete</button>`;
    actions.onclick = e => { const a = e.target.closest("button"); if (a) act(a.dataset.a); };
    form.appendChild(actions);
    panelBody.appendChild(form);
  }
  const esc = s => String(s ?? "").replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const note = t => { const p = document.createElement("p"); p.className = "ed-help"; p.textContent = t; return p; };

  // after an inline edit, refresh panel inputs that aren't being typed in
  function syncPanel() {
    if (typeof sel !== "number") return;
    const b = project().body[sel];
    panelBody.querySelectorAll("[data-path]").forEach(inp => {
      if (inp === document.activeElement) return;
      const v = getAt(b, inp.dataset.path);
      if (inp.type === "checkbox") inp.checked = !!v;
      else if (inp.dataset.kind === "lines") inp.value = (v || []).join("\n");
      else if (inp.dataset.kind === "tags" || inp.dataset.kind === "numbers") inp.value = (v || []).join(", ");
      else inp.value = v ?? "";
    });
  }

  /* one field → its control */
  function field(f, obj, path) {
    const v = getAt(obj, f.key);
    const wrap = document.createElement(f.kind === "check" ? "label" : "label");
    if (f.kind === "items") return itemsField(f, obj, path);
    if (f.kind === "image" || f.kind === "video") return mediaField(f, obj, path);
    if (f.kind === "check") {
      wrap.className = "ed-check";
      wrap.innerHTML = `<input type="checkbox" data-path="${path}"${v ? " checked" : ""}><span>${esc(f.label)}</span>`;
      wrap.querySelector("input").onchange = e => change(obj, f.key, e.target.checked || undefined);
      return wrap;
    }
    wrap.className = "ed-field";
    let ctl;
    if (f.kind === "select") {
      ctl = `<select data-path="${path}">${f.options.map(([val, lab]) => `<option value="${val}"${String(v ?? f.options[0][0]) === String(val) ? " selected" : ""}>${esc(lab)}</option>`).join("")}</select>`;
    } else if (f.kind === "area" || f.kind === "lines") {
      const val = f.kind === "lines" ? (v || []).join("\n") : v ?? "";
      ctl = `<textarea data-path="${path}" data-kind="${f.kind}" class="${f.tall ? "tall" : ""}" rows="${f.tall ? 10 : 4}">${esc(val)}</textarea>`;
    } else {
      const val = f.kind === "tags" || f.kind === "numbers" ? (v || []).join(", ") : v ?? "";
      ctl = `<input data-path="${path}" data-kind="${f.kind}" type="${f.kind === "number" ? "number" : "text"}" value="${esc(val)}" spellcheck="${f.kind === "text"}">`;
    }
    wrap.innerHTML = `<span>${esc(f.label)}</span>${ctl}${f.help ? `<small>${esc(f.help)}</small>` : ""}`;
    const input = wrap.querySelector("input, textarea, select");
    const read = () => {
      const s = input.value;
      if (f.kind === "lines") return s.split("\n").map(x => x.trim()).filter(Boolean);
      if (f.kind === "tags") return s.split(",").map(x => x.trim()).filter(Boolean);
      if (f.kind === "numbers") return s.split(/[,\s]+/).map(Number).filter(n => !isNaN(n) && n);
      if (f.kind === "number") return s === "" ? undefined : Number(s);
      if (f.kind === "select" && f.number) return Number(s);
      return s;
    };
    let t;
    input.addEventListener("input", () => { clearTimeout(t); t = setTimeout(() => change(obj, f.key, read(), true), 350); });
    input.addEventListener("change", () => { clearTimeout(t); change(obj, f.key, read()); });
    return wrap;
  }

  // typing in the panel: one undo step per pause, canvas redrawn, panel left alone
  let lastTypingKey = null;
  function change(obj, key, v, typing) {
    if (JSON.stringify(getAt(obj, key)) === JSON.stringify(v)) return;
    const k = key + ":" + sel;
    if (typing && lastTypingKey === k) { setAt(obj, key, v); saveDraft(); draw(); refreshBar(); return; }
    lastTypingKey = typing ? k : null;
    commit(() => setAt(obj, key, v), { keepPanel: true });
  }

  function itemsField(f, obj, path) {
    const box = document.createElement("div"); box.className = "ed-items";
    const items = getAt(obj, f.key) || [];
    box.innerHTML = `<div class="ed-items-label">${esc(f.label)}</div>`;
    items.forEach((it, k) => {
      const card = document.createElement("div"); card.className = "ed-item";
      card.innerHTML = `<div class="ed-item-head"><span>${esc(f.one || "Item")} ${k + 1}</span><div>
        <button class="ed-icon" data-i="up" title="Move up"${k === 0 ? " disabled" : ""}>${ICON.up}</button>
        <button class="ed-icon" data-i="down" title="Move down"${k === items.length - 1 ? " disabled" : ""}>${ICON.down}</button>
        <button class="ed-icon" data-i="del" title="Remove"${f.min && items.length <= f.min ? " disabled" : ""}>${ICON.del}</button></div></div>`;
      f.fields.forEach(sf => card.appendChild(field(sf, it, `${path}.${k}.${sf.key}`)));
      card.querySelector(".ed-item-head").onclick = e => {
        const b = e.target.closest("button"); if (!b) return;
        const list = getAt(obj, f.key);
        commit(() => {
          if (b.dataset.i === "up") [list[k - 1], list[k]] = [list[k], list[k - 1]];
          if (b.dataset.i === "down") [list[k + 1], list[k]] = [list[k], list[k + 1]];
          if (b.dataset.i === "del") list.splice(k, 1);
        });
      };
      box.appendChild(card);
    });
    if (!f.max || items.length < f.max) {
      const add = document.createElement("button"); add.className = "ed-add-item"; add.textContent = `+ Add ${(f.one || "item").toLowerCase()}`;
      add.onclick = () => commit(() => { const list = getAt(obj, f.key) || []; list.push(f.make ? f.make() : {}); setAt(obj, f.key, list); });
      box.appendChild(add);
    }
    return box;
  }

  function mediaField(f, obj, path) {
    const v = getAt(obj, f.key) || "";
    const wrap = document.createElement("div"); wrap.className = "ed-field";
    const isVideo = f.kind === "video";
    const thumb = isVideo ? "" : `<div class="ed-img-thumb" style="${v ? `background-image:url('${(srcFor(v) || v).replace(/'/g, "%27")}')` : ""}"></div>`;
    wrap.innerHTML = `<span>${esc(f.label)}</span>
      <div class="ed-img"${isVideo ? ' style="grid-template-columns:1fr"' : ""}>${thumb}
        <div class="ed-img-side">
          <button class="ed-btn ghost" type="button">${v ? "Replace" : "Choose"} ${isVideo ? "file" : "image"}</button>
          <input data-path="${path}" value="${esc(v)}" placeholder="${isVideo ? "https://youtu.be/… or assets/…mp4" : "or drop an image here"}" spellcheck="false">
        </div>
      </div>${f.help ? `<small>${esc(f.help)}</small>` : ""}`;
    const zone = wrap.querySelector(".ed-img"), input = wrap.querySelector("input");
    wrap.querySelector("button").onclick = () => pickFile(f.key, obj);
    input.onchange = () => change(obj, f.key, input.value.trim());
    zone.addEventListener("dragover", e => { if (hasFile(e)) { e.preventDefault(); zone.classList.add("is-over"); } });
    zone.addEventListener("dragleave", () => zone.classList.remove("is-over"));
    zone.addEventListener("drop", async e => { zone.classList.remove("is-over"); if (!hasFile(e)) return; e.preventDefault(); const path = await addFile(e.dataTransfer.files[0]); if (path) change(obj, f.key, path); });
    return wrap;
  }

  function jsonField(b) {
    const wrap = document.createElement("label"); wrap.className = "ed-field";
    wrap.innerHTML = `<textarea class="code" spellcheck="false">${esc(JSON.stringify(b, null, 2))}</textarea><small>Changes apply when you click outside the box.</small>`;
    const ta = wrap.querySelector("textarea");
    ta.onchange = () => {
      try { const nb = JSON.parse(ta.value); if (!nb.type) throw 0; ta.classList.remove("bad"); commit(() => { project().body[sel] = nb; }); }
      catch { ta.classList.add("bad"); toast("That isn’t valid data. Check the commas and quotes.", true); }
    };
    return wrap;
  }

  /* ---------- project settings ---------- */
  function projectPanel(p) {
    panelBody.innerHTML = `<div class="ed-panel-head"><div><span class="ed-kind">Project</span><h2>${esc(p.title)}</h2></div></div>`;
    const F = [
      { key: "title", kind: "text", label: "Title" },
      { key: "summary", kind: "area", label: "One line under the title", help: "Also shown on the Work page." },
      { key: "year", kind: "text", label: "Year" },
      { key: "tags", kind: "tags", label: "Tags", help: "2–4, separated by commas." },
      { key: "cover", kind: "image", label: "Cover (Work tile and top of page)" },
      { key: "coverStyle", kind: "select", label: "Cover fit", options: [["photo", "Photo: fills the tile (crop it to 4:3)"], ["diagram", "Drawing: whole, on a panel"]] },
      { key: "coverAlt", kind: "text", label: "Cover alt text" },
    ];
    const form = document.createElement("div");
    F.forEach(f => form.appendChild(field(f, p, f.key)));
    const checks = [
      { key: "pageCover", label: "Show the cover at the top of the case study", invert: true },
      { key: "featured", label: "Feature on the landing page" },
      { key: "hidden", label: "Hide from the site (draft)" },
    ];
    checks.forEach(c => {
      const l = document.createElement("label"); l.className = "ed-check";
      const on = c.invert ? p[c.key] !== false : !!p[c.key];
      l.innerHTML = `<input type="checkbox"${on ? " checked" : ""}><span>${esc(c.label)}</span>`;
      l.querySelector("input").onchange = e => commit(() => { if (c.invert) e.target.checked ? delete p[c.key] : (p[c.key] = false); else e.target.checked ? (p[c.key] = true) : delete p[c.key]; fillPicker(); }, { keepPanel: true });
      form.appendChild(l);
    });
    form.appendChild(metaField(p));
    const i = site.projects.indexOf(p);
    const actions = document.createElement("div"); actions.className = "ed-panel-actions";
    actions.innerHTML = `<button class="ed-btn ghost" data-a="earlier"${i === 0 ? " disabled" : ""}>Move earlier on Work</button><button class="ed-btn ghost" data-a="later"${i === site.projects.length - 1 ? " disabled" : ""}>Move later</button><button class="ed-btn danger" data-a="delete">Delete project</button>`;
    actions.onclick = e => {
      const a = e.target.closest("button"); if (!a) return;
      const L = site.projects;
      if (a.dataset.a === "earlier") commit(() => { [L[i - 1], L[i]] = [L[i], L[i - 1]]; fillPicker(); });
      if (a.dataset.a === "later") commit(() => { [L[i + 1], L[i]] = [L[i], L[i + 1]]; fillPicker(); });
      if (a.dataset.a === "delete" && confirm(`Delete “${p.title}” and its whole case study? You can undo until you publish.`)) {
        commit(() => { L.splice(i, 1); slug = L[Math.max(0, i - 1)].slug; sel = null; fillPicker(); });
      }
    };
    form.appendChild(actions);
    form.appendChild(note(`Address: project.html?p=${p.slug}`));
    panelBody.appendChild(form);
  }
  function metaField(p) {
    const box = document.createElement("div"); box.className = "ed-items";
    const rows = Object.entries(p.meta || {});
    box.innerHTML = `<div class="ed-items-label">Facts (left column: Year, Role, Tools …)</div>`;
    const list = document.createElement("div"); list.className = "ed-item";
    const save = () => {
      const m = {}; list.querySelectorAll(".ed-row2").forEach(r => { const [k, v] = r.querySelectorAll("input"); if (k.value.trim()) m[k.value.trim()] = v.value; });
      commit(() => { p.meta = m; }, { keepPanel: true });
    };
    [...rows, ["", ""]].forEach(([k, v]) => {
      const r = document.createElement("div"); r.className = "ed-row2"; r.style.marginBottom = "10px";
      r.innerHTML = `<input class="ed-plain" placeholder="Label" value="${esc(k)}"><input class="ed-plain" placeholder="Value" value="${esc(v)}">`;
      r.querySelectorAll("input").forEach(x => x.onchange = () => { save(); showPanel(); });
      list.appendChild(r);
    });
    box.appendChild(list);
    box.querySelectorAll("input").forEach(x => Object.assign(x.style, { padding: "8px 10px", border: "1px solid var(--rule)", borderRadius: "8px", font: "inherit", background: "#fcfcfb", width: "100%" }));
    return box;
  }

  /* ---------- phone: the panel is a sheet ---------- */
  const phone = matchMedia("(max-width: 900px)");
  const openSheet = () => { if (phone.matches) panel.classList.add("is-open"); else { const f = panelBody.querySelector("input, textarea, select"); if (f) f.focus(); } };
  const closeSheet = () => panel.classList.remove("is-open");
  $("#sheetClose").onclick = closeSheet;

  /* ================= images and files ================= */
  const hasFile = e => [...(e.dataTransfer?.types || [])].includes("Files");
  let pickTarget = null;
  function pickFile(key, obj) { pickTarget = { key, obj: obj || project().body[sel] }; $("#filePick").value = ""; $("#filePick").click(); }
  $("#filePick").onchange = async e => {
    const f = e.target.files[0]; if (!f || !pickTarget) return;
    const path = await addFile(f); if (path) change(pickTarget.obj, pickTarget.key, path);
  };

  const slugify = s => s.toLowerCase().replace(/\.[^.]+$/, "").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 40) || "image";
  const kb = n => (n > 1048576 ? (n / 1048576).toFixed(1) + " MB" : Math.round(n / 1024) + " KB");

  /* shrink to at most 2400 px on the long side; JPEG for photos, WebP when there's transparency */
  async function addFile(file) {
    if (!file) return null;
    const dir = `assets/projects/${slug}/`;
    const taken = new Set([...staged.keys(), ...JSON.stringify(site).match(/assets\/projects\/[^"]+/g) || []]);
    const unique = (name, ext) => { let n = name, k = 2; while (taken.has(dir + n + ext)) n = `${name}-${k++}`; return dir + n + ext; };
    let blob = file, ext = (file.name.match(/\.[a-z0-9]+$/i) || [""])[0].toLowerCase();
    if (file.type.startsWith("video/")) {
      if (file.size > 20 * 1048576) { toast("That video is over 20 MB. Upload it to YouTube or Vimeo and paste the link instead.", true); return null; }
    } else if (file.type === "image/svg+xml" || file.type === "image/gif") {
      if (file.size > 6 * 1048576) { toast("That file is over 6 MB. Export it smaller first.", true); return null; }
    } else if (file.type.startsWith("image/")) {
      status("Shrinking the image…");
      try { const r = await shrink(file); blob = r.blob; ext = r.ext; }
      catch { toast("Couldn’t read that image. Try a JPEG or PNG.", true); status(""); return null; }
    } else { toast("That isn’t an image or video file.", true); return null; }
    const path = unique(slugify(file.name), ext);
    staged.set(path, { blob, url: URL.createObjectURL(blob) });
    idb("put", path, blob);
    toast(`Added ${path.split("/").pop()} · ${kb(blob.size)}${blob !== file ? ` (from ${kb(file.size)})` : ""}. Uploads when you publish.`);
    status("");
    return path;
  }
  async function shrink(file) {
    const bmp = await createImageBitmap(file);
    const max = 2400, s = Math.min(1, max / Math.max(bmp.width, bmp.height));
    const w = Math.round(bmp.width * s), h = Math.round(bmp.height * s);
    const c = document.createElement("canvas"); c.width = w; c.height = h;
    const g = c.getContext("2d"); g.drawImage(bmp, 0, 0, w, h);
    let alpha = false;
    if (/png|webp|avif/.test(file.type)) { const d = g.getImageData(0, 0, w, h).data; for (let i = 3; i < d.length; i += 4 * 7) if (d[i] < 250) { alpha = true; break; } }
    const type = alpha ? "image/webp" : "image/jpeg";
    const blob = await new Promise(ok => c.toBlob(ok, type, alpha ? 0.86 : 0.84));
    if (!blob || (blob.type !== type)) throw new Error("encode");
    return { blob, ext: alpha ? ".webp" : ".jpg" };
  }

  /* dropping files onto the canvas: on an image → replace it; elsewhere → a new image block there */
  let dropAt = null;
  function markDrop(e) {
    clearDrop();
    const c = e.target.closest && e.target.closest("[data-cell]");
    const i = c && c.dataset.cell !== "intro" ? +c.dataset.cell : null;
    const b = i != null ? project().body[i] : null;
    if (b && ["figure", "image", "pair", "video", "identity"].includes(b.type)) { dropAt = { replace: i, el: c }; cellEls(i).forEach(x => x.classList.add("ed-drop")); }
    else if (c && c.dataset.cell === "intro") { dropAt = { cover: true }; cellEls("intro").forEach(x => x.classList.add("ed-drop")); }
    else dropAt = { insert: i != null ? i + 1 : (project().body || []).length };
  }
  const clearDrop = () => cd.querySelectorAll(".ed-drop").forEach(x => x.classList.remove("ed-drop"));
  async function dropOnCanvas(e) {
    clearDrop();
    const files = [...e.dataTransfer.files]; if (!files.length || !dropAt) return;
    const at = dropAt; dropAt = null;
    if (at.cover) { const path = await addFile(files[0]); if (path) commit(() => { project().cover = path; project().coverStyle = project().coverStyle || "photo"; }); return; }
    if (at.replace != null) {
      const b = project().body[at.replace];
      if (b.type === "pair") {
        const paths = []; for (const f of files.slice(0, b.items.length)) paths.push(await addFile(f));
        commit(() => paths.forEach((p, k) => p && (b.items[k].src = p)));
      } else { const path = await addFile(files[0]); if (path) commit(() => { if (b.type === "identity") b.icon.src = path; else b.src = path; sel = at.replace; }); }
      return;
    }
    const paths = []; for (const f of files.slice(0, 2)) { const p = await addFile(f); if (p) paths.push(p); }
    if (!paths.length) return;
    const isVid = p => /\.(mp4|webm)$/.test(p);
    const block = paths.length === 2 && !paths.some(isVid)
      ? { type: "pair", items: paths.map(src => ({ src, alt: "", style: "photo" })) }
      : isVid(paths[0]) ? { type: "video", src: paths[0], size: "wide" } : { type: "figure", src: paths[0], alt: "", style: "photo", size: "wide" };
    commit(() => { project().body.splice(at.insert, 0, block); sel = at.insert; });
    toast("Added. Write its alt text on the right.");
  }

  /* ================= projects ================= */
  function fillPicker() {
    $("#pick").innerHTML = site.projects.map(p => `<option value="${esc(p.slug)}"${p.slug === slug ? " selected" : ""}>${esc(p.title)}${p.hidden ? " (hidden)" : ""}</option>`).join("");
    $("#viewLive").href = `project.html?p=${encodeURIComponent(slug)}`;
  }
  $("#pick").onchange = e => { slug = e.target.value; sel = null; fillPicker(); draw(); showPanel(); cw.scrollTo(0, 0); saveDraft(); };
  $("#newProject").onclick = () => {
    const title = (prompt("Name of the new project") || "").trim(); if (!title) return;
    let s = slugify(title), k = 2; while (site.projects.some(p => p.slug === s)) s = `${slugify(title)}-${k++}`;
    commit(() => {
      site.projects.push({ slug: s, title, hidden: true, tags: [], year: String(new Date().getFullYear()), summary: "", cover: "", meta: { Year: String(new Date().getFullYear()) }, body: [] });
      slug = s; sel = "intro"; fillPicker();
    });
    toast("New project, hidden from the site until you untick “Hide” in its settings.");
  };

  /* ================= publish ================= */
  const bar = $("#publish");
  function refreshBar() {
    const d = dirty();
    bar.disabled = !d; bar.innerHTML = d ? '<span class="dot"></span>Publish' : "Published";
    $("#undo").disabled = !undo.length; $("#redo").disabled = !redo.length;
    if (d) status(`Unpublished changes${staged.size ? ` · ${staged.size} new file${staged.size > 1 ? "s" : ""}` : ""}`);
    else if (GH.ready() || base.from === "github") status("Everything is published");
  }
  function status(t) { $("#status").textContent = t; }

  bar.onclick = async () => {
    if (!GH.ready()) { openSettings(); return toast("Add your GitHub key first; then press Publish again."); }
    bar.disabled = true;
    try {
      status("Checking GitHub…");
      const now = await GH.contentSha();
      if (base.sha && now !== base.sha && !confirm("The content on GitHub changed since you opened the editor (maybe from another device). Publishing replaces those changes with yours.\n\nPublish anyway?")) { bar.disabled = false; refreshBar(); return; }
      const used = JSON.stringify(site);
      const files = [...staged].filter(([p]) => used.includes(`"${p}"`)).map(([path, s]) => ({ path, blob: s.blob }));
      const changed = site.projects.filter(p => { const was = (parse(base.text).projects || []).find(q => q.slug === p.slug); return !was || JSON.stringify(was) !== JSON.stringify(p); }).map(p => p.title);
      const message = `Edit: ${changed.slice(0, 3).join(", ") || "site content"}${changed.length > 3 ? " and more" : ""}`;
      const text = contentText();
      const r = await GH.publish({ text, files, message, onStep: status });
      staged.forEach((s, p) => shown.set(p, s.url));
      staged.clear(); idb("clear");
      base = { text, sha: r.sha, from: "github" }; baseJSON = JSON.stringify(site);
      localStorage.removeItem(DRAFT);
      refreshBar(); status("Published");
      toast("Published. The site updates in about a minute.", false, ["View", () => window.open(`project.html?p=${encodeURIComponent(slug)}&v=${Date.now()}`, "_blank")]);
    } catch (e) {
      toast(e.message, true); bar.disabled = false; refreshBar();
    }
  };

  /* ================= settings ================= */
  function openSettings() {
    const c = GH.load();
    $("#ghToken").value = c.token; $("#ghOwner").value = c.owner; $("#ghRepo").value = c.repo; $("#ghBranch").value = c.branch; $("#ghCheck").textContent = "";
    $("#settings").showModal();
  }
  const readSettings = () => ({ token: $("#ghToken").value.trim(), owner: $("#ghOwner").value.trim(), repo: $("#ghRepo").value.trim(), branch: $("#ghBranch").value.trim() });
  $("#openSettings").onclick = openSettings;
  $("#settingsForm").addEventListener("submit", e => {
    if (e.submitter && e.submitter.value === "save") {
      const was = GH.ready(); GH.save(readSettings());
      if (!was && GH.ready()) { toast("Key saved. Reloading the latest content from GitHub."); boot(); }
    }
  });
  $("#ghTest").onclick = async () => {
    const prev = GH.load(); GH.save(readSettings());
    $("#ghCheck").textContent = "Checking…";
    try { $("#ghCheck").textContent = await GH.check(); } catch (e) { $("#ghCheck").textContent = e.message; GH.save(prev); }
  };
  $("#ghForget").onclick = () => { GH.save({ ...GH.load(), token: "" }); $("#ghToken").value = ""; $("#ghCheck").textContent = "Key removed from this device."; };

  /* ================= view, undo, keys ================= */
  document.querySelectorAll("[data-view]").forEach(b => b.onclick = () => {
    document.querySelectorAll("[data-view]").forEach(x => x.setAttribute("aria-pressed", String(x === b)));
    stage.classList.toggle("is-phone", b.dataset.view === "phone");
    setTimeout(() => { draw(); }, 60);
  });
  $("#undo").onclick = () => step(undo, redo);
  $("#redo").onclick = () => step(redo, undo);
  document.addEventListener("keydown", keys);
  window.addEventListener("beforeunload", e => { if (staged.size && dirty()) { e.preventDefault(); e.returnValue = ""; } });

  /* ================= toasts ================= */
  function toast(text, bad, action) {
    const t = document.createElement("div"); t.className = "ed-toast" + (bad ? " is-bad" : "");
    t.textContent = text;
    if (action) { const b = document.createElement("button"); b.textContent = action[0]; b.onclick = () => { action[1](); t.remove(); }; t.appendChild(b); }
    $("#toasts").appendChild(t);
    setTimeout(() => t.remove(), bad ? 9000 : action ? 8000 : 4000);
  }

  /* ================= start ================= */
  frame.addEventListener("load", () => {
    cd = frame.contentDocument; cw = frame.contentWindow;
    wireCanvas();
    if (site) { draw(); } else boot();
  });
  if (frame.contentDocument && frame.contentDocument.readyState === "complete" && frame.contentWindow.CaseStudy) frame.dispatchEvent(new Event("load"));
})();
