import Link from "next/link";
import { AsciiPainting } from "@/components/ascii-painting";
import { Framed } from "@/components/landing/framed";
import { EYEBROW, SectionHeading } from "@/components/landing/section-heading";
import { SHAPES, THUMB_ASPECT, featuredWorks, shortArtist } from "@/lib/landing";
import { WORKS, workThumb } from "@/lib/works";

const ROW =
  "group flex min-h-12 items-baseline gap-3 border-b border-paper/8 py-3 text-paper transition hover:text-gold focus-visible:text-gold";
const LEADER = "flex-1 -translate-y-1 border-b border-dotted border-paper/25 transition group-hover:border-gold/60";

/** O acervo: parede com algumas obras e o catálogo completo. */
export const CollectionSection = () => (
  <section id="acervo" aria-labelledby="titulo-acervo" className="mx-auto max-w-7xl scroll-mt-8 px-5 pt-24 sm:px-8 lg:px-12 lg:pt-40">
    <div className="flex flex-wrap items-end justify-between gap-x-16 gap-y-6">
      <SectionHeading id="titulo-acervo" eyebrow="O acervo" title="Uma parede" accent="de clássicos." />
      <p className="max-w-md font-mono text-[15px] leading-7 text-slate-400">
        Passe o mouse sobre um quadro: as letras se agitam e a tela se aproxima. Reproduções a partir da Wikimedia Commons.
      </p>
    </div>

    {/* Linhas de três quadros: cada um cresce na proporção da obra a partir dos 24px da moldura, então a linha fica com a mesma altura. */}
    <div className="mt-12 flex flex-col gap-14 lg:mt-20">
      {[featuredWorks().slice(0, 3), featuredWorks().slice(3)].map((row) => (
        <ul key={row[0].slug} className="flex flex-col gap-x-10 gap-y-14 md:flex-row md:items-start">
          {row.map((w) => {
            const aspect = THUMB_ASPECT[w.slug];
            return (
              <li key={w.slug} className="min-w-0 md:[flex:var(--grow)_1_24px]" style={{ "--grow": aspect } as React.CSSProperties}>
                <Link href={`/app/${w.slug}`} className="group flex flex-col gap-4.5">
                  <Framed className="transition duration-500 group-hover:-translate-y-1 group-hover:border-gold/70">
                    <AsciiPainting src={workThumb(w)} glyph={7} aspect={aspect} className="block w-full" />
                  </Framed>
                  <span>
                    <span className="block font-display text-[1.375rem] text-paper transition group-hover:text-gold">
                      {w.title}
                    </span>
                    <span className="mt-1.5 block font-mono text-xs tracking-wide text-stone">
                      {w.artist} · {w.year}
                    </span>
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      ))}
    </div>

    <div className="mt-20 border border-gold/20 bg-panel p-6 sm:p-10 lg:mt-32 lg:p-14">
      <div className="flex flex-wrap items-baseline justify-between gap-x-8 gap-y-3">
        <h3 className="font-display text-[2rem] tracking-tight text-paper">Catálogo completo</h3>
        <p className={`text-stone ${EYEBROW}`}>
          {WORKS.length} pinturas · {SHAPES.length} formas
        </p>
      </div>
      <ul className="mt-8 grid gap-x-16 lg:grid-cols-2">
        {WORKS.map((w, i) => (
          <li key={w.slug}>
            <Link href={`/app/${w.slug}`} className={ROW}>
              <span className="font-mono text-[11px] text-stone/80">{String(i + 1).padStart(2, "0")}</span>
              <span className="font-display text-[1.2rem]">{w.title}</span>
              <span aria-hidden className={LEADER} />
              <span className="font-mono text-xs whitespace-nowrap text-stone">
                {shortArtist(w.artist)}, {w.year}
              </span>
            </Link>
          </li>
        ))}
        {SHAPES.map((s, i) => (
          <li key={s.slug}>
            <Link href={`/app/${s.slug}`} className={ROW}>
              <span className="font-mono text-[11px] text-rose-300">{String(WORKS.length + i + 1).padStart(2, "0")}</span>
              <span className="font-display text-[1.2rem] italic">{s.title}</span>
              <span aria-hidden className={LEADER} />
              <span className="font-mono text-xs whitespace-nowrap text-stone">{s.note}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  </section>
);
