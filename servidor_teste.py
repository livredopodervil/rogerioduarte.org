#!/usr/bin/env python3
"""Servidor de teste local com proxy RSS, não destinado a hospedagem GitHub Pages."""
from http.server import ThreadingHTTPServer, SimpleHTTPRequestHandler
from urllib.parse import urlparse, parse_qs
from urllib.request import Request, urlopen
from urllib.error import HTTPError
from pathlib import Path
import importlib.util

class Handler(SimpleHTTPRequestHandler):
    def do_GET(self):
        if urlparse(self.path).path != '/api/rss':
            return super().do_GET()
        url = parse_qs(urlparse(self.path).query).get('url',[''])[0]
        host = urlparse(url).hostname or ''
        if urlparse(url).scheme != 'https' or not host or host in ('localhost','127.0.0.1'):
            self.send_error(400,'URL inválida');return
        try:
            req=Request(url,headers={'User-Agent':'Mozilla/5.0 (compatible; RSSReader/1.0)','Accept':'application/rss+xml,application/atom+xml,application/xml,text/xml,*/*'})
            with urlopen(req,timeout=12) as r:
                data=r.read(2_000_001)
                if len(data)>2_000_000:raise ValueError('Feed muito grande')
            self.send_response(200);self.send_header('Content-Type','application/xml; charset=utf-8');self.send_header('Cache-Control','no-store');self.end_headers();self.wfile.write(data)
        except Exception as e:
            self.send_error(502,str(e))

print('Abra http://127.0.0.1:8089/')
ThreadingHTTPServer(('127.0.0.1',8089),Handler).serve_forever()
