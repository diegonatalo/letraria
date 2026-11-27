import { easeInOut } from "@/lib/animation";
import { clamp } from "@/lib/ascii";

/** Ponto de uma pintura, em frações da largura e da altura (0..1). */
export type Point = { x: number; y: number };

/** Enquadramento: `zoom` 1 mostra a obra inteira; `x`/`y` é o centro. */
export type Frame = Point & { zoom: number };

/** Trecho da imagem que aparece na tela, em frações: canto (`x0`, `y0`), largura `u` e altura `v`. */
export type View = { x0: number; y0: number; u: number; v: number };

/** Zoom máximo da visita guiada. */
export const TOUR_ZOOM = 4;

/** Durações, em segundos, de cada fase da visita: afasta, mostra inteira, aproxima e para no detalhe. */
export const TOUR_TIMES = { out: 7, hold: 3.5, in: 4.5, rest: 1.2 };

export const TOUR_CYCLE = TOUR_TIMES.out + TOUR_TIMES.hold + TOUR_TIMES.in + TOUR_TIMES.rest;

const WHOLE: Frame = { zoom: 1, x: 0.5, y: 0.5 };

const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

const between = (from: Frame, to: Frame, t: number): Frame => {
  const e = easeInOut(clamp(t, 0, 1));
  return { zoom: lerp(from.zoom, to.zoom, e), x: lerp(from.x, to.x, e), y: lerp(from.y, to.y, e) };
};

/**
 * Visita guiada em ciclo: parte de um detalhe, afasta até a obra inteira,
 * fica um tempo nela e aproxima do próximo detalhe.
 */
export const tourFrame = (seconds: number, stops: Point[]): Frame => {
  if (stops.length === 0) return WHOLE;
  const t = Math.max(0, seconds);
  const n = Math.floor(t / TOUR_CYCLE);
  let p = t - n * TOUR_CYCLE;
  const from = { ...stops[n % stops.length], zoom: TOUR_ZOOM };
  const to = { ...stops[(n + 1) % stops.length], zoom: TOUR_ZOOM };
  if (p < TOUR_TIMES.out) return between(from, WHOLE, p / TOUR_TIMES.out);
  p -= TOUR_TIMES.out;
  if (p < TOUR_TIMES.hold) return WHOLE;
  p -= TOUR_TIMES.hold;
  if (p < TOUR_TIMES.in) return between(WHOLE, to, p / TOUR_TIMES.in);
  return to;
};

/**
 * Recorte "cover" com zoom: a imagem preenche a caixa sem distorcer e
 * o trecho visível nunca sai da imagem.
 */
export const viewFor = (boxAspect: number, imageAspect: number, frame: Frame): View => {
  const wide = imageAspect > boxAspect;
  const zoom = Math.max(1, frame.zoom);
  const u = (wide ? boxAspect / imageAspect : 1) / zoom;
  const v = (wide ? 1 : imageAspect / boxAspect) / zoom;
  return { x0: clamp(frame.x - u / 2, 0, 1 - u), y0: clamp(frame.y - v / 2, 0, 1 - v), u, v };
};

/** Brilho percebido (0..1) de uma cor RGB. */
export const luminance = (r: number, g: number, b: number) => (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255;
