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
        path: _prefix + '/byauthor/{authorId}/{page}',
        handler: function(request, reply) {
            ProductsService.getProductsByAuthor(
                request.params.authorId)
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
            description: 'Retrieve Products from matched AuthorID',
            tags: ['products']
        }
    },
    {
        method: 'GET',
        path: _prefix + '/byschool/{schoolId}/{page}',
        handler: function(request, reply) {
            ProductsService.getProductsBySchool(
                request.params.schoolId,
                request.params.page || 1)
                .then((data: Array<any>) => {
                    reply(data);
                })
        },
        config: {
            validate: {
                query: {
                    schoolId: Joi.number().integer(),
                    page: Joi.number().integer()
                }
            },
            description: 'Retrieve Products from matched SchoolID',
            tags: ['products']
        }
    },
    {
        method: 'GET',
        path: _prefix + '/bysubcategory0/{subcategory0Id}/{page}',
        handler: function(request, reply) {
            ProductsService.getProductsBySubcategory0(
                request.params.subcategory0Id,
                request.params.page || 1)
                .then((data: Array<any>) => {
                    reply(data);
                })
        },
        config: {
            validate: {
                query: {
                    subcategory0Id: Joi.number().integer(),
                    page: Joi.number().integer()
                }
            },
            description: 'Retrieve Products from matched Subcategory0ID',
            tags: ['products']
        }
    },
    {
        method: 'GET',
        path: _prefix + '/bysubcategory1/{subcategory1Id}/{page}',
        handler: function(request, reply) {
            ProductsService.getProductsBySubcategory1(
                request.params.subcategory1Id,
                request.params.page || 1)
                .then((data: Array<any>) => {
                    reply(data);
                })
        },
        config: {
            validate: {
                query: {
                    subcategory1Id: Joi.number().integer(),
                    page: Joi.number().integer()
                }
            },
            description: 'Retrieve Products from matched Subcategory1ID',
            tags: ['products']
        }
    },
    {
        method: 'GET',
        path: _prefix + '/bystyle/{styleId}/{page}',
        handler: function(request, reply) {
            ProductsService.getProductsByStyle(
                request.params.styleId,
                request.params.page || 1)
                .then((data: Array<any>) => {
                    reply(data);
                })
        },
        config: {
            validate: {
                query: {
                    styleId: Joi.number().integer(),
                    page: Joi.number().integer()
                }
            },
            description: 'Retrieve Products from matched StyleID',
            tags: ['products']
        }
    },
    {
        method: 'GET',
        path: _prefix + '/bysex/{sexId}/{page}',
        handler: function(request, reply) {
            ProductsService.getProductsBySex(
                request.params.sexId,
                request.params.page || 1)
                .then((data: Array<any>) => {
                    reply(data);
                })
        },
        config: {
            validate: {
                query: {
                    sexId: Joi.number().integer(),
                    page: Joi.number().integer()
                }
            },
            description: 'Retrieve Products from matched SexID',
            tags: ['products']
        }
    },
    {
        method: 'POST',
        path: _prefix + '/create',
        handler: function(request, reply) {
            ProductsService.createProduct(
                request.payload.nonce,
                request.payload.authorId,
                request.payload.title,
                request.payload.content,
                request.payload.status,
                request.payload.school,
                request.payload.subcategory0,
                request.payload.subcategory1,
                request.payload.styles)
                .then((data) => {
                    reply(data);
                })
        },
        config: {
            validate: {
                query: {
                    nonce: Joi.string(),
                    authorId: Joi.number().integer(),
                    title: Joi.string(),
                    content: Joi.string(),
                    status: Joi.string(),
                    categorias: Joi.array(),
                    tags: Joi.array()
                }
            },
            description: 'Create a new Product',
            tags: ['products']
        }
    },
    {
        method: 'POST',
        path: _prefix + '/createnew',
        handler: function(request, reply) {
            ProductsService.createNewProduct(
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
                    search: Joi.number().integer(),
                    page: Joi.number().integer()
                }
            },
            description: 'Retrieve Products from matched Search string',
            tags: ['products']
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
