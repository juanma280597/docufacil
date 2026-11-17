import type { Metadata } from "next";
import { getGeneratorBySlug } from "@/lib/catalog";
import PagareGenerator from "@/components/generators/PagareGenerator";
import SeoGuideSection from "@/components/SeoGuideSection";
import ProximamenteBanner from "@/components/ProximamenteBanner";

const info = getGeneratorBySlug("pagare");

export const metadata: Metadata = {
  title: info.seoTitle,
  description: info.seoDescription,
  alternates: { canonical: "/pagare/" },
};

export default function PagarePage() {
  return (
    <div className="pb-12">
      <PagareGenerator />
      <SeoGuideSection info={info} />
      <ProximamenteBanner />
    </div>
  );
}
