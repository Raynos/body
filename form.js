var querystring = require("qs")

var body = require("./index")

module.exports = formBody

function formBody(req, res, opts, callback) {
    if (typeof opts === "function") {
        callback = opts
        opts = {}
    }

    body(req, res, opts, function (err, body) {
        if (err) {
            return callback(err)
        }

        callback(null, querystring.parse(body))
    })
}
