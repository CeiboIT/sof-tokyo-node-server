///<reference path='../typings/hapi/hapi.d.ts' />
'use strict';

import hapi = require("hapi"); 

class ServerService {
	private server;
	constructor(){
		this.server = new hapi.Server()
	}
	
	startServer() {
		this.server.start(function(){
			console.log('Started');
		})
	}
	
}

var start = new ServerService();

start.startServer();

