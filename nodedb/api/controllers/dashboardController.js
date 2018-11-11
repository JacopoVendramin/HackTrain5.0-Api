"use strict";

const mongoose = require("mongoose")
const Station = mongoose.model("RailData")

class DashboardController {

    async test (req, res) {
        var new_task = new Station({
            Date: 1491177600000,
            "TimeIn": 0.0,
            Station: "BEDHAMPTON",
            Headcode: "7Z75",
            Trainperf: -3.0
        })
        let ciao = await new_task.save().then((err)=>{
            if (err) res.send(err);
            res.json(task);
        })
        return ciao
    }
}
module.exports = DashboardController
