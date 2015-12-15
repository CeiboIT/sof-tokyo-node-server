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
    }
];
module.exports = products;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1vZHVsZXMvcHJvZHVjdHMvcHJvZHVjdHMucm91dGVzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLFlBQVksQ0FBQztBQUViLEFBSUEsa0RBSmtEO0FBQ2xELDhDQUE4QztBQUc5QyxJQUFPLE9BQU8sV0FBVyxvQkFBb0IsQ0FBQyxDQUFDO0FBRS9DLElBQUksZUFBZSxHQUFHLElBQUksT0FBTyxDQUFDLGVBQWUsRUFBRSxDQUFDO0FBQ3BELElBQUksT0FBTyxHQUFHLFdBQVcsQ0FBQztBQUMxQixJQUFJLFFBQVEsR0FBRztJQUNkO1FBQ0EsTUFBTSxFQUFFLEtBQUs7UUFDYixJQUFJLEVBQUUsT0FBTyxHQUFHLE9BQU87UUFDdkIsT0FBTyxFQUFFLFVBQVMsT0FBTyxFQUFFLEtBQUs7WUFDL0IsZUFBZSxDQUFDLGVBQWUsRUFBRSxDQUFDLElBQUksQ0FBQyxVQUFDLElBQUk7Z0JBQzFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUNiLENBQUMsQ0FBQyxDQUFBO1FBQ0gsQ0FBQztLQUNEO0lBQ0Q7UUFDQSxNQUFNLEVBQUUsS0FBSztRQUNiLElBQUksRUFBRSxPQUFPLEdBQUcsc0JBQXNCO1FBQ3RDLE9BQU8sRUFBRSxVQUFTLE9BQU8sRUFBRSxLQUFLO1lBQy9CLGVBQWUsQ0FBQyxjQUFjLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBQyxJQUFJO2dCQUNqRSxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDYixDQUFDLENBQUMsQ0FBQTtRQUNILENBQUM7S0FDRDtDQUNELENBQUE7QUFHRCxNQUFNLENBQUMsT0FBTyxHQUFHLFFBQVEsQ0FBQyIsImZpbGUiOiJtb2R1bGVzL3Byb2R1Y3RzL3Byb2R1Y3RzLnJvdXRlcy5qcyIsInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0JztcclxuXHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9XCIuLi8uLi8uLi90eXBpbmdzL3RzZC5kLnRzXCIgLz5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD1cIi4vcHJvZHVjdHMuc2VydmljZS50c1wiIC8+XHJcblxyXG5cclxuaW1wb3J0IHNlcnZpY2UgPSByZXF1aXJlKCcuL3Byb2R1Y3RzLnNlcnZpY2UnKTtcclxuXHJcbnZhciBQcm9kdWN0c1NlcnZpY2UgPSBuZXcgc2VydmljZS5Qcm9kdWN0c1NlcnZpY2UoKTtcclxudmFyIF9wcmVmaXggPSAnL3Byb2R1Y3RzJztcclxudmFyIHByb2R1Y3RzID0gW1xyXG5cdHtcclxuXHRtZXRob2Q6ICdHRVQnLFxyXG5cdHBhdGg6IF9wcmVmaXggKyAnL2xpc3QnLFxyXG5cdGhhbmRsZXI6IGZ1bmN0aW9uKHJlcXVlc3QsIHJlcGx5KSB7XHJcblx0XHRQcm9kdWN0c1NlcnZpY2UuZ2V0UHJvZHVjdHNMaXN0KCkudGhlbigoZGF0YSkgPT4ge1xyXG5cdFx0XHRcdHJlcGx5KGRhdGEpOyBcdFxyXG5cdFx0XHR9KVxyXG5cdFx0fVxyXG5cdH0sXHJcblx0e1xyXG5cdG1ldGhvZDogJ0dFVCcsXHJcblx0cGF0aDogX3ByZWZpeCArICcvcHJvZHVjdC97cHJvZHVjdElkfScsXHJcblx0aGFuZGxlcjogZnVuY3Rpb24ocmVxdWVzdCwgcmVwbHkpIHtcclxuXHRcdFByb2R1Y3RzU2VydmljZS5nZXRQcm9kdWN0QnlJZChyZXF1ZXN0LnBhcmFtcy5wcm9kdWN0SWQpLnRoZW4oKGRhdGEpID0+IHtcclxuXHRcdFx0XHRyZXBseShkYXRhKTsgXHRcclxuXHRcdFx0fSlcclxuXHRcdH1cclxuXHR9XHJcbl1cclxuXHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IHByb2R1Y3RzO1xyXG5cclxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9