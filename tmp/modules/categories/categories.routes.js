'use strict';
///<reference path="../../../typings/tsd.d.ts" />
///<reference path="./categories.service.ts" />
var service = require('./categories.service');
var CategoriesService = new service.CategoriesService();
var _prefix = '/categories';
var categories = [
    {
        method: 'GET',
        path: _prefix + '/list',
        handler: function (request, reply) {
            CategoriesService.getCategoriesList().then(function (data) {
                reply(data);
            });
        },
        config: {
            description: 'Retrieve Categories list'
        }
    }
];
module.exports = categories;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1vZHVsZXMvY2F0ZWdvcmllcy9jYXRlZ29yaWVzLnJvdXRlcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxZQUFZLENBQUM7QUFFYixBQUlBLGlEQUppRDtBQUNqRCwrQ0FBK0M7QUFHL0MsSUFBTyxPQUFPLFdBQVcsc0JBQXNCLENBQUMsQ0FBQztBQUVqRCxJQUFJLGlCQUFpQixHQUFHLElBQUksT0FBTyxDQUFDLGlCQUFpQixFQUFFLENBQUM7QUFDeEQsSUFBSSxPQUFPLEdBQUcsYUFBYSxDQUFDO0FBQzVCLElBQUksVUFBVSxHQUFHO0lBQ2I7UUFDSSxNQUFNLEVBQUUsS0FBSztRQUNiLElBQUksRUFBRSxPQUFPLEdBQUcsT0FBTztRQUN2QixPQUFPLEVBQUUsVUFBUyxPQUFPLEVBQUUsS0FBSztZQUM1QixpQkFBaUIsQ0FBQyxpQkFBaUIsRUFBRSxDQUFDLElBQUksQ0FBQyxVQUFDLElBQWdCO2dCQUN4RCxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDaEIsQ0FBQyxDQUFDLENBQUE7UUFDTixDQUFDO1FBQ0QsTUFBTSxFQUFFO1lBQ0osV0FBVyxFQUFFLDBCQUEwQjtTQUMxQztLQUNKO0NBQ0osQ0FBQTtBQUdELE1BQU0sQ0FBQyxPQUFPLEdBQUcsVUFBVSxDQUFDIiwiZmlsZSI6Im1vZHVsZXMvY2F0ZWdvcmllcy9jYXRlZ29yaWVzLnJvdXRlcy5qcyIsInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0JztcblxuLy8vPHJlZmVyZW5jZSBwYXRoPVwiLi4vLi4vLi4vdHlwaW5ncy90c2QuZC50c1wiIC8+XG4vLy88cmVmZXJlbmNlIHBhdGg9XCIuL2NhdGVnb3JpZXMuc2VydmljZS50c1wiIC8+XG5cblxuaW1wb3J0IHNlcnZpY2UgPSByZXF1aXJlKCcuL2NhdGVnb3JpZXMuc2VydmljZScpO1xuXG52YXIgQ2F0ZWdvcmllc1NlcnZpY2UgPSBuZXcgc2VydmljZS5DYXRlZ29yaWVzU2VydmljZSgpO1xudmFyIF9wcmVmaXggPSAnL2NhdGVnb3JpZXMnO1xudmFyIGNhdGVnb3JpZXMgPSBbXG4gICAge1xuICAgICAgICBtZXRob2Q6ICdHRVQnLFxuICAgICAgICBwYXRoOiBfcHJlZml4ICsgJy9saXN0JyxcbiAgICAgICAgaGFuZGxlcjogZnVuY3Rpb24ocmVxdWVzdCwgcmVwbHkpIHtcbiAgICAgICAgICAgIENhdGVnb3JpZXNTZXJ2aWNlLmdldENhdGVnb3JpZXNMaXN0KCkudGhlbigoZGF0YTogQXJyYXk8YW55PikgPT4ge1xuICAgICAgICAgICAgICAgIHJlcGx5KGRhdGEpO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgfSxcbiAgICAgICAgY29uZmlnOiB7XG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogJ1JldHJpZXZlIENhdGVnb3JpZXMgbGlzdCdcbiAgICAgICAgfVxuICAgIH1cbl1cblxuXG5tb2R1bGUuZXhwb3J0cyA9IGNhdGVnb3JpZXM7XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=