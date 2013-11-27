var body = require("./index")
var jsonParse = require("safe-json-parse")

module.exports = jsonBody

function jsonBody(req, res, opts, callback) {
    if (typeof opts === "function") {
        callback = opts
        opts = {}
    }

    if (!callback) {
        return jsonBody.bind(null, req, res, opts)
    }

    var parse = opts.JSON ? opts.JSON.parse : jsonParse
    var reviver = opts.reviver || null

    body(req, res, opts, function (err, body) {
        if (err) {
            return callback(err)
        }

        parse(body, reviver, callback)
    })
}
