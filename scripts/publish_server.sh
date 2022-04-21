#!/bin/bash
# use to build and BOX the dapp store

gobuild='go build -ldflags "-w -s" -tags DEBUG'         
go env -w GOOS=linux
go env -w GOARCH=amd64
go env -w CC="zig cc -target x86_64-linux"

echo "1 - DEBUG, 2 - STAGING, 3 - RELEASE. Default = DEBUG"
read mode

if [[ "$mode" == "3" || "$mode" == "RELEASE" ]]; then
    mode=release
    gobuild='go build -ldflags "-w -s" -tags RELEASE'
elif [[ "$mode" == "2" || "$mode" == "STAGING" ]]; then
    mode=staging
    gobuild='go build -tags STAGING'
else
    mode=debug
fi

echo "Start building DStore Server"
eval "$gobuild" -o ../build/server/$mode/store_server ../server 
echo "Success."

go env -u GOARCH
go env -u CXX
go env -u CC 
go env -u CGO_ENABLED


echo "Start copying"
cp ../build/server/init.sh /tmp/init.sh
processname=dstore_$mode
sed -i "s|\!PROCESS|$processname|" /tmp/init.sh
remote=dev@208.87.134.80

sudo scp -r /tmp/init.sh $remote:init.sh
sudo scp -r ../build/server/$mode $remote:tmp_store
echo "Execute at background"
sudo ssh -t $remote 'chmod +x ./init.sh; sudo ./init.sh'
