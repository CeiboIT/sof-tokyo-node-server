///<reference path='../typings/hapi/hapi.d.ts' />
'use strict';

import hapi = require("hapi");
import ProductsService = require("./modules/products/products.service");

class ServerService {
	private server;


	constructor() {
		this.server = new hapi.Server()

		this.server.route({
			method: 'GET',
			path: '/',
			handler: ProductsService.service.getProductsList()
		});
	}

	startServer() {
		this.server.start(function() {
			console.log('Started');
		})
	}



}

var start = new ServerService();
start.startServer();

