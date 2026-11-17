import Link from "next/link";
import { GENERATORS } from "@/lib/catalog";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-16 border-t border-slate-200 bg-white">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
        <div className="grid gap-8 md:grid-cols-3">
          <div>
            <p className="text-lg font-extrabold text-slate-900">
              Docu<span className="text-teal-700">Fácil</span>
            </p>
            <p className="mt-2 text-sm leading-relaxed text-slate-600">
              Generadores gratuitos y sencillos de documentos cotidianos para
              México y Latinoamérica. Tus datos nunca salen de tu navegador.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900">
              Generadores Populares
            </h3>
            <ul className="mt-3 space-y-2 text-sm">
              {GENERATORS.map((g) => (
                <li key={g.slug}>
                  <Link
                    href={`/${g.slug}/`}
                    className="text-slate-600 hover:text-teal-700 hover:underline"
                  >
                    {g.tituloCorto}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900">
              Información y Legal
            </h3>
            <ul className="mt-3 space-y-2 text-sm">
              <li>
                <Link href="/acerca-de/" className="text-slate-600 hover:text-teal-700 hover:underline">
                  Acerca de DocuFácil
                </Link>
              </li>
              <li>
                <Link href="/privacidad/" className="text-slate-600 hover:text-teal-700 hover:underline">
                  Política de Privacidad
                </Link>
              </li>
              <li>
                <Link href="/terminos/" className="text-slate-600 hover:text-teal-700 hover:underline">
                  Términos de Uso y Descargo Legal
                </Link>
              </li>
              <li>
                <Link href="/contacto/" className="text-slate-600 hover:text-teal-700 hover:underline">
                  Contacto y Sugerencias
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-slate-100 pt-6 text-xs leading-relaxed text-slate-500">
          <p>
            <strong>Aviso legal:</strong> DocuFácil ofrece formatos estándar de carácter informativo
            y práctico. No constituye asesoría jurídica ni sustituye la revisión de un abogado o
            notario público en actos que por ley requieran fe pública.
          </p>
          <p className="mt-2">
            © {year} DocuFácil. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
