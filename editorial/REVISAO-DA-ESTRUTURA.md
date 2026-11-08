# Revisão da estrutura e prioridades — 2026-11-08

## O que foi encontrado

- **Núcleo**: 12 faces apresentadas anteriormente com texto resumido e tópicos curtos. Agora cada face possui página individual e pauta editorial.
- **Saúde**: 12 faces sem `pages` próprios; o motor exibia descrições genéricas. Agora há 12 artigos e navegação contextual.
- **Ferramentas**: links externos funcionais com descrições curtas; foram mantidos e ganharam páginas de contextualização e recomendações de uso seguro.
- **Notícias do mundo**: 12 leitores RSS dependentes de terceiros; seus menus usam `map(f => f.name)` e já eram rótulos textuais na base analisada. Os feeds foram preservados; foram acrescentados guias de leitura crítica.
- **Conexões**: widgets e URLs de redes externas permanecem como estavam. Foram criadas páginas autônomas que não dependem dos widgets.
- **Telemedicina**: 12 faces com textos e oito documentos técnicos completos. Documentação integral preservada e vinculada às novas páginas de contexto.

## O que mudou no site

Uma biblioteca estática com 72 páginas, um índice e links para o laboratório foi acrescentada. O leitor das faces foi generalizado para apresentar parágrafos e links em todos os módulos, sem substituir os leitores RSS ou as redes sociais. A página inicial inclui seção Biblioteca.

## Verificações editoriais ainda necessárias

- Confirmar URLs e condições dos serviços externos.
- Revisar citações, normas e dados financeiros atuais antes de substituir estudos existentes.
- Revisar os textos com experiência prática, especialmente nas áreas clínicas.
- Inspecionar acessibilidade e gestos reais do WebGL no Android.
- Integrar por merge seletivo se o GitHub tiver commits posteriores ao ZIP de origem.

## Critério de pronto

Conteúdo legível sem WebGL; cada face com link para página; nenhum arquivo privado importado; vistoria estática aprovada; diferenças revisadas no Studio; publicação mediante confirmação.
