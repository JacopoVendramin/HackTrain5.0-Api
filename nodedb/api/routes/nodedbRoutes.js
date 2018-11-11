"use strict";
module.exports = function (app) {
    var ndb = require("../controllers/nodedbController");
    const DashboardController = require("../controllers/DashboardController")

    app.route("/station/:stationName")
        .get(ndb.getStationAndTotalAverage)


    app.route("/seed")
        .get(ndb.seedDatabase)


};
