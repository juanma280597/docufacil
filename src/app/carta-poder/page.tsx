import type { Metadata } from "next";
import { getGeneratorBySlug } from "@/lib/catalog";
import CartaPoderGenerator from "@/components/generators/CartaPoderGenerator";
import SeoGuideSection from "@/components/SeoGuideSection";
import ProximamenteBanner from "@/components/ProximamenteBanner";

const info = getGeneratorBySlug("carta-poder");

export const metadata: Metadata = {
  title: info.seoTitle,
  description: info.seoDescription,
  alternates: { canonical: "/carta-poder/" },
};

export default function CartaPoderPage() {
  return (
    <div className="pb-12">
      <CartaPoderGenerator />
      <SeoGuideSection info={info} />
      <ProximamenteBanner />
    </div>
  );
}
