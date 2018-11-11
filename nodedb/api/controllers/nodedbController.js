"use strict";

let fs = require('fs');
let seederFilePath = 'api/data/test.json';

const mongoose = require("mongoose")
const Station = mongoose.model("RailData")
const SeedHelper = require('../Repositories/seedHelper')
const TimeHelper = require('../Repositories/timeHelper')


exports.seedDatabase = (req, res) => {
    const data = SeedHelper.parseJson(seederFilePath)
    Station.insertMany(data, (error, docs) => {res.json('Done')})
};
exports.getStation = (req, res, ) => {
    Station.find({Station: req.params.stationName,})
                .then((task) => {
                    res.send(task)
                }).catch(error => {
                    res.status(404).send("No Documents Found")
                })
};

exports.getStationAndTotalAverage = (req, res ) => {
    var pipeline = [
        { "$match": {"Station": req.params.stationName,} },
        {"$group": {"_id": "", "adAvg": { "$avg": "$Trainperf" }}},
    ]
    Station.aggregate(pipeline, function(err, result){
        if(err) {
            res.send(String(err));
        }
        res.send({result,"Station": req.params.stationName,});
    })
};
exports.getEverythingOnRange= (req, res) => {
    Station.find({Date: { $lte:req.params.end,$gte:req.params.start}})
            .then((task) => {
                res.send(task)
            }).catch(error => {
                res.status(404).send("No Documents Found")
            })
};
exports.getRecordsStationOnRange= (req, res) => {
    Station.find({"Station": req.params.stationName,Date: { $lte:req.params.end,$gte:req.params.start}})
            .then((err, task) => {
                res.send(err?String(err):task)
            })
};
exports.getLastRecordStation= (req, res) => {
    Station.find({"Station": req.params.stationName})
                .then((task) => {
                    res.send(task[task.length-1])
                }).catch(error => {
                    res.status(404).send("No Documents Found")
                })
};

