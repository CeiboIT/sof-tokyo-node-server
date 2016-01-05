///<reference path='../typings/hapi/hapi.d.ts' />
'use strict';
var _this = this;
var hapi = require("hapi");
var routes = require("./routes");
this.server = new hapi.Server();
var _host;
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
//help for see all the routes
this.server.register([require('vision'), require('inert'), {
    register: require('lout'),
    options: {
        endpoint: '/api'
    }
}], function (err) {
    console.log("error: ", err);
});
/*
this.server.route({
    method: 'GET',
    path: '/api',
    handler: (request, reply) => {
        var _table = this.server.table();

        var _answer = {};
        _table.table.map((element) => {
            console.log(element);
            _answer[element.fingerprint] = {
                path: element.path,
                method: element.method
            }
        })
        reply(_answer);
    }
})
*/
//this.server.connection({ port: process.env.PORT ||3000 });
this.server.start(function () {
    console.log('Started: ' + _this.server.info.uri);
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLEFBQ0EsaURBRGlEO0FBQ2pELFlBQVksQ0FBQztBQUFiLGlCQStEQTtBQTdEQSxJQUFPLElBQUksV0FBVyxNQUFNLENBQUMsQ0FBQztBQUM5QixJQUFPLE1BQU0sV0FBVyxVQUFVLENBQUMsQ0FBQztBQUVwQyxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO0FBRWhDLElBQUksS0FBSyxDQUFDO0FBRVYsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxRQUFRLElBQUksYUFBYSxDQUFDLENBQUMsQ0FBQztJQUN4QyxLQUFLLEdBQUcsU0FBUyxDQUFDO0FBQ3RCLENBQUM7QUFBQyxJQUFJLENBQUMsQ0FBQztJQUNKLEtBQUssR0FBRyxXQUFXLENBQUM7QUFDeEIsQ0FBQztBQUdELElBQUksQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDO0lBQ25CLElBQUksRUFBRSxPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksSUFBSSxJQUFJO0lBQzlCLElBQUksRUFBRSxLQUFLO0NBQ2QsQ0FBQyxDQUFBO0FBR0YsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLEtBQUssSUFBSSxNQUFNLENBQUMsQ0FBQyxDQUFDO0lBQ3ZCLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxJQUFJLEdBQUcsTUFBTSxHQUFHLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxJQUFJLENBQUM7SUFDakQsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUE7QUFDcEMsQ0FBQztBQUdELEFBQ0EsNkJBRDZCO0FBQzdCLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxFQUFFLE9BQU8sQ0FBQyxPQUFPLENBQUMsRUFBRTtJQUN2RCxRQUFRLEVBQUUsT0FBTyxDQUFDLE1BQU0sQ0FBQztJQUN6QixPQUFPLEVBQUU7UUFDTCxRQUFRLEVBQUUsTUFBTTtLQUNuQjtDQUNKLENBQUMsRUFBRSxVQUFTLEdBQUc7SUFDWixPQUFPLENBQUMsR0FBRyxDQUFDLFNBQVMsRUFBRSxHQUFHLENBQUMsQ0FBQztBQUNoQyxDQUFDLENBQUMsQ0FBQztBQUVILEFBcUJBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7RUFIRTtBQUVGLDREQUE0RDtBQUM1RCxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQztJQUNkLE9BQU8sQ0FBQyxHQUFHLENBQUMsV0FBVyxHQUFHLEtBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0FBQ3BELENBQUMsQ0FBQyxDQUFBIiwiZmlsZSI6ImluZGV4LmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy8vPHJlZmVyZW5jZSBwYXRoPScuLi90eXBpbmdzL2hhcGkvaGFwaS5kLnRzJyAvPlxuJ3VzZSBzdHJpY3QnO1xuXG5pbXBvcnQgaGFwaSA9IHJlcXVpcmUoXCJoYXBpXCIpO1xuaW1wb3J0IHJvdXRlcyA9IHJlcXVpcmUoXCIuL3JvdXRlc1wiKTtcblxudGhpcy5zZXJ2ZXIgPSBuZXcgaGFwaS5TZXJ2ZXIoKTtcblxudmFyIF9ob3N0O1xuXG5pZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT0gJ2RldmVsb3BtZW50Jykge1xuICAgIF9ob3N0ID0gJzAuMC4wLjAnO1xufSBlbHNlIHtcbiAgICBfaG9zdCA9ICdsb2NhbGhvc3QnO1xufVxuXG5cbnRoaXMuc2VydmVyLmNvbm5lY3Rpb24oe1xuICAgIHBvcnQ6IHByb2Nlc3MuZW52LlBPUlQgfHwgOTAwMCxcbiAgICBob3N0OiBfaG9zdFxufSlcblxuLy8gYWRkIGFsbCBhcGkgcm91dGVzXG5mb3IgKHZhciByb3V0ZSBpbiByb3V0ZXMpIHtcbiAgICByb3V0ZXNbcm91dGVdLnBhdGggPSAnL2FwaScgKyByb3V0ZXNbcm91dGVdLnBhdGg7XG4gICAgdGhpcy5zZXJ2ZXIucm91dGUocm91dGVzW3JvdXRlXSlcbn1cblxuXG4vL2hlbHAgZm9yIHNlZSBhbGwgdGhlIHJvdXRlc1xudGhpcy5zZXJ2ZXIucmVnaXN0ZXIoW3JlcXVpcmUoJ3Zpc2lvbicpLCByZXF1aXJlKCdpbmVydCcpLCB7XG4gICAgcmVnaXN0ZXI6IHJlcXVpcmUoJ2xvdXQnKSxcbiAgICBvcHRpb25zOiB7XG4gICAgICAgIGVuZHBvaW50OiAnL2FwaSdcbiAgICB9XG59XSwgZnVuY3Rpb24oZXJyKSB7XG4gICAgY29uc29sZS5sb2coXCJlcnJvcjogXCIsIGVycik7XG59KTtcblxuLypcbnRoaXMuc2VydmVyLnJvdXRlKHtcbiAgICBtZXRob2Q6ICdHRVQnLFxuICAgIHBhdGg6ICcvYXBpJyxcbiAgICBoYW5kbGVyOiAocmVxdWVzdCwgcmVwbHkpID0+IHtcbiAgICAgICAgdmFyIF90YWJsZSA9IHRoaXMuc2VydmVyLnRhYmxlKCk7XG5cbiAgICAgICAgdmFyIF9hbnN3ZXIgPSB7fTtcbiAgICAgICAgX3RhYmxlLnRhYmxlLm1hcCgoZWxlbWVudCkgPT4ge1xuICAgICAgICAgICAgY29uc29sZS5sb2coZWxlbWVudCk7XG4gICAgICAgICAgICBfYW5zd2VyW2VsZW1lbnQuZmluZ2VycHJpbnRdID0ge1xuICAgICAgICAgICAgICAgIHBhdGg6IGVsZW1lbnQucGF0aCxcbiAgICAgICAgICAgICAgICBtZXRob2Q6IGVsZW1lbnQubWV0aG9kXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICAgIHJlcGx5KF9hbnN3ZXIpO1xuICAgIH1cbn0pXG4qL1xuXG4vL3RoaXMuc2VydmVyLmNvbm5lY3Rpb24oeyBwb3J0OiBwcm9jZXNzLmVudi5QT1JUIHx8MzAwMCB9KTtcbnRoaXMuc2VydmVyLnN0YXJ0KCgpID0+IHtcbiAgICBjb25zb2xlLmxvZygnU3RhcnRlZDogJyArIHRoaXMuc2VydmVyLmluZm8udXJpKTtcbn0pXG5cbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==