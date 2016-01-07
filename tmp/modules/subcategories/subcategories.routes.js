'use strict';
///<reference path="../../../typings/tsd.d.ts" />
///<reference path="./categories.service.ts" />
var service = require('./subcategories.service');
var SubcategoriesService = new service.SubcategoriesService();
var _prefix = '/subcategories';
var subcategories = [
    {
        method: 'GET',
        path: _prefix + '/list',
        handler: function (request, reply) {
            SubcategoriesService.getSubcategoriesList().then(function (data) {
                reply(data);
            });
        },
        config: {
            description: 'Retrieve Subcategories list'
        }
    }
];
module.exports = subcategories;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1vZHVsZXMvc3ViY2F0ZWdvcmllcy9zdWJjYXRlZ29yaWVzLnJvdXRlcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxZQUFZLENBQUM7QUFFYixBQUlBLGlEQUppRDtBQUNqRCwrQ0FBK0M7QUFHL0MsSUFBTyxPQUFPLFdBQVcseUJBQXlCLENBQUMsQ0FBQztBQUVwRCxJQUFJLG9CQUFvQixHQUFHLElBQUksT0FBTyxDQUFDLG9CQUFvQixFQUFFLENBQUM7QUFDOUQsSUFBSSxPQUFPLEdBQUcsZ0JBQWdCLENBQUM7QUFDL0IsSUFBSSxhQUFhLEdBQUc7SUFDaEI7UUFDSSxNQUFNLEVBQUUsS0FBSztRQUNiLElBQUksRUFBRSxPQUFPLEdBQUcsT0FBTztRQUN2QixPQUFPLEVBQUUsVUFBUyxPQUFPLEVBQUUsS0FBSztZQUM1QixvQkFBb0IsQ0FBQyxvQkFBb0IsRUFBRSxDQUN0QyxJQUFJLENBQUMsVUFBQyxJQUFJO2dCQUNQLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUNoQixDQUFDLENBQUMsQ0FBQTtRQUNWLENBQUM7UUFDRCxNQUFNLEVBQUU7WUFDSixXQUFXLEVBQUUsNkJBQTZCO1NBQzdDO0tBQ0o7Q0FDSixDQUFBO0FBR0QsTUFBTSxDQUFDLE9BQU8sR0FBRyxhQUFhLENBQUMiLCJmaWxlIjoibW9kdWxlcy9zdWJjYXRlZ29yaWVzL3N1YmNhdGVnb3JpZXMucm91dGVzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnO1xuXG4vLy88cmVmZXJlbmNlIHBhdGg9XCIuLi8uLi8uLi90eXBpbmdzL3RzZC5kLnRzXCIgLz5cbi8vLzxyZWZlcmVuY2UgcGF0aD1cIi4vY2F0ZWdvcmllcy5zZXJ2aWNlLnRzXCIgLz5cblxuXG5pbXBvcnQgc2VydmljZSA9IHJlcXVpcmUoJy4vc3ViY2F0ZWdvcmllcy5zZXJ2aWNlJyk7XG5cbnZhciBTdWJjYXRlZ29yaWVzU2VydmljZSA9IG5ldyBzZXJ2aWNlLlN1YmNhdGVnb3JpZXNTZXJ2aWNlKCk7XG52YXIgX3ByZWZpeCA9ICcvc3ViY2F0ZWdvcmllcyc7XG52YXIgc3ViY2F0ZWdvcmllcyA9IFtcbiAgICB7XG4gICAgICAgIG1ldGhvZDogJ0dFVCcsXG4gICAgICAgIHBhdGg6IF9wcmVmaXggKyAnL2xpc3QnLFxuICAgICAgICBoYW5kbGVyOiBmdW5jdGlvbihyZXF1ZXN0LCByZXBseSkge1xuICAgICAgICAgICAgU3ViY2F0ZWdvcmllc1NlcnZpY2UuZ2V0U3ViY2F0ZWdvcmllc0xpc3QoKVxuICAgICAgICAgICAgICAgIC50aGVuKChkYXRhKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHJlcGx5KGRhdGEpO1xuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgIH0sXG4gICAgICAgIGNvbmZpZzoge1xuICAgICAgICAgICAgZGVzY3JpcHRpb246ICdSZXRyaWV2ZSBTdWJjYXRlZ29yaWVzIGxpc3QnXG4gICAgICAgIH1cbiAgICB9XG5dXG5cblxubW9kdWxlLmV4cG9ydHMgPSBzdWJjYXRlZ29yaWVzO1xuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9