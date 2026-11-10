import { existsSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { WORKS, getWork, workImage, workThumb } from "@/lib/works";

const publicFile = (url: string) => path.join(process.cwd(), "public", url);

describe("WORKS", () => {
  it("não repete slugs", () => {
    const slugs = WORKS.map((work) => work.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it("slugs são URLs seguras em kebab-case", () => {
    for (const work of WORKS) {
      expect(work.slug, work.title).toMatch(/^[a-z0-9]+(-[a-z0-9]+)*$/);
    }
  });

  it("toda obra tem os textos e três parágrafos sobre ela", () => {
    for (const work of WORKS) {
      expect(work.title, work.slug).not.toBe("");
      expect(work.artist, work.slug).not.toBe("");
      expect(work.year, work.slug).not.toBe("");
      expect(work.description, work.slug).not.toBe("");
      expect(work.about, work.slug).toHaveLength(3);
    }
  });

  it("a fonte aponta para um arquivo da Wikimedia Commons", () => {
    for (const work of WORKS) {
      const url = new URL(work.source);
      expect(url.hostname, work.slug).toBe("commons.wikimedia.org");
      expect(url.pathname, work.slug).toContain("/wiki/File:");
    }
  });

  it("cada obra tem imagem e miniatura em public/", () => {
    for (const work of WORKS) {
      expect(existsSync(publicFile(workImage(work))), workImage(work)).toBe(true);
      expect(existsSync(publicFile(workThumb(work))), workThumb(work)).toBe(true);
    }
  });
});

describe("getWork", () => {
  it("acha uma obra pelo slug e devolve undefined para um inexistente", () => {
    expect(getWork("mona-lisa")?.title).toBe("Mona Lisa");
    expect(getWork("nao-existe")).toBeUndefined();
  });
});

describe("caminhos de imagem", () => {
  it("usam o slug da obra", () => {
    const [work] = WORKS;
    expect(workImage(work)).toBe(`/obras/${work.slug}.jpg`);
    expect(workThumb(work)).toBe(`/obras/${work.slug}-thumb.jpg`);
  });
});
