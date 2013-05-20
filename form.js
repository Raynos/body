var querystring = require("qs")
var map = require("continuable/map")
var maybeCallback = require("continuable/maybe-callback")

var body = require("./index")

var asForm = map(querystring.parse)

module.exports = maybeCallback(formBody)

//  formBody := (req: HttpRequest, res: HttpResponse)
//      => Continuable<Object>
function formBody(req, res) {
    return asForm(body(req, res))
}
