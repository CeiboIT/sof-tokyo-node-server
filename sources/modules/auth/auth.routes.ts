'use strict';

///<reference path="../../../typings/tsd.d.ts" />
///<reference path="./authors.service.ts" />


import service = require('./auth.service');
import Joi = require('joi');

var AuthService = new service.AuthService();
var _prefix = '/auth';
var auth = [
    {
        method: 'GET',
        path: _prefix + '/nonce',
        handler: function(request, reply) {
            AuthService.getNonce().then((data) => {
                reply(data);
            })
        },
        config: {
            validate: {
                query: {
                    method: Joi.string()
                }
            },
            description: 'Retrieve a Nonce'
        }
    },
    {
        method: 'GET',
        path: _prefix + '/register/{username}/{email}/{nonce}/{display_name}',
        handler: function(request, reply) {
            AuthService.register(request.params.username, request.params.email, request.params.nonce, request.params.display_name).then((data) => {
                reply(data);
            })
        },
        config: {
            validate: {
                query: {
                    username: Joi.string(),
                    email: Joi.string(),
                    nonce: Joi.string(),
                    display_name: Joi.string()
                }
            },
            description: 'Create a new User (need to create a new Nonce first and pass it as param)'
        }
    },
    {
        method: 'GET',
        path: _prefix + '/login/{username}/{password}',
        handler: function(request, reply) {
            AuthService.login(request.params.username, request.params.password).then((data) => {
                reply(data);
            })
        },
        config: {
            validate: {
                query: {
                    username: Joi.string(),
                    password: Joi.string()
                }
            },
            description: 'Login a User > Retrieve a Session Cookie'
        }
    },
    {
        method: 'GET',
        path: _prefix + '/is_authorized/{cookie}',
        handler: function(request, reply) {
            AuthService.isAuthorized(request.params.cookie).then((data) => {
                reply(data);
            })
        },
        config: {
            validate: {
                query: {
                    cookie: Joi.string()
                }
            },
            description: 'Check if a Session Cookie is still valid'
        }
    },
    {
        method: 'GET',
        path: _prefix + '/get_user/{userId}',
        handler: function(request, reply) {
            AuthService.getUserInfo(request.params.userId).then((data) => {
                reply(data);
            })
        },
        config: {
            validate: {
                query: {
                    userId: Joi.string()
                }
            },
            description: 'Retrieve User info'
        }
    }, ,
    {
        method: 'GET',
        path: _prefix + '/get_avatar/{userId}/{type}',
        handler: function(request, reply) {
            AuthService.getUserAvatar(request.params.userId, request.params.type).then((data) => {
                reply(data);
            })
        },
        config: {
            validate: {
                query: {
                    userId: Joi.string(),
                    type: Joi.string()
                }
            },
            description: "Retrieve User's Avatar. Type: 'full'/'thumb'"
        }
    }, ,
    {
        method: 'GET',
        path: _prefix + '/reset_password/{username}',
        handler: function(request, reply) {
            AuthService.resetPassword(request.params.username).then((data) => {
                reply(data);
            })
        },
        config: {
            validate: {
                query: {
                    username: Joi.string()
                }
            },
            description: "Reset User's Password and send an email with instructions"
        }
    },
]


module.exports = auth;
