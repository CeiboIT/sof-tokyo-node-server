'use strict';
/// <reference path="../../../typings/tsd.d.ts" />
/// <reference path="./products.service.ts" />
var service = require('./products.service');
var Joi = require('joi');
var ProductsService = new service.ProductsService();
var _prefix = '/products';
var products = [
    {
        method: 'GET',
        path: _prefix + '/list/{page}',
        handler: function (request, reply) {
            ProductsService.getProductsList(request.params.page || 1).then(function (data) {
                reply(data);
            });
        },
        config: {
            validate: {
                query: {
                    page: Joi.number().integer()
                }
            },
            description: 'Retrieves Products list'
        }
    },
    {
        method: 'GET',
        path: _prefix + '/product/{productId}',
        handler: function (request, reply) {
            ProductsService.getProductById(request.params.productId).then(function (data) {
                reply(data);
            });
        },
        config: {
            validate: {
                query: {
                    productId: Joi.number().integer()
                }
            },
            description: 'Retrieve Product with matched ProductID'
        }
    },
    {
        method: 'GET',
        path: _prefix + '/byauthor/{authorId}/{page}',
        handler: function (request, reply) {
            ProductsService.getProductsByAuthor(request.params.authorId, request.params.page || 1).then(function (data) {
                reply(data);
            });
        },
        config: {
            validate: {
                query: {
                    authorId: Joi.number().integer(),
                    page: Joi.number().integer()
                }
            },
            description: 'Retrieve Products from matched AuthorID'
        }
    },
    {
        method: 'GET',
        path: _prefix + '/bycategory/{categoryId}/{page}',
        handler: function (request, reply) {
            ProductsService.getProductsByCategory(request.params.categoryId, request.params.page || 1).then(function (data) {
                reply(data);
            });
        },
        config: {
            validate: {
                query: {
                    categoryId: Joi.number().integer(),
                    page: Joi.number().integer()
                }
            },
            description: 'Retrieve Products from matched CategoryID'
        }
    },
    {
        method: 'GET',
        path: _prefix + '/bytag/{tagId}/{page}',
        handler: function (request, reply) {
            ProductsService.getProductsByTag(request.params.tagId, request.params.page || 1).then(function (data) {
                reply(data);
            });
        },
        config: {
            validate: {
                query: {
                    tagId: Joi.number().integer(),
                    page: Joi.number().integer()
                }
            },
            description: 'Retrieve Products from matched TagID'
        }
    },
    {
        method: 'POST',
        path: _prefix + '/create',
        handler: function (request, reply) {
            ProductsService.createProduct(request.payload.nonce, request.payload.author, request.payload.title, request.payload.content, request.payload.status, request.payload.categories, request.payload.tags).then(function (data) {
                reply(data);
            });
        },
        config: {
            validate: {
                query: {
                    nonce: Joi.string(),
                    author: Joi.string(),
                    title: Joi.string(),
                    content: Joi.string(),
                    status: Joi.string(),
                    categorias: Joi.array(),
                    tags: Joi.array()
                }
            },
            description: 'Create a new Product'
        }
    },
    {
        method: 'PUT',
        path: _prefix + '/update',
        handler: function (request, reply) {
            ProductsService.updateProduct(request.payload.nonce, request.payload.productId, request.payload.author, request.payload.title, request.payload.content, request.payload.status, request.payload.categories, request.payload.tags).then(function (data) {
                reply(data);
            });
        },
        config: {
            validate: {
                query: {
                    nonce: Joi.string(),
                    productId: Joi.number().integer(),
                    author: Joi.string(),
                    title: Joi.string(),
                    content: Joi.string(),
                    status: Joi.string(),
                    categorias: Joi.array(),
                    tags: Joi.array()
                }
            },
            description: 'Update a Product'
        }
    },
    {
        method: 'DELETE',
        path: _prefix + '/delete',
        handler: function (request, reply) {
            ProductsService.deleteProduct(request.payload.nonce, request.payload.productId).then(function (data) {
                reply(data);
            });
        },
        config: {
            validate: {
                query: {
                    nonce: Joi.string(),
                    productId: Joi.number().integer()
                }
            },
            description: 'Delete a Product'
        }
    }
];
module.exports = products;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1vZHVsZXMvcHJvZHVjdHMvcHJvZHVjdHMucm91dGVzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLFlBQVksQ0FBQztBQUViLEFBSUEsa0RBSmtEO0FBQ2xELDhDQUE4QztBQUc5QyxJQUFPLE9BQU8sV0FBVyxvQkFBb0IsQ0FBQyxDQUFDO0FBQy9DLElBQU8sR0FBRyxXQUFXLEtBQUssQ0FBQyxDQUFDO0FBRTVCLElBQUksZUFBZSxHQUFHLElBQUksT0FBTyxDQUFDLGVBQWUsRUFBRSxDQUFDO0FBQ3BELElBQUksT0FBTyxHQUFHLFdBQVcsQ0FBQztBQUMxQixJQUFJLFFBQVEsR0FBRztJQUNYO1FBQ0ksTUFBTSxFQUFFLEtBQUs7UUFDYixJQUFJLEVBQUUsT0FBTyxHQUFHLGNBQWM7UUFDOUIsT0FBTyxFQUFFLFVBQVMsT0FBTyxFQUFFLEtBQUs7WUFDNUIsZUFBZSxDQUFDLGVBQWUsQ0FDM0IsT0FBTyxDQUFDLE1BQU0sQ0FBQyxJQUFJLElBQUksQ0FBQyxDQUFDLENBQzVCLElBQUksQ0FBQyxVQUFDLElBQWdCO2dCQUNuQixLQUFLLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDaEIsQ0FBQyxDQUFDLENBQUE7UUFDTixDQUFDO1FBQ0QsTUFBTSxFQUFFO1lBQ0osUUFBUSxFQUFFO2dCQUNOLEtBQUssRUFBRTtvQkFDSCxJQUFJLEVBQUUsR0FBRyxDQUFDLE1BQU0sRUFBRSxDQUFDLE9BQU8sRUFBRTtpQkFDL0I7YUFDSjtZQUNELFdBQVcsRUFBRSx5QkFBeUI7U0FDekM7S0FDSjtJQUNEO1FBQ0ksTUFBTSxFQUFFLEtBQUs7UUFDYixJQUFJLEVBQUUsT0FBTyxHQUFHLHNCQUFzQjtRQUN0QyxPQUFPLEVBQUUsVUFBUyxPQUFPLEVBQUUsS0FBSztZQUM1QixlQUFlLENBQUMsY0FBYyxDQUMxQixPQUFPLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUM1QixJQUFJLENBQUMsVUFBQyxJQUFJO2dCQUNQLEtBQUssQ0FBQyxJQUFJLENBQUMs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LEdBQUcsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxPQUFPLEVBQUU7aUJBQ3BDO2FBQ0o7WUFDRCxXQUFXLEVBQUUsa0JBQWtCO1NBQ2xDO0tBQ0o7Q0FDSixDQUFBO0FBR0QsTUFBTSxDQUFDLE9BQU8sR0FBRyxRQUFRLENBQUMiLCJmaWxlIjoibW9kdWxlcy9wcm9kdWN0cy9wcm9kdWN0cy5yb3V0ZXMuanMiLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCc7XG5cbi8vLyA8cmVmZXJlbmNlIHBhdGg9XCIuLi8uLi8uLi90eXBpbmdzL3RzZC5kLnRzXCIgLz5cbi8vLyA8cmVmZXJlbmNlIHBhdGg9XCIuL3Byb2R1Y3RzLnNlcnZpY2UudHNcIiAvPlxuXG5cbmltcG9ydCBzZXJ2aWNlID0gcmVxdWlyZSgnLi9wcm9kdWN0cy5zZXJ2aWNlJyk7XG5pbXBvcnQgSm9pID0gcmVxdWlyZSgnam9pJyk7XG5cbnZhciBQcm9kdWN0c1NlcnZpY2UgPSBuZXcgc2VydmljZS5Qcm9kdWN0c1NlcnZpY2UoKTtcbnZhciBfcHJlZml4ID0gJy9wcm9kdWN0cyc7XG52YXIgcHJvZHVjdHMgPSBbXG4gICAge1xuICAgICAgICBtZXRob2Q6ICdHRVQnLFxuICAgICAgICBwYXRoOiBfcHJlZml4ICsgJy9saXN0L3twYWdlfScsXG4gICAgICAgIGhhbmRsZXI6IGZ1bmN0aW9uKHJlcXVlc3QsIHJlcGx5KSB7XG4gICAgICAgICAgICBQcm9kdWN0c1NlcnZpY2UuZ2V0UHJvZHVjdHNMaXN0KFxuICAgICAgICAgICAgICAgIHJlcXVlc3QucGFyYW1zLnBhZ2UgfHwgMSlcbiAgICAgICAgICAgIC50aGVuKChkYXRhOiBBcnJheTxhbnk+KSA9PiB7XG4gICAgICAgICAgICAgICAgcmVwbHkoZGF0YSk7XG4gICAgICAgICAgICB9KVxuICAgICAgICB9LFxuICAgICAgICBjb25maWc6IHtcbiAgICAgICAgICAgIHZhbGlkYXRlOiB7XG4gICAgICAgICAgICAgICAgcXVlcnk6IHtcbiAgICAgICAgICAgICAgICAgICAgcGFnZTogSm9pLm51bWJlcigpLmludGVnZXIoKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogJ1JldHJpZXZlcyBQcm9kdWN0cyBsaXN0J1xuICAgICAgICB9XG4gICAgfSxcbiAgICB7XG4gICAgICAgIG1ldGhvZDogJ0dFVCcsXG4gICAgICAgIHBhdGg6IF9wcmVmaXggKyAnL3Byb2R1Y3Qve3Byb2R1Y3RJZH0nLFxuICAgICAgICBoYW5kbGVyOiBmdW5jdGlvbihyZXF1ZXN0LCByZXBseSkge1xuICAgICAgICAgICAgUHJvZHVjdHNTZXJ2aWNlLmdldFByb2R1Y3RCeUlkKFxuICAgICAgICAgICAgICAgIHJlcXVlc3QucGFyYW1zLnByb2R1Y3RJZClcbiAgICAgICAgICAgIC50aGVuKChkYXRhKSA9PiB7XG4gICAgICAgICAgICAgICAgcmVwbHkoZGF0YSk7XG4gICAgICAgICAgICB9KVxuICAgICAgICB9LFxuICAgICAgICBjb25maWc6IHtcbiAgICAgICAgICAgIHZhbGlkYXRlOiB7XG4gICAgICAgICAgICAgICAgcXVlcnk6IHtcbiAgICAgICAgICAgICAgICAgICAgcHJvZHVjdElkOiBKb2kubnVtYmVyKCkuaW50ZWdlcigpXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiAnUmV0cmlldmUgUHJvZHVjdCB3aXRoIG1hdGNoZWQgUHJvZHVjdElEJ1xuICAgICAgICB9XG4gICAgfSxcbiAgICB7XG4gICAgICAgIG1ldGhvZDogJ0dFVCcsXG4gICAgICAgIHBhdGg6IF9wcmVmaXggKyAnL2J5YXV0aG9yL3thdXRob3JJZH0ve3BhZ2V9JyxcbiAgICAgICAgaGFuZGxlcjogZnVuY3Rpb24ocmVxdWVzdCwgcmVwbHkpIHtcbiAgICAgICAgICAgIFByb2R1Y3RzU2VydmljZS5nZXRQcm9kdWN0c0J5QXV0aG9yKFxuICAgICAgICAgICAgICAgIHJlcXVlc3QucGFyYW1zLmF1dGhvcklkLFxuICAgICAgICAgICAgICAgIHJlcXVlc3QucGFyYW1zLnBhZ2UgfHwgMSlcbiAgICAgICAgICAgIC50aGVuKChkYXRhOiBBcnJheTxhbnk+KSA9PiB7XG4gICAgICAgICAgICAgICAgcmVwbHkoZGF0YSk7XG4gICAgICAgICAgICB9KVxuICAgICAgICB9LFxuICAgICAgICBjb25maWc6IHtcbiAgICAgICAgICAgIHZhbGlkYXRlOiB7XG4gICAgICAgICAgICAgICAgcXVlcnk6IHtcbiAgICAgICAgICAgICAgICAgICAgYXV0aG9ySWQ6IEpvaS5udW1iZXIoKS5pbnRlZ2VyKCksXG4gICAgICAgICAgICAgICAgICAgIHBhZ2U6IEpvaS5udW1iZXIoKS5pbnRlZ2VyKClcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZGVzY3JpcHRpb246ICdSZXRyaWV2ZSBQcm9kdWN0cyBmcm9tIG1hdGNoZWQgQXV0aG9ySUQnXG4gICAgICAgIH1cbiAgICB9LFxuICAgIHtcbiAgICAgICAgbWV0aG9kOiAnR0VUJyxcbiAgICAgICAgcGF0aDogX3ByZWZpeCArICcvYnljYXRlZ29yeS97Y2F0ZWdvcnlJZH0ve3BhZ2V9JyxcbiAgICAgICAgaGFuZGxlcjogZnVuY3Rpb24ocmVxdWVzdCwgcmVwbHkpIHtcbiAgICAgICAgICAgIFByb2R1Y3RzU2VydmljZS5nZXRQcm9kdWN0c0J5Q2F0ZWdvcnkoXG4gICAgICAgICAgICAgICAgcmVxdWVzdC5wYXJhbXMuY2F0ZWdvcnlJZCxcbiAgICAgICAgICAgICAgICByZXF1ZXN0LnBhcmFtcy5wYWdlIHx8IDEpXG4gICAgICAgICAgICAudGhlbigoZGF0YTogQXJyYXk8YW55PikgPT4ge1xuICAgICAgICAgICAgICAgIHJlcGx5KGRhdGEpO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgfSxcbiAgICAgICAgY29uZmlnOiB7XG4gICAgICAgICAgICB2YWxpZGF0ZToge1xuICAgICAgICAgICAgICAgIHF1ZXJ5OiB7XG4gICAgICAgICAgICAgICAgICAgIGNhdGVnb3J5SWQ6IEpvaS5udW1iZXIoKS5pbnRlZ2VyKCksXG4gICAgICAgICAgICAgICAgICAgIHBhZ2U6IEpvaS5udW1iZXIoKS5pbnRlZ2VyKClcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZGVzY3JpcHRpb246ICdSZXRyaWV2ZSBQcm9kdWN0cyBmcm9tIG1hdGNoZWQgQ2F0ZWdvcnlJRCdcbiAgICAgICAgfVxuICAgIH0sXG4gICAge1xuICAgICAgICBtZXRob2Q6ICdHRVQnLFxuICAgICAgICBwYXRoOiBfcHJlZml4ICsgJy9ieXRhZy97dGFnSWR9L3twYWdlfScsXG4gICAgICAgIGhhbmRsZXI6IGZ1bmN0aW9uKHJlcXVlc3QsIHJlcGx5KSB7XG4gICAgICAgICAgICBQcm9kdWN0c1NlcnZpY2UuZ2V0UHJvZHVjdHNCeVRhZyhcbiAgICAgICAgICAgICAgICByZXF1ZXN0LnBhcmFtcy50YWdJZCxcbiAgICAgICAgICAgICAgICByZXF1ZXN0LnBhcmFtcy5wYWdlIHx8IDEpXG4gICAgICAgICAgICAudGhlbigoZGF0YTogQXJyYXk8YW55PikgPT4ge1xuICAgICAgICAgICAgICAgIHJlcGx5KGRhdGEpO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgfSxcbiAgICAgICAgY29uZmlnOiB7XG4gICAgICAgICAgICB2YWxpZGF0ZToge1xuICAgICAgICAgICAgICAgIHF1ZXJ5OiB7XG4gICAgICAgICAgICAgICAgICAgIHRhZ0lkOiBKb2kubnVtYmVyKCkuaW50ZWdlcigpLFxuICAgICAgICAgICAgICAgICAgICBwYWdlOiBKb2kubnVtYmVyKCkuaW50ZWdlcigpXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiAnUmV0cmlldmUgUHJvZHVjdHMgZnJvbSBtYXRjaGVkIFRhZ0lEJ1xuICAgICAgICB9XG4gICAgfSxcbiAgICB7XG4gICAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgICBwYXRoOiBfcHJlZml4ICsgJy9jcmVhdGUnLFxuICAgICAgICBoYW5kbGVyOiBmdW5jdGlvbihyZXF1ZXN0LCByZXBseSkge1xuICAgICAgICAgICAgUHJvZHVjdHNTZXJ2aWNlLmNyZWF0ZVByb2R1Y3QoXG4gICAgICAgICAgICAgICAgcmVxdWVzdC5wYXlsb2FkLm5vbmNlLFxuICAgICAgICAgICAgICAgIHJlcXVlc3QucGF5bG9hZC5hdXRob3IsXG4gICAgICAgICAgICAgICAgcmVxdWVzdC5wYXlsb2FkLnRpdGxlLFxuICAgICAgICAgICAgICAgIHJlcXVlc3QucGF5bG9hZC5jb250ZW50LFxuICAgICAgICAgICAgICAgIHJlcXVlc3QucGF5bG9hZC5zdGF0dXMsXG4gICAgICAgICAgICAgICAgcmVxdWVzdC5wYXlsb2FkLmNhdGVnb3JpZXMsXG4gICAgICAgICAgICAgICAgcmVxdWVzdC5wYXlsb2FkLnRhZ3MpXG4gICAgICAgICAgICAgICAgLnRoZW4oKGRhdGEpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgcmVwbHkoZGF0YSk7XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgfSxcbiAgICAgICAgY29uZmlnOiB7XG4gICAgICAgICAgICB2YWxpZGF0ZToge1xuICAgICAgICAgICAgICAgIHF1ZXJ5OiB7XG4gICAgICAgICAgICAgICAgICAgIG5vbmNlOiBKb2kuc3RyaW5nKCksXG4gICAgICAgICAgICAgICAgICAgIGF1dGhvcjogSm9pLnN0cmluZygpLFxuICAgICAgICAgICAgICAgICAgICB0aXRsZTogSm9pLnN0cmluZygpLFxuICAgICAgICAgICAgICAgICAgICBjb250ZW50OiBKb2kuc3RyaW5nKCksXG4gICAgICAgICAgICAgICAgICAgIHN0YXR1czogSm9pLnN0cmluZygpLFxuICAgICAgICAgICAgICAgICAgICBjYXRlZ29yaWFzOiBKb2kuYXJyYXkoKSxcbiAgICAgICAgICAgICAgICAgICAgdGFnczogSm9pLmFycmF5KClcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZGVzY3JpcHRpb246ICdDcmVhdGUgYSBuZXcgUHJvZHVjdCdcbiAgICAgICAgfVxuICAgIH0sXG4gICAge1xuICAgICAgICBtZXRob2Q6ICdQVVQnLFxuICAgICAgICBwYXRoOiBfcHJlZml4ICsgJy91cGRhdGUnLFxuICAgICAgICBoYW5kbGVyOiBmdW5jdGlvbihyZXF1ZXN0LCByZXBseSkge1xuICAgICAgICAgICAgUHJvZHVjdHNTZXJ2aWNlLnVwZGF0ZVByb2R1Y3QoXG4gICAgICAgICAgICAgICAgcmVxdWVzdC5wYXlsb2FkLm5vbmNlLFxuICAgICAgICAgICAgICAgIHJlcXVlc3QucGF5bG9hZC5wcm9kdWN0SWQsXG4gICAgICAgICAgICAgICAgcmVxdWVzdC5wYXlsb2FkLmF1dGhvcixcbiAgICAgICAgICAgICAgICByZXF1ZXN0LnBheWxvYWQudGl0bGUsXG4gICAgICAgICAgICAgICAgcmVxdWVzdC5wYXlsb2FkLmNvbnRlbnQsXG4gICAgICAgICAgICAgICAgcmVxdWVzdC5wYXlsb2FkLnN0YXR1cyxcbiAgICAgICAgICAgICAgICByZXF1ZXN0LnBheWxvYWQuY2F0ZWdvcmllcyxcbiAgICAgICAgICAgICAgICByZXF1ZXN0LnBheWxvYWQudGFncylcbiAgICAgICAgICAgICAgICAudGhlbigoZGF0YSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICByZXBseShkYXRhKTtcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICB9LFxuICAgICAgICBjb25maWc6IHtcbiAgICAgICAgICAgIHZhbGlkYXRlOiB7XG4gICAgICAgICAgICAgICAgcXVlcnk6IHtcbiAgICAgICAgICAgICAgICAgICAgbm9uY2U6IEpvaS5zdHJpbmcoKSxcbiAgICAgICAgICAgICAgICAgICAgcHJvZHVjdElkOiBKb2kubnVtYmVyKCkuaW50ZWdlcigpLFxuICAgICAgICAgICAgICAgICAgICBhdXRob3I6IEpvaS5zdHJpbmcoKSxcbiAgICAgICAgICAgICAgICAgICAgdGl0bGU6IEpvaS5zdHJpbmcoKSxcbiAgICAgICAgICAgICAgICAgICAgY29udGVudDogSm9pLnN0cmluZygpLFxuICAgICAgICAgICAgICAgICAgICBzdGF0dXM6IEpvaS5zdHJpbmcoKSxcbiAgICAgICAgICAgICAgICAgICAgY2F0ZWdvcmlhczogSm9pLmFycmF5KCksXG4gICAgICAgICAgICAgICAgICAgIHRhZ3M6IEpvaS5hcnJheSgpXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiAnVXBkYXRlIGEgUHJvZHVjdCdcbiAgICAgICAgfVxuICAgIH0sXG4gICAge1xuICAgICAgICBtZXRob2Q6ICdERUxFVEUnLFxuICAgICAgICBwYXRoOiBfcHJlZml4ICsgJy9kZWxldGUnLFxuICAgICAgICBoYW5kbGVyOiBmdW5jdGlvbihyZXF1ZXN0LCByZXBseSkge1xuICAgICAgICAgICAgUHJvZHVjdHNTZXJ2aWNlLmRlbGV0ZVByb2R1Y3QoXG4gICAgICAgICAgICAgICAgcmVxdWVzdC5wYXlsb2FkLm5vbmNlLFxuICAgICAgICAgICAgICAgIHJlcXVlc3QucGF5bG9hZC5wcm9kdWN0SWQpXG4gICAgICAgICAgICAgICAgLnRoZW4oKGRhdGEpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgcmVwbHkoZGF0YSk7XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgfSxcbiAgICAgICAgY29uZmlnOiB7XG4gICAgICAgICAgICB2YWxpZGF0ZToge1xuICAgICAgICAgICAgICAgIHF1ZXJ5OiB7XG4gICAgICAgICAgICAgICAgICAgIG5vbmNlOiBKb2kuc3RyaW5nKCksXG4gICAgICAgICAgICAgICAgICAgIHByb2R1Y3RJZDogSm9pLm51bWJlcigpLmludGVnZXIoKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogJ0RlbGV0ZSBhIFByb2R1Y3QnXG4gICAgICAgIH1cbiAgICB9XG5dXG5cblxubW9kdWxlLmV4cG9ydHMgPSBwcm9kdWN0cztcblxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9