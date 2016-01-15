'use strict';

///<reference path="../../../typings/tsd.d.ts" />
///<reference path="./members.service.ts" />


import service = require('./members.service');
import Joi = require('joi');

var MembersService = new service.MembersService();
var _prefix = '/members';
var members = [
    {
        method: 'GET',
        path: _prefix + '/list',
        handler: function(request, reply) {
            MembersService.getMembersList()
                .then((data: Array<any>) => {
                    reply(data);
                })
        },
        config: {
            description: 'Retrieve Members list',
            tags: ['members']
        }
    },
    {
        method: 'GET',
        path: _prefix + '/member/{memberId}',
        handler: function(request, reply) {
            MembersService.getMemberById(
                request.params.memberId)
                .then((data) => {
                    reply(data);
                })
        },
        config: {
            validate: {
                query: {
                    memberId: Joi.number().integer(),
                }
            },
            description: 'Retrieve Member with matched ProductID',
            tags: ['members']
        }
    }
]


module.exports = members;
