package utils

import (
	"encoding/json"
	"io"
	"net/http"
	"sync"
)

var mutex *sync.Mutex = &sync.Mutex{}
var reqBody map[string]interface{}

// parse http body with json format and return map
func ParseHttpBody(body io.Reader) (map[string]interface{}, error) {
	mutex.Lock()
	defer mutex.Unlock()

	err := json.NewDecoder(body).Decode(&reqBody)
	if err != nil {

		return nil, err
	}
	return reqBody, nil
}

func WriteSuccess(writer http.ResponseWriter, data []byte) error {
	writer.Header().Set("Content-Type", "application/json")
	writer.WriteHeader(http.StatusOK)
	_, err := writer.Write(data)
	return err
}

func WriteFailed(writer http.ResponseWriter, data []byte) error {
	//writer.Header().Set("Content-Type", "application/json")
	writer.WriteHeader(http.StatusBadRequest)
	_, err := writer.Write(data)
	return err
}
