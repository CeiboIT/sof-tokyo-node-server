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
            description: 'Retrieve Categories list',
            tags: ['categories']
        }
    }
];
module.exports = categories;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1vZHVsZXMvY2F0ZWdvcmllcy9jYXRlZ29yaWVzLnJvdXRlcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxZQUFZLENBQUM7QUFFYixBQUlBLGlEQUppRDtBQUNqRCwrQ0FBK0M7QUFHL0MsSUFBTyxPQUFPLFdBQVcsc0JBQXNCLENBQUMsQ0FBQztBQUVqRCxJQUFJLGlCQUFpQixHQUFHLElBQUksT0FBTyxDQUFDLGlCQUFpQixFQUFFLENBQUM7QUFDeEQsSUFBSSxPQUFPLEdBQUcsYUFBYSxDQUFDO0FBQzVCLElBQUksVUFBVSxHQUFHO0lBQ2I7UUFDSSxNQUFNLEVBQUUsS0FBSztRQUNiLElBQUksRUFBRSxPQUFPLEdBQUcsT0FBTztRQUN2QixPQUFPLEVBQUUsVUFBUyxPQUFPLEVBQUUsS0FBSztZQUM1QixpQkFBaUIsQ0FBQyxpQkFBaUIsRUFBRSxDQUNoQyxJQUFJLENBQUMsVUFBQyxJQUFnQjtnQkFDbkIsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ2hCLENBQUMsQ0FBQyxDQUFBO1FBQ1YsQ0FBQztRQUNELE1BQU0sRUFBRTtZQUNKLFdBQVcsRUFBRSwwQkFBMEI7WUFDdkMsSUFBSSxFQUFFLENBQUMsWUFBWSxDQUFDO1NBQ3ZCO0tBQ0o7Q0FDSixDQUFBO0FBR0QsTUFBTSxDQUFDLE9BQU8sR0FBRyxVQUFVLENBQUMiLCJmaWxlIjoibW9kdWxlcy9jYXRlZ29yaWVzL2NhdGVnb3JpZXMucm91dGVzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnO1xuXG4vLy88cmVmZXJlbmNlIHBhdGg9XCIuLi8uLi8uLi90eXBpbmdzL3RzZC5kLnRzXCIgLz5cbi8vLzxyZWZlcmVuY2UgcGF0aD1cIi4vY2F0ZWdvcmllcy5zZXJ2aWNlLnRzXCIgLz5cblxuXG5pbXBvcnQgc2VydmljZSA9IHJlcXVpcmUoJy4vY2F0ZWdvcmllcy5zZXJ2aWNlJyk7XG5cbnZhciBDYXRlZ29yaWVzU2VydmljZSA9IG5ldyBzZXJ2aWNlLkNhdGVnb3JpZXNTZXJ2aWNlKCk7XG52YXIgX3ByZWZpeCA9ICcvY2F0ZWdvcmllcyc7XG52YXIgY2F0ZWdvcmllcyA9IFtcbiAgICB7XG4gICAgICAgIG1ldGhvZDogJ0dFVCcsXG4gICAgICAgIHBhdGg6IF9wcmVmaXggKyAnL2xpc3QnLFxuICAgICAgICBoYW5kbGVyOiBmdW5jdGlvbihyZXF1ZXN0LCByZXBseSkge1xuICAgICAgICAgICAgQ2F0ZWdvcmllc1NlcnZpY2UuZ2V0Q2F0ZWdvcmllc0xpc3QoKVxuICAgICAgICAgICAgICAgIC50aGVuKChkYXRhOiBBcnJheTxhbnk+KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHJlcGx5KGRhdGEpO1xuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgIH0sXG4gICAgICAgIGNvbmZpZzoge1xuICAgICAgICAgICAgZGVzY3JpcHRpb246ICdSZXRyaWV2ZSBDYXRlZ29yaWVzIGxpc3QnLFxuICAgICAgICAgICAgdGFnczogWydjYXRlZ29yaWVzJ11cbiAgICAgICAgfVxuICAgIH1cbl1cblxuXG5tb2R1bGUuZXhwb3J0cyA9IGNhdGVnb3JpZXM7XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=