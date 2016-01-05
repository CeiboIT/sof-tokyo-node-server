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
            description: 'Say hello'
        }
    }
];
module.exports = categories;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1vZHVsZXMvY2F0ZWdvcmllcy9jYXRlZ29yaWVzLnJvdXRlcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxZQUFZLENBQUM7QUFFYixBQUlBLGlEQUppRDtBQUNqRCwrQ0FBK0M7QUFHL0MsSUFBTyxPQUFPLFdBQVcsc0JBQXNCLENBQUMsQ0FBQztBQUVqRCxJQUFJLGlCQUFpQixHQUFHLElBQUksT0FBTyxDQUFDLGlCQUFpQixFQUFFLENBQUM7QUFDeEQsSUFBSSxPQUFPLEdBQUcsYUFBYSxDQUFDO0FBQzVCLElBQUksVUFBVSxHQUFHO0lBQ2I7UUFDSSxNQUFNLEVBQUUsS0FBSztRQUNiLElBQUksRUFBRSxPQUFPLEdBQUcsT0FBTztRQUN2QixPQUFPLEVBQUUsVUFBUyxPQUFPLEVBQUUsS0FBSztZQUU1QixpQkFBaUIsQ0FBQyxpQkFBaUIsRUFBRSxDQUFDLElBQUksQ0FBQyxVQUFDLElBQWdCO2dCQUN4RCxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDaEIsQ0FBQyxDQUFDLENBQUE7UUFDTixDQUFDO1FBQ0QsTUFBTSxFQUFFO1lBQ0osV0FBVyxFQUFFLFdBQVc7U0FDM0I7S0FDSjtDQUNKLENBQUE7QUFHRCxNQUFNLENBQUMsT0FBTyxHQUFHLFVBQVUsQ0FBQyIsImZpbGUiOiJtb2R1bGVzL2NhdGVnb3JpZXMvY2F0ZWdvcmllcy5yb3V0ZXMuanMiLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCc7XG5cbi8vLzxyZWZlcmVuY2UgcGF0aD1cIi4uLy4uLy4uL3R5cGluZ3MvdHNkLmQudHNcIiAvPlxuLy8vPHJlZmVyZW5jZSBwYXRoPVwiLi9jYXRlZ29yaWVzLnNlcnZpY2UudHNcIiAvPlxuXG5cbmltcG9ydCBzZXJ2aWNlID0gcmVxdWlyZSgnLi9jYXRlZ29yaWVzLnNlcnZpY2UnKTtcblxudmFyIENhdGVnb3JpZXNTZXJ2aWNlID0gbmV3IHNlcnZpY2UuQ2F0ZWdvcmllc1NlcnZpY2UoKTtcbnZhciBfcHJlZml4ID0gJy9jYXRlZ29yaWVzJztcbnZhciBjYXRlZ29yaWVzID0gW1xuICAgIHtcbiAgICAgICAgbWV0aG9kOiAnR0VUJyxcbiAgICAgICAgcGF0aDogX3ByZWZpeCArICcvbGlzdCcsXG4gICAgICAgIGhhbmRsZXI6IGZ1bmN0aW9uKHJlcXVlc3QsIHJlcGx5KSB7XG5cbiAgICAgICAgICAgIENhdGVnb3JpZXNTZXJ2aWNlLmdldENhdGVnb3JpZXNMaXN0KCkudGhlbigoZGF0YTogQXJyYXk8YW55PikgPT4ge1xuICAgICAgICAgICAgICAgIHJlcGx5KGRhdGEpO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgfSxcbiAgICAgICAgY29uZmlnOiB7XG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogJ1NheSBoZWxsbydcbiAgICAgICAgfVxuICAgIH1cbl1cblxuXG5tb2R1bGUuZXhwb3J0cyA9IGNhdGVnb3JpZXM7XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=