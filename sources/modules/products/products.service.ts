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
				deferred.resolve(rows)
			})
		})
		
		return deferred.promise;
	}

}