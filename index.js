var StringDecoder = require("string_decoder").StringDecoder
var maybeCallback = require("continuable/maybe-callback")

module.exports = maybeCallback(body)

// body := (req: HttpRequest) => Continuable<Buffer>
function body(req) {
    return function continuable(callback) {
        var requestBody = ""
        var stringDecoder = new StringDecoder()

        req.on("data", function addToBody(buffer) {
            requestBody += stringDecoder.write(buffer)
        })
        req.on("end", function returnBody() {
            callback(null, requestBody)
        })
    }
}
