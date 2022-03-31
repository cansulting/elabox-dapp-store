package main

import (
	"encoding/json"
	"log"
	"net/http"
	"store/server/global"
	"store/server/listing"
	"strconv"
)

func initRequests() {
	http.HandleFunc("/api/v1/items", retrieveItems)
	http.HandleFunc("/api/v1/dl", retrieveDownloadLink)
	log.Println("Store server at PORT: " + global.PORT)
	if err := http.ListenAndServe(":"+global.PORT, nil); err != nil {
		log.Println("Error while listening to port ", err)
	}
}

// retrieve store items
func retrieveItems(w http.ResponseWriter, r *http.Request) {
	// step: retrieve the data
	items := listing.GetInstance()
	if len(items) == 0 {
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
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	w.Write(data)
}

// retrieve download link
func retrieveDownloadLink(w http.ResponseWriter, r *http.Request) {
	pkid := r.FormValue("packageId")
	build, _ := strconv.Atoi(r.FormValue("build"))
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	w.Write([]byte(getDownloadLink(pkid, uint16(build))))
}

// get the download of a package
func getDownloadLink(packageId string, build uint16) string {
	// retrieve latest?
	if build <= 0 {
		pkginfo := listing.GetInstance()[packageId]
		if pkginfo == nil {
			log.Println("unable to retrieve package info for: " + packageId)
			return ""
		}
		build = uint16(pkginfo.Build)
	}
	return global.HOST + "/store/apps/" + packageId + "/builds/" + strconv.Itoa(int(build)) + ".box"
}
