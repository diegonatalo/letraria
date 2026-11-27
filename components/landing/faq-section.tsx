import { SectionHeading } from "@/components/landing/section-heading";
import { FAQ } from "@/lib/landing";
import { SOURCE_URL } from "@/lib/site";

const ITEM = "group border-b border-gold/25";
const SUMMARY =
  "flex min-h-11 cursor-pointer list-none items-center justify-between gap-6 py-6 font-display text-[clamp(1.25rem,2vw,1.625rem)] text-paper [&::-webkit-details-marker]:hidden";
const ANSWER = "max-w-[60ch] pb-7 font-mono text-sm leading-7 text-slate-400";

const Plus = () => (
  <span aria-hidden className="flex-none font-mono text-2xl text-gold transition duration-300 group-open:rotate-45">
    +
  </span>
);

/** Perguntas frequentes, com `<details>` nativo (abre e fecha pelo teclado). */
export const FaqSection = () => (
  <section id="perguntas" aria-labelledby="titulo-perguntas" className="mx-auto max-w-7xl scroll-mt-8 px-5 pt-24 sm:px-8 lg:px-12 lg:pt-40">
    <div className="flex flex-wrap gap-x-24 gap-y-10">
      <div className="min-w-0 flex-[1_1_18rem]">
        <SectionHeading id="titulo-perguntas" eyebrow="Perguntas" title="Antes de" accent="entrar." />
      </div>
      <div className="min-w-0 flex-[2_1_32rem] border-t border-gold/25">
        {FAQ.map((item, i) => (
          <details key={item.question} className={ITEM} open={i === 0}>
            <summary className={SUMMARY}>
              {item.question}
              <Plus />
            </summary>
            <p className={ANSWER}>{item.answer}</p>
          </details>
        ))}
        <details className={ITEM}>
          <summary className={SUMMARY}>
            O código é aberto?
            <Plus />
          </summary>
          <p className={ANSWER}>
            Sim. O projeto inteiro está{" "}
            <a
              href={SOURCE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="border-b border-gold/45 text-gold hover:text-gold-light"
            >
              no GitHub
            </a>
            .
          </p>
        </details>
      </div>
    </div>
  </section>
);
