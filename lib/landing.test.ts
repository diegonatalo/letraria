import { describe, expect, it } from "vitest";
import { RAMP } from "@/lib/ascii";
import {
  FAQ,
  FEATURED_SLUGS,
  HERO_SLUG,
  HERO_TOUR,
  RAMP_COLORS,
  SHAPES,
  STEPS,
  THUMB_ASPECT,
  featuredWorks,
  rampStart,
  shortArtist,
  spellCount,
} from "@/lib/landing";
import { MOVED_PAGES } from "@/lib/redirects";
import { getWork } from "@/lib/works";

describe("landing", () => {
  it("as obras em destaque existem na galeria", () => {
    expect(featuredWorks().map((w) => w.slug)).toEqual(FEATURED_SLUGS);
  });

  it("a obra principal existe e os detalhes da visita ficam dentro da tela", () => {
    expect(getWork(HERO_SLUG)).toBeDefined();
    for (const stop of HERO_TOUR) {
      expect(stop.x).toBeGreaterThanOrEqual(0);
      expect(stop.x).toBeLessThanOrEqual(1);
      expect(stop.y).toBeGreaterThanOrEqual(0);
      expect(stop.y).toBeLessThanOrEqual(1);
    }
  });

  it("toda obra com quadro na landing tem a proporção da miniatura", () => {
    for (const slug of [HERO_SLUG, ...FEATURED_SLUGS]) expect(THUMB_ASPECT[slug]).toBeGreaterThan(0);
  });

  it("as formas apontam para páginas que existem no app", () => {
    for (const shape of SHAPES) expect(MOVED_PAGES).toContain(shape.slug);
  });

  it("tem 3 passos sem títulos repetidos", () => {
    expect(STEPS).toHaveLength(3);
    expect(new Set(STEPS.map((s) => s.title)).size).toBe(3);
  });

  it("perguntas sem repetição", () => {
    expect(new Set(FAQ.map((f) => f.question)).size).toBe(FAQ.length);
  });
});

describe("rampa", () => {
  it("uma cor por caractere", () => {
    expect(RAMP_COLORS).toHaveLength(RAMP.length);
  });

  it("rótulos com dois dígitos, começando em 00", () => {
    expect(rampStart(0, 14)).toBe("00");
    expect(rampStart(1, 14)).toBe("07");
    expect(rampStart(13, 14)).toBe("92");
  });
});

describe("shortArtist", () => {
  it.each([
    ["Vincent van Gogh", "Van Gogh"],
    ["Leonardo da Vinci", "Da Vinci"],
    ["Caspar David Friedrich", "Friedrich"],
    ["Michelangelo", "Michelangelo"],
  ])("%s -> %s", (artist, short) => {
    expect(shortArtist(artist)).toBe(short);
  });
});

describe("spellCount", () => {
  it("escreve por extenso no feminino", () => {
    expect(spellCount(3)).toBe("três");
    expect(spellCount(11, true)).toBe("Onze");
  });

  it("acima de doze, usa algarismos", () => {
    expect(spellCount(20)).toBe("20");
  });
});
