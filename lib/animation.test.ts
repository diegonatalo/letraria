import { describe, expect, it } from "vitest";
import {
  GROW_END,
  GROW_START,
  MAX_DELAY,
  OPEN_START,
  OPEN_TIME,
  TIMELINE_END,
  easeInOut,
  easeOutCubic,
  growthProgress,
  openProgress,
  smoothstep,
  swayGate,
} from "@/lib/animation";

describe("easings", () => {
  it.each([easeOutCubic, easeInOut])("começam em 0, terminam em 1 e crescem", (ease) => {
    expect(ease(0)).toBe(0);
    expect(ease(1)).toBe(1);
    expect(ease(0.25)).toBeLessThan(ease(0.75));
  });

  it("easeInOut passa por 0,5 no meio", () => {
    expect(easeInOut(0.5)).toBe(0.5);
  });

  it("easeOutCubic começa rápido", () => {
    expect(easeOutCubic(0.5)).toBeGreaterThan(0.5);
  });
});

describe("smoothstep", () => {
  it("vale 0 antes, 1 depois e 0,5 no meio", () => {
    expect(smoothstep(2, 4, 1)).toBe(0);
    expect(smoothstep(2, 4, 5)).toBe(1);
    expect(smoothstep(2, 4, 3)).toBe(0.5);
  });
});

describe("linha do tempo", () => {
  it("a duração total soma crescimento, abertura e atraso máximo", () => {
    expect(TIMELINE_END).toBe(OPEN_START + OPEN_TIME + MAX_DELAY);
  });

  it("os talos terminam de crescer quando os botões começam a abrir", () => {
    expect(GROW_END).toBe(OPEN_START);
  });

  it("growthProgress vai de 0 a 1 entre o início e o fim do crescimento", () => {
    expect(growthProgress(0)).toBe(0);
    expect(growthProgress(GROW_START)).toBe(0);
    expect(growthProgress(GROW_END)).toBe(1);
    expect(growthProgress(GROW_END + 10)).toBe(1);
  });

  it("openProgress respeita o atraso de cada flor", () => {
    expect(openProgress(OPEN_START, 1)).toBe(0);
    expect(openProgress(OPEN_START + 1, 1)).toBe(0);
    expect(openProgress(OPEN_START + 1 + OPEN_TIME, 1)).toBe(1);
    expect(openProgress(OPEN_START + 1 + OPEN_TIME / 2, 1)).toBeGreaterThan(0);
  });

  it("o balanço só entra depois que o buquê cresceu", () => {
    expect(swayGate(0)).toBe(0);
    expect(swayGate(1.5)).toBe(0);
    expect(swayGate(5.5)).toBe(1);
  });
});
