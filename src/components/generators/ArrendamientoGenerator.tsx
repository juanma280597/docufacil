"use client";

import { useState } from "react";
import SplitGeneratorLayout, { WizardStep } from "@/components/SplitGeneratorLayout";
import { CheckboxField, SelectField, TextField } from "@/components/FormField";
import { ArrendamientoData, buildArrendamientoPdf } from "@/lib/documentBuilders";
import { MONEDAS, MonedaCodigo } from "@/lib/numeroALetras";
import { hoyLocal } from "@/lib/date";

const INITIAL_DATA: ArrendamientoData = {
  pais: "México",
  ciudadEstado: "",
  fechaFirma: hoyLocal(),
  arrendadorNombre: "",
  arrendadorId: "",
  arrendadorDomicilio: "",
  arrendatarioNombre: "",
  arrendatarioId: "",
  inmuebleDireccion: "",
  tipoInmueble: "Casa Habitación",
  usoInmueble: "uso habitacional",
  moneda: "MXN",
  rentaMensual: "",
  depositoGarantia: "",
  diaPago: "5",
  fechaInicio: hoyLocal(),
  duracionMeses: "12",
  serviciosIncluidos: "",
  permiteMascotas: false,
};

const EXAMPLE_DATA: ArrendamientoData = {
  pais: "México",
  ciudadEstado: "Monterrey, Nuevo León",
  fechaFirma: hoyLocal(),
  arrendadorNombre: "Roberto Carlos Garza Treviño",
  arrendadorId: "INE 4455667788990",
  arrendadorDomicilio: "Av. Constitución 1200, Monterrey, N.L.",
  arrendatarioNombre: "Sofía Alejandra Mendoza Ríos",
  arrendatarioId: "INE 1122334455667",
  inmuebleDireccion: "Calle Nogal 34, Depto 4B, Col. Del Valle, San Pedro Garza García, N.L.",
  tipoInmueble: "Departamento",
  usoInmueble: "uso habitacional",
  moneda: "MXN",
  rentaMensual: "8500",
  depositoGarantia: "8500",
  diaPago: "5",
  fechaInicio: hoyLocal(),
  duracionMeses: "12",
  serviciosIncluidos: "Agua y mantenimiento básico",
  permiteMascotas: false,
};

export default function ArrendamientoGenerator() {
  const [data, setData] = useState<ArrendamientoData>(INITIAL_DATA);

  const update = <K extends keyof ArrendamientoData>(
    key: K,
    val: ArrendamientoData[K]
  ) => {
    setData((prev) => ({ ...prev, [key]: val }));
  };

  const steps: WizardStep[] = [
    {
      id: "partes",
      titulo: "Dueño e Inquilino",
      descripcion: "Indica quién renta la propiedad (Arrendador) y quién la va a habitar (Arrendatario).",
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
              <option value="Latinoamérica">Otro país</option>
            </SelectField>
            <TextField
              label="Ciudad y Estado"
              placeholder="Ej: Monterrey, Nuevo León"
              value={data.ciudadEstado}
              onChange={(e) => update("ciudadEstado", e.target.value)}
            />
          </div>
          <TextField
            label="Nombre del Dueño (Arrendador)"
            placeholder="Ej: Roberto Garza Treviño"
            value={data.arrendadorNombre}
            onChange={(e) => update("arrendadorNombre", e.target.value)}
          />
          <TextField
            label="Identificación del Dueño (Opcional)"
            placeholder="Ej: INE / Cédula / DNI"
            value={data.arrendadorId}
            onChange={(e) => update("arrendadorId", e.target.value)}
          />
          <TextField
            label="Domicilio del Dueño (Opcional)"
            placeholder="Ej: Av. Constitución 1200, Monterrey, N.L."
            value={data.arrendadorDomicilio}
            onChange={(e) => update("arrendadorDomicilio", e.target.value)}
          />
          <TextField
            label="Nombre del Inquilino (Arrendatario)"
            placeholder="Ej: Sofía Mendoza Ríos"
            value={data.arrendatarioNombre}
            onChange={(e) => update("arrendatarioNombre", e.target.value)}
          />
          <TextField
            label="Identificación del Inquilino (Opcional)"
            placeholder="Ej: INE / Cédula / DNI"
            value={data.arrendatarioId}
            onChange={(e) => update("arrendatarioId", e.target.value)}
          />
        </>
      ),
    },
    {
      id: "inmueble-renta",
      titulo: "Propiedad y Monto de Renta",
      descripcion: "Escribe la dirección del inmueble, el costo mensual y el depósito.",
      content: (
        <>
          <TextField
            label="Dirección completa del inmueble que se renta"
            placeholder="Ej: Calle Nogal 34, Depto 4B, Col. Del Valle"
            value={data.inmuebleDireccion}
            onChange={(e) => update("inmuebleDireccion", e.target.value)}
          />
          <div className="grid gap-4 sm:grid-cols-2">
            <SelectField
              label="Tipo de inmueble"
              value={data.tipoInmueble}
              onChange={(e) => {
                const tipo = e.target.value;
                setData((prev) => ({
                  ...prev,
                  tipoInmueble: tipo,
                  usoInmueble:
                    tipo === "Local Comercial" ? "uso comercial" : "uso habitacional",
                }));
              }}
            >
              <option value="Casa Habitación">Casa Habitación</option>
              <option value="Departamento">Departamento</option>
              <option value="Cuarto / Estudio">Cuarto / Estudio</option>
              <option value="Local Comercial">Local Comercial</option>
            </SelectField>
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
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <TextField
              label="Renta mensual (solo número)"
              type="number"
              placeholder="Ej: 8500"
              value={data.rentaMensual}
              onChange={(e) => update("rentaMensual", e.target.value)}
            />
            <TextField
              label="Depósito en garantía"
              type="number"
              placeholder="Ej: 8500"
              value={data.depositoGarantia}
              onChange={(e) => update("depositoGarantia", e.target.value)}
            />
          </div>
        </>
      ),
    },
    {
      id: "plazo-reglas",
      titulo: "Duración y Reglas",
      descripcion: "Define cuándo inicia el contrato, por cuántos meses y si se permiten mascotas.",
      content: (
        <>
          <div className="grid gap-4 sm:grid-cols-3">
            <TextField
              label="Fecha de inicio"
              type="date"
              value={data.fechaInicio}
              onChange={(e) => update("fechaInicio", e.target.value)}
            />
            <TextField
              label="Duración (meses)"
              type="number"
              placeholder="12"
              value={data.duracionMeses}
              onChange={(e) => update("duracionMeses", e.target.value)}
            />
            <TextField
              label="Día límite de pago"
              type="number"
              placeholder="5"
              value={data.diaPago}
              onChange={(e) => update("diaPago", e.target.value)}
            />
          </div>
          <TextField
            label="Servicios incluidos en la renta (Opcional)"
            placeholder="Ej: Agua e internet incluidos (dejar vacío si el inquilino paga todo)"
            value={data.serviciosIncluidos}
            onChange={(e) => update("serviciosIncluidos", e.target.value)}
          />
          <CheckboxField
            label="Se permiten mascotas"
            description="Si lo dejas desmarcado, el contrato indicará que no se permiten mascotas sin permiso escrito."
            checked={data.permiteMascotas}
            onChange={(val) => update("permiteMascotas", val)}
          />
          <TextField
            label="Fecha de firma del contrato"
            type="date"
            value={data.fechaFirma}
            onChange={(e) => update("fechaFirma", e.target.value)}
          />
        </>
      ),
    },
  ];

  return (
    <SplitGeneratorLayout
      titulo="Contrato de Arrendamiento Básico"
      subtitulo="Genera un contrato claro para rentar casa, departamento o cuarto con depósito en garantía."
      filename="contrato-arrendamiento.pdf"
      steps={steps}
      buildPdf={() => buildArrendamientoPdf(data)}
      onFillExample={() => setData(EXAMPLE_DATA)}
      onReset={() => setData(INITIAL_DATA)}
      depValue={data}
    />
  );
}
