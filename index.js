var StringDecoder = require("string_decoder").StringDecoder
    , querystring = require("querystring")
    , routil = require("routil")
    , routilErrorPage = routil.errorPage
    , contentTypes = routil.contentTypes
    , isJSON = /\/(x-)?json$/
    , isForm = /application\/x\-www\-form\-urlencoded/

module.exports = Body

function Body(options) {
    var errorPage = routilErrorPage || options.errorPage

    return {
        body: body,
        formBody: formBody,
        jsonBody: jsonBody,
        anyBody: anyBody
    }

    function formBody(req, res, callback)  {
        if (!req.headers['content-type'].match(isForm)) {
            // XXX Add support for formidable uploading, as well
            return errorPage(req, res, 415)
        }
        body(req, parseBody)

        function parseBody(body) {
            callback(querystring.parse(body))
        }
    }

    function jsonBody(req, res, callback) {
        if (!req.headers["content-type"].match(isJSON)) {
            return errorPage(req, res, 415)
        }
        body(req, extractJSON)

        function extractJSON(body) {
            var json
            try {
                json = JSON.parse(body)
            } catch (error) {
                return errorPage(req, res, [400, error])
            }
            callback(json)
        }
    }

    function anyBody(req, res, callback) {
        contentTypes(req, {
            "application/json": jsonBody,
            "application/x-www-form-urlencoded": formBody,
            "default": defaultAnyBodyHandler
        })(req, res, callback)
    }
}

function body(req, callback) {
    if (req.__routil_body__) {
        callback(req.__routil_body__)
    }

    var requestBody = "",
        stringDecoder = new StringDecoder

    req.on("data", addToBody)

    req.on("end", returnBody)

    function addToBody(buffer) {
        requestBody += stringDecoder.write(buffer)
    }

    function returnBody() {
        req.__routil_body__ = requestBody
        callback(requestBody)
    }
}

function defaultAnyBodyHandler(req, res, callback) {
    body(req, callback)
}