var querystring = require("qs")
var map = require("continuable/map")
var body = require("./index")

module.exports = formBody

function formBody(req, res) {
    return map(function (body) {
        return querystring.parse(body)
    })(body(req, res))
}
