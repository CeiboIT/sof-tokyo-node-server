'use strict';

///<reference path="../../../typings/tsd.d.ts" />
///<reference path="./categories.service.ts" />


import service = require('./subcategories.service');

var SubcategoriesService = new service.SubcategoriesService();
var _prefix = '/subcategories';
var subcategories = [
    {
        method: 'GET',
        path: _prefix + '/list',
        handler: function(request, reply) {
            SubcategoriesService.getSubcategoriesList()
                .then((data) => {
                    reply(data);
                })
        },
        config: {
            description: 'Retrieve Subcategories list'
        }
    }
]


module.exports = subcategories;
