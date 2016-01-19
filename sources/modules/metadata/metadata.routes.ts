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
        path: _prefix + '/subcategories0/list',
        handler: function(request, reply) {
            MetadataService.getSubcategories0List()
                .then((data) => {
                    reply( { subcategories0: data });
                })
        },
        config: {
            description: 'Retrieve Subcategories0 list',
            tags: ['metadata'],
            notes: [
                "Can be selected 1+ per Product"
            ]
        }
    },
    {
        method: 'GET',
        path: _prefix + '/subcategories1/list',
        handler: function(request, reply) {
            MetadataService.getSubcategories1List()
                .then((data) => {
                    reply({ subcategories1: data });
                })
        },
        config: {
            description: 'Retrieve Subcategories1 list',
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
                    reply( { schools: data });
                })
        },
        config: {
            description: 'Retrieve Schools list',
            tags: ['metadata'],
            notes: [
                "This is defined to the Post Member"
            ]
        }
    },
    {
        method: 'GET',
        path: _prefix + '/styles/list',
        handler: function(request, reply) {
            MetadataService.getStylesList()
                .then((data) => {
                    reply( { styles: data });
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
        path: _prefix + '/schools/member/{memberId}',
        handler: function(request, reply) {
            MetadataService.getSchoolByMemberId(
                request.params.memberId)
                .then((data) => {
                    reply({ school: data[0] });
                })
        },
        config: {
            description: 'Retrieve School from matched MemberID',
            tags: ['metadata']
        }
    },
    {
        method: 'GET',
        path: _prefix + '/all/product/{productId}',
        handler: function(request, reply) {
            MetadataService.getProductMetadata(
                request.params.productId)
                .then((data) => {
                    reply({ metadata: data });
                })
        },
        config: {
            description: 'Retrieve all Metadata from matched ProductID',
            tags: ['metadata']
        }
    },
    {
        method: 'POST',
        path: _prefix + '/likes/product',
        handler: function(request, reply) {
            MetadataService.createProductLike(
                request.payload.productId)
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
            description: 'Create a Like to matched ProductID',
            tags: ['metadata']
        }
    },
    {
        method: 'GET',
        path: _prefix + '/unique_visits/product/{productId}',
        handler: function(request, reply) {
            MetadataService.getProductUniqueVisits(
                request.params.productId)
                .then((data) => {
                    reply({ unique_visits: data[0] });
                })
        },
        config: {
            description: 'Retrieve Unique Visits from matched ProductID',
            tags: ['metadata']
        }
    },
    {
        method: 'GET',
        path: _prefix + '/total_visits/product/{productId}',
        handler: function(request, reply) {
            MetadataService.getProductTotalVisits(
                request.params.productId)
                .then((data) => {
                    reply({ total_visits: data[0] });
                })
        },
        config: {
            description: 'Retrieve Total Visits from matched ProductID',
            tags: ['metadata']
        }
    }
]


module.exports = metadata;
