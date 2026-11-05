# Correção do módulo azul — v19

- `modules/social-viewer.js`: player YouTube usando `data/social-latest.json`; fallback para a playlist pública de uploads quando o identificador do canal estiver disponível; widget oficial X inicializado por `createTimeline` após abrir a seção; limpeza ao fechar.
- `scripts/update_social.py`: melhora a extração do identificador do canal e grava `videoId`, `videos` e `channelId`.
- `.github/workflows/update-social.yml`: executa o atualizador periodicamente e manualmente.

## Atenção

O cache incluído no pacote ainda está vazio. O primeiro vídeo depende de uma execução bem-sucedida do workflow. Em GitHub: Actions → Atualizar conteúdo social → Run workflow. A permissão de escrita do workflow deve estar habilitada para publicar o JSON.

O X pode bloquear a timeline em navegadores ou contas específicos; a interface mantém um link para o perfil. O Facebook não permite widget de página para todo perfil pessoal.

Instalação incremental sobre v18: copie `modules/social-viewer.js`, `scripts/update_social.py` e `js/site-v10.js` e atualize a query string do script em `index.html` para `v=19-social-fix`.
