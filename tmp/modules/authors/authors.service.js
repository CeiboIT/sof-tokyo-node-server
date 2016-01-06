/// <reference path="../../../typings/tsd.d.ts" />
/// <reference path="../connection/connection.service.ts" />
var Q = require("q");
var connection = require('../connection/connection.service');
var AuthorsService = (function () {
    function AuthorsService() {
        this.db = connection.service;
    }
    AuthorsService.prototype.getAuthorsList = function () {
        var _listPromise = Q.defer();
        this.db.query('?json=get_author_index').then(function (results) {
            _listPromise.resolve(results['authors']);
        });
        return _listPromise.promise;
    };
    return AuthorsService;
})();
exports.AuthorsService = AuthorsService;
;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1vZHVsZXMvYXV0aG9ycy9hdXRob3JzLnNlcnZpY2UudHMiXSwibmFtZXMiOlsiQXV0aG9yc1NlcnZpY2UiLCJBdXRob3JzU2VydmljZS5jb25zdHJ1Y3RvciIsIkF1dGhvcnNTZXJ2aWNlLmdldEF1dGhvcnNMaXN0Il0sIm1hcHBpbmdzIjoiQUFBQSxrREFBa0Q7QUFDbEQsNERBQTREO0FBRTVELElBQU8sQ0FBQyxXQUFXLEdBQUcsQ0FBQyxDQUFDO0FBQ3hCLElBQU8sVUFBVSxXQUFXLGtDQUFrQyxDQUFDLENBQUE7QUFRL0QsSUFBYSxjQUFjO0lBQTNCQSxTQUFhQSxjQUFjQTtRQUNmQyxPQUFFQSxHQUFHQSxVQUFVQSxDQUFDQSxPQUFPQSxDQUFDQTtJQVlwQ0EsQ0FBQ0E7SUFWR0QsdUNBQWNBLEdBQWRBO1FBQ0lFLElBQUlBLFlBQVlBLEdBQUdBLENBQUNBLENBQUNBLEtBQUtBLEVBQUVBLENBQUNBO1FBRTdCQSxJQUFJQSxDQUFDQSxFQUFFQSxDQUFDQSxLQUFLQSxDQUFDQSx3QkFBd0JBLENBQUNBLENBQ2xDQSxJQUFJQSxDQUFDQSxVQUFDQSxPQUFPQTtZQUNWQSxZQUFZQSxDQUFDQSxPQUFPQSxDQUFDQSxPQUFPQSxDQUFDQSxTQUFTQSxDQUFDQSxDQUFDQSxDQUFDQTtRQUM3Q0EsQ0FBQ0EsQ0FBQ0EsQ0FBQUE7UUFFTkEsTUFBTUEsQ0FBQ0EsWUFBWUEsQ0FBQ0EsT0FBT0EsQ0FBQ0E7SUFDaENBLENBQUNBO0lBQ0xGLHFCQUFDQTtBQUFEQSxDQWJBLEFBYUNBLElBQUE7QUFiWSxzQkFBYyxHQUFkLGNBYVosQ0FBQTtBQUFBLENBQUMiLCJmaWxlIjoibW9kdWxlcy9hdXRob3JzL2F1dGhvcnMuc2VydmljZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vLyA8cmVmZXJlbmNlIHBhdGg9XCIuLi8uLi8uLi90eXBpbmdzL3RzZC5kLnRzXCIgLz5cbi8vLyA8cmVmZXJlbmNlIHBhdGg9XCIuLi9jb25uZWN0aW9uL2Nvbm5lY3Rpb24uc2VydmljZS50c1wiIC8+XG5cbmltcG9ydCBRID0gcmVxdWlyZShcInFcIik7XG5pbXBvcnQgY29ubmVjdGlvbiA9IHJlcXVpcmUoJy4uL2Nvbm5lY3Rpb24vY29ubmVjdGlvbi5zZXJ2aWNlJylcblxuZXhwb3J0IGludGVyZmFjZSBJQXV0aG9yc1NlcnZpY2Uge1xuICAgIC8vIEdFVFxuICAgIGdldEF1dGhvcnNMaXN0KCk6IFEuSVByb21pc2U8e30+XG59XG5cblxuZXhwb3J0IGNsYXNzIEF1dGhvcnNTZXJ2aWNlIGltcGxlbWVudHMgSUF1dGhvcnNTZXJ2aWNlIHtcbiAgICBwcml2YXRlIGRiID0gY29ubmVjdGlvbi5zZXJ2aWNlO1xuXG4gICAgZ2V0QXV0aG9yc0xpc3QoKTogUS5JUHJvbWlzZTx7fT4ge1xuICAgICAgICB2YXIgX2xpc3RQcm9taXNlID0gUS5kZWZlcigpO1xuXG4gICAgICAgIHRoaXMuZGIucXVlcnkoJz9qc29uPWdldF9hdXRob3JfaW5kZXgnKVxuICAgICAgICAgICAgLnRoZW4oKHJlc3VsdHMpID0+IHtcbiAgICAgICAgICAgICAgICBfbGlzdFByb21pc2UucmVzb2x2ZShyZXN1bHRzWydhdXRob3JzJ10pO1xuICAgICAgICAgICAgfSlcblxuICAgICAgICByZXR1cm4gX2xpc3RQcm9taXNlLnByb21pc2U7XG4gICAgfVxufTtcbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==