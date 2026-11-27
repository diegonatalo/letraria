import Link from "next/link";
import { AsciiPainting } from "@/components/ascii-painting";
import { SectionHeading } from "@/components/landing/section-heading";
import { HERO_SLUG, SHEET } from "@/lib/landing";
import { getWork, workThumb } from "@/lib/works";

/** Exemplo da ficha que acompanha cada obra, em forma de etiqueta de museu. */
export const SheetSection = () => {
  const work = getWork(HERO_SLUG)!;
  return (
    <section aria-labelledby="titulo-ficha" className="mx-auto max-w-7xl px-5 pt-24 sm:px-8 lg:px-12 lg:pt-40">
      <div className="flex flex-wrap items-center gap-12 lg:gap-24">
        <div className="flex min-w-0 flex-[1_1_22rem] flex-col gap-7">
          <SectionHeading id="titulo-ficha" eyebrow="Ficha da obra" title="Toda obra vem" accent="com a sua história." />
          <p className="max-w-[42ch] font-mono text-[15px] leading-7 text-slate-400">
            Enquanto as letras dançam, a ficha conta onde e quando o quadro nasceu, como costuma ser lido e uma curiosidade
            para levar da visita.
          </p>
          <Link
            href={`/app/${work.slug}`}
            className="inline-flex min-h-11 items-center gap-2.5 self-start border-b border-gold/45 font-mono text-sm text-gold transition hover:text-gold-light"
          >
            Ver {work.title} no app <span aria-hidden>→</span>
          </Link>
        </div>

        <article
          aria-label={`Ficha de exemplo: ${work.title}`}
          className="flex min-w-0 flex-[1.2_1_27rem] flex-wrap bg-paper text-[#1b1712] shadow-[0_60px_120px_-50px_rgba(0,0,0,0.95)]"
        >
          <div className="min-w-0 flex-[1_1_12rem] bg-[#1b1712] p-3">
            <AsciiPainting src={workThumb(work)} glyph={7} focus={SHEET.focus} className="block h-full min-h-64 w-full" />
          </div>
          <div className="flex min-w-0 flex-[1.6_1_17rem] flex-col gap-5 p-7 lg:p-11">
            <div>
              <p className="font-mono text-[11px] tracking-[0.16em] text-[#6b5b3e] uppercase">Sala 01 · Nº 01</p>
              <h3 className="mt-2.5 font-display text-[2.125rem] leading-tight tracking-tight">{work.title}</h3>
              <p className="mt-2 font-mono text-xs text-[#5a5247]">
                {work.artist} · {work.year}
              </p>
            </div>
            <dl className="flex flex-col gap-4 font-mono text-[13px] leading-relaxed">
              {SHEET.rows.map((row) => (
                <div key={row.label} className="border-t border-[#1b1712]/20 pt-3.5">
                  <dt className="text-[11px] tracking-[0.14em] text-[#6b5b3e] uppercase">{row.label}</dt>
                  <dd className="mt-1 text-[#2c261e]">{row.text}</dd>
                </div>
              ))}
            </dl>
          </div>
        </article>
      </div>
    </section>
  );
};
