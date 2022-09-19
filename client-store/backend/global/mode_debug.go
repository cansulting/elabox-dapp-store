//go:build !RELEASE && !STAGING
// +build !RELEASE,!STAGING

package global

import "time"

// var HOST = "https://storage.googleapis.com/elabox-debug"

const PORT = "4000"

const RELOAD_TIME = 1 * time.Minute // apply time for listing
