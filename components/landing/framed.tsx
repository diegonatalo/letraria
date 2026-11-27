type Props = {
  children: React.ReactNode;
  /** Cantoneiras douradas nos quatro cantos. */
  corners?: boolean;
  className?: string;
};

const CORNERS = [
  "top-0 left-0 border-t-2 border-l-2",
  "top-0 right-0 border-t-2 border-r-2",
  "bottom-0 left-0 border-b-2 border-l-2",
  "bottom-0 right-0 border-b-2 border-r-2",
];

/** Moldura de galeria: borda dourada fina, passe-partout escuro e sombra funda. */
export const Framed = ({ children, corners = false, className = "" }: Props) => (
  <div
    className={`frame relative border border-gold/30 bg-[#0c0e16] p-2.5 shadow-[0_40px_80px_-36px_rgba(0,0,0,0.9)] ${className}`}
  >
    <div className="border border-gold/15">{children}</div>
    {corners &&
      CORNERS.map((pos) => <span key={pos} aria-hidden className={`absolute -m-px size-5 border-gold ${pos}`} />)}
  </div>
);
