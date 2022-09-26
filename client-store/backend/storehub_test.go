package main

import "testing"

func TestRetrieveItems(t *testing.T) {
	if _, err := RetrieveStoreList(); err != nil {
		t.Error(err)
	}
}
