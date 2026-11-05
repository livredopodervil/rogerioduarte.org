#!/usr/bin/env python3
"""Atualiza cache do último vídeo público do YouTube. Executado pelo GitHub Actions."""
import json,re,urllib.request,xml.etree.ElementTree as ET,datetime,pathlib,sys
ROOT=pathlib.Path(__file__).resolve().parents[1]
OUT=ROOT/'data/social-latest.json'
URL='https://www.youtube.com/@dr.rogerioduarte'
def get(url):
    req=urllib.request.Request(url,headers={'User-Agent':'Mozilla/5.0 (compatible; PortalRSS/1.0)'})
    with urllib.request.urlopen(req,timeout=25) as response:return response.read().decode('utf-8','replace')
def main():
    page=get(URL)
    m=(re.search(r'"channelId"\s*:\s*"(UC[\w-]{22})"',page) or re.search(r'"externalId"\s*:\s*"(UC[\w-]{22})"',page) or re.search(r'https://www.youtube.com/channel/(UC[\w-]{22})',page) or re.search(r'<meta[^>]+itemprop="channelId"[^>]+content="(UC[\w-]{22})"',page))
    if not m:raise RuntimeError('Não foi possível identificar o channelId público')
    feed=get('https://www.youtube.com/feeds/videos.xml?channel_id='+m.group(1))
    root=ET.fromstring(feed)
    ns={'a':'http://www.w3.org/2005/Atom','yt':'http://www.youtube.com/xml/schemas/2015'}
    videos=[]
    for item in root.findall('a:entry',ns):
        vid=item.findtext('yt:videoId',namespaces=ns)
        if not vid or not re.fullmatch(r'[\w-]{11}',vid):continue
        videos.append({'id':vid,'title':item.findtext('a:title',default='',namespaces=ns),'published':item.findtext('a:published',default='',namespaces=ns)})
    if not videos:raise RuntimeError('Feed sem vídeos; cache anterior preservado')
    payload={'youtube':{'updated':datetime.datetime.now(datetime.timezone.utc).isoformat(),'channelId':m.group(1),'videoId':videos[0]['id'],'videos':videos[:8]}}
    OUT.write_text(json.dumps(payload,ensure_ascii=False,indent=2)+'\n')
    print('Vídeos:',len(videos))
if __name__=='__main__':
    try:main()
    except Exception as e:print('Falha na atualização (cache anterior preservado):',e,file=sys.stderr);sys.exit(1)
