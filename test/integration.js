var testServer = require("test-server")
    , test = require("testling")
    , routilBody = require("..")()
    , body = routilBody.body
    , formBody = routilBody.formBody
    , jsonBody = routilBody.jsonBody
    , anyBody = routilBody.anyBody
    , sendJson = require("routil").sendJson
    , after = require("after")

testServer(handleRequest, runTests)

function handleRequest(req, res) {
    if (req.url === "/body") {
        body(req, function (body) {
            sendJson(res, body)
        })
    } else if (req.url === "/form") {
        formBody(req, res, function (body) {
            sendJson(res, body)
        })
    } else if (req.url === "/json") {
        jsonBody(req, res, function (body) {
            sendJson(res, body)
        })
    } else if (req.url === "/any") {
        anyBody(req, res, function (body) {
            sendJson(res, body)
        })
    }
}

function runTests(request, done) {
    test("body works", function (t) {
        t.end = after(2, t.end.bind(t))
        testBody("/body", request, t)
        testBody("/any", request, t)
    })

    test("form works", function (t) {
        t.end = after(2, t.end.bind(t))
        testFormBody("/form", request, t)
        testFormBody("/any", request, t)
    })

    test("json works", function (t) {
        t.end = after(2, t.end.bind(t))
        testJsonBody("/json", request, t)
        testJsonBody("/any", request, t)
    })

    .on("end", done)
}

function testBody(uri, request, t) {
    request({
        uri: uri
        , body: "foo"
    }, function (err, res, body) {
        t.equal(err, null, "error is not null")

        t.equal(JSON.parse(body), "foo", "body is incorrect")

        t.end()
    })
}

function testFormBody(uri, request, t) {
    request({
        uri: uri
        , form: {
            foo: "bar"
        }
    }, function (err, res, body) {
        t.equal(err, null, "error is not null")

        t.equal(JSON.parse(body).foo, "bar", "body is incorrect")

        t.end()
    })
}

function testJsonBody(uri, request, t) {
    request({
        uri: uri
        , json: {
            foo: "bar"
        }
    }, function (err, res, body) {
        t.equal(err, null, "error is not null")

        t.equal(body.foo, "bar", "body is incorrect")

        t.end()
    })
}