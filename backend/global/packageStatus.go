package global

type AppStatus string

const (
	Installed   AppStatus = "installed"
	UnInstalled AppStatus = "uninstalled"
	Downloading AppStatus = "downloading"
	Installing  AppStatus = "installing"
)
