package main

import (
	"encoding/json"
	"log"
	"net/http"
	"store/storehub/config"
	"store/storehub/listing"
)

func initRequests() {
	http.HandleFunc("/api/v1/items", retrieveItems)
	http.HandleFunc("/api/v1/update", updateStoreInfo)
	log.Println("Store server at PORT: " + config.PORT)
	if err := http.ListenAndServe(":"+config.PORT, nil); err != nil {
		log.Println("Error while listening to port ", err)
	}
}

//get items
func retrieveItems(w http.ResponseWriter, r *http.Request) {
	// step: retrieve the data
	items := listing.GetInstance()
	if len(items.Stores) == 0 {
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusInternalServerError)
		w.Write([]byte("{\"status\": \"error\", \"message\": \"items not found\"}"))
		return
	}
	// step: marshal the data
	data, err := json.Marshal(items)
	if err != nil {
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusInternalServerError)
		w.Write([]byte("{\"status\": \"error\", \"message\": \"" + err.Error() + "\"}"))
		return
	}

	// step: write the data
	WriteSuccess(w, data)
}

func updateStoreInfo(w http.ResponseWriter, r *http.Request) {
	data, err := ParseHttpBody(r.Body)
	if err != nil {
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusInternalServerError)
		w.Write([]byte("{\"status\": \"error\", \"message\": \"couldnt parse body\"}"))
		return
	}
	// check for id
	if data["id"] == nil {
		WriteFailed(w, []byte(`{"error":"id property should be defined", "code": 100}`))
		return
	}
	name := ""
	desc := ""
	icon := ""
	store := ""
	if data["name"] != nil {
		name = data["name"].(string)
	}
	if data["description"] != nil {
		desc = data["description"].(string)
	}
	if data["iconcid"] != nil {
		icon = data["iconcid"].(string)
	}
	if data["storecid"] != nil {
		store = data["storecid"].(string)
	}
	storeInfo := listing.StoreInfo{
		Id:          data["id"].(string),
		Name:        name,
		Description: desc,
		IconCID:     icon,
		StoreCID:    store,
	}
	listing.UpdateStoreInfo(storeInfo)
	WriteSuccess(w, []byte("success"))
}
