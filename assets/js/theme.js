/* Day / night switch: the bulb button. The choice is remembered per browser. */
(() => {
  const root = document.documentElement;
  const current = () => (root.dataset.theme === "light" ? "light" : "dark");
  function sync() {
    const on = current() === "light";
    document.querySelectorAll(".bulb").forEach(b => {
      b.setAttribute("aria-pressed", on);
      b.setAttribute("aria-label", on ? "Switch to night mode" : "Switch to day mode");
      b.title = on ? "Night mode" : "Day mode";
    });
  }
  function set(t) {
    root.dataset.theme = t;
    try { localStorage.setItem("theme", t); } catch {}
    sync();
    window.dispatchEvent(new Event("themechange"));
  }
  document.querySelectorAll(".bulb").forEach(b => b.addEventListener("click", () => set(current() === "light" ? "dark" : "light")));
  sync();
})();
