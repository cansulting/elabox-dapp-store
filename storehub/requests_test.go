package main

import (
	"bytes"
	"io/ioutil"
	"net/http"
	"testing"
)

func Test_UpdateStoreInfo(t *testing.T) {
	jsonData := []byte(`{
		"id": "sampleid",
		"name": "sample store",
		"desc": "this is a sample store"
	}`)
	req, err := http.NewRequest("post", "http://localhost:4005/api/v1/update", bytes.NewBuffer(jsonData))
	if err != nil {
		t.Error("failed request", err)
		return
	}
	client := &http.Client{}
	res, err := client.Do(req)
	if err != nil {
		t.Error("failed request response")
		return
	}
	body, _ := ioutil.ReadAll(res.Body)
	t.Log(string(body))
}
