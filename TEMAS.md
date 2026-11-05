# Temas visuais independentes — v17

Cada módulo define um objeto `theme` em `modules/<id>.js`, contendo `background`, `base`, `mid`, `accent`, `text`, `muted`, `panel` e `panel2`. Ao navegar para um nó, o motor aplica as variáveis CSS e a imagem de fundo, inclusive no leitor RSS e nas páginas de detalhes.

As imagens de fundo são arquivos SVG em `assets/themes/<id>.svg`. Para trocar apenas a imagem de um módulo, substitua seu SVG; para mudar sua paleta, edite somente o objeto `theme` do módulo. Os demais módulos e o núcleo permanecem intactos.

As transições da câmera e a miniatura 3D continuam como na v16. Não há necessidade de alterar `modules/manifest.json` para atualizar a aparência de módulos existentes.
