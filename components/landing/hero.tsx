import Link from "next/link";
import { AsciiPainting } from "@/components/ascii-painting";
import { Framed } from "@/components/landing/framed";
import { EYEBROW, RULE } from "@/components/landing/section-heading";
import { RAMP } from "@/lib/ascii";
import { HERO, HERO_PLACE, HERO_SLUG, HERO_TOUR, SHAPES, THUMB_ASPECT } from "@/lib/landing";
import { WORKS, getWork, workThumb } from "@/lib/works";

export const CTA_PRIMARY =
  "inline-flex min-h-14 items-center gap-3 bg-gold px-7 font-mono text-[15px] font-bold tracking-wide text-[#120d03] transition duration-300 hover:-translate-y-0.5 hover:bg-gold-light";

/** Topo da landing: título, chamada e a obra principal em visita guiada. */
export const Hero = () => {
  const work = getWork(HERO_SLUG)!;
  return (
    <section aria-labelledby="titulo" className="mx-auto max-w-7xl px-5 pt-8 pb-20 sm:px-8 sm:pt-14 lg:px-12 lg:pb-36">
      <div className={`flex flex-wrap justify-between gap-4 border-b pb-4 text-stone ${RULE} ${EYEBROW}`}>
        <span>{HERO.eyebrow}</span>
        <span>{HERO.room}</span>
      </div>
      <h1
        id="titulo"
        className="mt-8 font-display text-[clamp(3.4rem,10.2vw,10.25rem)] leading-[0.9] font-light tracking-[-0.035em] text-paper lg:mt-12"
      >
        {HERO.title}
        <br />
        <em className="text-gold">{HERO.titleAccent}</em>
      </h1>

      <div className="mt-10 flex flex-wrap items-end gap-10 lg:mt-16 lg:gap-16">
        <div className="flex min-w-0 flex-[1_1_20rem] flex-col gap-8 pb-2">
          <p className="max-w-[30ch] font-display text-xl leading-relaxed text-slate-300 lg:text-2xl">{HERO.subtitle}</p>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
            <Link href="/app" className={CTA_PRIMARY}>
              Abrir o app <span aria-hidden>→</span>
            </Link>
            <a href="#como-funciona" className="inline-flex min-h-11 items-center border-b border-paper/35 font-mono text-sm text-paper transition hover:border-gold hover:text-gold-light">
              Como funciona
            </a>
          </div>
          <ul className={`flex flex-wrap gap-x-7 gap-y-2 border-t pt-5 font-mono text-xs tracking-wide text-stone ${RULE}`}>
            <li>
              <span className="text-gold">{WORKS.length}</span> pinturas em domínio público
            </li>
            <li>
              <span className="text-gold">{SHAPES.length}</span> formas desenhadas
            </li>
            <li>Sem cadastro</li>
          </ul>
        </div>

        <figure className="flex min-w-0 flex-[2_1_35rem] flex-col gap-4">
          <Framed corners className="p-2.5 sm:p-4">
            <AsciiPainting
              src={workThumb(work)}
              glyph={10}
              tour={HERO_TOUR}
              className="block w-full"
              aspect={THUMB_ASPECT[HERO_SLUG]}
            />
          </Framed>
          <figcaption className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <p className="font-display text-[1.375rem] italic text-paper">{work.title}</p>
              <p className="mt-1.5 font-mono text-xs tracking-wide text-stone">
                {work.artist} · {work.year} · {HERO_PLACE}
              </p>
            </div>
            <p className="border border-gold/30 px-2.5 py-1.5 font-mono text-[11px] tracking-[0.12em] text-gold uppercase">
              {RAMP.length} caracteres · cor original
            </p>
          </figcaption>
        </figure>
      </div>
    </section>
  );
};
