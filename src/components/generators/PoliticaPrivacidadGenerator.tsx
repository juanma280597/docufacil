"use client";

import { useState } from "react";
import { CheckCircle2, Copy } from "lucide-react";
import SplitGeneratorLayout, { WizardStep } from "@/components/SplitGeneratorLayout";
import { CheckboxField, SelectField, TextField } from "@/components/FormField";
import {
  buildPoliticaPrivacidadPdf,
  buildPoliticaPrivacidadText,
  PoliticaPrivacidadData,
} from "@/lib/documentBuilders";

const hoy = () => new Date().toISOString().split("T")[0];

const INITIAL_DATA: PoliticaPrivacidadData = {
  nombreSitio: "",
  urlSitio: "",
  responsableNombre: "",
  correoContacto: "",
  pais: "México",
  fechaActualizacion: hoy(),
  recopilaNombreCorreo: true,
  usaCookies: true,
  usaAdsenseAnalytics: true,
};

const EXAMPLE_DATA: PoliticaPrivacidadData = {
  nombreSitio: "Tienda Artesanal MX",
  urlSitio: "https://tiendaartesanal.com",
  responsableNombre: "Ana Laura Gómez / Tienda Artesanal MX",
  correoContacto: "contacto@tiendaartesanal.com",
  pais: "México",
  fechaActualizacion: hoy(),
  recopilaNombreCorreo: true,
  usaCookies: true,
  usaAdsenseAnalytics: true,
};

export default function PoliticaPrivacidadGenerator() {
  const [data, setData] = useState<PoliticaPrivacidadData>(INITIAL_DATA);
  const [copied, setCopied] = useState(false);

  const update = <K extends keyof PoliticaPrivacidadData>(
    key: K,
    val: PoliticaPrivacidadData[K]
  ) => {
    setData((prev) => ({ ...prev, [key]: val }));
  };

  const handleCopyText = async () => {
    const text = buildPoliticaPrivacidadText(data);
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const steps: WizardStep[] = [
    {
      id: "sitio",
      titulo: "Datos de tu sitio web",
      descripcion: "Indica el nombre de tu página, su enlace y quién es el responsable.",
      content: (
        <>
          <TextField
            label="Nombre del sitio web o negocio"
            placeholder="Ej: Mi Blog de Recetas"
            value={data.nombreSitio}
            onChange={(e) => update("nombreSitio", e.target.value)}
          />
          <TextField
            label="Dirección web (URL)"
            placeholder="Ej: https://misitio.com"
            value={data.urlSitio}
            onChange={(e) => update("urlSitio", e.target.value)}
          />
          <TextField
            label="Nombre del responsable o empresa"
            placeholder="Ej: Juan Pérez / Mi Empresa S.A."
            value={data.responsableNombre}
            onChange={(e) => update("responsableNombre", e.target.value)}
          />
          <div className="grid gap-4 sm:grid-cols-2">
            <TextField
              label="Correo de contacto"
              type="email"
              placeholder="contacto@misitio.com"
              value={data.correoContacto}
              onChange={(e) => update("correoContacto", e.target.value)}
            />
            <SelectField
              label="País / Legislación"
              value={data.pais}
              onChange={(e) => update("pais", e.target.value)}
            >
              <option value="México">México (LFPDPPP)</option>
              <option value="Colombia">Colombia</option>
              <option value="Argentina">Argentina</option>
              <option value="Perú">Perú</option>
              <option value="Chile">Chile</option>
              <option value="Latinoamérica">Otro país</option>
            </SelectField>
          </div>
        </>
      ),
    },
    {
      id: "clausulas",
      titulo: "Cookies, Formularios y Anuncios",
      descripcion: "Marca qué funciones utiliza tu página web.",
      content: (
        <>
          <CheckboxField
            label="Tengo formularios de contacto o registro"
            description="Incluye una cláusula explicando que recabas nombre y correo cuando te escriben."
            checked={data.recopilaNombreCorreo}
            onChange={(val) => update("recopilaNombreCorreo", val)}
          />
          <CheckboxField
            label="Mi sitio web usa Cookies"
            description="La mayoría de sitios web modernos (WordPress, Next.js, Wix) usan cookies."
            checked={data.usaCookies}
            onChange={(val) => update("usaCookies", val)}
          />
          <CheckboxField
            label="Uso Google AdSense o Google Analytics"
            description="Obligatorio si planeas mostrar anuncios de Google AdSense o medir visitas."
            checked={data.usaAdsenseAnalytics}
            onChange={(val) => update("usaAdsenseAnalytics", val)}
          />
          <TextField
            label="Fecha de actualización"
            type="date"
            value={data.fechaActualizacion}
            onChange={(e) => update("fechaActualizacion", e.target.value)}
          />
        </>
      ),
    },
  ];

  const extraCopyBox = (
    <div className="rounded-2xl border border-teal-200 bg-teal-50 p-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-sm font-bold text-teal-900">
            ¿Vas a pegarla en tu página web?
          </p>
          <p className="text-xs text-teal-800">
            Copia todo el texto listo para pegar en WordPress, Wix o HTML.
          </p>
        </div>
        <button
          type="button"
          onClick={handleCopyText}
          className="inline-flex items-center gap-1.5 rounded-xl bg-teal-700 px-4 py-2.5 text-sm font-bold text-white transition hover:bg-teal-800"
        >
          {copied ? (
            <>
              <CheckCircle2 className="h-4 w-4" />
              ¡Texto copiado!
            </>
          ) : (
            <>
              <Copy className="h-4 w-4" />
              Copiar texto completo
            </>
          )}
        </button>
      </div>
    </div>
  );

  return (
    <SplitGeneratorLayout
      titulo="Generador de Política de Privacidad"
      subtitulo="Crea el aviso legal para tu página web o tienda en línea (compatible con Google AdSense)."
      filename="politica-de-privacidad.pdf"
      steps={steps}
      buildPdf={() => buildPoliticaPrivacidadPdf(data)}
      onFillExample={() => setData(EXAMPLE_DATA)}
      onReset={() => setData(INITIAL_DATA)}
      extraActions={extraCopyBox}
      depValue={data}
    />
  );
}
