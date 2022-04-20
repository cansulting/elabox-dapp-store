#!/bin/bash
# use to build and BOX the dapp store

target=$(go env GOOS)
arch=$(go env GOARCH)
gobuild='go build -ldflags "-w -s" -tags RELEASE'         

# FLAGS
while getopts o:a: flag
do
    case "${flag}" in
        o) target=${OPTARG};;
        a) arch=${OPTARG};;
    esac
done

echo "Start building and uploading DStore Server"

go env -w GOOS=$target
go env -w GOARCH=$arch
eval "$gobuild" -o ../build/server/bin/store_server ../server 
