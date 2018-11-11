"use strict";

let fs = require('fs');
let seederFilePath = 'api/data/test.json';

const mongoose = require("mongoose")
const Task = mongoose.model("Tasks")
const Station = mongoose.model("RailData")
const SeedHelper = require('../Repositories/seedHelper')
const TimeHelper = require('../Repositories/timeHelper')


// ?seed the database using the file json "seederFilePath"
exports.seedDatabase = (req, res) => {
    const data = SeedHelper.parseJson(seederFilePath)
    Station.insertMany(data, (error, docs) => {res.json('Done')})
};
// ? get a specific station given the name of it
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
        {"$group": {"_id": "", "adAvg": { "$avg": "$Trainperf" }}}
    ]
    Station.aggregate(pipeline,(task) => {
        res.send(task)
    }).catch(error => {
        res.status(404).send("No Documents Found")
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












exports.list_all_tasks = function (req, res) {
    console.log('data');
};

exports.create_a_task = function (req, res) {
    var new_task = new Task(req.body);
    new_task.save(function (err, task) {
        if (err) res.send(err);
        res.json(task);
    });
};

exports.read_a_task = function (req, res) {
    Task.findById(req.params.taskId, function (err, task) {
        if (err) res.send(err);
        res.json(task);
    });
};

exports.update_a_task = function (req, res) {
    Task.findOneAndUpdate({
            _id: req.params.taskId
        },
        req.body, {
            new: true
        },
        function (err, task) {
            if (err) res.send(err);
            res.json(task);
        }
    );
};

exports.delete_a_task = function (req, res) {
    Task.remove({
            _id: req.params.taskId
        },
        function (err, task) {
            if (err) res.send(err);
            res.json({
                message: "Task successfully deleted"
            });
        }
    );
};
