var fs = require('fs');
var http = require('http');
var express = require('express');
var agent = require('hub-agent');

var HTTP_PORT = 4002;

var app = express();

app.use(agent.proxy());

agent(http.createServer(app), HTTP_PORT);

process.on('uncaughtException', function (err) {
    console.log('unhandled exception ' + err);
    console.log(err.stack);
});