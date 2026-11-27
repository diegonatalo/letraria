import Link from "next/link";
import { CTA_PRIMARY } from "@/components/landing/hero";
import { RAMP } from "@/lib/ascii";
import { SHAPES, spellCount } from "@/lib/landing";
import { WORKS } from "@/lib/works";

/** Chamada final, antes do rodapé. */
export const FinalCta = () => (
  <section
    aria-labelledby="titulo-final"
    className="mx-auto flex max-w-7xl flex-col items-center gap-8 px-5 py-28 text-center sm:px-8 lg:px-12 lg:py-52"
  >
    <p aria-hidden className="font-mono text-xs tracking-[0.3em] text-gold sm:text-sm sm:tracking-[0.5em]">
      {[...RAMP].join(" ")}
    </p>
    <h2
      id="titulo-final"
      className="font-display text-[clamp(3.25rem,9vw,8.75rem)] leading-[0.92] font-light tracking-[-0.035em] text-paper"
    >
      A galeria
      <br />
      <em className="text-gold">está aberta.</em>
    </h2>
    <p className="max-w-[36ch] font-display text-lg leading-normal text-slate-300 lg:text-[1.375rem]">
      {spellCount(WORKS.length, true)} pinturas e {spellCount(SHAPES.length)} formas esperando você,
      letra por letra.
    </p>
    <Link href="/app" className={`${CTA_PRIMARY} min-h-15 px-9 text-base`}>
      Abrir o app <span aria-hidden>→</span>
    </Link>
  </section>
);
