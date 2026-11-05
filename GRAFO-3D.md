# Grafo tridimensional de navegação — v16

O minimapa no canto superior direito é um segundo renderizador WebGL com câmera própria. Sua orientação é independente da câmera principal: permanece fixo na interface, mas o usuário pode girar os nós com arrasto, aproximar com roda do mouse e selecionar dodecaedros com toque ou clique.

Os nós e arestas são derivados exclusivamente de `modules/manifest.json`. O nó ativo é destacado. O menu lateral e os dodecaedros periféricos mostram somente vizinhos diretamente conectados ao nó ativo; o minimapa mostra a rede inteira para permitir navegação rápida, inclusive entre nós não adjacentes.

O código do minimapa reside em `createMiniGraph()` em `js/site-v10.js`. A instalação desta atualização altera apenas o núcleo de navegação (`index.html` e `js/site-v10.js`), sem substituir definições dos módulos, imagens, RSS ou manifesto. Atualizações futuras de módulos permanecem independentes.

Para criar novas ligações, edite somente `links` no manifesto. Para instalar um módulo, adicione seu JS e entrada no manifesto. Em caso de falha de WebGL, o menu lateral continua disponível.
