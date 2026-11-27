import Link from "next/link";

const NAV = [
  { href: "#acervo", label: "Acervo" },
  { href: "#como-funciona", label: "Como funciona" },
  { href: "#perguntas", label: "Perguntas" },
];

/** Cabeçalho da landing: marca, âncoras das seções e atalho para o app. */
export const LandingHeader = () => (
  <header className="mx-auto flex w-full max-w-7xl flex-wrap items-center justify-between gap-6 px-5 py-7 sm:px-8 lg:px-12">
    <Link href="/" className="flex items-center gap-3 text-paper" aria-label="Letraria, página inicial">
      <span aria-hidden className="grid size-9 place-items-center border border-gold/50 font-mono text-lg font-bold text-gold">
        @
      </span>
      <span className="font-display text-[1.65rem] italic tracking-tight">Letraria</span>
    </Link>
    <nav aria-label="Principal" className="flex items-center gap-8 font-mono text-[13px] tracking-wide">
      {NAV.map((item) => (
        <a key={item.href} href={item.href} className="hidden text-slate-300 transition hover:text-gold-light md:inline">
          {item.label}
        </a>
      ))}
      <Link
        href="/app"
        className="inline-flex min-h-11 items-center border border-gold/45 px-4 text-gold transition hover:border-gold hover:text-gold-light"
      >
        Abrir o app
      </Link>
    </nav>
  </header>
);
