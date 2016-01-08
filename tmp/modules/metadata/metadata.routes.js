'use strict';
///<reference path="../../../typings/tsd.d.ts" />
///<reference path="./categories.service.ts" />
var service = require('./metadata.service');
var MetadataService = new service.MetadataService();
var _prefix = '/metadata';
var metadata = [
    {
        method: 'GET',
        path: _prefix + '/subcategories0/list',
        handler: function (request, reply) {
            MetadataService.getSubcategories0List().then(function (data) {
                reply(data);
            });
        },
        config: {
            description: 'Retrieve Subcategories0 list',
            tags: ['metadata'],
            notes: [
                "Can be selected 1+ per Product"
            ]
        }
    },
    {
        method: 'GET',
        path: _prefix + '/subcategories1/list',
        handler: function (request, reply) {
            MetadataService.getSubcategories1List().then(function (data) {
                reply(data);
            });
        },
        config: {
            description: 'Retrieve Subcategories1 list',
            tags: ['metadata'],
            notes: [
                "Can be selected 1+ per Product"
            ]
        }
    },
    {
        method: 'GET',
        path: _prefix + '/schools/list',
        handler: function (request, reply) {
            MetadataService.getSchoolsList().then(function (data) {
                reply(data);
            });
        },
        config: {
            description: 'Retrieve Schools list',
            tags: ['metadata'],
            notes: [
                "This is defined to the Post Member"
            ]
        }
    },
    {
        method: 'GET',
        path: _prefix + '/styles/list',
        handler: function (request, reply) {
            MetadataService.getStylesList().then(function (data) {
                reply(data);
            });
        },
        config: {
            description: 'Retrieve Styles list',
            tags: ['metadata'],
            notes: [
                "Can be selected 1+ per Product"
            ]
        }
    },
    {
        method: 'GET',
        path: _prefix + '/schools/member/{memberId}',
        handler: function (request, reply) {
            MetadataService.getSchoolByMemberId(request.params.memberId).then(function (data) {
                reply(data);
            });
        },
        config: {
            description: 'Retrieve School from matched MemberID',
            tags: ['metadata']
        }
    },
    {
        method: 'GET',
        path: _prefix + '/likes/product/{productId}',
        handler: function (request, reply) {
            MetadataService.getProductLikes(request.params.productId).then(function (data) {
                reply(data);
            });
        },
        config: {
            description: 'Retrieve Likes from matched ProductID',
            tags: ['metadata']
        }
    },
    {
        method: 'POST',
        path: _prefix + '/likes/product/{productId}',
        handler: function (request, reply) {
            MetadataService.createProductLike(request.params.productId).then(function (data) {
                reply(data);
            });
        },
        config: {
            description: 'Create a Like to matched ProductID',
            tags: ['metadata']
        }
    }
];
module.exports = metadata;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1vZHVsZXMvbWV0YWRhdGEvbWV0YWRhdGEucm91dGVzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLFlBQVksQ0FBQztBQUViLEFBSUEsaURBSmlEO0FBQ2pELCtDQUErQztBQUcvQyxJQUFPLE9BQU8sV0FBVyxvQkFBb0IsQ0FBQyxDQUFDO0FBRy9DLElBQUksZUFBZSxHQUFHLElBQUksT0FBTyxDQUFDLGVBQWUsRUFBRSxDQUFDO0FBQ3BELElBQUksT0FBTyxHQUFHLFdBQVcsQ0FBQztBQUMxQixJQUFJLFFBQVEsR0FBRztJQUNYO1FBQ0ksTUFBTSxFQUFFLEtBQUs7UUFDYixJQUFJLEVBQUUsT0FBTyxHQUFHLHNCQUFzQjtRQUN0QyxPQUFPLEVBQUUsVUFBUyxPQUFPLEVBQUUsS0FBSztZQUM1QixlQUFlLENBQUMscUJBQXFCLEVBQUUsQ0FDbEMsSUFBSSxDQUFDLFVBQUMsSUFBSTtnQkFDUCxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDaEIsQ0FBQyxDQUFDLENBQUE7UUFDVixDQUFDO1FBQ0QsTUFBTSxFQUFFO1lBQ0osV0FBVyxFQUFFLDhCQUE4QjtZQUMzQyxJQUFJLEVBQUUsQ0FBQyxVQUFVLENBQUM7WUFDbEIsS0FBSyxFQUFFO2dCQUNILGdDQUFnQzthQUNuQztTQUNKO0tBQ0o7SUFDRDtRQUNJLE1BQU0sRUFBRSxLQUFLO1FBQ2IsSUFBSSxFQUFFLE9BQU8sR0FBRyxzQkFBc0I7UUFDdEMsT0FBTyxFQUFFLFVBQVMsT0FBTyxFQUFFLEtBQUs7WUFDNUIsZUFBZSxDQUFDLHFCQUFxQixFQUFFLENBQ2xDLElBQUksQ0FBQyxVQUFDLElBQUk7Z0JBQ1AsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ2hCLENBQUMsQ0FBQyxDQUFBO1FBQ1YsQ0FBQztRQUNELE1BQU0sRUFBRTtZQUNKLFdBQVcsRUFBRSw4QkFBOEI7WUFDM0MsSUFBSSxFQUFFLENBQUMsVUFBVSxDQUFDO1lBQ2xCLEtBQUssRUFBRTtnQkFDSCxnQ0FBZ0M7YUFDbkM7U0FDSjtLQUNKO0lBQ0Q7UUFDSSxNQUFNLEVBQUUsS0FBSztRQUNiLElBQUksRUFBRSxPQUFPLEdBQUcsZUFBZTtRQUMvQixPQUFPLEVBQUUsVUFBUyxPQUFPLEVBQUUsS0FBSztZQUM1QixlQUFlLENBQUMsY0FBYyxFQUFFLENBQzNCLElBQUksQ0FBQyxVQUFDLElBQUk7Z0JBQ1AsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ2hCLENBQUMsQ0FBQyxDQUFBO1FBQ1YsQ0FBQztRQUNELE1BQU0sRUFBRTtZQUNKLFdBQVcsRUFBRSx1QkFBdUI7WUFDcEMsSUFBSSxFQUFFLENBQUMsVUFBVSxDQUFDO1lBQ2xCLEtBQUssRUFBRTtnQkFDSCxvQ0FBb0M7YUFDdkM7U0FDSjtLQUNKO0lBQ0Q7UUFDSSxNQUFNLEVBQUUsS0FBSztRQUNiLElBQUksRUFBRSxPQUFPLEdBQUcsY0FBYztRQUM5QixPQUFPLEVBQUUsVUFBUyxPQUFPLEVBQUUsS0FBSztZQUM1QixlQUFlLENBQUMsYUFBYSxFQUFFLENBQzFCLElBQUksQ0FBQyxVQUFDLElBQUk7Z0JBQ1AsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ2hCLENBQUMsQ0FBQyxDQUFBO1FBQ1YsQ0FBQztRQUNELE1BQU0sRUFBRTtZQUNKLFdBQVcsRUFBRSxzQkFBc0I7WUFDbkMsSUFBSSxFQUFFLENBQUMsVUFBVSxDQUFDO1lBQ2xCLEtBQUssRUFBRTtnQkFDSCxnQ0FBZ0M7YUFDbkM7U0FDSjtLQUNKO0lBQ0Q7UUFDSSxNQUFNLEVBQUUsS0FBSztRQUNiLElBQUksRUFBRSxPQUFPLEdBQUcsNEJBQTRCO1FBQzVDLE9BQU8sRUFBRSxVQUFTLE9BQU8sRUFBRSxLQUFLO1lBQzVCLGVBQWUsQ0FBQyxtQkFBbUIsQ0FDL0IsT0FBTyxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FDdkIsSUFBSSxDQUFDLFVBQUMsSUFBSTtnQkFDUCxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDaEIsQ0FBQyxDQUFDLENBQUE7UUFDVixDQUFDO1FBQ0QsTUFBTSxFQUFFO1lBQ0osV0FBVyxFQUFFLHVDQUF1QztZQUNwRCxJQUFJLEVBQUUsQ0FBQyxVQUFVLENBQUM7U0FDckI7S0FDSjtJQUNEO1FBQ0ksTUFBTSxFQUFFLEtBQUs7UUFDYixJQUFJLEVBQUUsT0FBTyxHQUFHLDRCQUE0QjtRQUM1QyxPQUFPLEVBQUUsVUFBUyxPQUFPLEVBQUUsS0FBSztZQUM1QixlQUFlLENBQUMsZUFBZSxDQUMzQixPQUFPLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUN4QixJQUFJLENBQUMsVUFBQyxJQUFJO2dCQUNQLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUNoQixDQUFDLENBQUMsQ0FBQTtRQUNWLENBQUM7UUFDRCxNQUFNLEVBQUU7WUFDSixXQUFXLEVBQUUsdUNBQXVDO1lBQ3BELElBQUksRUFBRSxDQUFDLFVBQVUsQ0FBQztTQUNyQjtLQUNKO0lBQ0Q7UUFDSSxNQUFNLEVBQUUsTUFBTTtRQUNkLElBQUksRUFBRSxPQUFPLEdBQUcsNEJBQTRCO1FBQzVDLE9BQU8sRUFBRSxVQUFTLE9BQU8sRUFBRSxLQUFLO1lBQzVCLGVBQWUsQ0FBQyxpQkFBaUIsQ0FDN0IsT0FBTyxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FDeEIsSUFBSSxDQUFDLFVBQUMsSUFBSTtnQkFDUCxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDaEIsQ0FBQyxDQUFDLENBQUE7UUFDVixDQUFDO1FBQ0QsTUFBTSxFQUFFO1lBQ0osV0FBVyxFQUFFLG9DQUFvQztZQUNqRCxJQUFJLEVBQUUsQ0FBQyxVQUFVLENBQUM7U0FDckI7S0FDSjtDQUVKLENBQUE7QUFHRCxNQUFNLENBQUMsT0FBTyxHQUFHLFFBQVEsQ0FBQyIsImZpbGUiOiJtb2R1bGVzL21ldGFkYXRhL21ldGFkYXRhLnJvdXRlcy5qcyIsInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0JztcblxuLy8vPHJlZmVyZW5jZSBwYXRoPVwiLi4vLi4vLi4vdHlwaW5ncy90c2QuZC50c1wiIC8+XG4vLy88cmVmZXJlbmNlIHBhdGg9XCIuL2NhdGVnb3JpZXMuc2VydmljZS50c1wiIC8+XG5cblxuaW1wb3J0IHNlcnZpY2UgPSByZXF1aXJlKCcuL21ldGFkYXRhLnNlcnZpY2UnKTtcbmltcG9ydCBKb2kgPSByZXF1aXJlKCdqb2knKTtcblxudmFyIE1ldGFkYXRhU2VydmljZSA9IG5ldyBzZXJ2aWNlLk1ldGFkYXRhU2VydmljZSgpO1xudmFyIF9wcmVmaXggPSAnL21ldGFkYXRhJztcbnZhciBtZXRhZGF0YSA9IFtcbiAgICB7XG4gICAgICAgIG1ldGhvZDogJ0dFVCcsXG4gICAgICAgIHBhdGg6IF9wcmVmaXggKyAnL3N1YmNhdGVnb3JpZXMwL2xpc3QnLFxuICAgICAgICBoYW5kbGVyOiBmdW5jdGlvbihyZXF1ZXN0LCByZXBseSkge1xuICAgICAgICAgICAgTWV0YWRhdGFTZXJ2aWNlLmdldFN1YmNhdGVnb3JpZXMwTGlzdCgpXG4gICAgICAgICAgICAgICAgLnRoZW4oKGRhdGEpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgcmVwbHkoZGF0YSk7XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgfSxcbiAgICAgICAgY29uZmlnOiB7XG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogJ1JldHJpZXZlIFN1YmNhdGVnb3JpZXMwIGxpc3QnLFxuICAgICAgICAgICAgdGFnczogWydtZXRhZGF0YSddLFxuICAgICAgICAgICAgbm90ZXM6IFtcbiAgICAgICAgICAgICAgICBcIkNhbiBiZSBzZWxlY3RlZCAxKyBwZXIgUHJvZHVjdFwiXG4gICAgICAgICAgICBdXG4gICAgICAgIH1cbiAgICB9LFxuICAgIHtcbiAgICAgICAgbWV0aG9kOiAnR0VUJyxcbiAgICAgICAgcGF0aDogX3ByZWZpeCArICcvc3ViY2F0ZWdvcmllczEvbGlzdCcsXG4gICAgICAgIGhhbmRsZXI6IGZ1bmN0aW9uKHJlcXVlc3QsIHJlcGx5KSB7XG4gICAgICAgICAgICBNZXRhZGF0YVNlcnZpY2UuZ2V0U3ViY2F0ZWdvcmllczFMaXN0KClcbiAgICAgICAgICAgICAgICAudGhlbigoZGF0YSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICByZXBseShkYXRhKTtcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICB9LFxuICAgICAgICBjb25maWc6IHtcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiAnUmV0cmlldmUgU3ViY2F0ZWdvcmllczEgbGlzdCcsXG4gICAgICAgICAgICB0YWdzOiBbJ21ldGFkYXRhJ10sXG4gICAgICAgICAgICBub3RlczogW1xuICAgICAgICAgICAgICAgIFwiQ2FuIGJlIHNlbGVjdGVkIDErIHBlciBQcm9kdWN0XCJcbiAgICAgICAgICAgIF1cbiAgICAgICAgfVxuICAgIH0sXG4gICAge1xuICAgICAgICBtZXRob2Q6ICdHRVQnLFxuICAgICAgICBwYXRoOiBfcHJlZml4ICsgJy9zY2hvb2xzL2xpc3QnLFxuICAgICAgICBoYW5kbGVyOiBmdW5jdGlvbihyZXF1ZXN0LCByZXBseSkge1xuICAgICAgICAgICAgTWV0YWRhdGFTZXJ2aWNlLmdldFNjaG9vbHNMaXN0KClcbiAgICAgICAgICAgICAgICAudGhlbigoZGF0YSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICByZXBseShkYXRhKTtcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICB9LFxuICAgICAgICBjb25maWc6IHtcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiAnUmV0cmlldmUgU2Nob29scyBsaXN0JyxcbiAgICAgICAgICAgIHRhZ3M6IFsnbWV0YWRhdGEnXSxcbiAgICAgICAgICAgIG5vdGVzOiBbXG4gICAgICAgICAgICAgICAgXCJUaGlzIGlzIGRlZmluZWQgdG8gdGhlIFBvc3QgTWVtYmVyXCJcbiAgICAgICAgICAgIF1cbiAgICAgICAgfVxuICAgIH0sXG4gICAge1xuICAgICAgICBtZXRob2Q6ICdHRVQnLFxuICAgICAgICBwYXRoOiBfcHJlZml4ICsgJy9zdHlsZXMvbGlzdCcsXG4gICAgICAgIGhhbmRsZXI6IGZ1bmN0aW9uKHJlcXVlc3QsIHJlcGx5KSB7XG4gICAgICAgICAgICBNZXRhZGF0YVNlcnZpY2UuZ2V0U3R5bGVzTGlzdCgpXG4gICAgICAgICAgICAgICAgLnRoZW4oKGRhdGEpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgcmVwbHkoZGF0YSk7XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgfSxcbiAgICAgICAgY29uZmlnOiB7XG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogJ1JldHJpZXZlIFN0eWxlcyBsaXN0JyxcbiAgICAgICAgICAgIHRhZ3M6IFsnbWV0YWRhdGEnXSxcbiAgICAgICAgICAgIG5vdGVzOiBbXG4gICAgICAgICAgICAgICAgXCJDYW4gYmUgc2VsZWN0ZWQgMSsgcGVyIFByb2R1Y3RcIlxuICAgICAgICAgICAgXVxuICAgICAgICB9XG4gICAgfSxcbiAgICB7XG4gICAgICAgIG1ldGhvZDogJ0dFVCcsXG4gICAgICAgIHBhdGg6IF9wcmVmaXggKyAnL3NjaG9vbHMvbWVtYmVyL3ttZW1iZXJJZH0nLFxuICAgICAgICBoYW5kbGVyOiBmdW5jdGlvbihyZXF1ZXN0LCByZXBseSkge1xuICAgICAgICAgICAgTWV0YWRhdGFTZXJ2aWNlLmdldFNjaG9vbEJ5TWVtYmVySWQoXG4gICAgICAgICAgICAgICAgcmVxdWVzdC5wYXJhbXMubWVtYmVySWQpXG4gICAgICAgICAgICAgICAgLnRoZW4oKGRhdGEpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgcmVwbHkoZGF0YSk7XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgfSxcbiAgICAgICAgY29uZmlnOiB7XG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogJ1JldHJpZXZlIFNjaG9vbCBmcm9tIG1hdGNoZWQgTWVtYmVySUQnLFxuICAgICAgICAgICAgdGFnczogWydtZXRhZGF0YSddXG4gICAgICAgIH1cbiAgICB9LFxuICAgIHtcbiAgICAgICAgbWV0aG9kOiAnR0VUJyxcbiAgICAgICAgcGF0aDogX3ByZWZpeCArICcvbGlrZXMvcHJvZHVjdC97cHJvZHVjdElkfScsXG4gICAgICAgIGhhbmRsZXI6IGZ1bmN0aW9uKHJlcXVlc3QsIHJlcGx5KSB7XG4gICAgICAgICAgICBNZXRhZGF0YVNlcnZpY2UuZ2V0UHJvZHVjdExpa2VzKFxuICAgICAgICAgICAgICAgIHJlcXVlc3QucGFyYW1zLnByb2R1Y3RJZClcbiAgICAgICAgICAgICAgICAudGhlbigoZGF0YSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICByZXBseShkYXRhKTtcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICB9LFxuICAgICAgICBjb25maWc6IHtcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiAnUmV0cmlldmUgTGlrZXMgZnJvbSBtYXRjaGVkIFByb2R1Y3RJRCcsXG4gICAgICAgICAgICB0YWdzOiBbJ21ldGFkYXRhJ11cbiAgICAgICAgfVxuICAgIH0sXG4gICAge1xuICAgICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgICAgcGF0aDogX3ByZWZpeCArICcvbGlrZXMvcHJvZHVjdC97cHJvZHVjdElkfScsXG4gICAgICAgIGhhbmRsZXI6IGZ1bmN0aW9uKHJlcXVlc3QsIHJlcGx5KSB7XG4gICAgICAgICAgICBNZXRhZGF0YVNlcnZpY2UuY3JlYXRlUHJvZHVjdExpa2UoXG4gICAgICAgICAgICAgICAgcmVxdWVzdC5wYXJhbXMucHJvZHVjdElkKVxuICAgICAgICAgICAgICAgIC50aGVuKChkYXRhKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHJlcGx5KGRhdGEpO1xuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgIH0sXG4gICAgICAgIGNvbmZpZzoge1xuICAgICAgICAgICAgZGVzY3JpcHRpb246ICdDcmVhdGUgYSBMaWtlIHRvIG1hdGNoZWQgUHJvZHVjdElEJyxcbiAgICAgICAgICAgIHRhZ3M6IFsnbWV0YWRhdGEnXVxuICAgICAgICB9XG4gICAgfVxuXG5dXG5cblxubW9kdWxlLmV4cG9ydHMgPSBtZXRhZGF0YTtcbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==