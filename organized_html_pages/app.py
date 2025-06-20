from flask import Flask, send_from_directory
import os

app = Flask(__name__)

HTML_DIR = os.path.dirname(os.path.abspath(__file__))

@app.route('/')
def index():
    # List all HTML files as links
    files = [f for f in os.listdir(HTML_DIR) if f.endswith('.html')]
    links = ''.join(f'<li><a href="/{f}">{f}</a></li>' for f in files)
    return f"<h1>HTML Page Preview</h1><ul>{links}</ul>"

@app.route('/<path:filename>')
def serve_html(filename):
    if filename.endswith('.html'):
        return send_from_directory(HTML_DIR, filename)
    return 'File not found', 404

if __name__ == '__main__':
    app.run(debug=True, port=5000) 