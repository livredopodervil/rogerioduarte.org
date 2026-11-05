# Módulo azul — painéis de conteúdo (v18)

- **Blog:** feed JSONP público do Blogger, atualizado ao abrir ou clicar em Atualizar.
- **YouTube:** vídeo mais recente obtido do feed oficial do canal por `scripts/update_social.py`; o GitHub Actions executa a cada três horas e grava `data/social-latest.json`. Pode ser necessário habilitar permissões de escrita de workflows no GitHub. A atualização depende de acesso público ao feed.
- **X:** widget oficial da timeline; pode falhar por restrições de privacidade, navegador ou plataforma.
- **Facebook:** plugin de página oficial; perfis pessoais podem não ser incorporáveis.
- **Instagram:** perfil público não possui widget oficial de timeline geral sem autenticação; mostra explicação e link.
- **Outras faces:** reutilizam os painéis dos canais correspondentes.

O motor 3D e os módulos verde, amarelo, branco e vermelho não foram alterados. Apenas o adaptador de seções no `js/site-v10.js` foi ampliado para aceitar a propriedade opcional `widgets` de qualquer módulo.

**Teste local:** `python servidor_teste.py`. Para testar o cache do YouTube: `python scripts/update_social.py` (requer internet). A atualização do vídeo não funciona automaticamente no servidor local sem executar esse script.
