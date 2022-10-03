package main

import (
	"bytes"
	"encoding/json"
	"io/ioutil"
	"net/http"
	"store/data"
)

func UpdateStore(storeinfo data.StorePreview) error {
	content, err := json.Marshal(storeinfo)
	if err != nil {
		return err
	}
	res, err := http.Post("http://localhost:4005/api/v1/update", "application/json", bytes.NewBuffer(content))
	if err != nil {
		return err
	}
	body, _ := ioutil.ReadAll(res.Body)
	print(body)
	return nil
}
