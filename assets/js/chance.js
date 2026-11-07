/* =====================================================================
   CHANCE: the site's one source of randomness.
   - If data/chance.json exists (today's batch from random.org, written
     by the daily GitHub Action in step 4), numbers come from there.
   - Otherwise it falls back to this browser's crypto random numbers.
   Where a visitor starts reading today's numbers depends on the minute
   they arrive, so their timing is part of the draw.
   Use: Chance.int(n) → 0..n-1, Chance.shuffle(array), Chance.source
   ===================================================================== */
(() => {
  const USE_DAILY_BATCH = false;   // turn on once the random.org GitHub Action (step 4) writes data/chance.json
  let pool = null, i = 0;
  const api = {
    source: "this browser",
    int(n) {
      if (pool) return pool[(i++) % pool.length] % n;
      const a = new Uint32Array(1); crypto.getRandomValues(a); return a[0] % n;
    },
    shuffle(arr) {
      for (let k = arr.length - 1; k > 0; k--) { const j = api.int(k + 1); [arr[k], arr[j]] = [arr[j], arr[k]]; }
      return arr;
    },
    ready: null,
  };
  api.ready = (USE_DAILY_BATCH ? fetch("data/chance.json", { cache: "no-store" }) : Promise.resolve(null))
    .then(r => (r && r.ok ? r.json() : null))
    .then(j => {
      if (j && Array.isArray(j.numbers) && j.numbers.length > 50) {
        pool = j.numbers.map(n => Math.abs(Math.floor(n)));
        const now = new Date();
        i = (now.getHours() * 60 + now.getMinutes()) * 7 % pool.length;  // arrival time picks the starting point
        api.source = "random.org";
      }
    })
    .catch(() => {});
  window.Chance = api;
})();
