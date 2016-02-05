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
        method: 'GET',
        path: _prefix + '/bysex/{sexId}/{page}',
        handler: function (request, reply) {
            ProductsService.getProductsBySex(request.params.sexId, request.params.page || 1).then(function (data) {
                reply(data);
            });
        },
        config: {
            validate: {
                query: {
                    sexId: Joi.number().integer(),
                    page: Joi.number().integer()
                }
            },
            description: 'Retrieve Products from matched SexID',
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
                reply({ posts: data });
            });
        },
        config: {
            description: 'Retrieve Products Ranking by Likes',
            tags: ['products']
        }
    },
    {
        method: 'GET',
        path: _prefix + '/ranking/visits',
        handler: function (request, reply) {
            ProductsService.getProductsRankingByVisits().then(function (data) {
                reply({ products: data });
            });
        },
        config: {
            description: 'Retrieve Products Ranking by Visits',
            tags: ['products']
        }
    }
];
module.exports = products;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1vZHVsZXMvcHJvZHVjdHMvcHJvZHVjdHMucm91dGVzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLFlBQVksQ0FBQztBQUViLEFBSUEsa0RBSmtEO0FBQ2xELDhDQUE4QztBQUc5QyxJQUFPLE9BQU8sV0FBVyxvQkFBb0IsQ0FBQyxDQUFDO0FBQy9DLElBQU8sR0FBRyxXQUFXLEtBQUssQ0FBQyxDQUFDO0FBRTVCLElBQUksZUFBZSxHQUFHLElBQUksT0FBTyxDQUFDLGVBQWUsRUFBRSxDQUFDO0FBQ3BELElBQUksT0FBTyxHQUFHLFdBQVcsQ0FBQztBQUMxQixJQUFJLFFBQVEsR0FBRztJQUNYO1FBQ0ksTUFBTSxFQUFFLEtBQUs7UUFDYixJQUFJLEVBQUUsT0FBTyxHQUFHLGFBQWE7UUFDN0IsT0FBTyxFQUFFLFVBQVMsT0FBTyxFQUFFLEtBQUs7WUFDNUIsZUFBZSxDQUFDLGNBQWMsQ0FDMUIsT0FBTyxDQUFDLE1BQU0sQ0FBQyxJQUFJLElBQUksQ0FBQyxDQUFDLENBQzVCLElBQUksQ0FBQyxVQUFDLElBQWdCO2dCQUNuQixLQUFLLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDaEIsQ0FBQyxDQUFDLENBQUE7UUFDTixDQUFDO1FBQ0QsTUFBTSxFQUFFO1lBQ0osUUFBUSxFQUFFO2dCQUNOLEtBQUssRUFBRTtvQkFDSCxJQUFJLEVBQUUsR0FBRyxDQUFDLE1BQU0sRUFBRSxDQUFDLE9BQU8sRUFBRTtpQkFDL0I7YUFDSjtZQUNELFdBQVcsRUFBRSx3QkFBd0I7WUFDckMsSUFBSSxFQUFFLENBQUMsVUFBVSxDQUFDO1NBQ3JCO0tBQ0o7SUFDRDtRQUNJLE1BQU0sRUFBRSxLQUFLO1FBQ2IsSUFBSSxFQUFFLE9BQU8sR0FBRyxjQUFjO1FBQzlCLE9BQU8sRUFBRSxVQUFTLE9BQU8sRUFBRSxLQUFLO1lBQzVCLGVBQWUsQ0FBQyxlQUFlLENBQzNCLE9BQU8sQ0FBQyxNQUFNLENBQUMsSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUM1QixJQUFJLENB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LFdBQVcsRUFBRSxvQ0FBb0M7WUFDakQsSUFBSSxFQUFFLENBQUMsVUFBVSxDQUFDO1NBQ3JCO0tBQ0o7SUFDRDtRQUNJLE1BQU0sRUFBRSxLQUFLO1FBQ2IsSUFBSSxFQUFFLE9BQU8sR0FBRyxpQkFBaUI7UUFDakMsT0FBTyxFQUFFLFVBQVMsT0FBTyxFQUFFLEtBQUs7WUFDNUIsZUFBZSxDQUFDLDBCQUEwQixFQUFFLENBQ3ZDLElBQUksQ0FBQyxVQUFDLElBQWdCO2dCQUNuQixLQUFLLENBQUMsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQztZQUM5QixDQUFDLENBQUMsQ0FBQTtRQUNWLENBQUM7UUFDRCxNQUFNLEVBQUU7WUFDSixXQUFXLEVBQUUscUNBQXFDO1lBQ2xELElBQUksRUFBRSxDQUFDLFVBQVUsQ0FBQztTQUNyQjtLQUNKO0NBQ0osQ0FBQTtBQUdELE1BQU0sQ0FBQyxPQUFPLEdBQUcsUUFBUSxDQUFDIiwiZmlsZSI6Im1vZHVsZXMvcHJvZHVjdHMvcHJvZHVjdHMucm91dGVzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnO1xuXG4vLy8gPHJlZmVyZW5jZSBwYXRoPVwiLi4vLi4vLi4vdHlwaW5ncy90c2QuZC50c1wiIC8+XG4vLy8gPHJlZmVyZW5jZSBwYXRoPVwiLi9wcm9kdWN0cy5zZXJ2aWNlLnRzXCIgLz5cblxuXG5pbXBvcnQgc2VydmljZSA9IHJlcXVpcmUoJy4vcHJvZHVjdHMuc2VydmljZScpO1xuaW1wb3J0IEpvaSA9IHJlcXVpcmUoJ2pvaScpO1xuXG52YXIgUHJvZHVjdHNTZXJ2aWNlID0gbmV3IHNlcnZpY2UuUHJvZHVjdHNTZXJ2aWNlKCk7XG52YXIgX3ByZWZpeCA9ICcvcHJvZHVjdHMnO1xudmFyIHByb2R1Y3RzID0gW1xuICAgIHtcbiAgICAgICAgbWV0aG9kOiAnR0VUJyxcbiAgICAgICAgcGF0aDogX3ByZWZpeCArICcvbmV3L3twYWdlfScsXG4gICAgICAgIGhhbmRsZXI6IGZ1bmN0aW9uKHJlcXVlc3QsIHJlcGx5KSB7XG4gICAgICAgICAgICBQcm9kdWN0c1NlcnZpY2UuZ2V0UHJvZHVjdHNOZXcoXG4gICAgICAgICAgICAgICAgcmVxdWVzdC5wYXJhbXMucGFnZSB8fCAxKVxuICAgICAgICAgICAgLnRoZW4oKGRhdGE6IEFycmF5PGFueT4pID0+IHtcbiAgICAgICAgICAgICAgICByZXBseShkYXRhKTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgIH0sXG4gICAgICAgIGNvbmZpZzoge1xuICAgICAgICAgICAgdmFsaWRhdGU6IHtcbiAgICAgICAgICAgICAgICBxdWVyeToge1xuICAgICAgICAgICAgICAgICAgICBwYWdlOiBKb2kubnVtYmVyKCkuaW50ZWdlcigpXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiAnUmV0cmlldmVzIG5ldyBQcm9kdWN0cycsXG4gICAgICAgICAgICB0YWdzOiBbJ3Byb2R1Y3RzJ11cbiAgICAgICAgfVxuICAgIH0sXG4gICAge1xuICAgICAgICBtZXRob2Q6ICdHRVQnLFxuICAgICAgICBwYXRoOiBfcHJlZml4ICsgJy9saXN0L3twYWdlfScsXG4gICAgICAgIGhhbmRsZXI6IGZ1bmN0aW9uKHJlcXVlc3QsIHJlcGx5KSB7XG4gICAgICAgICAgICBQcm9kdWN0c1NlcnZpY2UuZ2V0UHJvZHVjdHNMaXN0KFxuICAgICAgICAgICAgICAgIHJlcXVlc3QucGFyYW1zLnBhZ2UgfHwgMSlcbiAgICAgICAgICAgIC50aGVuKChkYXRhOiBBcnJheTxhbnk+KSA9PiB7XG4gICAgICAgICAgICAgICAgcmVwbHkoZGF0YSk7XG4gICAgICAgICAgICB9KVxuICAgICAgICB9LFxuICAgICAgICBjb25maWc6IHtcbiAgICAgICAgICAgIHZhbGlkYXRlOiB7XG4gICAgICAgICAgICAgICAgcXVlcnk6IHtcbiAgICAgICAgICAgICAgICAgICAgcGFnZTogSm9pLm51bWJlcigpLmludGVnZXIoKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogJ1JldHJpZXZlcyBQcm9kdWN0cyBsaXN0JyxcbiAgICAgICAgICAgIHRhZ3M6IFsncHJvZHVjdHMnXVxuICAgICAgICB9XG4gICAgfSxcbiAgICB7XG4gICAgICAgIG1ldGhvZDogJ0dFVCcsXG4gICAgICAgIHBhdGg6IF9wcmVmaXggKyAnL3Byb2R1Y3Qve3Byb2R1Y3RJZH0nLFxuICAgICAgICBoYW5kbGVyOiBmdW5jdGlvbihyZXF1ZXN0LCByZXBseSkge1xuICAgICAgICAgICAgUHJvZHVjdHNTZXJ2aWNlLmdldFByb2R1Y3RCeUlkKFxuICAgICAgICAgICAgICAgIHJlcXVlc3QucGFyYW1zLnByb2R1Y3RJZClcbiAgICAgICAgICAgICAgICAudGhlbigoZGF0YSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICByZXBseShkYXRhKTtcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICB9LFxuICAgICAgICBjb25maWc6IHtcbiAgICAgICAgICAgIHZhbGlkYXRlOiB7XG4gICAgICAgICAgICAgICAgcXVlcnk6IHtcbiAgICAgICAgICAgICAgICAgICAgcHJvZHVjdElkOiBKb2kubnVtYmVyKCkuaW50ZWdlcigpXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiAnUmV0cmlldmUgUHJvZHVjdCB3aXRoIG1hdGNoZWQgUHJvZHVjdElEJyxcbiAgICAgICAgICAgIHRhZ3M6IFsncHJvZHVjdHMnXVxuICAgICAgICB9XG4gICAgfSxcbiAgICB7XG4gICAgICAgIG1ldGhvZDogJ0dFVCcsXG4gICAgICAgIHBhdGg6IF9wcmVmaXggKyAnL2J5YXV0aG9yL3thdXRob3JJZH0ve3BhZ2V9JyxcbiAgICAgICAgaGFuZGxlcjogZnVuY3Rpb24ocmVxdWVzdCwgcmVwbHkpIHtcbiAgICAgICAgICAgIFByb2R1Y3RzU2VydmljZS5nZXRQcm9kdWN0c0J5QXV0aG9yKFxuICAgICAgICAgICAgICAgIHJlcXVlc3QucGFyYW1zLmF1dGhvcklkKVxuICAgICAgICAgICAgLnRoZW4oKGRhdGE6IEFycmF5PGFueT4pID0+IHtcbiAgICAgICAgICAgICAgICByZXBseShkYXRhKTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgIH0sXG4gICAgICAgIGNvbmZpZzoge1xuICAgICAgICAgICAgdmFsaWRhdGU6IHtcbiAgICAgICAgICAgICAgICBxdWVyeToge1xuICAgICAgICAgICAgICAgICAgICBhdXRob3JJZDogSm9pLm51bWJlcigpLmludGVnZXIoKSxcbiAgICAgICAgICAgICAgICAgICAgcGFnZTogSm9pLm51bWJlcigpLmludGVnZXIoKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogJ1JldHJpZXZlIFByb2R1Y3RzIGZyb20gbWF0Y2hlZCBBdXRob3JJRCcsXG4gICAgICAgICAgICB0YWdzOiBbJ3Byb2R1Y3RzJ11cbiAgICAgICAgfVxuICAgIH0sXG4gICAge1xuICAgICAgICBtZXRob2Q6ICdHRVQnLFxuICAgICAgICBwYXRoOiBfcHJlZml4ICsgJy9ieXNjaG9vbC97c2Nob29sSWR9L3twYWdlfScsXG4gICAgICAgIGhhbmRsZXI6IGZ1bmN0aW9uKHJlcXVlc3QsIHJlcGx5KSB7XG4gICAgICAgICAgICBQcm9kdWN0c1NlcnZpY2UuZ2V0UHJvZHVjdHNCeVNjaG9vbChcbiAgICAgICAgICAgICAgICByZXF1ZXN0LnBhcmFtcy5zY2hvb2xJZCxcbiAgICAgICAgICAgICAgICByZXF1ZXN0LnBhcmFtcy5wYWdlIHx8IDEpXG4gICAgICAgICAgICAgICAgLnRoZW4oKGRhdGE6IEFycmF5PGFueT4pID0+IHtcbiAgICAgICAgICAgICAgICAgICAgcmVwbHkoZGF0YSk7XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgfSxcbiAgICAgICAgY29uZmlnOiB7XG4gICAgICAgICAgICB2YWxpZGF0ZToge1xuICAgICAgICAgICAgICAgIHF1ZXJ5OiB7XG4gICAgICAgICAgICAgICAgICAgIHNjaG9vbElkOiBKb2kubnVtYmVyKCkuaW50ZWdlcigpLFxuICAgICAgICAgICAgICAgICAgICBwYWdlOiBKb2kubnVtYmVyKCkuaW50ZWdlcigpXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiAnUmV0cmlldmUgUHJvZHVjdHMgZnJvbSBtYXRjaGVkIFNjaG9vbElEJyxcbiAgICAgICAgICAgIHRhZ3M6IFsncHJvZHVjdHMnXVxuICAgICAgICB9XG4gICAgfSxcbiAgICB7XG4gICAgICAgIG1ldGhvZDogJ0dFVCcsXG4gICAgICAgIHBhdGg6IF9wcmVmaXggKyAnL2J5c3ViY2F0ZWdvcnkwL3tzdWJjYXRlZ29yeTBJZH0ve3BhZ2V9JyxcbiAgICAgICAgaGFuZGxlcjogZnVuY3Rpb24ocmVxdWVzdCwgcmVwbHkpIHtcbiAgICAgICAgICAgIFByb2R1Y3RzU2VydmljZS5nZXRQcm9kdWN0c0J5U3ViY2F0ZWdvcnkwKFxuICAgICAgICAgICAgICAgIHJlcXVlc3QucGFyYW1zLnN1YmNhdGVnb3J5MElkLFxuICAgICAgICAgICAgICAgIHJlcXVlc3QucGFyYW1zLnBhZ2UgfHwgMSlcbiAgICAgICAgICAgICAgICAudGhlbigoZGF0YTogQXJyYXk8YW55PikgPT4ge1xuICAgICAgICAgICAgICAgICAgICByZXBseShkYXRhKTtcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICB9LFxuICAgICAgICBjb25maWc6IHtcbiAgICAgICAgICAgIHZhbGlkYXRlOiB7XG4gICAgICAgICAgICAgICAgcXVlcnk6IHtcbiAgICAgICAgICAgICAgICAgICAgc3ViY2F0ZWdvcnkwSWQ6IEpvaS5udW1iZXIoKS5pbnRlZ2VyKCksXG4gICAgICAgICAgICAgICAgICAgIHBhZ2U6IEpvaS5udW1iZXIoKS5pbnRlZ2VyKClcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZGVzY3JpcHRpb246ICdSZXRyaWV2ZSBQcm9kdWN0cyBmcm9tIG1hdGNoZWQgU3ViY2F0ZWdvcnkwSUQnLFxuICAgICAgICAgICAgdGFnczogWydwcm9kdWN0cyddXG4gICAgICAgIH1cbiAgICB9LFxuICAgIHtcbiAgICAgICAgbWV0aG9kOiAnR0VUJyxcbiAgICAgICAgcGF0aDogX3ByZWZpeCArICcvYnlzdWJjYXRlZ29yeTEve3N1YmNhdGVnb3J5MUlkfS97cGFnZX0nLFxuICAgICAgICBoYW5kbGVyOiBmdW5jdGlvbihyZXF1ZXN0LCByZXBseSkge1xuICAgICAgICAgICAgUHJvZHVjdHNTZXJ2aWNlLmdldFByb2R1Y3RzQnlTdWJjYXRlZ29yeTEoXG4gICAgICAgICAgICAgICAgcmVxdWVzdC5wYXJhbXMuc3ViY2F0ZWdvcnkxSWQsXG4gICAgICAgICAgICAgICAgcmVxdWVzdC5wYXJhbXMucGFnZSB8fCAxKVxuICAgICAgICAgICAgICAgIC50aGVuKChkYXRhOiBBcnJheTxhbnk+KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHJlcGx5KGRhdGEpO1xuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgIH0sXG4gICAgICAgIGNvbmZpZzoge1xuICAgICAgICAgICAgdmFsaWRhdGU6IHtcbiAgICAgICAgICAgICAgICBxdWVyeToge1xuICAgICAgICAgICAgICAgICAgICBzdWJjYXRlZ29yeTFJZDogSm9pLm51bWJlcigpLmludGVnZXIoKSxcbiAgICAgICAgICAgICAgICAgICAgcGFnZTogSm9pLm51bWJlcigpLmludGVnZXIoKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogJ1JldHJpZXZlIFByb2R1Y3RzIGZyb20gbWF0Y2hlZCBTdWJjYXRlZ29yeTFJRCcsXG4gICAgICAgICAgICB0YWdzOiBbJ3Byb2R1Y3RzJ11cbiAgICAgICAgfVxuICAgIH0sXG4gICAge1xuICAgICAgICBtZXRob2Q6ICdHRVQnLFxuICAgICAgICBwYXRoOiBfcHJlZml4ICsgJy9ieXN0eWxlL3tzdHlsZUlkfS97cGFnZX0nLFxuICAgICAgICBoYW5kbGVyOiBmdW5jdGlvbihyZXF1ZXN0LCByZXBseSkge1xuICAgICAgICAgICAgUHJvZHVjdHNTZXJ2aWNlLmdldFByb2R1Y3RzQnlTdHlsZShcbiAgICAgICAgICAgICAgICByZXF1ZXN0LnBhcmFtcy5zdHlsZUlkLFxuICAgICAgICAgICAgICAgIHJlcXVlc3QucGFyYW1zLnBhZ2UgfHwgMSlcbiAgICAgICAgICAgICAgICAudGhlbigoZGF0YTogQXJyYXk8YW55PikgPT4ge1xuICAgICAgICAgICAgICAgICAgICByZXBseShkYXRhKTtcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICB9LFxuICAgICAgICBjb25maWc6IHtcbiAgICAgICAgICAgIHZhbGlkYXRlOiB7XG4gICAgICAgICAgICAgICAgcXVlcnk6IHtcbiAgICAgICAgICAgICAgICAgICAgc3R5bGVJZDogSm9pLm51bWJlcigpLmludGVnZXIoKSxcbiAgICAgICAgICAgICAgICAgICAgcGFnZTogSm9pLm51bWJlcigpLmludGVnZXIoKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogJ1JldHJpZXZlIFByb2R1Y3RzIGZyb20gbWF0Y2hlZCBTdHlsZUlEJyxcbiAgICAgICAgICAgIHRhZ3M6IFsncHJvZHVjdHMnXVxuICAgICAgICB9XG4gICAgfSxcbiAgICB7XG4gICAgICAgIG1ldGhvZDogJ0dFVCcsXG4gICAgICAgIHBhdGg6IF9wcmVmaXggKyAnL2J5c2V4L3tzZXhJZH0ve3BhZ2V9JyxcbiAgICAgICAgaGFuZGxlcjogZnVuY3Rpb24ocmVxdWVzdCwgcmVwbHkpIHtcbiAgICAgICAgICAgIFByb2R1Y3RzU2VydmljZS5nZXRQcm9kdWN0c0J5U2V4KFxuICAgICAgICAgICAgICAgIHJlcXVlc3QucGFyYW1zLnNleElkLFxuICAgICAgICAgICAgICAgIHJlcXVlc3QucGFyYW1zLnBhZ2UgfHwgMSlcbiAgICAgICAgICAgICAgICAudGhlbigoZGF0YTogQXJyYXk8YW55PikgPT4ge1xuICAgICAgICAgICAgICAgICAgICByZXBseShkYXRhKTtcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICB9LFxuICAgICAgICBjb25maWc6IHtcbiAgICAgICAgICAgIHZhbGlkYXRlOiB7XG4gICAgICAgICAgICAgICAgcXVlcnk6IHtcbiAgICAgICAgICAgICAgICAgICAgc2V4SWQ6IEpvaS5udW1iZXIoKS5pbnRlZ2VyKCksXG4gICAgICAgICAgICAgICAgICAgIHBhZ2U6IEpvaS5udW1iZXIoKS5pbnRlZ2VyKClcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZGVzY3JpcHRpb246ICdSZXRyaWV2ZSBQcm9kdWN0cyBmcm9tIG1hdGNoZWQgU2V4SUQnLFxuICAgICAgICAgICAgdGFnczogWydwcm9kdWN0cyddXG4gICAgICAgIH1cbiAgICB9LFxuICAgIHtcbiAgICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICAgIHBhdGg6IF9wcmVmaXggKyAnL2NyZWF0ZScsXG4gICAgICAgIGhhbmRsZXI6IGZ1bmN0aW9uKHJlcXVlc3QsIHJlcGx5KSB7XG4gICAgICAgICAgICBQcm9kdWN0c1NlcnZpY2UuY3JlYXRlUHJvZHVjdChcbiAgICAgICAgICAgICAgICByZXF1ZXN0LnBheWxvYWQubm9uY2UsXG4gICAgICAgICAgICAgICAgcmVxdWVzdC5wYXlsb2FkLmF1dGhvcixcbiAgICAgICAgICAgICAgICByZXF1ZXN0LnBheWxvYWQudGl0bGUsXG4gICAgICAgICAgICAgICAgcmVxdWVzdC5wYXlsb2FkLmNvbnRlbnQsXG4gICAgICAgICAgICAgICAgcmVxdWVzdC5wYXlsb2FkLnN0YXR1cyxcbiAgICAgICAgICAgICAgICByZXF1ZXN0LnBheWxvYWQuc2Nob29sLFxuICAgICAgICAgICAgICAgIHJlcXVlc3QucGF5bG9hZC5zdWJjYXRlZ29yeTAsXG4gICAgICAgICAgICAgICAgcmVxdWVzdC5wYXlsb2FkLnN1YmNhdGVnb3J5MSxcbiAgICAgICAgICAgICAgICByZXF1ZXN0LnBheWxvYWQuc3R5bGVzKVxuICAgICAgICAgICAgICAgIC50aGVuKChkYXRhKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHJlcGx5KGRhdGEpO1xuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgIH0sXG4gICAgICAgIGNvbmZpZzoge1xuICAgICAgICAgICAgdmFsaWRhdGU6IHtcbiAgICAgICAgICAgICAgICBxdWVyeToge1xuICAgICAgICAgICAgICAgICAgICBub25jZTogSm9pLnN0cmluZygpLFxuICAgICAgICAgICAgICAgICAgICBhdXRob3I6IEpvaS5zdHJpbmcoKSxcbiAgICAgICAgICAgICAgICAgICAgdGl0bGU6IEpvaS5zdHJpbmcoKSxcbiAgICAgICAgICAgICAgICAgICAgY29udGVudDogSm9pLnN0cmluZygpLFxuICAgICAgICAgICAgICAgICAgICBzdGF0dXM6IEpvaS5zdHJpbmcoKSxcbiAgICAgICAgICAgICAgICAgICAgY2F0ZWdvcmlhczogSm9pLmFycmF5KCksXG4gICAgICAgICAgICAgICAgICAgIHRhZ3M6IEpvaS5hcnJheSgpXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiAnQ3JlYXRlIGEgbmV3IFByb2R1Y3QnLFxuICAgICAgICAgICAgdGFnczogWydwcm9kdWN0cyddXG4gICAgICAgIH1cbiAgICB9LFxuICAgIHtcbiAgICAgICAgbWV0aG9kOiAnUFVUJyxcbiAgICAgICAgcGF0aDogX3ByZWZpeCArICcvdXBkYXRlJyxcbiAgICAgICAgaGFuZGxlcjogZnVuY3Rpb24ocmVxdWVzdCwgcmVwbHkpIHtcbiAgICAgICAgICAgIFByb2R1Y3RzU2VydmljZS51cGRhdGVQcm9kdWN0KFxuICAgICAgICAgICAgICAgIHJlcXVlc3QucGF5bG9hZC5ub25jZSxcbiAgICAgICAgICAgICAgICByZXF1ZXN0LnBheWxvYWQucHJvZHVjdElkLFxuICAgICAgICAgICAgICAgIHJlcXVlc3QucGF5bG9hZC5hdXRob3IsXG4gICAgICAgICAgICAgICAgcmVxdWVzdC5wYXlsb2FkLnRpdGxlLFxuICAgICAgICAgICAgICAgIHJlcXVlc3QucGF5bG9hZC5jb250ZW50LFxuICAgICAgICAgICAgICAgIHJlcXVlc3QucGF5bG9hZC5zdGF0dXMsXG4gICAgICAgICAgICAgICAgcmVxdWVzdC5wYXlsb2FkLmNhdGVnb3JpZXMsXG4gICAgICAgICAgICAgICAgcmVxdWVzdC5wYXlsb2FkLnRhZ3MpXG4gICAgICAgICAgICAgICAgLnRoZW4oKGRhdGEpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgcmVwbHkoZGF0YSk7XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgfSxcbiAgICAgICAgY29uZmlnOiB7XG4gICAgICAgICAgICB2YWxpZGF0ZToge1xuICAgICAgICAgICAgICAgIHF1ZXJ5OiB7XG4gICAgICAgICAgICAgICAgICAgIG5vbmNlOiBKb2kuc3RyaW5nKCksXG4gICAgICAgICAgICAgICAgICAgIHByb2R1Y3RJZDogSm9pLm51bWJlcigpLmludGVnZXIoKSxcbiAgICAgICAgICAgICAgICAgICAgYXV0aG9yOiBKb2kuc3RyaW5nKCksXG4gICAgICAgICAgICAgICAgICAgIHRpdGxlOiBKb2kuc3RyaW5nKCksXG4gICAgICAgICAgICAgICAgICAgIGNvbnRlbnQ6IEpvaS5zdHJpbmcoKSxcbiAgICAgICAgICAgICAgICAgICAgc3RhdHVzOiBKb2kuc3RyaW5nKCksXG4gICAgICAgICAgICAgICAgICAgIGNhdGVnb3JpYXM6IEpvaS5hcnJheSgpLFxuICAgICAgICAgICAgICAgICAgICB0YWdzOiBKb2kuYXJyYXkoKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogJ1VwZGF0ZSBhIFByb2R1Y3QnLFxuICAgICAgICAgICAgdGFnczogWydwcm9kdWN0cyddXG4gICAgICAgIH1cbiAgICB9LFxuICAgIHtcbiAgICAgICAgbWV0aG9kOiAnREVMRVRFJyxcbiAgICAgICAgcGF0aDogX3ByZWZpeCArICcvZGVsZXRlJyxcbiAgICAgICAgaGFuZGxlcjogZnVuY3Rpb24ocmVxdWVzdCwgcmVwbHkpIHtcbiAgICAgICAgICAgIFByb2R1Y3RzU2VydmljZS5kZWxldGVQcm9kdWN0KFxuICAgICAgICAgICAgICAgIHJlcXVlc3QucGF5bG9hZC5ub25jZSxcbiAgICAgICAgICAgICAgICByZXF1ZXN0LnBheWxvYWQucHJvZHVjdElkKVxuICAgICAgICAgICAgICAgIC50aGVuKChkYXRhKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHJlcGx5KGRhdGEpO1xuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgIH0sXG4gICAgICAgIGNvbmZpZzoge1xuICAgICAgICAgICAgdmFsaWRhdGU6IHtcbiAgICAgICAgICAgICAgICBxdWVyeToge1xuICAgICAgICAgICAgICAgICAgICBub25jZTogSm9pLnN0cmluZygpLFxuICAgICAgICAgICAgICAgICAgICBwcm9kdWN0SWQ6IEpvaS5udW1iZXIoKS5pbnRlZ2VyKClcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZGVzY3JpcHRpb246ICdEZWxldGUgYSBQcm9kdWN0JyxcbiAgICAgICAgICAgIHRhZ3M6IFsncHJvZHVjdHMnXVxuICAgICAgICB9XG4gICAgfSxcbiAgICB7XG4gICAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgICBwYXRoOiBfcHJlZml4ICsgJy9jb21tZW50cy9jcmVhdGUnLFxuICAgICAgICBoYW5kbGVyOiBmdW5jdGlvbihyZXF1ZXN0LCByZXBseSkge1xuICAgICAgICAgICAgUHJvZHVjdHNTZXJ2aWNlLmNyZWF0ZUNvbW1lbnQoXG4gICAgICAgICAgICAgICAgcmVxdWVzdC5wYXlsb2FkLnByb2R1Y3RJZCxcbiAgICAgICAgICAgICAgICByZXF1ZXN0LnBheWxvYWQuY29va2llLFxuICAgICAgICAgICAgICAgIHJlcXVlc3QucGF5bG9hZC5jb250ZW50KVxuICAgICAgICAgICAgICAgIC50aGVuKChkYXRhKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHJlcGx5KGRhdGEpO1xuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgIH0sXG4gICAgICAgIGNvbmZpZzoge1xuICAgICAgICAgICAgdmFsaWRhdGU6IHtcbiAgICAgICAgICAgICAgICBxdWVyeToge1xuICAgICAgICAgICAgICAgICAgICBwcm9kdWN0SWQ6IEpvaS5udW1iZXIoKS5pbnRlZ2VyKCksXG4gICAgICAgICAgICAgICAgICAgIGNvb2tpZTogSm9pLnN0cmluZygpLFxuICAgICAgICAgICAgICAgICAgICBjb250ZW50OiBKb2kuc3RyaW5nKClcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZGVzY3JpcHRpb246ICdDcmVhdGUgYSBuZXcgQ29tbWVudCcsXG4gICAgICAgICAgICB0YWdzOiBbJ3Byb2R1Y3RzJ11cbiAgICAgICAgfVxuICAgIH0sXG4gICAge1xuICAgICAgICBtZXRob2Q6ICdHRVQnLFxuICAgICAgICBwYXRoOiBfcHJlZml4ICsgJy9zZWFyY2gve3NlYXJjaH0ve3BhZ2V9JyxcbiAgICAgICAgaGFuZGxlcjogZnVuY3Rpb24ocmVxdWVzdCwgcmVwbHkpIHtcbiAgICAgICAgICAgIFByb2R1Y3RzU2VydmljZS5nZXRQcm9kdWN0c0J5U2VhcmNoKFxuICAgICAgICAgICAgICAgIHJlcXVlc3QucGFyYW1zLnNlYXJjaCxcbiAgICAgICAgICAgICAgICByZXF1ZXN0LnBhcmFtcy5wYWdlIHx8IDEpXG4gICAgICAgICAgICAgICAgLnRoZW4oKGRhdGE6IEFycmF5PGFueT4pID0+IHtcbiAgICAgICAgICAgICAgICAgICAgcmVwbHkoZGF0YSk7XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgfSxcbiAgICAgICAgY29uZmlnOiB7XG4gICAgICAgICAgICB2YWxpZGF0ZToge1xuICAgICAgICAgICAgICAgIHF1ZXJ5OiB7XG4gICAgICAgICAgICAgICAgICAgIHNlYXJjaDogSm9pLm51bWJlcigpLmludGVnZXIoKSxcbiAgICAgICAgICAgICAgICAgICAgcGFnZTogSm9pLm51bWJlcigpLmludGVnZXIoKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogJ1JldHJpZXZlIFByb2R1Y3RzIGZyb20gbWF0Y2hlZCBTZWFyY2ggc3RyaW5nJyxcbiAgICAgICAgICAgIHRhZ3M6IFsncHJvZHVjdHMnXVxuICAgICAgICB9XG4gICAgfSxcbiAgICB7XG4gICAgICAgIG1ldGhvZDogJ0dFVCcsXG4gICAgICAgIHBhdGg6IF9wcmVmaXggKyAnL3JhbmtpbmcvbGlrZXMnLFxuICAgICAgICBoYW5kbGVyOiBmdW5jdGlvbihyZXF1ZXN0LCByZXBseSkge1xuICAgICAgICAgICAgUHJvZHVjdHNTZXJ2aWNlLmdldFByb2R1Y3RzUmFua2luZ0J5TGlrZXMoKVxuICAgICAgICAgICAgICAgIC50aGVuKChkYXRhOiBBcnJheTxhbnk+KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHJlcGx5KHtwb3N0czogZGF0YSB9KTtcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICB9LFxuICAgICAgICBjb25maWc6IHtcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiAnUmV0cmlldmUgUHJvZHVjdHMgUmFua2luZyBieSBMaWtlcycsXG4gICAgICAgICAgICB0YWdzOiBbJ3Byb2R1Y3RzJ11cbiAgICAgICAgfVxuICAgIH0sXG4gICAge1xuICAgICAgICBtZXRob2Q6ICdHRVQnLFxuICAgICAgICBwYXRoOiBfcHJlZml4ICsgJy9yYW5raW5nL3Zpc2l0cycsXG4gICAgICAgIGhhbmRsZXI6IGZ1bmN0aW9uKHJlcXVlc3QsIHJlcGx5KSB7XG4gICAgICAgICAgICBQcm9kdWN0c1NlcnZpY2UuZ2V0UHJvZHVjdHNSYW5raW5nQnlWaXNpdHMoKVxuICAgICAgICAgICAgICAgIC50aGVuKChkYXRhOiBBcnJheTxhbnk+KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHJlcGx5KHsgcHJvZHVjdHM6IGRhdGEgfSk7XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgfSxcbiAgICAgICAgY29uZmlnOiB7XG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogJ1JldHJpZXZlIFByb2R1Y3RzIFJhbmtpbmcgYnkgVmlzaXRzJyxcbiAgICAgICAgICAgIHRhZ3M6IFsncHJvZHVjdHMnXVxuICAgICAgICB9XG4gICAgfVxuXVxuXG5cbm1vZHVsZS5leHBvcnRzID0gcHJvZHVjdHM7XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=