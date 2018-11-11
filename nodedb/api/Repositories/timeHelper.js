"use strict"

exports.addHoursToDate = (arr)=>{
    let newArr = []
    arr.forEach(element => {newArr.push({...element,Date:element.Date + (element.TimeIn * 3600000)})})
    return newArr
}
