//go:build RELEASE
// +build RELEASE

package global

const STORE_HOST = "https://dstore.elabox.com"
const ENV="release"
const RETRIEVE_LISTING_DELAY = 60 * 60 // delay in retrieving store listing in sec