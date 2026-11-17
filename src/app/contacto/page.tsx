import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contacto",
  description: "Ponte en contacto con el equipo de DocuFácil.",
};

export default function ContactoPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-10">
        <h1 className="text-3xl font-extrabold text-slate-900">Contacto</h1>
        <p className="mt-3 text-base leading-relaxed text-slate-700">
          ¿Tienes alguna sugerencia de un nuevo formato legal o encontraste algún detalle
          que podamos mejorar? Nos encantaría escucharte.
        </p>

        <div className="mt-6 rounded-xl border border-slate-200 bg-slate-50 p-5">
          <p className="text-sm font-bold text-slate-900">Correo electrónico</p>
          <p className="mt-1 text-base font-semibold text-teal-700">
            contacto@docufacil.pages.dev
          </p>
          <p className="mt-3 text-xs text-slate-500">
            Nota: Por este medio no brindamos asesoría legal personalizada ni recibimos
            documentación confidencial.
          </p>
        </div>
      </div>
    </div>
  );
}
