'use strict';

///<reference path="../../../typings/tsd.d.ts" />
///<reference path="./authors.service.ts" />


import service = require('./authors.service');

var AuthorsService = new service.AuthorsService();
var _prefix = '/authors';
var authors = [
    {
        method: 'GET',
        path: _prefix + '/list',
        handler: function(request, reply) {
            AuthorsService.getAuthorsList()
            .then((data: Array<any>) => {
                reply(data);
            })
        },
        config: {
            description: 'Retrieve Authors list'
        }
    }
]


module.exports = authors;
