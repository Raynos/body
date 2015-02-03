var rawBody = require("raw-body")

var parseArguments = require("./parse-arguments.js")

var ONE_MB = 1024 * 1024

module.exports = body

function body(req, res, opts, callback) {
    var args = parseArguments(req, res, opts, callback)
    req = args.req
    res = args.res
    opts = args.opts
    callback = args.callback

    if (!callback) {
        return body.bind(null, req, res, opts)
    }

    var limit = "limit" in opts ? opts.limit : ONE_MB
    var contentLength = req.headers ?
        Number(req.headers["content-length"]) : null;

    if (opts.cache && req.__rawBody__) {
        process.nextTick(function() {
            callback(null, req.__rawBody__);
        });
        return;
    }

    rawBody(req, {
        limit: limit,
        length: contentLength,
        encoding: "encoding" in opts ? opts.encoding : true
    }, function onRawBody(err, string) {
        if (!err && opts.cache) {
            Object.defineProperty(req, '__rawBody__', {
                configurable: true,
                enumerable: false,
                value: string
            });
        }

        callback(err, string);
    });
}
