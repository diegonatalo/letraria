import { CollectionSection } from "@/components/landing/collection-section";
import { FaqSection } from "@/components/landing/faq-section";
import { FinalCta } from "@/components/landing/final-cta";
import { Hero } from "@/components/landing/hero";
import { LandingHeader } from "@/components/landing/landing-header";
import { RampSection } from "@/components/landing/ramp-section";
import { SheetSection } from "@/components/landing/sheet-section";
import { StepsSection } from "@/components/landing/steps-section";
import { SiteFooter } from "@/components/site-footer";
import { SITE_DESCRIPTION, SOURCE_URL } from "@/lib/site";

/** Página inicial: apresenta a Letraria como uma galeria e leva ao app (`/app`). */
export const LandingPage = () => (
  <div className="flex min-h-screen flex-col overflow-x-clip bg-night text-paper">
    <LandingHeader />
    <main id="conteudo" className="flex-1">
      <Hero />
      <RampSection />
      <StepsSection />
      <CollectionSection />
      <SheetSection />
      <FaqSection />
      <FinalCta />
    </main>
    <div className="border-t border-gold/15 text-stone">
      <p className="mx-auto max-w-7xl px-5 pt-8 text-center font-mono text-[13px] sm:px-8 lg:px-12">
        <span className="font-display text-xl text-paper italic">Letraria</span> · {SITE_DESCRIPTION}
      </p>
      <div className="[&_footer]:border-t-0">
        <SiteFooter sourceUrl={SOURCE_URL} authorUrl="https://diegonatalo.dev" />
      </div>
    </div>
  </div>
);
