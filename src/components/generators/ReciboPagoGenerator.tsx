"use client";

import { useState } from "react";
import SplitGeneratorLayout, { WizardStep } from "@/components/SplitGeneratorLayout";
import { SelectField, TextAreaField, TextField } from "@/components/FormField";
import { buildReciboPdf, ReciboData } from "@/lib/documentBuilders";
import { MONEDAS, MonedaCodigo, numeroALetras } from "@/lib/numeroALetras";

const hoy = () => new Date().toISOString().split("T")[0];

const INITIAL_DATA: ReciboData = {
  tipoRecibo: "Recibo de Pago",
  folio: "001",
  fecha: hoy(),
  ciudad: "",
  moneda: "MXN",
  monto: "",
  recibiDe: "",
  concepto: "",
  formaPago: "Efectivo",
  quienRecibeNombre: "",
  quienRecibeId: "",
};

const EXAMPLE_DATA: ReciboData = {
  tipoRecibo: "Recibo de Arrendamiento",
  folio: "014",
  fecha: hoy(),
  ciudad: "Ciudad de México",
  moneda: "MXN",
  monto: "7500",
  recibiDe: "Sofía Alejandra Mendoza Ríos",
  concepto: "Pago correspondiente a la renta mensual del departamento 4B por el mes en curso.",
  formaPago: "Transferencia bancaria",
  quienRecibeNombre: "Roberto Carlos Garza Treviño",
  quienRecibeId: "GATR780412ABC",
};

export default function ReciboPagoGenerator() {
  const [data, setData] = useState<ReciboData>(INITIAL_DATA);

  const update = <K extends keyof ReciboData>(key: K, val: ReciboData[K]) => {
    setData((prev) => ({ ...prev, [key]: val }));
  };

  const montoEnLetra =
    parseFloat(data.monto) > 0
      ? numeroALetras(data.monto, data.moneda)
      : "Se escribirá en letras automáticamente";

  const steps: WizardStep[] = [
    {
      id: "tipo-monto",
      titulo: "Tipo de recibo y cantidad",
      descripcion: "Elige el tipo de comprobante y escribe cuánto dinero se recibió.",
      content: (
        <>
          <div className="grid gap-4 sm:grid-cols-2">
            <SelectField
              label="Tipo de recibo"
              value={data.tipoRecibo}
              onChange={(e) => update("tipoRecibo", e.target.value)}
            >
              <option value="Recibo de Pago">Recibo de Pago General</option>
              <option value="Recibo de Arrendamiento">Recibo de Arrendamiento (Renta)</option>
              <option value="Recibo de Honorarios">Recibo de Honorarios / Servicios</option>
              <option value="Recibo de Abono">Recibo de Abono a Deuda</option>
            </SelectField>
            <TextField
              label="Número de Folio"
              placeholder="001"
              value={data.folio}
              onChange={(e) => update("folio", e.target.value)}
            />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <SelectField
              label="Moneda"
              value={data.moneda}
              onChange={(e) => update("moneda", e.target.value as MonedaCodigo)}
            >
              {Object.values(MONEDAS).map((m) => (
                <option key={m.codigo} value={m.codigo}>
                  {m.codigo} - {m.pais}
                </option>
              ))}
            </SelectField>
            <TextField
              label="Cantidad recibida"
              type="number"
              placeholder="Ej: 2500"
              value={data.monto}
              onChange={(e) => update("monto", e.target.value)}
            />
          </div>
          <p className="rounded-xl bg-teal-50 px-3.5 py-2.5 text-xs font-semibold text-teal-800">
            En letra: {montoEnLetra}
          </p>
          <SelectField
            label="Forma de pago"
            value={data.formaPago}
            onChange={(e) => update("formaPago", e.target.value)}
          >
            <option value="Efectivo">Efectivo</option>
            <option value="Transferencia bancaria">Transferencia bancaria</option>
            <option value="Depósito en cuenta">Depósito en cuenta</option>
            <option value="Cheque">Cheque</option>
          </SelectField>
        </>
      ),
    },
    {
      id: "personas-concepto",
      titulo: "Personas y concepto",
      descripcion: "Indica quién entregó el dinero, quién lo recibe y por qué motivo.",
      content: (
        <>
          <TextField
            label="Recibí de (Nombre de quien paga)"
            placeholder="Ej: Sofía Alejandra Mendoza"
            value={data.recibiDe}
            onChange={(e) => update("recibiDe", e.target.value)}
          />
          <TextAreaField
            label="Por concepto de"
            rows={3}
            placeholder="Ej: Pago de renta del mes, reparación eléctrica, abono de préstamo..."
            value={data.concepto}
            onChange={(e) => update("concepto", e.target.value)}
          />
          <TextField
            label="Nombre de quien recibe el dinero"
            placeholder="Ej: Roberto Carlos Garza"
            value={data.quienRecibeNombre}
            onChange={(e) => update("quienRecibeNombre", e.target.value)}
          />
          <div className="grid gap-4 sm:grid-cols-3">
            <TextField
              label="RFC / ID (Opcional)"
              placeholder="Opcional"
              value={data.quienRecibeId}
              onChange={(e) => update("quienRecibeId", e.target.value)}
            />
            <TextField
              label="Ciudad"
              placeholder="Ej: CDMX"
              value={data.ciudad}
              onChange={(e) => update("ciudad", e.target.value)}
            />
            <TextField
              label="Fecha"
              type="date"
              value={data.fecha}
              onChange={(e) => update("fecha", e.target.value)}
            />
          </div>
        </>
      ),
    },
  ];

  return (
    <SplitGeneratorLayout
      titulo="Recibo de Pago, Honorarios o Renta"
      subtitulo="Comprobante sencillo con folio y cantidad automática en letra listo para entregar o enviar."
      filename={`recibo-${data.folio || "pago"}.pdf`}
      steps={steps}
      buildPdf={() => buildReciboPdf(data)}
      onFillExample={() => setData(EXAMPLE_DATA)}
      onReset={() => setData(INITIAL_DATA)}
      depValue={data}
    />
  );
}
