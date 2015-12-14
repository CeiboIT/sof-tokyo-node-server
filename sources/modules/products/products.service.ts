/// <reference path="../../../typings/tsd.d.ts" />
/// <reference path="../connection/connection.service.ts" />


import connection = require('../connection/connection.service')

export class ProductsService {
	private db;
	constructor() {
		this.db = connection.service.getConnection()
	}

	getProductsList() {
		this.db.connect(() => {
			this.db.query('SELECT * from wp2_posts', function(err, rows) {
				console.log(rows);
			})
		})
	}

}

export var service = new ProductsService();