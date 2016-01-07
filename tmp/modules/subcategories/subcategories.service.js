/// <reference path="../../../typings/tsd.d.ts" />
/// <reference path="../connection/connection.service.ts" />
var Q = require("q");
var connection = require('../connection/connection.service');
var SubcategoriesService = (function () {
    function SubcategoriesService() {
        this.db = connection.service;
    }
    SubcategoriesService.prototype.getSubcategoriesList = function () {
        var _listPromise = Q.defer();
        //this.db.query_db("SELECT meta_key, meta_value FROM wp2_postmeta WHERE meta_key LIKE 'sofbackend__sof_work_meta__category_%'")
        this.db.query_db("SELECT meta_key, meta_value FROM wp2_postmeta WHERE meta_key LIKE 'sofbackend__sof_work_meta'").then(function (data) {
            _listPromise.resolve(data);
        });
        return _listPromise.promise;
    };
    return SubcategoriesService;
})();
exports.SubcategoriesService = SubcategoriesService;
;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1vZHVsZXMvc3ViY2F0ZWdvcmllcy9zdWJjYXRlZ29yaWVzLnNlcnZpY2UudHMiXSwibmFtZXMiOlsiU3ViY2F0ZWdvcmllc1NlcnZpY2UiLCJTdWJjYXRlZ29yaWVzU2VydmljZS5jb25zdHJ1Y3RvciIsIlN1YmNhdGVnb3JpZXNTZXJ2aWNlLmdldFN1YmNhdGVnb3JpZXNMaXN0Il0sIm1hcHBpbmdzIjoiQUFBQSxrREFBa0Q7QUFDbEQsNERBQTREO0FBRTVELElBQU8sQ0FBQyxXQUFXLEdBQUcsQ0FBQyxDQUFDO0FBQ3hCLElBQU8sVUFBVSxXQUFXLGtDQUFrQyxDQUFDLENBQUE7QUFRL0QsSUFBYSxvQkFBb0I7SUFBakNBLFNBQWFBLG9CQUFvQkE7UUFDckJDLE9BQUVBLEdBQUdBLFVBQVVBLENBQUNBLE9BQU9BLENBQUNBO0lBV3BDQSxDQUFDQTtJQVRHRCxtREFBb0JBLEdBQXBCQTtRQUNJRSxJQUFJQSxZQUFZQSxHQUFHQSxDQUFDQSxDQUFDQSxLQUFLQSxFQUFFQSxDQUFDQTtRQUM3QkEsQUFDQUEsK0hBRCtIQTtRQUMvSEEsSUFBSUEsQ0FBQ0EsRUFBRUEsQ0FBQ0EsUUFBUUEsQ0FBQ0EsK0ZBQStGQSxDQUFDQSxDQUM1R0EsSUFBSUEsQ0FBQ0EsVUFBQ0EsSUFBSUE7WUFDUEEsWUFBWUEsQ0FBQ0EsT0FBT0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsQ0FBQ0E7UUFDL0JBLENBQUNBLENBQUNBLENBQUFBO1FBQ05BLE1BQU1BLENBQUNBLFlBQVlBLENBQUNBLE9BQU9BLENBQUNBO0lBQ2hDQSxDQUFDQTtJQUNMRiwyQkFBQ0E7QUFBREEsQ0FaQSxBQVlDQSxJQUFBO0FBWlksNEJBQW9CLEdBQXBCLG9CQVlaLENBQUE7QUFBQSxDQUFDIiwiZmlsZSI6Im1vZHVsZXMvc3ViY2F0ZWdvcmllcy9zdWJjYXRlZ29yaWVzLnNlcnZpY2UuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvLy8gPHJlZmVyZW5jZSBwYXRoPVwiLi4vLi4vLi4vdHlwaW5ncy90c2QuZC50c1wiIC8+XG4vLy8gPHJlZmVyZW5jZSBwYXRoPVwiLi4vY29ubmVjdGlvbi9jb25uZWN0aW9uLnNlcnZpY2UudHNcIiAvPlxuXG5pbXBvcnQgUSA9IHJlcXVpcmUoXCJxXCIpO1xuaW1wb3J0IGNvbm5lY3Rpb24gPSByZXF1aXJlKCcuLi9jb25uZWN0aW9uL2Nvbm5lY3Rpb24uc2VydmljZScpXG5cbmV4cG9ydCBpbnRlcmZhY2UgSVN1YmNhdGVnb3JpZXNTZXJ2aWNlIHtcbiAgICAvLyBHRVRcbiAgICBnZXRTdWJjYXRlZ29yaWVzTGlzdCgpOiBRLklQcm9taXNlPHt9Pjtcbn1cblxuXG5leHBvcnQgY2xhc3MgU3ViY2F0ZWdvcmllc1NlcnZpY2UgaW1wbGVtZW50cyBJU3ViY2F0ZWdvcmllc1NlcnZpY2Uge1xuICAgIHByaXZhdGUgZGIgPSBjb25uZWN0aW9uLnNlcnZpY2U7XG5cbiAgICBnZXRTdWJjYXRlZ29yaWVzTGlzdCgpOiBRLklQcm9taXNlPHt9PiB7XG4gICAgICAgIHZhciBfbGlzdFByb21pc2UgPSBRLmRlZmVyKCk7XG4gICAgICAgIC8vdGhpcy5kYi5xdWVyeV9kYihcIlNFTEVDVCBtZXRhX2tleSwgbWV0YV92YWx1ZSBGUk9NIHdwMl9wb3N0bWV0YSBXSEVSRSBtZXRhX2tleSBMSUtFICdzb2ZiYWNrZW5kX19zb2Zfd29ya19tZXRhX19jYXRlZ29yeV8lJ1wiKVxuICAgICAgICB0aGlzLmRiLnF1ZXJ5X2RiKFwiU0VMRUNUIG1ldGFfa2V5LCBtZXRhX3ZhbHVlIEZST00gd3AyX3Bvc3RtZXRhIFdIRVJFIG1ldGFfa2V5IExJS0UgJ3NvZmJhY2tlbmRfX3NvZl93b3JrX21ldGEnXCIpXG4gICAgICAgICAgICAudGhlbigoZGF0YSkgPT4ge1xuICAgICAgICAgICAgICAgIF9saXN0UHJvbWlzZS5yZXNvbHZlKGRhdGEpO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgcmV0dXJuIF9saXN0UHJvbWlzZS5wcm9taXNlO1xuICAgIH1cbn07XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=