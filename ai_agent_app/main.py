from flask import Flask, render_template, request, session, redirect, url_for
from app.agent import agent_bp
from flask_livereload import Server

app = Flask(__name__)
app.secret_key = 'your_secret_key'
app.register_blueprint(agent_bp)

@app.route('/')
def index():
    return redirect('/agent')

if __name__ == '__main__':
    server = Server(app.wsgi_app)
    server.serve(open_url_delay=True)