"use client";

import { useEffect } from "react";

interface AdSlotProps {
  slotId?: string;
  format?: "auto" | "horizontal" | "rectangle";
  className?: string;
}

export default function AdSlot({
  slotId = "",
  format = "horizontal",
  className = "",
}: AdSlotProps) {
  const adsenseClient = process.env.NEXT_PUBLIC_ADSENSE_CLIENT;

  useEffect(() => {
    if (!adsenseClient || !slotId) return;
    try {
      const w = window as unknown as { adsbygoogle?: unknown[] };
      w.adsbygoogle = w.adsbygoogle || [];
      w.adsbygoogle.push({});
    } catch {
      // Silenciar errores si bloqueador de anuncios está activo
    }
  }, [adsenseClient, slotId]);

  if (!adsenseClient || !slotId) {
    return (
      <div
        aria-hidden="true"
        className={`flex min-h-[76px] items-center justify-center rounded-xl border border-dashed border-slate-300 bg-slate-100/70 px-4 py-3 text-center text-xs text-slate-400 ${className}`}
      >
        Espacio reservado para anuncio (Google AdSense)
      </div>
    );
  }

  return (
    <div className={`overflow-hidden text-center ${className}`}>
      <ins
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client={adsenseClient}
        data-ad-slot={slotId}
        data-ad-format={format}
        data-full-width-responsive="true"
      />
    </div>
  );
}
