"use strict";

var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var RailDataSchema = new Schema({
    Time: {
        type: Date,
        default: Date.now
    },
    Date: {
        type: Date,
        required: "Date is missing"
    },
    TimeIn: {
        type: Date,
        required: "TimeIn is required"
    },
    Station: {
        type: String,
        required: "Station name is required"
    },
    Headcode: {
        type: String,
        required: "Headcode is required"
    },
    Trainperf: {
        type: Number,
        require: "Trainperf is required"
    }
});

module.exports = mongoose.model("RailData", RailDataSchema);
