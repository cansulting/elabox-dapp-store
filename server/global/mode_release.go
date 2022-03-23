//go:build RELEASE
// +build RELEASE

package global

import "time"

var HOST = "https://storage.googleapis.com/elabox"

const RELOAD_TIME = 60 * time.Minute // reload time for listing
