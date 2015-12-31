///<reference path='../../../typings/tsd.d.ts' />
'use strict';

import mysql = require("mysql");

export class ConnectionService
 {
	 private connection;

	 constructor() {
		 var _dbConfig =
			{
                host		: 'gator2009.hostgator.com',
                user		: 'tdnb1207_sof',
                password	: 'pkc~^_9WZ(us',
                //database	: 'tdnb1207_sof', // production
                database	: 'tdnb1207_sof_develop', // develop
				debug    	: false,
				insecureAuth: true
			};

			this.connection = mysql.createConnection(_dbConfig);
	 }

	 getConnection() {
		 return this.connection;
	 }

 }

 export var service = new ConnectionService();
