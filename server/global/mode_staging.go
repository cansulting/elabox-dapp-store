//go:build STAGING
// +build STAGING

package global

import "time"

var HOST = "https://storage.googleapis.com/elabox-staging"

const RELOAD_TIME = 5 * time.Minute // reload time for listing
