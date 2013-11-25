var body = require("./index")

module.exports = jsonBody

function jsonBody(req, res, cb) {
    body(req, res, function (err, body) {
        if (err) {
            return cb(err)
        }

        var json
        try {
            json = JSON.parse(body)
        } catch (error) {
            return cb(error)
        }

        cb(null, json)
    })
}
