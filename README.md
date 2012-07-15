# routil-body [![build status][1]][2]

Body parsing

## Example

`body` simply parses the request body and returns it in the callback. `jsonBody` and `formBody` call JSON.parse and querystring.parse respectively on the body. 

anyBody will detect the content-type of the request and use the appropiate body method.

    var Body = require("routil-body")
        , bodyParser = Body()
        , body = bodyParser.body
        , formBody = bodyParser.formBody
        , jsonBody = bodyParser.jsonBody
        , anyBody = bodyParser.anyBody
        , http = require("http")

    http.createServer(function (req, res) {
        if (req.url === '/json') {
            jsonBody(req, res, function (body) {
                res.end(JSON.stringify(body))
            })
        } else if (req.url === '/form') {
            formbody(req, res, function (body) {
                res.end(JSON.stringify(body))
            })
        } else if (req.url === '/any') {
            anyBody(req, res, function (body) {
                res.end(JSON.stringify(body))
            })
        } else {
            body(req, function (body) {
                res.end(body.toString())
            })
        }
    }).listen(8080)

## Example with custom error handling

    var jsonBody = require("routil-body")({
            errorPage: function (req, res, errorData) {
                // errorData is either a single value or an array of values
                // the values are either a number for the HTTP response code
                // or an object error object
            }
        }).jsonBody
        , http = require('http')

    http.createServer(function (req, res) {
        jsonBody(req, function (body) { res.end(body) })
    }).listen(8080)

## Installation

`npm install routil-body`

## Tests

`make test`

## Contributors

 - Raynos

## MIT Licenced

  [1]: https://secure.travis-ci.org/Raynos/routil-body.png
  [2]: http://travis-ci.org/Raynos/routil-body