'use strict';

///<reference path="../../../typings/tsd.d.ts" />
///<reference path="./categories.service.ts" />


import service = require('./blog.service');
import Joi = require('joi');

var BlogService = new service.BlogService();
var _prefix = '/blog';
var metadata = [
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
    }
]


module.exports = metadata;
