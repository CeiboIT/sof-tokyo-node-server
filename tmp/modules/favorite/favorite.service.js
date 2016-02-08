/// <reference path="../../../typings/tsd.d.ts" />
/// <reference path="../connection/connection.service.ts" />
var Q = require("q");
var connection = require('../connection/connection.service');
var FavoriteService = (function () {
    function FavoriteService() {
        this.db = connection.service;
    }
    FavoriteService.prototype.showFavorite = function (userId) {
        var _promise = Q.defer();
        var query = "SELECT * FROM " + "( " + "SELECT post_id " + "FROM wp2_user_favorite " + "WHERE user_id=" + userId + ") list " + "JOIN " + "( " + "SELECT * FROM " + "( " + "SELECT ID as post_id, post_author, post_title " + "FROM wp2_posts " + ") posts " + "JOIN " + "( " + "SELECT ID as user_id, display_name " + "FROM wp2_users " + ") users " + "ON posts.post_author = users.user_id " + ") data " + "ON list.post_id = data.post_id";
        this.db.query_db(query).then(function (data) {
            _promise.resolve(data);
        });
        return _promise.promise;
    };
    FavoriteService.prototype.createFavorite = function (userId, productId) {
        var _promise = Q.defer();
        var query = "INSERT INTO wp2_user_favorite (post_id, user_id) " + "VALUES (" + productId + "," + userId + ") " + "ON DUPLICATE KEY UPDATE user_id=user_id";
        this.db.query_db(query).then(function (data) {
            _promise.resolve(data);
        });
        return _promise.promise;
    };
    FavoriteService.prototype.removeFavorite = function (userId, productId) {
        var _promise = Q.defer();
        var query = "DELETE FROM wp2_user_favorite " + "WHERE post_id=" + productId + " AND user_id=" + userId + " " + "LIMIT 1";
        this.db.query_db(query).then(function (data) {
            _promise.resolve(data);
        });
        return _promise.promise;
    };
    return FavoriteService;
})();
exports.FavoriteService = FavoriteService;
;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1vZHVsZXMvZmF2b3JpdGUvZmF2b3JpdGUuc2VydmljZS50cyJdLCJuYW1lcyI6WyJGYXZvcml0ZVNlcnZpY2UiLCJGYXZvcml0ZVNlcnZpY2UuY29uc3RydWN0b3IiLCJGYXZvcml0ZVNlcnZpY2Uuc2hvd0Zhdm9yaXRlIiwiRmF2b3JpdGVTZXJ2aWNlLmNyZWF0ZUZhdm9yaXRlIiwiRmF2b3JpdGVTZXJ2aWNlLnJlbW92ZUZhdm9yaXRlIl0sIm1hcHBpbmdzIjoiQUFBQSxrREFBa0Q7QUFDbEQsNERBQTREO0FBRTVELElBQU8sQ0FBQyxXQUFXLEdBQUcsQ0FBQyxDQUFDO0FBQ3hCLElBQU8sVUFBVSxXQUFXLGtDQUFrQyxDQUFDLENBQUE7QUFVL0QsSUFBYSxlQUFlO0lBQTVCQSxTQUFhQSxlQUFlQTtRQUNoQkMsT0FBRUEsR0FBR0EsVUFBVUEsQ0FBQ0EsT0FBT0EsQ0FBQ0E7SUEyRHBDQSxDQUFDQTtJQXpER0Qsc0NBQVlBLEdBQVpBLFVBQWFBLE1BQU1BO1FBQ2ZFLElBQUlBLFFBQVFBLEdBQUdBLENBQUNBLENBQUNBLEtBQUtBLEVBQUVBLENBQUNBO1FBQ3pCQSxJQUFJQSxLQUFLQSxHQUFHQSxnQkFBZ0JBLEdBQ1pBLElBQUlBLEdBQ0pBLGlCQUFpQkEsR0FDakJBLHlCQUF5QkEsR0FDekJBLGdCQUFnQkEsR0FBR0EsTUFBTUEsR0FDekJBLFNBQVNBLEdBQ2JBLE9BQU9BLEdBQ0hBLElBQUlBLEdBQ0pBLGdCQUFnQkEsR0FDWkEsSUFBSUEsR0FDSkEsZ0RBQWdEQSxHQUNoREEsaUJBQWlCQSxHQUNqQkEsVUFBVUEsR0FDZEEsT0FBT0EsR0FDSEEsSUFBSUEsR0FDSkEscUNBQXFDQSxHQUNyQ0EsaUJBQWlCQSxHQUNqQkEsVUFBVUEsR0FDVkEsdUNBQXVDQSxHQUMzQ0EsU0FBU0EsR0FDYkEsZ0NBQWdDQSxDQUFDQTtRQUM3Q0EsSUFBSUEsQ0FBQ0EsRUFBRUEsQ0FBQ0EsUUFBUUEsQ0FBQ0EsS0FBS0EsQ0FBQ0EsQ0FDbEJBLElBQUlBLENBQUNBLFVBQUNBLElBQUlBO1lBQ1BBLFFBQVFBLENBQUNBLE9BQU9BLENBQUNBLElBQUlBLENBQUNBLENBQUNBO1FBQzNCQSxDQUFDQSxDQUFDQSxDQUFDQTtRQUVQQSxNQUFNQSxDQUFDQSxRQUFRQSxDQUFDQSxPQUFPQSxDQUFDQTtJQUM1QkEsQ0FBQ0E7SUFFREYsd0NBQWNBLEdBQWRBLFVBQWVBLE1BQU1BLEVBQUVBLFNBQVNBO1FBQzVCRyxJQUFJQSxRQUFRQSxHQUFHQSxDQUFDQSxDQUFDQSxLQUFLQSxFQUFFQSxDQUFDQTtRQUN6QkEsSUFBSUEsS0FBS0EsR0FBR0EsbURBQW1EQSxHQUNuREEsVUFBVUEsR0FBR0EsU0FBU0EsR0FBR0EsR0FBR0EsR0FBR0EsTUFBTUEsR0FBR0EsSUFBSUEsR0FDNUNBLHlDQUF5Q0EsQ0FBQ0E7UUFDdERBLElBQUlBLENBQUNBLEVBQUVBLENBQUNBLFFBQVFBLENBQUNBLEtBQUtBLENBQUNBLENBQ2xCQSxJQUFJQSxDQUFDQSxVQUFDQSxJQUFJQTtZQUNQQSxRQUFRQSxDQUFDQSxPQUFPQSxDQUFDQSxJQUFJQSxDQUFDQSxDQUFDQTtRQUMzQkEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7UUFFUEEsTUFBTUEsQ0FBQ0EsUUFBUUEsQ0FBQ0EsT0FBT0EsQ0FBQ0E7SUFDNUJBLENBQUNBO0lBRURILHdDQUFjQSxHQUFkQSxVQUFlQSxNQUFNQSxFQUFFQSxTQUFTQTtRQUM1QkksSUFBSUEsUUFBUUEsR0FBR0EsQ0FBQ0EsQ0FBQ0EsS0FBS0EsRUFBRUEsQ0FBQ0E7UUFDekJBLElBQUlBLEtBQUtBLEdBQUdBLGdDQUFnQ0EsR0FDaENBLGdCQUFnQkEsR0FBR0EsU0FBU0EsR0FBR0EsZUFBZUEsR0FBR0EsTUFBTUEsR0FBR0EsR0FBR0EsR0FDN0RBLFNBQVNBLENBQUNBO1FBQ3RCQSxJQUFJQSxDQUFDQSxFQUFFQSxDQUFDQSxRQUFRQSxDQUFDQSxLQUFLQSxDQUFDQSxDQUNsQkEsSUFBSUEsQ0FBQ0EsVUFBQ0EsSUFBSUE7WUFDUEEsUUFBUUEsQ0FBQ0EsT0FBT0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsQ0FBQ0E7UUFDM0JBLENBQUNBLENBQUNBLENBQUNBO1FBRVBBLE1BQU1BLENBQUNBLFFBQVFBLENBQUNBLE9BQU9BLENBQUNBO0lBQzVCQSxDQUFDQTtJQUVMSixzQkFBQ0E7QUFBREEsQ0E1REEsQUE0RENBLElBQUE7QUE1RFksdUJBQWUsR0FBZixlQTREWixDQUFBO0FBQUEsQ0FBQyIsImZpbGUiOiJtb2R1bGVzL2Zhdm9yaXRlL2Zhdm9yaXRlLnNlcnZpY2UuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvLy8gPHJlZmVyZW5jZSBwYXRoPVwiLi4vLi4vLi4vdHlwaW5ncy90c2QuZC50c1wiIC8+XG4vLy8gPHJlZmVyZW5jZSBwYXRoPVwiLi4vY29ubmVjdGlvbi9jb25uZWN0aW9uLnNlcnZpY2UudHNcIiAvPlxuXG5pbXBvcnQgUSA9IHJlcXVpcmUoXCJxXCIpO1xuaW1wb3J0IGNvbm5lY3Rpb24gPSByZXF1aXJlKCcuLi9jb25uZWN0aW9uL2Nvbm5lY3Rpb24uc2VydmljZScpXG5cbmV4cG9ydCBpbnRlcmZhY2UgSUZhdm9yaXRlU2VydmljZSB7XG4gICAgLy8gR0VUXG4gICAgc2hvd0Zhdm9yaXRlKHVzZXJJZCk6IFEuSVByb21pc2U8e30+O1xuICAgIC8vIFBPU1RcbiAgICBjcmVhdGVGYXZvcml0ZSh1c2VySWQsIHByb2R1Y3RJZCk6IFEuSVByb21pc2U8e30+O1xuICAgIHJlbW92ZUZhdm9yaXRlKHVzZXJJZCwgcHJvZHVjdElkKTogUS5JUHJvbWlzZTx7fT47XG59XG5cbmV4cG9ydCBjbGFzcyBGYXZvcml0ZVNlcnZpY2UgaW1wbGVtZW50cyBJRmF2b3JpdGVTZXJ2aWNlIHtcbiAgICBwcml2YXRlIGRiID0gY29ubmVjdGlvbi5zZXJ2aWNlO1xuXG4gICAgc2hvd0Zhdm9yaXRlKHVzZXJJZCk6IFEuSVByb21pc2U8e30+IHtcbiAgICAgICAgdmFyIF9wcm9taXNlID0gUS5kZWZlcigpO1xuICAgICAgICB2YXIgcXVlcnkgPSBcIlNFTEVDVCAqIEZST00gXCIgK1xuICAgICAgICAgICAgICAgICAgICAgICAgXCIoIFwiICtcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiU0VMRUNUIHBvc3RfaWQgXCIgK1xuICAgICAgICAgICAgICAgICAgICAgICAgXCJGUk9NIHdwMl91c2VyX2Zhdm9yaXRlIFwiICtcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiV0hFUkUgdXNlcl9pZD1cIiArIHVzZXJJZCArXG4gICAgICAgICAgICAgICAgICAgICAgICBcIikgbGlzdCBcIiArXG4gICAgICAgICAgICAgICAgICAgIFwiSk9JTiBcIiArXG4gICAgICAgICAgICAgICAgICAgICAgICBcIiggXCIgK1xuICAgICAgICAgICAgICAgICAgICAgICAgXCJTRUxFQ1QgKiBGUk9NIFwiICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIiggXCIgK1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiU0VMRUNUIElEIGFzIHBvc3RfaWQsIHBvc3RfYXV0aG9yLCBwb3N0X3RpdGxlIFwiICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIkZST00gd3AyX3Bvc3RzIFwiICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIikgcG9zdHMgXCIgK1xuICAgICAgICAgICAgICAgICAgICAgICAgXCJKT0lOIFwiICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIiggXCIgK1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiU0VMRUNUIElEIGFzIHVzZXJfaWQsIGRpc3BsYXlfbmFtZSBcIiArXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJGUk9NIHdwMl91c2VycyBcIiArXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCIpIHVzZXJzIFwiICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIk9OIHBvc3RzLnBvc3RfYXV0aG9yID0gdXNlcnMudXNlcl9pZCBcIiArXG4gICAgICAgICAgICAgICAgICAgICAgICBcIikgZGF0YSBcIiArXG4gICAgICAgICAgICAgICAgICAgIFwiT04gbGlzdC5wb3N0X2lkID0gZGF0YS5wb3N0X2lkXCI7XG4gICAgICAgIHRoaXMuZGIucXVlcnlfZGIocXVlcnkpXG4gICAgICAgICAgICAudGhlbigoZGF0YSkgPT4ge1xuICAgICAgICAgICAgICAgIF9wcm9taXNlLnJlc29sdmUoZGF0YSk7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gX3Byb21pc2UucHJvbWlzZTtcbiAgICB9XG5cbiAgICBjcmVhdGVGYXZvcml0ZSh1c2VySWQsIHByb2R1Y3RJZCk6IFEuSVByb21pc2U8e30+IHtcbiAgICAgICAgdmFyIF9wcm9taXNlID0gUS5kZWZlcigpO1xuICAgICAgICB2YXIgcXVlcnkgPSBcIklOU0VSVCBJTlRPIHdwMl91c2VyX2Zhdm9yaXRlIChwb3N0X2lkLCB1c2VyX2lkKSBcIiArXG4gICAgICAgICAgICAgICAgICAgIFwiVkFMVUVTIChcIiArIHByb2R1Y3RJZCArIFwiLFwiICsgdXNlcklkICsgXCIpIFwiICtcbiAgICAgICAgICAgICAgICAgICAgXCJPTiBEVVBMSUNBVEUgS0VZIFVQREFURSB1c2VyX2lkPXVzZXJfaWRcIjtcbiAgICAgICAgdGhpcy5kYi5xdWVyeV9kYihxdWVyeSlcbiAgICAgICAgICAgIC50aGVuKChkYXRhKSA9PiB7XG4gICAgICAgICAgICAgICAgX3Byb21pc2UucmVzb2x2ZShkYXRhKTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiBfcHJvbWlzZS5wcm9taXNlO1xuICAgIH1cblxuICAgIHJlbW92ZUZhdm9yaXRlKHVzZXJJZCwgcHJvZHVjdElkKTogUS5JUHJvbWlzZTx7fT4ge1xuICAgICAgICB2YXIgX3Byb21pc2UgPSBRLmRlZmVyKCk7XG4gICAgICAgIHZhciBxdWVyeSA9IFwiREVMRVRFIEZST00gd3AyX3VzZXJfZmF2b3JpdGUgXCIgK1xuICAgICAgICAgICAgICAgICAgICBcIldIRVJFIHBvc3RfaWQ9XCIgKyBwcm9kdWN0SWQgKyBcIiBBTkQgdXNlcl9pZD1cIiArIHVzZXJJZCArIFwiIFwiICtcbiAgICAgICAgICAgICAgICAgICAgXCJMSU1JVCAxXCI7XG4gICAgICAgIHRoaXMuZGIucXVlcnlfZGIocXVlcnkpXG4gICAgICAgICAgICAudGhlbigoZGF0YSkgPT4ge1xuICAgICAgICAgICAgICAgIF9wcm9taXNlLnJlc29sdmUoZGF0YSk7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gX3Byb21pc2UucHJvbWlzZTtcbiAgICB9XG5cbn07XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=