from flask import Blueprint, request, render_template, jsonify
import os

agent_bp = Blueprint('agent', __name__, url_prefix='/agent')

@agent_bp.route('/', methods=['GET', 'POST'])
def agent_interface():
    if request.method == 'POST':
        page_name = request.form['page_name']
        content = request.form['content']
        filename = f"app/pages/{page_name}.py"
        with open(filename, 'w') as f:
            f.write(f"def view():\n    return '''{content}'''")
        return jsonify({"status": "success", "message": f"{page_name} page created."})
    return render_template('agent.html')