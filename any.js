var jsonBody = require("./json")
var formBody = require("./form")

var jsonType = "application/json"
var formType = "application/x-www-form-urlencoded"

module.exports = anyBody

function anyBody(req, res, callback) {
    var contentType = req.headers["content-type"] || ""

    if (contentType.indexOf(jsonType) !== -1) {
        jsonBody(req, res, callback)
    } else if (contentType.indexOf(formType) !== -1) {
        formBody(req, res, callback)
    } else {
        callback(new Error("could not parse content type header"))
    }
}
