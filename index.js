var log = require('logger')('accounts');
var clustor = require('clustor');

var self = '*.accounts.serandives.com';
var port = 4002;

clustor(function () {
    var fs = require('fs');
    var http = require('http');
    var express = require('express');
    var agent = require('hub-agent');
    var proxy = require('proxy');
    var procevent = require('procevent')(process);

    var app = express();

    app.use(proxy);

    var server = http.createServer(app);
    server.listen(port);

    agent('/drones', function (err, io) {
        proxy.listen(self, io);
        procevent.emit('started');
    });

}, function (err, address) {
    log.info('drone started | domain:%s, address:%s, port:%s', self, address.address, address.port);
});

process.on('uncaughtException', function (err) {
    log.fatal('unhandled exception %s', err);
    log.trace(err.stack);
});
