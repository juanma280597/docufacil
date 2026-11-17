import type { Metadata } from "next";
import { getGeneratorBySlug } from "@/lib/catalog";
import CalculadoraRfcGenerator from "@/components/generators/CalculadoraRfcGenerator";
import SeoGuideSection from "@/components/SeoGuideSection";
import ProximamenteBanner from "@/components/ProximamenteBanner";

const info = getGeneratorBySlug("calculadora-rfc");

export const metadata: Metadata = {
  title: info.seoTitle,
  description: info.seoDescription,
  alternates: { canonical: "/calculadora-rfc/" },
};

export default function CalculadoraRfcPage() {
  return (
    <div className="pb-12">
      <CalculadoraRfcGenerator />
      <SeoGuideSection info={info} />
      <ProximamenteBanner />
    </div>
  );
}
