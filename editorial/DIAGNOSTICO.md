# Diagnóstico editorial da versão-base do portal

**Origem:** pacote `rogerioduarte-site-home-og-v2.zip`, disponibilizado anteriormente na conversa. **Não corresponde necessariamente ao último commit do GitHub**; edições posteriores do RD Studio devem ser preservadas mediante integração incremental.

| Área | Situação encontrada | Intervenção nesta edição | Desenvolvimento posterior |
|---|---|---|---|
| Página inicial | Boa hierarquia visual, mas poucas rotas para aprofundar assuntos. | Nova seção Caderno de estudos com seis coleções temáticas. | Ligar projetos a registros editoriais versionados, sem prometer aplicações ainda não verificadas. |
| Núcleo (12 faces) | Painéis resumidos e parte do conteúdo armazenada dentro do próprio motor JS. | Doze ensaios com fundamentos, exemplos e limites; faces ligadas à leitura integral. | Acrescentar diagramas, bibliografia, código e demonstrações reproduzíveis. |
| Saúde (12 faces) | Rótulos e um texto genérico sem artigos para a maioria das faces. | Doze ensaios educacionais com contextualização e discussão metodológica. | Revisão clínica e normativa por fonte primária antes de recomendações assistenciais específicas. |
| Ferramentas | URLs externas úteis com descrições curtas. | Doze guias contextuais, riscos de uso e exemplos de aplicação. | Revisar URL, licença, disponibilidade e exemplos gravados em captura real. |
| Notícias do mundo | Leitores RSS vivos, sem camada editorial explicando como avaliar as fontes. | Doze guias de leitura crítica acessíveis sem substituir RSS. | Citações datadas, comparação de notícias e avaliação dos feeds em execução. |
| Conexões e comunicação | Doze atalhos, vários apontando para os mesmos canais. | Doze textos sobre formatos de publicação, arquivo e rastreabilidade, preservando widgets. | Alimentar o índice com itens específicos reais e documentados, sem duplicação de atalhos. |
| Telemedicina | Acervo existente de oito documentos e simuladores, mais avançado que as demais seções. | Doze artigos de orientação ligados aos estudos existentes. | Revisar valores, fontes comerciais, legislação e requisitos de certificação vigentes. |
| Portfólio | Não havia `projetos/index.html` no pacote-base; ferramentas do RD Studio podem criar a página no worktree atual. | Página inicial de referência com três projetos identificáveis; instalador **preserva** portfólio existente. | Importar somente arquivos públicos indispensáveis, com versão e captura real. |
| Laboratório 3D | As faces de Saúde/Núcleo não tinham leitura integral; as demais dependiam de widgets/links. | Alteração pontual no motor que adiciona ligação para artigos, sem substituir o renderizador ou os feeds. | Validar toque, zoom, transições e menu de face em Android antes de publicar. |

## Observações sobre a qualidade do conteúdo

Os textos novos são **ensaios originais de caráter editorial**. Não alegam resultados experimentais, certificações, serviços implementados nem credenciais adicionais. São material inicial para publicação e aprofundamento, **não uma revisão bibliográfica concluída**. As fichas em `editorial/` registram próximos passos e critérios de aceite para cada face.

## Condição de publicação

Use o ZIP completo para teste em um diretório novo. Para atualizar um worktree que já contém aplicativos importados, **use apenas o instalador incremental**: ele não substitui `/projetos/` existente, o manifesto nem as texturas do Studio. Execute Vistoria e revise alterações antes de qualquer push.
