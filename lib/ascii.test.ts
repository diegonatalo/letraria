import { describe, expect, it } from "vitest";
import { RAMP, charFor, clamp } from "@/lib/ascii";

describe("clamp", () => {
  it("limita o valor ao intervalo", () => {
    expect(clamp(5, 0, 10)).toBe(5);
    expect(clamp(-3, 0, 10)).toBe(0);
    expect(clamp(42, 0, 10)).toBe(10);
  });
});

describe("charFor", () => {
  it("brilho zero usa o caractere mais apagado e brilho máximo o mais forte", () => {
    expect(charFor(0)).toBe(RAMP[0]);
    expect(charFor(1)).toBe(RAMP[RAMP.length - 1]);
  });

  it("não sai da rampa com brilho fora de 0–1", () => {
    expect(charFor(-5)).toBe(RAMP[0]);
    expect(charFor(7)).toBe(RAMP[RAMP.length - 1]);
  });

  it("caracteres mais fortes vêm com brilho maior", () => {
    const indices = [0, 0.25, 0.5, 0.75, 1].map((lum) => RAMP.indexOf(charFor(lum)));
    expect(indices).toEqual([...indices].sort((a, b) => a - b));
  });
});
