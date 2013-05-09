var body = require("./index")

module.exports = jsonBody

function jsonBody(req, res) {
    return function continuable(cb) {
        body(req, res)(function (_, body) {
            var json
            try {
                json = JSON.parse(body)
            } catch (error) {
                return cb(error)
            }

            cb(null, json)
        })
    }
}
