'use strict';

/// <reference path="../../../typings/tsd.d.ts" />
/// <reference path="./products.service.ts" />


import service = require('./products.service');
import Joi = require('joi');

var ProductsService = new service.ProductsService();
var _prefix = '/products';
var products = [
    {
        method: 'GET',
        path: _prefix + '/list/{page}',
        handler: function(request, reply) {
            ProductsService.getProductsList(request.params.page || 1).then((data: Array<any>) => {
                reply(data);
            })
        },
        config: {
            validate: {
                query: {
                    page: Joi.number().integer()
                }
            },
            description: 'Retrieves Products list'
        }
    },
    {
        method: 'GET',
        path: _prefix + '/product/{productId}',
        handler: function(request, reply) {
            ProductsService.getProductById(request.params.productId).then((data) => {
                reply(data);
            })
        },
        config: {
            validate: {
                query: {
                    productId: Joi.number().integer()
                }
            },
            description: 'Retrieve Product with matched ProductID'
        }
    },
    {
        method: 'GET',
        path: _prefix + '/byauthor/{authorId}/{page}',
        handler: function(request, reply) {
            ProductsService.getProductsByAuthor(request.params.authorId, request.params.page || 1).then((data: Array<any>) => {
                reply(data);
            })
        },
        config: {
            validate: {
                query: {
                    authorId: Joi.number().integer(),
                    page: Joi.number().integer()
                }
            },
            description: 'Retrieve Products from matched AuthorID'
        }
    },
    {
        method: 'GET',
        path: _prefix + '/bycategory/{categoryId}/{page}',
        handler: function(request, reply) {
            ProductsService.getProductsByCategory(request.params.categoryId, request.params.page || 1).then((data: Array<any>) => {
                reply(data);
            })
        },
        config: {
            validate: {
                query: {
                    categoryId: Joi.number().integer(),
                    page: Joi.number().integer()
                }
            },
            description: 'Retrieve Products from matched CategoryID'
        }
    },
    {
        method: 'GET',
        path: _prefix + '/bytag/{tagId}/{page}',
        handler: function(request, reply) {
            ProductsService.getProductsByTag(request.params.tagId, request.params.page || 1).then((data: Array<any>) => {
                reply(data);
            })
        },
        config: {
            validate: {
                query: {
                    tagId: Joi.number().integer(),
                    page: Joi.number().integer()
                }
            },
            description: 'Retrieve Products from matched TagID'
        }
    }
]


module.exports = products;

