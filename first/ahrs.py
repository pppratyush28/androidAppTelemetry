import serial
import datetime
import time
import globalv
import string
import numpy
 
serimu = globalv.serimu()

#Utility constants
cmd_yaw = "yaw di.\r\n"
cmd_roll = "roll di.\r\n"
cmd_pitch = "pitch di.\r\n"
cmd_accelero = "accelp di.\r\n"
cmd_gyro = "gyrop di.\r\n"
cmd_temp = "temperature di.\r\n"
radius = 0.85

#Error Variables
error_yaw=-0.0
error_pitch=0.0
error_ax=-0.0
error_ay=-0.0
error_az=0.0
error_roll=-0.0
error_temp=0.0

#Utility function
def time1():
    t = datetime.datetime.now()
    t = str(t)
    t = t[17:]
    t = float(t)
    return t
 
 #initial varaibles
time_initial=0
yaw_initial=0
yaw_velocity_initial=0

#Returns the Yaw
def yaw():
    flag = 0
    serimu.flush()
    while flag == 0:
        serimu.write(cmd_yaw.encode())
        t = time1()
        while abs(t - time1() < 0.01) and flag == 0:
            read = serimu.readline()
            read = read.decode()
            for line in read.split('\r'):
                if line.startswith("yaw ="):
                    yaw = line.split("=")
                    yaw = float(yaw[1])
                    yaw1=yaw-error_yaw
                    # print "yaw : "+str(yaw)
                    flag = 1
    return yaw1

#Returns the Roll
def roll():
    flag = 0
    serimu.flush()
    while flag == 0:
        serimu.write(cmd_roll.encode())
        t = time1()
        while abs(t - time1() < 0.01) and flag == 0:
            read = serimu.readline()
            read = read.decode()
            for line in read.split('\r'):
                if line.startswith("roll ="):
                    roll = line.split("=")
                    roll = float(roll[1])
                    roll1=roll-error_roll
                    # print "roll : "+str(roll)
                    flag = 1
    return roll1

#Returns the pitch
def pitch():
    flag = 0
    serimu.flush()
    while flag == 0:
        serimu.write(cmd_pitch.encode())
        t = time1()
        while abs(t - time1() < 0.01) and flag == 0:
            read = serimu.readline()
            read = read.decode()
            for line in read.split('\r'):
                if line.startswith("pitch ="):
                    pitch = line.split("=")
                    pitch = float(pitch[1])
                    pitch1=pitch-error_pitch
                    # print "pitch : "+str(pitch)
                    flag = 1
    return pitch1

#Returns Gx,Gy,Gz
def gyro():
    flagx = 0
    flagy = 0
    flagz = 0
    serimu.flush()
    while flagx == 0 or flagy == 0 or flagz == 0:
        serimu.write(cmd_gyro.encode())
        t = time1()
        while abs(t - time1() < 0.01) and (flagx == 0 or flagy == 0 or flagz == 0):
            read = serimu.readline()
            read = read.decode()
            for line in read.split('\r'):
                if line.startswith("gyrop = 00--"):
                    gx = line.split("--")
                    gx = float(gx[1])
                    # print "gx : "+str(gx)
                    flagx = 1
                if line.startswith("01--"):
                    gy = line.split("--")
                    gy = float(gy[1])
                    # print "gy : "+str(gy)
                    flagy = 1
                if line.startswith("02--"):
                    gz = line.split("--")
                    gz = float(gz[1])
                    # print "gz : "+str(gz)
                    flagz = 1
    g = [gx, gy, gz]
    return g

#Returns the acceleration along the X,Y,Z axis
def accelerometer():
    flagx = 0
    flagy = 0
    flagz = 0
    serimu.flush()
    while flagx == 0 or flagy == 0 or flagz == 0:
        serimu.write(cmd_accelero.encode())
        t = time1()
        while abs(t - time1() < 0.01) and (flagx == 0 or flagy == 0 or flagz == 0):
            read = serimu.readline()
            read = read.decode()
            for line in read.split('\r'):
                if line.startswith("accelp = 00--"):
                    ax = line.split("--")
                    ax = float(ax[1])
                    ax1=ax-error_ax
                    # print "ax : "+str(ax)
                    flagx = 1
                if line.startswith("01--"):
                    ay = line.split("--")
                    ay = float(ay[1])
                    ay1=ay-error_ay
                    # print "ay : "+str(ay)
                    flagy = 1
                if line.startswith("02--"):
                    az = line.split("--")
                    az = float(az[1])
                    az1=az-error_az
                    # print "az : "+str(az)
                    flagz = 1
        a = [ax1, ay1, az1]
        return a

#returns yaw_parameters
def yaw_parameters():
    global time_initial
    global yaw_initial
    global yaw_velocity_initial
    yaw_final=yaw()
    yaw_difference = yaw_final-yaw_initial
    time_final=time.time()
    time_difference = time_final-time_initial
    yaw_velocity_final = yaw_difference/time_difference
    yaw_velocity_difference = yaw_velocity_final-yaw_velocity_initial
    yaw_acceleration = yaw_velocity_difference/time_difference
    time_initial = time_final
    yaw_initial = yaw_final
    yaw_velocity_initial = yaw_velocity_final

    yaw_parameters=[yaw_velocity_final,yaw_acceleration]
    return yaw_parameters

#Returns the temperature
def temperature():
    flag = 0
    serimu.flush()
    while flag == 0:
        serimu.write(cmd_temp.encode())
        t = time1()
        while abs(t - time1() < 0.01) and flag == 0:
            read = serimu.readline()
            read = read.decode()
            for line in read.split('\r'):
                if line.startswith("temperature ="):
                    temp = line.split("=")
                    temp = float(temp[1])
                    temp1=temp-error_temp
                    # print "temperature : "+str(temp)
                    flag = 1
    return temp1

