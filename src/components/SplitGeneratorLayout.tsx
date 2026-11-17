"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import type { TDocumentDefinitions } from "pdfmake/interfaces";
import {
  ArrowLeft,
  ArrowRight,
  Download,
  Eye,
  FileEdit,
  Loader2,
  Printer,
  RotateCcw,
  Sparkles,
} from "lucide-react";
import { downloadPdf, generatePdfBlobUrl, printPdf } from "@/lib/pdf";
import AdSlot from "./AdSlot";

export interface WizardStep {
  id: string;
  titulo: string;
  descripcion: string;
  content: React.ReactNode;
}

interface SplitGeneratorLayoutProps {
  titulo: string;
  subtitulo: string;
  filename: string;
  steps: WizardStep[];
  buildPdf: () => TDocumentDefinitions;
  onFillExample: () => void;
  onReset: () => void;
  extraActions?: React.ReactNode;
  depValue: unknown;
}

export default function SplitGeneratorLayout({
  titulo,
  subtitulo,
  filename,
  steps,
  buildPdf,
  onFillExample,
  onReset,
  extraActions,
  depValue,
}: SplitGeneratorLayoutProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [mobileTab, setMobileTab] = useState<"form" | "preview">("form");
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [pdfError, setPdfError] = useState<string | null>(null);
  const activeUrlRef = useRef<string | null>(null);

  useEffect(() => {
    return () => {
      if (activeUrlRef.current) {
        URL.revokeObjectURL(activeUrlRef.current);
        activeUrlRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    let cancelled = false;

    const timer = setTimeout(async () => {
      setIsGenerating(true);
      setPdfError(null);
      try {
        const def = buildPdf();
        const url = await generatePdfBlobUrl(def);
        if (cancelled) {
          URL.revokeObjectURL(url);
          return;
        }
        if (activeUrlRef.current) {
          URL.revokeObjectURL(activeUrlRef.current);
        }
        activeUrlRef.current = url;
        setPdfUrl(url);
      } catch (err) {
        if (!cancelled) {
          console.error(err);
          setPdfError("No se pudo generar la vista previa. Intenta descargar el PDF directamente.");
        }
      } finally {
        if (!cancelled) {
          setIsGenerating(false);
        }
      }
    }, 350);

    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [depValue]);

  const handleDownload = async () => {
    setPdfError(null);
    try {
      const def = buildPdf();
      await downloadPdf(def, filename);
    } catch (err) {
      console.error(err);
      setPdfError("No se pudo descargar el PDF. Por favor intenta de nuevo.");
    }
  };

  const handlePrint = async () => {
    setPdfError(null);
    try {
      const def = buildPdf();
      await printPdf(def);
    } catch (err) {
      console.error(err);
      setPdfError(
        "No se pudo abrir la ventana de impresión. Verifica que tu navegador no esté bloqueando ventanas emergentes o usa Descargar PDF."
      );
    }
  };

  const isFirst = currentStep === 0;
  const isLast = currentStep === steps.length - 1;

  return (
    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-8">
      {/* Breadcrumb simple */}
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-teal-700 hover:text-teal-900"
        >
          <ArrowLeft className="h-4 w-4" />
          Volver al inicio
        </Link>

        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={onFillExample}
            className="inline-flex items-center gap-1.5 rounded-xl border border-teal-200 bg-teal-50 px-3.5 py-2 text-sm font-semibold text-teal-800 transition hover:bg-teal-100"
          >
            <Sparkles className="h-4 w-4" />
            Llenar con ejemplo
          </button>
          <button
            type="button"
            onClick={() => {
              onReset();
              setCurrentStep(0);
            }}
            className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
          >
            <RotateCcw className="h-4 w-4" />
            Limpiar
          </button>
        </div>
      </div>

      {/* Título principal */}
      <div className="mb-6">
        <h1 className="text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">
          {titulo}
        </h1>
        <p className="mt-1.5 text-base text-slate-600">{subtitulo}</p>
      </div>

      {/* Anuncio superior discreto */}
      <AdSlot className="mb-6" />

      {/* Pestañas grandes para móvil */}
      <div className="mb-5 grid grid-cols-2 gap-2 rounded-2xl bg-slate-200/80 p-1.5 lg:hidden">
        <button
          type="button"
          onClick={() => setMobileTab("form")}
          className={`flex items-center justify-center gap-2 rounded-xl py-3 text-sm font-bold transition ${
            mobileTab === "form"
              ? "bg-white text-teal-800 shadow-sm"
              : "text-slate-600"
          }`}
        >
          <FileEdit className="h-4 w-4" />
          1. Llenar datos
        </button>
        <button
          type="button"
          onClick={() => setMobileTab("preview")}
          className={`flex items-center justify-center gap-2 rounded-xl py-3 text-sm font-bold transition ${
            mobileTab === "preview"
              ? "bg-white text-teal-800 shadow-sm"
              : "text-slate-600"
          }`}
        >
          <Eye className="h-4 w-4" />
          2. Ver documento
        </button>
      </div>

      {/* Pantalla dividida */}
      <div className="grid gap-6 lg:grid-cols-12 lg:items-start">
        {/* Columna izquierda: Asistente paso a paso */}
        <div
          className={`lg:col-span-5 ${
            mobileTab === "form" ? "block" : "hidden lg:block"
          }`}
        >
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
            {/* Indicador de pasos */}
            <div className="mb-6">
              <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-teal-700">
                <span>
                  Paso {currentStep + 1} de {steps.length}
                </span>
                <span>{Math.round(((currentStep + 1) / steps.length) * 100)}% completado</span>
              </div>

              <div className="mt-2 h-2.5 w-full overflow-hidden rounded-full bg-slate-100">
                <div
                  className="h-full rounded-full bg-teal-600 transition-all duration-300"
                  style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
                />
              </div>

              <div className="mt-4 flex gap-2 overflow-x-auto pb-1">
                {steps.map((step, idx) => (
                  <button
                    key={step.id}
                    type="button"
                    onClick={() => setCurrentStep(idx)}
                    className={`flex shrink-0 items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-semibold transition ${
                      idx === currentStep
                        ? "bg-teal-700 text-white"
                        : idx < currentStep
                        ? "bg-teal-50 text-teal-800"
                        : "bg-slate-100 text-slate-500"
                    }`}
                  >
                    <span>{idx + 1}.</span>
                    <span>{step.titulo}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Contenido del paso actual */}
            <div>
              <h2 className="text-lg font-bold text-slate-900">
                {steps[currentStep].titulo}
              </h2>
              <p className="mt-1 text-sm text-slate-600">
                {steps[currentStep].descripcion}
              </p>

              <div className="mt-5 space-y-4">{steps[currentStep].content}</div>
            </div>

            {/* Botones de navegación del paso */}
            <div className="mt-8 flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 pt-5">
              <button
                type="button"
                disabled={isFirst}
                onClick={() => setCurrentStep((s) => Math.max(0, s - 1))}
                className="inline-flex min-h-[46px] items-center gap-2 rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm font-bold text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
              >
                <ArrowLeft className="h-4 w-4" />
                Atrás
              </button>

              {!isLast ? (
                <button
                  type="button"
                  onClick={() => setCurrentStep((s) => Math.min(steps.length - 1, s + 1))}
                  className="inline-flex min-h-[46px] items-center gap-2 rounded-xl bg-teal-700 px-6 py-2.5 text-sm font-bold text-white shadow-sm transition hover:bg-teal-800"
                >
                  Siguiente
                  <ArrowRight className="h-4 w-4" />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleDownload}
                  className="inline-flex min-h-[46px] items-center gap-2 rounded-xl bg-emerald-600 px-6 py-2.5 text-sm font-bold text-white shadow-sm transition hover:bg-emerald-700"
                >
                  <Download className="h-4 w-4" />
                  Descargar PDF Gratis
                </button>
              )}
            </div>
          </div>

          {extraActions && <div className="mt-4">{extraActions}</div>}
        </div>

        {/* Columna derecha: Vista previa en vivo */}
        <div
          className={`lg:col-span-7 ${
            mobileTab === "preview" ? "block" : "hidden lg:block"
          }`}
        >
          <div className="sticky top-20 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 bg-slate-900 px-4 py-3 text-white">
              <div className="flex items-center gap-2">
                <Eye className="h-4 w-4 text-teal-400" />
                <span className="text-sm font-bold">Vista previa en vivo</span>
                {isGenerating && (
                  <span className="inline-flex items-center gap-1 text-xs text-slate-300">
                    <Loader2 className="h-3.5 w-3.5 animate-spin" />
                    Actualizando...
                  </span>
                )}
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handlePrint}
                  className="inline-flex items-center gap-1.5 rounded-lg bg-slate-700 px-3 py-1.5 text-xs font-bold text-white transition hover:bg-slate-600"
                >
                  <Printer className="h-3.5 w-3.5" />
                  Imprimir
                </button>
                <button
                  type="button"
                  onClick={handleDownload}
                  className="inline-flex items-center gap-1.5 rounded-lg bg-emerald-600 px-3.5 py-1.5 text-xs font-bold text-white transition hover:bg-emerald-500"
                >
                  <Download className="h-3.5 w-3.5" />
                  Descargar PDF
                </button>
              </div>
            </div>

            <div className="relative h-[min(640px,calc(100vh-12rem))] min-h-[420px] w-full bg-slate-100">
              {pdfError ? (
                <div className="flex h-full flex-col items-center justify-center p-6 text-center">
                  <p className="text-sm text-slate-600">{pdfError}</p>
                  <button
                    type="button"
                    onClick={handleDownload}
                    className="mt-4 inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-5 py-3 text-sm font-bold text-white"
                  >
                    <Download className="h-4 w-4" />
                    Descargar PDF ahora
                  </button>
                </div>
              ) : pdfUrl ? (
                <iframe
                  title={`Vista previa de ${titulo}`}
                  src={`${pdfUrl}#toolbar=0&navpanes=0`}
                  className="h-full w-full border-0"
                />
              ) : (
                <div className="flex h-full items-center justify-center text-sm text-slate-500">
                  <Loader2 className="mr-2 h-5 w-5 animate-spin text-teal-700" />
                  Preparando documento...
                </div>
              )}
            </div>

            <div className="border-t border-slate-200 bg-slate-50 px-4 py-2.5 text-center text-xs text-slate-500">
              ¿No ves la vista previa en tu celular? Usa el botón verde{" "}
              <strong>Descargar PDF</strong> de arriba para abrirlo directo.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
