import { EYEBROW } from "@/components/landing/section-heading";
import { RAMP } from "@/lib/ascii";
import { RAMP_COLORS, RAMP_SECTION, rampStart } from "@/lib/landing";

const SPOKEN = "ponto, vírgula, dois-pontos, ponto e vírgula, hífen, igual, mais, asterisco, x, o, cerquilha, porcentagem, e comercial e arroba";

/** Faixa que mostra os 14 caracteres da rampa, do mais apagado ao mais forte. */
export const RampSection = () => (
  <section aria-labelledby="titulo-rampa" className="border-y border-gold/15 bg-panel">
    <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:px-12 lg:py-36">
      <div className="flex flex-wrap items-end justify-between gap-x-16 gap-y-6">
        <h2
          id="titulo-rampa"
          className="flex-[1_1_26rem] font-display text-[clamp(2.4rem,5vw,4.5rem)] leading-none font-light tracking-[-0.025em] text-paper"
        >
          {RAMP_SECTION.title}
          <br />
          <em className="text-gold">{RAMP_SECTION.titleAccent}</em>
        </h2>
        <p className="max-w-[44ch] flex-[1_1_20rem] font-mono text-[15px] leading-7 text-slate-400">{RAMP_SECTION.text}</p>
      </div>
      <p className="sr-only">Os catorze caracteres, do mais apagado ao mais forte: {SPOKEN}.</p>
      <ol aria-hidden className="mt-14 grid grid-cols-14 border-t border-l border-gold/20 lg:mt-24">
        {[...RAMP].map((char, i) => {
          const last = i === RAMP.length - 1;
          return (
            <li
              key={char}
              className={`flex flex-col items-center gap-3.5 border-r border-b border-gold/20 py-4 sm:py-7 ${last ? "bg-gold/5" : ""}`}
            >
              <span
                className="font-mono text-[clamp(1.375rem,5vw,4.75rem)] leading-none font-bold"
                style={{ color: RAMP_COLORS[i], textShadow: last ? "0 0 28px rgb(253 233 176 / 0.55)" : undefined }}
              >
                {char}
              </span>
              <span className={`hidden font-mono text-[11px] md:inline ${last ? "text-gold" : "text-stone/80"}`}>
                {rampStart(i, RAMP.length)}
              </span>
            </li>
          );
        })}
      </ol>
      <div aria-hidden className={`mt-4 flex justify-between text-stone/80 ${EYEBROW} text-[11px]`}>
        <span>← mais escuro</span>
        <span className="hidden md:inline">brilho da célula, em %</span>
        <span>mais claro →</span>
      </div>
    </div>
  </section>
);
