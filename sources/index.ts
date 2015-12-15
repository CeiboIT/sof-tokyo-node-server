///<reference path='../typings/hapi/hapi.d.ts' />
'use strict';

import hapi = require("hapi");
import ProductsRoutes = require("./modules/products/products.routes");

var _server = new hapi.Server()

this.server = new hapi.Server();
console.log(process.env);
this.server._host = process.env.HOSTNAME || 'localhost';
this.server._port = process.env.PORT||9000;

// add products api routes
for (var route in ProductsRoutes) {
	ProductsRoutes[route].path = '/api' + ProductsRoutes[route].path;
	this.server.route(ProductsRoutes[route])
}

//help for see all the routes

this.server.route({
	method: 'GET',
	path: '/api',
	handler: (request, reply) => {
		 var _table = this.server.table();
		 var _answer = {};
          _table.map((element) => {
            _answer[element.fingerprint] = {
				 path: element.path,
				 method: element.method
			}
        })
        reply(_answer);
	}
})

//this.server.connection({ port: process.env.PORT ||3000 });
this.server.start(() => {
	console.log('Started: ' + this.server.info.uri);
})

