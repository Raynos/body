var body = require("./index")
var jsonBody = require("./json")
var formBody = require("./form")

var jsonType = "application/json"
var formType = "application/x-www-form-urlencoded"

module.exports = anyBody

function anyBody(req, res) {
    var contentType = req.headers["content-type"] || ""

    if (contentType.indexOf(jsonType) !== -1) {
        return jsonBody(req, res)
    } else if (contentType.indexOf(formType) !== -1) {
        return formBody(req, res)
    } else {
        return body(req, res)
    }
}
