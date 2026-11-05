# Rotas canônicas — versão 20

As rotas são definidas explicitamente em **cada módulo**, sem gerar slugs a partir de títulos.

## Formato

- `https://rogerioduarte.org/#/nucleo`
- `https://rogerioduarte.org/#/futuro/youtube`
- `https://rogerioduarte.org/#/futuro/x`
- `https://rogerioduarte.org/#/conhecimento/al-jazeera`
- `https://rogerioduarte.org/#/sistemas/spatialseed`

O identificador do módulo e os doze identificadores das seções ficam em `route` dentro de `modules/<id>.js`:

```js
route: {
  slug: 'futuro',
  sections: ['facebook', 'blog', 'youtube', 'x', 'instagram',
    'publicacoes', 'videos', 'comunidade', 'fotografias',
    'atualizacoes', 'arquivo', 'contato']
}
```

## Contrato

- `slug` é único entre módulos; os 12 `sections` são únicos dentro do módulo.
- Cada `sections[i]` corresponde a `menu[i]`, `pages[i]`, `widgets[i]` ou `feeds[i]` e à face `i`.
- Os slugs são estáveis e independentes de nomes exibidos, imagens e temas.
- O núcleo valida os slugs ao carregar o manifesto. Adicionar um módulo exige apenas registrá-lo no manifesto e fornecer seu `route`.
- Navegar pelo menu, faces ou grafo altera o endereço; Voltar/Avançar e acesso direto restauram módulo e seção.
- URLs desconhecidas não são redirecionadas silenciosamente.
- A URL com `#` funciona no GitHub Pages sem configuração de servidor. Não representa um arquivo HTML independente.

## Atualização

Substitua o arquivo do módulo para alterar seu conteúdo; **preserve os slugs publicados** para não quebrar links externos. Para renomear slugs futuramente, introduza aliases explícitos em uma versão posterior.
