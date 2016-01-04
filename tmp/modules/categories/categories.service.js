/// <reference path="../../../typings/tsd.d.ts" />
/// <reference path="../connection/connection.service.ts" />
var Q = require("q");
var connection = require('../connection/connection.service');
var CategoriesService = (function () {
    function CategoriesService() {
        this.db = connection.service;
    }
    CategoriesService.prototype.getCategoriesList = function () {
        var _listPromise = Q.defer();
        this.db.query('?json=get_category_index').then(function (results) {
            _listPromise.resolve(results['categories']);
        });
        return _listPromise.promise;
    };
    CategoriesService.prototype.getCategoryById = function (categoryId) {
        return this.db.query('?json=1&p=' + categoryId);
    };
    return CategoriesService;
})();
exports.CategoriesService = CategoriesService;
;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1vZHVsZXMvY2F0ZWdvcmllcy9jYXRlZ29yaWVzLnNlcnZpY2UudHMiXSwibmFtZXMiOlsiQ2F0ZWdvcmllc1NlcnZpY2UiLCJDYXRlZ29yaWVzU2VydmljZS5jb25zdHJ1Y3RvciIsIkNhdGVnb3JpZXNTZXJ2aWNlLmdldENhdGVnb3JpZXNMaXN0IiwiQ2F0ZWdvcmllc1NlcnZpY2UuZ2V0Q2F0ZWdvcnlCeUlkIl0sIm1hcHBpbmdzIjoiQUFBQSxrREFBa0Q7QUFDbEQsNERBQTREO0FBRTVELElBQU8sQ0FBQyxXQUFXLEdBQUcsQ0FBQyxDQUFDO0FBQ3hCLElBQU8sVUFBVSxXQUFXLGtDQUFrQyxDQUFDLENBQUE7QUFRL0QsSUFBYSxpQkFBaUI7SUFBOUJBLFNBQWFBLGlCQUFpQkE7UUFDbEJDLE9BQUVBLEdBQUdBLFVBQVVBLENBQUNBLE9BQU9BLENBQUNBO0lBZ0JwQ0EsQ0FBQ0E7SUFkR0QsNkNBQWlCQSxHQUFqQkE7UUFDSUUsSUFBSUEsWUFBWUEsR0FBR0EsQ0FBQ0EsQ0FBQ0EsS0FBS0EsRUFBRUEsQ0FBQ0E7UUFFN0JBLElBQUlBLENBQUNBLEVBQUVBLENBQUNBLEtBQUtBLENBQUNBLDBCQUEwQkEsQ0FBQ0EsQ0FDcENBLElBQUlBLENBQUNBLFVBQUNBLE9BQU9BO1lBQ1ZBLFlBQVlBLENBQUNBLE9BQU9BLENBQUNBLE9BQU9BLENBQUNBLFlBQVlBLENBQUNBLENBQUNBLENBQUNBO1FBQ2hEQSxDQUFDQSxDQUFDQSxDQUFBQTtRQUVOQSxNQUFNQSxDQUFDQSxZQUFZQSxDQUFDQSxPQUFPQSxDQUFDQTtJQUNoQ0EsQ0FBQ0E7SUFFREYsMkNBQWVBLEdBQWZBLFVBQWdCQSxVQUFVQTtRQUN0QkcsTUFBTUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsRUFBRUEsQ0FBQ0EsS0FBS0EsQ0FBQ0EsWUFBWUEsR0FBR0EsVUFBVUEsQ0FBQ0EsQ0FBQUE7SUFDbkRBLENBQUNBO0lBQ0xILHdCQUFDQTtBQUFEQSxDQWpCQSxBQWlCQ0EsSUFBQTtBQWpCWSx5QkFBaUIsR0FBakIsaUJBaUJaLENBQUE7QUFBQSxDQUFDIiwiZmlsZSI6Im1vZHVsZXMvY2F0ZWdvcmllcy9jYXRlZ29yaWVzLnNlcnZpY2UuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvLy8gPHJlZmVyZW5jZSBwYXRoPVwiLi4vLi4vLi4vdHlwaW5ncy90c2QuZC50c1wiIC8+XG4vLy8gPHJlZmVyZW5jZSBwYXRoPVwiLi4vY29ubmVjdGlvbi9jb25uZWN0aW9uLnNlcnZpY2UudHNcIiAvPlxuXG5pbXBvcnQgUSA9IHJlcXVpcmUoXCJxXCIpO1xuaW1wb3J0IGNvbm5lY3Rpb24gPSByZXF1aXJlKCcuLi9jb25uZWN0aW9uL2Nvbm5lY3Rpb24uc2VydmljZScpXG5cbmV4cG9ydCBpbnRlcmZhY2UgSUNhdGVnb3JpZXNTZXJ2aWNlIHtcbiAgICBnZXRDYXRlZ29yaWVzTGlzdCgpOiBRLklQcm9taXNlPHt9PlxuICAgIGdldENhdGVnb3J5QnlJZChjYXRlZ29yeUlkKTogUS5JUHJvbWlzZTx7fT5cbn1cblxuXG5leHBvcnQgY2xhc3MgQ2F0ZWdvcmllc1NlcnZpY2UgaW1wbGVtZW50cyBJQ2F0ZWdvcmllc1NlcnZpY2Uge1xuICAgIHByaXZhdGUgZGIgPSBjb25uZWN0aW9uLnNlcnZpY2U7XG5cbiAgICBnZXRDYXRlZ29yaWVzTGlzdCgpOiBRLklQcm9taXNlPHt9PiB7XG4gICAgICAgIHZhciBfbGlzdFByb21pc2UgPSBRLmRlZmVyKCk7XG5cbiAgICAgICAgdGhpcy5kYi5xdWVyeSgnP2pzb249Z2V0X2NhdGVnb3J5X2luZGV4JylcbiAgICAgICAgICAgIC50aGVuKChyZXN1bHRzKSA9PiB7XG4gICAgICAgICAgICAgICAgX2xpc3RQcm9taXNlLnJlc29sdmUocmVzdWx0c1snY2F0ZWdvcmllcyddKTtcbiAgICAgICAgICAgIH0pXG5cbiAgICAgICAgcmV0dXJuIF9saXN0UHJvbWlzZS5wcm9taXNlO1xuICAgIH1cblxuICAgIGdldENhdGVnb3J5QnlJZChjYXRlZ29yeUlkKTogUS5JUHJvbWlzZTx7fT4ge1xuICAgICAgICByZXR1cm4gdGhpcy5kYi5xdWVyeSgnP2pzb249MSZwPScgKyBjYXRlZ29yeUlkKVxuICAgIH1cbn07XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=