///<reference path='../typings/hapi/hapi.d.ts' />
'use strict';
var _this = this;
var hapi = require("hapi");
var ProductsRoutes = require("./modules/products/products.routes");
var _server = new hapi.Server();
this.server = new hapi.Server();
if (process.env.NODE_ENV != 'development') {
    this.server._host = '0.0.0.0';
}
else {
    this.server._host = 'localhost';
}
this.server._port = process.env.PORT || 9000;
for (var route in ProductsRoutes) {
    ProductsRoutes[route].path = '/api' + ProductsRoutes[route].path;
    this.server.route(ProductsRoutes[route]);
}
//help for see all the routes
this.server.route({
    method: 'GET',
    path: '/api',
    handler: function (request, reply) {
        var _table = _this.server.table();
        var _answer = {};
        _table.map(function (element) {
            _answer[element.fingerprint] = {
                path: element.path,
                method: element.method
            };
        });
        reply(_answer);
    }
});
//this.server.connection({ port: process.env.PORT ||3000 });
this.server.start(function () {
    console.log('Started: ' + _this.server.info.uri);
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLEFBQ0EsaURBRGlEO0FBQ2pELFlBQVksQ0FBQztBQUFiLGlCQTZDQTtBQTNDQSxJQUFPLElBQUksV0FBVyxNQUFNLENBQUMsQ0FBQztBQUM5QixJQUFPLGNBQWMsV0FBVyxvQ0FBb0MsQ0FBQyxDQUFDO0FBRXRFLElBQUksT0FBTyxHQUFHLElBQUksSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFBO0FBRS9CLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7QUFDaEMsRUFBRSxDQUFBLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxRQUFRLElBQUksYUFBYSxDQUFDLENBQUMsQ0FBQztJQUMxQyxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssR0FBRyxTQUFTLENBQUM7QUFDL0IsQ0FBQztBQUFDLElBQUksQ0FBQyxDQUFDO0lBQ1AsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLEdBQUMsV0FBVyxDQUFDO0FBQy9CLENBQUM7QUFFRCxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssR0FBRyxPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksSUFBRSxJQUFJLENBQUM7QUFHM0MsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLEtBQUssSUFBSSxjQUFjLENBQUMsQ0FBQyxDQUFDO0lBQ2xDLGNBQWMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxJQUFJLEdBQUcsTUFBTSxHQUFHLGNBQWMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxJQUFJLENBQUM7SUFDakUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsY0FBYyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUE7QUFDekMsQ0FBQztBQUVELEFBRUEsNkJBRjZCO0FBRTdCLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDO0lBQ2pCLE1BQU0sRUFBRSxLQUFLO0lBQ2IsSUFBSSxFQUFFLE1BQU07SUFDWixPQUFPLEVBQUUsVUFBQyxPQUFPLEVBQUUsS0FBSztRQUN0QixJQUFJLE1BQU0sR0FBRyxLQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssRUFBRSxDQUFDO1FBQ2pDLElBQUksT0FBTyxHQUFHLEVBQUUsQ0FBQztRQUNWLE1BQU0sQ0FBQyxHQUFHLENBQUMsVUFBQyxPQUFPO1lBQ2pCLE9BQU8sQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDLEdBQUc7Z0JBQ3RDLElBQUksRUFBRSxPQUFPLENBQUMsSUFBSTtnQkFDbEIsTUFBTSxFQUFFLE9BQU8sQ0FBQyxNQUFNO2FBQ3ZCLENBQUE7UUFDSSxDQUFDLENBQUMsQ0FBQTtRQUNGLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUN0QixDQUFDO0NBQ0QsQ0FBQyxDQUFBO0FBRUYsQUFDQSw0REFENEQ7QUFDNUQsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUM7SUFDakIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxXQUFXLEdBQUcsS0FBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7QUFDakQsQ0FBQyxDQUFDLENBQUEiLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzQ29udGVudCI6WyIvLy88cmVmZXJlbmNlIHBhdGg9Jy4uL3R5cGluZ3MvaGFwaS9oYXBpLmQudHMnIC8+XHJcbid1c2Ugc3RyaWN0JztcclxuXHJcbmltcG9ydCBoYXBpID0gcmVxdWlyZShcImhhcGlcIik7XHJcbmltcG9ydCBQcm9kdWN0c1JvdXRlcyA9IHJlcXVpcmUoXCIuL21vZHVsZXMvcHJvZHVjdHMvcHJvZHVjdHMucm91dGVzXCIpO1xyXG5cclxudmFyIF9zZXJ2ZXIgPSBuZXcgaGFwaS5TZXJ2ZXIoKVxyXG5cclxudGhpcy5zZXJ2ZXIgPSBuZXcgaGFwaS5TZXJ2ZXIoKTtcclxuaWYocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT0gJ2RldmVsb3BtZW50Jykge1xyXG5cdHRoaXMuc2VydmVyLl9ob3N0ID0gJzAuMC4wLjAnO1x0XHJcbn0gZWxzZSB7XHJcblx0dGhpcy5zZXJ2ZXIuX2hvc3Q9J2xvY2FsaG9zdCc7XHJcbn1cclxuXHJcbnRoaXMuc2VydmVyLl9wb3J0ID0gcHJvY2Vzcy5lbnYuUE9SVHx8OTAwMDtcclxuXHJcbi8vIGFkZCBwcm9kdWN0cyBhcGkgcm91dGVzXHJcbmZvciAodmFyIHJvdXRlIGluIFByb2R1Y3RzUm91dGVzKSB7XHJcblx0UHJvZHVjdHNSb3V0ZXNbcm91dGVdLnBhdGggPSAnL2FwaScgKyBQcm9kdWN0c1JvdXRlc1tyb3V0ZV0ucGF0aDtcclxuXHR0aGlzLnNlcnZlci5yb3V0ZShQcm9kdWN0c1JvdXRlc1tyb3V0ZV0pXHJcbn1cclxuXHJcbi8vaGVscCBmb3Igc2VlIGFsbCB0aGUgcm91dGVzXHJcblxyXG50aGlzLnNlcnZlci5yb3V0ZSh7XHJcblx0bWV0aG9kOiAnR0VUJyxcclxuXHRwYXRoOiAnL2FwaScsXHJcblx0aGFuZGxlcjogKHJlcXVlc3QsIHJlcGx5KSA9PiB7XHJcblx0XHQgdmFyIF90YWJsZSA9IHRoaXMuc2VydmVyLnRhYmxlKCk7XHJcblx0XHQgdmFyIF9hbnN3ZXIgPSB7fTtcclxuICAgICAgICAgIF90YWJsZS5tYXAoKGVsZW1lbnQpID0+IHtcclxuICAgICAgICAgICAgX2Fuc3dlcltlbGVtZW50LmZpbmdlcnByaW50XSA9IHtcclxuXHRcdFx0XHQgcGF0aDogZWxlbWVudC5wYXRoLFxyXG5cdFx0XHRcdCBtZXRob2Q6IGVsZW1lbnQubWV0aG9kXHJcblx0XHRcdH1cclxuICAgICAgICB9KVxyXG4gICAgICAgIHJlcGx5KF9hbnN3ZXIpO1xyXG5cdH1cclxufSlcclxuXHJcbi8vdGhpcy5zZXJ2ZXIuY29ubmVjdGlvbih7IHBvcnQ6IHByb2Nlc3MuZW52LlBPUlQgfHwzMDAwIH0pO1xyXG50aGlzLnNlcnZlci5zdGFydCgoKSA9PiB7XHJcblx0Y29uc29sZS5sb2coJ1N0YXJ0ZWQ6ICcgKyB0aGlzLnNlcnZlci5pbmZvLnVyaSk7XHJcbn0pXHJcblxyXG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=