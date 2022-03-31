//go:build !RELEASE && !STAGING
// +build !RELEASE,!STAGING

package global

import "time"

var HOST = "https://storage.googleapis.com/elabox-debug"

const RELOAD_TIME = 1 * time.Minute // reload time for listing
