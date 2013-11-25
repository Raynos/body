var TypedError = require("error/typed")

var jsonBody = require("./json")
var formBody = require("./form")

var jsonType = "application/json"
var formType = "application/x-www-form-urlencoded"
var INVALID_CONTENT_TYPE = TypedError({
    message: "Could not parse content type header: %s",
    type: "invalid.content.type",
    statusCode: 415
})

module.exports = anyBody

function anyBody(req, res, opts, callback) {
    if (typeof opts === "function") {
        callback = opts
        opts = {}
    }

    var contentType = req.headers["content-type"] || ""

    if (contentType.indexOf(jsonType) !== -1) {
        jsonBody(req, res, opts, callback)
    } else if (contentType.indexOf(formType) !== -1) {
        formBody(req, res, opts, callback)
    } else {
        callback(INVALID_CONTENT_TYPE(contentType))
    }
}
