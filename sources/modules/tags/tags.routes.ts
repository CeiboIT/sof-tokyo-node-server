'use strict';

///<reference path="../../../typings/tsd.d.ts" />
///<reference path="./tags.service.ts" />


import service = require('./tags.service');

var TagsService = new service.TagsService();
var _prefix = '/tags';
var tags = [
    {
        method: 'GET',
        path: _prefix + '/list',
        handler: function(request, reply) {
            TagsService.getTagsList().then((data: Array<any>) => {
                reply(data);
            })
        },
        config: {
            description: 'Retrieve Tag list',
        }
    }
]


module.exports = tags;
