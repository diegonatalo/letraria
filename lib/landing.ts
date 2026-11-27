import type { Frame, Point } from "@/lib/painting";
import { WORKS, type Work } from "@/lib/works";

/** Textos da landing (`/`). As seções ficam em `components/landing/`. */

export const HERO = {
  eyebrow: "Galeria de arte em ASCII",
  room: "Sala 01 · Em exibição",
  title: "Obras-primas,",
  titleAccent: "letra por letra.",
  subtitle:
    "A Noite Estrelada, O Grito, a Mona Lisa e outros clássicos recriados com caracteres coloridos e animados. O zoom parte de um detalhe e se afasta até revelar o quadro inteiro.",
};

/** Obra do quadro principal e os detalhes que o zoom percorre. */
export const HERO_SLUG = "noite-estrelada";
export const HERO_PLACE = "MoMA, Nova York";

export const HERO_TOUR: Point[] = [
  { x: 0.44, y: 0.33 },
  { x: 0.86, y: 0.13 },
  { x: 0.16, y: 0.58 },
  { x: 0.62, y: 0.78 },
];

export const RAMP_SECTION = {
  title: "Cada trecho da tela",
  titleAccent: "escolhe a sua letra.",
  text: "A pintura vira uma grade. O brilho de cada célula escolhe um dos catorze caracteres abaixo, do ponto ao arroba, e a cor vem da própria pintura.",
};

export type Step = { title: string; text: string };

export const STEPS: Step[] = [
  {
    title: "Escolha uma obra",
    text: "Onze pinturas em domínio público e três formas desenhadas com letras: um coração, lírios e hortênsias.",
  },
  {
    title: "Veja o zoom",
    text: "A tela começa num detalhe, uma estrela ou um olhar, e se afasta devagar até mostrar a obra inteira.",
  },
  {
    title: "Conheça a história",
    text: "Cada obra tem autor, data, contexto e uma curiosidade, como uma etiqueta de museu.",
  },
];

/** Obras da parede do acervo, na ordem em que aparecem. */
export const FEATURED_SLUGS = ["o-grito", "a-grande-onda", "mona-lisa", "o-beijo", "moca-com-brinco-de-perola", "girassois"];

export const featuredWorks = (): Work[] =>
  FEATURED_SLUGS.map((slug) => WORKS.find((w) => w.slug === slug)).filter((w): w is Work => Boolean(w));

/** Proporção (largura / altura) das miniaturas em `public/obras/*-thumb.jpg`. */
export const THUMB_ASPECT: Record<string, number> = {
  "noite-estrelada": 500 / 396,
  girassois: 500 / 631,
  "o-beijo": 500 / 502,
  "a-grande-onda": 500 / 336,
  "moca-com-brinco-de-perola": 500 / 585,
  "o-grito": 500 / 637,
  "mona-lisa": 500 / 745,
};

/** Formas desenhadas com letras (não são pinturas). */
export type Shape = { slug: string; title: string; note: string };

export const SHAPES: Shape[] = [
  { slug: "coracao", title: "Coração", note: "forma · palavras de carinho" },
  { slug: "lirios", title: "Lírios", note: "forma · buquê" },
  { slug: "buque", title: "Hortênsias", note: "forma · buquê" },
];

/** "Vincent van Gogh" -> "Van Gogh"; "Leonardo da Vinci" -> "Da Vinci". */
export const shortArtist = (artist: string) => {
  const parts = artist.split(" ");
  const particle = parts.findIndex((p, i) => i > 0 && /^(van|da|de|del|von)$/i.test(p));
  const name = particle > 0 ? parts.slice(particle).join(" ") : parts[parts.length - 1];
  return name.charAt(0).toUpperCase() + name.slice(1);
};

/** Ficha de exemplo, resumida de `about` da obra principal. */
export const SHEET = {
  focus: { zoom: 2.4, x: 0.14, y: 0.52 } satisfies Frame,
  rows: [
    {
      label: "Contexto",
      text: "Pintado em junho de 1889, no asilo de Saint-Rémy-de-Provence, a partir da vista da janela do quarto. O vilarejo é imaginado.",
    },
    { label: "Leitura", text: "O céu agitado contra o vilarejo quieto: para muitos, a tensão entre angústia e consolo." },
    { label: "Curiosidade", text: "Está no MoMA, em Nova York, desde 1941." },
  ],
};

export type Faq = { question: string; answer: string };

export const FAQ: Faq[] = [
  {
    question: "Preciso criar conta ou instalar algo?",
    answer: "Não. A Letraria abre direto no navegador, no computador ou no celular.",
  },
  {
    question: "De onde vêm as pinturas?",
    answer:
      "São obras em domínio público, a partir de reproduções da Wikimedia Commons. Cada uma traz o link para o arquivo original.",
  },
  {
    question: "Como uma pintura vira texto?",
    answer:
      "A imagem é dividida numa grade. O brilho de cada célula escolhe um dos catorze caracteres, do ponto ao arroba, e a cor de cada letra vem da própria pintura.",
  },
];

/** Tom de cada caractere da rampa na faixa da landing, do mais apagado ao dourado. */
export const RAMP_COLORS = [
  "#3b3a44", "#46434a", "#534e50", "#615953", "#716656", "#827359", "#94815a",
  "#a78e5b", "#ba9b5c", "#cca75e", "#ddb462", "#ebc068", "#f5cf80", "#fde9b0",
];

/** Onde começa a faixa de brilho de cada caractere, em %: 00, 07, 14... */
export const rampStart = (index: number, total: number) => String(Math.floor((index * 100) / total)).padStart(2, "0");

const COUNT = ["zero", "uma", "duas", "três", "quatro", "cinco", "seis", "sete", "oito", "nove", "dez", "onze", "doze"];

/** Número por extenso, no feminino (pinturas, formas); acima de doze, em algarismos. */
export const spellCount = (n: number, capitalize = false) => {
  const word = COUNT[n] ?? String(n);
  return capitalize ? word.charAt(0).toUpperCase() + word.slice(1) : word;
};
