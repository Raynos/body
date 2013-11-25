var StringDecoder = require("string_decoder").StringDecoder
var TypedError = require("error/typed")

var ONE_MB = 1024 * 1024
var ENTITY_TOO_LARGE = TypedError({
    message: "Request entity too large: %s",
    type: "entity.too.large",
    statusCode: 413
})
var REQUEST_SIZE_INVALID = TypedError({
    message: "Request size did not match content length: %s",
    type: "request.size.invalid",
    statusCode: 400
})

module.exports = body

function body(req, res, opts, callback) {
    if (typeof opts === "function") {
        callback = opts
        opts = {}
    }

    var requestBody = ""
    var limit = "limit" in opts ? opts.limit : ONE_MB
    var contentLength = Number(req.headers["content-length"] || "")
    var stringDecoder = new StringDecoder()
    var received = 0

    if (contentLength && contentLength > limit) {
        return callback(ENTITY_TOO_LARGE(contentLength))
    }

    req.on("data", onData)
    req.on("end", onEnd)
    req.on("error", onError)

    function onData(buffer) {
        received += buffer.length
        requestBody += stringDecoder.write(buffer)

        if (received > limit) {
            cleanup()
            return callback(ENTITY_TOO_LARGE(received))
        }
    }

    function onEnd() {
        cleanup()
        requestBody += stringDecoder.end()

        if (contentLength && contentLength !== received) {
            return callback(REQUEST_SIZE_INVALID(received))
        }

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
