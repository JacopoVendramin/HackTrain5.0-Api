"use strict";

const test = [
    {
        Date: 1491177600000,
        "Time In": 0.0,
        Station: "BEDHAMPTON",
        Headcode: "7Z75",
        trainperf: -3.0
    },
    {
        Date: 1491177600000,
        "Time In": 0.0,
        Station: "CLAPHAM JUNCTION MAIN (9-11)",
        Headcode: "7Z82",
        trainperf: 46.0
    },
    {
        Date: 1491177600000,
        "Time In": 0.0,
        Station: "FARNCOMBE",
        Headcode: "7Z86",
        trainperf: -31.0
    },
    {
        Date: 1491177600000,
        "Time In": 0.0,
        Station: "FRATTON",
        Headcode: "7Z75",
        trainperf: 22.0
    },
    {
        Date: 1491177600000,
        "Time In": 0.0,
        Station: "GODALMING",
        Headcode: "7Z86",
        trainperf: -23.0
    },
    {
        Date: 1491177600000,
        "Time In": 0.0,
        Station: "HASLEMERE",
        Headcode: "7Z86",
        trainperf: -27.0
    },
    {
        Date: 1491177600000,
        "Time In": 0.0,
        Station: "HAVANT",
        Headcode: "7Z75",
        trainperf: -33.0
    },
    {
        Date: 1491177600000,
        "Time In": 0.0,
        Station: "HILSEA",
        Headcode: "7Z75",
        trainperf: 3.0
    },
    {
        Date: 1491177600000,
        "Time In": 0.0,
        Station: "LIPHOOK",
        Headcode: "7Z86",
        trainperf: 9.0
    },
    {
        Date: 1491177600000,
        "Time In": 0.0,
        Station: "LISS",
        Headcode: "7Z75",
        trainperf: 11.0
    },
    {
        Date: 1491177600000,
        "Time In": 0.0,
        Station: "LISS",
        Headcode: "7Z86",
        trainperf: 9.0
    },
    {
        Date: 1491177600000,
        "Time In": 0.0,
        Station: "MILFORD",
        Headcode: "7Z86",
        trainperf: 2.0
    },
    {
        Date: 1491177600000,
        "Time In": 0.0,
        Station: "PETERSFIELD",
        Headcode: "7Z75",
        trainperf: 16.0
    },
    {
        Date: 1491177600000,
        "Time In": 0.0,
        Station: "PETERSFIELD",
        Headcode: "7Z86",
        trainperf: -24.0
    },
    {
        Date: 1491177600000,
        "Time In": 0.0,
        Station: "ROWLANDS CASTLE",
        Headcode: "7Z75",
        trainperf: 4.0
    }
];

var mongoose = require("mongoose"),
    Task = mongoose.model("Tasks"),
    Station = mongoose.model("RailData");

exports.test = function(req, res) {
    var newStat = new Station({
        Date: 1491177600000,
        TimeIn: 0.0,
        Station: "BEDHAMPTON",
        Headcode: "7Z75",
        Trainperf: -3.0
    });
    var date = new Date(1491177600000 * 1000)
    var hours = date.getHours()
    var minutes = "0" + date.getMinutes()
    var seconds = "0" + date.getSeconds()
    var formattedTime = hours + ":" + minutes.substr(-2) + ":" + seconds.substr(-2);
    console.log(formattedTime)
    newStat.save(function(err, task) {
        if (err) res.send(err);
        res.json(task);
    });
};

exports.list_all_tasks = function(req, res) {
    Task.find({}, function(err, task) {
        if (err) res.send(err);
        res.json(task);
    });
};

exports.create_a_task = function(req, res) {
    var new_task = new Task(req.body);
    new_task.save(function(err, task) {
        if (err) res.send(err);
        res.json(task);
    });
};

exports.read_a_task = function(req, res) {
    Task.findById(req.params.taskId, function(err, task) {
        if (err) res.send(err);
        res.json(task);
    });
};

exports.update_a_task = function(req, res) {
    Task.findOneAndUpdate(
        { _id: req.params.taskId },
        req.body,
        { new: true },
        function(err, task) {
            if (err) res.send(err);
            res.json(task);
        }
    );
};

exports.delete_a_task = function(req, res) {
    Task.remove(
        {
            _id: req.params.taskId
        },
        function(err, task) {
            if (err) res.send(err);
            res.json({ message: "Task successfully deleted" });
        }
    );
};
