'use strict';

///<reference path="../../../typings/tsd.d.ts" />
///<reference path="./categories.service.ts" />


import service = require('./metadata.service');
import Joi = require('joi');

var MetadataService = new service.MetadataService();
var _prefix = '/metadata';
var metadata = [
    {
        method: 'GET',
        path: _prefix + '/subcategories/list',
        handler: function(request, reply) {
            MetadataService.getSubcategoriesList()
                .then((data) => {
                    reply(data);
                })
        },
        config: {
            description: 'Retrieve Subcategories list',
            tags: ['metadata'],
            notes: [
                "Can be selected 1+ per Product"
            ]
        }
    },
    {
        method: 'GET',
        path: _prefix + '/schools/list',
        handler: function(request, reply) {
            MetadataService.getSchoolsList()
                .then((data) => {
                    reply(data);
                })
        },
        config: {
            description: 'Retrieve Schools list',
            tags: ['metadata'],
            notes: [
                "Can be selected 1 per Product"
            ]
        }
    },
    {
        method: 'GET',
        path: _prefix + '/styles/list',
        handler: function(request, reply) {
            MetadataService.getStylesList()
                .then((data) => {
                    reply(data);
                })
        },
        config: {
            description: 'Retrieve Styles list',
            tags: ['metadata'],
            notes: [
                "Can be selected 1+ per Product"
            ]
        }
    },
    {
        method: 'GET',
        path: _prefix + '/product/{productId}',
        handler: function(request, reply) {
            MetadataService.getMetadataByProductId(
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
            description: 'Retrieve Likes of matched ProductID',
            tags: ['metadata']
        }
    }
]


module.exports = metadata;
