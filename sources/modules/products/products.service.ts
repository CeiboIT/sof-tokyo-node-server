/// <reference path="../../../typings/tsd.d.ts" />
/// <reference path="../connection/connection.service.ts" />

import Q = require("q");
import connection = require('../connection/connection.service')

export class ProductsService {
	private db;
	constructor() {
		this.db = connection.service.getConnection();
	}

	getProductsList() {
		var deferred = Q.defer();
		this.db.connect((err, result) => {
			this.db.query('SELECT * from wp2_posts', function(err, rows) {
				if(err) throw err;
				deferred.resolve(rows)
			})
		})
		
		return deferred.promise;
	}
	
	getProductById(productId) {
		var deferred = Q.defer();
		this.db.connect((err, result) => {
			this.db.query('SELECT * from wp2_posts WHERE ID=' + productId , function(err, rows) {
				if(err) throw err;
				deferred.resolve(rows)
				this.db.end();
			})
		})
		
		return deferred.promise; 
	}

}