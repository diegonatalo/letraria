import { describe, expect, it } from "vitest";
import { FEATURED_SLUGS, STEPS, featuredWorks } from "@/lib/landing";

describe("landing", () => {
  it("as obras em destaque existem na galeria", () => {
    expect(featuredWorks().map((w) => w.slug)).toEqual(FEATURED_SLUGS);
  });

  it("tem 3 passos sem títulos repetidos", () => {
    expect(STEPS).toHaveLength(3);
    expect(new Set(STEPS.map((s) => s.title)).size).toBe(3);
  });
});
