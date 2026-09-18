# Galiciana Fans — PWA

Visor documental no oficial. Fondos de [biblioteca.galiciana.gal](https://biblioteca.galiciana.gal).

Modo oscuro: sigue el del teléfono (`prefers-color-scheme`) y se puede forzar con el botón ◐.

## Qué incluye

- Inicio móvil: Favoritos + tarjetas con foto
- Consulta general y Cotillear en Sucesos
- Colecciones (secciones de la web)
- Favoritos en el propio teléfono (`localStorage`)
- Frases entre comillas en la caja de búsqueda
- Instalable en Android / iOS (Añadir a pantalla de inicio)

La búsqueda abre el OCR oficial de Galiciana (el catálogo no permite consultar desde el navegador por CORS).

## Subir a GitHub Pages

1. Crea un repositorio vacío, por ejemplo `galiciana-fans`.
2. Sube **solo el contenido** de esta carpeta `pwa/` a la raíz del repo (index.html tiene que estar en la raíz, no dentro de otra carpeta).
3. En GitHub: **Settings → Pages → Deploy from a branch → main / root → Save**.
4. La URL será `https://TUUSUARIO.github.io/galiciana-fans/`.
5. En el móvil, ábrela en Chrome o Safari → menú → **Añadir a pantalla de inicio**.

### Con Git en el ordenador

```bash
cd pwa
git init
git add .
git commit -m "Galiciana Fans PWA"
git branch -M main
git remote add origin https://github.com/TUUSUARIO/galiciana-fans.git
git push -u origin main
```

Luego activa Pages como arriba.

## Probar en local

Cualquier servidor estático. No abras el HTML como archivo `file://` (el service worker no arranca).

```bash
npx serve .
```

## Colores

- Azul `#0B6EBD`
- Celeste `#7EC8E3`
- Oscuro `#071824`
