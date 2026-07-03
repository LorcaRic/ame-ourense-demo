# AME Ourense — Paquete web estático premium

Este ZIP contiene una web multipágina lista para subir a un hosting estático.

## Contenido

- `index.html` — página principal.
- `sobre.html` — historia, misión, valores y equipo.
- `asociate.html` — beneficios, modalidades y formulario de alta.
- `eventos.html` — agenda con filtros.
- `noticias.html` — actualidad y contenidos.
- `recursos.html` — recursos descargables y FAQ.
- `contacto.html` — datos y formulario.
- `aviso-legal.html`, `privacidad.html`, `cookies.html` — plantillas legales.
- `assets/css/styles.css` — estilos responsive y animaciones.
- `assets/js/main.js` — menú móvil, scroll reveal, filtros, FAQ, formularios, cookies.
- `assets/img/` — logo optimizado y SVGs ilustrativos creados para este paquete.
- `robots.txt`, `sitemap.xml`, `site.webmanifest`.

## Cómo abrirlo

Abre `index.html` en el navegador. Para probarlo como web real, usa un servidor local:

```bash
python -m http.server 8080
```

Luego entra en `http://localhost:8080`.

## Cómo subirlo a hosting

Sube todos los archivos al directorio público del dominio, por ejemplo `public_html/`.

## Formularios

Los formularios funcionan en modo estático abriendo el cliente de correo del visitante con el mensaje preparado para `info@asoc-ame.es`.

Para producción real, se recomienda conectar uno de estos servicios:

- Netlify Forms
- Formspree
- Brevo / Acumbamail / Mailchimp
- WordPress + plugin de formularios
- Backend propio PHP/Node

## Imágenes y derechos

- Las ilustraciones SVG incluidas han sido creadas para este paquete y pueden usarse libremente en esta web.
- El logotipo procede de la imagen aportada por el usuario. Antes de publicar, confirma que AME Ourense autoriza su uso.
- No se han incluido fotos externas descargadas de bancos de imágenes para evitar problemas de licencia.

## Datos que conviene revisar antes de publicar

- Dirección, teléfonos y email.
- Cuotas reales de socias.
- Nombres y cargos de la junta directiva.
- Fechas reales de eventos.
- Textos legales adaptados por asesoría.
- Enlaces finales de Instagram/Facebook.
- Dominio definitivo en `sitemap.xml` y etiquetas Open Graph.

## Personalización rápida

Colores principales en `assets/css/styles.css`:

```css
--ame-rose:#c90058;
--ame-orange:#ff9f00;
--ame-plum:#3b0826;
```

Para cambiar textos, edita directamente los archivos `.html`.


## Actualización visual
Esta versión incorpora una galería de ilustraciones originales en `assets/img/visuals/`, cabeceras visuales para cada página, tarjetas con imagen y optimizaciones responsive para móvil. Las imágenes son SVG ligeros, escalables y sin dependencias externas.


## Actualización visual responsive

Se añadió una pasada final de imágenes originales y responsive:

- Ilustraciones SVG premium y coherentes con cada sección.
- Cabeceras visuales adaptadas a móvil.
- Tarjetas con proporciones estables para evitar saltos de diseño.
- Menú móvil con scroll seguro si la pantalla es pequeña.
- Revisión de ancho horizontal en móvil para todas las páginas HTML.

Las imágenes están en `assets/img/visuals/` y no dependen de bancos externos.
