import { CheckCircle2, HelpCircle } from "lucide-react";
import type { GeneratorInfo } from "@/lib/catalog";

interface SeoGuideSectionProps {
  info: GeneratorInfo;
}

export default function SeoGuideSection({ info }: SeoGuideSectionProps) {
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: info.faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <section className="mx-auto mt-12 max-w-7xl px-4 sm:px-6">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <div className="grid gap-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8 lg:grid-cols-2">
        <div>
          <h2 className="text-xl font-bold text-slate-900">
            ¿Qué es y cuándo usar este documento?
          </h2>
          <p className="mt-3 text-base leading-relaxed text-slate-600">
            {info.queEs}
          </p>

          <h3 className="mt-6 text-base font-bold text-slate-900">
            Casos de uso más comunes:
          </h3>
          <ul className="mt-3 space-y-2.5">
            {info.cuandoUsar.map((item, idx) => (
              <li key={idx} className="flex items-start gap-2.5 text-sm text-slate-700">
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-teal-600" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="flex items-center gap-2 text-xl font-bold text-slate-900">
            <HelpCircle className="h-5 w-5 text-teal-700" />
            Preguntas frecuentes
          </h2>
          <div className="mt-4 space-y-4">
            {info.faqs.map((faq, idx) => (
              <div
                key={idx}
                className="rounded-xl border border-slate-200 bg-slate-50/80 p-4"
              >
                <h3 className="text-base font-bold text-slate-900">
                  {faq.question}
                </h3>
                <p className="mt-1.5 text-sm leading-relaxed text-slate-600">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
