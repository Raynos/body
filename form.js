var querystringParse = require("querystring").parse

var body = require("./index")

module.exports = formBody

function formBody(req, res, opts, callback) {
    if (typeof opts === "function") {
        callback = opts
        opts = {}
    }

    if (!callback) {
        return formBody.bind(null, req, res, opts)
    }

    var parse = opts.querystring ? opts.querystring.parse : querystringParse

    body(req, res, opts, function (err, body) {
        if (err) {
            return callback(err)
        }

        callback(null, parse(body))
    })
}
