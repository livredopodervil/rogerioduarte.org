---
name: estudio-svg-project-author
description: Crie projetos audiovisuais JSON válidos e bem desenhados para o Estúdio SVG V3 experimental (Termux), incluindo SVG animado, gráficos, cenas espaciais projetadas, narração e mídia local. Use quando o usuário pedir um projeto, roteiro animado, vídeo, apresentação ou exemplo importável para o Estúdio SVG.
---

# Skill: autoria de projetos para Estúdio SVG

Versão imutável desta skill: **1.0.0**. Contrato do aplicativo: **3.0.0-alpha.4** (V3 experimental). Autor do software: **Rogério Duarte**. Fonte revisada: commit `309535f14d2b6034b5a0b9a802db37830fc1696a` de `livredopodervil/estudio-svg` na branch `release/v3-alpha4-rc1`. Esta skill ensina a gerar projetos; não executa nem certifica a renderização.

## Antes de produzir

1. Entenda **tema, público, objetivo, duração, orientação, voz, idioma, fontes e mídias realmente disponíveis**. Quando faltarem dados não essenciais, use padrões documentados. Nunca invente um arquivo de mídia, estatística, citação ou licença.
2. Leia [contrato e campos](references/CONTRATO.md), [mídia e compatibilidade](references/MIDIA.md) e [qualidade e validação](references/QUALIDADE.md). Para campos exatos, o [JSON Schema](assets/projeto.schema.json) tem precedência sobre os exemplos e sobre estas instruções. Os textos [guia original](references/GUIA_ORIGINAL.md) e [prompt original](references/PROMPT_ORIGINAL.md) foram copiados da mesma revisão do repositório.
3. Escolha cenas e recursos **implementados no contrato**. A V3 é experimental; o player web não tem paridade comprovada com o MP4. Não assuma WebGL, PBR, GSAP, física ou tradução automática nativa.
4. Produza **JSON puro, sem Markdown**, com `versao: "3.0.0-alpha.4"`, `titulo`, `video` e 1–150 `cenas`. Defina `audio.voice_text` para cada cena narrada e use IDs únicos para objetos SVG e cenas.
5. Verifique coerência entre duração, fala, posição, composição, fonte e disponibilidade de arquivos locais. Faça revisão factual antes de publicar conteúdo jornalístico ou científico.
6. **Valide antes de declarar concluído:** parse JSON, validação do schema e `schema.normalize` do aplicativo, depois teste visual no editor/MP4 e, se necessário, no Player Web. Se não puder executar, informe claramente "não validado no aplicativo".

## Regras de design

- Uma ideia central por cena; títulos curtos, visual dominante, legenda contextual. Texto mínimo legível em 9:16 (720×1280) ou 16:9 (1280×720).
- Sincronize narrador e efeitos. Prefira 2–3 palavras de locução por segundo como ponto inicial, medindo a locução real. Defina `encaixe_voz: "estender"` para evitar cortes quando apropriado.
- Use `animacoes` para `fade`, `translacao`, `rotacao`, `escala`; `inicio` e `fim` são **frações da cena**. `repeticoes` é o número adicional de ciclos; `yoyo` alterna a direção. `alvos` + `intervalo` produzem sequenciamento.
- Em `espacial`, use objetos e câmera explícitos; `espacial.animacoes` anima propriedades 3D e `__camera__`. Não confunda `animacoes` 2D com `espacial.animacoes`.
- Para rotação de ponteiros, forneça pivô explícito no SVG/estrutura editável quando o sistema permitir; **não presuma centro do bounding box**.
- Use `imagem.arquivo`, `video_clipe.arquivo` e `audio.voice_file` apenas com **basenames** realmente fornecidos em `midia/`. Informe dependências ausentes em relatório separado do JSON.
- O navegador exige gesto do usuário para liberar áudio. Nunca prometa autoplay irrestrito no Facebook/WebView.

## Exemplos importáveis

- [Animação educativa com SVG e locução](assets/exemplo_educacao.json)
- [Sólidos e câmera com animação espacial](assets/exemplo_espacial.json)
- [Timeline original completa](assets/timeline_original_v3.json)

## Saída e controle de versões

Responda com **um projeto JSON importável** quando esse for o produto solicitado. Se houver mídia, forneça relação de assets e estrutura ZIP com `projetos/<nome>.json` e `midia/<arquivos>`. Não inclua caminhos absolutos nem URLs remotas nos campos de arquivos locais. Documente limitações. Esta skill é imutável em `https://rogerioduarte.org/projetos/estudio-svg/skill/v1.0.0/SKILL.md`; o endereço estável `https://rogerioduarte.org/projetos/estudio-svg/skill/SKILL.md` aponta para a versão recomendada e pode mudar em novas versões. Consulte `https://rogerioduarte.org/projetos/estudio-svg/skill/versions.json` para reprodutibilidade.
