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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1vZHVsZXMvcHJvZHVjdHMvcHJvZHVjdHMucm91dGVzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLFlBQVksQ0FBQztBQUViLEFBSUEsa0RBSmtEO0FBQ2xELDhDQUE4QztBQUc5QyxJQUFPLE9BQU8sV0FBVyxvQkFBb0IsQ0FBQyxDQUFDO0FBRS9DLElBQUksZUFBZSxHQUFHLElBQUksT0FBTyxDQUFDLGVBQWUsRUFBRSxDQUFDO0FBQ3BELElBQUksT0FBTyxHQUFHLFdBQVcsQ0FBQztBQUMxQixJQUFJLFFBQVEsR0FBRztJQUNkO1FBQ0EsTUFBTSxFQUFFLEtBQUs7UUFDYixJQUFJLEVBQUUsT0FBTyxHQUFHLE9BQU87UUFDdkIsT0FBTyxFQUFFLFVBQVMsT0FBTyxFQUFFLEtBQUs7WUFDL0IsZUFBZSxDQUFDLGVBQWUsRUFBRSxDQUFDLElBQUksQ0FBQyxVQUFDLElBQWdCO2dCQUN0RCxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDYixDQUFDLENBQUMsQ0FBQTtRQUNILENBQUM7S0FDRDtJQUNEO1FBQ0EsTUFBTSxFQUFFLEtBQUs7UUFDYixJQUFJLEVBQUUsT0FBTyxHQUFHLHNCQUFzQjtRQUN0QyxPQUFPLEVBQUUsVUFBUyxPQUFPLEVBQUUsS0FBSztZQUMvQixlQUFlLENBQUMsY0FBYyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQUMsSUFBSTtnQkFDakUsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ2IsQ0FBQyxDQUFDLENBQUE7UUFDSCxDQUFDO0tBQ0Q7Q0FDRCxDQUFBO0FBR0QsTUFBTSxDQUFDLE9BQU8sR0FBRyxRQUFRLENBQUMiLCJmaWxlIjoibW9kdWxlcy9wcm9kdWN0cy9wcm9kdWN0cy5yb3V0ZXMuanMiLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCc7XHJcblxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPVwiLi4vLi4vLi4vdHlwaW5ncy90c2QuZC50c1wiIC8+XHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9XCIuL3Byb2R1Y3RzLnNlcnZpY2UudHNcIiAvPlxyXG5cclxuXHJcbmltcG9ydCBzZXJ2aWNlID0gcmVxdWlyZSgnLi9wcm9kdWN0cy5zZXJ2aWNlJyk7XHJcblxyXG52YXIgUHJvZHVjdHNTZXJ2aWNlID0gbmV3IHNlcnZpY2UuUHJvZHVjdHNTZXJ2aWNlKCk7XHJcbnZhciBfcHJlZml4ID0gJy9wcm9kdWN0cyc7XHJcbnZhciBwcm9kdWN0cyA9IFtcclxuXHR7XHJcblx0bWV0aG9kOiAnR0VUJyxcclxuXHRwYXRoOiBfcHJlZml4ICsgJy9saXN0JyxcclxuXHRoYW5kbGVyOiBmdW5jdGlvbihyZXF1ZXN0LCByZXBseSkge1xyXG5cdFx0UHJvZHVjdHNTZXJ2aWNlLmdldFByb2R1Y3RzTGlzdCgpLnRoZW4oKGRhdGE6IEFycmF5PGFueT4pID0+IHtcclxuXHRcdFx0XHRyZXBseShkYXRhKTtcclxuXHRcdFx0fSlcclxuXHRcdH1cclxuXHR9LFxyXG5cdHtcclxuXHRtZXRob2Q6ICdHRVQnLFxyXG5cdHBhdGg6IF9wcmVmaXggKyAnL3Byb2R1Y3Qve3Byb2R1Y3RJZH0nLFxyXG5cdGhhbmRsZXI6IGZ1bmN0aW9uKHJlcXVlc3QsIHJlcGx5KSB7XHJcblx0XHRQcm9kdWN0c1NlcnZpY2UuZ2V0UHJvZHVjdEJ5SWQocmVxdWVzdC5wYXJhbXMucHJvZHVjdElkKS50aGVuKChkYXRhKSA9PiB7XHJcblx0XHRcdFx0cmVwbHkoZGF0YSk7XHJcblx0XHRcdH0pXHJcblx0XHR9XHJcblx0fVxyXG5dXHJcblxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBwcm9kdWN0cztcclxuXHJcbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==