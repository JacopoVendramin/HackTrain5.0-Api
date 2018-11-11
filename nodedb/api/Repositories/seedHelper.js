"use strict";

let fs = require('fs');
const TimeHelper = require('./timeHelper')

exports.parseJson = (arrayPath) => {
    let data = JSON.parse(fs.readFileSync(arrayPath));
    data = TimeHelper.addHoursToDate(data)
    return data
}
