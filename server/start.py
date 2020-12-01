from pathlib import Path
import subprocess
import os

SERVER_PATH = Path(__file__).parent.absolute()
APP_ROOT_DIR = SERVER_PATH.parent.absolute()

# print(str(APP_ROOT_DIR))
# print(str(SERVER_PATH))
db_proccess_status = subprocess.Popen(["mongod", "--dbpath", f"{str(APP_ROOT_DIR)}/data/mongo"])

server_process = subprocess.Popen(["node", f"{str(SERVER_PATH)}/index.js"],stdout=subprocess.PIPE,
                           universal_newlines=True)

while True:
    output = server_process.stdout.readline()
    print(output.strip())
    # Do something else
    return_code = server_process.poll()
    if return_code is not None:
        print('RETURN CODE', return_code)
        # Process has finished, read rest of the output 
        for output in server_process.stdout.readlines():
            print(output.strip())
        break