var debug = require('debug')('serandules-accounts');
var fs = require('fs');
var http = require('http');
var express = require('express');
var agent = require('hub-agent');

var HTTP_PORT = 4002;

var app = express();

app.use(agent.proxy());

//error handling
app.use(agent.error);

agent(http.createServer(app), HTTP_PORT);

process.on('uncaughtException', function (err) {
    debug('unhandled exception ' + err);
    debug(err.stack);
});