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
    AuthorsService.prototype.getAuthorById = function (authorId) {
        return this.db.query('?json=1&p=' + authorId);
    };
    return AuthorsService;
})();
exports.AuthorsService = AuthorsService;
;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1vZHVsZXMvYXV0aG9ycy9hdXRob3JzLnNlcnZpY2UudHMiXSwibmFtZXMiOlsiQXV0aG9yc1NlcnZpY2UiLCJBdXRob3JzU2VydmljZS5jb25zdHJ1Y3RvciIsIkF1dGhvcnNTZXJ2aWNlLmdldEF1dGhvcnNMaXN0IiwiQXV0aG9yc1NlcnZpY2UuZ2V0QXV0aG9yQnlJZCJdLCJtYXBwaW5ncyI6IkFBQUEsa0RBQWtEO0FBQ2xELDREQUE0RDtBQUU1RCxJQUFPLENBQUMsV0FBVyxHQUFHLENBQUMsQ0FBQztBQUN4QixJQUFPLFVBQVUsV0FBVyxrQ0FBa0MsQ0FBQyxDQUFBO0FBUS9ELElBQWEsY0FBYztJQUEzQkEsU0FBYUEsY0FBY0E7UUFDZkMsT0FBRUEsR0FBR0EsVUFBVUEsQ0FBQ0EsT0FBT0EsQ0FBQ0E7SUFnQnBDQSxDQUFDQTtJQWRHRCx1Q0FBY0EsR0FBZEE7UUFDSUUsSUFBSUEsWUFBWUEsR0FBR0EsQ0FBQ0EsQ0FBQ0EsS0FBS0EsRUFBRUEsQ0FBQ0E7UUFFN0JBLElBQUlBLENBQUNBLEVBQUVBLENBQUNBLEtBQUtBLENBQUNBLHdCQUF3QkEsQ0FBQ0EsQ0FDbENBLElBQUlBLENBQUNBLFVBQUNBLE9BQU9BO1lBQ1ZBLFlBQVlBLENBQUNBLE9BQU9BLENBQUNBLE9BQU9BLENBQUNBLFNBQVNBLENBQUNBLENBQUNBLENBQUNBO1FBQzdDQSxDQUFDQSxDQUFDQSxDQUFBQTtRQUVOQSxNQUFNQSxDQUFDQSxZQUFZQSxDQUFDQSxPQUFPQSxDQUFDQTtJQUNoQ0EsQ0FBQ0E7SUFFREYsc0NBQWFBLEdBQWJBLFVBQWNBLFFBQVFBO1FBQ2xCRyxNQUFNQSxDQUFDQSxJQUFJQSxDQUFDQSxFQUFFQSxDQUFDQSxLQUFLQSxDQUFDQSxZQUFZQSxHQUFHQSxRQUFRQSxDQUFDQSxDQUFBQTtJQUNqREEsQ0FBQ0E7SUFDTEgscUJBQUNBO0FBQURBLENBakJBLEFBaUJDQSxJQUFBO0FBakJZLHNCQUFjLEdBQWQsY0FpQlosQ0FBQTtBQUFBLENBQUMiLCJmaWxlIjoibW9kdWxlcy9hdXRob3JzL2F1dGhvcnMuc2VydmljZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vLyA8cmVmZXJlbmNlIHBhdGg9XCIuLi8uLi8uLi90eXBpbmdzL3RzZC5kLnRzXCIgLz5cbi8vLyA8cmVmZXJlbmNlIHBhdGg9XCIuLi9jb25uZWN0aW9uL2Nvbm5lY3Rpb24uc2VydmljZS50c1wiIC8+XG5cbmltcG9ydCBRID0gcmVxdWlyZShcInFcIik7XG5pbXBvcnQgY29ubmVjdGlvbiA9IHJlcXVpcmUoJy4uL2Nvbm5lY3Rpb24vY29ubmVjdGlvbi5zZXJ2aWNlJylcblxuZXhwb3J0IGludGVyZmFjZSBJQXV0aG9yc1NlcnZpY2Uge1xuICAgIGdldEF1dGhvcnNMaXN0KCk6IFEuSVByb21pc2U8e30+XG4gICAgZ2V0QXV0aG9yQnlJZChhdXRob3JJZCk6IFEuSVByb21pc2U8e30+XG59XG5cblxuZXhwb3J0IGNsYXNzIEF1dGhvcnNTZXJ2aWNlIGltcGxlbWVudHMgSUF1dGhvcnNTZXJ2aWNlIHtcbiAgICBwcml2YXRlIGRiID0gY29ubmVjdGlvbi5zZXJ2aWNlO1xuXG4gICAgZ2V0QXV0aG9yc0xpc3QoKTogUS5JUHJvbWlzZTx7fT4ge1xuICAgICAgICB2YXIgX2xpc3RQcm9taXNlID0gUS5kZWZlcigpO1xuXG4gICAgICAgIHRoaXMuZGIucXVlcnkoJz9qc29uPWdldF9hdXRob3JfaW5kZXgnKVxuICAgICAgICAgICAgLnRoZW4oKHJlc3VsdHMpID0+IHtcbiAgICAgICAgICAgICAgICBfbGlzdFByb21pc2UucmVzb2x2ZShyZXN1bHRzWydhdXRob3JzJ10pO1xuICAgICAgICAgICAgfSlcblxuICAgICAgICByZXR1cm4gX2xpc3RQcm9taXNlLnByb21pc2U7XG4gICAgfVxuXG4gICAgZ2V0QXV0aG9yQnlJZChhdXRob3JJZCk6IFEuSVByb21pc2U8e30+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZGIucXVlcnkoJz9qc29uPTEmcD0nICsgYXV0aG9ySWQpXG4gICAgfVxufTtcbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==