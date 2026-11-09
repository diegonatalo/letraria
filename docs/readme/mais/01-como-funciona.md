### 🧠 Como funciona

| Conceito | Regra |
|---|---|
| **Pixels viram letras** | A pintura é lida célula a célula. O brilho de cada trecho escolhe o caractere (`.,:;-=+*xo#%&@`) e a cor dele vem do próprio trecho, com um fundo mais escuro da mesma cor. |
| **Zoom** | O zoom parte de 16× e cai de forma suave até 1×, sempre centrado no meio da obra. |
| **Identidade visual** | Três cores: dourado (moldura e destaques), azul-noite (fundo) e rubi (coração), definidas em `app/globals.css`. Títulos em Fraunces e rótulos em JetBrains Mono, via `next/font`. |
| **Introdução** | Ao abrir uma obra, a moldura se desenha em diagonal, a pintura surge de dentro dela e só então o zoom começa. |
| **Moldura** | Quatro anéis de caracteres dourados (`#@`, `~o`, `=-`, `'.`), mais claros no canto superior esquerdo e mais escuros no inferior direito. |
| **Coração** | A forma vem da equação clássica do coração. As células de borda formam o contorno e o interior recebe as palavras, embaralhadas e deslocadas linha a linha. O preenchimento e o pulso seguem a distância ao centro, medida em relação à borda em cada direção, e por isso chegam juntos a todas as bordas. |

A pintura é desenhada na GPU com WebGL2 puro (`lib/gl-art.ts`), o que mantém o zoom fluido; a moldura dourada e as miniaturas usam `<canvas>` 2D. Se o navegador não tiver WebGL2, o desenho cai para o canvas 2D, mais pesado. Não há biblioteca de gráficos.
