#!/bin/bash
processname=!PROCESS
pkill !PROCESS 

if [ ! -d "./dstore" ]; then
    mkdir ./dstore
fi
# if the directory exists, remove it
if [ -d "./dstore/!PROCESS" ]; then
    rm -rf ./dstore/!PROCESS
fi

mv ./tmp_store ./dstore/!PROCESS
wd=/home/dev/dstore/!PROCESS

# installing
sed -i "s|\!NAME!|$processname|" /home/dev/dstore/$processname/dstore.service
sed -i "s|\!PWD!|$wd|" /home/dev/dstore/$processname/dstore.service
sed -i "s|\!BIN!|$wd/store_server|" /home/dev/dstore/$processname/dstore.service
ln -sf /home/dev/dstore/$processname/store_server /bin/$processname
cp ./dstore/$processname/dstore.service /etc/systemd/system/$processname.service 
systemctl enable --now $processname
systemctl restart $processname