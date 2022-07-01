//go:build RELEASE
// +build RELEASE

package global

import "time"

var HOST = "https://storage.googleapis.com/elabox"
const PORT = "4002"

const RELOAD_TIME = 60 * time.Minute // apply time for listing
