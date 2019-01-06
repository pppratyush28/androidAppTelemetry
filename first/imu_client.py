import socketio
import ahrs
import json
import csv

fileName = 'imu.csv'
lap = 1
# WARNING - INITIALIZE PROPERLY - IP Address
sio = socketio.Client()

def writeData(arr=[],*args):
    with open(fileName,'a+') as f:
        output = csv.writer(f,dialect='excel')
        output.writerows([arr])
    f.close()

def writeLabel():
    with open(fileName,'a+') as f:
        output = csv.writer(f,dialect='excel')
        labels = {'roll','pitch','yaw','yaw_vel','yaw_accel','accelX','accelY','accelZ'}
        output.writerows([labels])
    f.close()

@sio.on('connect')
def on_connect():
    print('connection established')

@sio.on('lap_change')
def lap_change():
    global lap
    print("Lap Change")
    lap = lap + 1
    y = "Lap" + str(lap)
    writeData(y)
    writeLabel()
    writeData(fetchData)



def fetchData():

    rpy = {
        "roll" : ahrs.roll(),
        "pitch" : ahrs.pitch(),
        "yaw" : ahrs.yaw(),
        "yaw_vel" : ahrs.yaw_parameters()[0],
        "yaw_accel" : ahrs.yaw_parameters()[1],
        "accelX" : ahrs.accelerometer()[0],
        "accelY" : ahrs.accelerometer()[1] - ahrs.yaw_parameters()[1]*ahrs.radius,
        "accelZ" : ahrs.accelerometer()[2]
    }
    x = {ahrs.roll(),ahrs.pitch(),ahrs.yaw(),ahrs.yaw_parameters()[0],ahrs.yaw_parameters()[1],ahrs.accelerometer()[0],ahrs.accelerometer()[1] - ahrs.yaw_parameters()[1]*ahrs.radius,ahrs.accelerometer()[2]}
    writeData(x)
    rpy_json = json.dumps(rpy)
    #print(rpy_json)
    return rpy_json

if __name__ == "__main__":
    writeLabel()
    sio.connect('http://localhost:3000')
    while True:
        sio.emit('imu', fetchData())
    