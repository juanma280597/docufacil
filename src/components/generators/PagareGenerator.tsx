"use client";

import { useState } from "react";
import SplitGeneratorLayout, { WizardStep } from "@/components/SplitGeneratorLayout";
import { CheckboxField, SelectField, TextField } from "@/components/FormField";
import { buildPagarePdf, PagareData } from "@/lib/documentBuilders";
import { MONEDAS, MonedaCodigo, numeroALetras } from "@/lib/numeroALetras";
import { enUnMesLocal, hoyLocal } from "@/lib/date";

const INITIAL_DATA: PagareData = {
  numeroPagare: "1 / 1",
  moneda: "MXN",
  monto: "",
  lugarSuscripcion: "",
  fechaSuscripcion: hoyLocal(),
  lugarPago: "",
  fechaVencimiento: enUnMesLocal(),
  beneficiarioNombre: "",
  deudorNombre: "",
  deudorDomicilio: "",
  deudorTelefono: "",
  interesMoratorio: "5",
  incluirAval: false,
  avalNombre: "",
  avalDomicilio: "",
};

const EXAMPLE_DATA: PagareData = {
  numeroPagare: "1 / 1",
  moneda: "MXN",
  monto: "15000",
  lugarSuscripcion: "Guadalajara, Jalisco",
  fechaSuscripcion: hoyLocal(),
  lugarPago: "Guadalajara, Jalisco",
  fechaVencimiento: enUnMesLocal(),
  beneficiarioNombre: "Alejandro Morales Vega",
  deudorNombre: "Luis Enrique Castro Navarro",
  deudorDomicilio: "Av. Vallarta 1420, Col. Americana, Guadalajara, Jal.",
  deudorTelefono: "33 1234 5678",
  interesMoratorio: "5",
  incluirAval: true,
  avalNombre: "Patricia Navarro Gómez",
  avalDomicilio: "Calle Hidalgo 500, Zapopan, Jal.",
};

export default function PagareGenerator() {
  const [data, setData] = useState<PagareData>(INITIAL_DATA);

  const update = <K extends keyof PagareData>(key: K, val: PagareData[K]) => {
    setData((prev) => ({ ...prev, [key]: val }));
  };

  const montoEnLetra =
    parseFloat(data.monto) > 0
      ? numeroALetras(data.monto, data.moneda)
      : "Escribe un monto para verlo en letra automáticamente";

  const steps: WizardStep[] = [
    {
      id: "monto-fechas",
      titulo: "Monto y Fechas",
      descripcion: "Escribe la cantidad del préstamo o deuda y cuándo se debe pagar.",
      content: (
        <>
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
              label="Número de pagaré"
              placeholder="1 / 1"
              value={data.numeroPagare}
              onChange={(e) => update("numeroPagare", e.target.value)}
            />
          </div>
          <TextField
            label="Cantidad (solo número)"
            type="number"
            placeholder="Ej: 15000"
            helper={`En letra: ${montoEnLetra}`}
            value={data.monto}
            onChange={(e) => update("monto", e.target.value)}
          />
          <div className="grid gap-4 sm:grid-cols-2">
            <TextField
              label="Fecha en que se firma"
              type="date"
              value={data.fechaSuscripcion}
              onChange={(e) => update("fechaSuscripcion", e.target.value)}
            />
            <TextField
              label="Fecha límite de pago (Vencimiento)"
              type="date"
              value={data.fechaVencimiento}
              onChange={(e) => update("fechaVencimiento", e.target.value)}
            />
          </div>
          <TextField
            label="Interés moratorio mensual (%)"
            type="number"
            placeholder="5"
            helper="Porcentaje mensual que aplica solo si se atrasa después de la fecha límite."
            value={data.interesMoratorio}
            onChange={(e) => update("interesMoratorio", e.target.value)}
          />
        </>
      ),
    },
    {
      id: "partes",
      titulo: "Acreedor y Deudor",
      descripcion: "Indica a quién se le debe pagar y quién firma la deuda.",
      content: (
        <>
          <TextField
            label="Nombre de quien recibe el pago (Beneficiario)"
            placeholder="Ej: Alejandro Morales Vega"
            value={data.beneficiarioNombre}
            onChange={(e) => update("beneficiarioNombre", e.target.value)}
          />
          <TextField
            label="Ciudad donde se firma y se paga"
            placeholder="Ej: Guadalajara, Jalisco"
            value={data.lugarSuscripcion}
            onChange={(e) => {
              update("lugarSuscripcion", e.target.value);
              update("lugarPago", e.target.value);
            }}
          />
          <TextField
            label="Nombre completo del Deudor (Quien debe)"
            placeholder="Ej: Luis Enrique Castro Navarro"
            value={data.deudorNombre}
            onChange={(e) => update("deudorNombre", e.target.value)}
          />
          <TextField
            label="Domicilio del Deudor"
            placeholder="Ej: Av. Vallarta 1420, Guadalajara"
            value={data.deudorDomicilio}
            onChange={(e) => update("deudorDomicilio", e.target.value)}
          />
          <TextField
            label="Teléfono del Deudor (Opcional)"
            placeholder="Ej: 33 1234 5678"
            value={data.deudorTelefono}
            onChange={(e) => update("deudorTelefono", e.target.value)}
          />
        </>
      ),
    },
    {
      id: "aval",
      titulo: "Aval (Opcional)",
      descripcion: "Si hay otra persona que respalde la deuda como aval, agrégala aquí.",
      content: (
        <>
          <CheckboxField
            label="Incluir espacio para Aval"
            description="El aval se compromete a pagar si el deudor principal no cumple."
            checked={data.incluirAval}
            onChange={(val) => update("incluirAval", val)}
          />
          {data.incluirAval && (
            <>
              <TextField
                label="Nombre completo del Aval"
                placeholder="Ej: Patricia Navarro Gómez"
                value={data.avalNombre}
                onChange={(e) => update("avalNombre", e.target.value)}
              />
              <TextField
                label="Domicilio del Aval"
                placeholder="Ej: Calle Hidalgo 500, Zapopan"
                value={data.avalDomicilio}
                onChange={(e) => update("avalDomicilio", e.target.value)}
              />
            </>
          )}
        </>
      ),
    },
  ];

  return (
    <SplitGeneratorLayout
      titulo="Generador de Pagaré PDF"
      subtitulo="Respalda un préstamo o venta a plazos con cantidad automática en número y letra."
      filename="pagare.pdf"
      steps={steps}
      buildPdf={() => buildPagarePdf(data)}
      onFillExample={() => setData(EXAMPLE_DATA)}
      onReset={() => setData(INITIAL_DATA)}
      depValue={data}
    />
  );
}
