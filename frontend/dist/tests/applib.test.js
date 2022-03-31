"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var appLib_1 = require("../actions/appLib");
describe("App Library tests", function () {
    it("retrieve all listing", function (done) {
        (0, appLib_1.retrieveAllListings)()
            .then(function (res) {
            done();
        })
            .catch(function (err) {
            done(err);
        });
    });
    it("retrieve glide listing", function (done) {
        (0, appLib_1.retrieveListing)("ela.glide")
            .then(function (res) {
            done();
        })
            .catch(function (err) {
            done(err);
        });
    });
});
