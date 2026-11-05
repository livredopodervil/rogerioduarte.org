# Instalação independente de módulos

1. Copie a pasta `assets/modules/<id>/` e `modules/<id>.js`.
2. Atualize **somente** `modules/manifest.json` com o novo ID, caminho e ligações.
3. Recarregue a página. O motor lê o manifesto e carrega os módulos automaticamente.

Para atualizar apenas o módulo branco de uma instalação v14 ou posterior, substitua `modules/sistemas.js` e `assets/modules/sistemas/` sem tocar no núcleo.

O endereço do editor SpatialSeed é configurável em `modules/sistemas.js`; confirme a URL real antes de publicar.
