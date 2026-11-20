import Link from "next/link";
import { AsciiLogo } from "@/components/ascii-logo";
import { AsciiRain } from "@/components/ascii-rain";
import { AsciiThumb } from "@/components/ascii-thumb";
import { SiteFooter } from "@/components/site-footer";
import { HERO, STEPS, featuredWorks } from "@/lib/landing";
import { SOURCE_URL } from "@/lib/site";
import { workThumb } from "@/lib/works";

const CARD =
  "group relative flex h-full flex-col overflow-hidden rounded-xl border border-gold/15 bg-night-2/80 transition duration-300 hover:-translate-y-1 hover:border-gold/60";
const CTA =
  "inline-flex items-center gap-2 rounded-full border border-gold/60 bg-gold/10 px-5 py-2.5 font-mono text-sm text-gold transition hover:bg-gold/20";

/** Página inicial: apresenta a Letraria e leva à galeria (`/app`). */
export const LandingPage = () => (
  <div className="relative flex min-h-screen flex-col overflow-hidden">
    <AsciiRain className="pointer-events-none absolute inset-x-0 top-0 h-[32rem] w-full opacity-25 [mask-image:linear-gradient(to_bottom,black,transparent)]" />
    <main id="conteudo" className="relative z-10 mx-auto flex w-full max-w-6xl flex-1 flex-col gap-20 px-5 py-12 sm:px-6">
      <section className="flex flex-col gap-6 pt-4" aria-labelledby="titulo">
        <AsciiLogo />
        {/* O <h1> da página é o logo em ASCII ("Letraria"). */}
        <p id="titulo" className="max-w-3xl font-display text-3xl text-slate-100 text-balance sm:text-5xl">
          {HERO.title}
        </p>
        <p className="max-w-2xl text-lg text-slate-400">{HERO.subtitle}</p>
        <div>
          <Link href="/app" className={CTA}>
            Entrar na galeria <span aria-hidden>→</span>
          </Link>
        </div>
      </section>

      <section aria-labelledby="titulo-destaques">
        <h2 id="titulo-destaques" className="font-display text-2xl text-slate-100 sm:text-3xl">
          Algumas obras
        </h2>
        <ul className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featuredWorks().map((w) => (
            <li key={w.slug}>
              <Link href={`/app/${w.slug}`} className={CARD}>
                <div className="relative aspect-[4/3] overflow-hidden bg-black">
                  <AsciiThumb src={workThumb(w)} />
                </div>
                <div className="p-4">
                  <h3 className="font-display text-lg font-semibold text-slate-100 transition group-hover:text-gold">
                    {w.title}
                  </h3>
                  <p className="font-mono text-xs text-slate-400">
                    {w.artist}, {w.year}
                  </p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="titulo-como">
        <h2 id="titulo-como" className="font-display text-2xl text-slate-100 sm:text-3xl">
          Como funciona
        </h2>
        <ol className="mt-6 grid gap-4 md:grid-cols-3">
          {STEPS.map((step, index) => (
            <li key={step.title} className="rounded-xl border border-gold/15 bg-night-2/80 p-5">
              <span className="font-mono text-sm text-gold">0{index + 1}</span>
              <h3 className="mt-2 font-display text-lg text-slate-100">{step.title}</h3>
              <p className="mt-1 text-sm text-slate-400">{step.text}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="text-center" aria-labelledby="titulo-final">
        <h2 id="titulo-final" className="font-display text-2xl text-slate-100 sm:text-3xl">
          Onze pinturas e três formas esperando você
        </h2>
        <Link href="/app" className={`${CTA} mt-6`}>
          Ver a galeria inteira <span aria-hidden>→</span>
        </Link>
      </section>
    </main>
    <div className="relative z-10 text-slate-400">
      <SiteFooter sourceUrl={SOURCE_URL} authorUrl="https://diegonatalo.dev" />
    </div>
  </div>
);
