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
    },
    {
        method: 'GET',
        path: _prefix + '/test',
        handler: function (request, reply) {
            CategoriesService.getSubcategoriesList().then(function (data) {
                reply(data);
            });
        },
        config: {
            description: 'TEST'
        }
    }
];
module.exports = categories;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1vZHVsZXMvY2F0ZWdvcmllcy9jYXRlZ29yaWVzLnJvdXRlcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxZQUFZLENBQUM7QUFFYixBQUlBLGlEQUppRDtBQUNqRCwrQ0FBK0M7QUFHL0MsSUFBTyxPQUFPLFdBQVcsc0JBQXNCLENBQUMsQ0FBQztBQUVqRCxJQUFJLGlCQUFpQixHQUFHLElBQUksT0FBTyxDQUFDLGlCQUFpQixFQUFFLENBQUM7QUFDeEQsSUFBSSxPQUFPLEdBQUcsYUFBYSxDQUFDO0FBQzVCLElBQUksVUFBVSxHQUFHO0lBQ2I7UUFDSSxNQUFNLEVBQUUsS0FBSztRQUNiLElBQUksRUFBRSxPQUFPLEdBQUcsT0FBTztRQUN2QixPQUFPLEVBQUUsVUFBUyxPQUFPLEVBQUUsS0FBSztZQUM1QixpQkFBaUIsQ0FBQyxpQkFBaUIsRUFBRSxDQUNoQyxJQUFJLENBQUMsVUFBQyxJQUFnQjtnQkFDbkIsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ2hCLENBQUMsQ0FBQyxDQUFBO1FBQ1YsQ0FBQztRQUNELE1BQU0sRUFBRTtZQUNKLFdBQVcsRUFBRSwwQkFBMEI7U0FDMUM7S0FDSjtJQUNEO1FBQ0ksTUFBTSxFQUFFLEtBQUs7UUFDYixJQUFJLEVBQUUsT0FBTyxHQUFHLE9BQU87UUFDdkIsT0FBTyxFQUFFLFVBQVMsT0FBTyxFQUFFLEtBQUs7WUFDNUIsaUJBQWlCLENBQUMsb0JBQW9CLEVBQUUsQ0FDbkMsSUFBSSxDQUFDLFVBQUMsSUFBSTtnQkFDUCxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDaEIsQ0FBQyxDQUFDLENBQUE7UUFDVixDQUFDO1FBQ0QsTUFBTSxFQUFFO1lBQ0osV0FBVyxFQUFFLE1BQU07U0FDdEI7S0FDSjtDQUNKLENBQUE7QUFHRCxNQUFNLENBQUMsT0FBTyxHQUFHLFVBQVUsQ0FBQyIsImZpbGUiOiJtb2R1bGVzL2NhdGVnb3JpZXMvY2F0ZWdvcmllcy5yb3V0ZXMuanMiLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCc7XG5cbi8vLzxyZWZlcmVuY2UgcGF0aD1cIi4uLy4uLy4uL3R5cGluZ3MvdHNkLmQudHNcIiAvPlxuLy8vPHJlZmVyZW5jZSBwYXRoPVwiLi9jYXRlZ29yaWVzLnNlcnZpY2UudHNcIiAvPlxuXG5cbmltcG9ydCBzZXJ2aWNlID0gcmVxdWlyZSgnLi9jYXRlZ29yaWVzLnNlcnZpY2UnKTtcblxudmFyIENhdGVnb3JpZXNTZXJ2aWNlID0gbmV3IHNlcnZpY2UuQ2F0ZWdvcmllc1NlcnZpY2UoKTtcbnZhciBfcHJlZml4ID0gJy9jYXRlZ29yaWVzJztcbnZhciBjYXRlZ29yaWVzID0gW1xuICAgIHtcbiAgICAgICAgbWV0aG9kOiAnR0VUJyxcbiAgICAgICAgcGF0aDogX3ByZWZpeCArICcvbGlzdCcsXG4gICAgICAgIGhhbmRsZXI6IGZ1bmN0aW9uKHJlcXVlc3QsIHJlcGx5KSB7XG4gICAgICAgICAgICBDYXRlZ29yaWVzU2VydmljZS5nZXRDYXRlZ29yaWVzTGlzdCgpXG4gICAgICAgICAgICAgICAgLnRoZW4oKGRhdGE6IEFycmF5PGFueT4pID0+IHtcbiAgICAgICAgICAgICAgICAgICAgcmVwbHkoZGF0YSk7XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgfSxcbiAgICAgICAgY29uZmlnOiB7XG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogJ1JldHJpZXZlIENhdGVnb3JpZXMgbGlzdCdcbiAgICAgICAgfVxuICAgIH0sXG4gICAge1xuICAgICAgICBtZXRob2Q6ICdHRVQnLFxuICAgICAgICBwYXRoOiBfcHJlZml4ICsgJy90ZXN0JyxcbiAgICAgICAgaGFuZGxlcjogZnVuY3Rpb24ocmVxdWVzdCwgcmVwbHkpIHtcbiAgICAgICAgICAgIENhdGVnb3JpZXNTZXJ2aWNlLmdldFN1YmNhdGVnb3JpZXNMaXN0KClcbiAgICAgICAgICAgICAgICAudGhlbigoZGF0YSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICByZXBseShkYXRhKTtcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICB9LFxuICAgICAgICBjb25maWc6IHtcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiAnVEVTVCdcbiAgICAgICAgfVxuICAgIH1cbl1cblxuXG5tb2R1bGUuZXhwb3J0cyA9IGNhdGVnb3JpZXM7XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=