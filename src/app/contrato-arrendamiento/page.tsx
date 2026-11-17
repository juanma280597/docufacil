import type { Metadata } from "next";
import { getGeneratorBySlug } from "@/lib/catalog";
import ArrendamientoGenerator from "@/components/generators/ArrendamientoGenerator";
import SeoGuideSection from "@/components/SeoGuideSection";
import ProximamenteBanner from "@/components/ProximamenteBanner";

const info = getGeneratorBySlug("contrato-arrendamiento");

export const metadata: Metadata = {
  title: info.seoTitle,
  description: info.seoDescription,
  alternates: { canonical: "/contrato-arrendamiento/" },
};

export default function ContratoArrendamientoPage() {
  return (
    <div className="pb-12">
      <ArrendamientoGenerator />
      <SeoGuideSection info={info} />
      <ProximamenteBanner />
    </div>
  );
}
