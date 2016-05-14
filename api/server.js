var express = require('express'),
    bodyParser = require('body-parser'),
    request = require('request');

var config = {
    clientId: '54c368d51bca18a17397',
    clientSecret: '54f4a73d35b7274819add275902ee515dc715bb1',

    callbackURI: 'http://localhost:3000/callback',
    scope: 'user'
};

var app = express();

app.use(function(req, res) {
    if (req.method === 'OPTIONS') {
        var headers = {};
        // IE8 does not allow domains to be specified, just the *
        // headers["Access-Control-Allow-Origin"] = req.headers.origin;
        headers["Access-Control-Allow-Origin"] = "*";
        headers["Access-Control-Allow-Methods"] = "POST, GET, PUT, DELETE, OPTIONS";
        headers["Access-Control-Allow-Credentials"] = false;
        headers["Access-Control-Max-Age"] = '86400'; // 24 hours
        headers["Access-Control-Allow-Headers"] = "X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept";
        res.writeHead(200, headers);
        return res.end();
    }
    console.info(req.url)
});
app.use(bodyParser.json());

app.post('/auth/github', function (req, res) {
    console.info(req.body);
    var query = url.parse(req.url, true).query;
    var code = query.code;

    if (!code) return res.status(500).json({ error: 'missing oauth code' });

    var u = 'https://github.com/login/oauth/access_token'
            + '?client_id=' + config.clientId
            + '&client_secret=' + config.clientSecret
            + '&code=' + code
    //+ '&state=' + state
        ;
    request.get({url: u, json: true}, function (err, tokenResp, body) {
        if (err) {
            return res.status(500).json({ error: err });
        }

        return res.json(body);
    });
});

app.listen(8080);