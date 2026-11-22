/* Flick pack — the tossable pack from flickapp-bice.vercel.app, on the project tile.
   Same faces, same toss (lift, tumble, land), looping on its own while the tile is on screen.
   work.js calls window.TileScene.flick(mediaEl) after it renders the tiles; the cover image stays as the fallback. */
(function () {
  "use strict";

  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // the faces as written on the Flick site; w = how often the face lands up (an estimate)
  var FACES = [
    { k: "front", title: "Breathe", text: "In for four. Out for six. Five times.", w: 35, rx: 0, ry: 0 },
    { k: "back", title: "Wait", text: "Four minutes. Then decide.", w: 35, rx: 0, ry: 180 },
    { k: "right", title: "Walk", text: "The long way to anywhere.", w: 12, rx: 0, ry: -90 },
    { k: "left", title: "Water", text: "One glass. Small sips.", w: 12, rx: 0, ry: 90 },
    { k: "top", title: "Call", text: "Ring someone. Say anything.", w: 3, rx: -90, ry: 0 },
    { k: "bottom", title: "", text: "", w: 3, rx: 90, ry: 0, blank: true }
  ];

  function tf(y, rx, ry) { return "translateY(" + y + "px) rotateX(" + rx + "deg) rotateY(" + ry + "deg)"; }
  function ahead(target, cur, turns) { var t = target; while (t < cur + 360 * turns) t += 360; return t; }
  function pick(last) {
    var total = 0, i, r;
    for (i = 0; i < FACES.length; i++) total += FACES[i].w;
    for (var tries = 0; tries < 4; tries++) {      // avoid the same face twice in a row, so the loop reads as a toss
      r = Math.random() * total;
      for (i = 0; i < FACES.length; i++) { r -= FACES[i].w; if (r < 0) break; }
      if (FACES[i] !== last) return FACES[i];
    }
    return FACES[i] || FACES[0];
  }

  function mount(media) {
    if (!media || media.querySelector(".fp-scene")) return;
    var scene = document.createElement("div");
    scene.className = "fp-scene";
    scene.setAttribute("aria-hidden", "true");
    scene.innerHTML = '<div class="fp-tilt"><div class="fp-pack">' + FACES.map(function (f) {
      return '<div class="fp-face fp-' + f.k + (f.blank ? " fp-blank" : "") + '"><span class="fp-brand">Flick</span>' +
        '<b class="fp-t">' + (f.blank ? "Your call" : f.title) + "</b>" +
        '<span class="fp-x">' + (f.blank ? "Opens straight away." : f.text) + "</span></div>";
    }).join("") + "</div></div>";
    media.appendChild(scene);
    media.classList.add("has-scene");

    var pack = scene.querySelector(".fp-pack"), x = 0, y = 0, last = FACES[0], timer = 0, anim = null, on = false;
    pack.style.transform = tf(0, x, y);
    if (reduce || !pack.animate) return;

    function toss() {
      var f = pick(last), nx = ahead(f.rx, x, 2), ny = ahead(f.ry, y, 1), lift = -0.64 * pack.offsetHeight;
      anim = pack.animate([
        { transform: tf(0, x, y) },
        { transform: tf(lift, (x + nx) / 2, (y + ny) / 2), offset: 0.45 },
        { transform: tf(0.03 * pack.offsetHeight, nx - 4, ny), offset: 0.88 },
        { transform: tf(0, nx, ny) }
      ], { duration: 1150, easing: "cubic-bezier(.25,.6,.35,1)" });
      scene.classList.add("is-up");
      setTimeout(function () { scene.classList.remove("is-up"); }, 520);
      anim.onfinish = function () {
        x = nx; y = ny; last = f; pack.style.transform = tf(0, x, y); anim = null;
        if (on) timer = setTimeout(toss, 2400);       // rest face up, then toss again
      };
    }
    function start() { if (on) return; on = true; if (!anim) timer = setTimeout(toss, 700); }
    function stop() { on = false; clearTimeout(timer); }

    if ("IntersectionObserver" in window) {
      new IntersectionObserver(function (es) {
        es.forEach(function (e) { (e.isIntersecting && !document.hidden) ? start() : stop(); });
      }, { threshold: 0.35 }).observe(media);
      document.addEventListener("visibilitychange", function () {
        if (document.hidden) stop();
        else { var r = media.getBoundingClientRect(); if (r.bottom > 0 && r.top < innerHeight) start(); }
      });
    } else start();
  }

  window.TileScene = window.TileScene || {};
  window.TileScene.flick = mount;
})();
