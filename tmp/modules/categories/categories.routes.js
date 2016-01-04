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
    },
    {
        method: 'GET',
        path: _prefix + '/category/{categoryId}',
        handler: function (request, reply) {
            CategoriesService.getCategoryById(request.params.categoryId).then(function (data) {
                reply(data);
            });
        }
    }
];
module.exports = categories;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1vZHVsZXMvY2F0ZWdvcmllcy9jYXRlZ29yaWVzLnJvdXRlcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxZQUFZLENBQUM7QUFFYixBQUlBLGlEQUppRDtBQUNqRCwrQ0FBK0M7QUFHL0MsSUFBTyxPQUFPLFdBQVcsc0JBQXNCLENBQUMsQ0FBQztBQUVqRCxJQUFJLGlCQUFpQixHQUFHLElBQUksT0FBTyxDQUFDLGlCQUFpQixFQUFFLENBQUM7QUFDeEQsSUFBSSxPQUFPLEdBQUcsYUFBYSxDQUFDO0FBQzVCLElBQUksVUFBVSxHQUFHO0lBQ2I7UUFDSSxNQUFNLEVBQUUsS0FBSztRQUNiLElBQUksRUFBRSxPQUFPLEdBQUcsT0FBTztRQUN2QixPQUFPLEVBQUUsVUFBUyxPQUFPLEVBQUUsS0FBSztZQUU1QixpQkFBaUIsQ0FBQyxpQkFBaUIsRUFBRSxDQUFDLElBQUksQ0FBQyxVQUFDLElBQWdCO2dCQUN4RCxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDaEIsQ0FBQyxDQUFDLENBQUE7UUFDTixDQUFDO1FBQ0QsTUFBTSxFQUFFO1lBQ0osV0FBVyxFQUFFLFdBQVc7U0FDM0I7S0FDSjtJQUNEO1FBQ0ksTUFBTSxFQUFFLEtBQUs7UUFDYixJQUFJLEVBQUUsT0FBTyxHQUFHLHdCQUF3QjtRQUN4QyxPQUFPLEVBQUUsVUFBUyxPQUFPLEVBQUUsS0FBSztZQUM1QixpQkFBaUIsQ0FBQyxlQUFlLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBQyxJQUFJO2dCQUNuRSxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDaEIsQ0FBQyxDQUFDLENBQUE7UUFDTixDQUFDO0tBQ0o7Q0FDSixDQUFBO0FBR0QsTUFBTSxDQUFDLE9BQU8sR0FBRyxVQUFVLENBQUMiLCJmaWxlIjoibW9kdWxlcy9jYXRlZ29yaWVzL2NhdGVnb3JpZXMucm91dGVzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnO1xuXG4vLy88cmVmZXJlbmNlIHBhdGg9XCIuLi8uLi8uLi90eXBpbmdzL3RzZC5kLnRzXCIgLz5cbi8vLzxyZWZlcmVuY2UgcGF0aD1cIi4vY2F0ZWdvcmllcy5zZXJ2aWNlLnRzXCIgLz5cblxuXG5pbXBvcnQgc2VydmljZSA9IHJlcXVpcmUoJy4vY2F0ZWdvcmllcy5zZXJ2aWNlJyk7XG5cbnZhciBDYXRlZ29yaWVzU2VydmljZSA9IG5ldyBzZXJ2aWNlLkNhdGVnb3JpZXNTZXJ2aWNlKCk7XG52YXIgX3ByZWZpeCA9ICcvY2F0ZWdvcmllcyc7XG52YXIgY2F0ZWdvcmllcyA9IFtcbiAgICB7XG4gICAgICAgIG1ldGhvZDogJ0dFVCcsXG4gICAgICAgIHBhdGg6IF9wcmVmaXggKyAnL2xpc3QnLFxuICAgICAgICBoYW5kbGVyOiBmdW5jdGlvbihyZXF1ZXN0LCByZXBseSkge1xuXG4gICAgICAgICAgICBDYXRlZ29yaWVzU2VydmljZS5nZXRDYXRlZ29yaWVzTGlzdCgpLnRoZW4oKGRhdGE6IEFycmF5PGFueT4pID0+IHtcbiAgICAgICAgICAgICAgICByZXBseShkYXRhKTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgIH0sXG4gICAgICAgIGNvbmZpZzoge1xuICAgICAgICAgICAgZGVzY3JpcHRpb246ICdTYXkgaGVsbG8nXG4gICAgICAgIH1cbiAgICB9LFxuICAgIHtcbiAgICAgICAgbWV0aG9kOiAnR0VUJyxcbiAgICAgICAgcGF0aDogX3ByZWZpeCArICcvY2F0ZWdvcnkve2NhdGVnb3J5SWR9JyxcbiAgICAgICAgaGFuZGxlcjogZnVuY3Rpb24ocmVxdWVzdCwgcmVwbHkpIHtcbiAgICAgICAgICAgIENhdGVnb3JpZXNTZXJ2aWNlLmdldENhdGVnb3J5QnlJZChyZXF1ZXN0LnBhcmFtcy5jYXRlZ29yeUlkKS50aGVuKChkYXRhKSA9PiB7XG4gICAgICAgICAgICAgICAgcmVwbHkoZGF0YSk7XG4gICAgICAgICAgICB9KVxuICAgICAgICB9XG4gICAgfVxuXVxuXG5cbm1vZHVsZS5leHBvcnRzID0gY2F0ZWdvcmllcztcbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==