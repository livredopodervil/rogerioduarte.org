# Rogério Duarte — site pessoal e laboratório visual

## Estrutura pública

| URL | Função |
| --- | --- |
| `/` | Página inicial limpa, apresentação pessoal, atuação, projetos, interesses e contato |
| `/laboratorio/` | Portal 3D existente, com seis dodecaedros interconectados |
| `/projetos/telemedicina/` | Projeto técnico de Telemedicina, biblioteca de 8 documentos e simuladores |

A página inicial usa CSS e JavaScript inline, SVG inline e `assets/home-mark.svg` como ícone; **não exige conexão de rede para a interface**. Fontes de título são sem serifa. Textos corridos priorizam EB Garamond/Garamond e recorrem a Baskerville, Palatino ou Georgia quando não instaladas; nenhuma fonte é baixada.

## Adaptação do portal original

- O `index.html` antigo foi preservado como `laboratorio/index.html`.
- `<base href="../">` mantém funcionando os caminhos de imagens, temas, manifesto e scripts do site original.
- A resolução de URL no motor `js/site-v10.js` passou a usar `document.baseURI` no painel de detalhe para abrir projetos corretamente em `/laboratorio/`.
- Os links de retorno em `projetos/telemedicina/index.html` agora apontam para `/laboratorio/#telemedicina-N` (e não para a nova capa pessoal).
- Nenhum dos módulos `modules/*.js` precisou ser reescrito nesta etapa. O mapa 3D e a geometria permanecem iguais.

## Teste local no Termux

Extraia o pacote em um diretório novo, que **não seja** um checkout de produção:

```sh
mkdir -p "$HOME/rogerioduarte-home-v1"
python -m zipfile -e "$HOME/storage/downloads/rogerioduarte-site-home-v1.zip" "$HOME/rogerioduarte-home-v1"
cd "$HOME/rogerioduarte-home-v1"
python verificar_integracao.py
python -m http.server 8094 --bind 127.0.0.1
```

Abra:

- `http://127.0.0.1:8094/`
- `http://127.0.0.1:8094/laboratorio/`
- `http://127.0.0.1:8094/projetos/telemedicina/`

**Importante:** o motor 3D permanece dependente de Three.js obtido pela CDN `cdn.jsdelivr.net`. A página inicial, os documentos e a área editorial não precisam da CDN. Teste o WebGL, as texturas e as conexões no seu navegador antes de publicar.

## Publicação

Não foi realizado commit ou push. O ZIP contém a árvore do site para validação. Faça backup da versão atual e só então substitua o conteúdo do repositório de publicação, preservando `CNAME` e `.nojekyll`.
