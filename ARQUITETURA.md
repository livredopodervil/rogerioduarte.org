> **Atualização da estrutura pública (novembro de 2026):** a entrada `/` agora é uma página editorial pessoal. O portal tridimensional anteriormente servido pela raiz está preservado em `/laboratorio/`. As descrições antigas de `index.html` abaixo referem-se ao arquivo que agora se chama `laboratorio/index.html`. Consulte `README-NOVA-HOME.md` para rotas e mudanças de integração.

# Portal em Grafo 3D — Arquitetura e construção

## 1. Objetivo

Portal web tridimensional em que **cada dodecaedro representa um módulo independente**. O módulo selecionado ocupa o centro da cena; os módulos conectados são exibidos ao redor, menores. A navegação é um **grafo** de nós e arestas, e deve poder crescer recursivamente: cada nó pode ter novos nós filhos ou ligações com nós existentes. O projeto deve ser independente de SpatialSeed; não modificar seu repositório.

## 2. Experiência de navegação

- O dodecaedro central tem 12 faces pentagonais clicáveis. Cada face abre uma página, leitor RSS, aplicativo ou coleção do próprio módulo.
- Os dodecaedros vizinhos devem ser menores, visíveis e separados fisicamente; nenhum elemento deve cobrir outro ou os controles.
- Ao escolher um vizinho ou nó do minimapa molecular no canto superior, a câmera **viaja rapidamente com interpolação suave**, gira e passa a mirar o novo centro; a escala e a distribuição são atualizadas sem inversões.
- A nova página adota cor, título, menus e conteúdos do módulo selecionado. Usar uma única família tipográfica até decisão posterior.
- As faces devem ser orientadas com **um vértice do pentágono para cima**; o título deve ficar um pouco abaixo do centro da face.
- O grafo deve oferecer navegação direta e indicar o nó ativo. Suportar dispositivos móveis, toque, rotação e zoom.

## 3. Separação de responsabilidades

- `index.html`: estrutura semântica, viewport e pontos de montagem.
- `js/site-v10.js`: motor 3D, câmera, geometria, eventos, animações e montagem de menus. É o motor compartilhado; mudanças nele devem preservar todos os módulos.
- `modules/*.js`: **configuração independente** de cada módulo, com ID estável, título, cor, menu, posição, fontes e caminho das texturas.
- `modules/graph.js`: arestas do grafo. Para escalar, evoluir para JSON declarativo com posições e ligações por ID, sem dependência de índices.
- `modules/rss-reader.js`: leitura e apresentação de RSS/Atom, com tratamento de falhas e segurança na renderização.
- `assets/modules/<id>/face-01.jpg` … `face-12.jpg`: texturas próprias de cada módulo.
- `assets/modules/<id>/atlas-4x3.jpg`: prancha de 12 quadrados em 4 colunas e 3 linhas, destinada à edição/arquivo.

## 4. Contrato de um módulo

Cada módulo exporta um objeto com `id`, `name`, `color`, `title`, `intro`, `subtitle`, `position`, `menu` (12 rótulos) e, opcionalmente, `feeds` (12 fontes) e `texturePath`. Exemplo:

```js
export default {
  id: 'conhecimento', name: 'Notícias do mundo',
  color: '#f6d963', position: [-9, 7, -10],
  texturePath: './assets/modules/conhecimento/face-{n}.jpg',
  menu: ['Mundo', 'ONU', 'Política', 'Economia', 'Conflitos',
         'Clima', 'Ciência', 'Tecnologia', 'Sociedade',
         'História', 'Cultura', 'Ideias'],
  feeds: [] // preencher com 12 objetos {name,rss,website}
};
```

`{n}` é substituído por `01` a `12`. Para trocar somente as imagens do amarelo, substitua os 12 JPEGs na pasta correspondente; para alterar títulos, links e fontes, edite apenas `modules/conhecimento.js`. O carregador compartilhado já reconhece `texturePath`.

**Nota:** nesta versão, o motor ainda importa explicitamente cinco módulos. A instalação de um **sexto** módulo exige registrar o novo módulo no motor e no grafo; a meta arquitetural é migrar esse registro para manifesto declarativo, permitindo instalação sem alterações no núcleo. Não afirmar que o registro dinâmico já existe.

## 5. Texturas e mapeamento

Cada módulo tem uma prancha 4×3 com **12 quadrados de mesmo tamanho**, sem margens entre eles. Cada quadrado é exportado como `face-01.jpg` a `face-12.jpg` (512×512 px neste pacote). O motor aplica cada imagem à face correspondente por coordenadas UV. O título funcional é desenhado sobre a textura pelo navegador, mantendo legibilidade e possibilitando tradução. A prancha é um recurso de edição, não uma textura única aplicada ao sólido.

## 6. Notícias RSS

O módulo amarelo reúne 12 fontes internacionais. Cada face abre o leitor RSS da fonte correspondente. O navegador não pode contornar CORS por si só; o servidor local `servidor_teste.py` pode atuar como intermediário no teste. Para produção estável em GitHub Pages, recomenda-se uma rotina externa (por exemplo, GitHub Actions) que busque e normalize os feeds em JSON estático, com cache, data de atualização, links originais e tratamento de indisponibilidade. Não criar manchetes fictícias. Sanitizar conteúdo externo e nunca inserir HTML não confiável sem limpeza.

## 7. Critérios de aceitação

1. O módulo selecionado é visivelmente maior que os periféricos em repouso e durante a transição.
2. Dodecaedros, minimapa, títulos e menus não se sobrepõem nos modos retrato e paisagem.
3. A câmera chega ao nó correto, sem saltos ou mudança abrupta de orientação.
4. Cada módulo carrega exclusivamente sua configuração e suas 12 texturas.
5. A alteração do módulo amarelo não muda os outros módulos.
6. As 12 faces abrem os conteúdos corretos, e falhas RSS são explícitas.
7. O grafo representa as ligações reais e permite retornar ao nó inicial.
8. O site funciona por HTTPS no GitHub Pages, preservando `CNAME` e `.nojekyll`.

## 8. Desenvolvimento e publicação

Executar um servidor HTTP local; não abrir `index.html` diretamente por `file://` por causa dos módulos ES. Testar no Android e no desktop. Manter versões de teste separadas da publicação. Antes de publicar, validar sintaxe JS, arquivos referenciados, layout em duas orientações, RSS e regressões de navegação. A publicação deve preservar o domínio personalizado e não alterar outros repositórios.

## 9. Manifesto dinâmico (v14)

O motor agora lê `modules/manifest.json` em tempo de carregamento e importa os arquivos listados, sem lista fixa de módulos no JavaScript central. Para instalar um novo módulo, copie `modules/<id>.js` e suas imagens em `assets/modules/<id>/`, acrescente `{ "id": "<id>", "src": "./modules/<id>.js" }` à lista `modules` do manifesto e defina as arestas em `links`. Não edite `js/site-v10.js` nem os módulos existentes.

Contrato: `id`, `name`, `color`, `rgb`, `title`, `intro`, `subtitle`, `position` (3 números), `menu` (12 rótulos), `texturePath` (opcional) e `pages` (opcional, 12 objetos `{title,url,description}`). Links externos abrem em nova aba com `noopener noreferrer`. Os endereços de serviços podem mudar; verificar os links antes da publicação. O núcleo continua dependente de Three.js via CDN e exige atualização se o contrato mudar; modularidade não significa atualização automática remota.

**Módulo branco:** `modules/sistemas.js` e `assets/modules/sistemas/face-01.jpg` a `face-12.jpg`. A segunda face usa um endereço de demonstração do editor SpatialSeed, que precisa ser confirmado na implantação.
