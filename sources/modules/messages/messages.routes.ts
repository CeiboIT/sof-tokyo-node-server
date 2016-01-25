'use strict';

/// <reference path="../../../typings/tsd.d.ts" />
/// <reference path="./messages.service.ts" />

import service = require('./messages.service');
import Joi = require('joi');

var MessagesService = new service.MessagesService();
var _prefix = '/messages';
var messages = [
    {
        method: 'GET',
        path: _prefix + '/show/{userId}',
        handler: function(request, reply) {
            MessagesService.showMessages(
                request.params.userId)
                .then((data) => {
                    reply({ messages: data });
                })
        },
        config: {
            validate: {
                query: {
                    userId: Joi.number().integer()
                }
            },
            description: 'Retrieve Messages from UserID',
            tags: ['messages']
        }
    },
    {
        method: 'PUT',
        path: _prefix + '/read',
        handler: function(request, reply) {
            MessagesService.readMessages(
                request.payload.userId,
                request.payload.threadId)
                .then((data) => {
                    reply({ response: data });
                })
        },
        config: {
            validate: {
                query: {
                    userId: Joi.number().integer(),
                    threadId: Joi.number().integer()
                }
            },
            description: 'Update unread Messages to 0 of ThreadID from UserID',
            tags: ['messages']
        }
    },
    {
        method: 'POST',
        path: _prefix + '/create',
        handler: function(request, reply) {
            MessagesService.createMessage(
                request.payload.senderId,
                request.payload.receiverId,
                request.payload.subject,
                request.payload.message)
                .then((data) => {
                    reply(data);
                })
        },
        config: {
            validate: {
                query: {
                    senderId: Joi.number().integer(),
                    receiverId: Joi.number().integer(),
                    subject: Joi.string(),
                    message: Joi.string()
                }
            },
            description: 'Create a new Message',
            tags: ['messages']
        }
    },
    {
        method: 'POST',
        path: _prefix + '/response',
        handler: function(request, reply) {
            MessagesService.responseMessage(
                request.payload.threadId,
                request.payload.senderId,
                request.payload.receiverId,
                request.payload.subject,
                request.payload.message)
                .then((data) => {
                    reply(data);
                })
        },
        config: {
            validate: {
                query: {
                    threadId: Joi.number().integer(),
                    senderId: Joi.number().integer(),
                    receiverId: Joi.number().integer(),
                    subject: Joi.string(),
                    message: Joi.string()
                }
            },
            description: 'Response a Message',
            tags: ['messages']
        }
    },
]

module.exports = messages;
