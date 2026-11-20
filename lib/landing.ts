import { WORKS, type Work } from "@/lib/works";

/** Textos da landing (`/`). As seções ficam em `components/landing/`. */

export const HERO = {
  title: "Pinturas famosas, escritas só com letras.",
  subtitle:
    "A Noite Estrelada, O Grito, a Mona Lisa e outros clássicos recriados em arte ASCII colorida e animada. Um zoom parte de um detalhe e revela o quadro inteiro, letra por letra.",
};

export type Step = { title: string; text: string };

export const STEPS: Step[] = [
  { title: "Escolha uma obra", text: "Pinturas em domínio público e três formas desenhadas com letras." },
  { title: "Veja o zoom", text: "A tela começa num detalhe e se afasta até mostrar a obra inteira." },
  { title: "Conheça a história", text: "Cada obra tem autor, data, contexto e uma curiosidade." },
];

/** Obras mostradas na landing. */
export const FEATURED_SLUGS = ["noite-estrelada", "o-grito", "mona-lisa"];

export const featuredWorks = (): Work[] =>
  FEATURED_SLUGS.map((slug) => WORKS.find((w) => w.slug === slug)).filter((w): w is Work => Boolean(w));
