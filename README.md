# DocuFácil — Generadores de Documentos Legales, Contratos y RFC en PDF

Plataforma 100% gratuita y sin backend (`$0` de costo operativo) para generar documentos cotidianos en México y Latinoamérica directamente en el navegador con vista previa en vivo y exportación a PDF.

## Documentos incluidos
1. **Carta Poder Simple** (`/carta-poder/`)
2. **Calculadora de RFC y Ficha para Trabajo** (`/calculadora-rfc/`)
3. **Contrato de Arrendamiento Básico** (`/contrato-arrendamiento/`)
4. **Pagaré Legal con monto en letra** (`/pagare/`)
5. **Recibo de Pago / Honorarios / Renta** (`/recibo-pago/`)
6. **Política de Privacidad para Sitios Web** (`/politica-privacidad/`)

---

## Despliegue Gratis en Cloudflare Pages (2 clics desde GitHub)

1. Entra a [Cloudflare Dashboard](https://dash.cloudflare.com/) -> **Workers & Pages** -> **Create** -> **Pages** -> **Connect to Git**.
2. Selecciona tu repositorio `docufacil`.
3. En la configuración del build pon:
   - **Framework preset**: `Next.js (Static HTML Export)`
   - **Build command**: `npm run build`
   - **Build output directory**: `out`
4. (Opcional) Agrega las variables de entorno en **Settings -> Environment variables**:
   - `NEXT_PUBLIC_SITE_URL` (tu URL `.pages.dev` o dominio propio)
   - `NEXT_PUBLIC_GSC_VERIFICATION` (código de verificación de Google Search Console)
   - `NEXT_PUBLIC_ADSENSE_CLIENT` (tu `ca-pub-...` de AdSense)
5. Haz clic en **Save and Deploy**. Cada `git push` actualizará el sitio automáticamente gratis.

---

## Conectar Google Search Console para ver el tráfico

1. Entra a [Google Search Console](https://search.google.com/search-console) y agrega tu propiedad (por **Prefijo de URL**, ej. `https://docufacil.pages.dev`).
2. Elige el método de verificación **Etiqueta HTML**, copia únicamente el código dentro de `content="..."`, pégalo en la variable `NEXT_PUBLIC_GSC_VERIFICATION` en Cloudflare Pages y redespliega.
3. Una vez verificado, entra al menú **Sitemaps** en Google Search Console y envía:
   - `sitemap.xml`
4. En pocos días empezarás a ver impresiones, clics y palabras clave por las que te encuentran.
