# GitHub

O GitHub reúne hospedagem de repositórios, revisão por pull requests, histórico e automações. Para este site, é o local de publicação dos arquivos estáticos.

## Fundamentos e método

Git registra alterações em commits e permite recuperar estados anteriores sem reescrever o histórico. Branches isolam experimentos; testes automatizados reduzem o risco de publicar uma alteração que afete outros módulos.

## Aplicação e exemplo

Um fluxo mínimo: criar branch de teste, modificar um módulo, executar vistoria, revisar diff e publicar com um commit de escopo limitado.

## Limites e próximos desenvolvimentos

Acrescentar exemplos de tags de backup, revisão de dependências e política de arquivos públicos versus privados.

## Recurso externo

- [Acessar GitHub](https://github.com/)

## Procedimento de investigação e revisão

Para utilizar GitHub no contexto de um projeto reproduzível, comece descrevendo a tarefa e o tipo de arquivo que entra e sai da operação. Faça um teste com dados fictícios, registre a URL ou a versão consultada e compare o resultado com uma alternativa local, quando disponível. Identifique se o serviço exige conta, conexão permanente, upload para terceiros ou autorização de uso. Só então integre o recurso a um fluxo automatizado. Esta sequência reduz dependências ocultas e facilita a substituição futura da ferramenta.
