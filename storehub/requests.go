package main

import (
	"encoding/json"
	"log"
	"net/http"
	"store/data"
	"store/storehub/config"
	"store/storehub/listing"
	"store/utils"

	"github.com/gorilla/mux"
)

func initRequests() {
	handler := mux.NewRouter().StrictSlash(true)
	handler.HandleFunc("/api/v1/items", retrieveItems).Methods("GET")
	handler.HandleFunc("/api/v1/update", updateStoreInfo).Methods("POST")
	log.Println("Store server at PORT: " + config.PORT)
	if err := http.ListenAndServe(":"+config.PORT, handler); err != nil {
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
	utils.WriteSuccess(w, data)
}

// request for updating store info
func updateStoreInfo(w http.ResponseWriter, r *http.Request) {
	res, err := utils.ParseHttpBody(r.Body)
	if err != nil {
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusInternalServerError)
		w.Write([]byte("{\"status\": \"error\", \"message\": \"couldnt parse body\"}"))
		return
	}
	// check for id
	if res["id"] == nil {
		utils.WriteFailed(w, "100", "id property should be defined")
		return
	}
	if res["name"] == nil {
		utils.WriteFailed(w, "100", "name property should be defined")
		return
	}
	name := ""
	desc := ""
	icon := ""
	store := ""
	if res["name"] != nil {
		name = res["name"].(string)
	}
	if res["desc"] != nil {
		desc = res["desc"].(string)
	}
	if res["iconcid"] != nil {
		icon = res["iconcid"].(string)
	}
	if res["storecid"] != nil {
		store = res["storecid"].(string)
	}
	storeInfo := data.StorePreview{
		Id:          res["id"].(string),
		Name:        name,
		Description: desc,
		IconCID:     icon,
		StoreCID:    store,
	}
	listing.UpdateStoreInfo(storeInfo)
	utils.WriteSuccess(w, []byte(`{"result":"success"}`))
}
