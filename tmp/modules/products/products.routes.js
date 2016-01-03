'use strict';
/// <reference path="../../../typings/tsd.d.ts" />
/// <reference path="./products.service.ts" />
var service = require('./products.service');
var ProductsService = new service.ProductsService();
var _prefix = '/products';
var products = [
    {
        method: 'GET',
        path: _prefix + '/list',
        handler: function (request, reply) {
            ProductsService.getProductsList().then(function (data) {
                reply(data);
            });
        },
        config: {
            description: 'Say hello'
        }
    },
    {
        method: 'GET',
        path: _prefix + '/product/{productId}',
        handler: function (request, reply) {
            ProductsService.getProductById(request.params.productId).then(function (data) {
                reply(data);
            });
        }
    },
    {
        method: 'GET',
        path: _prefix + '/byauthor/{authorId}',
        handler: function (request, reply) {
            ProductsService.getProductsByAuthor(request.params.authorId).then(function (data) {
                reply(data);
            });
        }
    }
];
module.exports = products;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1vZHVsZXMvcHJvZHVjdHMvcHJvZHVjdHMucm91dGVzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLFlBQVksQ0FBQztBQUViLEFBSUEsa0RBSmtEO0FBQ2xELDhDQUE4QztBQUc5QyxJQUFPLE9BQU8sV0FBVyxvQkFBb0IsQ0FBQyxDQUFDO0FBRS9DLElBQUksZUFBZSxHQUFHLElBQUksT0FBTyxDQUFDLGVBQWUsRUFBRSxDQUFDO0FBQ3BELElBQUksT0FBTyxHQUFHLFdBQVcsQ0FBQztBQUMxQixJQUFJLFFBQVEsR0FBRztJQUNYO1FBQ0ksTUFBTSxFQUFFLEtBQUs7UUFDYixJQUFJLEVBQUUsT0FBTyxHQUFHLE9BQU87UUFDdkIsT0FBTyxFQUFFLFVBQVMsT0FBTyxFQUFFLEtBQUs7WUFFNUIsZUFBZSxDQUFDLGVBQWUsRUFBRSxDQUFDLElBQUksQ0FBQyxVQUFDLElBQWdCO2dCQUNwRCxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDaEIsQ0FBQyxDQUFDLENBQUE7UUFDTixDQUFDO1FBQ0QsTUFBTSxFQUFFO1lBQ0osV0FBVyxFQUFFLFdBQVc7U0FDM0I7S0FDSjtJQUNEO1FBQ0ksTUFBTSxFQUFFLEtBQUs7UUFDYixJQUFJLEVBQUUsT0FBTyxHQUFHLHNCQUFzQjtRQUN0QyxPQUFPLEVBQUUsVUFBUyxPQUFPLEVBQUUsS0FBSztZQUM1QixlQUFlLENBQUMsY0FBYyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQUMsSUFBSTtnQkFDL0QsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ2hCLENBQUMsQ0FBQyxDQUFBO1FBQ04sQ0FBQztLQUNKO0lBQ0Q7UUFDSSxNQUFNLEVBQUUsS0FBSztRQUNiLElBQUksRUFBRSxPQUFPLEdBQUcsc0JBQXNCO1FBQ3RDLE9BQU8sRUFBRSxVQUFTLE9BQU8sRUFBRSxLQUFLO1lBQzVCLGVBQWUsQ0FBQyxtQkFBbUIsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFDLElBQUk7Z0JBQ25FLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUNoQixDQUFDLENBQUMsQ0FBQTtRQUNOLENBQUM7S0FDSjtDQUNKLENBQUE7QUFHRCxNQUFNLENBQUMsT0FBTyxHQUFHLFFBQVEsQ0FBQyIsImZpbGUiOiJtb2R1bGVzL3Byb2R1Y3RzL3Byb2R1Y3RzLnJvdXRlcy5qcyIsInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0JztcclxuXHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9XCIuLi8uLi8uLi90eXBpbmdzL3RzZC5kLnRzXCIgLz5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD1cIi4vcHJvZHVjdHMuc2VydmljZS50c1wiIC8+XHJcblxyXG5cclxuaW1wb3J0IHNlcnZpY2UgPSByZXF1aXJlKCcuL3Byb2R1Y3RzLnNlcnZpY2UnKTtcclxuXHJcbnZhciBQcm9kdWN0c1NlcnZpY2UgPSBuZXcgc2VydmljZS5Qcm9kdWN0c1NlcnZpY2UoKTtcclxudmFyIF9wcmVmaXggPSAnL3Byb2R1Y3RzJztcclxudmFyIHByb2R1Y3RzID0gW1xyXG4gICAge1xyXG4gICAgICAgIG1ldGhvZDogJ0dFVCcsXHJcbiAgICAgICAgcGF0aDogX3ByZWZpeCArICcvbGlzdCcsXHJcbiAgICAgICAgaGFuZGxlcjogZnVuY3Rpb24ocmVxdWVzdCwgcmVwbHkpIHtcclxuXHJcbiAgICAgICAgICAgIFByb2R1Y3RzU2VydmljZS5nZXRQcm9kdWN0c0xpc3QoKS50aGVuKChkYXRhOiBBcnJheTxhbnk+KSA9PiB7XHJcbiAgICAgICAgICAgICAgICByZXBseShkYXRhKTtcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9LFxyXG4gICAgICAgIGNvbmZpZzoge1xyXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogJ1NheSBoZWxsbydcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICAgIG1ldGhvZDogJ0dFVCcsXHJcbiAgICAgICAgcGF0aDogX3ByZWZpeCArICcvcHJvZHVjdC97cHJvZHVjdElkfScsXHJcbiAgICAgICAgaGFuZGxlcjogZnVuY3Rpb24ocmVxdWVzdCwgcmVwbHkpIHtcclxuICAgICAgICAgICAgUHJvZHVjdHNTZXJ2aWNlLmdldFByb2R1Y3RCeUlkKHJlcXVlc3QucGFyYW1zLnByb2R1Y3RJZCkudGhlbigoZGF0YSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgcmVwbHkoZGF0YSk7XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgICBtZXRob2Q6ICdHRVQnLFxyXG4gICAgICAgIHBhdGg6IF9wcmVmaXggKyAnL2J5YXV0aG9yL3thdXRob3JJZH0nLFxyXG4gICAgICAgIGhhbmRsZXI6IGZ1bmN0aW9uKHJlcXVlc3QsIHJlcGx5KSB7XHJcbiAgICAgICAgICAgIFByb2R1Y3RzU2VydmljZS5nZXRQcm9kdWN0c0J5QXV0aG9yKHJlcXVlc3QucGFyYW1zLmF1dGhvcklkKS50aGVuKChkYXRhKSA9PiB7XHJcbiAgICAgICAgICAgICAgICByZXBseShkYXRhKTtcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9XHJcbiAgICB9XHJcbl1cclxuXHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IHByb2R1Y3RzO1xyXG5cclxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9