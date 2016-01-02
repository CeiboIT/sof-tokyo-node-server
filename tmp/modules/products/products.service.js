/// <reference path="../../../typings/tsd.d.ts" />
/// <reference path="../connection/connection.service.ts" />
var Q = require("q");
var connection = require('../connection/connection.service');
var ProductsService = (function () {
    function ProductsService() {
        this.db = connection.service;
    }
    // TODO Necesitamos implementar paginacion Urgente!!!! 
    ProductsService.prototype.getProductsList = function () {
        var _listPromise = Q.defer();
        this.db.query('?json=get_recent_posts').then(function (results) {
            _listPromise.resolve(results['posts']);
        });
        return _listPromise.promise;
    };
    ProductsService.prototype.getProductById = function (productId) {
        return this.db.query('SELECT * FROM wp2_posts JOIN wp2_postmeta ON wp2_postmeta.post_id = wp2_posts.ID JOIN wp2_users ON wp2_users.ID = wp2_posts.post_author WHERE wp2_posts.ID=' + productId);
    };
    return ProductsService;
})();
exports.ProductsService = ProductsService;
;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1vZHVsZXMvcHJvZHVjdHMvcHJvZHVjdHMuc2VydmljZS50cyJdLCJuYW1lcyI6WyJQcm9kdWN0c1NlcnZpY2UiLCJQcm9kdWN0c1NlcnZpY2UuY29uc3RydWN0b3IiLCJQcm9kdWN0c1NlcnZpY2UuZ2V0UHJvZHVjdHNMaXN0IiwiUHJvZHVjdHNTZXJ2aWNlLmdldFByb2R1Y3RCeUlkIl0sIm1hcHBpbmdzIjoiQUFBQSxrREFBa0Q7QUFDbEQsNERBQTREO0FBRTVELElBQU8sQ0FBQyxXQUFXLEdBQUcsQ0FBQyxDQUFDO0FBQ3hCLElBQU8sVUFBVSxXQUFXLGtDQUFrQyxDQUFDLENBQUE7QUFVL0QsSUFBYSxlQUFlO0lBQTVCQSxTQUFhQSxlQUFlQTtRQUNoQkMsT0FBRUEsR0FBR0EsVUFBVUEsQ0FBQ0EsT0FBT0EsQ0FBQ0E7SUFtQnBDQSxDQUFDQTtJQWpCR0QsdURBQXVEQTtJQUd2REEseUNBQWVBLEdBQWZBO1FBQ0lFLElBQUlBLFlBQVlBLEdBQUdBLENBQUNBLENBQUNBLEtBQUtBLEVBQUVBLENBQUNBO1FBRTdCQSxJQUFJQSxDQUFDQSxFQUFFQSxDQUFDQSxLQUFLQSxDQUFDQSx3QkFBd0JBLENBQUNBLENBQ2xDQSxJQUFJQSxDQUFDQSxVQUFDQSxPQUFPQTtZQUNWQSxZQUFZQSxDQUFDQSxPQUFPQSxDQUFDQSxPQUFPQSxDQUFDQSxPQUFPQSxDQUFDQSxDQUFDQSxDQUFDQTtRQUMzQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQUE7UUFFTkEsTUFBTUEsQ0FBQ0EsWUFBWUEsQ0FBQ0EsT0FBT0EsQ0FBQ0E7SUFDaENBLENBQUNBO0lBRURGLHdDQUFjQSxHQUFkQSxVQUFlQSxTQUFTQTtRQUNwQkcsTUFBTUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsRUFBRUEsQ0FBQ0EsS0FBS0EsQ0FBQ0EsNkpBQTZKQSxHQUFHQSxTQUFTQSxDQUFDQSxDQUFBQTtJQUNuTUEsQ0FBQ0E7SUFDTEgsc0JBQUNBO0FBQURBLENBcEJBLEFBb0JDQSxJQUFBO0FBcEJZLHVCQUFlLEdBQWYsZUFvQlosQ0FBQTtBQUFBLENBQUMiLCJmaWxlIjoibW9kdWxlcy9wcm9kdWN0cy9wcm9kdWN0cy5zZXJ2aWNlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy8vIDxyZWZlcmVuY2UgcGF0aD1cIi4uLy4uLy4uL3R5cGluZ3MvdHNkLmQudHNcIiAvPlxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPVwiLi4vY29ubmVjdGlvbi9jb25uZWN0aW9uLnNlcnZpY2UudHNcIiAvPlxyXG5cclxuaW1wb3J0IFEgPSByZXF1aXJlKFwicVwiKTtcclxuaW1wb3J0IGNvbm5lY3Rpb24gPSByZXF1aXJlKCcuLi9jb25uZWN0aW9uL2Nvbm5lY3Rpb24uc2VydmljZScpXHJcbmltcG9ydCBfID0gcmVxdWlyZShcImxvZGFzaFwiKTtcclxuaW1wb3J0IGh0dHAgPSByZXF1aXJlKFwiaHR0cFwiKTtcclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgSVByb2R1Y3RzU2VydmljZSB7XHJcbiAgICBnZXRQcm9kdWN0c0xpc3QoKTogUS5JUHJvbWlzZTx7fT5cclxuICAgIGdldFByb2R1Y3RCeUlkKHByb2R1Y3RJZCk6IFEuSVByb21pc2U8e30+XHJcbn1cclxuXHJcblxyXG5leHBvcnQgY2xhc3MgUHJvZHVjdHNTZXJ2aWNlIGltcGxlbWVudHMgSVByb2R1Y3RzU2VydmljZSB7XHJcbiAgICBwcml2YXRlIGRiID0gY29ubmVjdGlvbi5zZXJ2aWNlO1xyXG5cclxuICAgIC8vIFRPRE8gTmVjZXNpdGFtb3MgaW1wbGVtZW50YXIgcGFnaW5hY2lvbiBVcmdlbnRlISEhISBcclxuXHJcblxyXG4gICAgZ2V0UHJvZHVjdHNMaXN0KCk6IFEuSVByb21pc2U8e30+IHtcclxuICAgICAgICB2YXIgX2xpc3RQcm9taXNlID0gUS5kZWZlcigpO1xyXG5cclxuICAgICAgICB0aGlzLmRiLnF1ZXJ5KCc/anNvbj1nZXRfcmVjZW50X3Bvc3RzJylcclxuICAgICAgICAgICAgLnRoZW4oKHJlc3VsdHMpID0+IHtcclxuICAgICAgICAgICAgICAgIF9saXN0UHJvbWlzZS5yZXNvbHZlKHJlc3VsdHNbJ3Bvc3RzJ10pO1xyXG4gICAgICAgICAgICB9KVxyXG5cclxuICAgICAgICByZXR1cm4gX2xpc3RQcm9taXNlLnByb21pc2U7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0UHJvZHVjdEJ5SWQocHJvZHVjdElkKTogUS5JUHJvbWlzZTx7fT4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmRiLnF1ZXJ5KCdTRUxFQ1QgKiBGUk9NIHdwMl9wb3N0cyBKT0lOIHdwMl9wb3N0bWV0YSBPTiB3cDJfcG9zdG1ldGEucG9zdF9pZCA9IHdwMl9wb3N0cy5JRCBKT0lOIHdwMl91c2VycyBPTiB3cDJfdXNlcnMuSUQgPSB3cDJfcG9zdHMucG9zdF9hdXRob3IgV0hFUkUgd3AyX3Bvc3RzLklEPScgKyBwcm9kdWN0SWQpXHJcbiAgICB9XHJcbn07Il0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9