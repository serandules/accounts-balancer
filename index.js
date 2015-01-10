var debug = require('debug')('serandules:accounts');
var agent = require('hub-agent');

agent(function() {
    var fs = require('fs');
    var http = require('http');
    var express = require('express');

    var HTTP_PORT = 4002;

    var app = express();

    app.use(agent.proxy());

    //error handling
    app.use(agent.error);

    http.createServer(app).listen(HTTP_PORT);
});

process.on('uncaughtException', function (err) {
    debug('unhandled exception ' + err);
    debug(err.stack);
});