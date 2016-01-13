'use strict';

///<reference path="../../../typings/tsd.d.ts" />
///<reference path="./categories.service.ts" />


import service = require('./blog.service');
import Joi = require('joi');

var BlogService = new service.BlogService();
var _prefix = '/blog';
var blog = [
    {
        method: 'GET',
        path: _prefix + '/banners',
        handler: function(request, reply) {
            BlogService.getBanners()
                .then((data) => {
                    reply({ banners: data });
                })
        },
        config: {
            description: 'Retrieve all Banners',
            tags: ['blog']
        }
    },
    {
        method: 'GET',
        path: _prefix + '/banners/banner/{bannerId}',
        handler: function(request, reply) {
            BlogService.getBanner(
                request.params.bannerId)
                .then((data) => {
                    reply({ banner: data });
                })
        },
        config: {
            validate: {
                query: {
                    bannerId: Joi.number().integer()
                }
            },
            description: 'Retrieve Banner with matched BannerID',
            tags: ['blog']
        }
    },
    {
        method: 'POST',
            path: _prefix + '/banners',
                handler: function(request, reply) {
                    BlogService.createBanner(
                        request.payload.post_author,
                        request.payload.post_content,
                        request.payload.post_title,
                        request.payload.post_name)
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
                tags: ['blog']
        }
    }
]


module.exports = blog;
