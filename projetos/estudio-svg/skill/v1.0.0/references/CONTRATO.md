# Contrato audiovisual Estúdio SVG 3.0.0-alpha.4

O arquivo **[projeto.schema.json](../assets/projeto.schema.json)** é a fonte normativa desta revisão; não substitua enums por nomes inventados. Leia o **[guia original](GUIA_ORIGINAL.md)** para semântica detalhada.

## Objeto principal

`versao`: "3.0.0-alpha.4"; `titulo`: texto; `video`: `width`, `height`, `fps` e `draw_fps`; `voz` e `motor_voz` são opcionais; `encaixe_voz` pode ser `estender` ou `avisar`; `cenas`: 1–150 itens. Quadros pares de 320–1920 px; taxas FPS 24, 25 ou 30 e `draw_fps` enumerado no schema.

## Tipos de cena

`svg`, `foto`, `numero`, `cartoes`, `arvore`, `globo`, `linha`, `barras`, `espacial`. Cada cena: `id`, `tipo`, `duracao` (0.5–600 s), `titulo`, e os campos específicos necessários. Prefira `svg` para desenhos vetoriais animáveis, `espacial` para sólidos projetados e tipos históricos para dados simples.

## Timeline 2D

`animacoes` com até 32 faixas: `alvo` ou `alvos`, `tipo` (`translacao`, `rotacao`, `escala`, `fade`), `inicio`, `fim` em [0,1], `easing`, valores `de`/`ate`, e translacao `de_x`, `de_y`, `ate_x`, `ate_y`; `repeticoes` 0–20, `yoyo` booleano. O esquema suporta até 16 alvos por faixa e `intervalo` entre 0 e 0.5. Controle o eixo de rotação no desenho (não confunda com o centro de massa do elemento).

## Cena espacial

`espacial.camera` inclui `azimute`, `elevacao`, `distancia` (3–40) e `alvo:[x,y,z]`. `espacial.objetos` até 32, com `tipo` dentre `cubo`, `esfera`, `piramide`, `cilindro`, `cone`, `grupo`, além de `id`, `posicao`, `rotacao`, `escala`, `cor`, `pai` e `visivel`. `espacial.animacoes` até 64 faixas; `alvo` é um objeto por ID ou `__camera__`, `propriedade` pode ser `rotacao_x/y/z`, `posicao_x/y/z`, `escala`, `azimute`, `elevacao` ou `distancia`. Os valores são absolutos; `inicio` e `fim` são relativos à duração da cena. Projeção SVG, não WebGL/PBR.

## Curvas

`linear`, `suave`, `power1.in`, `power1.out`, `power1.inOut`, `power2.in`, `power2.out`, `power2.inOut`, `power3.inOut`, `sine.in`, `sine.out`, `sine.inOut`, `expo.out`, `back.out`, `bounce.out`. Estão implementadas localmente, mas não constituem compatibilidade GSAP.

## Mídias

`imagem` define `arquivo`, `fit`, `crop`, `modo`, x/y/w/h; `video_clipe` define `arquivo`, x/y/w/h, `fit`, `inicio`, `repetir`, `opacidade`. `audio` define `voice_text`, `voice_file`, volumes, atraso, música, `tracks`, `muted`. Ver [mídia e distribuição](MIDIA.md).
