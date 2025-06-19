from flask import Flask
import json
import importlib
from livereload import Server

app = Flask(__name__)

with open('app/nav_config.json') as f:
    routes = json.load(f)

for route in routes:
    file_name = route['file']
    path = route['route']
    mod = importlib.import_module(f'app.pages.{file_name}')
    view_func = getattr(mod, 'view')
    app.add_url_rule(path, file_name, view_func)

@app.route('/')
def home():
    links = [f"<li><a href='{r['route']}'>{r['name']}</a></li>" for r in routes]
    return "<ul>" + "\n".join(links) + "</ul>"

if __name__ == '__main__':
    server = Server(app.wsgi_app)
    server.watch('main.py')
    server.watch('app/nav_config.json')
    server.watch('app/pages/*.py')
    server.serve(open_url_delay=True, port=5000)