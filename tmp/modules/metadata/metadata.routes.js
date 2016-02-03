'use strict';
///<reference path="../../../typings/tsd.d.ts" />
///<reference path="./categories.service.ts" />
var service = require('./metadata.service');
var Joi = require('joi');
var MetadataService = new service.MetadataService();
var _prefix = '/metadata';
var metadata = [
    {
        method: 'GET',
        path: _prefix + '/subcategories/list',
        handler: function (request, reply) {
            MetadataService.getSubcategoriesList().then(function (data) {
                reply({ subcategories: data });
            });
        },
        config: {
            description: 'Retrieve Subcategories (with childs) list',
            tags: ['metadata']
        }
    },
    {
        method: 'GET',
        path: _prefix + '/subcategories0/list',
        handler: function (request, reply) {
            MetadataService.getSubcategories0List().then(function (data) {
                reply({ subcategories0: data });
            });
        },
        config: {
            description: 'Retrieve Subcategories0 list',
            tags: ['metadata']
        }
    },
    {
        method: 'GET',
        path: _prefix + '/subcategories1/list',
        handler: function (request, reply) {
            MetadataService.getSubcategories1List().then(function (data) {
                reply({ subcategories1: data });
            });
        },
        config: {
            description: 'Retrieve Subcategories1 list',
            tags: ['metadata']
        }
    },
    {
        method: 'GET',
        path: _prefix + '/schools/list',
        handler: function (request, reply) {
            MetadataService.getSchoolsList().then(function (data) {
                reply({ schools: data });
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
                reply({ styles: data });
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
                reply({ school: data[0] });
            });
        },
        config: {
            description: 'Retrieve School from matched MemberID',
            tags: ['metadata']
        }
    },
    {
        method: 'GET',
        path: _prefix + '/all/product/{productId}',
        handler: function (request, reply) {
            MetadataService.getProductMetadata(request.params.productId).then(function (data) {
                reply({ metadata: data });
            });
        },
        config: {
            description: 'Retrieve all Metadata from matched ProductID',
            tags: ['metadata']
        }
    },
    {
        method: 'POST',
        path: _prefix + '/likes/product',
        handler: function (request, reply) {
            MetadataService.createProductLike(request.payload.productId).then(function (data) {
                reply(data);
            });
        },
        config: {
            validate: {
                query: {
                    productId: Joi.number().integer()
                }
            },
            description: 'Create a Like to matched ProductID',
            tags: ['metadata']
        }
    },
    {
        method: 'GET',
        path: _prefix + '/visits/product/{productId}',
        handler: function (request, reply) {
            MetadataService.getProductVisits(request.params.productId).then(function (data) {
                reply({ visits: data[0] });
            });
        },
        config: {
            description: 'Retrieve Visits from matched ProductID',
            tags: ['metadata']
        }
    },
    {
        method: 'POST',
        path: _prefix + '/images/product',
        handler: function (request, reply) {
            MetadataService.createProductImage(request.payload.productId, request.payload.field, request.payload.url).then(function (data) {
                reply(data);
            });
        },
        config: {
            validate: {
                query: {
                    url: Joi.string(),
                    productId: Joi.number().integer(),
                    field: Joi.string()
                }
            },
            notes: [
                "Field values: 'sofbackend__sof_work_meta__postImage'/'sofbackend__sof_work_meta__subImageX' (X = 1-9)",
                "Url: -image url-"
            ],
            description: 'Add an Url to matched ProductID',
            tags: ['metadata']
        }
    },
];
module.exports = metadata;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1vZHVsZXMvbWV0YWRhdGEvbWV0YWRhdGEucm91dGVzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLFlBQVksQ0FBQztBQUViLEFBSUEsaURBSmlEO0FBQ2pELCtDQUErQztBQUcvQyxJQUFPLE9BQU8sV0FBVyxvQkFBb0IsQ0FBQyxDQUFDO0FBQy9DLElBQU8sR0FBRyxXQUFXLEtBQUssQ0FBQyxDQUFDO0FBRTVCLElBQUksZUFBZSxHQUFHLElBQUksT0FBTyxDQUFDLGVBQWUsRUFBRSxDQUFDO0FBQ3BELElBQUksT0FBTyxHQUFHLFdBQVcsQ0FBQztBQUMxQixJQUFJLFFBQVEsR0FBRztJQUNYO1FBQ0ksTUFBTSxFQUFFLEtBQUs7UUFDYixJQUFJLEVBQUUsT0FBTyxHQUFHLHFCQUFxQjtRQUNyQyxPQUFPLEVBQUUsVUFBUyxPQUFPLEVBQUUsS0FBSztZQUM1QixlQUFlLENBQUMsb0JBQW9CLEVBQUUsQ0FDakMsSUFBSSxDQUFDLFVBQUMsSUFBSTtnQkFDUCxLQUFLLENBQUUsRUFBRSxhQUFhLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQztZQUNwQyxDQUFDLENBQUMsQ0FBQTtRQUNWLENBQUM7UUFDRCxNQUFNLEVBQUU7WUFDSixXQUFXLEVBQUUsMkNBQTJDO1lBQ3hELElBQUksRUFBRSxDQUFDLFVBQVUsQ0FBQztTQUNyQjtLQUNKO0lBQ0Q7UUFDSSxNQUFNLEVBQUUsS0FBSztRQUNiLElBQUksRUFBRSxPQUFPLEdBQUcsc0JBQXNCO1FBQ3RDLE9BQU8sRUFBRSxVQUFTLE9BQU8sRUFBRSxLQUFLO1lBQzVCLGVBQWUsQ0FBQyxxQkFBcUIsRUFBRSxDQUNsQyxJQUFJLENBQUMsVUFBQyxJQUFJO2dCQUNQLEtBQUssQ0FBRSxFQUFFLGNBQWMsRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDO1lBQ3JDLENBQUMsQ0FBQyxDQUFBO1FBQ1YsQ0FBQztRQUNELE1BQU0sRUFBRTtZQUNKLFdBQVcsRUFBRSw4QkFBOEI7WUFDM0MsSUFBSSxFQUFFLENB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QUMsSUFBSTtnQkFDUCxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDaEIsQ0FBQyxDQUFDLENBQUE7UUFDVixDQUFDO1FBQ0QsTUFBTSxFQUFFO1lBQ0osUUFBUSxFQUFFO2dCQUNOLEtBQUssRUFBRTtvQkFDSCxHQUFHLEVBQUUsR0FBRyxDQUFDLE1BQU0sRUFBRTtvQkFDakIsU0FBUyxFQUFFLEdBQUcsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxPQUFPLEVBQUU7b0JBQ2pDLEtBQUssRUFBRSxHQUFHLENBQUMsTUFBTSxFQUFFO2lCQUN0QjthQUNKO1lBQ0QsS0FBSyxFQUFFO2dCQUNILHVHQUF1RztnQkFDdkcsa0JBQWtCO2FBQ3JCO1lBQ0QsV0FBVyxFQUFFLGlDQUFpQztZQUM5QyxJQUFJLEVBQUUsQ0FBQyxVQUFVLENBQUM7U0FDckI7S0FDSjtDQUNKLENBQUE7QUFHRCxNQUFNLENBQUMsT0FBTyxHQUFHLFFBQVEsQ0FBQyIsImZpbGUiOiJtb2R1bGVzL21ldGFkYXRhL21ldGFkYXRhLnJvdXRlcy5qcyIsInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0JztcblxuLy8vPHJlZmVyZW5jZSBwYXRoPVwiLi4vLi4vLi4vdHlwaW5ncy90c2QuZC50c1wiIC8+XG4vLy88cmVmZXJlbmNlIHBhdGg9XCIuL2NhdGVnb3JpZXMuc2VydmljZS50c1wiIC8+XG5cblxuaW1wb3J0IHNlcnZpY2UgPSByZXF1aXJlKCcuL21ldGFkYXRhLnNlcnZpY2UnKTtcbmltcG9ydCBKb2kgPSByZXF1aXJlKCdqb2knKTtcblxudmFyIE1ldGFkYXRhU2VydmljZSA9IG5ldyBzZXJ2aWNlLk1ldGFkYXRhU2VydmljZSgpO1xudmFyIF9wcmVmaXggPSAnL21ldGFkYXRhJztcbnZhciBtZXRhZGF0YSA9IFtcbiAgICB7XG4gICAgICAgIG1ldGhvZDogJ0dFVCcsXG4gICAgICAgIHBhdGg6IF9wcmVmaXggKyAnL3N1YmNhdGVnb3JpZXMvbGlzdCcsXG4gICAgICAgIGhhbmRsZXI6IGZ1bmN0aW9uKHJlcXVlc3QsIHJlcGx5KSB7XG4gICAgICAgICAgICBNZXRhZGF0YVNlcnZpY2UuZ2V0U3ViY2F0ZWdvcmllc0xpc3QoKVxuICAgICAgICAgICAgICAgIC50aGVuKChkYXRhKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHJlcGx5KCB7IHN1YmNhdGVnb3JpZXM6IGRhdGEgfSk7XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgfSxcbiAgICAgICAgY29uZmlnOiB7XG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogJ1JldHJpZXZlIFN1YmNhdGVnb3JpZXMgKHdpdGggY2hpbGRzKSBsaXN0JyxcbiAgICAgICAgICAgIHRhZ3M6IFsnbWV0YWRhdGEnXVxuICAgICAgICB9XG4gICAgfSxcbiAgICB7XG4gICAgICAgIG1ldGhvZDogJ0dFVCcsXG4gICAgICAgIHBhdGg6IF9wcmVmaXggKyAnL3N1YmNhdGVnb3JpZXMwL2xpc3QnLFxuICAgICAgICBoYW5kbGVyOiBmdW5jdGlvbihyZXF1ZXN0LCByZXBseSkge1xuICAgICAgICAgICAgTWV0YWRhdGFTZXJ2aWNlLmdldFN1YmNhdGVnb3JpZXMwTGlzdCgpXG4gICAgICAgICAgICAgICAgLnRoZW4oKGRhdGEpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgcmVwbHkoIHsgc3ViY2F0ZWdvcmllczA6IGRhdGEgfSk7XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgfSxcbiAgICAgICAgY29uZmlnOiB7XG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogJ1JldHJpZXZlIFN1YmNhdGVnb3JpZXMwIGxpc3QnLFxuICAgICAgICAgICAgdGFnczogWydtZXRhZGF0YSddXG4gICAgICAgIH1cbiAgICB9LFxuICAgIHtcbiAgICAgICAgbWV0aG9kOiAnR0VUJyxcbiAgICAgICAgcGF0aDogX3ByZWZpeCArICcvc3ViY2F0ZWdvcmllczEvbGlzdCcsXG4gICAgICAgIGhhbmRsZXI6IGZ1bmN0aW9uKHJlcXVlc3QsIHJlcGx5KSB7XG4gICAgICAgICAgICBNZXRhZGF0YVNlcnZpY2UuZ2V0U3ViY2F0ZWdvcmllczFMaXN0KClcbiAgICAgICAgICAgICAgICAudGhlbigoZGF0YSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICByZXBseSh7IHN1YmNhdGVnb3JpZXMxOiBkYXRhIH0pO1xuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgIH0sXG4gICAgICAgIGNvbmZpZzoge1xuICAgICAgICAgICAgZGVzY3JpcHRpb246ICdSZXRyaWV2ZSBTdWJjYXRlZ29yaWVzMSBsaXN0JyxcbiAgICAgICAgICAgIHRhZ3M6IFsnbWV0YWRhdGEnXVxuICAgICAgICB9XG4gICAgfSxcbiAgICB7XG4gICAgICAgIG1ldGhvZDogJ0dFVCcsXG4gICAgICAgIHBhdGg6IF9wcmVmaXggKyAnL3NjaG9vbHMvbGlzdCcsXG4gICAgICAgIGhhbmRsZXI6IGZ1bmN0aW9uKHJlcXVlc3QsIHJlcGx5KSB7XG4gICAgICAgICAgICBNZXRhZGF0YVNlcnZpY2UuZ2V0U2Nob29sc0xpc3QoKVxuICAgICAgICAgICAgICAgIC50aGVuKChkYXRhKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHJlcGx5KCB7IHNjaG9vbHM6IGRhdGEgfSk7XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgfSxcbiAgICAgICAgY29uZmlnOiB7XG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogJ1JldHJpZXZlIFNjaG9vbHMgbGlzdCcsXG4gICAgICAgICAgICB0YWdzOiBbJ21ldGFkYXRhJ10sXG4gICAgICAgICAgICBub3RlczogW1xuICAgICAgICAgICAgICAgIFwiVGhpcyBpcyBkZWZpbmVkIHRvIHRoZSBQb3N0IE1lbWJlclwiXG4gICAgICAgICAgICBdXG4gICAgICAgIH1cbiAgICB9LFxuICAgIHtcbiAgICAgICAgbWV0aG9kOiAnR0VUJyxcbiAgICAgICAgcGF0aDogX3ByZWZpeCArICcvc3R5bGVzL2xpc3QnLFxuICAgICAgICBoYW5kbGVyOiBmdW5jdGlvbihyZXF1ZXN0LCByZXBseSkge1xuICAgICAgICAgICAgTWV0YWRhdGFTZXJ2aWNlLmdldFN0eWxlc0xpc3QoKVxuICAgICAgICAgICAgICAgIC50aGVuKChkYXRhKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHJlcGx5KCB7IHN0eWxlczogZGF0YSB9KTtcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICB9LFxuICAgICAgICBjb25maWc6IHtcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiAnUmV0cmlldmUgU3R5bGVzIGxpc3QnLFxuICAgICAgICAgICAgdGFnczogWydtZXRhZGF0YSddLFxuICAgICAgICAgICAgbm90ZXM6IFtcbiAgICAgICAgICAgICAgICBcIkNhbiBiZSBzZWxlY3RlZCAxKyBwZXIgUHJvZHVjdFwiXG4gICAgICAgICAgICBdXG4gICAgICAgIH1cbiAgICB9LFxuICAgIHtcbiAgICAgICAgbWV0aG9kOiAnR0VUJyxcbiAgICAgICAgcGF0aDogX3ByZWZpeCArICcvc2Nob29scy9tZW1iZXIve21lbWJlcklkfScsXG4gICAgICAgIGhhbmRsZXI6IGZ1bmN0aW9uKHJlcXVlc3QsIHJlcGx5KSB7XG4gICAgICAgICAgICBNZXRhZGF0YVNlcnZpY2UuZ2V0U2Nob29sQnlNZW1iZXJJZChcbiAgICAgICAgICAgICAgICByZXF1ZXN0LnBhcmFtcy5tZW1iZXJJZClcbiAgICAgICAgICAgICAgICAudGhlbigoZGF0YSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICByZXBseSh7IHNjaG9vbDogZGF0YVswXSB9KTtcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICB9LFxuICAgICAgICBjb25maWc6IHtcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiAnUmV0cmlldmUgU2Nob29sIGZyb20gbWF0Y2hlZCBNZW1iZXJJRCcsXG4gICAgICAgICAgICB0YWdzOiBbJ21ldGFkYXRhJ11cbiAgICAgICAgfVxuICAgIH0sXG4gICAge1xuICAgICAgICBtZXRob2Q6ICdHRVQnLFxuICAgICAgICBwYXRoOiBfcHJlZml4ICsgJy9hbGwvcHJvZHVjdC97cHJvZHVjdElkfScsXG4gICAgICAgIGhhbmRsZXI6IGZ1bmN0aW9uKHJlcXVlc3QsIHJlcGx5KSB7XG4gICAgICAgICAgICBNZXRhZGF0YVNlcnZpY2UuZ2V0UHJvZHVjdE1ldGFkYXRhKFxuICAgICAgICAgICAgICAgIHJlcXVlc3QucGFyYW1zLnByb2R1Y3RJZClcbiAgICAgICAgICAgICAgICAudGhlbigoZGF0YSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICByZXBseSh7IG1ldGFkYXRhOiBkYXRhIH0pO1xuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgIH0sXG4gICAgICAgIGNvbmZpZzoge1xuICAgICAgICAgICAgZGVzY3JpcHRpb246ICdSZXRyaWV2ZSBhbGwgTWV0YWRhdGEgZnJvbSBtYXRjaGVkIFByb2R1Y3RJRCcsXG4gICAgICAgICAgICB0YWdzOiBbJ21ldGFkYXRhJ11cbiAgICAgICAgfVxuICAgIH0sXG4gICAge1xuICAgICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgICAgcGF0aDogX3ByZWZpeCArICcvbGlrZXMvcHJvZHVjdCcsXG4gICAgICAgIGhhbmRsZXI6IGZ1bmN0aW9uKHJlcXVlc3QsIHJlcGx5KSB7XG4gICAgICAgICAgICBNZXRhZGF0YVNlcnZpY2UuY3JlYXRlUHJvZHVjdExpa2UoXG4gICAgICAgICAgICAgICAgcmVxdWVzdC5wYXlsb2FkLnByb2R1Y3RJZClcbiAgICAgICAgICAgICAgICAudGhlbigoZGF0YSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICByZXBseShkYXRhKTtcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICB9LFxuICAgICAgICBjb25maWc6IHtcbiAgICAgICAgICAgIHZhbGlkYXRlOiB7XG4gICAgICAgICAgICAgICAgcXVlcnk6IHtcbiAgICAgICAgICAgICAgICAgICAgcHJvZHVjdElkOiBKb2kubnVtYmVyKCkuaW50ZWdlcigpXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiAnQ3JlYXRlIGEgTGlrZSB0byBtYXRjaGVkIFByb2R1Y3RJRCcsXG4gICAgICAgICAgICB0YWdzOiBbJ21ldGFkYXRhJ11cbiAgICAgICAgfVxuICAgIH0sXG4gICAge1xuICAgICAgICBtZXRob2Q6ICdHRVQnLFxuICAgICAgICBwYXRoOiBfcHJlZml4ICsgJy92aXNpdHMvcHJvZHVjdC97cHJvZHVjdElkfScsXG4gICAgICAgIGhhbmRsZXI6IGZ1bmN0aW9uKHJlcXVlc3QsIHJlcGx5KSB7XG4gICAgICAgICAgICBNZXRhZGF0YVNlcnZpY2UuZ2V0UHJvZHVjdFZpc2l0cyhcbiAgICAgICAgICAgICAgICByZXF1ZXN0LnBhcmFtcy5wcm9kdWN0SWQpXG4gICAgICAgICAgICAgICAgLnRoZW4oKGRhdGEpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgcmVwbHkoeyB2aXNpdHM6IGRhdGFbMF0gfSk7XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgfSxcbiAgICAgICAgY29uZmlnOiB7XG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogJ1JldHJpZXZlIFZpc2l0cyBmcm9tIG1hdGNoZWQgUHJvZHVjdElEJyxcbiAgICAgICAgICAgIHRhZ3M6IFsnbWV0YWRhdGEnXVxuICAgICAgICB9XG4gICAgfSxcbiAgICB7XG4gICAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgICBwYXRoOiBfcHJlZml4ICsgJy9pbWFnZXMvcHJvZHVjdCcsXG4gICAgICAgIGhhbmRsZXI6IGZ1bmN0aW9uKHJlcXVlc3QsIHJlcGx5KSB7XG4gICAgICAgICAgICBNZXRhZGF0YVNlcnZpY2UuY3JlYXRlUHJvZHVjdEltYWdlKFxuICAgICAgICAgICAgICAgIHJlcXVlc3QucGF5bG9hZC5wcm9kdWN0SWQsXG4gICAgICAgICAgICAgICAgcmVxdWVzdC5wYXlsb2FkLmZpZWxkLFxuICAgICAgICAgICAgICAgIHJlcXVlc3QucGF5bG9hZC51cmwpXG4gICAgICAgICAgICAgICAgLnRoZW4oKGRhdGEpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgcmVwbHkoZGF0YSk7XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgfSxcbiAgICAgICAgY29uZmlnOiB7XG4gICAgICAgICAgICB2YWxpZGF0ZToge1xuICAgICAgICAgICAgICAgIHF1ZXJ5OiB7XG4gICAgICAgICAgICAgICAgICAgIHVybDogSm9pLnN0cmluZygpLFxuICAgICAgICAgICAgICAgICAgICBwcm9kdWN0SWQ6IEpvaS5udW1iZXIoKS5pbnRlZ2VyKCksXG4gICAgICAgICAgICAgICAgICAgIGZpZWxkOiBKb2kuc3RyaW5nKClcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgbm90ZXM6IFtcbiAgICAgICAgICAgICAgICBcIkZpZWxkIHZhbHVlczogJ3NvZmJhY2tlbmRfX3NvZl93b3JrX21ldGFfX3Bvc3RJbWFnZScvJ3NvZmJhY2tlbmRfX3NvZl93b3JrX21ldGFfX3N1YkltYWdlWCcgKFggPSAxLTkpXCIsXG4gICAgICAgICAgICAgICAgXCJVcmw6IC1pbWFnZSB1cmwtXCJcbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogJ0FkZCBhbiBVcmwgdG8gbWF0Y2hlZCBQcm9kdWN0SUQnLFxuICAgICAgICAgICAgdGFnczogWydtZXRhZGF0YSddXG4gICAgICAgIH1cbiAgICB9LFxuXVxuXG5cbm1vZHVsZS5leHBvcnRzID0gbWV0YWRhdGE7XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=