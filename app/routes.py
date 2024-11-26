from flask import render_template
from app import app

@app.route('/')
def index():
    return render_template('base.html')

@app.route('/admin-settings')
def admin_settings():
    return render_template('admin.setting.html')

@app.route('/sourcing-extension')
def sourcing_extension():
    return render_template('sourcing_extension.html')