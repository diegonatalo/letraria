import { describe, expect, it } from "vitest";
import { MOVED_PAGES } from "@/lib/redirects";
import { WORKS } from "@/lib/works";

describe("MOVED_PAGES", () => {
  it("redireciona cada obra da galeria e as três formas", () => {
    expect([...MOVED_PAGES].sort()).toEqual([...WORKS.map((w) => w.slug), "coracao", "lirios", "buque"].sort());
  });
});
