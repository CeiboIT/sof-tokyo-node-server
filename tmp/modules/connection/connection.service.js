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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1vZHVsZXMvY29ubmVjdGlvbi9jb25uZWN0aW9uLnNlcnZpY2UudHMiXSwibmFtZXMiOlsiQ29ubmVjdGlvblNlcnZpY2UiLCJDb25uZWN0aW9uU2VydmljZS5jb25zdHJ1Y3RvciIsIkNvbm5lY3Rpb25TZXJ2aWNlLmdldENvbm5lY3Rpb24iXSwibWFwcGluZ3MiOiJBQUFBLEFBQ0EsaURBRGlEO0FBQ2pELFlBQVksQ0FBQztBQUViLElBQU8sS0FBSyxXQUFXLE9BQU8sQ0FBQyxDQUFDO0FBRWhDLElBQWEsaUJBQWlCO0lBSTVCQSxTQUpXQSxpQkFBaUJBO1FBSzNCQyxJQUFJQSxTQUFTQSxHQUNiQTtZQUNDQSxJQUFJQSxFQUFPQSxXQUFXQTtZQUN0QkEsSUFBSUEsRUFBT0EsTUFBTUE7WUFDakJBLFFBQVFBLEVBQUdBLEVBQUVBO1lBQ2JBLFFBQVFBLEVBQUdBLFdBQVdBO1lBQ3RCQSxLQUFLQSxFQUFPQSxLQUFLQTtZQUNqQkEsWUFBWUEsRUFBRUEsSUFBSUE7U0FDbEJBLENBQUNBO1FBRUZBLElBQUlBLENBQUNBLFVBQVVBLEdBQUdBLEtBQUtBLENBQUNBLGdCQUFnQkEsQ0FBQ0EsU0FBU0EsQ0FBQ0EsQ0FBQ0E7SUFDckRBLENBQUNBO0lBRURELHlDQUFhQSxHQUFiQTtRQUNDRSxNQUFNQSxDQUFDQSxJQUFJQSxDQUFDQSxVQUFVQSxDQUFDQTtJQUN4QkEsQ0FBQ0E7SUFHRkYsd0JBQUNBO0FBQURBLENBdkJELEFBdUJFQSxJQUFBO0FBdkJXLHlCQUFpQixHQUFqQixpQkF1QlgsQ0FBQTtBQUVVLGVBQU8sR0FBRyxJQUFJLGlCQUFpQixFQUFFLENBQUMiLCJmaWxlIjoibW9kdWxlcy9jb25uZWN0aW9uL2Nvbm5lY3Rpb24uc2VydmljZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vLzxyZWZlcmVuY2UgcGF0aD0nLi4vLi4vLi4vdHlwaW5ncy90c2QuZC50cycgLz5cbid1c2Ugc3RyaWN0JztcblxuaW1wb3J0IG15c3FsID0gcmVxdWlyZShcIm15c3FsXCIpO1xuXG5leHBvcnQgY2xhc3MgQ29ubmVjdGlvblNlcnZpY2VcbiB7XHQgXG5cdCBwcml2YXRlIGNvbm5lY3Rpb247XG5cdCBcblx0IGNvbnN0cnVjdG9yKCkge1xuXHRcdCB2YXIgX2RiQ29uZmlnID1cblx0XHRcdHtcblx0XHRcdFx0aG9zdCAgICAgOiAnbG9jYWxob3N0Jyxcblx0XHRcdFx0dXNlciAgICAgOiAncm9vdCcsXG5cdFx0XHRcdHBhc3N3b3JkIDogJycsXG5cdFx0XHRcdGRhdGFiYXNlIDogJ3NvZl90b2t5bycsXG5cdFx0XHRcdGRlYnVnICAgIDogIGZhbHNlLFxuXHRcdFx0XHRpbnNlY3VyZUF1dGg6IHRydWVcblx0XHRcdH07XG5cdFx0XHRcblx0XHRcdHRoaXMuY29ubmVjdGlvbiA9IG15c3FsLmNyZWF0ZUNvbm5lY3Rpb24oX2RiQ29uZmlnKTtcblx0IH1cblx0IFxuXHQgZ2V0Q29ubmVjdGlvbigpIHtcblx0XHQgcmV0dXJuIHRoaXMuY29ubmVjdGlvbjtcblx0IH1cblx0IFxuXHQgXG4gfVxuIFxuIGV4cG9ydCB2YXIgc2VydmljZSA9IG5ldyBDb25uZWN0aW9uU2VydmljZSgpOyJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==