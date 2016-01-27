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
        path: _prefix + '/product/{productId}/{userId}',
        handler: function (request, reply) {
            ProductsService.getProductById(request.params.productId, request.params.userId).then(function (data) {
                reply(data);
            });
        },
        config: {
            validate: {
                query: {
                    productId: Joi.number().integer(),
                    userId: Joi.string()
                }
            },
            description: 'Retrieve Product with matched ProductID',
            tags: ['products'],
            notes: [
                "If user is logued in -> send UserID as param",
                "If user is NOT logued in -> send UserID = 'null'"
            ]
        }
    },
    {
        method: 'GET',
        path: _prefix + '/byauthor/{authorId}/{page}',
        handler: function (request, reply) {
            ProductsService.getProductsByAuthor(request.params.authorId).then(function (data) {
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
        path: _prefix + '/byschool/{schoolId}/{page}',
        handler: function (request, reply) {
            ProductsService.getProductsBySchool(request.params.schoolId, request.params.page || 1).then(function (data) {
                reply(data);
            });
        },
        config: {
            validate: {
                query: {
                    schoolId: Joi.number().integer(),
                    page: Joi.number().integer()
                }
            },
            description: 'Retrieve Products from matched SchoolID',
            tags: ['products']
        }
    },
    {
        method: 'GET',
        path: _prefix + '/bysubcategory0/{subcategory0Id}/{page}',
        handler: function (request, reply) {
            ProductsService.getProductsBySubcategory0(request.params.subcategory0Id, request.params.page || 1).then(function (data) {
                reply(data);
            });
        },
        config: {
            validate: {
                query: {
                    subcategory0Id: Joi.number().integer(),
                    page: Joi.number().integer()
                }
            },
            description: 'Retrieve Products from matched Subcategory0ID',
            tags: ['products']
        }
    },
    {
        method: 'GET',
        path: _prefix + '/bysubcategory1/{subcategory1Id}/{page}',
        handler: function (request, reply) {
            ProductsService.getProductsBySubcategory1(request.params.subcategory1Id, request.params.page || 1).then(function (data) {
                reply(data);
            });
        },
        config: {
            validate: {
                query: {
                    subcategory1Id: Joi.number().integer(),
                    page: Joi.number().integer()
                }
            },
            description: 'Retrieve Products from matched Subcategory1ID',
            tags: ['products']
        }
    },
    {
        method: 'GET',
        path: _prefix + '/bystyle/{styleId}/{page}',
        handler: function (request, reply) {
            ProductsService.getProductsByStyle(request.params.styleId, request.params.page || 1).then(function (data) {
                reply(data);
            });
        },
        config: {
            validate: {
                query: {
                    styleId: Joi.number().integer(),
                    page: Joi.number().integer()
                }
            },
            description: 'Retrieve Products from matched StyleID',
            tags: ['products']
        }
    },
    {
        method: 'POST',
        path: _prefix + '/create',
        handler: function (request, reply) {
            ProductsService.createProduct(request.payload.nonce, request.payload.author, request.payload.title, request.payload.content, request.payload.status, request.payload.school, request.payload.subcategory0, request.payload.subcategory1, request.payload.styles).then(function (data) {
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
    {
        method: 'GET',
        path: _prefix + '/search/{search}/{page}',
        handler: function (request, reply) {
            ProductsService.getProductsBySearch(request.params.search, request.params.page || 1).then(function (data) {
                reply(data);
            });
        },
        config: {
            validate: {
                query: {
                    search: Joi.number().integer(),
                    page: Joi.number().integer()
                }
            },
            description: 'Retrieve Products from matched Search string',
            tags: ['products']
        }
    },
    {
        method: 'GET',
        path: _prefix + '/ranking/likes',
        handler: function (request, reply) {
            ProductsService.getProductsRankingByLikes().then(function (data) {
                reply({ products: data });
            });
        },
        config: {
            description: 'Retrieve Products Ranking by Likes',
            tags: ['products']
        }
    },
    {
        method: 'GET',
        path: _prefix + '/ranking/visits/unique',
        handler: function (request, reply) {
            ProductsService.getProductsRankingByUniqueVisits().then(function (data) {
                reply({ products: data });
            });
        },
        config: {
            description: 'Retrieve Products Ranking by Unique Visits',
            tags: ['products']
        }
    },
    {
        method: 'GET',
        path: _prefix + '/ranking/visits/total',
        handler: function (request, reply) {
            ProductsService.getProductsRankingByTotalVisits().then(function (data) {
                reply({ products: data });
            });
        },
        config: {
            description: 'Retrieve Products Ranking by Total Visits',
            tags: ['products']
        }
    }
];
module.exports = products;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1vZHVsZXMvcHJvZHVjdHMvcHJvZHVjdHMucm91dGVzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLFlBQVksQ0FBQztBQUViLEFBSUEsa0RBSmtEO0FBQ2xELDhDQUE4QztBQUc5QyxJQUFPLE9BQU8sV0FBVyxvQkFBb0IsQ0FBQyxDQUFDO0FBQy9DLElBQU8sR0FBRyxXQUFXLEtBQUssQ0FBQyxDQUFDO0FBRTVCLElBQUksZUFBZSxHQUFHLElBQUksT0FBTyxDQUFDLGVBQWUsRUFBRSxDQUFDO0FBQ3BELElBQUksT0FBTyxHQUFHLFdBQVcsQ0FBQztBQUMxQixJQUFJLFFBQVEsR0FBRztJQUNYO1FBQ0ksTUFBTSxFQUFFLEtBQUs7UUFDYixJQUFJLEVBQUUsT0FBTyxHQUFHLGFBQWE7UUFDN0IsT0FBTyxFQUFFLFVBQVMsT0FBTyxFQUFFLEtBQUs7WUFDNUIsZUFBZSxDQUFDLGNBQWMsQ0FDMUIsT0FBTyxDQUFDLE1BQU0sQ0FBQyxJQUFJLElBQUksQ0FBQyxDQUFDLENBQzVCLElBQUksQ0FBQyxVQUFDLElBQWdCO2dCQUNuQixLQUFLLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDaEIsQ0FBQyxDQUFDLENBQUE7UUFDTixDQUFDO1FBQ0QsTUFBTSxFQUFFO1lBQ0osUUFBUSxFQUFFO2dCQUNOLEtBQUssRUFBRTtvQkFDSCxJQUFJLEVBQUUsR0FBRyxDQUFDLE1BQU0sRUFBRSxDQUFDLE9BQU8sRUFBRTtpQkFDL0I7YUFDSjtZQUNELFdBQVcsRUFBRSx3QkFBd0I7WUFDckMsSUFBSSxFQUFFLENBQUMsVUFBVSxDQUFDO1NBQ3JCO0tBQ0o7SUFDRDtRQUNJLE1BQU0sRUFBRSxLQUFLO1FBQ2IsSUFBSSxFQUFFLE9BQU8sR0FBRyxjQUFjO1FBQzlCLE9BQU8sRUFBRSxVQUFTLE9BQU8sRUFBRSxLQUFLO1lBQzVCLGVBQWUsQ0FBQyxlQUFlLENBQzNCLE9BQU8sQ0FBQyxNQUFNLENBQUMsSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUM1QixJQUFJLENB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QUs7UUFDYixJQUFJLEVBQUUsT0FBTyxHQUFHLHVCQUF1QjtRQUN2QyxPQUFPLEVBQUUsVUFBUyxPQUFPLEVBQUUsS0FBSztZQUM1QixlQUFlLENBQUMsK0JBQStCLEVBQUUsQ0FDNUMsSUFBSSxDQUFDLFVBQUMsSUFBZ0I7Z0JBQ25CLEtBQUssQ0FBQyxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDO1lBQzlCLENBQUMsQ0FBQyxDQUFBO1FBQ1YsQ0FBQztRQUNELE1BQU0sRUFBRTtZQUNKLFdBQVcsRUFBRSwyQ0FBMkM7WUFDeEQsSUFBSSxFQUFFLENBQUMsVUFBVSxDQUFDO1NBQ3JCO0tBQ0o7Q0FDSixDQUFBO0FBR0QsTUFBTSxDQUFDLE9BQU8sR0FBRyxRQUFRLENBQUMiLCJmaWxlIjoibW9kdWxlcy9wcm9kdWN0cy9wcm9kdWN0cy5yb3V0ZXMuanMiLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCc7XG5cbi8vLyA8cmVmZXJlbmNlIHBhdGg9XCIuLi8uLi8uLi90eXBpbmdzL3RzZC5kLnRzXCIgLz5cbi8vLyA8cmVmZXJlbmNlIHBhdGg9XCIuL3Byb2R1Y3RzLnNlcnZpY2UudHNcIiAvPlxuXG5cbmltcG9ydCBzZXJ2aWNlID0gcmVxdWlyZSgnLi9wcm9kdWN0cy5zZXJ2aWNlJyk7XG5pbXBvcnQgSm9pID0gcmVxdWlyZSgnam9pJyk7XG5cbnZhciBQcm9kdWN0c1NlcnZpY2UgPSBuZXcgc2VydmljZS5Qcm9kdWN0c1NlcnZpY2UoKTtcbnZhciBfcHJlZml4ID0gJy9wcm9kdWN0cyc7XG52YXIgcHJvZHVjdHMgPSBbXG4gICAge1xuICAgICAgICBtZXRob2Q6ICdHRVQnLFxuICAgICAgICBwYXRoOiBfcHJlZml4ICsgJy9uZXcve3BhZ2V9JyxcbiAgICAgICAgaGFuZGxlcjogZnVuY3Rpb24ocmVxdWVzdCwgcmVwbHkpIHtcbiAgICAgICAgICAgIFByb2R1Y3RzU2VydmljZS5nZXRQcm9kdWN0c05ldyhcbiAgICAgICAgICAgICAgICByZXF1ZXN0LnBhcmFtcy5wYWdlIHx8IDEpXG4gICAgICAgICAgICAudGhlbigoZGF0YTogQXJyYXk8YW55PikgPT4ge1xuICAgICAgICAgICAgICAgIHJlcGx5KGRhdGEpO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgfSxcbiAgICAgICAgY29uZmlnOiB7XG4gICAgICAgICAgICB2YWxpZGF0ZToge1xuICAgICAgICAgICAgICAgIHF1ZXJ5OiB7XG4gICAgICAgICAgICAgICAgICAgIHBhZ2U6IEpvaS5udW1iZXIoKS5pbnRlZ2VyKClcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZGVzY3JpcHRpb246ICdSZXRyaWV2ZXMgbmV3IFByb2R1Y3RzJyxcbiAgICAgICAgICAgIHRhZ3M6IFsncHJvZHVjdHMnXVxuICAgICAgICB9XG4gICAgfSxcbiAgICB7XG4gICAgICAgIG1ldGhvZDogJ0dFVCcsXG4gICAgICAgIHBhdGg6IF9wcmVmaXggKyAnL2xpc3Qve3BhZ2V9JyxcbiAgICAgICAgaGFuZGxlcjogZnVuY3Rpb24ocmVxdWVzdCwgcmVwbHkpIHtcbiAgICAgICAgICAgIFByb2R1Y3RzU2VydmljZS5nZXRQcm9kdWN0c0xpc3QoXG4gICAgICAgICAgICAgICAgcmVxdWVzdC5wYXJhbXMucGFnZSB8fCAxKVxuICAgICAgICAgICAgLnRoZW4oKGRhdGE6IEFycmF5PGFueT4pID0+IHtcbiAgICAgICAgICAgICAgICByZXBseShkYXRhKTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgIH0sXG4gICAgICAgIGNvbmZpZzoge1xuICAgICAgICAgICAgdmFsaWRhdGU6IHtcbiAgICAgICAgICAgICAgICBxdWVyeToge1xuICAgICAgICAgICAgICAgICAgICBwYWdlOiBKb2kubnVtYmVyKCkuaW50ZWdlcigpXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiAnUmV0cmlldmVzIFByb2R1Y3RzIGxpc3QnLFxuICAgICAgICAgICAgdGFnczogWydwcm9kdWN0cyddXG4gICAgICAgIH1cbiAgICB9LFxuICAgIHtcbiAgICAgICAgbWV0aG9kOiAnR0VUJyxcbiAgICAgICAgcGF0aDogX3ByZWZpeCArICcvcHJvZHVjdC97cHJvZHVjdElkfS97dXNlcklkfScsXG4gICAgICAgIGhhbmRsZXI6IGZ1bmN0aW9uKHJlcXVlc3QsIHJlcGx5KSB7XG4gICAgICAgICAgICBQcm9kdWN0c1NlcnZpY2UuZ2V0UHJvZHVjdEJ5SWQoXG4gICAgICAgICAgICAgICAgcmVxdWVzdC5wYXJhbXMucHJvZHVjdElkLFxuICAgICAgICAgICAgICAgIHJlcXVlc3QucGFyYW1zLnVzZXJJZClcbiAgICAgICAgICAgICAgICAudGhlbigoZGF0YSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICByZXBseShkYXRhKTtcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICB9LFxuICAgICAgICBjb25maWc6IHtcbiAgICAgICAgICAgIHZhbGlkYXRlOiB7XG4gICAgICAgICAgICAgICAgcXVlcnk6IHtcbiAgICAgICAgICAgICAgICAgICAgcHJvZHVjdElkOiBKb2kubnVtYmVyKCkuaW50ZWdlcigpLFxuICAgICAgICAgICAgICAgICAgICB1c2VySWQ6IEpvaS5zdHJpbmcoKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogJ1JldHJpZXZlIFByb2R1Y3Qgd2l0aCBtYXRjaGVkIFByb2R1Y3RJRCcsXG4gICAgICAgICAgICB0YWdzOiBbJ3Byb2R1Y3RzJ10sXG4gICAgICAgICAgICBub3RlczogW1xuICAgICAgICAgICAgICAgIFwiSWYgdXNlciBpcyBsb2d1ZWQgaW4gLT4gc2VuZCBVc2VySUQgYXMgcGFyYW1cIixcbiAgICAgICAgICAgICAgICBcIklmIHVzZXIgaXMgTk9UIGxvZ3VlZCBpbiAtPiBzZW5kIFVzZXJJRCA9ICdudWxsJ1wiXG4gICAgICAgICAgICBdXG4gICAgICAgIH1cbiAgICB9LFxuICAgIHtcbiAgICAgICAgbWV0aG9kOiAnR0VUJyxcbiAgICAgICAgcGF0aDogX3ByZWZpeCArICcvYnlhdXRob3Ive2F1dGhvcklkfS97cGFnZX0nLFxuICAgICAgICBoYW5kbGVyOiBmdW5jdGlvbihyZXF1ZXN0LCByZXBseSkge1xuICAgICAgICAgICAgUHJvZHVjdHNTZXJ2aWNlLmdldFByb2R1Y3RzQnlBdXRob3IoXG4gICAgICAgICAgICAgICAgcmVxdWVzdC5wYXJhbXMuYXV0aG9ySWQpXG4gICAgICAgICAgICAudGhlbigoZGF0YTogQXJyYXk8YW55PikgPT4ge1xuICAgICAgICAgICAgICAgIHJlcGx5KGRhdGEpO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgfSxcbiAgICAgICAgY29uZmlnOiB7XG4gICAgICAgICAgICB2YWxpZGF0ZToge1xuICAgICAgICAgICAgICAgIHF1ZXJ5OiB7XG4gICAgICAgICAgICAgICAgICAgIGF1dGhvcklkOiBKb2kubnVtYmVyKCkuaW50ZWdlcigpLFxuICAgICAgICAgICAgICAgICAgICBwYWdlOiBKb2kubnVtYmVyKCkuaW50ZWdlcigpXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiAnUmV0cmlldmUgUHJvZHVjdHMgZnJvbSBtYXRjaGVkIEF1dGhvcklEJyxcbiAgICAgICAgICAgIHRhZ3M6IFsncHJvZHVjdHMnXVxuICAgICAgICB9XG4gICAgfSxcbiAgICB7XG4gICAgICAgIG1ldGhvZDogJ0dFVCcsXG4gICAgICAgIHBhdGg6IF9wcmVmaXggKyAnL2J5c2Nob29sL3tzY2hvb2xJZH0ve3BhZ2V9JyxcbiAgICAgICAgaGFuZGxlcjogZnVuY3Rpb24ocmVxdWVzdCwgcmVwbHkpIHtcbiAgICAgICAgICAgIFByb2R1Y3RzU2VydmljZS5nZXRQcm9kdWN0c0J5U2Nob29sKFxuICAgICAgICAgICAgICAgIHJlcXVlc3QucGFyYW1zLnNjaG9vbElkLFxuICAgICAgICAgICAgICAgIHJlcXVlc3QucGFyYW1zLnBhZ2UgfHwgMSlcbiAgICAgICAgICAgICAgICAudGhlbigoZGF0YTogQXJyYXk8YW55PikgPT4ge1xuICAgICAgICAgICAgICAgICAgICByZXBseShkYXRhKTtcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICB9LFxuICAgICAgICBjb25maWc6IHtcbiAgICAgICAgICAgIHZhbGlkYXRlOiB7XG4gICAgICAgICAgICAgICAgcXVlcnk6IHtcbiAgICAgICAgICAgICAgICAgICAgc2Nob29sSWQ6IEpvaS5udW1iZXIoKS5pbnRlZ2VyKCksXG4gICAgICAgICAgICAgICAgICAgIHBhZ2U6IEpvaS5udW1iZXIoKS5pbnRlZ2VyKClcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZGVzY3JpcHRpb246ICdSZXRyaWV2ZSBQcm9kdWN0cyBmcm9tIG1hdGNoZWQgU2Nob29sSUQnLFxuICAgICAgICAgICAgdGFnczogWydwcm9kdWN0cyddXG4gICAgICAgIH1cbiAgICB9LFxuICAgIHtcbiAgICAgICAgbWV0aG9kOiAnR0VUJyxcbiAgICAgICAgcGF0aDogX3ByZWZpeCArICcvYnlzdWJjYXRlZ29yeTAve3N1YmNhdGVnb3J5MElkfS97cGFnZX0nLFxuICAgICAgICBoYW5kbGVyOiBmdW5jdGlvbihyZXF1ZXN0LCByZXBseSkge1xuICAgICAgICAgICAgUHJvZHVjdHNTZXJ2aWNlLmdldFByb2R1Y3RzQnlTdWJjYXRlZ29yeTAoXG4gICAgICAgICAgICAgICAgcmVxdWVzdC5wYXJhbXMuc3ViY2F0ZWdvcnkwSWQsXG4gICAgICAgICAgICAgICAgcmVxdWVzdC5wYXJhbXMucGFnZSB8fCAxKVxuICAgICAgICAgICAgICAgIC50aGVuKChkYXRhOiBBcnJheTxhbnk+KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHJlcGx5KGRhdGEpO1xuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgIH0sXG4gICAgICAgIGNvbmZpZzoge1xuICAgICAgICAgICAgdmFsaWRhdGU6IHtcbiAgICAgICAgICAgICAgICBxdWVyeToge1xuICAgICAgICAgICAgICAgICAgICBzdWJjYXRlZ29yeTBJZDogSm9pLm51bWJlcigpLmludGVnZXIoKSxcbiAgICAgICAgICAgICAgICAgICAgcGFnZTogSm9pLm51bWJlcigpLmludGVnZXIoKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogJ1JldHJpZXZlIFByb2R1Y3RzIGZyb20gbWF0Y2hlZCBTdWJjYXRlZ29yeTBJRCcsXG4gICAgICAgICAgICB0YWdzOiBbJ3Byb2R1Y3RzJ11cbiAgICAgICAgfVxuICAgIH0sXG4gICAge1xuICAgICAgICBtZXRob2Q6ICdHRVQnLFxuICAgICAgICBwYXRoOiBfcHJlZml4ICsgJy9ieXN1YmNhdGVnb3J5MS97c3ViY2F0ZWdvcnkxSWR9L3twYWdlfScsXG4gICAgICAgIGhhbmRsZXI6IGZ1bmN0aW9uKHJlcXVlc3QsIHJlcGx5KSB7XG4gICAgICAgICAgICBQcm9kdWN0c1NlcnZpY2UuZ2V0UHJvZHVjdHNCeVN1YmNhdGVnb3J5MShcbiAgICAgICAgICAgICAgICByZXF1ZXN0LnBhcmFtcy5zdWJjYXRlZ29yeTFJZCxcbiAgICAgICAgICAgICAgICByZXF1ZXN0LnBhcmFtcy5wYWdlIHx8IDEpXG4gICAgICAgICAgICAgICAgLnRoZW4oKGRhdGE6IEFycmF5PGFueT4pID0+IHtcbiAgICAgICAgICAgICAgICAgICAgcmVwbHkoZGF0YSk7XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgfSxcbiAgICAgICAgY29uZmlnOiB7XG4gICAgICAgICAgICB2YWxpZGF0ZToge1xuICAgICAgICAgICAgICAgIHF1ZXJ5OiB7XG4gICAgICAgICAgICAgICAgICAgIHN1YmNhdGVnb3J5MUlkOiBKb2kubnVtYmVyKCkuaW50ZWdlcigpLFxuICAgICAgICAgICAgICAgICAgICBwYWdlOiBKb2kubnVtYmVyKCkuaW50ZWdlcigpXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiAnUmV0cmlldmUgUHJvZHVjdHMgZnJvbSBtYXRjaGVkIFN1YmNhdGVnb3J5MUlEJyxcbiAgICAgICAgICAgIHRhZ3M6IFsncHJvZHVjdHMnXVxuICAgICAgICB9XG4gICAgfSxcbiAgICB7XG4gICAgICAgIG1ldGhvZDogJ0dFVCcsXG4gICAgICAgIHBhdGg6IF9wcmVmaXggKyAnL2J5c3R5bGUve3N0eWxlSWR9L3twYWdlfScsXG4gICAgICAgIGhhbmRsZXI6IGZ1bmN0aW9uKHJlcXVlc3QsIHJlcGx5KSB7XG4gICAgICAgICAgICBQcm9kdWN0c1NlcnZpY2UuZ2V0UHJvZHVjdHNCeVN0eWxlKFxuICAgICAgICAgICAgICAgIHJlcXVlc3QucGFyYW1zLnN0eWxlSWQsXG4gICAgICAgICAgICAgICAgcmVxdWVzdC5wYXJhbXMucGFnZSB8fCAxKVxuICAgICAgICAgICAgICAgIC50aGVuKChkYXRhOiBBcnJheTxhbnk+KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHJlcGx5KGRhdGEpO1xuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgIH0sXG4gICAgICAgIGNvbmZpZzoge1xuICAgICAgICAgICAgdmFsaWRhdGU6IHtcbiAgICAgICAgICAgICAgICBxdWVyeToge1xuICAgICAgICAgICAgICAgICAgICBzdHlsZUlkOiBKb2kubnVtYmVyKCkuaW50ZWdlcigpLFxuICAgICAgICAgICAgICAgICAgICBwYWdlOiBKb2kubnVtYmVyKCkuaW50ZWdlcigpXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiAnUmV0cmlldmUgUHJvZHVjdHMgZnJvbSBtYXRjaGVkIFN0eWxlSUQnLFxuICAgICAgICAgICAgdGFnczogWydwcm9kdWN0cyddXG4gICAgICAgIH1cbiAgICB9LFxuICAgIHtcbiAgICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICAgIHBhdGg6IF9wcmVmaXggKyAnL2NyZWF0ZScsXG4gICAgICAgIGhhbmRsZXI6IGZ1bmN0aW9uKHJlcXVlc3QsIHJlcGx5KSB7XG4gICAgICAgICAgICBQcm9kdWN0c1NlcnZpY2UuY3JlYXRlUHJvZHVjdChcbiAgICAgICAgICAgICAgICByZXF1ZXN0LnBheWxvYWQubm9uY2UsXG4gICAgICAgICAgICAgICAgcmVxdWVzdC5wYXlsb2FkLmF1dGhvcixcbiAgICAgICAgICAgICAgICByZXF1ZXN0LnBheWxvYWQudGl0bGUsXG4gICAgICAgICAgICAgICAgcmVxdWVzdC5wYXlsb2FkLmNvbnRlbnQsXG4gICAgICAgICAgICAgICAgcmVxdWVzdC5wYXlsb2FkLnN0YXR1cyxcbiAgICAgICAgICAgICAgICByZXF1ZXN0LnBheWxvYWQuc2Nob29sLFxuICAgICAgICAgICAgICAgIHJlcXVlc3QucGF5bG9hZC5zdWJjYXRlZ29yeTAsXG4gICAgICAgICAgICAgICAgcmVxdWVzdC5wYXlsb2FkLnN1YmNhdGVnb3J5MSxcbiAgICAgICAgICAgICAgICByZXF1ZXN0LnBheWxvYWQuc3R5bGVzKVxuICAgICAgICAgICAgICAgIC50aGVuKChkYXRhKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHJlcGx5KGRhdGEpO1xuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgIH0sXG4gICAgICAgIGNvbmZpZzoge1xuICAgICAgICAgICAgdmFsaWRhdGU6IHtcbiAgICAgICAgICAgICAgICBxdWVyeToge1xuICAgICAgICAgICAgICAgICAgICBub25jZTogSm9pLnN0cmluZygpLFxuICAgICAgICAgICAgICAgICAgICBhdXRob3I6IEpvaS5zdHJpbmcoKSxcbiAgICAgICAgICAgICAgICAgICAgdGl0bGU6IEpvaS5zdHJpbmcoKSxcbiAgICAgICAgICAgICAgICAgICAgY29udGVudDogSm9pLnN0cmluZygpLFxuICAgICAgICAgICAgICAgICAgICBzdGF0dXM6IEpvaS5zdHJpbmcoKSxcbiAgICAgICAgICAgICAgICAgICAgY2F0ZWdvcmlhczogSm9pLmFycmF5KCksXG4gICAgICAgICAgICAgICAgICAgIHRhZ3M6IEpvaS5hcnJheSgpXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiAnQ3JlYXRlIGEgbmV3IFByb2R1Y3QnLFxuICAgICAgICAgICAgdGFnczogWydwcm9kdWN0cyddXG4gICAgICAgIH1cbiAgICB9LFxuICAgIHtcbiAgICAgICAgbWV0aG9kOiAnUFVUJyxcbiAgICAgICAgcGF0aDogX3ByZWZpeCArICcvdXBkYXRlJyxcbiAgICAgICAgaGFuZGxlcjogZnVuY3Rpb24ocmVxdWVzdCwgcmVwbHkpIHtcbiAgICAgICAgICAgIFByb2R1Y3RzU2VydmljZS51cGRhdGVQcm9kdWN0KFxuICAgICAgICAgICAgICAgIHJlcXVlc3QucGF5bG9hZC5ub25jZSxcbiAgICAgICAgICAgICAgICByZXF1ZXN0LnBheWxvYWQucHJvZHVjdElkLFxuICAgICAgICAgICAgICAgIHJlcXVlc3QucGF5bG9hZC5hdXRob3IsXG4gICAgICAgICAgICAgICAgcmVxdWVzdC5wYXlsb2FkLnRpdGxlLFxuICAgICAgICAgICAgICAgIHJlcXVlc3QucGF5bG9hZC5jb250ZW50LFxuICAgICAgICAgICAgICAgIHJlcXVlc3QucGF5bG9hZC5zdGF0dXMsXG4gICAgICAgICAgICAgICAgcmVxdWVzdC5wYXlsb2FkLmNhdGVnb3JpZXMsXG4gICAgICAgICAgICAgICAgcmVxdWVzdC5wYXlsb2FkLnRhZ3MpXG4gICAgICAgICAgICAgICAgLnRoZW4oKGRhdGEpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgcmVwbHkoZGF0YSk7XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgfSxcbiAgICAgICAgY29uZmlnOiB7XG4gICAgICAgICAgICB2YWxpZGF0ZToge1xuICAgICAgICAgICAgICAgIHF1ZXJ5OiB7XG4gICAgICAgICAgICAgICAgICAgIG5vbmNlOiBKb2kuc3RyaW5nKCksXG4gICAgICAgICAgICAgICAgICAgIHByb2R1Y3RJZDogSm9pLm51bWJlcigpLmludGVnZXIoKSxcbiAgICAgICAgICAgICAgICAgICAgYXV0aG9yOiBKb2kuc3RyaW5nKCksXG4gICAgICAgICAgICAgICAgICAgIHRpdGxlOiBKb2kuc3RyaW5nKCksXG4gICAgICAgICAgICAgICAgICAgIGNvbnRlbnQ6IEpvaS5zdHJpbmcoKSxcbiAgICAgICAgICAgICAgICAgICAgc3RhdHVzOiBKb2kuc3RyaW5nKCksXG4gICAgICAgICAgICAgICAgICAgIGNhdGVnb3JpYXM6IEpvaS5hcnJheSgpLFxuICAgICAgICAgICAgICAgICAgICB0YWdzOiBKb2kuYXJyYXkoKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogJ1VwZGF0ZSBhIFByb2R1Y3QnLFxuICAgICAgICAgICAgdGFnczogWydwcm9kdWN0cyddXG4gICAgICAgIH1cbiAgICB9LFxuICAgIHtcbiAgICAgICAgbWV0aG9kOiAnREVMRVRFJyxcbiAgICAgICAgcGF0aDogX3ByZWZpeCArICcvZGVsZXRlJyxcbiAgICAgICAgaGFuZGxlcjogZnVuY3Rpb24ocmVxdWVzdCwgcmVwbHkpIHtcbiAgICAgICAgICAgIFByb2R1Y3RzU2VydmljZS5kZWxldGVQcm9kdWN0KFxuICAgICAgICAgICAgICAgIHJlcXVlc3QucGF5bG9hZC5ub25jZSxcbiAgICAgICAgICAgICAgICByZXF1ZXN0LnBheWxvYWQucHJvZHVjdElkKVxuICAgICAgICAgICAgICAgIC50aGVuKChkYXRhKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHJlcGx5KGRhdGEpO1xuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgIH0sXG4gICAgICAgIGNvbmZpZzoge1xuICAgICAgICAgICAgdmFsaWRhdGU6IHtcbiAgICAgICAgICAgICAgICBxdWVyeToge1xuICAgICAgICAgICAgICAgICAgICBub25jZTogSm9pLnN0cmluZygpLFxuICAgICAgICAgICAgICAgICAgICBwcm9kdWN0SWQ6IEpvaS5udW1iZXIoKS5pbnRlZ2VyKClcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZGVzY3JpcHRpb246ICdEZWxldGUgYSBQcm9kdWN0JyxcbiAgICAgICAgICAgIHRhZ3M6IFsncHJvZHVjdHMnXVxuICAgICAgICB9XG4gICAgfSxcbiAgICB7XG4gICAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgICBwYXRoOiBfcHJlZml4ICsgJy9jb21tZW50cy9jcmVhdGUnLFxuICAgICAgICBoYW5kbGVyOiBmdW5jdGlvbihyZXF1ZXN0LCByZXBseSkge1xuICAgICAgICAgICAgUHJvZHVjdHNTZXJ2aWNlLmNyZWF0ZUNvbW1lbnQoXG4gICAgICAgICAgICAgICAgcmVxdWVzdC5wYXlsb2FkLnByb2R1Y3RJZCxcbiAgICAgICAgICAgICAgICByZXF1ZXN0LnBheWxvYWQuY29va2llLFxuICAgICAgICAgICAgICAgIHJlcXVlc3QucGF5bG9hZC5jb250ZW50KVxuICAgICAgICAgICAgICAgIC50aGVuKChkYXRhKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHJlcGx5KGRhdGEpO1xuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgIH0sXG4gICAgICAgIGNvbmZpZzoge1xuICAgICAgICAgICAgdmFsaWRhdGU6IHtcbiAgICAgICAgICAgICAgICBxdWVyeToge1xuICAgICAgICAgICAgICAgICAgICBwcm9kdWN0SWQ6IEpvaS5udW1iZXIoKS5pbnRlZ2VyKCksXG4gICAgICAgICAgICAgICAgICAgIGNvb2tpZTogSm9pLnN0cmluZygpLFxuICAgICAgICAgICAgICAgICAgICBjb250ZW50OiBKb2kuc3RyaW5nKClcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZGVzY3JpcHRpb246ICdDcmVhdGUgYSBuZXcgQ29tbWVudCcsXG4gICAgICAgICAgICB0YWdzOiBbJ3Byb2R1Y3RzJ11cbiAgICAgICAgfVxuICAgIH0sXG4gICAge1xuICAgICAgICBtZXRob2Q6ICdHRVQnLFxuICAgICAgICBwYXRoOiBfcHJlZml4ICsgJy9zZWFyY2gve3NlYXJjaH0ve3BhZ2V9JyxcbiAgICAgICAgaGFuZGxlcjogZnVuY3Rpb24ocmVxdWVzdCwgcmVwbHkpIHtcbiAgICAgICAgICAgIFByb2R1Y3RzU2VydmljZS5nZXRQcm9kdWN0c0J5U2VhcmNoKFxuICAgICAgICAgICAgICAgIHJlcXVlc3QucGFyYW1zLnNlYXJjaCxcbiAgICAgICAgICAgICAgICByZXF1ZXN0LnBhcmFtcy5wYWdlIHx8IDEpXG4gICAgICAgICAgICAgICAgLnRoZW4oKGRhdGE6IEFycmF5PGFueT4pID0+IHtcbiAgICAgICAgICAgICAgICAgICAgcmVwbHkoZGF0YSk7XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgfSxcbiAgICAgICAgY29uZmlnOiB7XG4gICAgICAgICAgICB2YWxpZGF0ZToge1xuICAgICAgICAgICAgICAgIHF1ZXJ5OiB7XG4gICAgICAgICAgICAgICAgICAgIHNlYXJjaDogSm9pLm51bWJlcigpLmludGVnZXIoKSxcbiAgICAgICAgICAgICAgICAgICAgcGFnZTogSm9pLm51bWJlcigpLmludGVnZXIoKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogJ1JldHJpZXZlIFByb2R1Y3RzIGZyb20gbWF0Y2hlZCBTZWFyY2ggc3RyaW5nJyxcbiAgICAgICAgICAgIHRhZ3M6IFsncHJvZHVjdHMnXVxuICAgICAgICB9XG4gICAgfSxcbiAgICB7XG4gICAgICAgIG1ldGhvZDogJ0dFVCcsXG4gICAgICAgIHBhdGg6IF9wcmVmaXggKyAnL3JhbmtpbmcvbGlrZXMnLFxuICAgICAgICBoYW5kbGVyOiBmdW5jdGlvbihyZXF1ZXN0LCByZXBseSkge1xuICAgICAgICAgICAgUHJvZHVjdHNTZXJ2aWNlLmdldFByb2R1Y3RzUmFua2luZ0J5TGlrZXMoKVxuICAgICAgICAgICAgICAgIC50aGVuKChkYXRhOiBBcnJheTxhbnk+KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHJlcGx5KHsgcHJvZHVjdHM6IGRhdGEgfSk7XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgfSxcbiAgICAgICAgY29uZmlnOiB7XG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogJ1JldHJpZXZlIFByb2R1Y3RzIFJhbmtpbmcgYnkgTGlrZXMnLFxuICAgICAgICAgICAgdGFnczogWydwcm9kdWN0cyddXG4gICAgICAgIH1cbiAgICB9LFxuICAgIHtcbiAgICAgICAgbWV0aG9kOiAnR0VUJyxcbiAgICAgICAgcGF0aDogX3ByZWZpeCArICcvcmFua2luZy92aXNpdHMvdW5pcXVlJyxcbiAgICAgICAgaGFuZGxlcjogZnVuY3Rpb24ocmVxdWVzdCwgcmVwbHkpIHtcbiAgICAgICAgICAgIFByb2R1Y3RzU2VydmljZS5nZXRQcm9kdWN0c1JhbmtpbmdCeVVuaXF1ZVZpc2l0cygpXG4gICAgICAgICAgICAgICAgLnRoZW4oKGRhdGE6IEFycmF5PGFueT4pID0+IHtcbiAgICAgICAgICAgICAgICAgICAgcmVwbHkoeyBwcm9kdWN0czogZGF0YSB9KTtcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICB9LFxuICAgICAgICBjb25maWc6IHtcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiAnUmV0cmlldmUgUHJvZHVjdHMgUmFua2luZyBieSBVbmlxdWUgVmlzaXRzJyxcbiAgICAgICAgICAgIHRhZ3M6IFsncHJvZHVjdHMnXVxuICAgICAgICB9XG4gICAgfSxcbiAgICB7XG4gICAgICAgIG1ldGhvZDogJ0dFVCcsXG4gICAgICAgIHBhdGg6IF9wcmVmaXggKyAnL3JhbmtpbmcvdmlzaXRzL3RvdGFsJyxcbiAgICAgICAgaGFuZGxlcjogZnVuY3Rpb24ocmVxdWVzdCwgcmVwbHkpIHtcbiAgICAgICAgICAgIFByb2R1Y3RzU2VydmljZS5nZXRQcm9kdWN0c1JhbmtpbmdCeVRvdGFsVmlzaXRzKClcbiAgICAgICAgICAgICAgICAudGhlbigoZGF0YTogQXJyYXk8YW55PikgPT4ge1xuICAgICAgICAgICAgICAgICAgICByZXBseSh7IHByb2R1Y3RzOiBkYXRhIH0pO1xuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgIH0sXG4gICAgICAgIGNvbmZpZzoge1xuICAgICAgICAgICAgZGVzY3JpcHRpb246ICdSZXRyaWV2ZSBQcm9kdWN0cyBSYW5raW5nIGJ5IFRvdGFsIFZpc2l0cycsXG4gICAgICAgICAgICB0YWdzOiBbJ3Byb2R1Y3RzJ11cbiAgICAgICAgfVxuICAgIH1cbl1cblxuXG5tb2R1bGUuZXhwb3J0cyA9IHByb2R1Y3RzO1xuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9