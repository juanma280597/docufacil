"use client";

import { useState } from "react";
import SplitGeneratorLayout, { WizardStep } from "@/components/SplitGeneratorLayout";
import { CheckboxField, SelectField, TextAreaField, TextField } from "@/components/FormField";
import { buildCartaPoderPdf, CartaPoderData } from "@/lib/documentBuilders";

const hoy = () => new Date().toISOString().split("T")[0];

const INITIAL_DATA: CartaPoderData = {
  pais: "México",
  ciudadEstado: "",
  fecha: hoy(),
  dirigidoA: "A QUIEN CORRESPONDA",
  otorganteNombre: "",
  otorganteIdentificacion: "",
  otorganteDomicilio: "",
  apoderadoNombre: "",
  apoderadoIdentificacion: "",
  apoderadoDomicilio: "",
  tramiteDescripcion: "",
  facultadesAdicionales: "",
  incluirTestigos: true,
  testigo1Nombre: "",
  testigo2Nombre: "",
};

const EXAMPLE_DATA: CartaPoderData = {
  pais: "México",
  ciudadEstado: "Ciudad de México",
  fecha: hoy(),
  dirigidoA: "A QUIEN CORRESPONDA / DIRECCIÓN DE SERVICIOS ESCOLARES",
  otorganteNombre: "María Fernanda López García",
  otorganteIdentificacion: "INE 1234567890123",
  otorganteDomicilio: "Av. Insurgentes Sur 450, Col. Roma Sur, CDMX",
  apoderadoNombre: "Carlos Alberto Ramírez Méndez",
  apoderadoIdentificacion: "INE 9876543210987",
  apoderadoDomicilio: "Calle Morelos 82, Col. Centro, CDMX",
  tramiteDescripcion:
    "Recoger mi certificado original de estudios y constancia de calificaciones, así como firmar el acuse de recibo correspondiente.",
  facultadesAdicionales: "Entregar copias simples de identificación en caso de ser requeridas.",
  incluirTestigos: true,
  testigo1Nombre: "Laura Elena Torres Ruiz",
  testigo2Nombre: "Jorge Luis Hernández Díaz",
};

export default function CartaPoderGenerator() {
  const [data, setData] = useState<CartaPoderData>(INITIAL_DATA);

  const update = <K extends keyof CartaPoderData>(key: K, val: CartaPoderData[K]) => {
    setData((prev) => ({ ...prev, [key]: val }));
  };

  const steps: WizardStep[] = [
    {
      id: "quien-otorga",
      titulo: "Tus datos (Quien da el poder)",
      descripcion: "Escribe el nombre de la persona que autoriza el trámite.",
      content: (
        <>
          <div className="grid gap-4 sm:grid-cols-2">
            <SelectField
              label="País"
              value={data.pais}
              onChange={(e) => update("pais", e.target.value)}
            >
              <option value="México">México</option>
              <option value="Colombia">Colombia</option>
              <option value="Argentina">Argentina</option>
              <option value="Perú">Perú</option>
              <option value="Chile">Chile</option>
              <option value="Otro país">Otro país de Latinoamérica</option>
            </SelectField>
            <TextField
              label="Fecha del documento"
              type="date"
              value={data.fecha}
              onChange={(e) => update("fecha", e.target.value)}
            />
          </div>
          <TextField
            label="Ciudad y Estado / Departamento"
            placeholder="Ej: Guadalajara, Jalisco"
            value={data.ciudadEstado}
            onChange={(e) => update("ciudadEstado", e.target.value)}
          />
          <TextField
            label="Tu nombre completo (Otorgante)"
            placeholder="Ej: Juan Pérez López"
            value={data.otorganteNombre}
            onChange={(e) => update("otorganteNombre", e.target.value)}
          />
          <TextField
            label="Número de identificación (Opcional)"
            placeholder="Ej: INE / Cédula / DNI 12345678"
            helper="Ayuda a dar más validez al documento."
            value={data.otorganteIdentificacion}
            onChange={(e) => update("otorganteIdentificacion", e.target.value)}
          />
          <TextField
            label="Tu domicilio (Opcional)"
            placeholder="Ej: Calle Hidalgo 123, Col. Centro"
            value={data.otorganteDomicilio}
            onChange={(e) => update("otorganteDomicilio", e.target.value)}
          />
        </>
      ),
    },
    {
      id: "apoderado",
      titulo: "Datos de quien hará el trámite",
      descripcion: "Escribe el nombre de la persona de confianza que te representará.",
      content: (
        <>
          <TextField
            label="Nombre completo del Apoderado"
            placeholder="Ej: Ana Sofía Martínez"
            value={data.apoderadoNombre}
            onChange={(e) => update("apoderadoNombre", e.target.value)}
          />
          <TextField
            label="Identificación del Apoderado (Opcional)"
            placeholder="Ej: INE / Cédula / DNI 87654321"
            value={data.apoderadoIdentificacion}
            onChange={(e) => update("apoderadoIdentificacion", e.target.value)}
          />
          <TextField
            label="Domicilio del Apoderado (Opcional)"
            placeholder="Ej: Av. Reforma 200, Col. Juárez"
            value={data.apoderadoDomicilio}
            onChange={(e) => update("apoderadoDomicilio", e.target.value)}
          />
          <TextField
            label="¿A quién va dirigida la carta?"
            placeholder="Ej: A QUIEN CORRESPONDA o nombre de la empresa/escuela"
            value={data.dirigidoA}
            onChange={(e) => update("dirigidoA", e.target.value)}
          />
        </>
      ),
    },
    {
      id: "tramite-testigos",
      titulo: "Trámite y Testigos",
      descripcion: "Explica brevemente qué trámite autorizas y si deseas incluir 2 testigos.",
      content: (
        <>
          <TextAreaField
            label="¿Qué trámite va a realizar?"
            rows={4}
            placeholder="Ej: Recoger mi paquete, recoger documentos escolares, realizar trámite administrativo..."
            value={data.tramiteDescripcion}
            onChange={(e) => update("tramiteDescripcion", e.target.value)}
          />
          <TextField
            label="Aclaración o facultad adicional (Opcional)"
            placeholder="Ej: Válido únicamente durante el mes de noviembre"
            value={data.facultadesAdicionales}
            onChange={(e) => update("facultadesAdicionales", e.target.value)}
          />
          <CheckboxField
            label="Incluir espacio para 2 Testigos"
            description="Recomendado en México y Latinoamérica para que el trámite sea aceptado sin problemas."
            checked={data.incluirTestigos}
            onChange={(val) => update("incluirTestigos", val)}
          />
          {data.incluirTestigos && (
            <div className="grid gap-4 sm:grid-cols-2">
              <TextField
                label="Nombre Testigo 1 (Opcional)"
                placeholder="Se puede llenar a mano"
                value={data.testigo1Nombre}
                onChange={(e) => update("testigo1Nombre", e.target.value)}
              />
              <TextField
                label="Nombre Testigo 2 (Opcional)"
                placeholder="Se puede llenar a mano"
                value={data.testigo2Nombre}
                onChange={(e) => update("testigo2Nombre", e.target.value)}
              />
            </div>
          )}
        </>
      ),
    },
  ];

  return (
    <SplitGeneratorLayout
      titulo="Generador de Carta Poder Simple"
      subtitulo="Llena los 3 pasos sencillos y descarga tu carta poder en PDF lista para firmar."
      filename="carta-poder-simple.pdf"
      steps={steps}
      buildPdf={() => buildCartaPoderPdf(data)}
      onFillExample={() => setData(EXAMPLE_DATA)}
      onReset={() => setData(INITIAL_DATA)}
      depValue={data}
    />
  );
}
