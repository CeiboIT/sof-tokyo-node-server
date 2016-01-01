'use strict';

/// <reference path="../../../typings/tsd.d.ts" />
/// <reference path="./products.service.ts" />


import service = require('./products.service');

var ProductsService = new service.ProductsService();
var _prefix = '/products';
var products = [
	{
	method: 'GET',
	path: _prefix + '/list',
	handler: function(request, reply) {
		ProductsService.getProductsList().then((data: Array<any>) => {
				reply(data);
			})
		}
	},
	{
	method: 'GET',
	path: _prefix + '/product/{productId}',
	handler: function(request, reply) {
		ProductsService.getProductById(request.params.productId).then((data) => {
				reply(data);
			})
		}
	}
]


module.exports = products;

