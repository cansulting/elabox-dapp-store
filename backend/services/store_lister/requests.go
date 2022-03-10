package store_lister

func retrieveStoreListing() error {
	if err := RetrieveItems(); err != nil {
		println("unable to retrieve store listing. inner: " + err.Error())
		return err
	}
	return nil
}
