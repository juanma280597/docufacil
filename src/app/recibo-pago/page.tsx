import type { Metadata } from "next";
import { getGeneratorBySlug } from "@/lib/catalog";
import ReciboPagoGenerator from "@/components/generators/ReciboPagoGenerator";
import SeoGuideSection from "@/components/SeoGuideSection";
import ProximamenteBanner from "@/components/ProximamenteBanner";

const info = getGeneratorBySlug("recibo-pago");

export const metadata: Metadata = {
  title: info.seoTitle,
  description: info.seoDescription,
  alternates: { canonical: "/recibo-pago/" },
};

export default function ReciboPagoPage() {
  return (
    <div className="pb-12">
      <ReciboPagoGenerator />
      <SeoGuideSection info={info} />
      <ProximamenteBanner />
    </div>
  );
}
