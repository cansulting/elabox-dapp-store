package global

type AppStatus string

const (
	Installed   AppStatus = "installed"
	UnInstalled AppStatus = "uninstalled"
	Downloaded  AppStatus = "downloaded"
	Downloading AppStatus = "downloading"
	Installing  AppStatus = "installing"
)
