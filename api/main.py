from operator import truediv
import debugpy
from flask import Flask, request, json
from flask_cors import CORS
from flask_socketio import SocketIO, disconnect, emit
from UserComponent.Controller.UserController import UserController
from LostComponent.Controller.LostController import LostController
from FoundComponent.Controller.FoundController import FoundController
from MatchComponent.Controller.MatchController import checkMatches
from apscheduler.schedulers.background import BackgroundScheduler
from NotificationComponent.Controller.NotificationController import getMatchesForOnlineUsers

app = Flask(__name__)
cors = CORS(app)

socketio = SocketIO(app)
socketio.init_app(app, cors_allowed_origins="*")


def sensor():
    checkMatches()
    notificationObjects = getMatchesForOnlineUsers()
    if notificationObjects:
        for data in notificationObjects:
            handle_json(data)


sched = BackgroundScheduler(daemon=True)
sched.add_job(sensor, 'interval', seconds=5)
sched.start()

if __name__ == '__main__':
    socketio.run(app)


@socketio.on('message')
def handle_message(data):
    UserController.controlOnline(data)


def handle_json(json):
    socketio.emit('json', json)


@app.route("/")
def home():
    return ""


@app.route('/api/register/', methods=['POST'])
def register():
    body = json.loads(request.data)
    res = UserController.controlReg(body)
    response = {'response': res}
    return response


@app.route('/api/login/', methods=['POST'])
def login():
    body = json.loads(request.data)
    res = UserController.controlLog(body)
    response = {'response': res}
    return response


@app.route('/api/lost/', methods=['POST'])
def lost():
    body = json.loads(request.data)
    res = LostController.insertRecord(body)
    response = {'response': res}
    return response


@app.route('/api/found/', methods=['POST'])
def found():
    body = json.loads(request.data)
    res = FoundController.insertRecord(body)
    response = {'response': res}
    return response


debugpy.listen(("0.0.0.0", 10001))
print("⏳ VS Code debugger can now be attached, press F5 in VS Code ⏳", flush=True)
debugpy.wait_for_client()
print("🎉 VS Code debugger attached, enjoy debugging 🎉", flush=True)
