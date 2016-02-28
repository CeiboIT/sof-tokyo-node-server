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
        path: _prefix + '/byauthor/{author}/{page}',
        handler: function (request, reply) {
            ProductsService.getProductsByAuthor(request.params.author).then(function (data) {
                reply(data);
            });
        },
        config: {
            validate: {
                query: {
                    author: Joi.string(),
                    page: Joi.number().integer()
                }
            },
            description: 'Retrieve Products from matched Author',
            tags: ['products']
        }
    },
    {
        method: 'GET',
        path: _prefix + '/byschool/{school}/{page}',
        handler: function (request, reply) {
            ProductsService.getProductsBySchool(request.params.school, request.params.page || 1).then(function (data) {
                reply(data);
            });
        },
        config: {
            validate: {
                query: {
                    school: Joi.string(),
                    page: Joi.number().integer()
                }
            },
            description: 'Retrieve Products from matched School',
            tags: ['products']
        }
    },
    {
        method: 'GET',
        path: _prefix + '/bysubcategory0/{subcategory0}/{page}',
        handler: function (request, reply) {
            ProductsService.getProductsBySubcategory0(request.params.subcategory0, request.params.page || 1).then(function (data) {
                reply(data);
            });
        },
        config: {
            validate: {
                query: {
                    subcategory0: Joi.string(),
                    page: Joi.number().integer()
                }
            },
            description: 'Retrieve Products from matched Subcategory0',
            tags: ['products']
        }
    },
    {
        method: 'GET',
        path: _prefix + '/bysubcategory1/{subcategory1}/{page}',
        handler: function (request, reply) {
            ProductsService.getProductsBySubcategory1(request.params.subcategory1, request.params.page || 1).then(function (data) {
                reply(data);
            });
        },
        config: {
            validate: {
                query: {
                    subcategory1: Joi.string(),
                    page: Joi.number().integer()
                }
            },
            description: 'Retrieve Products from matched Subcategory1',
            tags: ['products']
        }
    },
    {
        method: 'GET',
        path: _prefix + '/bystyle/{style}/{page}',
        handler: function (request, reply) {
            ProductsService.getProductsByStyle(request.params.style, request.params.page || 1).then(function (data) {
                reply(data);
            });
        },
        config: {
            validate: {
                query: {
                    style: Joi.string(),
                    page: Joi.number().integer()
                }
            },
            description: 'Retrieve Products from matched Style',
            tags: ['products']
        }
    },
    {
        method: 'GET',
        path: _prefix + '/bysex/{sex}/{page}',
        handler: function (request, reply) {
            ProductsService.getProductsBySex(request.params.sex, request.params.page || 1).then(function (data) {
                reply(data);
            });
        },
        config: {
            validate: {
                query: {
                    sex: Joi.string(),
                    page: Joi.number().integer()
                }
            },
            description: 'Retrieve Products from matched Sex',
            tags: ['products']
        }
    },
    {
        method: 'POST',
        path: _prefix + '/create',
        handler: function (request, reply) {
            ProductsService.createProduct(request.payload.authorId, request.payload.title, request.payload.content, request.payload.img, request.payload.subcategory0, request.payload.subcategory1, request.payload.styles, request.payload.sex, request.payload.subImg1, request.payload.subImg2, request.payload.subImg3, request.payload.subImg4, request.payload.subImg5, request.payload.subImg6, request.payload.productionCost, request.payload.sell, request.payload.sellPrice, request.payload.SellNote, request.payload.rental, request.payload.rentalPrice, request.payload.rentalNote).then(function (data) {
                reply(data);
            });
        },
        config: {
            validate: {
                query: {
                    authorId: Joi.number().integer(),
                    title: Joi.string(),
                    content: Joi.string(),
                    img: Joi.string(),
                    subcategory0: Joi.string(),
                    subcategory1: Joi.string(),
                    styles: Joi.array(),
                    sex: Joi.string(),
                    subImg1: Joi.string(),
                    subImg2: Joi.string(),
                    subImg3: Joi.string(),
                    subImg4: Joi.string(),
                    subImg5: Joi.string(),
                    subImg6: Joi.string(),
                    productionCost: Joi.number().integer(),
                    sell: Joi.string(),
                    sellPrice: Joi.number().integer(),
                    sellNote: Joi.string(),
                    rental: Joi.string(),
                    rentalPrice: Joi.number().integer(),
                    rentalNote: Joi.string()
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
            ProductsService.createProduct(request.payload.productId, request.payload.title, request.payload.content, request.payload.img, request.payload.subcategory0, request.payload.subcategory1, request.payload.styles, request.payload.sex, request.payload.subImg1, request.payload.subImg2, request.payload.subImg3, request.payload.subImg4, request.payload.subImg5, request.payload.subImg6, request.payload.productionCost, request.payload.sell, request.payload.sellPrice, request.payload.SellNote, request.payload.rental, request.payload.rentalPrice, request.payload.rentalNote).then(function (data) {
                reply(data);
            });
        },
        config: {
            validate: {
                query: {
                    productId: Joi.number().integer(),
                    title: Joi.string(),
                    content: Joi.string(),
                    img: Joi.string(),
                    subcategory0: Joi.string(),
                    subcategory1: Joi.string(),
                    styles: Joi.array(),
                    sex: Joi.string(),
                    subImg1: Joi.string(),
                    subImg2: Joi.string(),
                    subImg3: Joi.string(),
                    subImg4: Joi.string(),
                    subImg5: Joi.string(),
                    subImg6: Joi.string(),
                    productionCost: Joi.number().integer(),
                    sell: Joi.string(),
                    sellPrice: Joi.number().integer(),
                    sellNote: Joi.string(),
                    rental: Joi.string(),
                    rentalPrice: Joi.number().integer(),
                    rentalNote: Joi.string()
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
                    search: Joi.string(),
                    page: Joi.number().integer()
                }
            },
            description: 'Retrieve Products from matched Search string',
            tags: ['products']
        }
    },
    {
        method: 'GET',
        path: _prefix + '/searchOptions/{search}/{subcategory0}/{subcategory1}/{style}/{sex}',
        handler: function (request, reply) {
            ProductsService.getProductsByOptionsSearch(request.params.search, request.params.subcategory0, request.params.subcategory1, request.params.style, request.params.sex).then(function (data) {
                reply({ products: data });
            });
        },
        config: {
            validate: {
                query: {
                    search: Joi.string(),
                    subcategory0: Joi.string(),
                    subcategory1: Joi.string(),
                    style: Joi.string(),
                    sex: Joi.string()
                }
            },
            description: 'Retrieve Products from matched Search options',
            tags: ['products'],
            notes: [
                "Set parameter value 'null' to skip any parameter search"
            ]
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
    },
    {
        method: 'GET',
        path: _prefix + '/test1',
        handler: function (request, reply) {
            ProductsService.test1ProductList().then(function (data) {
                reply({ products: data });
            });
        },
        config: {
            description: 'Retrieve Products',
            tags: ['products']
        }
    },
    {
        method: 'GET',
        path: _prefix + '/test2',
        handler: function (request, reply) {
            ProductsService.test2ProductList().then(function (data) {
                reply({ products: data });
            });
        },
        config: {
            description: 'Retrieve Products',
            tags: ['products']
        }
    }
];
module.exports = products;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1vZHVsZXMvcHJvZHVjdHMvcHJvZHVjdHMucm91dGVzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLFlBQVksQ0FBQztBQUViLEFBSUEsa0RBSmtEO0FBQ2xELDhDQUE4QztBQUc5QyxJQUFPLE9BQU8sV0FBVyxvQkFBb0IsQ0FBQyxDQUFDO0FBQy9DLElBQU8sR0FBRyxXQUFXLEtBQUssQ0FBQyxDQUFDO0FBRTVCLElBQUksZUFBZSxHQUFHLElBQUksT0FBTyxDQUFDLGVBQWUsRUFBRSxDQUFDO0FBQ3BELElBQUksT0FBTyxHQUFHLFdBQVcsQ0FBQztBQUMxQixJQUFJLFFBQVEsR0FBRztJQUNYO1FBQ0ksTUFBTSxFQUFFLEtBQUs7UUFDYixJQUFJLEVBQUUsT0FBTyxHQUFHLGFBQWE7UUFDN0IsT0FBTyxFQUFFLFVBQVMsT0FBTyxFQUFFLEtBQUs7WUFDNUIsZUFBZSxDQUFDLGNBQWMsQ0FDMUIsT0FBTyxDQUFDLE1BQU0sQ0FBQyxJQUFJLElBQUksQ0FBQyxDQUFDLENBQzVCLElBQUksQ0FBQyxVQUFDLElBQWdCO2dCQUNuQixLQUFLLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDaEIsQ0FBQyxDQUFDLENBQUE7UUFDTixDQUFDO1FBQ0QsTUFBTSxFQUFFO1lBQ0osUUFBUSxFQUFFO2dCQUNOLEtBQUssRUFBRTtvQkFDSCxJQUFJLEVBQUUsR0FBRyxDQUFDLE1BQU0sRUFBRSxDQUFDLE9BQU8sRUFBRTtpQkFDL0I7YUFDSjtZQUNELFdBQVcsRUFBRSx3QkFBd0I7WUFDckMsSUFBSSxFQUFFLENBQUMsVUFBVSxDQUFDO1NBQ3JCO0tBQ0o7SUFDRDtRQUNJLE1BQU0sRUFBRSxLQUFLO1FBQ2IsSUFBSSxFQUFFLE9BQU8sR0FBRyxjQUFjO1FBQzlCLE9BQU8sRUFBRSxVQUFTLE9BQU8sRUFBRSxLQUFLO1lBQzVCLGVBQWUsQ0FBQyxlQUFlLENBQzNCLE9BQU8sQ0FBQyxNQUFNLENBQUMsSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUM1QixJQUFJLENBQUMsVUFBQyxJQUFnQjtnQkFDbkIsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ2hCLENBQUMsQ0FBQyxDQUFBO1FBQ04sQ0FBQztRQUNELE1BQU0sRUFBRTtZQUNKLFFBQVEsRUFBRTtnQkFDTixLQUFLLEVBQUU7b0JBQ0gsSUFBSSxFQUFFLEdBQUcsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxPQUFPLEVBQUU7aUJBQy9CO2FBQ0o7WUFDRCxXQUFXLEVBQUUseUJBQXlCO1lBQ3RDLElBQUksRUFBRSxDQUFDLFVBQVUsQ0FBQztTQUNyQjtLQUNKO0lBQ0Q7UUFDSSxNQUFNLEVBQUUsS0FBSztRQUNiLElBQUksRUFBRSxPQUFPLEdBQUcsc0JBQXNCO1FBQ3RDLE9BQU8sRUFBRSxVQUFTLE9BQU8sRUFBRSxLQUFLO1lBQzVCLGVBQWUsQ0FBQyxjQUFjLENBQzFCLE9BQU8sQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLENBQ3hCLElBQUksQ0FBQyxVQUFDLElBQUk7Z0JBQ1AsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ2hCLENBQUMsQ0FBQyxDQUFBO1FBQ1YsQ0FBQztRQUNELE1BQU0sRUFBRTtZQUNKLFFBQVEsRUFBRTtnQkFDTixLQUFLLEVBQUU7b0JBQ0gsU0FBUyxFQUFFLEdBQUcsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxPQUFPLEVBQUU7aUJBQ3BDO2FBQ0o7WUFDRCxXQUFXLEVBQUUseUNBQXlDO1lBQ3RELElBQUksRUFBRSxDQUFDLFVBQVUsQ0FBQztTQUNyQjtLQUNKO0lBQ0Q7UUFDSSxNQUFNLEVBQUUsS0FBSztRQUNiLElBQUksRUFBRSxPQUFPLEdBQUcsMkJBQTJCO1FBQzNDLE9BQU8sRUFBRSxVQUFTLE9BQU8sRUFBRSxLQUFLO1lBQzVCLGVBQWUsQ0FBQyxtQkFBbUIsQ0FDL0IsT0FBTyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FDekIsSUFBSSxDQUFDLFVBQUMsSUFBZ0I7Z0JBQ25CLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUNoQixDQUFDLENBQUMsQ0FBQTtRQUNOLENBQUM7UUFDRCxNQUFNLEVBQUU7WUFDSixRQUFRLEVBQUU7Z0JBQ04sS0FBSyxFQUFFO29CQUNILE1BQU0sRUFBRSxHQUFHLENBQUMsTUFBTSxFQUFFO29CQUNwQixJQUFJLEVBQUUsR0FBRyxDQUFDLE1BQU0sRUFBRSxDQUFDLE9BQU8sRUFBRTtpQkFDL0I7YUFDSjtZQUNELFdBQVcsRUFBRSx1Q0FBdUM7WUFDcEQsSUFBSSxFQUFFLENBQUMsVUFBVSxDQUFDO1NBQ3JCO0tBQ0o7SUFDRDtRQUNJLE1BQU0sRUFBRSxLQUFLO1FBQ2IsSUFBSSxFQUFFLE9BQU8sR0FBRywyQkFBMkI7UUFDM0MsT0FBTyxFQUFFLFVBQVMsT0FBTyxFQUFFLEtBQUs7WUFDNUIsZUFBZSxDQUFDLG1CQUFtQixDQUMvQixPQUFPLENBQUMsTUFBTSxDQUFDLE1BQU0sRUFDckIsT0FBTyxDQUFDLE1BQU0sQ0FBQyxJQUFJLElBQUksQ0FBQyxDQUFDLENBQ3hCLElBQUksQ0FBQyxVQUFDLElBQWdCO2dCQUNuQixLQUFLLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDaEIsQ0FBQyxDQUFDLENBQUE7UUFDVixDQUFDO1FBQ0QsTUFBTSxFQUFFO1lBQ0osUUFBUSxFQUFFO2dCQUNOLEtBQUssRUFBRTtvQkFDSCxNQUFNLEVBQUUsR0FBRyxDQUFDLE1BQU0sRUFBRTtvQkFDcEIsSUFBSSxFQUFFLEdBQUcsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxPQUFPLEVBQUU7aUJBQy9CO2FBQ0o7WUFDRCxXQUFXLEVBQUUsdUNBQXVDO1lBQ3BELElBQUksRUFBRSxDQUFDLFVBQVUsQ0FBQztTQUNyQjtLQUNKO0lBQ0Q7UUFDSSxNQUFNLEVBQUUsS0FBSztRQUNiLElBQUksRUFBRSxPQUFPLEdBQUcsdUNBQXVDO1FBQ3ZELE9BQU8sRUFBRSxVQUFTLE9BQU8sRUFBRSxLQUFLO1lBQzVCLGVBQWUsQ0FBQyx5QkFBeUIsQ0FDckMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxZQUFZLEVBQzNCLE9BQU8sQ0FBQyxNQUFNLENBQUMsSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUN4QixJQUFJLENBQUMsVUFBQyxJQUFnQjtnQkFDbkIsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ2hCLENBQUMsQ0FBQyxDQUFBO1FBQ1YsQ0FBQztRQUNELE1BQU0sRUFBRTtZQUNKLFFBQVEsRUFBRTtnQkFDTixLQUFLLEVBQUU7b0JBQ0gsWUFBWSxFQUFFLEdBQUcsQ0FBQyxNQUFNLEVBQUU7b0JBQzFCLElBQUksRUFBRSxHQUFHLENBQUMsTUFBTSxFQUFFLENBQUMsT0FBTyxFQUFFO2lCQUMvQjthQUNKO1lBQ0QsV0FBVyxFQUFFLDZDQUE2QztZQUMxRCxJQUFJLEVBQUUsQ0FBQyxVQUFVLENBQUM7U0FDckI7S0FDSjtJQUNEO1FBQ0ksTUFBTSxFQUFFLEtBQUs7UUFDYixJQUFJLEVBQUUsT0FBTyxHQUFHLHVDQUF1QztRQUN2RCxPQUFPLEVBQUUsVUFBUyxPQUFPLEVBQUUsS0FBSztZQUM1QixlQUFlLENBQUMseUJBQXlCLENBQ3JDLE9BQU8sQ0FBQyxNQUFNLENBQUMsWUFBWSxFQUMzQixPQUFPLENBQUMsTUFBTSxDQUFDLElBQUksSUFBSSxDQUFDLENBQUMsQ0FDeEIsSUFBSSxDQUFDLFVBQUMsSUFBZ0I7Z0JBQ25CLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUNoQixDQUFDLENBQUMsQ0FBQTtRQUNWLENBQUM7UUFDRCxNQUFNLEVBQUU7WUFDSixRQUFRLEVBQUU7Z0JBQ04sS0FBSyxFQUFFO29CQUNILFlBQVksRUFBRSxHQUFHLENBQUMsTUFBTSxFQUFFO29CQUMxQixJQUFJLEVBQUUsR0FBRyxDQUFDLE1BQU0sRUFBRSxDQUFDLE9BQU8sRUFBRTtpQkFDL0I7YUFDSjtZQUNELFdBQVcsRUFBRSw2Q0FBNkM7WUFDMUQsSUFBSSxFQUFFLENBQUMsVUFBVSxDQUFDO1NBQ3JCO0tBQ0o7SUFDRDtRQUNJLE1BQU0sRUFBRSxLQUFLO1FBQ2IsSUFBSSxFQUFFLE9BQU8sR0FBRyx5QkFBeUI7UUFDekMsT0FBTyxFQUFFLFVBQVMsT0FBTyxFQUFFLEtBQUs7WUFDNUIsZUFBZSxDQUFDLGtCQUFrQixDQUM5QixPQUFPLENBQUMsTUFBTSxDQUFDLEtBQUssRUFDcEIsT0FBTyxDQUFDLE1BQU0sQ0FBQyxJQUFJLElBQUksQ0FBQyxDQUFDLENBQ3hCLElBQUksQ0FBQyxVQUFDLElBQWdCO2dCQUNuQixLQUFLLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDaEIsQ0FBQyxDQUFDLENBQUE7UUFDVixDQUFDO1FBQ0QsTUFBTSxFQUFFO1lBQ0osUUFBUSxFQUFFO2dCQUNOLEtBQUssRUFBRTtvQkFDSCxLQUFLLEVBQUUsR0FBRyxDQUFDLE1BQU0sRUFBRTtvQkFDbkIsSUFBSSxFQUFFLEdBQUcsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxPQUFPLEVBQUU7aUJBQy9CO2FBQ0o7WUFDRCxXQUFXLEVBQUUsc0NBQXNDO1lBQ25ELElBQUksRUFBRSxDQUFDLFVBQVUsQ0FBQztTQUNyQjtLQUNKO0lBQ0Q7UUFDSSxNQUFNLEVBQUUsS0FBSztRQUNiLElBQUksRUFBRSxPQUFPLEdBQUcscUJBQXFCO1FBQ3JDLE9BQU8sRUFBRSxVQUFTLE9BQU8sRUFBRSxLQUFLO1lBQzVCLGVBQWUsQ0FBQyxnQkFBZ0IsQ0FDNUIsT0FBTyxDQUFDLE1BQU0sQ0FBQyxHQUFHLEVBQ2xCLE9BQU8sQ0FBQyxNQUFNLENBQUMsSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUN4QixJQUFJLENBQUMsVUFBQyxJQUFnQjtnQkFDbkIsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ2hCLENBQUMsQ0FBQyxDQUFBO1FBQ1YsQ0FBQztRQUNELE1BQU0sRUFBRTtZQUNKLFFBQVEsRUFBRTtnQkFDTixLQUFLLEVBQUU7b0JBQ0gsR0FBRyxFQUFFLEdBQUcsQ0FBQyxNQUFNLEVBQUU7b0JBQ2pCLElBQUksRUFBRSxHQUFHLENBQUMsTUFBTSxFQUFFLENBQUMsT0FBTyxFQUFFO2lCQUMvQjthQUNKO1lBQ0QsV0FBVyxFQUFFLG9DQUFvQztZQUNqRCxJQUFJLEVBQUUsQ0FBQyxVQUFVLENBQUM7U0FDckI7S0FDSjtJQUNEO1FBQ0ksTUFBTSxFQUFFLE1BQU07UUFDZCxJQUFJLEVBQUUsT0FBTyxHQUFHLFNBQVM7UUFDekIsT0FBTyxFQUFFLFVBQVMsT0FBTyxFQUFFLEtBQUs7WUFDNUIsZUFBZSxDQUFDLGFBQWEsQ0FDekIsT0FBTyxDQUFDLE9BQU8sQ0FBQyxRQUFRLEVBQ3hCLE9BQU8sQ0FBQyxPQUFPLENBQUMsS0FBSyxFQUNyQixPQUFPLENBQUMsT0FBTyxDQUFDLE9BQU8sRUFDdkIsT0FBTyxDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQ25CLE9BQU8sQ0FBQyxPQUFPLENBQUMsWUFBWSxFQUM1QixPQUFPLENBQUMsT0FBTyxDQUFDLFlBQVksRUFDNUIsT0FBTyxDQUFDLE9BQU8sQ0FBQyxNQUFNLEVBQ3RCLE9BQU8sQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUNuQixPQUFPLENBQUMsT0FBTyxDQUFDLE9BQU8sRUFDdkIsT0FBTyxDQUFDLE9BQU8sQ0FBQyxPQUFPLEVBQ3ZCLE9BQU8sQ0FBQyxPQUFPLENBQUMsT0FBTyxFQUN2QixPQUFPLENBQUMsT0FBTyxDQUFDLE9BQU8sRUFDdkIsT0FBTyxDQUFDLE9BQU8sQ0FBQyxPQUFPLEVBQ3ZCLE9BQU8sQ0FBQyxPQUFPLENBQUMsT0FBTyxFQUN2QixPQUFPLENBQUMsT0FBTyxDQUFDLGNBQWMsRUFDOUIsT0FBTyxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQ3BCLE9BQU8sQ0FBQyxPQUFPLENBQUMsU0FBUyxFQUN6QixPQUFPLENBQUMsT0FBTyxDQUFDLFFBQVEsRUFDeEIsT0FBTyxDQUFDLE9BQU8sQ0FBQyxNQUFNLEVBQ3RCLE9BQU8sQ0FBQyxPQUFPLENBQUMsV0FBVyxFQUMzQixPQUFPLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FDN0IsQ0FDSSxJQUFJLENBQUMsVUFBQyxJQUFJO2dCQUNQLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUNoQixDQUFDLENBQUMsQ0FBQTtRQUNWLENBQUM7UUFDRCxNQUFNLEVBQUU7WUFDSixRQUFRLEVBQUU7Z0JBQ04sS0FBSyxFQUFFO29CQUNILFFBQVEsRUFBRSxHQUFHLENBQUMsTUFBTSxFQUFFLENBQUMsT0FBTyxFQUFFO29CQUNoQyxLQUFLLEVBQUUsR0FBRyxDQUFDLE1BQU0sRUFBRTtvQkFDbkIsT0FBTyxFQUFFLEdBQUcsQ0FBQyxNQUFNLEVBQUU7b0JBQ3JCLEdBQUcsRUFBRSxHQUFHLENBQUMsTUFBTSxFQUFFO29CQUNqQixZQUFZLEVBQUUsR0FBRyxDQUFDLE1BQU0sRUFBRTtvQkFDMUIsWUFBWSxFQUFFLEdBQUcsQ0FBQyxNQUFNLEVBQUU7b0JBQzFCLE1BQU0sRUFBRSxHQUFHLENBQUMsS0FBSyxFQUFFO29CQUNuQixHQUFHLEVBQUUsR0FBRyxDQUFDLE1BQU0sRUFBRTtvQkFDakIsT0FBTyxFQUFFLEdBQUcsQ0FBQyxNQUFNLEVBQUU7b0JBQ3JCLE9BQU8sRUFBRSxHQUFHLENBQUMsTUFBTSxFQUFFO29CQUNyQixPQUFPLEVBQUUsR0FBRyxDQUFDLE1BQU0sRUFBRTtvQkFDckIsT0FBTyxFQUFFLEdBQUcsQ0FBQyxNQUFNLEVBQUU7b0JBQ3JCLE9BQU8sRUFBRSxHQUFHLENBQUMsTUFBTSxFQUFFO29CQUNyQixPQUFPLEVBQUUsR0FBRyxDQUFDLE1BQU0sRUFBRTtvQkFDckIsY0FBYyxFQUFFLEdBQUcsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxPQUFPLEVBQUU7b0JBQ3RDLElBQUksRUFBRSxHQUFHLENBQUMsTUFBTSxFQUFFO29CQUNsQixTQUFTLEVBQUUsR0FBRyxDQUFDLE1BQU0sRUFBRSxDQUFDLE9BQU8sRUFBRTtvQkFDakMsUUFBUSxFQUFFLEdBQUcsQ0FBQyxNQUFNLEVBQUU7b0JBQ3RCLE1BQU0sRUFBRSxHQUFHLENBQUMsTUFBTSxFQUFFO29CQUNwQixXQUFXLEVBQUUsR0FBRyxDQUFDLE1BQU0sRUFBRSxDQUFDLE9BQU8sRUFBRTtvQkFDbkMsVUFBVSxFQUFFLEdBQUcsQ0FBQyxNQUFNLEVBQUU7aUJBQzNCO2FBQ0o7WUFDRCxXQUFXLEVBQUUsc0JBQXNCO1lBQ25DLElBQUksRUFBRSxDQUFDLFVBQVUsQ0FBQztTQUNyQjtLQUNKO0lBQ0Q7UUFDSSxNQUFNLEVBQUUsS0FBSztRQUNiLElBQUksRUFBRSxPQUFPLEdBQUcsU0FBUztRQUN6QixPQUFPLEVBQUUsVUFBUyxPQUFPLEVBQUUsS0FBSztZQUM1QixlQUFlLENBQUMsYUFBYSxDQUN6QixPQUFPLENBQUMsT0FBTyxDQUFDLFNBQVMsRUFDekIsT0FBTyxDQUFDLE9BQU8sQ0FBQyxLQUFLLEVBQ3JCLE9BQU8sQ0FBQyxPQUFPLENBQUMsT0FBTyxFQUN2QixPQUFPLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFDbkIsT0FBTyxDQUFDLE9BQU8sQ0FBQyxZQUFZLEVBQzVCLE9BQU8sQ0FBQyxPQUFPLENBQUMsWUFBWSxFQUM1QixPQUFPLENBQUMsT0FBTyxDQUFDLE1BQU0sRUFDdEIsT0FBTyxDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQ25CLE9BQU8sQ0FBQyxPQUFPLENBQUMsT0FBTyxFQUN2QixPQUFPLENBQUMsT0FBTyxDQUFDLE9BQU8sRUFDdkIsT0FBTyxDQUFDLE9BQU8sQ0FBQyxPQUFPLEVBQ3ZCLE9BQU8sQ0FBQyxPQUFPLENBQUMsT0FBTyxFQUN2QixPQUFPLENBQUMsT0FBTyxDQUFDLE9BQU8sRUFDdkIsT0FBTyxDQUFDLE9BQU8sQ0FBQyxPQUFPLEVBQ3ZCLE9BQU8sQ0FBQyxPQUFPLENBQUMsY0FBYyxFQUM5QixPQUFPLENBQUMsT0FBTyxDQUFDLElBQUksRUFDcEIsT0FBTyxDQUFDLE9BQU8sQ0FBQyxTQUFTLEVBQ3pCLE9BQU8sQ0FBQyxPQUFPLENBQUMsUUFBUSxFQUN4QixPQUFPLENBQUMsT0FBTyxDQUFDLE1BQU0sRUFDdEIsT0FBTyxDQUFDLE9BQU8sQ0FBQyxXQUFXLEVBQzNCLE9BQU8sQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUM3QixDQUNJLElBQUksQ0FBQyxVQUFDLElBQUk7Z0JBQ1AsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ2hCLENBQUMsQ0FBQyxDQUFBO1FBQ1YsQ0FBQztRQUNELE1BQU0sRUFBRTtZQUNKLFFBQVEsRUFBRTtnQkFDTixLQUFLLEVBQUU7b0JBQ0gsU0FBUyxFQUFFLEdBQUcsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxPQUFPLEVBQUU7b0JBQ2pDLEtBQUssRUFBRSxHQUFHLENBQUMsTUFBTSxFQUFFO29CQUNuQixPQUFPLEVBQUUsR0FBRyxDQUFDLE1BQU0sRUFBRTtvQkFDckIsR0FBRyxFQUFFLEdBQUcsQ0FBQyxNQUFNLEVBQUU7b0JBQ2pCLFlBQVksRUFBRSxHQUFHLENBQUMsTUFBTSxFQUFFO29CQUMxQixZQUFZLEVBQUUsR0FBRyxDQUFDLE1BQU0sRUFBRTtvQkFDMUIsTUFBTSxFQUFFLEdBQUcsQ0FBQyxLQUFLLEVBQUU7b0JBQ25CLEdBQUcsRUFBRSxHQUFHLENBQUMsTUFBTSxFQUFFO29CQUNqQixPQUFPLEVBQUUsR0FBRyxDQUFDLE1BQU0sRUFBRTtvQkFDckIsT0FBTyxFQUFFLEdBQUcsQ0FBQyxNQUFNLEVBQUU7b0JBQ3JCLE9BQU8sRUFBRSxHQUFHLENBQUMsTUFBTSxFQUFFO29CQUNyQixPQUFPLEVBQUUsR0FBRyxDQUFDLE1BQU0sRUFBRTtvQkFDckIsT0FBTyxFQUFFLEdBQUcsQ0FBQyxNQUFNLEVBQUU7b0JBQ3JCLE9BQU8sRUFBRSxHQUFHLENBQUMsTUFBTSxFQUFFO29CQUNyQixjQUFjLEVBQUUsR0FBRyxDQUFDLE1BQU0sRUFBRSxDQUFDLE9BQU8sRUFBRTtvQkFDdEMsSUFBSSxFQUFFLEdBQUcsQ0FBQyxNQUFNLEVBQUU7b0JBQ2xCLFNBQVMsRUFBRSxHQUFHLENBQUMsTUFBTSxFQUFFLENBQUMsT0FBTyxFQUFFO29CQUNqQyxRQUFRLEVBQUUsR0FBRyxDQUFDLE1BQU0sRUFBRTtvQkFDdEIsTUFBTSxFQUFFLEdBQUcsQ0FBQyxNQUFNLEVBQUU7b0JBQ3BCLFdBQVcsRUFBRSxHQUFHLENBQUMsTUFBTSxFQUFFLENBQUMsT0FBTyxFQUFFO29CQUNuQyxVQUFVLEVBQUUsR0FBRyxDQUFDLE1BQU0sRUFBRTtpQkFDM0I7YUFDSjtZQUNELFdBQVcsRUFBRSxrQkFBa0I7WUFDL0IsSUFBSSxFQUFFLENBQUMsVUFBVSxDQUFDO1NBQ3JCO0tBQ0o7SUFDRDtRQUNJLE1BQU0sRUFBRSxRQUFRO1FBQ2hCLElBQUksRUFBRSxPQUFPLEdBQUcsU0FBUztRQUN6QixPQUFPLEVBQUUsVUFBUyxPQUFPLEVBQUUsS0FBSztZQUM1QixlQUFlLENBQUMsYUFBYSxDQUN6QixPQUFPLENBQUMsT0FBTyxDQUFDLEtBQUssRUFDckIsT0FBTyxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsQ0FDekIsSUFBSSxDQUFDLFVBQUMsSUFBSTtnQkFDUCxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDaEIsQ0FBQyxDQUFDLENBQUE7UUFDVixDQUFDO1FBQ0QsTUFBTSxFQUFFO1lBQ0osUUFBUSxFQUFFO2dCQUNOLEtBQUssRUFBRTtvQkFDSCxLQUFLLEVBQUUsR0FBRyxDQUFDLE1BQU0sRUFBRTtvQkFDbkIsU0FBUyxFQUFFLEdBQUcsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxPQUFPLEVBQUU7aUJBQ3BDO2FBQ0o7WUFDRCxXQUFXLEVBQUUsa0JBQWtCO1lBQy9CLElBQUksRUFBRSxDQUFDLFVBQVUsQ0FBQztTQUNyQjtLQUNKO0lBQ0Q7UUFDSSxNQUFNLEVBQUUsTUFBTTtRQUNkLElBQUksRUFBRSxPQUFPLEdBQUcsa0JBQWtCO1FBQ2xDLE9BQU8sRUFBRSxVQUFTLE9BQU8sRUFBRSxLQUFLO1lBQzVCLGVBQWUsQ0FBQyxhQUFhLENBQ3pCLE9BQU8sQ0FBQyxPQUFPLENBQUMsU0FBUyxFQUN6QixPQUFPLENBQUMsT0FBTyxDQUFDLE1BQU0sRUFDdEIsT0FBTyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FDdkIsSUFBSSxDQUFDLFVBQUMsSUFBSTtnQkFDUCxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDaEIsQ0FBQyxDQUFDLENBQUE7UUFDVixDQUFDO1FBQ0QsTUFBTSxFQUFFO1lBQ0osUUFBUSxFQUFFO2dCQUNOLEtBQUssRUFBRTtvQkFDSCxTQUFTLEVBQUUsR0FBRyxDQUFDLE1BQU0sRUFBRSxDQUFDLE9BQU8sRUFBRTtvQkFDakMsTUFBTSxFQUFFLEdBQUcsQ0FBQyxNQUFNLEVBQUU7b0JBQ3BCLE9BQU8sRUFBRSxHQUFHLENBQUMsTUFBTSxFQUFFO2lCQUN4QjthQUNKO1lBQ0QsV0FBVyxFQUFFLHNCQUFzQjtZQUNuQyxJQUFJLEVBQUUsQ0FBQyxVQUFVLENBQUM7U0FDckI7S0FDSjtJQUNEO1FBQ0ksTUFBTSxFQUFFLEtBQUs7UUFDYixJQUFJLEVBQUUsT0FBTyxHQUFHLHlCQUF5QjtRQUN6QyxPQUFPLEVBQUUsVUFBUyxPQUFPLEVBQUUsS0FBSztZQUM1QixlQUFlLENBQUMsbUJBQW1CLENBQy9CLE9BQU8sQ0FBQyxNQUFNLENBQUMsTUFBTSxFQUNyQixPQUFPLENBQUMsTUFBTSxDQUFDLElBQUksSUFBSSxDQUFDLENBQUMsQ0FDeEIsSUFBSSxDQUFDLFVBQUMsSUFBZ0I7Z0JBQ25CLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUNoQixDQUFDLENBQUMsQ0FBQTtRQUNWLENBQUM7UUFDRCxNQUFNLEVBQUU7WUFDSixRQUFRLEVBQUU7Z0JBQ04sS0FBSyxFQUFFO29CQUNILE1BQU0sRUFBRSxHQUFHLENBQUMsTUFBTSxFQUFFO29CQUNwQixJQUFJLEVBQUUsR0FBRyxDQUFDLE1BQU0sRUFBRSxDQUFDLE9BQU8sRUFBRTtpQkFDL0I7YUFDSjtZQUNELFdBQVcsRUFBRSw4Q0FBOEM7WUFDM0QsSUFBSSxFQUFFLENBQUMsVUFBVSxDQUFDO1NBQ3JCO0tBQ0o7SUFDRDtRQUNJLE1BQU0sRUFBRSxLQUFLO1FBQ2IsSUFBSSxFQUFFLE9BQU8sR0FBRyxxRUFBcUU7UUFDckYsT0FBTyxFQUFFLFVBQVMsT0FBTyxFQUFFLEtBQUs7WUFDNUIsZUFBZSxDQUFDLDBCQUEwQixDQUN0QyxPQUFPLENBQUMsTUFBTSxDQUFDLE1BQU0sRUFDckIsT0FBTyxDQUFDLE1BQU0sQ0FBQyxZQUFZLEVBQzNCLE9BQU8sQ0FBQyxNQUFNLENBQUMsWUFBWSxFQUMzQixPQUFPLENBQUMsTUFBTSxDQUFDLEtBQUssRUFDcEIsT0FBTyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FDbEIsSUFBSSxDQUFDLFVBQUMsSUFBZ0I7Z0JBQ25CLEtBQUssQ0FBRSxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDO1lBQy9CLENBQUMsQ0FBQyxDQUFBO1FBQ1YsQ0FBQztRQUNELE1BQU0sRUFBRTtZQUNKLFFBQVEsRUFBRTtnQkFDTixLQUFLLEVBQUU7b0JBQ0gsTUFBTSxFQUFFLEdBQUcsQ0FBQyxNQUFNLEVBQUU7b0JBQ3BCLFlBQVksRUFBRSxHQUFHLENBQUMsTUFBTSxFQUFFO29CQUMxQixZQUFZLEVBQUUsR0FBRyxDQUFDLE1BQU0sRUFBRTtvQkFDMUIsS0FBSyxFQUFFLEdBQUcsQ0FBQyxNQUFNLEVBQUU7b0JBQ25CLEdBQUcsRUFBRSxHQUFHLENBQUMsTUFBTSxFQUFFO2lCQUNwQjthQUNKO1lBQ0QsV0FBVyxFQUFFLCtDQUErQztZQUM1RCxJQUFJLEVBQUUsQ0FBQyxVQUFVLENBQUM7WUFDbEIsS0FBSyxFQUFFO2dCQUNILHlEQUF5RDthQUM1RDtTQUNKO0tBQ0o7SUFDRDtRQUNJLE1BQU0sRUFBRSxLQUFLO1FBQ2IsSUFBSSxFQUFFLE9BQU8sR0FBRyxnQkFBZ0I7UUFDaEMsT0FBTyxFQUFFLFVBQVMsT0FBTyxFQUFFLEtBQUs7WUFDNUIsZUFBZSxDQUFDLHlCQUF5QixFQUFFLENBQ3RDLElBQUksQ0FBQyxVQUFDLElBQWdCO2dCQUNuQixLQUFLLENBQUMsRUFBQyxLQUFLLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQztZQUMxQixDQUFDLENBQUMsQ0FBQTtRQUNWLENBQUM7UUFDRCxNQUFNLEVBQUU7WUFDSixXQUFXLEVBQUUsb0NBQW9DO1lBQ2pELElBQUksRUFBRSxDQUFDLFVBQVUsQ0FBQztTQUNyQjtLQUNKO0lBQ0Q7UUFDSSxNQUFNLEVBQUUsS0FBSztRQUNiLElBQUksRUFBRSxPQUFPLEdBQUcsaUJBQWlCO1FBQ2pDLE9BQU8sRUFBRSxVQUFTLE9BQU8sRUFBRSxLQUFLO1lBQzVCLGVBQWUsQ0FBQywwQkFBMEIsRUFBRSxDQUN2QyxJQUFJLENBQUMsVUFBQyxJQUFnQjtnQkFDbkIsS0FBSyxDQUFDLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxDQUFDLENBQUM7WUFDOUIsQ0FBQyxDQUFDLENBQUE7UUFDVixDQUFDO1FBQ0QsTUFBTSxFQUFFO1lBQ0osV0FBVyxFQUFFLHFDQUFxQztZQUNsRCxJQUFJLEVBQUUsQ0FBQyxVQUFVLENBQUM7U0FDckI7S0FDSjtJQUNEO1FBQ0ksTUFBTSxFQUFFLEtBQUs7UUFDYixJQUFJLEVBQUUsT0FBTyxHQUFHLFFBQVE7UUFDeEIsT0FBTyxFQUFFLFVBQVMsT0FBTyxFQUFFLEtBQUs7WUFDNUIsZUFBZSxDQUFDLGdCQUFnQixFQUFFLENBQzdCLElBQUksQ0FBQyxVQUFDLElBQUk7Z0JBQ1AsS0FBSyxDQUFDLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxDQUFDLENBQUM7WUFDOUIsQ0FBQyxDQUFDLENBQUE7UUFDVixDQUFDO1FBQ0QsTUFBTSxFQUFFO1lBQ0osV0FBVyxFQUFFLG1CQUFtQjtZQUNoQyxJQUFJLEVBQUUsQ0FBQyxVQUFVLENBQUM7U0FDckI7S0FDSjtJQUNEO1FBQ0ksTUFBTSxFQUFFLEtBQUs7UUFDYixJQUFJLEVBQUUsT0FBTyxHQUFHLFFBQVE7UUFDeEIsT0FBTyxFQUFFLFVBQVMsT0FBTyxFQUFFLEtBQUs7WUFDNUIsZUFBZSxDQUFDLGdCQUFnQixFQUFFLENBQzdCLElBQUksQ0FBQyxVQUFDLElBQUk7Z0JBQ1AsS0FBSyxDQUFDLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxDQUFDLENBQUM7WUFDOUIsQ0FBQyxDQUFDLENBQUE7UUFDVixDQUFDO1FBQ0QsTUFBTSxFQUFFO1lBQ0osV0FBVyxFQUFFLG1CQUFtQjtZQUNoQyxJQUFJLEVBQUUsQ0FBQyxVQUFVLENBQUM7U0FDckI7S0FDSjtDQUNKLENBQUE7QUFHRCxNQUFNLENBQUMsT0FBTyxHQUFHLFFBQVEsQ0FBQyIsImZpbGUiOiJtb2R1bGVzL3Byb2R1Y3RzL3Byb2R1Y3RzLnJvdXRlcy5qcyIsInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0JztcblxuLy8vIDxyZWZlcmVuY2UgcGF0aD1cIi4uLy4uLy4uL3R5cGluZ3MvdHNkLmQudHNcIiAvPlxuLy8vIDxyZWZlcmVuY2UgcGF0aD1cIi4vcHJvZHVjdHMuc2VydmljZS50c1wiIC8+XG5cblxuaW1wb3J0IHNlcnZpY2UgPSByZXF1aXJlKCcuL3Byb2R1Y3RzLnNlcnZpY2UnKTtcbmltcG9ydCBKb2kgPSByZXF1aXJlKCdqb2knKTtcblxudmFyIFByb2R1Y3RzU2VydmljZSA9IG5ldyBzZXJ2aWNlLlByb2R1Y3RzU2VydmljZSgpO1xudmFyIF9wcmVmaXggPSAnL3Byb2R1Y3RzJztcbnZhciBwcm9kdWN0cyA9IFtcbiAgICB7XG4gICAgICAgIG1ldGhvZDogJ0dFVCcsXG4gICAgICAgIHBhdGg6IF9wcmVmaXggKyAnL25ldy97cGFnZX0nLFxuICAgICAgICBoYW5kbGVyOiBmdW5jdGlvbihyZXF1ZXN0LCByZXBseSkge1xuICAgICAgICAgICAgUHJvZHVjdHNTZXJ2aWNlLmdldFByb2R1Y3RzTmV3KFxuICAgICAgICAgICAgICAgIHJlcXVlc3QucGFyYW1zLnBhZ2UgfHwgMSlcbiAgICAgICAgICAgIC50aGVuKChkYXRhOiBBcnJheTxhbnk+KSA9PiB7XG4gICAgICAgICAgICAgICAgcmVwbHkoZGF0YSk7XG4gICAgICAgICAgICB9KVxuICAgICAgICB9LFxuICAgICAgICBjb25maWc6IHtcbiAgICAgICAgICAgIHZhbGlkYXRlOiB7XG4gICAgICAgICAgICAgICAgcXVlcnk6IHtcbiAgICAgICAgICAgICAgICAgICAgcGFnZTogSm9pLm51bWJlcigpLmludGVnZXIoKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogJ1JldHJpZXZlcyBuZXcgUHJvZHVjdHMnLFxuICAgICAgICAgICAgdGFnczogWydwcm9kdWN0cyddXG4gICAgICAgIH1cbiAgICB9LFxuICAgIHtcbiAgICAgICAgbWV0aG9kOiAnR0VUJyxcbiAgICAgICAgcGF0aDogX3ByZWZpeCArICcvbGlzdC97cGFnZX0nLFxuICAgICAgICBoYW5kbGVyOiBmdW5jdGlvbihyZXF1ZXN0LCByZXBseSkge1xuICAgICAgICAgICAgUHJvZHVjdHNTZXJ2aWNlLmdldFByb2R1Y3RzTGlzdChcbiAgICAgICAgICAgICAgICByZXF1ZXN0LnBhcmFtcy5wYWdlIHx8IDEpXG4gICAgICAgICAgICAudGhlbigoZGF0YTogQXJyYXk8YW55PikgPT4ge1xuICAgICAgICAgICAgICAgIHJlcGx5KGRhdGEpO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgfSxcbiAgICAgICAgY29uZmlnOiB7XG4gICAgICAgICAgICB2YWxpZGF0ZToge1xuICAgICAgICAgICAgICAgIHF1ZXJ5OiB7XG4gICAgICAgICAgICAgICAgICAgIHBhZ2U6IEpvaS5udW1iZXIoKS5pbnRlZ2VyKClcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZGVzY3JpcHRpb246ICdSZXRyaWV2ZXMgUHJvZHVjdHMgbGlzdCcsXG4gICAgICAgICAgICB0YWdzOiBbJ3Byb2R1Y3RzJ11cbiAgICAgICAgfVxuICAgIH0sXG4gICAge1xuICAgICAgICBtZXRob2Q6ICdHRVQnLFxuICAgICAgICBwYXRoOiBfcHJlZml4ICsgJy9wcm9kdWN0L3twcm9kdWN0SWR9JyxcbiAgICAgICAgaGFuZGxlcjogZnVuY3Rpb24ocmVxdWVzdCwgcmVwbHkpIHtcbiAgICAgICAgICAgIFByb2R1Y3RzU2VydmljZS5nZXRQcm9kdWN0QnlJZChcbiAgICAgICAgICAgICAgICByZXF1ZXN0LnBhcmFtcy5wcm9kdWN0SWQpXG4gICAgICAgICAgICAgICAgLnRoZW4oKGRhdGEpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgcmVwbHkoZGF0YSk7XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgfSxcbiAgICAgICAgY29uZmlnOiB7XG4gICAgICAgICAgICB2YWxpZGF0ZToge1xuICAgICAgICAgICAgICAgIHF1ZXJ5OiB7XG4gICAgICAgICAgICAgICAgICAgIHByb2R1Y3RJZDogSm9pLm51bWJlcigpLmludGVnZXIoKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogJ1JldHJpZXZlIFByb2R1Y3Qgd2l0aCBtYXRjaGVkIFByb2R1Y3RJRCcsXG4gICAgICAgICAgICB0YWdzOiBbJ3Byb2R1Y3RzJ11cbiAgICAgICAgfVxuICAgIH0sXG4gICAge1xuICAgICAgICBtZXRob2Q6ICdHRVQnLFxuICAgICAgICBwYXRoOiBfcHJlZml4ICsgJy9ieWF1dGhvci97YXV0aG9yfS97cGFnZX0nLFxuICAgICAgICBoYW5kbGVyOiBmdW5jdGlvbihyZXF1ZXN0LCByZXBseSkge1xuICAgICAgICAgICAgUHJvZHVjdHNTZXJ2aWNlLmdldFByb2R1Y3RzQnlBdXRob3IoXG4gICAgICAgICAgICAgICAgcmVxdWVzdC5wYXJhbXMuYXV0aG9yKVxuICAgICAgICAgICAgLnRoZW4oKGRhdGE6IEFycmF5PGFueT4pID0+IHtcbiAgICAgICAgICAgICAgICByZXBseShkYXRhKTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgIH0sXG4gICAgICAgIGNvbmZpZzoge1xuICAgICAgICAgICAgdmFsaWRhdGU6IHtcbiAgICAgICAgICAgICAgICBxdWVyeToge1xuICAgICAgICAgICAgICAgICAgICBhdXRob3I6IEpvaS5zdHJpbmcoKSxcbiAgICAgICAgICAgICAgICAgICAgcGFnZTogSm9pLm51bWJlcigpLmludGVnZXIoKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogJ1JldHJpZXZlIFByb2R1Y3RzIGZyb20gbWF0Y2hlZCBBdXRob3InLFxuICAgICAgICAgICAgdGFnczogWydwcm9kdWN0cyddXG4gICAgICAgIH1cbiAgICB9LFxuICAgIHtcbiAgICAgICAgbWV0aG9kOiAnR0VUJyxcbiAgICAgICAgcGF0aDogX3ByZWZpeCArICcvYnlzY2hvb2wve3NjaG9vbH0ve3BhZ2V9JyxcbiAgICAgICAgaGFuZGxlcjogZnVuY3Rpb24ocmVxdWVzdCwgcmVwbHkpIHtcbiAgICAgICAgICAgIFByb2R1Y3RzU2VydmljZS5nZXRQcm9kdWN0c0J5U2Nob29sKFxuICAgICAgICAgICAgICAgIHJlcXVlc3QucGFyYW1zLnNjaG9vbCxcbiAgICAgICAgICAgICAgICByZXF1ZXN0LnBhcmFtcy5wYWdlIHx8IDEpXG4gICAgICAgICAgICAgICAgLnRoZW4oKGRhdGE6IEFycmF5PGFueT4pID0+IHtcbiAgICAgICAgICAgICAgICAgICAgcmVwbHkoZGF0YSk7XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgfSxcbiAgICAgICAgY29uZmlnOiB7XG4gICAgICAgICAgICB2YWxpZGF0ZToge1xuICAgICAgICAgICAgICAgIHF1ZXJ5OiB7XG4gICAgICAgICAgICAgICAgICAgIHNjaG9vbDogSm9pLnN0cmluZygpLFxuICAgICAgICAgICAgICAgICAgICBwYWdlOiBKb2kubnVtYmVyKCkuaW50ZWdlcigpXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiAnUmV0cmlldmUgUHJvZHVjdHMgZnJvbSBtYXRjaGVkIFNjaG9vbCcsXG4gICAgICAgICAgICB0YWdzOiBbJ3Byb2R1Y3RzJ11cbiAgICAgICAgfVxuICAgIH0sXG4gICAge1xuICAgICAgICBtZXRob2Q6ICdHRVQnLFxuICAgICAgICBwYXRoOiBfcHJlZml4ICsgJy9ieXN1YmNhdGVnb3J5MC97c3ViY2F0ZWdvcnkwfS97cGFnZX0nLFxuICAgICAgICBoYW5kbGVyOiBmdW5jdGlvbihyZXF1ZXN0LCByZXBseSkge1xuICAgICAgICAgICAgUHJvZHVjdHNTZXJ2aWNlLmdldFByb2R1Y3RzQnlTdWJjYXRlZ29yeTAoXG4gICAgICAgICAgICAgICAgcmVxdWVzdC5wYXJhbXMuc3ViY2F0ZWdvcnkwLFxuICAgICAgICAgICAgICAgIHJlcXVlc3QucGFyYW1zLnBhZ2UgfHwgMSlcbiAgICAgICAgICAgICAgICAudGhlbigoZGF0YTogQXJyYXk8YW55PikgPT4ge1xuICAgICAgICAgICAgICAgICAgICByZXBseShkYXRhKTtcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICB9LFxuICAgICAgICBjb25maWc6IHtcbiAgICAgICAgICAgIHZhbGlkYXRlOiB7XG4gICAgICAgICAgICAgICAgcXVlcnk6IHtcbiAgICAgICAgICAgICAgICAgICAgc3ViY2F0ZWdvcnkwOiBKb2kuc3RyaW5nKCksXG4gICAgICAgICAgICAgICAgICAgIHBhZ2U6IEpvaS5udW1iZXIoKS5pbnRlZ2VyKClcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZGVzY3JpcHRpb246ICdSZXRyaWV2ZSBQcm9kdWN0cyBmcm9tIG1hdGNoZWQgU3ViY2F0ZWdvcnkwJyxcbiAgICAgICAgICAgIHRhZ3M6IFsncHJvZHVjdHMnXVxuICAgICAgICB9XG4gICAgfSxcbiAgICB7XG4gICAgICAgIG1ldGhvZDogJ0dFVCcsXG4gICAgICAgIHBhdGg6IF9wcmVmaXggKyAnL2J5c3ViY2F0ZWdvcnkxL3tzdWJjYXRlZ29yeTF9L3twYWdlfScsXG4gICAgICAgIGhhbmRsZXI6IGZ1bmN0aW9uKHJlcXVlc3QsIHJlcGx5KSB7XG4gICAgICAgICAgICBQcm9kdWN0c1NlcnZpY2UuZ2V0UHJvZHVjdHNCeVN1YmNhdGVnb3J5MShcbiAgICAgICAgICAgICAgICByZXF1ZXN0LnBhcmFtcy5zdWJjYXRlZ29yeTEsXG4gICAgICAgICAgICAgICAgcmVxdWVzdC5wYXJhbXMucGFnZSB8fCAxKVxuICAgICAgICAgICAgICAgIC50aGVuKChkYXRhOiBBcnJheTxhbnk+KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHJlcGx5KGRhdGEpO1xuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgIH0sXG4gICAgICAgIGNvbmZpZzoge1xuICAgICAgICAgICAgdmFsaWRhdGU6IHtcbiAgICAgICAgICAgICAgICBxdWVyeToge1xuICAgICAgICAgICAgICAgICAgICBzdWJjYXRlZ29yeTE6IEpvaS5zdHJpbmcoKSxcbiAgICAgICAgICAgICAgICAgICAgcGFnZTogSm9pLm51bWJlcigpLmludGVnZXIoKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogJ1JldHJpZXZlIFByb2R1Y3RzIGZyb20gbWF0Y2hlZCBTdWJjYXRlZ29yeTEnLFxuICAgICAgICAgICAgdGFnczogWydwcm9kdWN0cyddXG4gICAgICAgIH1cbiAgICB9LFxuICAgIHtcbiAgICAgICAgbWV0aG9kOiAnR0VUJyxcbiAgICAgICAgcGF0aDogX3ByZWZpeCArICcvYnlzdHlsZS97c3R5bGV9L3twYWdlfScsXG4gICAgICAgIGhhbmRsZXI6IGZ1bmN0aW9uKHJlcXVlc3QsIHJlcGx5KSB7XG4gICAgICAgICAgICBQcm9kdWN0c1NlcnZpY2UuZ2V0UHJvZHVjdHNCeVN0eWxlKFxuICAgICAgICAgICAgICAgIHJlcXVlc3QucGFyYW1zLnN0eWxlLFxuICAgICAgICAgICAgICAgIHJlcXVlc3QucGFyYW1zLnBhZ2UgfHwgMSlcbiAgICAgICAgICAgICAgICAudGhlbigoZGF0YTogQXJyYXk8YW55PikgPT4ge1xuICAgICAgICAgICAgICAgICAgICByZXBseShkYXRhKTtcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICB9LFxuICAgICAgICBjb25maWc6IHtcbiAgICAgICAgICAgIHZhbGlkYXRlOiB7XG4gICAgICAgICAgICAgICAgcXVlcnk6IHtcbiAgICAgICAgICAgICAgICAgICAgc3R5bGU6IEpvaS5zdHJpbmcoKSxcbiAgICAgICAgICAgICAgICAgICAgcGFnZTogSm9pLm51bWJlcigpLmludGVnZXIoKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogJ1JldHJpZXZlIFByb2R1Y3RzIGZyb20gbWF0Y2hlZCBTdHlsZScsXG4gICAgICAgICAgICB0YWdzOiBbJ3Byb2R1Y3RzJ11cbiAgICAgICAgfVxuICAgIH0sXG4gICAge1xuICAgICAgICBtZXRob2Q6ICdHRVQnLFxuICAgICAgICBwYXRoOiBfcHJlZml4ICsgJy9ieXNleC97c2V4fS97cGFnZX0nLFxuICAgICAgICBoYW5kbGVyOiBmdW5jdGlvbihyZXF1ZXN0LCByZXBseSkge1xuICAgICAgICAgICAgUHJvZHVjdHNTZXJ2aWNlLmdldFByb2R1Y3RzQnlTZXgoXG4gICAgICAgICAgICAgICAgcmVxdWVzdC5wYXJhbXMuc2V4LFxuICAgICAgICAgICAgICAgIHJlcXVlc3QucGFyYW1zLnBhZ2UgfHwgMSlcbiAgICAgICAgICAgICAgICAudGhlbigoZGF0YTogQXJyYXk8YW55PikgPT4ge1xuICAgICAgICAgICAgICAgICAgICByZXBseShkYXRhKTtcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICB9LFxuICAgICAgICBjb25maWc6IHtcbiAgICAgICAgICAgIHZhbGlkYXRlOiB7XG4gICAgICAgICAgICAgICAgcXVlcnk6IHtcbiAgICAgICAgICAgICAgICAgICAgc2V4OiBKb2kuc3RyaW5nKCksXG4gICAgICAgICAgICAgICAgICAgIHBhZ2U6IEpvaS5udW1iZXIoKS5pbnRlZ2VyKClcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZGVzY3JpcHRpb246ICdSZXRyaWV2ZSBQcm9kdWN0cyBmcm9tIG1hdGNoZWQgU2V4JyxcbiAgICAgICAgICAgIHRhZ3M6IFsncHJvZHVjdHMnXVxuICAgICAgICB9XG4gICAgfSxcbiAgICB7XG4gICAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgICBwYXRoOiBfcHJlZml4ICsgJy9jcmVhdGUnLFxuICAgICAgICBoYW5kbGVyOiBmdW5jdGlvbihyZXF1ZXN0LCByZXBseSkge1xuICAgICAgICAgICAgUHJvZHVjdHNTZXJ2aWNlLmNyZWF0ZVByb2R1Y3QoXG4gICAgICAgICAgICAgICAgcmVxdWVzdC5wYXlsb2FkLmF1dGhvcklkLFxuICAgICAgICAgICAgICAgIHJlcXVlc3QucGF5bG9hZC50aXRsZSxcbiAgICAgICAgICAgICAgICByZXF1ZXN0LnBheWxvYWQuY29udGVudCxcbiAgICAgICAgICAgICAgICByZXF1ZXN0LnBheWxvYWQuaW1nLFxuICAgICAgICAgICAgICAgIHJlcXVlc3QucGF5bG9hZC5zdWJjYXRlZ29yeTAsXG4gICAgICAgICAgICAgICAgcmVxdWVzdC5wYXlsb2FkLnN1YmNhdGVnb3J5MSxcbiAgICAgICAgICAgICAgICByZXF1ZXN0LnBheWxvYWQuc3R5bGVzLFxuICAgICAgICAgICAgICAgIHJlcXVlc3QucGF5bG9hZC5zZXgsXG4gICAgICAgICAgICAgICAgcmVxdWVzdC5wYXlsb2FkLnN1YkltZzEsXG4gICAgICAgICAgICAgICAgcmVxdWVzdC5wYXlsb2FkLnN1YkltZzIsXG4gICAgICAgICAgICAgICAgcmVxdWVzdC5wYXlsb2FkLnN1YkltZzMsXG4gICAgICAgICAgICAgICAgcmVxdWVzdC5wYXlsb2FkLnN1YkltZzQsXG4gICAgICAgICAgICAgICAgcmVxdWVzdC5wYXlsb2FkLnN1YkltZzUsXG4gICAgICAgICAgICAgICAgcmVxdWVzdC5wYXlsb2FkLnN1YkltZzYsXG4gICAgICAgICAgICAgICAgcmVxdWVzdC5wYXlsb2FkLnByb2R1Y3Rpb25Db3N0LFxuICAgICAgICAgICAgICAgIHJlcXVlc3QucGF5bG9hZC5zZWxsLFxuICAgICAgICAgICAgICAgIHJlcXVlc3QucGF5bG9hZC5zZWxsUHJpY2UsXG4gICAgICAgICAgICAgICAgcmVxdWVzdC5wYXlsb2FkLlNlbGxOb3RlLFxuICAgICAgICAgICAgICAgIHJlcXVlc3QucGF5bG9hZC5yZW50YWwsXG4gICAgICAgICAgICAgICAgcmVxdWVzdC5wYXlsb2FkLnJlbnRhbFByaWNlLFxuICAgICAgICAgICAgICAgIHJlcXVlc3QucGF5bG9hZC5yZW50YWxOb3RlXG4gICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgLnRoZW4oKGRhdGEpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgcmVwbHkoZGF0YSk7XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgfSxcbiAgICAgICAgY29uZmlnOiB7XG4gICAgICAgICAgICB2YWxpZGF0ZToge1xuICAgICAgICAgICAgICAgIHF1ZXJ5OiB7XG4gICAgICAgICAgICAgICAgICAgIGF1dGhvcklkOiBKb2kubnVtYmVyKCkuaW50ZWdlcigpLFxuICAgICAgICAgICAgICAgICAgICB0aXRsZTogSm9pLnN0cmluZygpLFxuICAgICAgICAgICAgICAgICAgICBjb250ZW50OiBKb2kuc3RyaW5nKCksXG4gICAgICAgICAgICAgICAgICAgIGltZzogSm9pLnN0cmluZygpLFxuICAgICAgICAgICAgICAgICAgICBzdWJjYXRlZ29yeTA6IEpvaS5zdHJpbmcoKSxcbiAgICAgICAgICAgICAgICAgICAgc3ViY2F0ZWdvcnkxOiBKb2kuc3RyaW5nKCksXG4gICAgICAgICAgICAgICAgICAgIHN0eWxlczogSm9pLmFycmF5KCksXG4gICAgICAgICAgICAgICAgICAgIHNleDogSm9pLnN0cmluZygpLFxuICAgICAgICAgICAgICAgICAgICBzdWJJbWcxOiBKb2kuc3RyaW5nKCksXG4gICAgICAgICAgICAgICAgICAgIHN1YkltZzI6IEpvaS5zdHJpbmcoKSxcbiAgICAgICAgICAgICAgICAgICAgc3ViSW1nMzogSm9pLnN0cmluZygpLFxuICAgICAgICAgICAgICAgICAgICBzdWJJbWc0OiBKb2kuc3RyaW5nKCksXG4gICAgICAgICAgICAgICAgICAgIHN1YkltZzU6IEpvaS5zdHJpbmcoKSxcbiAgICAgICAgICAgICAgICAgICAgc3ViSW1nNjogSm9pLnN0cmluZygpLFxuICAgICAgICAgICAgICAgICAgICBwcm9kdWN0aW9uQ29zdDogSm9pLm51bWJlcigpLmludGVnZXIoKSxcbiAgICAgICAgICAgICAgICAgICAgc2VsbDogSm9pLnN0cmluZygpLFxuICAgICAgICAgICAgICAgICAgICBzZWxsUHJpY2U6IEpvaS5udW1iZXIoKS5pbnRlZ2VyKCksXG4gICAgICAgICAgICAgICAgICAgIHNlbGxOb3RlOiBKb2kuc3RyaW5nKCksXG4gICAgICAgICAgICAgICAgICAgIHJlbnRhbDogSm9pLnN0cmluZygpLFxuICAgICAgICAgICAgICAgICAgICByZW50YWxQcmljZTogSm9pLm51bWJlcigpLmludGVnZXIoKSxcbiAgICAgICAgICAgICAgICAgICAgcmVudGFsTm90ZTogSm9pLnN0cmluZygpXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiAnQ3JlYXRlIGEgbmV3IFByb2R1Y3QnLFxuICAgICAgICAgICAgdGFnczogWydwcm9kdWN0cyddXG4gICAgICAgIH1cbiAgICB9LFxuICAgIHtcbiAgICAgICAgbWV0aG9kOiAnUFVUJyxcbiAgICAgICAgcGF0aDogX3ByZWZpeCArICcvdXBkYXRlJyxcbiAgICAgICAgaGFuZGxlcjogZnVuY3Rpb24ocmVxdWVzdCwgcmVwbHkpIHtcbiAgICAgICAgICAgIFByb2R1Y3RzU2VydmljZS5jcmVhdGVQcm9kdWN0KFxuICAgICAgICAgICAgICAgIHJlcXVlc3QucGF5bG9hZC5wcm9kdWN0SWQsXG4gICAgICAgICAgICAgICAgcmVxdWVzdC5wYXlsb2FkLnRpdGxlLFxuICAgICAgICAgICAgICAgIHJlcXVlc3QucGF5bG9hZC5jb250ZW50LFxuICAgICAgICAgICAgICAgIHJlcXVlc3QucGF5bG9hZC5pbWcsXG4gICAgICAgICAgICAgICAgcmVxdWVzdC5wYXlsb2FkLnN1YmNhdGVnb3J5MCxcbiAgICAgICAgICAgICAgICByZXF1ZXN0LnBheWxvYWQuc3ViY2F0ZWdvcnkxLFxuICAgICAgICAgICAgICAgIHJlcXVlc3QucGF5bG9hZC5zdHlsZXMsXG4gICAgICAgICAgICAgICAgcmVxdWVzdC5wYXlsb2FkLnNleCxcbiAgICAgICAgICAgICAgICByZXF1ZXN0LnBheWxvYWQuc3ViSW1nMSxcbiAgICAgICAgICAgICAgICByZXF1ZXN0LnBheWxvYWQuc3ViSW1nMixcbiAgICAgICAgICAgICAgICByZXF1ZXN0LnBheWxvYWQuc3ViSW1nMyxcbiAgICAgICAgICAgICAgICByZXF1ZXN0LnBheWxvYWQuc3ViSW1nNCxcbiAgICAgICAgICAgICAgICByZXF1ZXN0LnBheWxvYWQuc3ViSW1nNSxcbiAgICAgICAgICAgICAgICByZXF1ZXN0LnBheWxvYWQuc3ViSW1nNixcbiAgICAgICAgICAgICAgICByZXF1ZXN0LnBheWxvYWQucHJvZHVjdGlvbkNvc3QsXG4gICAgICAgICAgICAgICAgcmVxdWVzdC5wYXlsb2FkLnNlbGwsXG4gICAgICAgICAgICAgICAgcmVxdWVzdC5wYXlsb2FkLnNlbGxQcmljZSxcbiAgICAgICAgICAgICAgICByZXF1ZXN0LnBheWxvYWQuU2VsbE5vdGUsXG4gICAgICAgICAgICAgICAgcmVxdWVzdC5wYXlsb2FkLnJlbnRhbCxcbiAgICAgICAgICAgICAgICByZXF1ZXN0LnBheWxvYWQucmVudGFsUHJpY2UsXG4gICAgICAgICAgICAgICAgcmVxdWVzdC5wYXlsb2FkLnJlbnRhbE5vdGVcbiAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAudGhlbigoZGF0YSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICByZXBseShkYXRhKTtcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICB9LFxuICAgICAgICBjb25maWc6IHtcbiAgICAgICAgICAgIHZhbGlkYXRlOiB7XG4gICAgICAgICAgICAgICAgcXVlcnk6IHtcbiAgICAgICAgICAgICAgICAgICAgcHJvZHVjdElkOiBKb2kubnVtYmVyKCkuaW50ZWdlcigpLFxuICAgICAgICAgICAgICAgICAgICB0aXRsZTogSm9pLnN0cmluZygpLFxuICAgICAgICAgICAgICAgICAgICBjb250ZW50OiBKb2kuc3RyaW5nKCksXG4gICAgICAgICAgICAgICAgICAgIGltZzogSm9pLnN0cmluZygpLFxuICAgICAgICAgICAgICAgICAgICBzdWJjYXRlZ29yeTA6IEpvaS5zdHJpbmcoKSxcbiAgICAgICAgICAgICAgICAgICAgc3ViY2F0ZWdvcnkxOiBKb2kuc3RyaW5nKCksXG4gICAgICAgICAgICAgICAgICAgIHN0eWxlczogSm9pLmFycmF5KCksXG4gICAgICAgICAgICAgICAgICAgIHNleDogSm9pLnN0cmluZygpLFxuICAgICAgICAgICAgICAgICAgICBzdWJJbWcxOiBKb2kuc3RyaW5nKCksXG4gICAgICAgICAgICAgICAgICAgIHN1YkltZzI6IEpvaS5zdHJpbmcoKSxcbiAgICAgICAgICAgICAgICAgICAgc3ViSW1nMzogSm9pLnN0cmluZygpLFxuICAgICAgICAgICAgICAgICAgICBzdWJJbWc0OiBKb2kuc3RyaW5nKCksXG4gICAgICAgICAgICAgICAgICAgIHN1YkltZzU6IEpvaS5zdHJpbmcoKSxcbiAgICAgICAgICAgICAgICAgICAgc3ViSW1nNjogSm9pLnN0cmluZygpLFxuICAgICAgICAgICAgICAgICAgICBwcm9kdWN0aW9uQ29zdDogSm9pLm51bWJlcigpLmludGVnZXIoKSxcbiAgICAgICAgICAgICAgICAgICAgc2VsbDogSm9pLnN0cmluZygpLFxuICAgICAgICAgICAgICAgICAgICBzZWxsUHJpY2U6IEpvaS5udW1iZXIoKS5pbnRlZ2VyKCksXG4gICAgICAgICAgICAgICAgICAgIHNlbGxOb3RlOiBKb2kuc3RyaW5nKCksXG4gICAgICAgICAgICAgICAgICAgIHJlbnRhbDogSm9pLnN0cmluZygpLFxuICAgICAgICAgICAgICAgICAgICByZW50YWxQcmljZTogSm9pLm51bWJlcigpLmludGVnZXIoKSxcbiAgICAgICAgICAgICAgICAgICAgcmVudGFsTm90ZTogSm9pLnN0cmluZygpXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiAnVXBkYXRlIGEgUHJvZHVjdCcsXG4gICAgICAgICAgICB0YWdzOiBbJ3Byb2R1Y3RzJ11cbiAgICAgICAgfVxuICAgIH0sXG4gICAge1xuICAgICAgICBtZXRob2Q6ICdERUxFVEUnLFxuICAgICAgICBwYXRoOiBfcHJlZml4ICsgJy9kZWxldGUnLFxuICAgICAgICBoYW5kbGVyOiBmdW5jdGlvbihyZXF1ZXN0LCByZXBseSkge1xuICAgICAgICAgICAgUHJvZHVjdHNTZXJ2aWNlLmRlbGV0ZVByb2R1Y3QoXG4gICAgICAgICAgICAgICAgcmVxdWVzdC5wYXlsb2FkLm5vbmNlLFxuICAgICAgICAgICAgICAgIHJlcXVlc3QucGF5bG9hZC5wcm9kdWN0SWQpXG4gICAgICAgICAgICAgICAgLnRoZW4oKGRhdGEpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgcmVwbHkoZGF0YSk7XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgfSxcbiAgICAgICAgY29uZmlnOiB7XG4gICAgICAgICAgICB2YWxpZGF0ZToge1xuICAgICAgICAgICAgICAgIHF1ZXJ5OiB7XG4gICAgICAgICAgICAgICAgICAgIG5vbmNlOiBKb2kuc3RyaW5nKCksXG4gICAgICAgICAgICAgICAgICAgIHByb2R1Y3RJZDogSm9pLm51bWJlcigpLmludGVnZXIoKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogJ0RlbGV0ZSBhIFByb2R1Y3QnLFxuICAgICAgICAgICAgdGFnczogWydwcm9kdWN0cyddXG4gICAgICAgIH1cbiAgICB9LFxuICAgIHtcbiAgICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICAgIHBhdGg6IF9wcmVmaXggKyAnL2NvbW1lbnRzL2NyZWF0ZScsXG4gICAgICAgIGhhbmRsZXI6IGZ1bmN0aW9uKHJlcXVlc3QsIHJlcGx5KSB7XG4gICAgICAgICAgICBQcm9kdWN0c1NlcnZpY2UuY3JlYXRlQ29tbWVudChcbiAgICAgICAgICAgICAgICByZXF1ZXN0LnBheWxvYWQucHJvZHVjdElkLFxuICAgICAgICAgICAgICAgIHJlcXVlc3QucGF5bG9hZC5jb29raWUsXG4gICAgICAgICAgICAgICAgcmVxdWVzdC5wYXlsb2FkLmNvbnRlbnQpXG4gICAgICAgICAgICAgICAgLnRoZW4oKGRhdGEpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgcmVwbHkoZGF0YSk7XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgfSxcbiAgICAgICAgY29uZmlnOiB7XG4gICAgICAgICAgICB2YWxpZGF0ZToge1xuICAgICAgICAgICAgICAgIHF1ZXJ5OiB7XG4gICAgICAgICAgICAgICAgICAgIHByb2R1Y3RJZDogSm9pLm51bWJlcigpLmludGVnZXIoKSxcbiAgICAgICAgICAgICAgICAgICAgY29va2llOiBKb2kuc3RyaW5nKCksXG4gICAgICAgICAgICAgICAgICAgIGNvbnRlbnQ6IEpvaS5zdHJpbmcoKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogJ0NyZWF0ZSBhIG5ldyBDb21tZW50JyxcbiAgICAgICAgICAgIHRhZ3M6IFsncHJvZHVjdHMnXVxuICAgICAgICB9XG4gICAgfSxcbiAgICB7XG4gICAgICAgIG1ldGhvZDogJ0dFVCcsXG4gICAgICAgIHBhdGg6IF9wcmVmaXggKyAnL3NlYXJjaC97c2VhcmNofS97cGFnZX0nLFxuICAgICAgICBoYW5kbGVyOiBmdW5jdGlvbihyZXF1ZXN0LCByZXBseSkge1xuICAgICAgICAgICAgUHJvZHVjdHNTZXJ2aWNlLmdldFByb2R1Y3RzQnlTZWFyY2goXG4gICAgICAgICAgICAgICAgcmVxdWVzdC5wYXJhbXMuc2VhcmNoLFxuICAgICAgICAgICAgICAgIHJlcXVlc3QucGFyYW1zLnBhZ2UgfHwgMSlcbiAgICAgICAgICAgICAgICAudGhlbigoZGF0YTogQXJyYXk8YW55PikgPT4ge1xuICAgICAgICAgICAgICAgICAgICByZXBseShkYXRhKTtcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICB9LFxuICAgICAgICBjb25maWc6IHtcbiAgICAgICAgICAgIHZhbGlkYXRlOiB7XG4gICAgICAgICAgICAgICAgcXVlcnk6IHtcbiAgICAgICAgICAgICAgICAgICAgc2VhcmNoOiBKb2kuc3RyaW5nKCksXG4gICAgICAgICAgICAgICAgICAgIHBhZ2U6IEpvaS5udW1iZXIoKS5pbnRlZ2VyKClcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZGVzY3JpcHRpb246ICdSZXRyaWV2ZSBQcm9kdWN0cyBmcm9tIG1hdGNoZWQgU2VhcmNoIHN0cmluZycsXG4gICAgICAgICAgICB0YWdzOiBbJ3Byb2R1Y3RzJ11cbiAgICAgICAgfVxuICAgIH0sXG4gICAge1xuICAgICAgICBtZXRob2Q6ICdHRVQnLFxuICAgICAgICBwYXRoOiBfcHJlZml4ICsgJy9zZWFyY2hPcHRpb25zL3tzZWFyY2h9L3tzdWJjYXRlZ29yeTB9L3tzdWJjYXRlZ29yeTF9L3tzdHlsZX0ve3NleH0nLFxuICAgICAgICBoYW5kbGVyOiBmdW5jdGlvbihyZXF1ZXN0LCByZXBseSkge1xuICAgICAgICAgICAgUHJvZHVjdHNTZXJ2aWNlLmdldFByb2R1Y3RzQnlPcHRpb25zU2VhcmNoKFxuICAgICAgICAgICAgICAgIHJlcXVlc3QucGFyYW1zLnNlYXJjaCxcbiAgICAgICAgICAgICAgICByZXF1ZXN0LnBhcmFtcy5zdWJjYXRlZ29yeTAsXG4gICAgICAgICAgICAgICAgcmVxdWVzdC5wYXJhbXMuc3ViY2F0ZWdvcnkxLFxuICAgICAgICAgICAgICAgIHJlcXVlc3QucGFyYW1zLnN0eWxlLFxuICAgICAgICAgICAgICAgIHJlcXVlc3QucGFyYW1zLnNleClcbiAgICAgICAgICAgICAgICAudGhlbigoZGF0YTogQXJyYXk8YW55PikgPT4ge1xuICAgICAgICAgICAgICAgICAgICByZXBseSggeyBwcm9kdWN0czogZGF0YSB9KTtcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICB9LFxuICAgICAgICBjb25maWc6IHtcbiAgICAgICAgICAgIHZhbGlkYXRlOiB7XG4gICAgICAgICAgICAgICAgcXVlcnk6IHtcbiAgICAgICAgICAgICAgICAgICAgc2VhcmNoOiBKb2kuc3RyaW5nKCksXG4gICAgICAgICAgICAgICAgICAgIHN1YmNhdGVnb3J5MDogSm9pLnN0cmluZygpLFxuICAgICAgICAgICAgICAgICAgICBzdWJjYXRlZ29yeTE6IEpvaS5zdHJpbmcoKSxcbiAgICAgICAgICAgICAgICAgICAgc3R5bGU6IEpvaS5zdHJpbmcoKSxcbiAgICAgICAgICAgICAgICAgICAgc2V4OiBKb2kuc3RyaW5nKClcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZGVzY3JpcHRpb246ICdSZXRyaWV2ZSBQcm9kdWN0cyBmcm9tIG1hdGNoZWQgU2VhcmNoIG9wdGlvbnMnLFxuICAgICAgICAgICAgdGFnczogWydwcm9kdWN0cyddLFxuICAgICAgICAgICAgbm90ZXM6IFtcbiAgICAgICAgICAgICAgICBcIlNldCBwYXJhbWV0ZXIgdmFsdWUgJ251bGwnIHRvIHNraXAgYW55IHBhcmFtZXRlciBzZWFyY2hcIlxuICAgICAgICAgICAgXVxuICAgICAgICB9XG4gICAgfSxcbiAgICB7XG4gICAgICAgIG1ldGhvZDogJ0dFVCcsXG4gICAgICAgIHBhdGg6IF9wcmVmaXggKyAnL3JhbmtpbmcvbGlrZXMnLFxuICAgICAgICBoYW5kbGVyOiBmdW5jdGlvbihyZXF1ZXN0LCByZXBseSkge1xuICAgICAgICAgICAgUHJvZHVjdHNTZXJ2aWNlLmdldFByb2R1Y3RzUmFua2luZ0J5TGlrZXMoKVxuICAgICAgICAgICAgICAgIC50aGVuKChkYXRhOiBBcnJheTxhbnk+KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHJlcGx5KHtwb3N0czogZGF0YSB9KTtcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICB9LFxuICAgICAgICBjb25maWc6IHtcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiAnUmV0cmlldmUgUHJvZHVjdHMgUmFua2luZyBieSBMaWtlcycsXG4gICAgICAgICAgICB0YWdzOiBbJ3Byb2R1Y3RzJ11cbiAgICAgICAgfVxuICAgIH0sXG4gICAge1xuICAgICAgICBtZXRob2Q6ICdHRVQnLFxuICAgICAgICBwYXRoOiBfcHJlZml4ICsgJy9yYW5raW5nL3Zpc2l0cycsXG4gICAgICAgIGhhbmRsZXI6IGZ1bmN0aW9uKHJlcXVlc3QsIHJlcGx5KSB7XG4gICAgICAgICAgICBQcm9kdWN0c1NlcnZpY2UuZ2V0UHJvZHVjdHNSYW5raW5nQnlWaXNpdHMoKVxuICAgICAgICAgICAgICAgIC50aGVuKChkYXRhOiBBcnJheTxhbnk+KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHJlcGx5KHsgcHJvZHVjdHM6IGRhdGEgfSk7XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgfSxcbiAgICAgICAgY29uZmlnOiB7XG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogJ1JldHJpZXZlIFByb2R1Y3RzIFJhbmtpbmcgYnkgVmlzaXRzJyxcbiAgICAgICAgICAgIHRhZ3M6IFsncHJvZHVjdHMnXVxuICAgICAgICB9XG4gICAgfSxcbiAgICB7XG4gICAgICAgIG1ldGhvZDogJ0dFVCcsXG4gICAgICAgIHBhdGg6IF9wcmVmaXggKyAnL3Rlc3QxJyxcbiAgICAgICAgaGFuZGxlcjogZnVuY3Rpb24ocmVxdWVzdCwgcmVwbHkpIHtcbiAgICAgICAgICAgIFByb2R1Y3RzU2VydmljZS50ZXN0MVByb2R1Y3RMaXN0KClcbiAgICAgICAgICAgICAgICAudGhlbigoZGF0YSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICByZXBseSh7IHByb2R1Y3RzOiBkYXRhIH0pO1xuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgIH0sXG4gICAgICAgIGNvbmZpZzoge1xuICAgICAgICAgICAgZGVzY3JpcHRpb246ICdSZXRyaWV2ZSBQcm9kdWN0cycsXG4gICAgICAgICAgICB0YWdzOiBbJ3Byb2R1Y3RzJ11cbiAgICAgICAgfVxuICAgIH0sXG4gICAge1xuICAgICAgICBtZXRob2Q6ICdHRVQnLFxuICAgICAgICBwYXRoOiBfcHJlZml4ICsgJy90ZXN0MicsXG4gICAgICAgIGhhbmRsZXI6IGZ1bmN0aW9uKHJlcXVlc3QsIHJlcGx5KSB7XG4gICAgICAgICAgICBQcm9kdWN0c1NlcnZpY2UudGVzdDJQcm9kdWN0TGlzdCgpXG4gICAgICAgICAgICAgICAgLnRoZW4oKGRhdGEpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgcmVwbHkoeyBwcm9kdWN0czogZGF0YSB9KTtcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICB9LFxuICAgICAgICBjb25maWc6IHtcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiAnUmV0cmlldmUgUHJvZHVjdHMnLFxuICAgICAgICAgICAgdGFnczogWydwcm9kdWN0cyddXG4gICAgICAgIH1cbiAgICB9XG5dXG5cblxubW9kdWxlLmV4cG9ydHMgPSBwcm9kdWN0cztcbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==