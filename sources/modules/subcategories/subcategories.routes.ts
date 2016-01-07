'use strict';

///<reference path="../../../typings/tsd.d.ts" />
///<reference path="./categories.service.ts" />


import service = require('./subcategories.service');
import Joi = require('joi');

var SubcategoriesService = new service.SubcategoriesService();
var _prefix = '/subcategories';
var subcategories = [
    {
        method: 'GET',
        path: _prefix + '/list',
        handler: function(request, reply) {
            SubcategoriesService.getSubcategoriesList()
                .then((data) => {
                    reply(data);
                })
        },
        config: {
            description: 'Retrieve Subcategories list',
            tags: ['subcategories']
        }
    },
    {
        method: 'GET',
        path: _prefix + '/product/{productId}',
        handler: function(request, reply) {
            SubcategoriesService.getSubcategoryByProductId(
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
            description: 'Retrieve Subcategories list',
            tags: ['subcategories']
        }
    }
]


module.exports = subcategories;
