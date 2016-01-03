'use strict';
/// <reference path="../../../typings/tsd.d.ts" />
/// <reference path="./products.service.ts" />
/*
import service = require('./categories.service');

var CategoriesService = new service.ProductsService();
var _prefix = '/products';
var products = [
    {
        method: 'GET',
        path: _prefix + '/list',
        handler: function(request, reply) {

            ProductsService.getProductsList().then((data: Array<any>) => {
                reply(data);
            })
        },
        config: {
            description: 'Say hello'
        }
    },
    {
        method: 'GET',
        path: _prefix + '/product/{productId}',
        handler: function(request, reply) {
            ProductsService.getProductById(request.params.productId).then((data) => {
                reply(data);
            })
        }
    }
]


module.exports = products;

'use strict';

/// <reference path="../../../typings/tsd.d.ts" />
/// <reference path="./products.service.ts" />

/*
import service = require('./categories.service');

var CategoriesService = new service.ProductsService();
var _prefix = '/products';
var products = [
    {
        method: 'GET',
        path: _prefix + '/list',
        handler: function(request, reply) {

            ProductsService.getProductsList().then((data: Array<any>) => {
                reply(data);
            })
        },
        config: {
            description: 'Say hello'
        }
    },
    {
        method: 'GET',
        path: _prefix + '/product/{productId}',
        handler: function(request, reply) {
            ProductsService.getProductById(request.params.productId).then((data) => {
                reply(data);
            })
        }
    }
]


module.exports = products;
 

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1vZHVsZXMvY2F0ZWdvcmllcy9jYXRlZ29yaWVzLnJvdXRlcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxZQUFZLENBQUM7QUFFYixrREFBa0Q7QUFDbEQsOENBQThDO0FBRTlDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBaUNFIiwiZmlsZSI6Im1vZHVsZXMvY2F0ZWdvcmllcy9jYXRlZ29yaWVzLnJvdXRlcy5qcyIsInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0JztcclxuXHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9XCIuLi8uLi8uLi90eXBpbmdzL3RzZC5kLnRzXCIgLz5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD1cIi4vcHJvZHVjdHMuc2VydmljZS50c1wiIC8+XHJcblxyXG4vKlxyXG5pbXBvcnQgc2VydmljZSA9IHJlcXVpcmUoJy4vY2F0ZWdvcmllcy5zZXJ2aWNlJyk7XHJcblxyXG52YXIgQ2F0ZWdvcmllc1NlcnZpY2UgPSBuZXcgc2VydmljZS5Qcm9kdWN0c1NlcnZpY2UoKTtcclxudmFyIF9wcmVmaXggPSAnL3Byb2R1Y3RzJztcclxudmFyIHByb2R1Y3RzID0gW1xyXG4gICAge1xyXG4gICAgICAgIG1ldGhvZDogJ0dFVCcsXHJcbiAgICAgICAgcGF0aDogX3ByZWZpeCArICcvbGlzdCcsXHJcbiAgICAgICAgaGFuZGxlcjogZnVuY3Rpb24ocmVxdWVzdCwgcmVwbHkpIHtcclxuXHJcbiAgICAgICAgICAgIFByb2R1Y3RzU2VydmljZS5nZXRQcm9kdWN0c0xpc3QoKS50aGVuKChkYXRhOiBBcnJheTxhbnk+KSA9PiB7XHJcbiAgICAgICAgICAgICAgICByZXBseShkYXRhKTtcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9LFxyXG4gICAgICAgIGNvbmZpZzoge1xyXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogJ1NheSBoZWxsbydcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICAgIG1ldGhvZDogJ0dFVCcsXHJcbiAgICAgICAgcGF0aDogX3ByZWZpeCArICcvcHJvZHVjdC97cHJvZHVjdElkfScsXHJcbiAgICAgICAgaGFuZGxlcjogZnVuY3Rpb24ocmVxdWVzdCwgcmVwbHkpIHtcclxuICAgICAgICAgICAgUHJvZHVjdHNTZXJ2aWNlLmdldFByb2R1Y3RCeUlkKHJlcXVlc3QucGFyYW1zLnByb2R1Y3RJZCkudGhlbigoZGF0YSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgcmVwbHkoZGF0YSk7XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5dXHJcblxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBwcm9kdWN0cztcclxuXHJcbiovIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9