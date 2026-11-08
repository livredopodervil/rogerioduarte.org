#!/usr/bin/env python3
"""Gate de regressão: impede publicar um motor sem controle pela miniatura 3D.

Teste estático de contrato, não substitui teste tátil/WebGL em navegador real.
"""
from pathlib import Path
import sys
root=Path(__file__).resolve().parent.parent
js=(root/'js/site-v10.js').read_text(encoding='utf-8')
lab=(root/'laboratorio/index.html').read_text(encoding='utf-8')
required={
 'Marcador de sincronização':'RD-STUDIO-MINI-SYNC-V1',
 'Arraste da miniatura':'miniRotate(dx,dy)',
 'Pinça multitoque':'fingers.size===2',
 'Zoom sincronizado':'miniZoom(pinchDistance/d)',
 'Controle da cena':'w.group.position.copy(w.goalPosition)',
 'Estado de interação':'miniInteracting',
 'Navegação por toque':'if(hit)travel(hit.object.userData.index)',
 'Artigos por face':'RD-EDITORIAL-LINKFIX-V1',
 'Leitura de conteúdo':'mountEditorialContent(p,i)',
 'Catálogo de artigos':'import contentPages from',
}
errors=[]
for label,fragment in required.items():
    if fragment in js:print('OK  ',label)
    else:
        print('ERRO',label)
        errors.append(label)
if 'editorial-v52' not in lab:
    errors.append('Cache HTML do motor sem versão v5.2')
if errors:
    print('VISTORIA MINIATURA REPROVADA:',', '.join(errors))
    sys.exit(1)
print('VISTORIA MINIATURA E NAVEGAÇÃO APROVADA (estática)')
