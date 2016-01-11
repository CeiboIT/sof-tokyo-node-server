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
        path: _prefix + '/likes/product/{productId}',
        handler: function(request, reply) {
            MetadataService.getProductLikes(
                request.params.productId)
                .then((data) => {
                    reply({ likes: data[0] });
                })
        },
        config: {
            description: 'Retrieve Likes from matched ProductID',
            tags: ['metadata']
        }
    },
    {
        method: 'POST',
        path: _prefix + '/likes/product/{productId}',
        handler: function(request, reply) {
            MetadataService.createProductLike(
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
    },
    {
        method: 'GET',
        path: _prefix + '/banners',
        handler: function(request, reply) {
            MetadataService.getBanners()
                .then((data) => {
                    reply({ banners: data });
                })
        },
        config: {
            description: 'Retrieve Banners',
            tags: ['metadata']
        }
    },
    {
        method: 'POST',
        path: _prefix + '/banners',
        handler: function(request, reply) {
            MetadataService.createBanner(
                request.payload.banner)
                .then((data) => {
                    reply(data);
                })
        },
        config: {
            validate: {
                query: {
                    banner: Joi.array()
                }
            },
            description: 'Create a Banner object',
            tags: ['metadata']
        }
    },

]


module.exports = metadata;
