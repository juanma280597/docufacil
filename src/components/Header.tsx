import Link from "next/link";
import { FileText, ShieldCheck } from "lucide-react";

export default function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3.5 sm:px-6">
        <Link
          href="/"
          className="flex items-center gap-2.5 text-slate-900 transition hover:opacity-85"
        >
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-teal-700 text-white shadow-sm">
            <FileText className="h-5 w-5" />
          </span>
          <div>
            <span className="block text-xl font-extrabold tracking-tight text-slate-900">
              Docu<span className="text-teal-700">Fácil</span>
            </span>
            <span className="hidden text-xs font-medium text-slate-500 sm:block">
              Documentos legales y RFC gratis en PDF
            </span>
          </div>
        </Link>

        <nav className="flex items-center gap-2 sm:gap-4">
          <Link
            href="/#documentos"
            className="rounded-lg px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-100"
          >
            Todos los documentos
          </Link>
          <Link
            href="/calculadora-rfc/"
            className="hidden rounded-lg bg-teal-50 px-3.5 py-2 text-sm font-semibold text-teal-800 hover:bg-teal-100 sm:inline-flex"
          >
            Calcular RFC
          </Link>
          <span className="hidden items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700 md:inline-flex">
            <ShieldCheck className="h-3.5 w-3.5" />
            100% Privado en tu dispositivo
          </span>
        </nav>
      </div>
    </header>
  );
}
