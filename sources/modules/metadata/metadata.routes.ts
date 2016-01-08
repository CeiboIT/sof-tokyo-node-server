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
        path: _prefix + '/subcategories1/list',
        handler: function(request, reply) {
            MetadataService.getSubcategories1List()
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
        path: _prefix + '/schools/member/{memberId}',
        handler: function(request, reply) {
            MetadataService.getSchoolByMemberId(
                request.params.memberId)
                .then((data) => {
                    reply(data);
                })
        },
        config: {
            description: 'Retrieve School from matched MemberID',
            tags: ['metadata']
        }
    }
]


module.exports = metadata;
