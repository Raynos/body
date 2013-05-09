var querystring = require("qs")
var body = require("./index")

module.exports = formBody

function formBody(req, res) {
    return function continuable(callback) {
        body(req, res)(function (_, body) {
            callback(null, querystring.parse(body))
        })
    }
}
