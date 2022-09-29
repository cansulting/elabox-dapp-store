package main

import (
	"encoding/json"
	"log"
	"net/http"
	"store/storehub/config"
	"store/storehub/listing"
)

func initRequests() {
	// allow cors
	http.HandleFunc("/api/v1/store-client/items", retrieveItems)
	log.Println("Store server at PORT: " + config.PORT)
	if err := http.ListenAndServe(":"+config.PORT, nil); err != nil {
		log.Println("Error while listening to port ", err)
	}
}

//get items
func retrieveItems(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	w.Header().Set("Access-Control-Allow-Origin", "*")	
	// step: retrieve the data
	items := listing.GetInstance()
	if len(items.Stores) == 0 {
		w.WriteHeader(http.StatusInternalServerError)
		w.Write([]byte("{\"status\": \"error\", \"message\": \"items not found\"}"))
		return
	}
	// step: marshal the data
	data, err := json.Marshal(items)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		w.Write([]byte("{\"status\": \"error\", \"message\": \"" + err.Error() + "\"}"))
		return
	}

	// step: write the data
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	w.Write(data)
}