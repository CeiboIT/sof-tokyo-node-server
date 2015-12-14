///<reference path='../../../typings/tsd.d.ts' />
'use strict';

import mysql = require("mysql");

export class ConnectionService
 {	 
	 private connection;
	 
	 constructor() {
		 var _dbConfig =
			{
				host     : 'localhost',
				user     : 'root',
				password : '',
				database : 'sof_tokyo',
				debug    :  false,
				insecureAuth: true
			};
			
			this.connection = mysql.createConnection(_dbConfig);
	 }
	 
	 getConnection() {
		 return this.connection;
	 }
	 
	 
 }
 
 export var service = new ConnectionService();