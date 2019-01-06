import serial
import sys
import glob
import time
import datetime

def time1():
    t =  datetime.datetime.now()
    t = str(t)
    t = t[17:]
    t = float(t)
    return t
def portdetect():
    if sys.platform.startswith('win'):
        ports = ['COM%s' % (i + 1) for i in range(256)]
    elif sys.platform.startswith('linux') or sys.platform.startswith('cygwin'):
        ports = glob.glob('/dev/tty[A-Za-z]*')
    elif sys.platform.startswith('darwin'):
        ports = glob.glob('/dev/tty.*')
    else:
        raise EnvironmentError('Unsupported platform')

    result = []
    for port in ports:
        try:
            s = serial.Serial(port)
            s.close()
            return port
            result.append(port)
        except (OSError, serial.SerialException):
            pass
def serimu():
    port = portdetect()
    return serial.Serial(port,baudrate=115200)