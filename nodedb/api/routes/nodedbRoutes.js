"use strict";
module.exports = function(app) {
    var ndb = require("../controllers/nodedbController");
    const DashboardController = require("../controllers/DashboardController");

    app.use(function(req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        next();
    })
    app.route("/station/:stationName")
        .get(ndb.getStationAndTotalAverage)
    app.route("/stationStat/:stationName")
        .get(ndb.getLastRecordStation)

    app.route("/seed")
        .get(ndb.seedDatabase)


    app.route("/station/:stationName").get(ndb.getStationAndTotalAverage);

    app.route("/seed").get(ndb.seedDatabase);
};
