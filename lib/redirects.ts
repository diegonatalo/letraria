import type { NextConfig } from "next";

export type Redirect = Awaited<ReturnType<NonNullable<NextConfig["redirects"]>>>[number];

/**
 * Páginas que ficavam na raiz antes da landing: cada obra e as três formas.
 * A lista é escrita aqui (o `next.config.ts` não carrega `lib/works.ts`);
 * `lib/moved-pages.test.ts` confere que ela bate com a galeria.
 */
export const MOVED_PAGES = ["noite-estrelada", "girassois", "o-beijo", "a-grande-onda", "moca-com-brinco-de-perola", "o-grito", "mona-lisa", "o-nascimento-de-venus", "impressao-nascer-do-sol", "a-criacao-de-adao", "o-caminhante-sobre-o-mar-de-nevoa", "coracao", "lirios", "buque"];

/**
 * Redirecionamentos do projeto, lidos pelo `next.config.ts` (que é igual em todos os projetos).
 * A galeria saiu da raiz para `/app` quando a landing entrou em `/`.
 */
export const REDIRECTS: Redirect[] = MOVED_PAGES.map((slug) => ({
  source: `/${slug}`,
  destination: `/app/${slug}`,
  permanent: true,
}));
