# Ficha da face 03/12 — Urgências e prioridades assistenciais

**Módulo 3D:** Saúde. **Fonte:** `content-src/saude/urgencias.md`. **Página:** `/conteudos/saude/urgencias.html`.
**Complemento interativo:** `/projetos/emergencias/` (cenários educativos fictícios).

## Papel desta face no atlas

A face conduz a um artigo que apresenta a avaliação de gravidade, a organização temporal, os elementos ABCDE, os fluxos de comunicação e as evidências atualizadas. O mesmo artigo deve ser acessível sem WebGL. O painel didático é um recurso vinculado à página, não um novo motor tridimensional.

## Contrato técnico

- Preservar o índice 03/12 e a rota existentes; não modificar `modules/manifest.json`, `modules/content-pages.js` ou `js/site-v10.js`.
- Conservar título e organização visual coerentes com os outros textos da área Saúde.
- Não classificar pacientes reais, nem solicitar dados clínicos pessoais.
- Manter a ilustração como recurso com texto alternativo.
- Usar atualizações isoladas verificadas por SHA-256 e remoção reversível pelo Studio.

## Critérios de teste

Selecionar **Saúde → Urgências** no laboratório, abrir artigo integral, conferir links bibliográficos e visitar `/projetos/emergencias/`. Repetir após desinstalar o pacote: o artigo anterior deve voltar e a página do painel deixar de existir.
