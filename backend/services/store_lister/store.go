package store_lister

import (
	"encoding/json"
	"errors"
	"io/ioutil"
	"log"
	"net/http"
	"net/url"
	"os"
	"reflect"
	"store/backend/broadcast"
	"store/backend/data"
	"store/backend/global"
	"time"

	"github.com/cansulting/elabox-system-tools/foundation/logger"
	"github.com/cansulting/elabox-system-tools/foundation/perm"
)

var pkgsCache []*data.PackageListingCache = nil
var remoteData map[string]*data.PackageListingCache = nil
var wwwImages = ""

const PARENT_DIR = "ela.companion"

// initialize this service
func Init() error {
	if err := os.MkdirAll(global.CacheDir, perm.PUBLIC_WRITE); err != nil {
		return errors.New("unable to create cache directory " + global.CacheDir)
	}
	// will be called every hour
	go func() {
		for {
			if err := CheckUpdates(); err != nil {
				logger.GetInstance().Error().Err(err).Msg("unable to retrieve store listing.")
			}
			// sleep for a while
			time.Sleep(time.Second * global.RETRIEVE_LISTING_DELAY)
		}
	}()
	return nil
}

// retrieve all items from cache
func GetItems() ([]*data.PackageListingCache, error) {
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
	for _, v := range items {
		if v.Id == pkid {
			return v, nil
		}
	}
	return nil, nil
}

// request via http to retrieve apps. use to look new package updates
func CheckUpdates() error {
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
	err = json.Unmarshal(body, &remoteData)
	if err != nil {
		return errors.New("unable to unmarshal response body. inner: " + err.Error())
	}
	tmp := make([]*data.PackageListingCache, len(remoteData))
	i := -1
	updates := make([]*data.PackageListingCache, 0)
	for _, latestData := range remoteData {
		i++
		// compare to olditem
		localData, _ := GetItem(latestData.Id)
		if localData != nil {
			shouldUseLocalData := localData.Build == latestData.Build
			if latestData.Beta {
				shouldUseLocalData = localData.Build == latestData.Build && localData.Beta == latestData.Beta && reflect.DeepEqual(localData.BetaUsers, latestData.BetaUsers)
			}
			if shouldUseLocalData {
				tmp[i] = localData
				continue
			}
		}
		tmp[i] = latestData
		updates = append(updates, latestData)
	}
	// step: we have updates
	if len(updates) > 0 {
		// cache package icons
		// NOTE: skip for IDE since cache data wont be visible due to React debug exec behaviour
		/*  remove icon caching for now, got issue when cache icon removed unintentionally once the system was updated
		if !system.IDE {
			if wwwImages == "" {
				wwwImages = spath.GetSystemWWW() + "/" + PARENT_DIR + global.IMAGES_CACHE_PATH
				if err := os.MkdirAll(wwwImages, 0666); err != nil {
					logger.GetInstance().Error().Err(err).Msg("failed to create cache dir " + wwwImages)
				}
			}
			for _, v := range updates {
				ext := path.Ext(v.Icon)
				dest := wwwImages + "/" + v.Id + "/icon" + ext
				if err := downloader.AddCacheImage(
					v.Id,
					v.Icon,
					dest,
				); err != nil {
					// update url
					v.Icon = "/" + PARENT_DIR + global.IMAGES_CACHE_PATH + "/" + v.Id + "/icon" + ext
				}
			}
		}*/
		// broadcast
		if err := broadcast.PublishNewUpdateAvailable(updates); err != nil {
			log.Println("unable to broadcast new update available")
		}
		pkgsCache = tmp
		// tmp: save the data to cache file
		return saveCache(pkgsCache, global.StoreCache)
	}
	return nil
}

// function that retrieves package download information
func RetrieveDownloadLink(pkgId string) (string, error) {
	form := url.Values{}
	form.Add("packageId", pkgId)
	req, err := http.PostForm(global.DOWNLOAD_ENDPOINT, form)
	if err != nil {
		broadcast.PublishError(pkgId, global.STORE_SERVER_ERROR, "Unable to connect to store server. Please try again later.")
		return "", err
	}

	if req == nil || req.StatusCode != http.StatusOK {
		return "", errors.New("unable to retrieve download link for package " + pkgId)
	}
	defer req.Body.Close()

	// step: read response
	body, err := ioutil.ReadAll(req.Body)
	if err != nil {
		return "", err
	}

	return string(body), nil
}
