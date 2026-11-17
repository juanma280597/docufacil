import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Política de Privacidad",
  description: "Política de Privacidad y manejo de datos de DocuFácil.",
};

export default function PrivacidadPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-10">
        <h1 className="text-3xl font-extrabold text-slate-900">
          Política de Privacidad
        </h1>
        <p className="mt-2 text-sm text-slate-500">
          Última actualización: noviembre de 2026
        </p>

        <div className="mt-6 space-y-5 text-base leading-relaxed text-slate-700">
          <section>
            <h2 className="text-lg font-bold text-slate-900">
              1. Privacidad en la generación de documentos
            </h2>
            <p className="mt-1">
              En <strong>DocuFácil</strong>, todos los formularios, cálculos de RFC y
              generación de archivos PDF se ejecutan de manera 100% local dentro de tu
              navegador web. No enviamos, almacenamos ni vendemos los nombres, domicilios,
              montos o datos fiscales que escribes en nuestras herramientas.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-slate-900">
              2. Cookies y publicidad (Google AdSense)
            </h2>
            <p className="mt-1">
              Este sitio web utiliza servicios de terceros como Google AdSense y Google
              Search Console para analizar el tráfico de forma agregada y mostrar anuncios
              que mantienen la plataforma gratuita. Google, como proveedor asociado, utiliza
              cookies para mostrar anuncios basados en tus visitas anteriores a este u otros
              sitios web. Puedes inhabilitar la publicidad personalizada desde la
              Configuración de Anuncios de Google.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-slate-900">
              3. Derechos del usuario
            </h2>
            <p className="mt-1">
              Al no almacenar bases de datos de documentos ni exigir registro de cuentas,
              tus datos desaparecen automáticamente al cerrar o limpiar la pestaña de tu
              navegador. Si tienes dudas sobre esta política, puedes escribirnos a través
              de nuestra página de contacto.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
