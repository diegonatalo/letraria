type Props = {
  id: string;
  eyebrow?: string;
  title: string;
  accent: string;
};

export const EYEBROW = "font-mono text-xs uppercase tracking-[0.14em]";
export const RULE = "border-gold/20";

/** Título de seção: sobretítulo dourado e `<h2>` em serifa com o final em itálico. */
export const SectionHeading = ({ id, eyebrow, title, accent }: Props) => (
  <div>
    {eyebrow && <p className={`${EYEBROW} text-gold`}>{eyebrow}</p>}
    <h2
      id={id}
      className="mt-4 font-display text-[clamp(2.4rem,5vw,4.5rem)] leading-none font-light tracking-[-0.025em] text-balance text-paper"
    >
      {title} <em className="text-gold">{accent}</em>
    </h2>
  </div>
);
