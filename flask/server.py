import time
from flask import Flask, request
from flask_cors import CORS
from app import main_func

app = Flask(__name__)
CORS(app)

@app.route('/', methods=['POST'])
def index():
    data = request.get_json()
    url = data['url']
    print(data)
    return main_func(url)

if(__name__=='__main__'):
    app.run(host='0.0.0.0', port=2000, debug=True)