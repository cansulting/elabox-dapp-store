package store_lister

import (
	"encoding/json"
	"errors"
	"io/ioutil"
	"log"
	"net/http"
	"net/url"
	"os"
	"store/backend/data"
	"store/backend/global"
	"strings"
	"time"

	"github.com/cansulting/elabox-system-tools/foundation/perm"
)

var pkgsCache *[]data.PackageListingCache = nil
var tmpData map[string]data.PackageListingCache = nil

// initialize this service
func Init() error {
	if err := os.MkdirAll(global.CacheDir, perm.PUBLIC_WRITE); err != nil {
		return errors.New("unable to create cache directory " + global.CacheDir)
	}
	// will be called every hour
	go func() {
		for {
			RetrieveItems()
			// sleep for a while
			time.Sleep(time.Second * 60)
		}
	}()
	return nil
}

// retrieve all items from cache
func GetItems() (*[]data.PackageListingCache, error) {
	if pkgsCache == nil {
		tmp, err := retrieveCache()
		if err != nil {
			return nil, err
		}
		pkgsCache = tmp
	}

	return pkgsCache, nil
}

// retrieve from cache item based from package id
func GetItem(pkid string) (*data.PackageListingCache, error) {
	items, err := GetItems()
	if err != nil {
		return nil, err
	}
	for _, v := range *items {
		if v.Id == pkid {
			return &v, nil
		}
	}
	return nil, nil
}

// request via http to retrieve apps
func RetrieveItems() error {
	log.Println("retrieving store listing")

	res, err := http.Get(global.PACKAGES_ENDPOINT)
	if err != nil {
		return errors.New("unable to retrieve store listing. inner: " + err.Error())
	}

	// step: read response
	defer res.Body.Close()
	body, err := ioutil.ReadAll(res.Body)
	if err != nil || res.StatusCode != http.StatusOK {
		if err == nil {
			err = errors.New(string(body))
		}
		return errors.New("unable to read response body. inner: " + err.Error())
	}

	// step: parse json response
	err = json.Unmarshal(body, &tmpData)
	if err != nil {
		return errors.New("unable to unmarshal response body. inner: " + err.Error())
	}

	tmp := make([]data.PackageListingCache, len(tmpData))
	pkgsCache = &tmp
	i := 0
	for _, v := range tmpData {
		tmp[i] = v
		i++
	}

	// tmp: save the data to cache file
	return saveCache(pkgsCache, global.StoreCache)
}

// function that retrieves package download information
func RetrieveDownloadLink(pkgId string) (string, error) {
	form := url.Values{}
	form.Add("packageId", pkgId)
	req, err := http.NewRequest("POST", global.DOWNLOAD_ENDPOINT, strings.NewReader(form.Encode()))
	if err != nil {
		return "", err
	}
	defer req.Body.Close()

	if req.Response.StatusCode != http.StatusOK {
		return "", errors.New("unable to retrieve download link for package " + pkgId)
	}

	// step: read response
	body, err := ioutil.ReadAll(req.Body)
	if err != nil {
		return "", err
	}

	return string(body), nil
}
