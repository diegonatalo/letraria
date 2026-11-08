### 🖼️ Como adicionar uma nova obra

1. Baixe uma versão reduzida (de 1280 a 1920 px de largura) de uma obra em domínio público, por exemplo na [Wikimedia Commons](https://commons.wikimedia.org), e uma miniatura de 480 px.
2. Salve as duas em `public/obras/<slug>.jpg` e `public/obras/<slug>-thumb.jpg`.
3. Adicione a obra à lista `WORKS` em `lib/works.ts`, com `about` contendo três textos, nesta ordem: contexto, mensagem e curiosidade. Confira os fatos em fontes confiáveis antes de escrever.

A página, a galeria, o painel "Sobre a obra", os metadados e o sitemap saem dessa lista.
