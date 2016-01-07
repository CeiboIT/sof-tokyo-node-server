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
        path: _prefix + '/new/{page}',
        handler: function (request, reply) {
            ProductsService.getProductsNew(request.params.page || 1).then(function (data) {
                reply(data);
            });
        },
        config: {
            validate: {
                query: {
                    page: Joi.number().integer()
                }
            },
            description: 'Retrieves new Products',
            tags: ['products']
        }
    },
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
            description: 'Retrieves Products list',
            tags: ['products']
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
            description: 'Retrieve Product with matched ProductID',
            tags: ['products']
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
            description: 'Retrieve Products from matched AuthorID',
            tags: ['products']
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
            description: 'Retrieve Products from matched CategoryID',
            tags: ['products']
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
            description: 'Retrieve Products from matched TagID',
            tags: ['products']
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
            description: 'Create a new Product',
            tags: ['products']
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
            description: 'Update a Product',
            tags: ['products']
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
            description: 'Delete a Product',
            tags: ['products']
        }
    },
    {
        method: 'POST',
        path: _prefix + '/comments/create',
        handler: function (request, reply) {
            ProductsService.createComment(request.payload.productId, request.payload.cookie, request.payload.content).then(function (data) {
                reply(data);
            });
        },
        config: {
            validate: {
                query: {
                    productId: Joi.number().integer(),
                    cookie: Joi.string(),
                    content: Joi.string()
                }
            },
            description: 'Create a new Comment',
            tags: ['products']
        }
    },
];
module.exports = products;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1vZHVsZXMvcHJvZHVjdHMvcHJvZHVjdHMucm91dGVzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLFlBQVksQ0FBQztBQUViLEFBSUEsa0RBSmtEO0FBQ2xELDhDQUE4QztBQUc5QyxJQUFPLE9BQU8sV0FBVyxvQkFBb0IsQ0FBQyxDQUFDO0FBQy9DLElBQU8sR0FBRyxXQUFXLEtBQUssQ0FBQyxDQUFDO0FBRTVCLElBQUksZUFBZSxHQUFHLElBQUksT0FBTyxDQUFDLGVBQWUsRUFBRSxDQUFDO0FBQ3BELElBQUksT0FBTyxHQUFHLFdBQVcsQ0FBQztBQUMxQixJQUFJLFFBQVEsR0FBRztJQUNYO1FBQ0ksTUFBTSxFQUFFLEtBQUs7UUFDYixJQUFJLEVBQUUsT0FBTyxHQUFHLGFBQWE7UUFDN0IsT0FBTyxFQUFFLFVBQVMsT0FBTyxFQUFFLEtBQUs7WUFDNUIsZUFBZSxDQUFDLGNBQWMsQ0FDMUIsT0FBTyxDQUFDLE1BQU0sQ0FBQyxJQUFJLElBQUksQ0FBQyxDQUFDLENBQ3hCLElBQUksQ0FBQyxVQUFDLElBQWdCO2dCQUNuQixLQUFLLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDaEIsQ0FBQyxDQUFDLENBQUE7UUFDVixDQUFDO1FBQ0QsTUFBTSxFQUFFO1lBQ0osUUFBUSxFQUFFO2dCQUNOLEtBQUssRUFBRTtvQkFDSCxJQUFJLEVBQUUsR0FBRyxDQUFDLE1BQU0sRUFBRSxDQUFDLE9BQU8sRUFBRTtpQkFDL0I7YUFDSjtZQUNELFdBQVcsRUFBRSx3QkFBd0I7WUFDckMsSUFBSSxFQUFFLENBQUMsVUFBVSxDQUFDO1NBQ3JCO0tBQ0o7SUFDRDtRQUNJLE1BQU0sRUFBRSxLQUFLO1FBQ2IsSUFBSSxFQUFFLE9BQU8sR0FBRyxjQUFjO1FBQzlCLE9BQU8sRUFBRSxVQUFTLE9BQU8sRUFBRSxLQUFLO1lBQzVCLGVBQWUsQ0FBQyxlQUFlLENBQzNCLE9BQU8sQ0FBQyxNQUFNLENBQUMsSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUN4QixJQUFJLENB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LE9BQU8sQ0FBQyxPQUFPLENBQUMsTUFBTSxFQUN0QixPQUFPLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUN2QixJQUFJLENBQUMsVUFBQyxJQUFJO2dCQUNQLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUNoQixDQUFDLENBQUMsQ0FBQTtRQUNWLENBQUM7UUFDRCxNQUFNLEVBQUU7WUFDSixRQUFRLEVBQUU7Z0JBQ04sS0FBSyxFQUFFO29CQUNILFNBQVMsRUFBRSxHQUFHLENBQUMsTUFBTSxFQUFFLENBQUMsT0FBTyxFQUFFO29CQUNqQyxNQUFNLEVBQUUsR0FBRyxDQUFDLE1BQU0sRUFBRTtvQkFDcEIsT0FBTyxFQUFFLEdBQUcsQ0FBQyxNQUFNLEVBQUU7aUJBQ3hCO2FBQ0o7WUFDRCxXQUFXLEVBQUUsc0JBQXNCO1lBQ25DLElBQUksRUFBRSxDQUFDLFVBQVUsQ0FBQztTQUNyQjtLQUNKO0NBQ0osQ0FBQTtBQUdELE1BQU0sQ0FBQyxPQUFPLEdBQUcsUUFBUSxDQUFDIiwiZmlsZSI6Im1vZHVsZXMvcHJvZHVjdHMvcHJvZHVjdHMucm91dGVzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnO1xuXG4vLy8gPHJlZmVyZW5jZSBwYXRoPVwiLi4vLi4vLi4vdHlwaW5ncy90c2QuZC50c1wiIC8+XG4vLy8gPHJlZmVyZW5jZSBwYXRoPVwiLi9wcm9kdWN0cy5zZXJ2aWNlLnRzXCIgLz5cblxuXG5pbXBvcnQgc2VydmljZSA9IHJlcXVpcmUoJy4vcHJvZHVjdHMuc2VydmljZScpO1xuaW1wb3J0IEpvaSA9IHJlcXVpcmUoJ2pvaScpO1xuXG52YXIgUHJvZHVjdHNTZXJ2aWNlID0gbmV3IHNlcnZpY2UuUHJvZHVjdHNTZXJ2aWNlKCk7XG52YXIgX3ByZWZpeCA9ICcvcHJvZHVjdHMnO1xudmFyIHByb2R1Y3RzID0gW1xuICAgIHtcbiAgICAgICAgbWV0aG9kOiAnR0VUJyxcbiAgICAgICAgcGF0aDogX3ByZWZpeCArICcvbmV3L3twYWdlfScsXG4gICAgICAgIGhhbmRsZXI6IGZ1bmN0aW9uKHJlcXVlc3QsIHJlcGx5KSB7XG4gICAgICAgICAgICBQcm9kdWN0c1NlcnZpY2UuZ2V0UHJvZHVjdHNOZXcoXG4gICAgICAgICAgICAgICAgcmVxdWVzdC5wYXJhbXMucGFnZSB8fCAxKVxuICAgICAgICAgICAgICAgIC50aGVuKChkYXRhOiBBcnJheTxhbnk+KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHJlcGx5KGRhdGEpO1xuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgIH0sXG4gICAgICAgIGNvbmZpZzoge1xuICAgICAgICAgICAgdmFsaWRhdGU6IHtcbiAgICAgICAgICAgICAgICBxdWVyeToge1xuICAgICAgICAgICAgICAgICAgICBwYWdlOiBKb2kubnVtYmVyKCkuaW50ZWdlcigpXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiAnUmV0cmlldmVzIG5ldyBQcm9kdWN0cycsXG4gICAgICAgICAgICB0YWdzOiBbJ3Byb2R1Y3RzJ11cbiAgICAgICAgfVxuICAgIH0sXG4gICAge1xuICAgICAgICBtZXRob2Q6ICdHRVQnLFxuICAgICAgICBwYXRoOiBfcHJlZml4ICsgJy9saXN0L3twYWdlfScsXG4gICAgICAgIGhhbmRsZXI6IGZ1bmN0aW9uKHJlcXVlc3QsIHJlcGx5KSB7XG4gICAgICAgICAgICBQcm9kdWN0c1NlcnZpY2UuZ2V0UHJvZHVjdHNMaXN0KFxuICAgICAgICAgICAgICAgIHJlcXVlc3QucGFyYW1zLnBhZ2UgfHwgMSlcbiAgICAgICAgICAgICAgICAudGhlbigoZGF0YTogQXJyYXk8YW55PikgPT4ge1xuICAgICAgICAgICAgICAgICAgICByZXBseShkYXRhKTtcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICB9LFxuICAgICAgICBjb25maWc6IHtcbiAgICAgICAgICAgIHZhbGlkYXRlOiB7XG4gICAgICAgICAgICAgICAgcXVlcnk6IHtcbiAgICAgICAgICAgICAgICAgICAgcGFnZTogSm9pLm51bWJlcigpLmludGVnZXIoKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogJ1JldHJpZXZlcyBQcm9kdWN0cyBsaXN0JyxcbiAgICAgICAgICAgIHRhZ3M6IFsncHJvZHVjdHMnXVxuICAgICAgICB9XG4gICAgfSxcbiAgICB7XG4gICAgICAgIG1ldGhvZDogJ0dFVCcsXG4gICAgICAgIHBhdGg6IF9wcmVmaXggKyAnL3Byb2R1Y3Qve3Byb2R1Y3RJZH0nLFxuICAgICAgICBoYW5kbGVyOiBmdW5jdGlvbihyZXF1ZXN0LCByZXBseSkge1xuICAgICAgICAgICAgUHJvZHVjdHNTZXJ2aWNlLmdldFByb2R1Y3RCeUlkKFxuICAgICAgICAgICAgICAgIHJlcXVlc3QucGFyYW1zLnByb2R1Y3RJZClcbiAgICAgICAgICAgICAgICAudGhlbigoZGF0YSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICByZXBseShkYXRhKTtcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICB9LFxuICAgICAgICBjb25maWc6IHtcbiAgICAgICAgICAgIHZhbGlkYXRlOiB7XG4gICAgICAgICAgICAgICAgcXVlcnk6IHtcbiAgICAgICAgICAgICAgICAgICAgcHJvZHVjdElkOiBKb2kubnVtYmVyKCkuaW50ZWdlcigpXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiAnUmV0cmlldmUgUHJvZHVjdCB3aXRoIG1hdGNoZWQgUHJvZHVjdElEJyxcbiAgICAgICAgICAgIHRhZ3M6IFsncHJvZHVjdHMnXVxuICAgICAgICB9XG4gICAgfSxcbiAgICB7XG4gICAgICAgIG1ldGhvZDogJ0dFVCcsXG4gICAgICAgIHBhdGg6IF9wcmVmaXggKyAnL2J5YXV0aG9yL3thdXRob3JJZH0ve3BhZ2V9JyxcbiAgICAgICAgaGFuZGxlcjogZnVuY3Rpb24ocmVxdWVzdCwgcmVwbHkpIHtcbiAgICAgICAgICAgIFByb2R1Y3RzU2VydmljZS5nZXRQcm9kdWN0c0J5QXV0aG9yKFxuICAgICAgICAgICAgICAgIHJlcXVlc3QucGFyYW1zLmF1dGhvcklkLFxuICAgICAgICAgICAgICAgIHJlcXVlc3QucGFyYW1zLnBhZ2UgfHwgMSlcbiAgICAgICAgICAgIC50aGVuKChkYXRhOiBBcnJheTxhbnk+KSA9PiB7XG4gICAgICAgICAgICAgICAgcmVwbHkoZGF0YSk7XG4gICAgICAgICAgICB9KVxuICAgICAgICB9LFxuICAgICAgICBjb25maWc6IHtcbiAgICAgICAgICAgIHZhbGlkYXRlOiB7XG4gICAgICAgICAgICAgICAgcXVlcnk6IHtcbiAgICAgICAgICAgICAgICAgICAgYXV0aG9ySWQ6IEpvaS5udW1iZXIoKS5pbnRlZ2VyKCksXG4gICAgICAgICAgICAgICAgICAgIHBhZ2U6IEpvaS5udW1iZXIoKS5pbnRlZ2VyKClcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZGVzY3JpcHRpb246ICdSZXRyaWV2ZSBQcm9kdWN0cyBmcm9tIG1hdGNoZWQgQXV0aG9ySUQnLFxuICAgICAgICAgICAgdGFnczogWydwcm9kdWN0cyddXG4gICAgICAgIH1cbiAgICB9LFxuICAgIHtcbiAgICAgICAgbWV0aG9kOiAnR0VUJyxcbiAgICAgICAgcGF0aDogX3ByZWZpeCArICcvYnljYXRlZ29yeS97Y2F0ZWdvcnlJZH0ve3BhZ2V9JyxcbiAgICAgICAgaGFuZGxlcjogZnVuY3Rpb24ocmVxdWVzdCwgcmVwbHkpIHtcbiAgICAgICAgICAgIFByb2R1Y3RzU2VydmljZS5nZXRQcm9kdWN0c0J5Q2F0ZWdvcnkoXG4gICAgICAgICAgICAgICAgcmVxdWVzdC5wYXJhbXMuY2F0ZWdvcnlJZCxcbiAgICAgICAgICAgICAgICByZXF1ZXN0LnBhcmFtcy5wYWdlIHx8IDEpXG4gICAgICAgICAgICAudGhlbigoZGF0YTogQXJyYXk8YW55PikgPT4ge1xuICAgICAgICAgICAgICAgIHJlcGx5KGRhdGEpO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgfSxcbiAgICAgICAgY29uZmlnOiB7XG4gICAgICAgICAgICB2YWxpZGF0ZToge1xuICAgICAgICAgICAgICAgIHF1ZXJ5OiB7XG4gICAgICAgICAgICAgICAgICAgIGNhdGVnb3J5SWQ6IEpvaS5udW1iZXIoKS5pbnRlZ2VyKCksXG4gICAgICAgICAgICAgICAgICAgIHBhZ2U6IEpvaS5udW1iZXIoKS5pbnRlZ2VyKClcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZGVzY3JpcHRpb246ICdSZXRyaWV2ZSBQcm9kdWN0cyBmcm9tIG1hdGNoZWQgQ2F0ZWdvcnlJRCcsXG4gICAgICAgICAgICB0YWdzOiBbJ3Byb2R1Y3RzJ11cbiAgICAgICAgfVxuICAgIH0sXG4gICAge1xuICAgICAgICBtZXRob2Q6ICdHRVQnLFxuICAgICAgICBwYXRoOiBfcHJlZml4ICsgJy9ieXRhZy97dGFnSWR9L3twYWdlfScsXG4gICAgICAgIGhhbmRsZXI6IGZ1bmN0aW9uKHJlcXVlc3QsIHJlcGx5KSB7XG4gICAgICAgICAgICBQcm9kdWN0c1NlcnZpY2UuZ2V0UHJvZHVjdHNCeVRhZyhcbiAgICAgICAgICAgICAgICByZXF1ZXN0LnBhcmFtcy50YWdJZCxcbiAgICAgICAgICAgICAgICByZXF1ZXN0LnBhcmFtcy5wYWdlIHx8IDEpXG4gICAgICAgICAgICAudGhlbigoZGF0YTogQXJyYXk8YW55PikgPT4ge1xuICAgICAgICAgICAgICAgIHJlcGx5KGRhdGEpO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgfSxcbiAgICAgICAgY29uZmlnOiB7XG4gICAgICAgICAgICB2YWxpZGF0ZToge1xuICAgICAgICAgICAgICAgIHF1ZXJ5OiB7XG4gICAgICAgICAgICAgICAgICAgIHRhZ0lkOiBKb2kubnVtYmVyKCkuaW50ZWdlcigpLFxuICAgICAgICAgICAgICAgICAgICBwYWdlOiBKb2kubnVtYmVyKCkuaW50ZWdlcigpXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiAnUmV0cmlldmUgUHJvZHVjdHMgZnJvbSBtYXRjaGVkIFRhZ0lEJyxcbiAgICAgICAgICAgIHRhZ3M6IFsncHJvZHVjdHMnXVxuICAgICAgICB9XG4gICAgfSxcbiAgICB7XG4gICAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgICBwYXRoOiBfcHJlZml4ICsgJy9jcmVhdGUnLFxuICAgICAgICBoYW5kbGVyOiBmdW5jdGlvbihyZXF1ZXN0LCByZXBseSkge1xuICAgICAgICAgICAgUHJvZHVjdHNTZXJ2aWNlLmNyZWF0ZVByb2R1Y3QoXG4gICAgICAgICAgICAgICAgcmVxdWVzdC5wYXlsb2FkLm5vbmNlLFxuICAgICAgICAgICAgICAgIHJlcXVlc3QucGF5bG9hZC5hdXRob3IsXG4gICAgICAgICAgICAgICAgcmVxdWVzdC5wYXlsb2FkLnRpdGxlLFxuICAgICAgICAgICAgICAgIHJlcXVlc3QucGF5bG9hZC5jb250ZW50LFxuICAgICAgICAgICAgICAgIHJlcXVlc3QucGF5bG9hZC5zdGF0dXMsXG4gICAgICAgICAgICAgICAgcmVxdWVzdC5wYXlsb2FkLmNhdGVnb3JpZXMsXG4gICAgICAgICAgICAgICAgcmVxdWVzdC5wYXlsb2FkLnRhZ3MpXG4gICAgICAgICAgICAgICAgLnRoZW4oKGRhdGEpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgcmVwbHkoZGF0YSk7XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgfSxcbiAgICAgICAgY29uZmlnOiB7XG4gICAgICAgICAgICB2YWxpZGF0ZToge1xuICAgICAgICAgICAgICAgIHF1ZXJ5OiB7XG4gICAgICAgICAgICAgICAgICAgIG5vbmNlOiBKb2kuc3RyaW5nKCksXG4gICAgICAgICAgICAgICAgICAgIGF1dGhvcjogSm9pLnN0cmluZygpLFxuICAgICAgICAgICAgICAgICAgICB0aXRsZTogSm9pLnN0cmluZygpLFxuICAgICAgICAgICAgICAgICAgICBjb250ZW50OiBKb2kuc3RyaW5nKCksXG4gICAgICAgICAgICAgICAgICAgIHN0YXR1czogSm9pLnN0cmluZygpLFxuICAgICAgICAgICAgICAgICAgICBjYXRlZ29yaWFzOiBKb2kuYXJyYXkoKSxcbiAgICAgICAgICAgICAgICAgICAgdGFnczogSm9pLmFycmF5KClcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZGVzY3JpcHRpb246ICdDcmVhdGUgYSBuZXcgUHJvZHVjdCcsXG4gICAgICAgICAgICB0YWdzOiBbJ3Byb2R1Y3RzJ11cbiAgICAgICAgfVxuICAgIH0sXG4gICAge1xuICAgICAgICBtZXRob2Q6ICdQVVQnLFxuICAgICAgICBwYXRoOiBfcHJlZml4ICsgJy91cGRhdGUnLFxuICAgICAgICBoYW5kbGVyOiBmdW5jdGlvbihyZXF1ZXN0LCByZXBseSkge1xuICAgICAgICAgICAgUHJvZHVjdHNTZXJ2aWNlLnVwZGF0ZVByb2R1Y3QoXG4gICAgICAgICAgICAgICAgcmVxdWVzdC5wYXlsb2FkLm5vbmNlLFxuICAgICAgICAgICAgICAgIHJlcXVlc3QucGF5bG9hZC5wcm9kdWN0SWQsXG4gICAgICAgICAgICAgICAgcmVxdWVzdC5wYXlsb2FkLmF1dGhvcixcbiAgICAgICAgICAgICAgICByZXF1ZXN0LnBheWxvYWQudGl0bGUsXG4gICAgICAgICAgICAgICAgcmVxdWVzdC5wYXlsb2FkLmNvbnRlbnQsXG4gICAgICAgICAgICAgICAgcmVxdWVzdC5wYXlsb2FkLnN0YXR1cyxcbiAgICAgICAgICAgICAgICByZXF1ZXN0LnBheWxvYWQuY2F0ZWdvcmllcyxcbiAgICAgICAgICAgICAgICByZXF1ZXN0LnBheWxvYWQudGFncylcbiAgICAgICAgICAgICAgICAudGhlbigoZGF0YSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICByZXBseShkYXRhKTtcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICB9LFxuICAgICAgICBjb25maWc6IHtcbiAgICAgICAgICAgIHZhbGlkYXRlOiB7XG4gICAgICAgICAgICAgICAgcXVlcnk6IHtcbiAgICAgICAgICAgICAgICAgICAgbm9uY2U6IEpvaS5zdHJpbmcoKSxcbiAgICAgICAgICAgICAgICAgICAgcHJvZHVjdElkOiBKb2kubnVtYmVyKCkuaW50ZWdlcigpLFxuICAgICAgICAgICAgICAgICAgICBhdXRob3I6IEpvaS5zdHJpbmcoKSxcbiAgICAgICAgICAgICAgICAgICAgdGl0bGU6IEpvaS5zdHJpbmcoKSxcbiAgICAgICAgICAgICAgICAgICAgY29udGVudDogSm9pLnN0cmluZygpLFxuICAgICAgICAgICAgICAgICAgICBzdGF0dXM6IEpvaS5zdHJpbmcoKSxcbiAgICAgICAgICAgICAgICAgICAgY2F0ZWdvcmlhczogSm9pLmFycmF5KCksXG4gICAgICAgICAgICAgICAgICAgIHRhZ3M6IEpvaS5hcnJheSgpXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiAnVXBkYXRlIGEgUHJvZHVjdCcsXG4gICAgICAgICAgICB0YWdzOiBbJ3Byb2R1Y3RzJ11cbiAgICAgICAgfVxuICAgIH0sXG4gICAge1xuICAgICAgICBtZXRob2Q6ICdERUxFVEUnLFxuICAgICAgICBwYXRoOiBfcHJlZml4ICsgJy9kZWxldGUnLFxuICAgICAgICBoYW5kbGVyOiBmdW5jdGlvbihyZXF1ZXN0LCByZXBseSkge1xuICAgICAgICAgICAgUHJvZHVjdHNTZXJ2aWNlLmRlbGV0ZVByb2R1Y3QoXG4gICAgICAgICAgICAgICAgcmVxdWVzdC5wYXlsb2FkLm5vbmNlLFxuICAgICAgICAgICAgICAgIHJlcXVlc3QucGF5bG9hZC5wcm9kdWN0SWQpXG4gICAgICAgICAgICAgICAgLnRoZW4oKGRhdGEpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgcmVwbHkoZGF0YSk7XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgfSxcbiAgICAgICAgY29uZmlnOiB7XG4gICAgICAgICAgICB2YWxpZGF0ZToge1xuICAgICAgICAgICAgICAgIHF1ZXJ5OiB7XG4gICAgICAgICAgICAgICAgICAgIG5vbmNlOiBKb2kuc3RyaW5nKCksXG4gICAgICAgICAgICAgICAgICAgIHByb2R1Y3RJZDogSm9pLm51bWJlcigpLmludGVnZXIoKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogJ0RlbGV0ZSBhIFByb2R1Y3QnLFxuICAgICAgICAgICAgdGFnczogWydwcm9kdWN0cyddXG4gICAgICAgIH1cbiAgICB9LFxuICAgIHtcbiAgICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICAgIHBhdGg6IF9wcmVmaXggKyAnL2NvbW1lbnRzL2NyZWF0ZScsXG4gICAgICAgIGhhbmRsZXI6IGZ1bmN0aW9uKHJlcXVlc3QsIHJlcGx5KSB7XG4gICAgICAgICAgICBQcm9kdWN0c1NlcnZpY2UuY3JlYXRlQ29tbWVudChcbiAgICAgICAgICAgICAgICByZXF1ZXN0LnBheWxvYWQucHJvZHVjdElkLFxuICAgICAgICAgICAgICAgIHJlcXVlc3QucGF5bG9hZC5jb29raWUsXG4gICAgICAgICAgICAgICAgcmVxdWVzdC5wYXlsb2FkLmNvbnRlbnQpXG4gICAgICAgICAgICAgICAgLnRoZW4oKGRhdGEpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgcmVwbHkoZGF0YSk7XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgfSxcbiAgICAgICAgY29uZmlnOiB7XG4gICAgICAgICAgICB2YWxpZGF0ZToge1xuICAgICAgICAgICAgICAgIHF1ZXJ5OiB7XG4gICAgICAgICAgICAgICAgICAgIHByb2R1Y3RJZDogSm9pLm51bWJlcigpLmludGVnZXIoKSxcbiAgICAgICAgICAgICAgICAgICAgY29va2llOiBKb2kuc3RyaW5nKCksXG4gICAgICAgICAgICAgICAgICAgIGNvbnRlbnQ6IEpvaS5zdHJpbmcoKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogJ0NyZWF0ZSBhIG5ldyBDb21tZW50JyxcbiAgICAgICAgICAgIHRhZ3M6IFsncHJvZHVjdHMnXVxuICAgICAgICB9XG4gICAgfSxcbl1cblxuXG5tb2R1bGUuZXhwb3J0cyA9IHByb2R1Y3RzO1xuXG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=