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
        path: _prefix + '/new/{page}',
        handler: function(request, reply) {
            ProductsService.getProductsNew(
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
            description: 'Retrieves new Products',
            tags: ['products']
        }
    },
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
            description: 'Retrieves Products list',
            tags: ['products']
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
            description: 'Retrieve Product with matched ProductID',
            tags: ['products']
        }
    },
    {
        method: 'GET',
        path: _prefix + '/byauthor/{author}/{page}',
        handler: function(request, reply) {
            ProductsService.getProductsByAuthor(
                request.params.author)
            .then((data: Array<any>) => {
                reply(data);
            })
        },
        config: {
            validate: {
                query: {
                    author: Joi.string(),
                    page: Joi.number().integer()
                }
            },
            description: 'Retrieve Products from matched Author',
            tags: ['products']
        }
    },
    {
        method: 'GET',
        path: _prefix + '/byschool/{school}/{page}',
        handler: function(request, reply) {
            ProductsService.getProductsBySchool(
                request.params.school,
                request.params.page || 1)
                .then((data: Array<any>) => {
                    reply(data);
                })
        },
        config: {
            validate: {
                query: {
                    school: Joi.string(),
                    page: Joi.number().integer()
                }
            },
            description: 'Retrieve Products from matched School',
            tags: ['products']
        }
    },
    {
        method: 'GET',
        path: _prefix + '/bysubcategory0/{subcategory0}/{page}',
        handler: function(request, reply) {
            ProductsService.getProductsBySubcategory0(
                request.params.subcategory0,
                request.params.page || 1)
                .then((data: Array<any>) => {
                    reply(data);
                })
        },
        config: {
            validate: {
                query: {
                    subcategory0: Joi.string(),
                    page: Joi.number().integer()
                }
            },
            description: 'Retrieve Products from matched Subcategory0',
            tags: ['products']
        }
    },
    {
        method: 'GET',
        path: _prefix + '/bysubcategory1/{subcategory1}/{page}',
        handler: function(request, reply) {
            ProductsService.getProductsBySubcategory1(
                request.params.subcategory1,
                request.params.page || 1)
                .then((data: Array<any>) => {
                    reply(data);
                })
        },
        config: {
            validate: {
                query: {
                    subcategory1: Joi.string(),
                    page: Joi.number().integer()
                }
            },
            description: 'Retrieve Products from matched Subcategory1',
            tags: ['products']
        }
    },
    {
        method: 'GET',
        path: _prefix + '/bystyle/{style}/{page}',
        handler: function(request, reply) {
            ProductsService.getProductsByStyle(
                request.params.style,
                request.params.page || 1)
                .then((data: Array<any>) => {
                    reply(data);
                })
        },
        config: {
            validate: {
                query: {
                    style: Joi.string(),
                    page: Joi.number().integer()
                }
            },
            description: 'Retrieve Products from matched Style',
            tags: ['products']
        }
    },
    {
        method: 'GET',
        path: _prefix + '/bysex/{sex}/{page}',
        handler: function(request, reply) {
            ProductsService.getProductsBySex(
                request.params.sex,
                request.params.page || 1)
                .then((data: Array<any>) => {
                    reply(data);
                })
        },
        config: {
            validate: {
                query: {
                    sex: Joi.string(),
                    page: Joi.number().integer()
                }
            },
            description: 'Retrieve Products from matched Sex',
            tags: ['products']
        }
    },
    {
        method: 'POST',
        path: _prefix + '/create',
        handler: function(request, reply) {
            ProductsService.createProduct(
                request.payload.authorId,
                request.payload.title,
                request.payload.content,
                request.payload.img,
                request.payload.subcategory0,
                request.payload.subcategory1,
                request.payload.styles,
                request.payload.sex,
                request.payload.subImg1,
                request.payload.subImg2,
                request.payload.subImg3,
                request.payload.subImg4,
                request.payload.subImg5,
                request.payload.subImg6,
                request.payload.productionCost,
                request.payload.sell,
                request.payload.sellPrice,
                request.payload.SellNote,
                request.payload.rental,
                request.payload.rentalPrice,
                request.payload.rentalNote
            )
                .then((data) => {
                    reply(data);
                })
        },
        config: {
            validate: {
                query: {
                    authorId: Joi.number().integer(),
                    title: Joi.string(),
                    content: Joi.string(),
                    img: Joi.string(),
                    subcategory0: Joi.string(),
                    subcategory1: Joi.string(),
                    styles: Joi.array(),
                    sex: Joi.string(),
                    subImg1: Joi.string(),
                    subImg2: Joi.string(),
                    subImg3: Joi.string(),
                    subImg4: Joi.string(),
                    subImg5: Joi.string(),
                    subImg6: Joi.string(),
                    productionCost: Joi.number().integer(),
                    sell: Joi.string(),
                    sellPrice: Joi.number().integer(),
                    sellNote: Joi.string(),
                    rental: Joi.string(),
                    rentalPrice: Joi.number().integer(),
                    rentalNote: Joi.string()
                }
            },
            description: 'Create a new Product',
            tags: ['products']
        }
    },
    {
        method: 'PUT',
        path: _prefix + '/update',
        handler: function(request, reply) {
            ProductsService.createProduct(
                request.payload.productId,
                request.payload.title,
                request.payload.content,
                request.payload.img,
                request.payload.subcategory0,
                request.payload.subcategory1,
                request.payload.styles,
                request.payload.sex,
                request.payload.subImg1,
                request.payload.subImg2,
                request.payload.subImg3,
                request.payload.subImg4,
                request.payload.subImg5,
                request.payload.subImg6,
                request.payload.productionCost,
                request.payload.sell,
                request.payload.sellPrice,
                request.payload.SellNote,
                request.payload.rental,
                request.payload.rentalPrice,
                request.payload.rentalNote
            )
                .then((data) => {
                    reply(data);
                })
        },
        config: {
            validate: {
                query: {
                    productId: Joi.number().integer(),
                    title: Joi.string(),
                    content: Joi.string(),
                    img: Joi.string(),
                    subcategory0: Joi.string(),
                    subcategory1: Joi.string(),
                    styles: Joi.array(),
                    sex: Joi.string(),
                    subImg1: Joi.string(),
                    subImg2: Joi.string(),
                    subImg3: Joi.string(),
                    subImg4: Joi.string(),
                    subImg5: Joi.string(),
                    subImg6: Joi.string(),
                    productionCost: Joi.number().integer(),
                    sell: Joi.string(),
                    sellPrice: Joi.number().integer(),
                    sellNote: Joi.string(),
                    rental: Joi.string(),
                    rentalPrice: Joi.number().integer(),
                    rentalNote: Joi.string()
                }
            },
            description: 'Update a Product',
            tags: ['products']
        }
    },
    {
        method: 'DELETE',
        path: _prefix + '/delete',
        handler: function(request, reply) {
            ProductsService.deleteProduct(
                request.payload.nonce,
                request.payload.productId)
                .then((data) => {
                    reply(data);
                })
        },
        config: {
            validate: {
                query: {
                    nonce: Joi.string(),
                    productId: Joi.number().integer()
                }
            },
            description: 'Delete a Product',
            tags: ['products']
        }
    },
    {
        method: 'POST',
        path: _prefix + '/comments/create',
        handler: function(request, reply) {
            ProductsService.createComment(
                request.payload.productId,
                request.payload.cookie,
                request.payload.content)
                .then((data) => {
                    reply(data);
                })
        },
        config: {
            validate: {
                query: {
                    productId: Joi.number().integer(),
                    cookie: Joi.string(),
                    content: Joi.string()
                }
            },
            description: 'Create a new Comment',
            tags: ['products']
        }
    },
    {
        method: 'GET',
        path: _prefix + '/search/{search}/{page}',
        handler: function(request, reply) {
            ProductsService.getProductsBySearch(
                request.params.search,
                request.params.page || 1)
                .then((data: Array<any>) => {
                    reply(data);
                })
        },
        config: {
            validate: {
                query: {
                    search: Joi.string(),
                    page: Joi.number().integer()
                }
            },
            description: 'Retrieve Products from matched Search string',
            tags: ['products']
        }
    },
    {
        method: 'GET',
        path: _prefix + '/searchOptions/{search}/{subcategory0}/{subcategory1}/{style}/{sex}',
        handler: function(request, reply) {
            ProductsService.getProductsByOptionsSearch(
                request.params.search,
                request.params.subcategory0,
                request.params.subcategory1,
                request.params.style,
                request.params.sex)
                .then((data: Array<any>) => {
                    reply( { products: data });
                })
        },
        config: {
            validate: {
                query: {
                    search: Joi.string(),
                    subcategory0: Joi.string(),
                    subcategory1: Joi.string(),
                    style: Joi.string(),
                    sex: Joi.string()
                }
            },
            description: 'Retrieve Products from matched Search options',
            tags: ['products'],
            notes: [
                "Set parameter value 'null' to skip any parameter search"
            ]
        }
    },
    {
        method: 'GET',
        path: _prefix + '/ranking/likes',
        handler: function(request, reply) {
            ProductsService.getProductsRankingByLikes()
                .then((data: Array<any>) => {
                    reply({posts: data });
                })
        },
        config: {
            description: 'Retrieve Products Ranking by Likes',
            tags: ['products']
        }
    },
    {
        method: 'GET',
        path: _prefix + '/ranking/visits',
        handler: function(request, reply) {
            ProductsService.getProductsRankingByVisits()
                .then((data: Array<any>) => {
                    reply({ products: data });
                })
        },
        config: {
            description: 'Retrieve Products Ranking by Visits',
            tags: ['products']
        }
    }
]


module.exports = products;
