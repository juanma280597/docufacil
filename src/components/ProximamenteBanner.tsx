import { FileSpreadsheet, PenTool } from "lucide-react";

export default function ProximamenteBanner() {
  return (
    <section className="mx-auto mt-10 max-w-7xl px-4 sm:px-6">
      <div className="rounded-2xl border border-slate-200 bg-gradient-to-r from-slate-900 to-slate-800 p-6 text-white shadow-sm sm:p-8">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-center">
          <div className="max-w-2xl">
            <span className="inline-block rounded-full bg-teal-500/20 px-3 py-1 text-xs font-bold uppercase tracking-wider text-teal-300">
              Próximamente en DocuFácil
            </span>
            <h2 className="mt-2 text-xl font-bold sm:text-2xl">
              Paquetes editables en Word (.docx) y Firma Electrónica
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-slate-300">
              Todos nuestros generadores en PDF seguirán siendo gratis. Muy pronto podrás
              adquirir paquetes de plantillas editables revisadas por abogados o firmar
              documentos con validez legal desde tu celular.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <div className="flex items-center gap-2 rounded-xl bg-white/10 px-4 py-3 text-sm font-medium">
              <FileSpreadsheet className="h-4 w-4 text-teal-300" />
              Plantillas .DOCX
            </div>
            <div className="flex items-center gap-2 rounded-xl bg-white/10 px-4 py-3 text-sm font-medium">
              <PenTool className="h-4 w-4 text-teal-300" />
              Firma Electrónica
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
