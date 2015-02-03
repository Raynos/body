var after = require('after');
var body = require('../index.js');
var hammock = require('hammock');
var test = require('tape');

test('caching works', function t(assert) {
    var request = hammock.Request({
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
        url: '/somewhere'
    });
    var response = hammock.Response();

    var done = after(2, assert.end.bind(assert));

    body(request, response, { cache: true }, function onBody() {
        assert.equal(request.__rawBody__, 'thisbody', 'raw body has been set');
        assert.pass('body is parsed');
        done();
    });

    request.on('end', function() {
        body(request, response, { cache: true }, function onBody(err, body) {
            assert.equal(body, 'thisbody', 'cached body is provided');
            assert.pass('body is parsed');
            done();
        });
    });

    request.end('thisbody');
});
