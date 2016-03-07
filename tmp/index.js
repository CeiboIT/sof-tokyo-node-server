///<reference path='../typings/hapi/hapi.d.ts' />
'use strict';
var _this = this;
var hapi = require('hapi');
var routes = require("./routes");
this.server = new hapi.Server({
    cache: [{
        name: 'mongoCache',
        engine: require('catbox-mongodb'),
        location: 'mongodb://heroku_pbrg0ccm:e4o3nqu0m472a7riofofa5psib@ds019498.mlab.com:19498/heroku_pbrg0ccm',
        partition: 'cache'
    }]
});
// this.client.start();
var _host;
var lout_status = false;
if (process.env.NODE_ENV != 'development') {
    _host = '0.0.0.0';
}
else {
    _host = 'localhost';
}
this.server.connection({
    port: process.env.PORT || 9000,
    host: _host
});
for (var route in routes) {
    routes[route].path = '/api' + routes[route].path;
    this.server.route(routes[route]);
}
// Lout documentation to see all the API routes
this.server.register([require('vision'), require('inert'), {
    register: require('lout'),
    options: {
        endpoint: '/api'
    }
}], function () {
    lout_status = true;
});
// Start server
this.server.start(function () {
    if (lout_status == true)
        console.log('✓ lout: API Documentation generated at ' + _this.server.info.uri + '/api');
    console.log('✓ Hapi: Server started at ' + _this.server.info.uri);
});
module.exports = this.server;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLEFBQ0EsaURBRGlEO0FBQ2pELFlBQVksQ0FBQztBQUFiLGlCQXNEQTtBQXBEQSxJQUFPLElBQUksV0FBVyxNQUFNLENBQUMsQ0FBQztBQUM5QixJQUFPLE1BQU0sV0FBVyxVQUFVLENBQUMsQ0FBQztBQUVwQyxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQztJQUMxQixLQUFLLEVBQUUsQ0FBQztRQUNKLElBQUksRUFBRSxZQUFZO1FBQ2xCLE1BQU0sRUFBRSxPQUFPLENBQUMsZ0JBQWdCLENBQUM7UUFDakMsUUFBUSxFQUFFLDhGQUE4RjtRQUN4RyxTQUFTLEVBQUUsT0FBTztLQUNyQixDQUFDO0NBQ0wsQ0FBQyxDQUFDO0FBRUgsQUFHQSx1QkFIdUI7SUFHbkIsS0FBSyxDQUFDO0FBQ1YsSUFBSSxXQUFXLEdBQUcsS0FBSyxDQUFDO0FBRXhCLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsUUFBUSxJQUFJLGFBQWEsQ0FBQyxDQUFDLENBQUM7SUFDeEMsS0FBSyxHQUFHLFNBQVMsQ0FBQztBQUN0QixDQUFDO0FBQUMsSUFBSSxDQUFDLENBQUM7SUFDSixLQUFLLEdBQUcsV0FBVyxDQUFDO0FBQ3hCLENBQUM7QUFFRCxJQUFJLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQztJQUNuQixJQUFJLEVBQUUsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLElBQUksSUFBSTtJQUM5QixJQUFJLEVBQUUsS0FBSztDQUNkLENBQUMsQ0FBQTtBQUdGLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxLQUFLLElBQUksTUFBTSxDQUFDLENBQUMsQ0FBQztJQUN2QixNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsSUFBSSxHQUFHLE1BQU0sR0FBRyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsSUFBSSxDQUFDO0lBQ2pELElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFBO0FBQ3BDLENBQUM7QUFFRCxBQUNBLCtDQUQrQztBQUMvQyxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsRUFBRSxPQUFPLENBQUMsT0FBTyxDQUFDLEVBQUU7SUFDdkQsUUFBUSxFQUFFLE9BQU8sQ0FBQyxNQUFNLENBQUM7SUFDekIsT0FBTyxFQUFFO1FBQ0wsUUFBUSxFQUFFLE1BQU07S0FDbkI7Q0FDSixDQUFDLEVBQUU7SUFDQSxXQUFXLEdBQUcsSUFBSSxDQUFDO0FBQ3ZCLENBQUMsQ0FBQyxDQUFDO0FBRUgsQUFDQSxlQURlO0FBQ2YsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUM7SUFDZCxFQUFFLENBQUMsQ0FBQyxXQUFXLElBQUksSUFBSSxDQUFDO1FBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyx5Q0FBeUMsR0FBRyxLQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLEdBQUcsTUFBTSxDQUFDLENBQUM7SUFDaEgsT0FBTyxDQUFDLEdBQUcsQ0FBQyw0QkFBNEIsR0FBRyxLQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztBQUNyRSxDQUFDLENBQUMsQ0FBQztBQUVILE1BQU0sQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyIsImZpbGUiOiJpbmRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vLzxyZWZlcmVuY2UgcGF0aD0nLi4vdHlwaW5ncy9oYXBpL2hhcGkuZC50cycgLz5cbid1c2Ugc3RyaWN0JztcblxuaW1wb3J0IGhhcGkgPSByZXF1aXJlKCdoYXBpJyk7XG5pbXBvcnQgcm91dGVzID0gcmVxdWlyZShcIi4vcm91dGVzXCIpO1xuXG50aGlzLnNlcnZlciA9IG5ldyBoYXBpLlNlcnZlcih7XG4gICAgY2FjaGU6IFt7XG4gICAgICAgIG5hbWU6ICdtb25nb0NhY2hlJyxcbiAgICAgICAgZW5naW5lOiByZXF1aXJlKCdjYXRib3gtbW9uZ29kYicpLFxuICAgICAgICBsb2NhdGlvbjogJ21vbmdvZGI6Ly9oZXJva3VfcGJyZzBjY206ZTRvM25xdTBtNDcyYTdyaW9mb2ZhNXBzaWJAZHMwMTk0OTgubWxhYi5jb206MTk0OTgvaGVyb2t1X3BicmcwY2NtJyxcbiAgICAgICAgcGFydGl0aW9uOiAnY2FjaGUnIFxuICAgIH1dXG59KTtcblxuLy8gdGhpcy5jbGllbnQuc3RhcnQoKTtcblxuXG52YXIgX2hvc3Q7XG52YXIgbG91dF9zdGF0dXMgPSBmYWxzZTtcblxuaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9ICdkZXZlbG9wbWVudCcpIHtcbiAgICBfaG9zdCA9ICcwLjAuMC4wJztcbn0gZWxzZSB7XG4gICAgX2hvc3QgPSAnbG9jYWxob3N0Jztcbn1cblxudGhpcy5zZXJ2ZXIuY29ubmVjdGlvbih7XG4gICAgcG9ydDogcHJvY2Vzcy5lbnYuUE9SVCB8fCA5MDAwLFxuICAgIGhvc3Q6IF9ob3N0XG59KVxuXG4vLyBBZGQgYWxsIEFQSSByb3V0ZXNcbmZvciAodmFyIHJvdXRlIGluIHJvdXRlcykge1xuICAgIHJvdXRlc1tyb3V0ZV0ucGF0aCA9ICcvYXBpJyArIHJvdXRlc1tyb3V0ZV0ucGF0aDtcbiAgICB0aGlzLnNlcnZlci5yb3V0ZShyb3V0ZXNbcm91dGVdKVxufVxuXG4vLyBMb3V0IGRvY3VtZW50YXRpb24gdG8gc2VlIGFsbCB0aGUgQVBJIHJvdXRlc1xudGhpcy5zZXJ2ZXIucmVnaXN0ZXIoW3JlcXVpcmUoJ3Zpc2lvbicpLCByZXF1aXJlKCdpbmVydCcpLCB7XG4gICAgcmVnaXN0ZXI6IHJlcXVpcmUoJ2xvdXQnKSxcbiAgICBvcHRpb25zOiB7XG4gICAgICAgIGVuZHBvaW50OiAnL2FwaSdcbiAgICB9XG59XSwgZnVuY3Rpb24oKSB7XG4gICAgbG91dF9zdGF0dXMgPSB0cnVlO1xufSk7XG5cbi8vIFN0YXJ0IHNlcnZlclxudGhpcy5zZXJ2ZXIuc3RhcnQoKCkgPT4ge1xuICAgIGlmIChsb3V0X3N0YXR1cyA9PSB0cnVlKSBjb25zb2xlLmxvZygn4pyTIGxvdXQ6IEFQSSBEb2N1bWVudGF0aW9uIGdlbmVyYXRlZCBhdCAnICsgdGhpcy5zZXJ2ZXIuaW5mby51cmkgKyAnL2FwaScpO1xuICAgIGNvbnNvbGUubG9nKCfinJMgSGFwaTogU2VydmVyIHN0YXJ0ZWQgYXQgJyArIHRoaXMuc2VydmVyLmluZm8udXJpKTtcbn0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHRoaXMuc2VydmVyO1xuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9