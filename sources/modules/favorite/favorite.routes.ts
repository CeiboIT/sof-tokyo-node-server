'use strict';

///<reference path="../../../typings/tsd.d.ts" />
/// <reference path="./favorite.service.ts" />

import service = require('./favorite.service');
import Joi = require('joi');

var FavoriteService = new service.FavoriteService();
var _prefix = '/favorite';
var favorite = [
    {
        method: 'GET',
        path: _prefix + '/{userId}',
        handler: function(request, reply) {
            FavoriteService.showFavorite(
                request.params.userId)
                .then((data) => {
                    reply({favorite: data });
                })
        },
        config: {
            validate: {
                query: {
                    userId: Joi.number().integer()
                }
            },
            description: 'Show favorite Products from matched UserID',
            tags: ['favorite']
        }
    },
    {
        method: 'POST',
        path: _prefix,
        handler: function(request, reply) {
            FavoriteService.createFavorite(
                request.payload.userId,
                request.payload.productId)
                .then((data) => {
                    reply({ data });
                })
        },
        config: {
            validate: {
                query: {
                    userId: Joi.number().integer(),
                    productId: Joi.number().integer()
                }
            },
            description: 'Create a favorite ProductID to matched UserID',
            tags: ['favorite']
        }
    },
    {
        method: 'DELETE',
        path: _prefix,
        handler: function(request, reply) {
            FavoriteService.removeFavorite(
                request.payload.userId,
                request.payload.productId)
                .then((data) => {
                    reply({ data });
                })
        },
        config: {
            validate: {
                query: {
                    userId: Joi.number().integer(),
                    productId: Joi.number().integer()
                }
            },
            description: 'Delete ProductID favorite from matched UserID',
            tags: ['favorite']
        }
    }
]

module.exports = favorite;
