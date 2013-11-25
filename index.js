var StringDecoder = require("string_decoder").StringDecoder

module.exports = body

function body(req, res, callback) {
    var requestBody = ""
    var stringDecoder = new StringDecoder()

    req.on("data", onData)
    req.on("end", onEnd)
    req.on("error", onError)

    function onData(buffer) {
        requestBody += stringDecoder.write(buffer)
    }

    function onEnd() {
        cleanup()
        requestBody += stringDecoder.end()
        callback(null, requestBody)
    }

    function onError(err) {
        cleanup()
        callback(err)
    }

    function cleanup() {
        req.removeListener("data", onData)
        req.removeListener("end", onEnd)
        req.removeListener("error", onError)
    }
}
