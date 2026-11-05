#!/usr/bin/env bash
set -euo pipefail
REPO="${REPO:-$HOME/rogerioduarte-publicacao}"
SOURCE="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
[[ -d "$REPO/.git" ]] || { echo "ERRO: repositório não encontrado: $REPO"; exit 1; }
[[ -f "$SOURCE/.github/workflows/update-social.yml" && -f "$SOURCE/index.html" ]] || { echo 'ERRO: pacote incompleto'; exit 1; }
cd "$REPO"
[[ -z "$(git status --porcelain)" ]] || { echo 'ERRO: há alterações locais no repositório. Faça commit ou backup antes.'; exit 1; }
git pull --ff-only origin main
BACKUP="backup-antes-v19-$(date +%Y%m%d-%H%M%S)"
git branch "$BACKUP"
echo "Backup Git: $BACKUP"
python - "$SOURCE" "$REPO" <<'PY'
import pathlib, shutil, sys
src, dst = map(pathlib.Path, sys.argv[1:])
for path in src.rglob('*'):
    relative=path.relative_to(src)
    if '.git' in relative.parts or relative.name == 'INSTALAR-E-PUBLICAR.sh':
        continue
    target=dst/relative
    if path.is_dir(): target.mkdir(parents=True,exist_ok=True)
    elif path.is_file():
        target.parent.mkdir(parents=True,exist_ok=True)
        shutil.copy2(path,target)
(dst/'CNAME').write_text('rogerioduarte.org\n')
(dst/'.nojekyll').touch()
PY
python -m py_compile scripts/update_social.py
if command -v node >/dev/null 2>&1; then
  for f in js/*.js modules/*.js; do [[ -f "$f" ]] && node --check "$f" || true; done
fi
git add -A
if git diff --cached --quiet; then
  echo 'Nenhuma alteração detectada.'
else
  git commit -m 'feat: publicar portal v19 e atualizar integrações sociais'
  git push origin main
fi
echo 'Workflow publicado; tentando iniciar atualização do YouTube.'
if command -v gh >/dev/null 2>&1; then
  if gh workflow run update-social.yml -R livredopodervil/rogerioduarte.org --ref main; then
    echo 'Atualização solicitada. Consulte: gh run list -R livredopodervil/rogerioduarte.org --limit 5'
  else
    echo 'O site foi enviado, mas o workflow não iniciou. Aguarde a indexação do GitHub e tente novamente.'
  fi
else
  echo 'gh não instalado: execute o workflow manualmente no GitHub Actions.'
fi
echo 'Site: https://rogerioduarte.org/?v=19'
