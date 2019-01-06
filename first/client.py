from socketIO_client_nexus import SocketIO
from socketIO_client_nexus import LoggingNamespace
import logging
import time
import json
 
i,j = 0,1000
with SocketIO('localhost', 3000, LoggingNamespace) as socketio:
    while True:
        data = i
        mo = {
            "speed": i,
            "rpm": j
        }
        mo_json = json.dumps(mo)
        #socketio.emit('source',{'speed':data})
        socketio.emit('source',mo_json)
        print "sent"
        time.sleep(0.1)
        i=i+1
        j=j+100
        if (i>120):
            i = 0
            j = 2000