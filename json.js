var body = require("./index")

module.exports = jsonBody

function jsonBody(req, res, opts, callback) {
    if (typeof opts === "function") {
        callback = opts
        opts = {}
    }

    body(req, res, opts, function (err, body) {
        if (err) {
            return callback(err)
        }

        var json
        try {
            json = JSON.parse(body)
        } catch (error) {
            return callback(error)
        }

        callback(null, json)
    })
}
