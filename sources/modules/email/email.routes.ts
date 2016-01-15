'use strict';

///<reference path="../../../typings/tsd.d.ts" />
///<reference path="./email.service.ts" />


import service = require('./email.service');
import Joi = require('joi');

var EmailService = new service.EmailService();
var _prefix = '/email';
var email = [
    {
        method: 'GET',
        path: _prefix + '/test',
        handler: function(request, reply) {
            EmailService.sendTestEmail()
                .then((data) => {
                    reply(data);
                })
        },
        config: {
            description: 'Send a test Email',
            tags: ['email']
        }
    },
    {
        method: 'POST',
        path: _prefix + '/new',
        handler: function(request, reply) {
            EmailService.sendNewEmail(
                request.payload.fromEmail,
                request.payload.fromName,
                request.payload.to,
                request.payload.subject,
                request.payload.content)
                .then((data) => {
                    reply(data);
                })
        },
        config: {
            validate: {
                query: {
                    fromEmail: Joi.string(),
                    fromName: Joi.string(),
                    to: Joi.string(),
                    subject: Joi.string(),
                    content: Joi.string()
                }
            },
            description: 'Send a new Email',
            tags: ['email']
        }
    },
]


module.exports = email;
