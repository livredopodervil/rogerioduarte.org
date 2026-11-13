# Mídia, voz, Player Web e distribuição

## Importação e nomes de arquivo

No JSON, `imagem.arquivo`, `video_clipe.arquivo`, `audio.voice_file`, `audio.music_file` e `trilha` indicam mídias importadas. Use nomes simples, sem barra, caminho absoluto ou endereço de internet. Empacotamento de importação: `projetos/<slug>.json` e `midia/<arquivo>`. Não referencie fotos, vídeos ou músicas inexistentes; acrescente uma lista de dependências quando necessário.

## Áudio

`audio.voice_text` contém a fala. `voice_enabled` habilita narração; `voice_file` indica uma gravação quando disponível. `motor_voz` do MP4 aceita `edge-tts`, `espeak-ng` ou `piper`, conforme ambiente. Voz gravada para HTML5 oferece maior compatibilidade no navegador interno do Facebook; controles de som exigem gesto real do usuário e testes no destino. A presença de um texto de voz não garante que o MP3 esteja publicado.

## Vídeo sobreposto

`video_clipe.arquivo` é um vídeo local. Defina geometria com `x`, `y`, `w`, `h` (frações do quadro), `fit` (`cover` ou `contain`), `inicio`, `repetir`, `opacidade`. Para o Player Web, o arquivo precisa ser copiado para a publicação, codificado num formato suportado pelo navegador e carregado no caminho exato. A camada pode diferir do exportador MP4; compare ambos.

## Direitos e evidência

Confirme licença e autoria de cada foto, fonte e trilha. Em notícias, distinga fato verificado, declaração, hipótese e imagem ilustrativa. Preserve URL da fonte e data no material editorial quando pertinente; não inclua URLs remotas como supostos arquivos de mídia locais do projeto.

## Limites

O player V3 e o exportador não têm paridade integral comprovada. A prévia no Facebook depende de metadados Open Graph da página, não do JSON. Tradução automática depende de serviços externos; não é uma capacidade garantida do schema. Não inclua script executável arbitrário no conteúdo SVG fornecido por terceiros.
