'use strict';

///<reference path="../../../typings/tsd.d.ts" />

import service = require('./favorites.service');
import Joi = require('joi');

var FavoritesService = new service.FavoritesService();
var _prefix = '/favorites';
var favorites = [
    {
        method: 'GET',
        path: _prefix + '/{userId}',
        handler: function(request, reply) {
            FavoritesService.showFavorites(
                request.params.userId)
                .then((data) => {
                    reply({favorites: data });
                })
        },
        config: {
            validate: {
                query: {
                    userId: Joi.number().integer()
                }
            },
            description: 'Show favorites Products from matched UserID',
            tags: ['favorites']
        }
    },
    {
        method: 'POST',
        path: _prefix,
        handler: function(request, reply) {
            FavoritesService.createFavorite(
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
            tags: ['favorites']
        }
    },
    {
        method: 'DELETE',
        path: _prefix,
        handler: function(request, reply) {
            FavoritesService.removeFavorite(
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
            tags: ['favorites']
        }
    }
]

module.exports = favorites;
