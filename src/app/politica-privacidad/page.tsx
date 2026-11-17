import type { Metadata } from "next";
import { getGeneratorBySlug } from "@/lib/catalog";
import PoliticaPrivacidadGenerator from "@/components/generators/PoliticaPrivacidadGenerator";
import SeoGuideSection from "@/components/SeoGuideSection";
import ProximamenteBanner from "@/components/ProximamenteBanner";

const info = getGeneratorBySlug("politica-privacidad");

export const metadata: Metadata = {
  title: info.seoTitle,
  description: info.seoDescription,
  alternates: { canonical: "/politica-privacidad/" },
};

export default function PoliticaPrivacidadPage() {
  return (
    <div className="pb-12">
      <PoliticaPrivacidadGenerator />
      <SeoGuideSection info={info} />
      <ProximamenteBanner />
    </div>
  );
}
