import Link from "next/link";
import {
  ArrowRight,
  Banknote,
  CheckCircle2,
  Clock,
  FileSignature,
  Home,
  IdCard,
  Lock,
  Printer,
  Receipt,
  ShieldCheck,
} from "lucide-react";
import { GENERATORS, GeneratorInfo } from "@/lib/catalog";
import AdSlot from "@/components/AdSlot";
import ProximamenteBanner from "@/components/ProximamenteBanner";

const ICON_MAP: Record<GeneratorInfo["icono"], React.ReactNode> = {
  FileSignature: <FileSignature className="h-7 w-7 text-teal-700" />,
  IdCard: <IdCard className="h-7 w-7 text-teal-700" />,
  Home: <Home className="h-7 w-7 text-teal-700" />,
  Banknote: <Banknote className="h-7 w-7 text-teal-700" />,
  Receipt: <Receipt className="h-7 w-7 text-teal-700" />,
  ShieldCheck: <ShieldCheck className="h-7 w-7 text-teal-700" />,
};

export default function HomePage() {
  return (
    <div className="pb-12">
      {/* Hero amigable */}
      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16">
          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-teal-50 px-4 py-1.5 text-sm font-bold text-teal-800">
              <CheckCircle2 className="h-4 w-4" />
              100% Gratis • Sin registro • Privado en tu dispositivo
            </span>

            <h1 className="mt-5 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
              Documentos legales y RFC en PDF{" "}
              <span className="text-teal-700">fáciles de hacer</span>
            </h1>

            <p className="mt-4 text-lg leading-relaxed text-slate-600">
              No necesitas saber de leyes ni de computadoras. Elige el documento que
              necesitas, llena los datos paso a paso y{" "}
              <strong className="text-slate-800">descárgalo o imprímelo al instante</strong>.
            </p>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <a
                href="#documentos"
                className="inline-flex items-center gap-2 rounded-xl bg-teal-700 px-6 py-3.5 text-base font-bold text-white shadow-sm transition hover:bg-teal-800"
              >
                Elegir un documento
                <ArrowRight className="h-5 w-5" />
              </a>
              <Link
                href="/calculadora-rfc/"
                className="inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-6 py-3.5 text-base font-bold text-slate-800 transition hover:bg-slate-50"
              >
                <IdCard className="h-5 w-5 text-teal-700" />
                Calcular mi RFC para trabajo
              </Link>
            </div>
          </div>

          {/* Cómo funciona en 3 pasos */}
          <div className="mx-auto mt-12 grid max-w-4xl gap-4 sm:grid-cols-3">
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5 text-center">
              <span className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-teal-700 text-base font-extrabold text-white">
                1
              </span>
              <h2 className="mt-3 text-base font-bold text-slate-900">
                Elige tu documento
              </h2>
              <p className="mt-1 text-sm text-slate-600">
                Carta poder, contrato, pagaré, recibo, privacidad o ficha de RFC.
              </p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5 text-center">
              <span className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-teal-700 text-base font-extrabold text-white">
                2
              </span>
              <h2 className="mt-3 text-base font-bold text-slate-900">
                Llena paso a paso
              </h2>
              <p className="mt-1 text-sm text-slate-600">
                Preguntas sencillas con ejemplos claros y vista previa en vivo.
              </p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5 text-center">
              <span className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-emerald-600 text-base font-extrabold text-white">
                3
              </span>
              <h2 className="mt-3 text-base font-bold text-slate-900">
                Descarga o imprime
              </h2>
              <p className="mt-1 text-sm text-slate-600">
                Obtén tu PDF limpio y formal listo para firmar o entregar.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Anuncio */}
      <div className="mx-auto mt-8 max-w-7xl px-4 sm:px-6">
        <AdSlot />
      </div>

      {/* Catálogo de los 6 generadores */}
      <section id="documentos" className="mx-auto mt-10 max-w-7xl px-4 sm:px-6">
        <div className="mb-6">
          <h2 className="text-2xl font-extrabold text-slate-900 sm:text-3xl">
            ¿Qué documento necesitas hoy?
          </h2>
          <p className="mt-1 text-base text-slate-600">
            Haz clic en cualquiera de las tarjetas para empezar.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {GENERATORS.map((item) => (
            <Link
              key={item.slug}
              href={`/${item.slug}/`}
              className="group flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:border-teal-500 hover:shadow-md"
            >
              <div>
                <div className="flex items-start justify-between gap-3">
                  <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-teal-50 transition group-hover:bg-teal-100">
                    {ICON_MAP[item.icono]}
                  </span>
                  <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-700">
                    {item.badge}
                  </span>
                </div>

                <h3 className="mt-5 text-xl font-bold text-slate-900 group-hover:text-teal-800">
                  {item.tituloCorto}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">
                  {item.subtitulo}
                </p>
              </div>

              <div className="mt-6 flex items-center justify-between border-t border-slate-100 pt-4">
                <span className="inline-flex items-center gap-1 text-xs font-semibold text-slate-500">
                  <Clock className="h-3.5 w-3.5" />
                  Listo en {item.tiempo}
                </span>
                <span className="inline-flex items-center gap-1 text-sm font-bold text-teal-700 group-hover:translate-x-0.5 transition">
                  Crear documento
                  <ArrowRight className="h-4 w-4" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Sección de confianza */}
      <section className="mx-auto mt-14 max-w-7xl px-4 sm:px-6">
        <div className="grid gap-6 rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 md:grid-cols-3">
          <div className="flex items-start gap-3.5">
            <Lock className="mt-0.5 h-6 w-6 shrink-0 text-teal-700" />
            <div>
              <h3 className="text-base font-bold text-slate-900">
                Privacidad total
              </h3>
              <p className="mt-1 text-sm text-slate-600">
                Tus nombres, montos, direcciones y RFC se procesan únicamente dentro de tu navegador. No guardamos nada en servidores.
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3.5">
            <Printer className="mt-0.5 h-6 w-6 shrink-0 text-teal-700" />
            <div>
              <h3 className="text-base font-bold text-slate-900">
                Formato tamaño Carta listo
              </h3>
              <p className="mt-1 text-sm text-slate-600">
                Cada PDF está diseñado con márgenes limpios y tipografía formal lista para imprimir en cualquier papelería o casa.
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3.5">
            <ShieldCheck className="mt-0.5 h-6 w-6 shrink-0 text-teal-700" />
            <div>
              <h3 className="text-base font-bold text-slate-900">
                Pensado para México y LatAm
              </h3>
              <p className="mt-1 text-sm text-slate-600">
                Redacción clara en español con soporte de monedas (MXN, USD, COP, ARS, PEN, CLP) y cálculo de RFC mexicano.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Banner de escalabilidad */}
      <ProximamenteBanner />
    </div>
  );
}
