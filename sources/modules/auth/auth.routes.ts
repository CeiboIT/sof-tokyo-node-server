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
        path: _prefix + '/nonce/{controller}/{method}',
        handler: function(request, reply) {
            AuthService.getNonce(
                request.params.controller,
                request.params.method)
            .then((data) => {
                reply(data);
            })
        },
        config: {
            validate: {
                query: {
                    controller: Joi.string(),
                    method: Joi.string()
                }
            },
            description: "Retrieve a Nonce",
            notes: [
                "Controller values: 'posts'",
                "Method values: 'create_post'/'update_post'/'delete_post'"
            ],
            tags: ['auth']
        }
    },
    {
        method: 'POST',
        path: _prefix + '/register',
        handler: function(request, reply) {
            AuthService.register(
                request.payload.username,
                request.payload.email,
                request.payload.display_name,
                request.payload.years,
                request.payload.country,
                request.payload.school,
                request.payload.ob)
            .then((data) => {
                reply(data);
            })
        },
        config: {
            validate: {
                query: {
                    username: Joi.string(),
                    email: Joi.string(),
                    display_name: Joi.string(),
                    years: Joi.number().integer(),
                    country: Joi.string(),
                    school: Joi.string(),
                    ob: Joi.string()
                }
            },
            description: 'Create a new User (need to create a new Nonce first and pass it as param)',
            tags: ['auth']
        }
    },
    {
        method: 'POST',
        path: _prefix + '/login',
        handler: function(request, reply) {
            AuthService.login(
                request.payload.username,
                request.payload.password)
                .then((data) => {
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
            description: 'Login a User > Retrieve a Session Cookie',
            tags: ['auth']
        }
    },
    {
        method: 'POST',
        path: _prefix + '/facebook/login',
        handler: function(request, reply) {
            AuthService.fbLogin(
                request.payload.token)
                .then((data) => {
                    reply(data);
                })
        },
        config: {
            validate: {
                query: {
                    token: Joi.string()
                }
            },
            description: 'Login using Facebook',
            tags: ['auth']
        }
    },
    {
        method: 'POST',
        path: _prefix + '/is_authorized',
        handler: function(request, reply) {
            AuthService.isAuthorized(
                request.payload.cookie)
            .then((data) => {
                reply(data);
            })
        },
        config: {
            validate: {
                query: {
                    cookie: Joi.string()
                }
            },
            description: 'Check if a Session Cookie is still valid',
            tags: ['auth']
        }
    },
    {
        method: 'GET',
        path: _prefix + '/get_user/{userId}',
        handler: function(request, reply) {
            AuthService.getUserInfo(
                request.params.userId)
            .then((data) => {
                reply(data);
            })
        },
        config: {
            validate: {
                query: {
                    userId: Joi.string()
                }
            },
            description: 'Retrieve User info',
            tags: ['auth']
        }
    }, ,
    {
        method: 'GET',
        path: _prefix + '/get_avatar/{userId}/{type}',
        handler: function(request, reply) {
            AuthService.getUserAvatar(
                request.params.userId,
                request.params.type)
            .then((data) => {
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
            description: "Retrieve User's Avatar",
            notes: [
                "Type values: 'full'/'thumb'"
            ],
            tags: ['auth']
        }
    }, ,
    {
        method: 'POST',
        path: _prefix + '/reset_password',
        handler: function(request, reply) {
            AuthService.resetPassword(
                request.params.username)
            .then((data) => {
                reply(data);
            })
        },
        config: {
            validate: {
                query: {
                    username: Joi.string()
                }
            },
            description: "Reset User's Password and send an email with instructions",
            tags: ['auth']
        }
    },
]


module.exports = auth;
