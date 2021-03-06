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
            description: 'Retrieve all Blog Banners',
            tags: ['blog']
        }
    },
    {
        method: 'GET',
        path: _prefix + '/banners/banner/{bannerId}',
        handler: function (request, reply) {
            BlogService.getBanner(request.params.bannerId).then(function (data) {
                reply({ banner: data });
            });
        },
        config: {
            validate: {
                query: {
                    bannerId: Joi.number().integer()
                }
            },
            description: 'Retrieve Blog Banner with matched BannerID',
            tags: ['blog']
        }
    },
    {
        method: 'POST',
        path: _prefix + '/banners',
        handler: function (request, reply) {
            BlogService.createBanner(request.payload.post_author, request.payload.post_content, request.payload.post_title, request.payload.post_name).then(function (data) {
                reply(data);
            });
        },
        config: {
            validate: {
                query: {
                    post_author: Joi.string(),
                    post_content: Joi.string(),
                    post_title: Joi.string(),
                    post_name: Joi.string()
                }
            },
            description: 'Create a new Blog Banner',
            tags: ['blog']
        }
    }
];
module.exports = blog;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1vZHVsZXMvYmxvZy9ibG9nLnJvdXRlcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxZQUFZLENBQUM7QUFFYixBQUlBLGlEQUppRDtBQUNqRCwrQ0FBK0M7QUFHL0MsSUFBTyxPQUFPLFdBQVcsZ0JBQWdCLENBQUMsQ0FBQztBQUMzQyxJQUFPLEdBQUcsV0FBVyxLQUFLLENBQUMsQ0FBQztBQUU1QixJQUFJLFdBQVcsR0FBRyxJQUFJLE9BQU8sQ0FBQyxXQUFXLEVBQUUsQ0FBQztBQUM1QyxJQUFJLE9BQU8sR0FBRyxPQUFPLENBQUM7QUFDdEIsSUFBSSxJQUFJLEdBQUc7SUFDUDtRQUNJLE1BQU0sRUFBRSxLQUFLO1FBQ2IsSUFBSSxFQUFFLE9BQU8sR0FBRyxVQUFVO1FBQzFCLE9BQU8sRUFBRSxVQUFTLE9BQU8sRUFBRSxLQUFLO1lBQzVCLFdBQVcsQ0FBQyxVQUFVLEVBQUUsQ0FDbkIsSUFBSSxDQUFDLFVBQUMsSUFBSTtnQkFDUCxLQUFLLENBQUMsRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQztZQUM3QixDQUFDLENBQUMsQ0FBQTtRQUNWLENBQUM7UUFDRCxNQUFNLEVBQUU7WUFDSixXQUFXLEVBQUUsMkJBQTJCO1lBQ3hDLElBQUksRUFBRSxDQUFDLE1BQU0sQ0FBQztTQUNqQjtLQUNKO0lBQ0Q7UUFDSSxNQUFNLEVBQUUsS0FBSztRQUNiLElBQUksRUFBRSxPQUFPLEdBQUcsNEJBQTRCO1FBQzVDLE9BQU8sRUFBRSxVQUFTLE9BQU8sRUFBRSxLQUFLO1lBQzVCLFdBQVcsQ0FBQyxTQUFTLENBQ2pCLE9BQU8sQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQ3ZCLElBQUksQ0FBQyxVQUFDLElBQUk7Z0JBQ1AsS0FBSyxDQUFDLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxDQUFDLENBQUM7WUFDNUIsQ0FBQyxDQUFDLENBQUE7UUFDVixDQUFDO1FBQ0QsTUFBTSxFQUFFO1lBQ0osUUFBUSxFQUFFO2dCQUNOLEtBQUssRUFBRTtvQkFDSCxRQUFRLEVBQUUsR0FBRyxDQUFDLE1BQU0sRUFBRSxDQUFDLE9BQU8sRUFBRTtpQkFDbkM7YUFDSjtZQUNELFdBQVcsRUFBRSw0Q0FBNEM7WUFDekQsSUFBSSxFQUFFLENBQUMsTUFBTSxDQUFDO1NBQ2pCO0tBQ0o7SUFDRDtRQUNJLE1BQU0sRUFBRSxNQUFNO1FBQ1YsSUFBSSxFQUFFLE9BQU8sR0FBRyxVQUFVO1FBQ3RCLE9BQU8sRUFBRSxVQUFTLE9BQU8sRUFBRSxLQUFLO1lBQzVCLFdBQVcsQ0FBQyxZQUFZLENBQ3BCLE9BQU8sQ0FBQyxPQUFPLENBQUMsV0FBVyxFQUMzQixPQUFPLENBQUMsT0FBTyxDQUFDLFlBQVksRUFDNUIsT0FBTyxDQUFDLE9BQU8sQ0FBQyxVQUFVLEVBQzFCLE9BQU8sQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLENBQ3pCLElBQUksQ0FBQyxVQUFDLElBQUk7Z0JBQ1AsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ2hCLENBQUMsQ0FBQyxDQUFBO1FBQ1YsQ0FBQztRQUNULE1BQU0sRUFBRTtZQUNKLFFBQVEsRUFBRTtnQkFDTixLQUFLLEVBQUU7b0JBQ0gsV0FBVyxFQUFFLEdBQUcsQ0FBQyxNQUFNLEVBQUU7b0JBQ3pCLFlBQVksRUFBRSxHQUFHLENBQUMsTUFBTSxFQUFFO29CQUMxQixVQUFVLEVBQUUsR0FBRyxDQUFDLE1BQU0sRUFBRTtvQkFDeEIsU0FBUyxFQUFFLEdBQUcsQ0FBQyxNQUFNLEVBQUU7aUJBQzFCO2FBQ0o7WUFDRCxXQUFXLEVBQUUsMEJBQTBCO1lBQ25DLElBQUksRUFBRSxDQUFDLE1BQU0sQ0FBQztTQUNyQjtLQUNKO0NBQ0osQ0FBQTtBQUdELE1BQU0sQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDIiwiZmlsZSI6Im1vZHVsZXMvYmxvZy9ibG9nLnJvdXRlcy5qcyIsInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0JztcblxuLy8vPHJlZmVyZW5jZSBwYXRoPVwiLi4vLi4vLi4vdHlwaW5ncy90c2QuZC50c1wiIC8+XG4vLy88cmVmZXJlbmNlIHBhdGg9XCIuL2NhdGVnb3JpZXMuc2VydmljZS50c1wiIC8+XG5cblxuaW1wb3J0IHNlcnZpY2UgPSByZXF1aXJlKCcuL2Jsb2cuc2VydmljZScpO1xuaW1wb3J0IEpvaSA9IHJlcXVpcmUoJ2pvaScpO1xuXG52YXIgQmxvZ1NlcnZpY2UgPSBuZXcgc2VydmljZS5CbG9nU2VydmljZSgpO1xudmFyIF9wcmVmaXggPSAnL2Jsb2cnO1xudmFyIGJsb2cgPSBbXG4gICAge1xuICAgICAgICBtZXRob2Q6ICdHRVQnLFxuICAgICAgICBwYXRoOiBfcHJlZml4ICsgJy9iYW5uZXJzJyxcbiAgICAgICAgaGFuZGxlcjogZnVuY3Rpb24ocmVxdWVzdCwgcmVwbHkpIHtcbiAgICAgICAgICAgIEJsb2dTZXJ2aWNlLmdldEJhbm5lcnMoKVxuICAgICAgICAgICAgICAgIC50aGVuKChkYXRhKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHJlcGx5KHsgYmFubmVyczogZGF0YSB9KTtcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICB9LFxuICAgICAgICBjb25maWc6IHtcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiAnUmV0cmlldmUgYWxsIEJsb2cgQmFubmVycycsXG4gICAgICAgICAgICB0YWdzOiBbJ2Jsb2cnXVxuICAgICAgICB9XG4gICAgfSxcbiAgICB7XG4gICAgICAgIG1ldGhvZDogJ0dFVCcsXG4gICAgICAgIHBhdGg6IF9wcmVmaXggKyAnL2Jhbm5lcnMvYmFubmVyL3tiYW5uZXJJZH0nLFxuICAgICAgICBoYW5kbGVyOiBmdW5jdGlvbihyZXF1ZXN0LCByZXBseSkge1xuICAgICAgICAgICAgQmxvZ1NlcnZpY2UuZ2V0QmFubmVyKFxuICAgICAgICAgICAgICAgIHJlcXVlc3QucGFyYW1zLmJhbm5lcklkKVxuICAgICAgICAgICAgICAgIC50aGVuKChkYXRhKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHJlcGx5KHsgYmFubmVyOiBkYXRhIH0pO1xuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgIH0sXG4gICAgICAgIGNvbmZpZzoge1xuICAgICAgICAgICAgdmFsaWRhdGU6IHtcbiAgICAgICAgICAgICAgICBxdWVyeToge1xuICAgICAgICAgICAgICAgICAgICBiYW5uZXJJZDogSm9pLm51bWJlcigpLmludGVnZXIoKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogJ1JldHJpZXZlIEJsb2cgQmFubmVyIHdpdGggbWF0Y2hlZCBCYW5uZXJJRCcsXG4gICAgICAgICAgICB0YWdzOiBbJ2Jsb2cnXVxuICAgICAgICB9XG4gICAgfSxcbiAgICB7XG4gICAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgICAgICAgcGF0aDogX3ByZWZpeCArICcvYmFubmVycycsXG4gICAgICAgICAgICAgICAgaGFuZGxlcjogZnVuY3Rpb24ocmVxdWVzdCwgcmVwbHkpIHtcbiAgICAgICAgICAgICAgICAgICAgQmxvZ1NlcnZpY2UuY3JlYXRlQmFubmVyKFxuICAgICAgICAgICAgICAgICAgICAgICAgcmVxdWVzdC5wYXlsb2FkLnBvc3RfYXV0aG9yLFxuICAgICAgICAgICAgICAgICAgICAgICAgcmVxdWVzdC5wYXlsb2FkLnBvc3RfY29udGVudCxcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlcXVlc3QucGF5bG9hZC5wb3N0X3RpdGxlLFxuICAgICAgICAgICAgICAgICAgICAgICAgcmVxdWVzdC5wYXlsb2FkLnBvc3RfbmFtZSlcbiAgICAgICAgICAgICAgICAgICAgICAgIC50aGVuKChkYXRhKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVwbHkoZGF0YSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgIGNvbmZpZzoge1xuICAgICAgICAgICAgdmFsaWRhdGU6IHtcbiAgICAgICAgICAgICAgICBxdWVyeToge1xuICAgICAgICAgICAgICAgICAgICBwb3N0X2F1dGhvcjogSm9pLnN0cmluZygpLFxuICAgICAgICAgICAgICAgICAgICBwb3N0X2NvbnRlbnQ6IEpvaS5zdHJpbmcoKSxcbiAgICAgICAgICAgICAgICAgICAgcG9zdF90aXRsZTogSm9pLnN0cmluZygpLFxuICAgICAgICAgICAgICAgICAgICBwb3N0X25hbWU6IEpvaS5zdHJpbmcoKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogJ0NyZWF0ZSBhIG5ldyBCbG9nIEJhbm5lcicsXG4gICAgICAgICAgICAgICAgdGFnczogWydibG9nJ11cbiAgICAgICAgfVxuICAgIH1cbl1cblxuXG5tb2R1bGUuZXhwb3J0cyA9IGJsb2c7XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=