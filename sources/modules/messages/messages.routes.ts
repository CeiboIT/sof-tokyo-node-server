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
        method: 'POST',
        path: _prefix + '/create',
        handler: function(request, reply) {
            MessagesService.createMessage(
                request.payload.sender_id,
                request.payload.receiver_id,
                request.payload.subject,
                request.payload.message)
                .then((data) => {
                    reply(data);
                })
        },
        config: {
            validate: {
                query: {
                    sender_id: Joi.number().integer(),
                    receiver_id: Joi.number().integer(),
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
                request.payload.thread_id,
                request.payload.sender_id,
                request.payload.receiver_id,
                request.payload.subject,
                request.payload.message)
                .then((data) => {
                    reply(data);
                })
        },
        config: {
            validate: {
                query: {
                    thread_id: Joi.number().integer(),
                    sender_id: Joi.number().integer(),
                    receiver_id: Joi.number().integer(),
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
