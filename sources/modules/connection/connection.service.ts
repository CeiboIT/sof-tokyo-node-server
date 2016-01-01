///<reference path='../../../typings/tsd.d.ts' />
'use strict';

import mysql = require("mysql");
import q = require("q");

export class ConnectionService
 {
	 private connectionStream;
	 private dbConfig;
	 
	 constructor() {
		this.dbConfig = { 
			host		: 'gator2009.hostgator.com',
                user		: 'tdnb1207_sof',
                password	: 'pkc~^_9WZ(us',
                //database	: 'tdnb1207_sof', // production
                database	: 'tdnb1207_sof_develop', // develop
				debug    	: false,
				insecureAuth: true
			}
	 }
	 
	 query (query) {
		 var defer = q.defer();
		 var _connection = mysql.createConnection(this.dbConfig);
		 _connection.query(query, (err, rows) => {
			 _connection.end();
			 if(err) {
				 defer.reject(err); throw err
			};
			defer.resolve(rows);
		 })
		 return defer.promise;
	 }

 }

 export var service = new ConnectionService();
