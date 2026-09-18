const THUMB = (id) =>
  `https://biblioteca.galiciana.gal/es/media/object-miniature.do?id=${id}`;
const OCR = "https://biblioteca.galiciana.gal/es/consulta/resultados_ocr.do";
const FAV_KEY = "galiciana_favs_v1";
const THEME_KEY = "galiciana_theme";

const OBRAS = [
  ["Grandes fiestas en Porriño", "1960", "13124554", "577655"],
  ["Puebla del Caramiñal: fiestas de septiembre", "1960", "13787413", "583444"],
  ["II Certamen Internacional de Cine de Humor", "1974", "14185891", "615091"],
  ["Fiestas del Berbés", "1963", "13872855", "586681"],
  ["Programa de las fiestas del Patrón", "1888", "13948376", "417147"],
  ["Grandes fiestas tradicionales del Apóstol", "1939", "14098722", "601479"],
  ["La voz del Centro", "1917-1918", "14175789", "615025"],
  ["El agrario", "1918-1926", "14153014", "615029"],
];

const SECCIONES = [
  ["Monografías", "13124554", "libro"],
  ["Hemeroteca", "14175789", "periodico"],
  ["Cartografía", "14098722", "mapa"],
  ["Manuscritos", "13948376", "manuscrito"],
  ["Ilustraciones y fotos", "13787413", "fotografia"],
  ["Archivos personales", "14185891", "archivo"],
  ["Registros sonoros", "13872855", "disco"],
  ["Audiovisuales", "14153014", "cine"],
  ["Música impresa", "13948376", "partitura"],
];

function favs() {
  try { return JSON.parse(localStorage.getItem(FAV_KEY) || "[]"); }
  catch { return []; }
}
function setFavs(list) { localStorage.setItem(FAV_KEY, JSON.stringify(list)); }

function applyTheme() {
  const saved = localStorage.getItem(THEME_KEY);
  if (saved) document.documentElement.dataset.theme = saved;
  else delete document.documentElement.dataset.theme;
}

function searchUrl(q, extra = "") {
  const u = new URL(OCR);
  u.searchParams.set("busq_general", `${q} ${extra}`.trim());
  u.searchParams.set("general_ocr", "on");
  u.searchParams.set("tipoResultados", "PAG");
  return u.toString();
}

function viewHome() {
  const list = favs();
  const shells = list.slice(0, 12).map((f) =>
    `<a class="shell" href="${f.url || "#/favoritos"}">${f.imageId ? `<img alt="" src="${THUMB(f.imageId)}">` : ""}</a>`
  ).join("");
  const obras = OBRAS.map(([title, year, img, id]) =>
    `<a class="obra" href="https://biblioteca.galiciana.gal/es/consulta/registro.do?id=${id}">
      <img alt="" src="${THUMB(img)}"><b>${title}</b><small>${year}</small>
    </a>`
  ).join("");
  return `
    <section class="fav">
      <div class="fav-head">
        <span class="vieira">🐚</span>
        <div>
          <h2>Favoritos</h2>
          <p>${list.length ? list.length + " páginas guardadas" : "La vieira celeste espera tu primera página"}</p>
        </div>
      </div>
      ${list.length ? `<div class="shells">${shells}</div>` : `<p class="hint" style="color:#fff;opacity:.85;margin-top:10px">Cuando marques una página con la vieira, aparecerá aquí.</p>`}
    </section>
    <a class="hero" href="#/consulta">
      <img alt="" src="${THUMB("13124554")}"><div class="veil"></div>
      <div class="copy"><h3>Consulta general</h3><span>Texto, título, autor, lugar y años</span></div>
    </a>
    <a class="hero wine" href="#/sucesos">
      <img alt="" src="${THUMB("14175789")}"><div class="veil"></div>
      <div class="copy"><h3>Cotillear en Sucesos y Sociedad</h3><span>Solo esas secciones de la prensa</span></div>
    </a>
    <a class="hero" href="#/hemeroteca">
      <img alt="" src="${THUMB("14175789")}"><div class="veil"></div>
      <div class="copy"><h3>Hemeroteca</h3><span>Cabeceras, años y números</span></div>
    </a>
    <a class="hero" href="#/colecciones">
      <img alt="" src="${THUMB("13787413")}"><div class="veil"></div>
      <div class="copy"><h3>Colecciones</h3><span>Secciones del fondo</span></div>
    </a>
    <a class="hero" href="#/datos">
      <img alt="" src="${THUMB("14098722")}"><div class="veil"></div>
      <div class="copy"><h3>Datos</h3><span>Cifras y SPARQL</span></div>
    </a>
    <h2 class="sec">Obras destacadas</h2>
    <div class="row">${obras}</div>
    <h2 class="sec">Noticias</h2>
    <a class="card" href="#/hemeroteca"><b>El IES Pedras Rubias recupera dos cabeceras históricas</b><p class="hint">La Voz del Centro y El Agrario (Buenos Aires, 1917-1926).</p></a>
    <a class="card" href="#/datos"><b>La Biblioteca Dixital de Galicia en cifras</b><p class="hint">Estadísticas del fondo digital.</p></a>
    <h2 class="sec">Galiciana también es</h2>
    <div class="links">
      <a href="https://www.galiciana.gal">Galiciana Patrimonio Dixital de Galicia</a>
      <a href="https://arquivo.galiciana.gal/arpadweb/gl/inicio/inicio.do">Galiciana Arquivo Dixital de Galicia</a>
      <a href="https://arquivo.galiciana.gal/arpadweb/es.ga.memoria_democratica/gl/micrositios/inicio.do">Memoria e Concordia</a>
      <a href="https://biblioteca.galiciana.gal/es/consulta/busqueda.do">Prensa histórica Galega</a>
    </div>
    <h2 class="sec">Otros recursos</h2>
    <div class="links">
      <a href="https://hispana.mcu.es">Hispana</a>
      <a href="https://www.europeana.eu">Europeana</a>
      <a href="https://dp.la">DPLA</a>
    </div>
    <p class="hint">Unión Europea · Fondo Europeo de Desenvolvemento Rexional. «Unha maneira de facer Europa».</p>
    <div class="xunta">
      <b>XUNTA DE GALICIA</b>
      <p>Información mantenida y publicada en internet por la Xunta de Galicia.</p>
      <p>Uso personal. Esta app no sustituye biblioteca.galiciana.gal</p>
    </div>`;
}

function viewSearch(sucesos) {
  return `
    <form class="box" id="searchForm">
      <h2>${sucesos ? "Cotillear en Sucesos y Sociedad" : "Consulta general"}</h2>
      <p class="hint">${sucesos ? "La búsqueda se acota a Sucesos y Sociedad." : 'Nombre compuesto: "carmen gallego".'}</p>
      <label>Texto</label>
      <input id="q" name="q" placeholder='Ej. "pereira iglesias" barrela' autocomplete="off">
      ${sucesos ? "" : `
      <label>Título</label><input name="titulo">
      <label>Autor</label><input name="autor">
      <label>Lugar</label><input name="lugar">
      <div class="grid">
        <div><label>Año desde</label><input name="desde" inputmode="numeric"></div>
        <div><label>Año hasta</label><input name="hasta" inputmode="numeric"></div>
      </div>`}
      <button type="submit">${sucesos ? "COTILLEAR" : "BUSCAR"}</button>
    </form>`;
}

function viewColecciones() {
  return `<h2>Colecciones</h2><p class="hint">Las mismas secciones de biblioteca.galiciana.gal</p>
    <div class="grid">${SECCIONES.map(([t,id,q]) =>
      `<a class="tile" href="${searchUrl(q)}"><img alt="" src="${THUMB(id)}"><b>${t}</b></a>`
    ).join("")}</div>`;
}

function viewDatos() {
  return `<h2>Datos</h2>
    <a class="card" href="https://biblioteca.galiciana.gal/es/consulta/estadisticas.do"><b>Estadísticas</b><p class="hint">Cifras del fondo en Galiciana.</p></a>
    <a class="card" href="https://datos-abertos.galiciana.gal/sparql"><b>SPARQL</b><p class="hint">Datos abiertos de Galiciana.</p></a>`;
}

function viewHemeroteca() {
  return `<h2>Hemeroteca</h2>
    <p class="hint">Cabeceras históricas en el catálogo oficial.</p>
    <a class="btn" href="https://biblioteca.galiciana.gal/es/consulta/busqueda.do">Abrir hemeroteca de Galiciana</a>
    <a class="card" href="https://biblioteca.galiciana.gal/es/consulta/registro.do?id=615025"><b>La voz del Centro</b><p class="hint">1917-1918</p></a>
    <a class="card" href="https://biblioteca.galiciana.gal/es/consulta/registro.do?id=615029"><b>El agrario</b><p class="hint">1918-1926</p></a>`;
}

function viewFavs() {
  const list = favs();
  if (!list.length) {
    return `<section class="fav"><h2>Favoritos</h2><p>Aún no hay páginas guardadas en este teléfono.</p></section>
      <form class="box" id="addFav"><label>URL de Galiciana</label><input name="url" placeholder="https://biblioteca.galiciana.gal/..."><button>GUARDAR ENLACE</button></form>`;
  }
  return `<h2>Favoritos</h2>` + list.map((f) =>
    `<a class="card" href="${f.url}"><b>${f.title || "Página guardada"}</b><p class="hint">${f.url}</p></a>`
  ).join("");
}

function render() {
  applyTheme();
  const path = ((location.hash || "#/").replace("#", "") || "/").split("?")[0];
  document.querySelectorAll(".tabs a").forEach((a) => {
    const href = a.getAttribute("href").replace("#", "");
    a.classList.toggle("on", path === href || (href === "/" && (path === "/" || path === "")));
  });
  const app = document.getElementById("app");
  if (!app) return;
  if (path.startsWith("/consulta")) app.innerHTML = viewSearch(false);
  else if (path.startsWith("/sucesos")) app.innerHTML = viewSearch(true);
  else if (path.startsWith("/colecciones")) app.innerHTML = viewColecciones();
  else if (path.startsWith("/datos")) app.innerHTML = viewDatos();
  else if (path.startsWith("/hemeroteca")) app.innerHTML = viewHemeroteca();
  else if (path.startsWith("/favoritos")) app.innerHTML = viewFavs();
  else app.innerHTML = viewHome();

  const form = document.getElementById("searchForm");
  if (form) form.addEventListener("submit", (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(form));
    const extra = path.includes("sucesos") ? "Sucesos Sociedad" : "";
    const bits = [data.q, data.titulo, data.autor, data.lugar].filter(Boolean);
    if (!bits.length) return;
    location.href = searchUrl(bits.join(" "), extra);
  });
  const add = document.getElementById("addFav");
  if (add) add.addEventListener("submit", (e) => {
    e.preventDefault();
    const url = new FormData(add).get("url");
    if (!url) return;
    const list = favs();
    list.unshift({ url, title: url, imageId: null });
    setFavs(list);
    render();
  });
}

const themeBtn = document.getElementById("themeBtn");
if (themeBtn) themeBtn.addEventListener("click", () => {
  const cur = document.documentElement.dataset.theme;
  const sysDark = matchMedia("(prefers-color-scheme: dark)").matches;
  const next = cur === "dark" ? "light" : cur === "light" ? "" : sysDark ? "light" : "dark";
  if (next) localStorage.setItem(THEME_KEY, next);
  else localStorage.removeItem(THEME_KEY);
  render();
});
window.addEventListener("hashchange", render);
applyTheme();
render();
if ("serviceWorker" in navigator) navigator.serviceWorker.register("./sw.js");
