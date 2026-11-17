import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Términos de Uso y Descargo Legal",
  description: "Condiciones de uso y descargo de responsabilidad legal de DocuFácil.",
  alternates: {
    canonical: "/terminos/",
  },
};

export default function TerminosPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-10">
        <h1 className="text-3xl font-extrabold text-slate-900">
          Términos de Uso y Descargo Legal
        </h1>

        <div className="mt-6 space-y-5 text-base leading-relaxed text-slate-700">
          <section>
            <h2 className="text-lg font-bold text-slate-900">
              1. Naturaleza informativa
            </h2>
            <p className="mt-1">
              DocuFácil ofrece plantillas estándar y calculadoras de uso cotidiano con fines
              estrictamente informativos y prácticos. El uso de la plataforma no crea una
              relación abogado-cliente ni constituye asesoría jurídica, fiscal o contable.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-slate-900">
              2. Cálculo de RFC y Constancia del SAT
            </h2>
            <p className="mt-1">
              Nuestra calculadora de RFC implementa el algoritmo estándar para personas físicas
              en México. La ficha generada es un documento informativo para agilizar trámites
              internos y no sustituye a la Constancia de Situación Fiscal emitida por el SAT.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-slate-900">
              3. Responsabilidad del usuario
            </h2>
            <p className="mt-1">
              El usuario es responsable de verificar que los datos ingresados sean correctos
              y de consultar a un profesional del derecho o notario público en operaciones de
              alto valor o actos que requieran fe pública.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
