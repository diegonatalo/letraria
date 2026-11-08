### 🌐 Deploy

O projeto foi pensado para a [Vercel](https://vercel.com) e não precisa de configuração extra nem de variáveis de ambiente.

> [!NOTE]
> O domínio `https://letraria.vercel.app` está escrito em `app/layout.tsx` (`metadataBase`), em `app/sitemap.ts` e em `app/robots.ts`. Ao mudar de domínio, troque nos três lugares, senão o Open Graph, o sitemap e o canonical continuam apontando para o endereço antigo.
