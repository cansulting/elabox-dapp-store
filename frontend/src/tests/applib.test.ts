import { retrieveAllListings, retrieveListing } from "../actions/appLib"

describe("App Library tests", () => {
    it("retrieve all listing", (done) => {
        retrieveAllListings()
            .then( res => {
                done()
            })
            .catch( err => {
                done(err)
            })
    })

    it("retrieve glide listing", (done) => {
        retrieveListing("ela.glide")
            .then( res => {
                done()
            })
            .catch( err => {
                done(err)
            })
    })
})