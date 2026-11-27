import { SectionHeading } from "@/components/landing/section-heading";
import { STEPS } from "@/lib/landing";

const ROMAN = ["I.", "II.", "III."];

/** "Como funciona": os três passos, numerados como salas de museu. */
export const StepsSection = () => (
  <section id="como-funciona" aria-labelledby="titulo-como" className="mx-auto max-w-7xl scroll-mt-8 px-5 pt-24 sm:px-8 lg:px-12 lg:pt-40">
    <SectionHeading id="titulo-como" eyebrow="Como funciona" title="Três passos," accent="nenhum pincel." />
    <ol className="mt-12 flex flex-wrap gap-x-16 gap-y-12 lg:mt-20">
      {STEPS.map((step, i) => (
        <li key={step.title} className="flex min-w-0 flex-[1_1_17.5rem] flex-col gap-4 border-t border-gold/35 pt-7">
          <span aria-hidden className="font-display text-7xl leading-none font-light text-gold italic">
            {ROMAN[i]}
          </span>
          <h3 className="font-display text-[1.75rem] tracking-tight text-paper">{step.title}</h3>
          <p className="font-mono text-sm leading-7 text-slate-400">{step.text}</p>
        </li>
      ))}
    </ol>
  </section>
);
