/// <reference path="../../../typings/tsd.d.ts" />
/// <reference path="../connection/connection.service.ts" />

import Q = require("q");
import connection = require('../connection/connection.service')

export interface IProductsService {
	getProductsList(): Q.IPromise<{}>
	getProductById(productId): Q.IPromise<{}>
}


export class ProductsService implements IProductsService {
	private db;
	constructor() {
		this.db = connection.service;
	}

	getProductsList(): Q.IPromise<{}> {
		return this.db.query('SELECT * from wp2_posts')
	}

	getProductById(productId): Q.IPromise<{}> {
		return this.db.query('SELECT * from wp2_posts WHERE ID=' + productId)
	}
};