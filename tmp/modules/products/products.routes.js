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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1vZHVsZXMvcHJvZHVjdHMvcHJvZHVjdHMucm91dGVzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLFlBQVksQ0FBQztBQUViLEFBSUEsa0RBSmtEO0FBQ2xELDhDQUE4QztBQUc5QyxJQUFPLE9BQU8sV0FBVyxvQkFBb0IsQ0FBQyxDQUFDO0FBRS9DLElBQUksZUFBZSxHQUFHLElBQUksT0FBTyxDQUFDLGVBQWUsRUFBRSxDQUFDO0FBQ3BELElBQUksT0FBTyxHQUFHLFdBQVcsQ0FBQztBQUMxQixJQUFJLFFBQVEsR0FBRztJQUNkO1FBQ0EsTUFBTSxFQUFFLEtBQUs7UUFDYixJQUFJLEVBQUUsT0FBTyxHQUFHLE9BQU87UUFDdkIsT0FBTyxFQUFFLFVBQVMsT0FBTyxFQUFFLEtBQUs7WUFDL0IsZUFBZSxDQUFDLGVBQWUsRUFBRSxDQUFDLElBQUksQ0FBQyxVQUFDLElBQUk7Z0JBQzFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUNiLENBQUMsQ0FBQyxDQUFBO1FBQ0gsQ0FBQztLQUNEO0lBQ0Q7UUFDQSxNQUFNLEVBQUUsS0FBSztRQUNiLElBQUksRUFBRSxPQUFPLEdBQUcsc0JBQXNCO1FBQ3RDLE9BQU8sRUFBRSxVQUFTLE9BQU8sRUFBRSxLQUFLO1lBQy9CLGVBQWUsQ0FBQyxjQUFjLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBQyxJQUFJO2dCQUNqRSxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDYixDQUFDLENBQUMsQ0FBQTtRQUNILENBQUM7S0FDRDtDQUNELENBQUE7QUFHRCxNQUFNLENBQUMsT0FBTyxHQUFHLFFBQVEsQ0FBQyIsImZpbGUiOiJtb2R1bGVzL3Byb2R1Y3RzL3Byb2R1Y3RzLnJvdXRlcy5qcyIsInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0JztcblxuLy8vIDxyZWZlcmVuY2UgcGF0aD1cIi4uLy4uLy4uL3R5cGluZ3MvdHNkLmQudHNcIiAvPlxuLy8vIDxyZWZlcmVuY2UgcGF0aD1cIi4vcHJvZHVjdHMuc2VydmljZS50c1wiIC8+XG5cblxuaW1wb3J0IHNlcnZpY2UgPSByZXF1aXJlKCcuL3Byb2R1Y3RzLnNlcnZpY2UnKTtcblxudmFyIFByb2R1Y3RzU2VydmljZSA9IG5ldyBzZXJ2aWNlLlByb2R1Y3RzU2VydmljZSgpO1xudmFyIF9wcmVmaXggPSAnL3Byb2R1Y3RzJztcbnZhciBwcm9kdWN0cyA9IFtcblx0e1xuXHRtZXRob2Q6ICdHRVQnLFxuXHRwYXRoOiBfcHJlZml4ICsgJy9saXN0Jyxcblx0aGFuZGxlcjogZnVuY3Rpb24ocmVxdWVzdCwgcmVwbHkpIHtcblx0XHRQcm9kdWN0c1NlcnZpY2UuZ2V0UHJvZHVjdHNMaXN0KCkudGhlbigoZGF0YSkgPT4ge1xuXHRcdFx0XHRyZXBseShkYXRhKTtcblx0XHRcdH0pXG5cdFx0fVxuXHR9LFxuXHR7XG5cdG1ldGhvZDogJ0dFVCcsXG5cdHBhdGg6IF9wcmVmaXggKyAnL3Byb2R1Y3Qve3Byb2R1Y3RJZH0nLFxuXHRoYW5kbGVyOiBmdW5jdGlvbihyZXF1ZXN0LCByZXBseSkge1xuXHRcdFByb2R1Y3RzU2VydmljZS5nZXRQcm9kdWN0QnlJZChyZXF1ZXN0LnBhcmFtcy5wcm9kdWN0SWQpLnRoZW4oKGRhdGEpID0+IHtcblx0XHRcdFx0cmVwbHkoZGF0YSk7XG5cdFx0XHR9KVxuXHRcdH1cblx0fVxuXVxuXG5cbm1vZHVsZS5leHBvcnRzID0gcHJvZHVjdHM7XG5cbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==