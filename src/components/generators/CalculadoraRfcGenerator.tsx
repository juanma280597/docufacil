"use client";

import { useMemo, useState } from "react";
import { CheckCircle2, Copy } from "lucide-react";
import SplitGeneratorLayout, { WizardStep } from "@/components/SplitGeneratorLayout";
import { CheckboxField, SelectField, TextField } from "@/components/FormField";
import { buildFichaRfcPdf, FichaRfcData } from "@/lib/documentBuilders";
import { calcularRFC } from "@/lib/rfc";

const hoy = () => new Date().toISOString().split("T")[0];

interface RfcFormState {
  nombre: string;
  apellidoPaterno: string;
  apellidoMaterno: string;
  fechaNacimiento: string;
  usarHomoclaveManual: boolean;
  homoclaveManual: string;
  curp: string;
  domicilio: string;
  telefono: string;
  correo: string;
  regimenSugerido: string;
  fechaEmision: string;
}

const INITIAL_STATE: RfcFormState = {
  nombre: "",
  apellidoPaterno: "",
  apellidoMaterno: "",
  fechaNacimiento: "",
  usarHomoclaveManual: false,
  homoclaveManual: "",
  curp: "",
  domicilio: "",
  telefono: "",
  correo: "",
  regimenSugerido: "Sueldos y Salarios e Ingresos Asimilados a Salarios",
  fechaEmision: hoy(),
};

const EXAMPLE_STATE: RfcFormState = {
  nombre: "Carlos Alberto",
  apellidoPaterno: "Hernández",
  apellidoMaterno: "Morales",
  fechaNacimiento: "1995-08-14",
  usarHomoclaveManual: false,
  homoclaveManual: "",
  curp: "HEMC950814HDFRRL09",
  domicilio: "Calle Benito Juárez 245, Col. Centro, Puebla, Pue.",
  telefono: "222 123 4567",
  correo: "carlos.hernandez@ejemplo.com",
  regimenSugerido: "Sueldos y Salarios e Ingresos Asimilados a Salarios",
  fechaEmision: hoy(),
};

export default function CalculadoraRfcGenerator() {
  const [state, setState] = useState<RfcFormState>(INITIAL_STATE);
  const [copied, setCopied] = useState(false);

  const update = <K extends keyof RfcFormState>(key: K, val: RfcFormState[K]) => {
    setState((prev) => ({ ...prev, [key]: val }));
  };

  const resultado = useMemo(() => {
    return calcularRFC({
      nombre: state.nombre,
      apellidoPaterno: state.apellidoPaterno,
      apellidoMaterno: state.apellidoMaterno,
      fechaNacimiento: state.fechaNacimiento,
    });
  }, [state.nombre, state.apellidoPaterno, state.apellidoMaterno, state.fechaNacimiento]);

  const rfcMostrado = useMemo(() => {
    if (!resultado.esValido) return "";
    if (state.usarHomoclaveManual && state.homoclaveManual.trim().length > 0) {
      return `${resultado.rfc10}${state.homoclaveManual.toUpperCase().trim()}`;
    }
    return resultado.rfcCompleto;
  }, [resultado, state.usarHomoclaveManual, state.homoclaveManual]);

  const copyRfc = async () => {
    if (!rfcMostrado) return;
    await navigator.clipboard.writeText(rfcMostrado);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const pdfData: FichaRfcData = {
    ...state,
    rfcCalculado: resultado.rfcCompleto,
  };

  const steps: WizardStep[] = [
    {
      id: "datos-basicos",
      titulo: "Tu nombre y fecha de nacimiento",
      descripcion:
        "Con estos datos calculamos automáticamente tu RFC con homoclave al instante.",
      content: (
        <>
          <TextField
            label="Nombre(s)"
            placeholder="Ej: Carlos Alberto"
            value={state.nombre}
            onChange={(e) => update("nombre", e.target.value)}
          />
          <div className="grid gap-4 sm:grid-cols-2">
            <TextField
              label="Apellido Paterno"
              placeholder="Ej: Hernández"
              value={state.apellidoPaterno}
              onChange={(e) => update("apellidoPaterno", e.target.value)}
            />
            <TextField
              label="Apellido Materno"
              placeholder="Ej: Morales (si no tienes, déjalo vacío)"
              value={state.apellidoMaterno}
              onChange={(e) => update("apellidoMaterno", e.target.value)}
            />
          </div>
          <TextField
            label="Fecha de nacimiento"
            type="date"
            value={state.fechaNacimiento}
            onChange={(e) => update("fechaNacimiento", e.target.value)}
          />

          {/* Resultado en vivo destacado */}
          <div className="rounded-2xl border-2 border-teal-600 bg-teal-50 p-4 text-center">
            <span className="block text-xs font-bold uppercase tracking-wider text-teal-800">
              Tu RFC Calculado
            </span>
            <div className="mt-1 flex items-center justify-center gap-3">
              <span className="font-mono text-2xl font-extrabold tracking-widest text-slate-900 sm:text-3xl">
                {rfcMostrado || "XXXX000000XXX"}
              </span>
              {rfcMostrado && (
                <button
                  type="button"
                  onClick={copyRfc}
                  className="inline-flex items-center gap-1 rounded-lg bg-white px-2.5 py-1.5 text-xs font-bold text-teal-800 shadow-sm hover:bg-teal-100"
                >
                  {copied ? (
                    <>
                      <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
                      Copiado
                    </>
                  ) : (
                    <>
                      <Copy className="h-3.5 w-3.5" />
                      Copiar
                    </>
                  )}
                </button>
              )}
            </div>
            <p className="mt-1.5 text-xs text-teal-800">
              {resultado.esValido
                ? "Puedes verlo en la Ficha Formal lista para imprimir a la derecha."
                : "Escribe tu nombre, apellido y fecha de nacimiento para calcularlo."}
            </p>
          </div>
        </>
      ),
    },
    {
      id: "datos-trabajo",
      titulo: "Datos para tu Ficha Laboral (RH)",
      descripcion:
        "Completa estos datos opcionales para que tu hoja impresa se vea completa y profesional al entregarla en un trabajo.",
      content: (
        <>
          <CheckboxField
            label="Ya conozco mi homoclave oficial del SAT"
            description="Activa esta casilla si quieres escribir manualmente los últimos 3 dígitos de tu constancia."
            checked={state.usarHomoclaveManual}
            onChange={(val) => update("usarHomoclaveManual", val)}
          />
          {state.usarHomoclaveManual && (
            <TextField
              label="Últimos 3 caracteres (Homoclave)"
              maxLength={3}
              placeholder="Ej: 9A2"
              value={state.homoclaveManual}
              onChange={(e) => update("homoclaveManual", e.target.value.toUpperCase())}
            />
          )}
          <TextField
            label="CURP (Opcional)"
            maxLength={18}
            placeholder="Ej: HEMC950814HDFRRL09"
            value={state.curp}
            onChange={(e) => update("curp", e.target.value.toUpperCase())}
          />
          <SelectField
            label="Régimen fiscal habitual"
            value={state.regimenSugerido}
            onChange={(e) => update("regimenSugerido", e.target.value)}
          >
            <option value="Sueldos y Salarios e Ingresos Asimilados a Salarios">
              Sueldos y Salarios (Empleado)
            </option>
            <option value="Régimen Simplificado de Confianza (RESICO)">
              Régimen Simplificado de Confianza (RESICO)
            </option>
            <option value="Personas Físicas con Actividades Empresariales y Profesionales">
              Actividad Empresarial / Honorarios
            </option>
            <option value="Sin obligaciones fiscales">Sin obligaciones fiscales</option>
          </SelectField>
          <TextField
            label="Domicilio completo (Opcional)"
            placeholder="Ej: Calle Benito Juárez 245, Col. Centro, Puebla"
            value={state.domicilio}
            onChange={(e) => update("domicilio", e.target.value)}
          />
          <div className="grid gap-4 sm:grid-cols-2">
            <TextField
              label="Teléfono (Opcional)"
              placeholder="Ej: 55 1234 5678"
              value={state.telefono}
              onChange={(e) => update("telefono", e.target.value)}
            />
            <TextField
              label="Correo electrónico (Opcional)"
              type="email"
              placeholder="Ej: correo@ejemplo.com"
              value={state.correo}
              onChange={(e) => update("correo", e.target.value)}
            />
          </div>
        </>
      ),
    },
  ];

  return (
    <SplitGeneratorLayout
      titulo="Calculadora de RFC y Ficha para Trabajo"
      subtitulo="Calcula tu RFC con homoclave e imprime una Ficha de Identificación Fiscal formal para entregar en Recursos Humanos."
      filename={`ficha-rfc-${rfcMostrado || "mexico"}.pdf`}
      steps={steps}
      buildPdf={() => buildFichaRfcPdf(pdfData)}
      onFillExample={() => setState(EXAMPLE_STATE)}
      onReset={() => setState(INITIAL_STATE)}
      depValue={{ state, rfcMostrado }}
    />
  );
}
