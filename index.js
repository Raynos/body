var StringDecoder = require("string_decoder").StringDecoder

module.exports = body

function body(req, res) { return function continuable(callback) {
    var requestBody = ""
    var stringDecoder = new StringDecoder()

    req.on("data", function addToBody(buffer) {
        requestBody += stringDecoder.write(buffer)
    })
    req.on("end", function returnBody() {
        callback(null, requestBody)
    })
} }
