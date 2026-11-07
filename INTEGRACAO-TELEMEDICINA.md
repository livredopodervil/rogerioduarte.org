# rogerioduarte.org — Site integral com Telemedicina

**Base canônica:** commit do GitHub `44c77d890699b9c42340ace7b9f002c2b662bb4a`.
**Origem do módulo:** materiais do worktree `rogerioduarte-telemedicina-teste` enviados pelo usuário.
**Publicação:** não executada; o pacote é um artefato de teste pronto para ser copiado a um checkout depois de validação.

## Arquitetura

- `index.html`: nova página inicial pessoal; o portal 3D está em `laboratorio/index.html`.
- `modules/manifest.json`: registro autoritativo de módulos **e arestas** do grafo.
- `modules/graph.js`: espelho de arestas para compatibilidade documental.
- `js/site-v10.js`: motor 3D original, com navegação, páginas nativas e restauração de links profundos de Telemedicina.
- `modules/telemedicina.js`: conteúdos das 12 faces como objetos `pages`, incluindo textos e documentos.
- `assets/modules/telemedicina`: 12 faces e atlas do módulo novo.
- `assets/themes/telemedicina.svg`: tema do novo módulo.
- `projetos/telemedicina/index.html`: biblioteca e estudo financeiro, simuladores e 12 seções com âncoras.
- `projetos/telemedicina/docs`: **oito estudos HTML completos, preservados byte a byte**.

## Navegação

1. No núcleo, selecione Telemedicina no seletor superior, no mapa 3D ou no dodecaedro satélite.
2. Em Telemedicina, toque numa face ou num dos 12 botões de temas. O painel exibe conteúdo real e links para documentos completos.
3. Navegue entre faces pelos botões anterior/próxima, ou use “Explorar a seção completa” para abrir o portal técnico.
4. O portal técnico oferece as 12 seções e o acervo com leitor de documentos. O link de retorno vai à face de origem dentro de `/laboratorio/`.
5. O seletor superior dá acesso direto a qualquer módulo a partir de qualquer outro; não há iframe no painel 3D.

## Teste seguro em Termux

```sh
# Extraia o ZIP em um diretório novo e separado do checkout de publicação.
mkdir -p "$HOME/rogerioduarte-integrado-validacao"
python -m zipfile -e "$HOME/storage/downloads/rogerioduarte-site-telemedicina-integrado.zip" "$HOME/rogerioduarte-integrado-validacao"
cd "$HOME/rogerioduarte-integrado-validacao"
python -m http.server 8093 --bind 127.0.0.1
```

Acesse `http://127.0.0.1:8093/`, `http://127.0.0.1:8093/laboratorio/` e `http://127.0.0.1:8093/projetos/telemedicina/`.

**Dependência externa do site original:** o motor 3D importa Three.js da CDN `cdn.jsdelivr.net`; precisa de conexão à internet na primeira carga do motor 3D. Conteúdos/documentos/recursos locais não requerem esta CDN. A camada 3D não foi convertida para uma biblioteca local neste pacote.

## Critérios mínimos antes de substituir o site

- Testar o seletor de seis módulos, o mapa 3D, os satélites e o retorno ao Núcleo.
- Confirmar as 12 faces de Telemedicina, seus documentos e as cinco áreas originais.
- Testar a simulação financeira no portal e nos documentos interativos.
- Confirmar o carregamento do Three.js no dispositivo e o funcionamento de toque/arraste.
- Conferir layout em Android, desktop e orientação paisagem antes de qualquer push.
- Manter uma cópia de segurança do commit publicado. O pacote não publica, não comita, não envia dados.

As quantias e conformidade no projeto são estimativas e objetivos documentados, não certificações ou resultados de auditoria externa verificados independentemente neste processo.
