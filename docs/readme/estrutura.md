```text
app/
├── page.tsx                galeria (página inicial)
├── [slug]/                 uma página por obra (/noite-estrelada, /o-beijo, ...)
├── coracao/                página do coração de palavras
├── layout.tsx              metadados, Open Graph e Twitter
├── opengraph-image.jpg     imagem de compartilhamento (1200×630, abaixo de 300 KB para o WhatsApp)
├── icon.svg                favicon
├── robots.ts               /robots.txt
└── sitemap.ts              /sitemap.xml
components/
├── AsciiArtwork.tsx        renderizador de qualquer pintura, com zoom, moldura e painel "Sobre a obra"
├── AsciiHeart.tsx          contorno e preenchimento do coração
├── AsciiThumb.tsx          miniatura em ASCII dos cartões da galeria
├── AsciiLogo.tsx           logotipo "LETRARIA" em caracteres
├── AsciiRain.tsx           chuva de letras do fundo da galeria
└── BackLink.tsx            botão "← Galeria"
lib/
├── ascii.ts                escala de caracteres e fonte compartilhadas
├── glArt.ts                renderizador WebGL2 da pintura (shader + atlas de glifos)
└── works.ts                lista das obras (título, artista, ano, fonte e textos do painel "Sobre a obra")
public/obras/               imagens reduzidas e miniaturas das obras
docs/img/
└── banner.png              banner deste README
```
