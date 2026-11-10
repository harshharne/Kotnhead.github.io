/* =====================================================================
   GITHUB. Reads content.js from the repo and publishes changes as one
   commit (content.js plus any new images), through GitHub's API.
   The key lives in this browser's storage only.
   ===================================================================== */
window.EdGitHub = (() => {
  const KEY = "ed.github";
  const DEFAULTS = { owner: "harshharne", repo: "kotnhead.github.io", branch: "", token: "" };
  const CONTENT = "assets/js/content.js";

  const load = () => { try { return { ...DEFAULTS, ...JSON.parse(localStorage.getItem(KEY) || "{}") }; } catch { return { ...DEFAULTS }; } };
  const save = c => { try { localStorage.setItem(KEY, JSON.stringify(c)); } catch {} };
  const ready = () => !!load().token;

  async function api(path, opts = {}) {
    const c = load();
    const res = await fetch(`https://api.github.com/repos/${c.owner}/${c.repo}${path}`, {
      ...opts,
      headers: { Accept: "application/vnd.github+json", Authorization: `Bearer ${c.token}`, "X-GitHub-Api-Version": "2022-11-28", ...(opts.body ? { "Content-Type": "application/json" } : {}), ...(opts.headers || {}) },
    });
    if (!res.ok) {
      let msg = `${res.status}`;
      try { msg += ` ${(await res.json()).message}`; } catch {}
      const e = new Error(explain(res.status, msg)); e.status = res.status; throw e;
    }
    return res.status === 204 ? null : res.json();
  }
  const explain = (status, msg) =>
    status === 401 ? "GitHub didn’t accept the key. It may have expired; make a new one in Settings." :
    status === 403 ? "The key can’t write to this repo. Check it has Contents: Read and write, for this repo." :
    status === 404 ? "Repo or branch not found. Check the owner, repo and branch in Settings." :
    status === 409 || status === 422 ? `GitHub refused the change (${msg}). Try Publish again.` : `GitHub error: ${msg}`;

  const branch = async () => load().branch || (await api("")).default_branch;

  // text → base64, safe for any characters
  const b64text = s => { const b = new TextEncoder().encode(s); let out = ""; for (let i = 0; i < b.length; i += 0x8000) out += String.fromCharCode(...b.subarray(i, i + 0x8000)); return btoa(out); };
  const b64blob = blob => new Promise((ok, no) => { const r = new FileReader(); r.onload = () => ok(String(r.result).split(",")[1]); r.onerror = no; r.readAsDataURL(blob); });

  /* the current content.js on GitHub: its text and its blob sha */
  async function readContent() {
    const br = await branch();
    const meta = await api(`/contents/${CONTENT}?ref=${encodeURIComponent(br)}`);
    const blob = await api(`/git/blobs/${meta.sha}`);
    const bin = atob(blob.content.replace(/\n/g, ""));
    const text = new TextDecoder().decode(Uint8Array.from(bin, c => c.charCodeAt(0)));
    return { text, sha: meta.sha, branch: br };
  }
  const contentSha = async () => { const br = await branch(); return (await api(`/contents/${CONTENT}?ref=${encodeURIComponent(br)}`)).sha; };

  /* one commit: content.js + new files. files: [{ path, blob }] */
  async function publish({ text, files = [], message, onStep = () => {} }) {
    const br = await branch();
    onStep("Reading the repo");
    const ref = await api(`/git/ref/heads/${encodeURIComponent(br)}`);
    const head = await api(`/git/commits/${ref.object.sha}`);
    const tree = [];
    for (let i = 0; i < files.length; i++) {
      onStep(`Uploading image ${i + 1} of ${files.length}`);
      const b = await api("/git/blobs", { method: "POST", body: JSON.stringify({ content: await b64blob(files[i].blob), encoding: "base64" }) });
      tree.push({ path: files[i].path, mode: "100644", type: "blob", sha: b.sha });
    }
    onStep("Saving the content");
    const cb = await api("/git/blobs", { method: "POST", body: JSON.stringify({ content: b64text(text), encoding: "base64" }) });
    tree.push({ path: CONTENT, mode: "100644", type: "blob", sha: cb.sha });
    const t = await api("/git/trees", { method: "POST", body: JSON.stringify({ base_tree: head.tree.sha, tree }) });
    onStep("Publishing");
    const commit = await api("/git/commits", { method: "POST", body: JSON.stringify({ message, tree: t.sha, parents: [head.sha] }) });
    await api(`/git/refs/heads/${encodeURIComponent(br)}`, { method: "PATCH", body: JSON.stringify({ sha: commit.sha }) });
    return { sha: cb.sha, commit: commit.sha };
  }

  async function check() {
    const c = load();
    const r = await api("");
    if (!r.permissions || !r.permissions.push) throw new Error("The key can read this repo but not write to it. Give it Contents: Read and write.");
    return `Connected to ${c.owner}/${c.repo} (${c.branch || r.default_branch}).`;
  }

  return { load, save, ready, readContent, contentSha, publish, check, CONTENT };
})();
