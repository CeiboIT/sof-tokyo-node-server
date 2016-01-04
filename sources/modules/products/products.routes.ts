'use strict';

/// <reference path="../../../typings/tsd.d.ts" />
/// <reference path="./products.service.ts" />


import service = require('./products.service');

var ProductsService = new service.ProductsService();
var _prefix = '/products';
var products = [
    {
        method: 'GET',
        path: _prefix + '/list/{page}',
        handler: function(request, reply) {

            ProductsService.getProductsList(request.params.productId || 1).then((data: Array<any>) => {
                reply(data);
            })
        },
        config: {
            description: 'Say hello'
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
    },
    {
        method: 'GET',
        path: _prefix + '/byauthor/{authorId}/{page}',
        handler: function(request, reply) {
            ProductsService.getProductsByAuthor(request.params.authorId).then((data) => {
                reply(data);
            })
        }
    },
    {
        method: 'GET',
        path: _prefix + '/bycategory/{categoryId}/{page}',
        handler: function(request, reply) {
            ProductsService.getProductsByCategory(request.params.categoryId).then((data) => {
                reply(data);
            })
        }
    }
]


module.exports = products;

