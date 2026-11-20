```text
app/
├── page.tsx                landing (página inicial)
├── app/page.tsx            galeria (/app)
├── app/[slug]/             uma página por obra (/app/noite-estrelada, ...); os endereços antigos redirecionam
├── app/coracao/            página do coração de palavras (também lirios/ e buque/)
├── layout.tsx              metadados, Open Graph e Twitter
├── opengraph-image.jpg     imagem de compartilhamento (1200×630, abaixo de 300 KB para o WhatsApp)
├── icon.svg                favicon
├── robots.ts               /robots.txt
└── sitemap.ts              /sitemap.xml
components/
├── ascii-artwork.tsx        renderizador de qualquer pintura, com zoom, moldura e painel "Sobre a obra"
├── ascii-heart.tsx          contorno e preenchimento do coração
├── ascii-thumb.tsx          miniatura em ASCII dos cartões da galeria
├── ascii-logo.tsx           logotipo "LETRARIA" em caracteres
├── ascii-rain.tsx           chuva de letras do fundo da galeria
└── back-link.tsx            botão "← Galeria"
lib/
├── ascii.ts                escala de caracteres e fonte compartilhadas
├── gl-art.ts                renderizador WebGL2 da pintura (shader + atlas de glifos)
└── works.ts                lista das obras (título, artista, ano, fonte e textos do painel "Sobre a obra")
public/obras/               imagens reduzidas e miniaturas das obras
docs/img/
└── banner.png              banner deste README
```
