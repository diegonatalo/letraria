import { describe, expect, it } from "vitest";
import { TOUR_CYCLE, TOUR_TIMES, TOUR_ZOOM, luminance, tourFrame, viewFor } from "@/lib/painting";

const STOPS = [
  { x: 0.2, y: 0.3 },
  { x: 0.8, y: 0.7 },
];

describe("tourFrame", () => {
  it("começa no primeiro detalhe, com zoom máximo", () => {
    expect(tourFrame(0, STOPS)).toEqual({ zoom: TOUR_ZOOM, x: 0.2, y: 0.3 });
  });

  it("mostra a obra inteira depois de afastar", () => {
    expect(tourFrame(TOUR_TIMES.out + 1, STOPS)).toEqual({ zoom: 1, x: 0.5, y: 0.5 });
  });

  it("termina o ciclo no próximo detalhe e recomeça a partir dele", () => {
    expect(tourFrame(TOUR_CYCLE - 0.1, STOPS)).toEqual({ zoom: TOUR_ZOOM, x: 0.8, y: 0.7 });
    expect(tourFrame(TOUR_CYCLE, STOPS)).toEqual({ zoom: TOUR_ZOOM, x: 0.8, y: 0.7 });
  });

  it("o zoom diminui enquanto afasta", () => {
    const a = tourFrame(1, STOPS).zoom;
    const b = tourFrame(4, STOPS).zoom;
    expect(a).toBeGreaterThan(b);
    expect(b).toBeGreaterThan(1);
  });

  it("sem detalhes, mostra a obra inteira", () => {
    expect(tourFrame(3, [])).toEqual({ zoom: 1, x: 0.5, y: 0.5 });
  });
});

describe("viewFor", () => {
  it("imagem mais larga que a caixa: corta as laterais", () => {
    const view = viewFor(1, 2, { zoom: 1, x: 0.5, y: 0.5 });
    expect(view).toEqual({ x0: 0.25, y0: 0, u: 0.5, v: 1 });
  });

  it("o zoom encolhe o trecho visível", () => {
    const view = viewFor(1, 1, { zoom: 4, x: 0.5, y: 0.5 });
    expect(view.u).toBe(0.25);
    expect(view.v).toBe(0.25);
  });

  it("nunca sai da imagem, mesmo com o centro na borda", () => {
    const view = viewFor(1, 1, { zoom: 2, x: 1, y: 0 });
    expect(view.x0).toBe(0.5);
    expect(view.y0).toBe(0);
  });

  it("zoom abaixo de 1 vale como 1", () => {
    expect(viewFor(1, 1, { zoom: 0.5, x: 0.5, y: 0.5 }).u).toBe(1);
  });
});

describe("luminance", () => {
  it("vai de 0 (preto) a 1 (branco)", () => {
    expect(luminance(0, 0, 0)).toBe(0);
    expect(luminance(255, 255, 255)).toBeCloseTo(1);
  });

  it("o verde pesa mais que o azul", () => {
    expect(luminance(0, 255, 0)).toBeGreaterThan(luminance(0, 0, 255));
  });
});
