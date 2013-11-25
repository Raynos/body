var querystring = require("qs")

var body = require("./index")

module.exports = formBody

function formBody(req, res, callback) {
    body(req, res, function (err, body) {
        if (err) {
            return callback(err)
        }

        callback(null, querystring.parse(body))
    })
}
