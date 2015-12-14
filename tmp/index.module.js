///<reference path='../../../typings/tsd.d.ts' />
'use strict';
var mysql = require("mysql");
var ConnectionService = (function () {
    function ConnectionService() {
        var _dbConfig = {
            host: 'localhost',
            user: 'root',
            password: '',
            database: 'sof_tokyo',
            debug: false,
            insecureAuth: true
        };
        this.connection = mysql.createConnection(_dbConfig);
    }
    ConnectionService.prototype.getConnection = function () {
        return this.connection;
    };
    return ConnectionService;
})();
exports.ConnectionService = ConnectionService;
exports.service = new ConnectionService();

/// <reference path="../../../typings/tsd.d.ts" />
/// <reference path="../connection/connection.service.ts" />
var connection = require('../connection/connection.service');
var ProductsService = (function () {
    function ProductsService() {
        this.db = connection.service.getConnection();
    }
    ProductsService.prototype.getProductsList = function () {
        var _this = this;
        this.db.connect(function () {
            _this.db.query('SELECT * from wp2_posts', function (err, rows) {
                console.log(rows);
            });
        });
    };
    return ProductsService;
})();
exports.ProductsService = ProductsService;
exports.service = new ProductsService();

///<reference path='../typings/hapi/hapi.d.ts' />
'use strict';
var hapi = require("hapi");
var ProductsService = require("./modules/products/products.service");
var ServerService = (function () {
    function ServerService() {
        this.server = new hapi.Server();
        this.server.route({
            method: 'GET',
            path: '/',
            handler: ProductsService.service.getProductsList()
        });
    }
    ServerService.prototype.startServer = function () {
        this.server.start(function () {
            console.log('Started');
        });
    };
    return ServerService;
})();
var start = new ServerService();
start.startServer();



//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1vZHVsZXMvY29ubmVjdGlvbi9jb25uZWN0aW9uLnNlcnZpY2UudHMiLCJtb2R1bGVzL3Byb2R1Y3RzL3Byb2R1Y3RzLnNlcnZpY2UudHMiLCJpbmRleC50cyIsIm1vZHVsZXMvcHJvZHVjdHMvcHJvZHVjdHMubW9kdWxlLnRzIl0sIm5hbWVzIjpbIkNvbm5lY3Rpb25TZXJ2aWNlIiwiQ29ubmVjdGlvblNlcnZpY2UuY29uc3RydWN0b3IiLCJDb25uZWN0aW9uU2VydmljZS5nZXRDb25uZWN0aW9uIiwiUHJvZHVjdHNTZXJ2aWNlIiwiUHJvZHVjdHNTZXJ2aWNlLmNvbnN0cnVjdG9yIiwiUHJvZHVjdHNTZXJ2aWNlLmdldFByb2R1Y3RzTGlzdCIsIlNlcnZlclNlcnZpY2UiLCJTZXJ2ZXJTZXJ2aWNlLmNvbnN0cnVjdG9yIiwiU2VydmVyU2VydmljZS5zdGFydFNlcnZlciJdLCJtYXBwaW5ncyI6IkFBQUEsQUFDQSxpREFEaUQ7QUFDakQsWUFBWSxDQUFDO0FBRWIsSUFBTyxLQUFLLFdBQVcsT0FBTyxDQUFDLENBQUM7QUFFaEMsSUFBYSxpQkFBaUI7SUFJNUJBLFNBSldBLGlCQUFpQkE7UUFLM0JDLElBQUlBLFNBQVNBLEdBQ2JBO1lBQ0NBLElBQUlBLEVBQU9BLFdBQVdBO1lBQ3RCQSxJQUFJQSxFQUFPQSxNQUFNQTtZQUNqQkEsUUFBUUEsRUFBR0EsRUFBRUE7WUFDYkEsUUFBUUEsRUFBR0EsV0FBV0E7WUFDdEJBLEtBQUtBLEVBQU9BLEtBQUtBO1lBQ2pCQSxZQUFZQSxFQUFFQSxJQUFJQTtTQUNsQkEsQ0FBQ0E7UUFFRkEsSUFBSUEsQ0FBQ0EsVUFBVUEsR0FBR0EsS0FBS0EsQ0FBQ0EsZ0JBQWdCQSxDQUFDQSxTQUFTQSxDQUFDQSxDQUFDQTtJQUNyREEsQ0FBQ0E7SUFFREQseUNBQWFBLEdBQWJBO1FBQ0NFLE1BQU1BLENBQUNBLElBQUlBLENBQUNBLFVBQVVBLENBQUNBO0lBQ3hCQSxDQUFDQTtJQUdGRix3QkFBQ0E7QUFBREEsQ0F2QkQsQUF1QkVBLElBQUE7QUF2QlcseUJBQWlCLEdBQWpCLGlCQXVCWCxDQUFBO0FBRVUsZUFBTyxHQUFHLElBQUksaUJBQWlCLEVBQUUsQ0FBQzs7QUM5QjlDLGtEQUFrRDtBQUNsRCw0REFBNEQ7QUFHNUQsSUFBTyxVQUFVLFdBQVcsa0NBQWtDLENBQUMsQ0FBQTtBQUcvRCxJQUFhLGVBQWU7SUFFM0JHLFNBRllBLGVBQWVBO1FBRzFCQyxJQUFJQSxDQUFDQSxFQUFFQSxHQUFHQSxVQUFVQSxDQUFDQSxPQUFPQSxDQUFDQSxhQUFhQSxFQUFFQSxDQUFBQTtJQUM3Q0EsQ0FBQ0E7SUFFREQseUNBQWVBLEdBQWZBO1FBQUFFLGlCQU1DQTtRQUxBQSxJQUFJQSxDQUFDQSxFQUFFQSxDQUFDQSxPQUFPQSxDQUFDQTtZQUNmQSxLQUFJQSxDQUFDQSxFQUFFQSxDQUFDQSxLQUFLQSxDQUFDQSx5QkFBeUJBLEVBQUVBLFVBQVNBLEdBQUdBLEVBQUVBLElBQUlBO2dCQUMxRCxPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ25CLENBQUMsQ0FBQ0EsQ0FBQUE7UUFDSEEsQ0FBQ0EsQ0FBQ0EsQ0FBQUE7SUFDSEEsQ0FBQ0E7SUFFRkYsc0JBQUNBO0FBQURBLENBZEEsQUFjQ0EsSUFBQTtBQWRZLHVCQUFlLEdBQWYsZUFjWixDQUFBO0FBRVUsZUFBTyxHQUFHLElBQUksZUFBZSxFQUFFLENBQUM7O0FDdkIzQyxBQUNBLGlEQURpRDtBQUNqRCxZQUFZLENBQUM7QUFFYixJQUFPLElBQUksV0FBVyxNQUFNLENBQUMsQ0FBQztBQUM5QixJQUFPLGVBQWUsV0FBVyxxQ0FBcUMsQ0FBQyxDQUFDO0FBRXhFLElBQU0sYUFBYTtJQUlsQkcsU0FKS0EsYUFBYUE7UUFLakJDLElBQUlBLENBQUNBLE1BQU1BLEdBQUdBLElBQUlBLElBQUlBLENBQUNBLE1BQU1BLEVBQUVBLENBQUFBO1FBRS9CQSxJQUFJQSxDQUFDQSxNQUFNQSxDQUFDQSxLQUFLQSxDQUFDQTtZQUNqQkEsTUFBTUEsRUFBRUEsS0FBS0E7WUFDYkEsSUFBSUEsRUFBRUEsR0FBR0E7WUFDVEEsT0FBT0EsRUFBRUEsZUFBZUEsQ0FBQ0EsT0FBT0EsQ0FBQ0EsZUFBZUEsRUFBRUE7U0FDbERBLENBQUNBLENBQUNBO0lBQ0pBLENBQUNBO0lBRURELG1DQUFXQSxHQUFYQTtRQUNDRSxJQUFJQSxDQUFDQSxNQUFNQSxDQUFDQSxLQUFLQSxDQUFDQTtZQUNqQixPQUFPLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQ3hCLENBQUMsQ0FBQ0EsQ0FBQUE7SUFDSEEsQ0FBQ0E7SUFJRkYsb0JBQUNBO0FBQURBLENBdEJBLEFBc0JDQSxJQUFBO0FBRUQsSUFBSSxLQUFLLEdBQUcsSUFBSSxhQUFhLEVBQUUsQ0FBQztBQUNoQyxLQUFLLENBQUMsV0FBVyxFQUFFLENBQUM7O0FDOUJVIiwiZmlsZSI6ImluZGV4Lm1vZHVsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vLzxyZWZlcmVuY2UgcGF0aD0nLi4vLi4vLi4vdHlwaW5ncy90c2QuZC50cycgLz5cclxuJ3VzZSBzdHJpY3QnO1xyXG5cclxuaW1wb3J0IG15c3FsID0gcmVxdWlyZShcIm15c3FsXCIpO1xyXG5cclxuZXhwb3J0IGNsYXNzIENvbm5lY3Rpb25TZXJ2aWNlXHJcbiB7XHQgXHJcblx0IHByaXZhdGUgY29ubmVjdGlvbjtcclxuXHQgXHJcblx0IGNvbnN0cnVjdG9yKCkge1xyXG5cdFx0IHZhciBfZGJDb25maWcgPVxyXG5cdFx0XHR7XHJcblx0XHRcdFx0aG9zdCAgICAgOiAnbG9jYWxob3N0JyxcclxuXHRcdFx0XHR1c2VyICAgICA6ICdyb290JyxcclxuXHRcdFx0XHRwYXNzd29yZCA6ICcnLFxyXG5cdFx0XHRcdGRhdGFiYXNlIDogJ3NvZl90b2t5bycsXHJcblx0XHRcdFx0ZGVidWcgICAgOiAgZmFsc2UsXHJcblx0XHRcdFx0aW5zZWN1cmVBdXRoOiB0cnVlXHJcblx0XHRcdH07XHJcblx0XHRcdFxyXG5cdFx0XHR0aGlzLmNvbm5lY3Rpb24gPSBteXNxbC5jcmVhdGVDb25uZWN0aW9uKF9kYkNvbmZpZyk7XHJcblx0IH1cclxuXHQgXHJcblx0IGdldENvbm5lY3Rpb24oKSB7XHJcblx0XHQgcmV0dXJuIHRoaXMuY29ubmVjdGlvbjtcclxuXHQgfVxyXG5cdCBcclxuXHQgXHJcbiB9XHJcbiBcclxuIGV4cG9ydCB2YXIgc2VydmljZSA9IG5ldyBDb25uZWN0aW9uU2VydmljZSgpOyIsIi8vLyA8cmVmZXJlbmNlIHBhdGg9XCIuLi8uLi8uLi90eXBpbmdzL3RzZC5kLnRzXCIgLz5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD1cIi4uL2Nvbm5lY3Rpb24vY29ubmVjdGlvbi5zZXJ2aWNlLnRzXCIgLz5cclxuXHJcblxyXG5pbXBvcnQgY29ubmVjdGlvbiA9IHJlcXVpcmUoJy4uL2Nvbm5lY3Rpb24vY29ubmVjdGlvbi5zZXJ2aWNlJylcclxuXHJcblxyXG5leHBvcnQgY2xhc3MgUHJvZHVjdHNTZXJ2aWNlIHtcclxuXHRwcml2YXRlIGRiO1xyXG5cdGNvbnN0cnVjdG9yKCkge1xyXG5cdFx0dGhpcy5kYiA9IGNvbm5lY3Rpb24uc2VydmljZS5nZXRDb25uZWN0aW9uKClcclxuXHR9XHJcblxyXG5cdGdldFByb2R1Y3RzTGlzdCgpIHtcclxuXHRcdHRoaXMuZGIuY29ubmVjdCgoKSA9PiB7XHJcblx0XHRcdHRoaXMuZGIucXVlcnkoJ1NFTEVDVCAqIGZyb20gd3AyX3Bvc3RzJywgZnVuY3Rpb24oZXJyLCByb3dzKSB7XHJcblx0XHRcdFx0Y29uc29sZS5sb2cocm93cyk7XHJcblx0XHRcdH0pXHJcblx0XHR9KVxyXG5cdH1cclxuXHJcbn1cclxuXHJcbmV4cG9ydCB2YXIgc2VydmljZSA9IG5ldyBQcm9kdWN0c1NlcnZpY2UoKTsiLCIvLy88cmVmZXJlbmNlIHBhdGg9Jy4uL3R5cGluZ3MvaGFwaS9oYXBpLmQudHMnIC8+XHJcbid1c2Ugc3RyaWN0JztcclxuXHJcbmltcG9ydCBoYXBpID0gcmVxdWlyZShcImhhcGlcIik7XHJcbmltcG9ydCBQcm9kdWN0c1NlcnZpY2UgPSByZXF1aXJlKFwiLi9tb2R1bGVzL3Byb2R1Y3RzL3Byb2R1Y3RzLnNlcnZpY2VcIik7XHJcblxyXG5jbGFzcyBTZXJ2ZXJTZXJ2aWNlIHtcclxuXHRwcml2YXRlIHNlcnZlcjtcclxuXHJcblxyXG5cdGNvbnN0cnVjdG9yKCkge1xyXG5cdFx0dGhpcy5zZXJ2ZXIgPSBuZXcgaGFwaS5TZXJ2ZXIoKVxyXG5cclxuXHRcdHRoaXMuc2VydmVyLnJvdXRlKHtcclxuXHRcdFx0bWV0aG9kOiAnR0VUJyxcclxuXHRcdFx0cGF0aDogJy8nLFxyXG5cdFx0XHRoYW5kbGVyOiBQcm9kdWN0c1NlcnZpY2Uuc2VydmljZS5nZXRQcm9kdWN0c0xpc3QoKVxyXG5cdFx0fSk7XHJcblx0fVxyXG5cclxuXHRzdGFydFNlcnZlcigpIHtcclxuXHRcdHRoaXMuc2VydmVyLnN0YXJ0KGZ1bmN0aW9uKCkge1xyXG5cdFx0XHRjb25zb2xlLmxvZygnU3RhcnRlZCcpO1xyXG5cdFx0fSlcclxuXHR9XHJcblxyXG5cclxuXHJcbn1cclxuXHJcbnZhciBzdGFydCA9IG5ldyBTZXJ2ZXJTZXJ2aWNlKCk7XHJcbnN0YXJ0LnN0YXJ0U2VydmVyKCk7XHJcblxyXG4iLCJcclxuaW1wb3J0IEhhcGkgPSByZXF1aXJlKFwiaGFwaVwiKTtcclxuXHJcbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==