from flask import Flask, session
import json
import importlib
from livereload import Server
from app.auth import auth_bp

app = Flask(__name__)
app.secret_key = 'changeme-for-production'
app.register_blueprint(auth_bp)

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
    user = session.get('user')
    links = [f"<li><a href='{r['route']}'>{r['name']}</a></li>" for r in routes]
    auth_links = "<li><a href='/logout'>Logout</a></li>" if user else "<li><a href='/login'>Login</a></li> <li><a href='/register'>Register</a></li>"
    return f"<h2>Welcome {user if user else 'Guest'}</h2><ul>" + "\n".join(links) + auth_links + "</ul>"

if __name__ == '__main__':
    server = Server(app.wsgi_app)
    server.watch('main.py')
    server.watch('app/nav_config.json')
    server.watch('app/pages/*.py')
    server.serve(open_url_delay=True, port=5000)