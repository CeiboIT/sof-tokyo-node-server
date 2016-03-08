///<reference path='../typings/hapi/hapi.d.ts' />
'use strict';

import hapi = require('hapi');
import routes = require("./routes");

this.server = new hapi.Server({
    cache: [{
        name: 'mongoCache',
        engine: require('catbox-mongodb'),
        location: 'mongodb://heroku_pbrg0ccm:e4o3nqu0m472a7riofofa5psib@ds019498.mlab.com:19498/heroku_pbrg0ccm',
        partition: 'cache' 
    }]
});

// this.client.start();


var _host;
var lout_status = false;

if (process.env.NODE_ENV != 'development') {
    _host = '0.0.0.0';
} else {
    _host = 'localhost';
}

this.server.connection({
    port: process.env.PORT || 9000,
    host: _host
})

// Add all API routes
for (var route in routes) {
    routes[route].path = '/api' + routes[route].path;
    this.server.route(routes[route])
}

// Lout documentation to see all the API routes
this.server.register([require('vision'), require('inert'), {
    register: require('lout'),
    options: {
        endpoint: '/api'
    }
}], function() {
    lout_status = true;
});

// Start server
this.server.start(() => {
    if (lout_status == true) console.log('✓ lout: API Documentation generated at ' + this.server.info.uri + '/api');
    console.log('✓ Hapi: Server started at ' + this.server.info.uri);
});

module.exports = this.server;
