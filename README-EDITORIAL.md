# Caderno de estudos — integração ao portal

## Arquivos e papéis

- `content-src/<modulo>/<face>.md`: **fonte do texto público** de cada um dos 72 artigos.
- `content-src/catalog.json`: metadados e relação entre faces e artigos.
- `editorial/`: planos editoriais, fichas por seção e por face, critérios de aceite e diagnóstico. Não são necessários para o visitante ler o conteúdo.
- `conteudos/`: 72 artigos HTML estáticos, com filtro de área e busca no índice.
- `modules/content-pages.js`: catálogo de leituras consumido pelo motor 3D.
- `scripts/build_editorial.py`: recompila o catálogo JS e os HTML a partir dos Markdown, sem instalar dependências além do Python 3.
- `scripts/integrar_caderno.py`: aplica os arquivos e três adaptações pontuais no worktree alvo; não executa Git nem publica.

## Como editar um texto

Edite `content-src/saude/evidencias.md` (por exemplo), preserve as seções com `#`, `##`, parágrafos e listas com `-`, e execute:

```sh
python scripts/build_editorial.py
python verificar_integracao.py
```

O gerador aceita um subconjunto deliberadamente simples de Markdown: cabeçalhos, parágrafos, listas, negrito, código inline e links. Conteúdo HTML bruto é escapado para evitar injeções acidentais.

## Caminho recomendado para quem já usa RD Studio no Termux

1. Extraia `rd-caderno-editorial-incremental-v5.zip` fora de `~/rogerioduarte-studio-teste`.
2. Inspecione: `python /caminho/pacote/scripts/integrar_caderno.py --repo ~/rogerioduarte-studio-teste`.
3. Aplique: repita com `--apply`. A operação guarda backups dos arquivos que modifica sob `~/.cache/rd-studio-editorial-backups/`.
4. Abra as prévias: `/`, `/conteudos/`, `/conteudos/saude/clinica.html` e `/laboratorio/#saude-1`.
5. Faça Vistoria no RD Studio e revise o diff. **Não faça push antes de validar a cena 3D em Android.**

O instalador **não sobrescreve** `modules/manifest.json`, `config/spatial.json`, `data/social-latest.json` nem aplicativos existentes. Ele preserva qualquer `/projetos/index.html` já criado pelo RD Studio. Se detectar conflito em arquivos editoriais existentes, interrompe a atualização.

## Escopo e limitações

- A versão-base foi extraída do pacote anterior desta conversa; **não é uma cópia verificada do último GitHub**.
- Os artigos são material autoral de estudo e demandam revisão editorial e bibliográfica continuada.
- A página inicial não declara projetos não publicados.
- O motor WebGL ainda exige revisão visual no navegador Android.
- Não estão incluídos os aplicativos `orq`, Space Invaders ou outras alterações locais do RD Studio, que devem ser preservados no worktree vivo.
