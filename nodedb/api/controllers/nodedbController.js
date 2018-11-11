"use strict";
let fs = require('fs');
let arrayPath = 'api/data/test.json';


var mongoose = require("mongoose"),
    Task = mongoose.model("Tasks"),
    Station = mongoose.model("RailData");

exports.seedDatabase = (req, res) =>{ var data = JSON.parse(fs.readFileSync(arrayPath));Station.insertMany(data, (error, docs) =>{ res.json('Done')})};



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
