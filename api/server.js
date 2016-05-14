var express = require('express'),
    bodyParser = require('body-parser'),
    request = require('request');

var config = {
    gitHubClientId: '',
    gitHubSecret: '',
    googleSecret: '',
    scope: 'user'
};

var app = express();

app.use(function(req, res, next) {
    if (req.method === 'OPTIONS') {
        var headers = {};
        // IE8 does not allow domains to be specified, just the *
        //headers["Access-Control-Allow-Origin"] = req.headers.origin;
        headers["Access-Control-Allow-Origin"] = "*";
        headers["Access-Control-Allow-Methods"] = "POST, GET, PUT, DELETE, OPTIONS";
        headers["Access-Control-Allow-Credentials"] = false;
        headers["Access-Control-Max-Age"] = '86400'; // 24 hours
        headers["Access-Control-Allow-Headers"] = "Authorization, X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept";
        res.writeHead(200, headers);
        return res.end();
    }
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

    next();
});
app.use(bodyParser.json());

app.post('/auth/github', function (req, res) {
    var code = req.body.code;

    if (!code) return res.status(500).json({ error: 'missing oauth code' });

    var url = 'https://github.com/login/oauth/access_token';

    var params = {
        code: code,
        client_id: config.gitHubClientId,
        client_secret: config.gitHubSecret
    };
    request.get(url, { json: true, form: params }, function (err, tokenResp, body) {
        if (err) {
            return res.status(500).json({ error: err });
        }
        body.token = body.access_token;
        return res.json(body);
    });
});

app.post('/auth/google', function (req, res) {
    var code = req.body.code;

    if (!code) return res.status(500).json({ error: 'missing oauth code' });

    var accessTokenUrl = 'https://accounts.google.com/o/oauth2/token';
    var params = {
        code: req.body.code,
        client_id: req.body.clientId,
        client_secret: config.googleSecret,
        redirect_uri: req.body.redirectUri,
        grant_type: 'authorization_code'
    };

    request.post(accessTokenUrl, { json: true, form: params }, function(err, response, token) {
        token.token = token.access_token;
        return res.json(token);
    });
});

app.listen(8080);