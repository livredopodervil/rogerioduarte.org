# Desenvolvimento de software e arquitetura

- Área: **Núcleo**
- Face: **03/12**
- Rota pública: `/conteudos/nucleo/computacao.html`
- Origem editorial: pacote de site disponibilizado na conversa; texto-base autoral de 2026-11-08.
- Estado: **texto-base redigido; revisão crítica e bibliográfica pendente**.

## Pergunta orientadora

Construir software significa transformar requisitos variáveis em componentes verificáveis, com interfaces, regras e responsabilidades explícitas.

## Tópicos e desenvolvimento

### 1. Problema antes da solução

O requisito deve descrever comportamento observável. Antes de escolher uma biblioteca, convém distinguir necessidades do usuário, restrições do dispositivo, riscos de manutenção e critérios de sucesso. Uma interface elegante não compensa um fluxo funcional ambíguo.

**Instrução editorial:** acrescentar definição de termos na primeira ocorrência, exemplos verificáveis, limites da evidência e links internos pertinentes. Não atribuir novos resultados ao autor sem documento de origem.

### 2. Módulos e contratos

Separar a camada visual, o estado, os dados e a persistência permite substituir uma parte sem alterar as demais. Manifests, esquemas JSON e testes de contrato formalizam essas fronteiras. Em aplicações estáticas, um catálogo pode ser a fonte de verdade para páginas e navegação.

**Instrução editorial:** acrescentar definição de termos na primeira ocorrência, exemplos verificáveis, limites da evidência e links internos pertinentes. Não atribuir novos resultados ao autor sem documento de origem.

### 3. Testes, versões e recuperação

Testes de unidade cobrem regras locais; integração valida contratos; navegação real revela problemas de interface. Commits pequenos, cópias de segurança e publicação reversível tornam o desenvolvimento auditável. Um release não deve depender de comandos destrutivos ou de um pacote opaco.

**Instrução editorial:** acrescentar definição de termos na primeira ocorrência, exemplos verificáveis, limites da evidência e links internos pertinentes. Não atribuir novos resultados ao autor sem documento de origem.

## Exemplo ou demonstração planejada

Exemplo editorial: documentar o fluxo de um módulo do portal, do manifesto ao elemento visual, até a publicação por commit seletivo.

## Cuidados e revisão

Não divulgar segredos de infraestrutura, tokens ou arquivos privados em repositórios públicos.

## Checklist de publicação

- [ ] Conferir referências e documentos oficiais quando houver afirmações verificáveis.
- [ ] Separar dado observado, hipótese, interpretação e opinião.
- [ ] Acrescentar data e versão aos exemplos de software.
- [ ] Revisar links e licenças de mídias.
- [ ] Confirmar acessibilidade (títulos, contraste, texto alternativo).
- [ ] Conferir navegação entre biblioteca, atlas 3D e página original.
- [ ] Executar vistoria do RD Studio e revisar o diff antes de publicar.

## Referências e próximas fontes a levantar

- Documentação e código do projeto relacionado, quando houver.
- Fontes primárias ou diretrizes oficiais pertinentes ao tema.
- Literatura metodológica adequada à afirmação, com identificação de ano e autoria.
