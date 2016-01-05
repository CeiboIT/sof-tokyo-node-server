///<reference path='../typings/hapi/hapi.d.ts' />
'use strict';

import hapi = require("hapi");
import routes = require("./routes");

this.server = new hapi.Server();

var _host;

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
    console.log('✓ lout generator: API Documentation');
});

// Start server
this.server.start(() => {
    console.log('✓ Hapi: Server started at ' + this.server.info.uri);
})

