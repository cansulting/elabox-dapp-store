package store_lister

func retrieveStoreListing() error {
	if err := CheckUpdates(); err != nil {
		println("unable to retrieve store listing. inner: " + err.Error())
		return err
	}
	return nil
}
