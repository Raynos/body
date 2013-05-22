var StringDecoder = require("string_decoder").StringDecoder
var maybeCallback = require("continuable/maybe-callback")

module.exports = maybeCallback(body)

// body := (req: HttpRequest) => Continuable<Buffer>
function body(req) {
    return function continuable(callback) {
        var requestBody = ""
        var stringDecoder = new StringDecoder()

        function addToBody(buffer) {
            requestBody += stringDecoder.write(buffer)
        }
        function returnBody() {
            cleanup()
            callback(null, requestBody)
        }
        function onError(err) {
            cleanup()
            callback(err)
        }
        function cleanup() {
            req.removeListener("data", addToBody)
            req.removeListener("end", returnBody)
            req.removeListener("error", onError)
        }
        req.on("data", addToBody)
        req.on("end", returnBody)
        req.on("error", onError)
    }
}
