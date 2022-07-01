#!/bin/bash
# use to build and BOX the dapp store

target=$(go env GOOS)
arch=$(go env GOARCH)
# values can interactive, debug, staging, production. 
# in interactive - user lets to choose which mode he wants
mode=interactive
gobuild="go build -tags DEBUG"            

# FLAGS
while getopts o:a:d: flag
do
    case "${flag}" in
        o) target=${OPTARG};;
        a) arch=${OPTARG};;
        d) mode=${OPTARG};;
    esac
done

go env -w GOOS=$target
go env -w GOARCH=$arch

if [ "$mode" == "interactive" ]; then
    echo "Select 1 - DEBUG, 2 - STAGING, 3 - RELEASE. Default = DEBUG"
    read mode
fi

if [[ "$mode" == "1" || "$mode" == "RELEASE" ]]; then
    mode=RELEASE
    gobuild='go build -ldflags "-w -s" -tags RELEASE'
elif [[ "$mode" == "2" || "$mode" == "STAGING" ]]; then
    mode=STAGING
    gobuild='go build -tags STAGING'
else
    mode=DEBUG
fi

echo "Start building $mode DStore binaries..."

#############################
# build backend 
pkid=$(jq '.packageId' ../build/ela.store/info.json)
eval "$gobuild" -o ../build/$pkid/bin/$pkid ../backend 


packager ../build/ela.store/packager.json