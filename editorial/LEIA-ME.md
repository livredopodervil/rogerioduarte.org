# Planos de conteúdo — rogerioduarte.org

**Base usada:** `rogerioduarte-site-home-og-v2.zip`, cópia do site fornecida anteriormente nesta conversa. Alterações remotas posteriores não estão incorporadas automaticamente.

Este diretório reúne **72 pautas independentes**, uma por face dos seis dodecaedros, mais seis planos de área. Cada pauta contém pergunta, estrutura temática, texto-base, exemplo, cuidados, critérios de publicação e relação com a página HTML pública.

O conteúdo desenvolvido foi publicado em `/conteudos/`, com uma página por face. Os oito documentos integrais de `/projetos/telemedicina/docs/` foram preservados. As fontes RSS e os widgets de redes sociais continuam dinâmicos; seus links podem falhar por regras de terceiros.

## Critérios editoriais

1. Separar apresentação pessoal, conhecimento geral, projetos demonstrativos e serviços eventualmente prestados.
2. Não inventar publicações, dados científicos, resultados de sistemas, certificações, permissões ou atendimentos clínicos.
3. Indicar fontes primárias e referências quando a afirmação exigir comprovação.
4. Publicar mudanças em commits pequenos por arquivos, nunca `git push --force`.
5. Permitir recuperação da versão anterior por tag ou commit reversível.

## Prioridades

**P1 — finalísticas:** Núcleo e Saúde (24 artigos completos); verificação de acessibilidade e fontes.

**P2 — tecnologia:** Ferramentas e Telemedicina; documentação de execução, custos e conformidade condicionados a atualização.

**P3 — acervo e comunicação:** Notícias e Conexões, com links e dados atualizáveis sem exigir republicar o motor 3D.

## Arquitetura

- `modules/manifest.json`: grafo de módulos e ligações.
- `modules/<id>.js`: opções e rotas das faces, texto do painel.
- `conteudos/<id>/<slug>.html`: página pública de leitura.
- `editorial/<id>/<slug>.md`: pauta e instruções de desenvolvimento.
- `editorial/<id>.md`: plano da área.
- `conteudos/index.html`: índice público das 72 entradas.

**Privacidade:** pautas públicas não incluem prompts de agentes, arquivos de backup, registros clínicos ou históricos privados.
