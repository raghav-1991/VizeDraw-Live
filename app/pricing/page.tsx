import PageHeader from "@/components/PageHeader";
import PricingSection from "@/components/PricingSection";
import FAQ from "@/components/FAQ";
import CTA from "@/components/CTA";
import { pricingFaq } from "@/lib/content";

export const metadata = {
  title: "Pricing — VizeDraw",
  description:
    "Simple annual plans for teams and enterprises: Free, Starter, Pro, and Enterprise. Includes AI credits, storage add-ons, and India pricing.",
};

export default function PricingPage() {
  return (
    <>
      <PageHeader
        banner="pricing"
        eyebrow="Pricing"
        title="Plans that scale with your drawing workflow"
        lede="All plans are billed annually for simple, predictable pricing. Switch between individual and team, and view pricing in USD or INR."
      />
      <PricingSection />
      <FAQ items={pricingFaq} eyebrow="Pricing FAQ" title="Billing & plans" />
      <CTA />
    </>
  );
}
