# body [![build status][1]][2]

Body parsing

## Example

```js
var body = require("body")
var jsonBody = require("body/json")
var formBody = require("body/form")
var anyBody = require("body/any")
var http = require("http")
var sendJson = require("send-data/json")

http.createServer(function handleRequest(req, res) {
    function send(err, body) {
        sendJson(req, res, body)
    }

    if (req.url === "/body") {
        body(req, res, send)
    } else if (req.url === "/form") {
        formBody(req, res, send)
    } else if (req.url === "/json") {
        jsonBody(req, res, send)
    } else if (req.url === "/any") {
        anyBody(req, res, send)
    }
})
```

`body` simply parses the request body and returns it in the callback. `jsonBody` and `formBody` call JSON.parse and querystring.parse respectively on the body.

anyBody will detect the content-type of the request and use the appropiate body method.

## Installation

`npm install body`

## Tests

`npm test`

## Contributors

 - Raynos

## MIT Licenced

  [1]: https://secure.travis-ci.org/Raynos/body.png
  [2]: http://travis-ci.org/Raynos/body
