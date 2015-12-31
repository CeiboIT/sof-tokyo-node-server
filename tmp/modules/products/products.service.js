/// <reference path="../../../typings/tsd.d.ts" />
/// <reference path="../connection/connection.service.ts" />
var Q = require("q");
var connection = require('../connection/connection.service');
var ProductsService = (function () {
    function ProductsService() {
        this.db = connection.service.getConnection();
    }
    ProductsService.prototype.getProductsList = function () {
        var _this = this;
        var deferred = Q.defer();
        this.db.connect(function (err, result) {
            _this.db.query('SELECT * from wp2_posts', function (err, rows) {
                if (err)
                    throw err;
                deferred.resolve(rows);
            });
        });
        return deferred.promise;
    };
    ProductsService.prototype.getProductById = function (productId) {
        var _this = this;
        var deferred = Q.defer();
        this.db.connect(function (err, result) {
            _this.db.query('SELECT * from wp2_posts WHERE ID=' + productId, function (err, rows) {
                if (err)
                    throw err;
                deferred.resolve(rows);
            });
        });
        return deferred.promise;
    };
    return ProductsService;
})();
exports.ProductsService = ProductsService;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1vZHVsZXMvcHJvZHVjdHMvcHJvZHVjdHMuc2VydmljZS50cyJdLCJuYW1lcyI6WyJQcm9kdWN0c1NlcnZpY2UiLCJQcm9kdWN0c1NlcnZpY2UuY29uc3RydWN0b3IiLCJQcm9kdWN0c1NlcnZpY2UuZ2V0UHJvZHVjdHNMaXN0IiwiUHJvZHVjdHNTZXJ2aWNlLmdldFByb2R1Y3RCeUlkIl0sIm1hcHBpbmdzIjoiQUFBQSxrREFBa0Q7QUFDbEQsNERBQTREO0FBRTVELElBQU8sQ0FBQyxXQUFXLEdBQUcsQ0FBQyxDQUFDO0FBQ3hCLElBQU8sVUFBVSxXQUFXLGtDQUFrQyxDQUFDLENBQUE7QUFFL0QsSUFBYSxlQUFlO0lBRTNCQSxTQUZZQSxlQUFlQTtRQUcxQkMsSUFBSUEsQ0FBQ0EsRUFBRUEsR0FBR0EsVUFBVUEsQ0FBQ0EsT0FBT0EsQ0FBQ0EsYUFBYUEsRUFBRUEsQ0FBQ0E7SUFDOUNBLENBQUNBO0lBRURELHlDQUFlQSxHQUFmQTtRQUFBRSxpQkFVQ0E7UUFUQUEsSUFBSUEsUUFBUUEsR0FBR0EsQ0FBQ0EsQ0FBQ0EsS0FBS0EsRUFBRUEsQ0FBQ0E7UUFDekJBLElBQUlBLENBQUNBLEVBQUVBLENBQUNBLE9BQU9BLENBQUNBLFVBQUNBLEdBQUdBLEVBQUVBLE1BQU1BO1lBQzNCQSxLQUFJQSxDQUFDQSxFQUFFQSxDQUFDQSxLQUFLQSxDQUFDQSx5QkFBeUJBLEVBQUVBLFVBQVNBLEdBQUdBLEVBQUVBLElBQUlBO2dCQUMxRCxFQUFFLENBQUEsQ0FBQyxHQUFHLENBQUM7b0JBQUMsTUFBTSxHQUFHLENBQUM7Z0JBQ2xCLFFBQVEsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUE7WUFDdkIsQ0FBQyxDQUFDQSxDQUFBQTtRQUNIQSxDQUFDQSxDQUFDQSxDQUFBQTtRQUVGQSxNQUFNQSxDQUFDQSxRQUFRQSxDQUFDQSxPQUFPQSxDQUFDQTtJQUN6QkEsQ0FBQ0E7SUFFREYsd0NBQWNBLEdBQWRBLFVBQWVBLFNBQVNBO1FBQXhCRyxpQkFVQ0E7UUFUQUEsSUFBSUEsUUFBUUEsR0FBR0EsQ0FBQ0EsQ0FBQ0EsS0FBS0EsRUFBRUEsQ0FBQ0E7UUFDekJBLElBQUlBLENBQUNBLEVBQUVBLENBQUNBLE9BQU9BLENBQUNBLFVBQUNBLEdBQUdBLEVBQUVBLE1BQU1BO1lBQzNCQSxLQUFJQSxDQUFDQSxFQUFFQSxDQUFDQSxLQUFLQSxDQUFDQSxtQ0FBbUNBLEdBQUdBLFNBQVNBLEVBQUdBLFVBQVNBLEdBQUdBLEVBQUVBLElBQUlBO2dCQUNqRixFQUFFLENBQUEsQ0FBQyxHQUFHLENBQUM7b0JBQUMsTUFBTSxHQUFHLENBQUM7Z0JBQ2xCLFFBQVEsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUE7WUFDdkIsQ0FBQyxDQUFDQSxDQUFBQTtRQUNIQSxDQUFDQSxDQUFDQSxDQUFBQTtRQUVGQSxNQUFNQSxDQUFDQSxRQUFRQSxDQUFDQSxPQUFPQSxDQUFDQTtJQUN6QkEsQ0FBQ0E7SUFFRkgsc0JBQUNBO0FBQURBLENBOUJBLEFBOEJDQSxJQUFBO0FBOUJZLHVCQUFlLEdBQWYsZUE4QlosQ0FBQSIsImZpbGUiOiJtb2R1bGVzL3Byb2R1Y3RzL3Byb2R1Y3RzLnNlcnZpY2UuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvLy8gPHJlZmVyZW5jZSBwYXRoPVwiLi4vLi4vLi4vdHlwaW5ncy90c2QuZC50c1wiIC8+XG4vLy8gPHJlZmVyZW5jZSBwYXRoPVwiLi4vY29ubmVjdGlvbi9jb25uZWN0aW9uLnNlcnZpY2UudHNcIiAvPlxuXG5pbXBvcnQgUSA9IHJlcXVpcmUoXCJxXCIpO1xuaW1wb3J0IGNvbm5lY3Rpb24gPSByZXF1aXJlKCcuLi9jb25uZWN0aW9uL2Nvbm5lY3Rpb24uc2VydmljZScpXG5cbmV4cG9ydCBjbGFzcyBQcm9kdWN0c1NlcnZpY2Uge1xuXHRwcml2YXRlIGRiO1xuXHRjb25zdHJ1Y3RvcigpIHtcblx0XHR0aGlzLmRiID0gY29ubmVjdGlvbi5zZXJ2aWNlLmdldENvbm5lY3Rpb24oKTtcblx0fVxuXG5cdGdldFByb2R1Y3RzTGlzdCgpIHtcblx0XHR2YXIgZGVmZXJyZWQgPSBRLmRlZmVyKCk7XG5cdFx0dGhpcy5kYi5jb25uZWN0KChlcnIsIHJlc3VsdCkgPT4ge1xuXHRcdFx0dGhpcy5kYi5xdWVyeSgnU0VMRUNUICogZnJvbSB3cDJfcG9zdHMnLCBmdW5jdGlvbihlcnIsIHJvd3MpIHtcblx0XHRcdFx0aWYoZXJyKSB0aHJvdyBlcnI7XG5cdFx0XHRcdGRlZmVycmVkLnJlc29sdmUocm93cylcblx0XHRcdH0pXG5cdFx0fSlcblx0XHRcblx0XHRyZXR1cm4gZGVmZXJyZWQucHJvbWlzZTtcblx0fVxuXHRcblx0Z2V0UHJvZHVjdEJ5SWQocHJvZHVjdElkKSB7XG5cdFx0dmFyIGRlZmVycmVkID0gUS5kZWZlcigpO1xuXHRcdHRoaXMuZGIuY29ubmVjdCgoZXJyLCByZXN1bHQpID0+IHtcblx0XHRcdHRoaXMuZGIucXVlcnkoJ1NFTEVDVCAqIGZyb20gd3AyX3Bvc3RzIFdIRVJFIElEPScgKyBwcm9kdWN0SWQgLCBmdW5jdGlvbihlcnIsIHJvd3MpIHtcblx0XHRcdFx0aWYoZXJyKSB0aHJvdyBlcnI7XG5cdFx0XHRcdGRlZmVycmVkLnJlc29sdmUocm93cylcblx0XHRcdH0pXG5cdFx0fSlcblx0XHRcblx0XHRyZXR1cm4gZGVmZXJyZWQucHJvbWlzZTsgXG5cdH1cblxufSJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==