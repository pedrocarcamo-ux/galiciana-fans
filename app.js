const KEY = "galiciana_favs_v1";
const thumbs = (id) =>
  `https://biblioteca.galiciana.gal/es/media/object-miniature.do?id=${id}`;

function loadFavs() {
  try { return JSON.parse(localStorage.getItem(KEY) || "[]"); }
  catch { return []; }
}
function saveFavs(list) {
  localStorage.setItem(KEY, JSON.stringify(list));
  renderFavs();
}

function renderFavs() {
  const list = loadFavs();
  document.getElementById("favMeta").textContent =
    list.length ? `${list.length} páginas guardadas` : "La vieira celeste espera tu primera página";
  const box = document.getElementById("shells");
  box.innerHTML = "";
  list.slice(0, 12).forEach((f) => {
    const a = document.createElement("a");
    a.className = "shell";
    a.href = f.url;
    if (f.imageId) {
      const img = document.createElement("img");
      img.src = thumbs(f.imageId);
      img.alt = f.title || "";
      a.appendChild(img);
    }
    box.appendChild(a);
  });
}

function galicianaSearchUrl(q, sucesos) {
  const term = sucesos ? `${q} Sucesos Sociedad` : q;
  const u = new URL("https://biblioteca.galiciana.gal/es/consulta/resultados_ocr.do");
  u.searchParams.set("busq_general", term);
  u.searchParams.set("general_ocr", "on");
  u.searchParams.set("tipoResultados", "PAG");
  return u.toString();
}

function runSearch(sucesos) {
  const q = document.getElementById("q").value.trim();
  if (!q) return;
  const hits = document.getElementById("hits");
  hits.innerHTML = `<p class="muted">Abriendo resultados de Galiciana…</p>`;
  location.href = galicianaSearchUrl(q, sucesos);
}

document.getElementById("form").addEventListener("submit", (e) => {
  e.preventDefault();
  runSearch(false);
});
document.getElementById("sucesosBtn").addEventListener("click", () => runSearch(true));

renderFavs();

if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("./sw.js");
}
