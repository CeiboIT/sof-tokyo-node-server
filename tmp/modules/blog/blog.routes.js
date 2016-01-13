'use strict';
///<reference path="../../../typings/tsd.d.ts" />
///<reference path="./categories.service.ts" />
var service = require('./blog.service');
var Joi = require('joi');
var BlogService = new service.BlogService();
var _prefix = '/blog';
var blog = [
    {
        method: 'GET',
        path: _prefix + '/banners',
        handler: function (request, reply) {
            BlogService.getBanners().then(function (data) {
                reply({ banners: data });
            });
        },
        config: {
            description: 'Retrieve all Banners',
            tags: ['blog']
        }
    },
    {
        method: 'GET',
        path: _prefix + '/banners/banner/{idBanner}',
        handler: function (request, reply) {
            BlogService.getBanner(request.params.idBanner).then(function (data) {
                reply({ banner: data });
            });
        },
        config: {
            description: 'Retrieve Banner with matched BannerID',
            tags: ['blog']
        }
    },
    {
        method: 'POST',
        path: _prefix + '/banners',
        handler: function (request, reply) {
            BlogService.createBanner(request.payload.banner).then(function (data) {
                reply(data);
            });
        },
        config: {
            validate: {
                query: {
                    banner: Joi.array()
                }
            },
            description: 'Create a Banner object',
            tags: ['blog']
        }
    }
];
module.exports = blog;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1vZHVsZXMvYmxvZy9ibG9nLnJvdXRlcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxZQUFZLENBQUM7QUFFYixBQUlBLGlEQUppRDtBQUNqRCwrQ0FBK0M7QUFHL0MsSUFBTyxPQUFPLFdBQVcsZ0JBQWdCLENBQUMsQ0FBQztBQUMzQyxJQUFPLEdBQUcsV0FBVyxLQUFLLENBQUMsQ0FBQztBQUU1QixJQUFJLFdBQVcsR0FBRyxJQUFJLE9BQU8sQ0FBQyxXQUFXLEVBQUUsQ0FBQztBQUM1QyxJQUFJLE9BQU8sR0FBRyxPQUFPLENBQUM7QUFDdEIsSUFBSSxJQUFJLEdBQUc7SUFDUDtRQUNJLE1BQU0sRUFBRSxLQUFLO1FBQ2IsSUFBSSxFQUFFLE9BQU8sR0FBRyxVQUFVO1FBQzFCLE9BQU8sRUFBRSxVQUFTLE9BQU8sRUFBRSxLQUFLO1lBQzVCLFdBQVcsQ0FBQyxVQUFVLEVBQUUsQ0FDbkIsSUFBSSxDQUFDLFVBQUMsSUFBSTtnQkFDUCxLQUFLLENBQUMsRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQztZQUM3QixDQUFDLENBQUMsQ0FBQTtRQUNWLENBQUM7UUFDRCxNQUFNLEVBQUU7WUFDSixXQUFXLEVBQUUsc0JBQXNCO1lBQ25DLElBQUksRUFBRSxDQUFDLE1BQU0sQ0FBQztTQUNqQjtLQUNKO0lBQ0Q7UUFDSSxNQUFNLEVBQUUsS0FBSztRQUNiLElBQUksRUFBRSxPQUFPLEdBQUcsNEJBQTRCO1FBQzVDLE9BQU8sRUFBRSxVQUFTLE9BQU8sRUFBRSxLQUFLO1lBQzVCLFdBQVcsQ0FBQyxTQUFTLENBQ2pCLE9BQU8sQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQ3ZCLElBQUksQ0FBQyxVQUFDLElBQUk7Z0JBQ1AsS0FBSyxDQUFDLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxDQUFDLENBQUM7WUFDNUIsQ0FBQyxDQUFDLENBQUE7UUFDVixDQUFDO1FBQ0QsTUFBTSxFQUFFO1lBQ0osV0FBVyxFQUFFLHVDQUF1QztZQUNwRCxJQUFJLEVBQUUsQ0FBQyxNQUFNLENBQUM7U0FDakI7S0FDSjtJQUNEO1FBQ0ksTUFBTSxFQUFFLE1BQU07UUFDVixJQUFJLEVBQUUsT0FBTyxHQUFHLFVBQVU7UUFDdEIsT0FBTyxFQUFFLFVBQVMsT0FBTyxFQUFFLEtBQUs7WUFDNUIsV0FBVyxDQUFDLFlBQVksQ0FDcEIsT0FBTyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FDdEIsSUFBSSxDQUFDLFVBQUMsSUFBSTtnQkFDUCxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDaEIsQ0FBQyxDQUFDLENBQUE7UUFDVixDQUFDO1FBQ1QsTUFBTSxFQUFFO1lBQ0osUUFBUSxFQUFFO2dCQUNOLEtBQUssRUFBRTtvQkFDSCxNQUFNLEVBQUUsR0FBRyxDQUFDLEtBQUssRUFBRTtpQkFDdEI7YUFDSjtZQUNELFdBQVcsRUFBRSx3QkFBd0I7WUFDakMsSUFBSSxFQUFFLENBQUMsTUFBTSxDQUFDO1NBQ3JCO0tBQ0o7Q0FDSixDQUFBO0FBR0QsTUFBTSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMiLCJmaWxlIjoibW9kdWxlcy9ibG9nL2Jsb2cucm91dGVzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnO1xuXG4vLy88cmVmZXJlbmNlIHBhdGg9XCIuLi8uLi8uLi90eXBpbmdzL3RzZC5kLnRzXCIgLz5cbi8vLzxyZWZlcmVuY2UgcGF0aD1cIi4vY2F0ZWdvcmllcy5zZXJ2aWNlLnRzXCIgLz5cblxuXG5pbXBvcnQgc2VydmljZSA9IHJlcXVpcmUoJy4vYmxvZy5zZXJ2aWNlJyk7XG5pbXBvcnQgSm9pID0gcmVxdWlyZSgnam9pJyk7XG5cbnZhciBCbG9nU2VydmljZSA9IG5ldyBzZXJ2aWNlLkJsb2dTZXJ2aWNlKCk7XG52YXIgX3ByZWZpeCA9ICcvYmxvZyc7XG52YXIgYmxvZyA9IFtcbiAgICB7XG4gICAgICAgIG1ldGhvZDogJ0dFVCcsXG4gICAgICAgIHBhdGg6IF9wcmVmaXggKyAnL2Jhbm5lcnMnLFxuICAgICAgICBoYW5kbGVyOiBmdW5jdGlvbihyZXF1ZXN0LCByZXBseSkge1xuICAgICAgICAgICAgQmxvZ1NlcnZpY2UuZ2V0QmFubmVycygpXG4gICAgICAgICAgICAgICAgLnRoZW4oKGRhdGEpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgcmVwbHkoeyBiYW5uZXJzOiBkYXRhIH0pO1xuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgIH0sXG4gICAgICAgIGNvbmZpZzoge1xuICAgICAgICAgICAgZGVzY3JpcHRpb246ICdSZXRyaWV2ZSBhbGwgQmFubmVycycsXG4gICAgICAgICAgICB0YWdzOiBbJ2Jsb2cnXVxuICAgICAgICB9XG4gICAgfSxcbiAgICB7XG4gICAgICAgIG1ldGhvZDogJ0dFVCcsXG4gICAgICAgIHBhdGg6IF9wcmVmaXggKyAnL2Jhbm5lcnMvYmFubmVyL3tpZEJhbm5lcn0nLFxuICAgICAgICBoYW5kbGVyOiBmdW5jdGlvbihyZXF1ZXN0LCByZXBseSkge1xuICAgICAgICAgICAgQmxvZ1NlcnZpY2UuZ2V0QmFubmVyKFxuICAgICAgICAgICAgICAgIHJlcXVlc3QucGFyYW1zLmlkQmFubmVyKVxuICAgICAgICAgICAgICAgIC50aGVuKChkYXRhKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHJlcGx5KHsgYmFubmVyOiBkYXRhIH0pO1xuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgIH0sXG4gICAgICAgIGNvbmZpZzoge1xuICAgICAgICAgICAgZGVzY3JpcHRpb246ICdSZXRyaWV2ZSBCYW5uZXIgd2l0aCBtYXRjaGVkIEJhbm5lcklEJyxcbiAgICAgICAgICAgIHRhZ3M6IFsnYmxvZyddXG4gICAgICAgIH1cbiAgICB9LFxuICAgIHtcbiAgICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICAgICAgICBwYXRoOiBfcHJlZml4ICsgJy9iYW5uZXJzJyxcbiAgICAgICAgICAgICAgICBoYW5kbGVyOiBmdW5jdGlvbihyZXF1ZXN0LCByZXBseSkge1xuICAgICAgICAgICAgICAgICAgICBCbG9nU2VydmljZS5jcmVhdGVCYW5uZXIoXG4gICAgICAgICAgICAgICAgICAgICAgICByZXF1ZXN0LnBheWxvYWQuYmFubmVyKVxuICAgICAgICAgICAgICAgICAgICAgICAgLnRoZW4oKGRhdGEpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXBseShkYXRhKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgY29uZmlnOiB7XG4gICAgICAgICAgICB2YWxpZGF0ZToge1xuICAgICAgICAgICAgICAgIHF1ZXJ5OiB7XG4gICAgICAgICAgICAgICAgICAgIGJhbm5lcjogSm9pLmFycmF5KClcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZGVzY3JpcHRpb246ICdDcmVhdGUgYSBCYW5uZXIgb2JqZWN0JyxcbiAgICAgICAgICAgICAgICB0YWdzOiBbJ2Jsb2cnXVxuICAgICAgICB9XG4gICAgfVxuXVxuXG5cbm1vZHVsZS5leHBvcnRzID0gYmxvZztcbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==