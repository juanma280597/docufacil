import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Acerca de DocuFácil",
  description: "Conoce la misión de DocuFácil: hacer los documentos cotidianos accesibles para todos.",
};

export default function AcercaDePage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-10">
        <h1 className="text-3xl font-extrabold text-slate-900">
          Acerca de DocuFácil
        </h1>
        <p className="mt-4 text-base leading-relaxed text-slate-700">
          <strong>DocuFácil</strong> nació con un objetivo claro: ayudar a cualquier persona
          en México y Latinoamérica a generar documentos cotidianos en PDF sin tener que
          pelear con procesadores de texto complicados ni formatos rotos de internet.
        </p>
        <p className="mt-4 text-base leading-relaxed text-slate-700">
          Ya sea que necesites una carta poder para recoger un documento, un contrato básico
          para rentar un cuarto, un pagaré, un recibo de pago o calcular tu RFC para llevarlo
          a una entrevista de trabajo, nuestras herramientas te guían paso a paso con botones
          claros y vista previa en tiempo real.
        </p>

        <div className="mt-8">
          <Link
            href="/"
            className="inline-flex rounded-xl bg-teal-700 px-5 py-3 text-sm font-bold text-white hover:bg-teal-800"
          >
            Explorar los 6 generadores
          </Link>
        </div>
      </div>
    </div>
  );
}
