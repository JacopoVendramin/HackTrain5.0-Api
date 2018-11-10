"use strict";
module.exports = function(app) {
    var ndb = require("../controllers/nodedbController");

    // todoList Routes
    app.route("/tasks")
        .get(ndb.list_all_tasks)
        .post(ndb.create_a_task);

    app.route("/tasks/:taskId")
        .get(ndb.read_a_task)
        .put(ndb.update_a_task)
        .delete(ndb.delete_a_task);
};