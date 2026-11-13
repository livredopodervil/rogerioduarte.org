# Checklist técnico e editorial para geração por LLM

1. **Planejamento:** objetivo, público, tempo total, proporção, idioma, formato de saída e fonte dos dados; se desconhecidos, sinalizar suposições.
2. **Roteiro:** 1 ideia por cena; narrativa contínua; tempo de locução compatível, sem cortar frases. Evite leitura literal de textos longos.
3. **Layout:** margem segura, contraste ≥ 4.5:1 para texto de corpo quando possível, legibilidade em telefone, sem objetos fora do viewBox. Não bloqueie títulos com vídeos.
4. **Animação:** começo/termino definidos; duração positiva; interpoladores reconhecidos; alvos/IDs presentes no SVG; eixo de rotação correto; repetição/yoyo testados; movimentos espaciais com IDs existentes.
5. **Mídia:** arquivos locais existentes, direitos identificados, composição correta e resolução suficiente. Declarar ausência de ativos em vez de inventá-los.
6. **Jornalismo/ciência:** data, fontes, unidades, denominadores, níveis de evidência e distinção entre imagens de arquivo e fotos do evento.
7. **Validação estrutural:** `python -m json.tool projeto.json >/dev/null`; depois, se disponível, `python -c 'import json,schema; schema.normalize(json.load(open("projeto.json",encoding="utf-8")))'` no diretório do Estúdio; `jsonschema` opcional para conferir o contrato publicado.
8. **Validação de execução:** importar no editor, inspecionar começo/meio/fim, reproduzir apresentação com som, exportar MP4 e observar overlays, áudio e pivô. Testar navegador Android e desktop quando publicar HTML.
9. **Entrega:** JSON limpo e dependências de mídia; informe se a validação de runtime ainda não ocorreu. Nunca declare exportação ou publicação sem executá-la.

Exemplos em `../assets/`; para validar projetos use o schema da mesma versão, não um schema de outra branch.
