'use strict';

///<reference path="../../../typings/tsd.d.ts" />
///<reference path="./categories.service.ts" />


import service = require('./categories.service');

var CategoriesService = new service.CategoriesService();
var _prefix = '/categories';
var categories = [
    {
        method: 'GET',
        path: _prefix + '/list',
        handler: function(request, reply) {
            CategoriesService.getCategoriesList()
                .then((data: Array<any>) => {
                    reply(data);
                })
        },
        config: {
            description: 'Retrieve Categories list'
        }
    },
    {
        method: 'GET',
        path: _prefix + '/test',
        handler: function(request, reply) {
            CategoriesService.getSubcategoriesList()
                .then((data) => {
                    reply(data);
                })
        },
        config: {
            description: 'TEST'
        }
    }
]


module.exports = categories;
