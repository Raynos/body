var rawBody = require("raw-body")

var ONE_MB = 1024 * 1024

module.exports = body

function body(req, res, opts, callback) {
    if (typeof opts === "function") {
        callback = opts
        opts = {}
    }

    var limit = "limit" in opts ? opts.limit : ONE_MB
    var contentLength = Number(req.headers["content-length"] || "")

    rawBody(req, {
        limit: limit,
        length: contentLength,
        encoding: true
    }, callback)
}
