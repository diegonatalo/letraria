import { describe, expect, it } from "vitest";
import { buildHydrangeas } from "@/lib/hydrangea";
import { PointBuffer, buildBouquet, mix, mulberry32, rotation } from "@/lib/lily";
import { buildMixed } from "@/lib/mixed";

describe("mulberry32", () => {
  it("gera sempre a mesma sequência para a mesma semente", () => {
    const a = mulberry32(7);
    const b = mulberry32(7);
    expect(Array.from({ length: 5 }, a)).toEqual(Array.from({ length: 5 }, b));
  });

  it("sementes diferentes dão sequências diferentes", () => {
    expect(mulberry32(1)()).not.toBe(mulberry32(2)());
  });

  it("devolve valores em [0, 1)", () => {
    const rnd = mulberry32(123);
    for (let i = 0; i < 1000; i++) {
      const v = rnd();
      expect(v).toBeGreaterThanOrEqual(0);
      expect(v).toBeLessThan(1);
    }
  });
});

describe("mix", () => {
  it("interpola entre duas cores", () => {
    expect(mix([0, 0, 0], [100, 200, 50], 0)).toEqual([0, 0, 0]);
    expect(mix([0, 0, 0], [100, 200, 50], 1)).toEqual([100, 200, 50]);
    expect(mix([0, 0, 0], [100, 200, 50], 0.5)).toEqual([50, 100, 25]);
  });
});

describe("rotation", () => {
  it("sem ângulos é a matriz identidade", () => {
    const R = new Float64Array(9);
    rotation(0, 0, 0, R);
    const identity = [1, 0, 0, 0, 1, 0, 0, 0, 1];
    identity.forEach((value, i) => expect(R[i]).toBeCloseTo(value));
  });

  it("é ortonormal para ângulos quaisquer", () => {
    const R = new Float64Array(9);
    rotation(0.7, -0.4, 1.3, R);
    const row = (i: number) => [R[i * 3], R[i * 3 + 1], R[i * 3 + 2]];
    const dot = (a: number[], b: number[]) => a.reduce((sum, v, i) => sum + v * b[i], 0);
    for (let i = 0; i < 3; i++) {
      expect(dot(row(i), row(i))).toBeCloseTo(1);
      for (let j = i + 1; j < 3; j++) expect(dot(row(i), row(j))).toBeCloseTo(0);
    }
  });
});

describe("PointBuffer", () => {
  it("começa vazio e reserva a capacidade pedida", () => {
    const buffer = new PointBuffer(10);
    expect(buffer.n).toBe(0);
    expect(buffer.x).toHaveLength(10);
    expect(buffer.ch).toHaveLength(10);
  });
});

describe("buquês", () => {
  it("buildBouquet é determinístico para a mesma semente", () => {
    const a = buildBouquet(11);
    const b = buildBouquet(11);
    expect(a.capacity).toBe(b.capacity);
    expect(a.bounds).toEqual(b.bounds);
  });

  it("sementes diferentes dão buquês diferentes", () => {
    expect(buildBouquet(11).bounds).not.toEqual(buildBouquet(12).bounds);
  });

  it("os limites têm área positiva e finita", () => {
    const { bounds, flowers, stems, capacity } = buildBouquet();
    expect(Number.isFinite(bounds.xmin) && Number.isFinite(bounds.ymax)).toBe(true);
    expect(bounds.xmax).toBeGreaterThan(bounds.xmin);
    expect(bounds.ymax).toBeGreaterThan(bounds.ymin);
    expect(stems).toBe(flowers.length + 1);
    expect(capacity).toBeGreaterThan(0);
  });

  it.each([
    ["hortênsias", () => buildHydrangeas()],
    ["misto", () => buildMixed()],
  ])("buquê de %s tem flores, capacidade e limites válidos", (_name, build) => {
    const bouquet = build();
    expect(bouquet.flowers.length).toBeGreaterThan(0);
    expect(bouquet.capacity).toBeGreaterThan(0);
    expect(bouquet.bounds.xmax).toBeGreaterThan(bouquet.bounds.xmin);
    expect(bouquet.bounds.ymax).toBeGreaterThan(bouquet.bounds.ymin);
  });
});
