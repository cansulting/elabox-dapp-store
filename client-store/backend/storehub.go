package main

import (
	"encoding/json"
	"io/ioutil"
	"net/http"
	"store/data"
)

// retrieve store info from list
func RetrieveStoreList() (*data.StoresInfo, error) {
	res, err := http.Get(STOREHUB_SERVER + "/api/v1/items")
	if err != nil {
		return nil, err
	}
	body, _ := ioutil.ReadAll(res.Body)
	var stores data.StoresInfo
	if err := json.Unmarshal(body, &stores); err != nil {
		return nil, err
	}
	return &stores, nil
}
