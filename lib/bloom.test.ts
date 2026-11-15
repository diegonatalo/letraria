import { describe, expect, it } from "vitest";
import { buildBloom, poseBloom, type BloomSpec, type PetalSpec } from "@/lib/bloom";
import { PointBuffer, mulberry32 } from "@/lib/lily";

const petal = (az: number, over: Partial<PetalSpec> = {}): PetalSpec => ({
  az,
  len: 0.05,
  wid: 0.012,
  th0c: 0.2,
  th0o: 1.2,
  curl: 0.4,
  oMax: 1,
  start: 0,
  span: 0.8,
  rc: 0.01,
  zoff: 0,
  r0: 0.005,
  center: [200, 40, 40],
  base: [220, 60, 60],
  tip: [250, 120, 120],
  rib: 0.3,
  dark: 0,
  ...over,
});

const spec = (over: Partial<BloomSpec> = {}): BloomSpec => ({
  x: 0,
  y: 0.5,
  z: 0,
  size: 1,
  yaw: 0,
  pitch: 0,
  roll: 0,
  petals: [petal(0), petal(Math.PI / 2), petal(Math.PI)],
  round: true,
  cup: 0.2,
  ...over,
});

const disc = { radius: 0.02, count: 40, inner: [60, 30, 10], mid: [120, 70, 20], rim: [200, 150, 40] } as const;

describe("buildBloom", () => {
  it("é determinística com a mesma semente", () => {
    const a = buildBloom(spec(), 1, mulberry32(7), 1);
    const b = buildBloom(spec(), 1, mulberry32(7), 1);
    expect(a.n).toBe(b.n);
    expect(Array.from(a.u)).toEqual(Array.from(b.u));
    expect(a.delay).toBe(b.delay);
  });

  it("gera amostras para cada pétala, com coordenadas dentro da pétala", () => {
    const bloom = buildBloom(spec(), 1, mulberry32(1), 1);
    expect(bloom.np).toBe(3);
    expect(new Set(bloom.pid)).toEqual(new Set([0, 1, 2]));
    for (let i = 0; i < bloom.n; i++) {
      expect(bloom.u[i]).toBeGreaterThanOrEqual(-1);
      expect(bloom.u[i]).toBeLessThanOrEqual(1);
      expect(bloom.v[i]).toBeGreaterThanOrEqual(0);
      expect(bloom.v[i]).toBeLessThanOrEqual(1);
    }
  });

  it("amostragem mais densa gera mais pontos", () => {
    const normal = buildBloom(spec(), 1, mulberry32(1), 1);
    const dense = buildBloom(spec({ sp: 0.002 }), 1, mulberry32(1), 1);
    expect(dense.n).toBeGreaterThan(normal.n);
  });

  it("guarda a altura relativa ao topo e as propriedades das pétalas", () => {
    const bloom = buildBloom(spec({ y: 0.4 }), 0.8, mulberry32(1), 9);
    expect(bloom.h).toBeCloseTo(0.5);
    expect(bloom.gKey).toBeCloseTo(0.425);
    expect(bloom.sid).toBe(9);
    expect(Array.from(bloom.az)).toEqual([0, Math.fround(Math.PI / 2), Math.fround(Math.PI)]);
  });

  it("sem miolo não gera pontos de miolo; com miolo gera um por semente", () => {
    expect(buildBloom(spec(), 1, mulberry32(1), 1).dn).toBe(0);
    const sunflower = buildBloom(spec({ disc: { ...disc, inner: [...disc.inner], mid: [...disc.mid], rim: [...disc.rim] } }), 1, mulberry32(1), 1);
    expect(sunflower.dn).toBe(40);
    for (let i = 0; i < sunflower.dn; i++) {
      expect(Math.hypot(sunflower.dx[i], sunflower.dy[i])).toBeLessThanOrEqual(0.02 + 1e-6);
    }
  });
});

describe("poseBloom", () => {
  const bloom = buildBloom(
    spec({ disc: { ...disc, inner: [...disc.inner], mid: [...disc.mid], rim: [...disc.rim] } }),
    1,
    mulberry32(3),
    1,
  );

  it("antes do botão surgir, não desenha nada", () => {
    const out = new PointBuffer(bloom.n + bloom.dn);
    poseBloom(bloom, 0, 0, 0, 0, 0, out);
    expect(out.n).toBe(0);
  });

  it("depois, desenha todas as amostras e o miolo com brilho válido", () => {
    const out = new PointBuffer(bloom.n + bloom.dn);
    poseBloom(bloom, 1, 1, 0, 0, 0, out);
    expect(out.n).toBe(bloom.n + bloom.dn);
    for (let j = 0; j < out.n; j++) {
      expect(Number.isFinite(out.x[j])).toBe(true);
      expect(Number.isFinite(out.y[j])).toBe(true);
      expect(out.lum[j]).toBeGreaterThanOrEqual(0);
      expect(out.lum[j]).toBeLessThanOrEqual(1.07);
    }
  });

  it("aberta, as pétalas se espalham mais que fechada", () => {
    const spread = (open: number) => {
      const out = new PointBuffer(bloom.n + bloom.dn);
      poseBloom(bloom, open, 1, 0, 0, 0, out);
      let sum = 0;
      for (let j = 0; j < bloom.n; j++) sum += Math.hypot(out.x[j] - bloom.cx, out.y[j] - bloom.cy);
      return sum / bloom.n;
    };
    expect(spread(1)).toBeGreaterThan(spread(0));
  });
});
