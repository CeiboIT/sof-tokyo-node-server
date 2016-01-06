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
            ProductsService.getProductsList(
                request.params.page || 1)
            .then((data: Array<any>) => {
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
            ProductsService.getProductById(
                request.params.productId)
            .then((data) => {
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
            ProductsService.getProductsByAuthor(
                request.params.authorId,
                request.params.page || 1)
            .then((data: Array<any>) => {
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
            ProductsService.getProductsByCategory(
                request.params.categoryId,
                request.params.page || 1)
            .then((data: Array<any>) => {
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
            ProductsService.getProductsByTag(
                request.params.tagId,
                request.params.page || 1)
            .then((data: Array<any>) => {
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
    },
    {
        method: 'POST',
        path: _prefix + '/create',
        handler: function(request, reply) {
            ProductsService.createProduct(
                request.payload.nonce,
                request.payload.author,
                request.payload.title,
                request.payload.content,
                request.payload.status,
                request.payload.categories,
                request.payload.tags)
                .then((data) => {
                    reply(data);
                })
        },
        config: {
            validate: {
                query: {
                    nonce: Joi.string(),
                    author: Joi.string(),
                    title: Joi.string(),
                    content: Joi.string(),
                    status: Joi.string(),
                    categorias: Joi.array(),
                    tags: Joi.array()
                }
            },
            description: 'Create a new Product'
        }
    },
    {
        method: 'PUT',
        path: _prefix + '/update',
        handler: function(request, reply) {
            ProductsService.updateProduct(
                request.payload.nonce,
                request.payload.productId,
                request.payload.author,
                request.payload.title,
                request.payload.content,
                request.payload.status,
                request.payload.categories,
                request.payload.tags)
                .then((data) => {
                    reply(data);
                })
        },
        config: {
            validate: {
                query: {
                    nonce: Joi.string(),
                    productId: Joi.number().integer(),
                    author: Joi.string(),
                    title: Joi.string(),
                    content: Joi.string(),
                    status: Joi.string(),
                    categorias: Joi.array(),
                    tags: Joi.array()
                }
            },
            description: 'Create a new Product'
        }
    }
]


module.exports = products;

