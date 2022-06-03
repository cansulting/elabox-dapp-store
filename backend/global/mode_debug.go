//go:build !IDE && !RELEASE && !STAGING
// +build !IDE,!RELEASE,!STAGING

package global

const STORE_HOST = "http://208.87.134.80:4000"
const ENV = "debug"
const RETRIEVE_LISTING_DELAY = 5 // delay in retrieving store listing in sec