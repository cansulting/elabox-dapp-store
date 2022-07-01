//go:build STAGING
// +build STAGING

package global

import "time"

var HOST = "https://storage.googleapis.com/elabox-staging"

const PORT = "4001"

const RELOAD_TIME = 60 * time.Minute // apply time for listing
