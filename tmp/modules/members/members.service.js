/// <reference path="../../../typings/tsd.d.ts" />
/// <reference path="../connection/connection.service.ts" />
var Q = require("q");
var connection = require('../connection/connection.service');
var MembersService = (function () {
    function MembersService() {
        this.db = connection.service;
    }
    MembersService.prototype.getMembersList = function () {
        var _listPromise = Q.defer();
        this.db.query_db("SELECT id, display_name FROM wp2_users").then(function (data) {
            _listPromise.resolve(data);
        });
        return _listPromise.promise;
    };
    MembersService.prototype.getMemberById = function (memberId) {
        var _promise = Q.defer();
        this.db.query_db("SELECT id, user_login, user_nicename, user_email, user_url, user_registered, display_name FROM wp2_users WHERE id=" + memberId).then(function (data) {
            _promise.resolve(data[0]);
        });
        return _promise.promise;
    };
    return MembersService;
})();
exports.MembersService = MembersService;
;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1vZHVsZXMvbWVtYmVycy9tZW1iZXJzLnNlcnZpY2UudHMiXSwibmFtZXMiOlsiTWVtYmVyc1NlcnZpY2UiLCJNZW1iZXJzU2VydmljZS5jb25zdHJ1Y3RvciIsIk1lbWJlcnNTZXJ2aWNlLmdldE1lbWJlcnNMaXN0IiwiTWVtYmVyc1NlcnZpY2UuZ2V0TWVtYmVyQnlJZCJdLCJtYXBwaW5ncyI6IkFBQUEsa0RBQWtEO0FBQ2xELDREQUE0RDtBQUU1RCxJQUFPLENBQUMsV0FBVyxHQUFHLENBQUMsQ0FBQztBQUN4QixJQUFPLFVBQVUsV0FBVyxrQ0FBa0MsQ0FBQyxDQUFBO0FBUy9ELElBQWEsY0FBYztJQUEzQkEsU0FBYUEsY0FBY0E7UUFDZkMsT0FBRUEsR0FBR0EsVUFBVUEsQ0FBQ0EsT0FBT0EsQ0FBQ0E7SUFxQnBDQSxDQUFDQTtJQW5CR0QsdUNBQWNBLEdBQWRBO1FBQ0lFLElBQUlBLFlBQVlBLEdBQUdBLENBQUNBLENBQUNBLEtBQUtBLEVBQUVBLENBQUNBO1FBQzdCQSxJQUFJQSxDQUFDQSxFQUFFQSxDQUFDQSxRQUFRQSxDQUFDQSx3Q0FBd0NBLENBQUNBLENBQ3JEQSxJQUFJQSxDQUFDQSxVQUFDQSxJQUFJQTtZQUNQQSxZQUFZQSxDQUFDQSxPQUFPQSxDQUFDQSxJQUFJQSxDQUFDQSxDQUFDQTtRQUMvQkEsQ0FBQ0EsQ0FBQ0EsQ0FBQUE7UUFDTkEsTUFBTUEsQ0FBQ0EsWUFBWUEsQ0FBQ0EsT0FBT0EsQ0FBQ0E7SUFDaENBLENBQUNBO0lBRURGLHNDQUFhQSxHQUFiQSxVQUFjQSxRQUFRQTtRQUNsQkcsSUFBSUEsUUFBUUEsR0FBR0EsQ0FBQ0EsQ0FBQ0EsS0FBS0EsRUFBRUEsQ0FBQ0E7UUFDekJBLElBQUlBLENBQUNBLEVBQUVBLENBQUNBLFFBQVFBLENBQUNBLG9IQUFvSEEsR0FBR0EsUUFBUUEsQ0FBQ0EsQ0FDNUlBLElBQUlBLENBQUNBLFVBQUNBLElBQUlBO1lBQ1BBLFFBQVFBLENBQUNBLE9BQU9BLENBQUNBLElBQUlBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLENBQUNBO1FBQzlCQSxDQUFDQSxDQUFDQSxDQUFBQTtRQUNOQSxNQUFNQSxDQUFDQSxRQUFRQSxDQUFDQSxPQUFPQSxDQUFDQTtJQUM1QkEsQ0FBQ0E7SUFHTEgscUJBQUNBO0FBQURBLENBdEJBLEFBc0JDQSxJQUFBO0FBdEJZLHNCQUFjLEdBQWQsY0FzQlosQ0FBQTtBQUFBLENBQUMiLCJmaWxlIjoibW9kdWxlcy9tZW1iZXJzL21lbWJlcnMuc2VydmljZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vLyA8cmVmZXJlbmNlIHBhdGg9XCIuLi8uLi8uLi90eXBpbmdzL3RzZC5kLnRzXCIgLz5cbi8vLyA8cmVmZXJlbmNlIHBhdGg9XCIuLi9jb25uZWN0aW9uL2Nvbm5lY3Rpb24uc2VydmljZS50c1wiIC8+XG5cbmltcG9ydCBRID0gcmVxdWlyZShcInFcIik7XG5pbXBvcnQgY29ubmVjdGlvbiA9IHJlcXVpcmUoJy4uL2Nvbm5lY3Rpb24vY29ubmVjdGlvbi5zZXJ2aWNlJylcblxuZXhwb3J0IGludGVyZmFjZSBJTWVtYmVyc1NlcnZpY2Uge1xuICAgIC8vIEdFVFxuICAgIGdldE1lbWJlcnNMaXN0KCk6IFEuSVByb21pc2U8e30+O1xuICAgIGdldE1lbWJlckJ5SWQobWVtYmVySWQpOiBRLklQcm9taXNlPHt9Pjtcbn1cblxuXG5leHBvcnQgY2xhc3MgTWVtYmVyc1NlcnZpY2UgaW1wbGVtZW50cyBJTWVtYmVyc1NlcnZpY2Uge1xuICAgIHByaXZhdGUgZGIgPSBjb25uZWN0aW9uLnNlcnZpY2U7XG5cbiAgICBnZXRNZW1iZXJzTGlzdCgpOiBRLklQcm9taXNlPHt9PiB7XG4gICAgICAgIHZhciBfbGlzdFByb21pc2UgPSBRLmRlZmVyKCk7XG4gICAgICAgIHRoaXMuZGIucXVlcnlfZGIoXCJTRUxFQ1QgaWQsIGRpc3BsYXlfbmFtZSBGUk9NIHdwMl91c2Vyc1wiKVxuICAgICAgICAgICAgLnRoZW4oKGRhdGEpID0+IHtcbiAgICAgICAgICAgICAgICBfbGlzdFByb21pc2UucmVzb2x2ZShkYXRhKTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgIHJldHVybiBfbGlzdFByb21pc2UucHJvbWlzZTtcbiAgICB9XG5cbiAgICBnZXRNZW1iZXJCeUlkKG1lbWJlcklkKTogUS5JUHJvbWlzZTx7fT4ge1xuICAgICAgICB2YXIgX3Byb21pc2UgPSBRLmRlZmVyKCk7XG4gICAgICAgIHRoaXMuZGIucXVlcnlfZGIoXCJTRUxFQ1QgaWQsIHVzZXJfbG9naW4sIHVzZXJfbmljZW5hbWUsIHVzZXJfZW1haWwsIHVzZXJfdXJsLCB1c2VyX3JlZ2lzdGVyZWQsIGRpc3BsYXlfbmFtZSBGUk9NIHdwMl91c2VycyBXSEVSRSBpZD1cIiArIG1lbWJlcklkKVxuICAgICAgICAgICAgLnRoZW4oKGRhdGEpID0+IHtcbiAgICAgICAgICAgICAgICBfcHJvbWlzZS5yZXNvbHZlKGRhdGFbMF0pO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgcmV0dXJuIF9wcm9taXNlLnByb21pc2U7XG4gICAgfVxuXG5cbn07XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=