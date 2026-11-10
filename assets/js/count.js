/* =====================================================================
   VISITS. Counts page views with GoatCounter (goatcounter.com):
   no cookies, nothing that identifies a visitor, no consent banner,
   about 3.5 KB, loaded after the page so it never slows it down.

   To turn it on: make a free account at goatcounter.com, then put your
   code below, the part before .goatcounter.com ("harshharne" for
   harshharne.goatcounter.com). Empty = off.

   Not counted: this computer while testing (localhost, files), and any
   browser where you've opened the editor, so your own visits stay out.
   ===================================================================== */
(() => {
  const CODE = "";
  if (!CODE) return;
  if (location.protocol === "file:" || /^(localhost|127\.|0\.0\.0\.0|\[::1\])/.test(location.hostname)) return;
  try { if (localStorage.getItem("skipgc") === "t") return; } catch {}
  const s = document.createElement("script");
  s.async = true;
  s.src = "https://gc.zgo.at/count.js";
  s.dataset.goatcounter = `https://${CODE}.goatcounter.com/count`;
  document.head.appendChild(s);
})();
