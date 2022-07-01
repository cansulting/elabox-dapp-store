package main

import (
	"encoding/json"
	"errors"
	"io/ioutil"
	"net/http"
	"net/url"
	"store/backend/data"
	"store/server/global"
	"testing"
)

const PACKAGES_ENDPOINT = "http://localhost:" + global.PORT + "/api/v1/items"
const DOWNLOAD_LINK_ENDPOINT = "http://localhost:" + global.PORT + "/api/v1/dl"
const TEST_PACKAGE = "ela.mainchain"

func Test_RetrieveItems(t *testing.T) {
	res, err := http.Get(PACKAGES_ENDPOINT)
	if err != nil {
		t.Error("unable to retrieve store listing. inner: " + err.Error())
		return
	}

	// step: read response
	body, err := ioutil.ReadAll(res.Body)
	if err != nil || res.StatusCode != http.StatusOK {
		if err == nil {
			err = errors.New(string(body))
		}
		t.Error("unable to read response body. inner: " + err.Error())
		return
	}

	// step: parse json response
	var data map[string]data.PackageListingCache
	err = json.Unmarshal(body, &data)
	if err != nil {
		t.Error("unable to unmarshal response body. inner: " + err.Error())
	}
}

func Test_RetrieveDLink(t *testing.T) {
	form := url.Values{}
	form.Add("packageId", TEST_PACKAGE)
	res, err := http.PostForm(DOWNLOAD_LINK_ENDPOINT, form)
	if err != nil {
		t.Error("unable to retrieve download link. inner: " + err.Error())
		return
	}

	// step: read response
	body, err := ioutil.ReadAll(res.Body)
	if err != nil || res.StatusCode != http.StatusOK {
		if err == nil {
			err = errors.New(string(body))
		}
		t.Error("unable to read response body. inner: " + err.Error())
		return
	}

	t.Log("download link " + string(body))
}
