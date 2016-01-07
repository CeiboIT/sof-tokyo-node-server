'use strict';
///<reference path="../../../typings/tsd.d.ts" />
///<reference path="./authors.service.ts" />
var service = require('./authors.service');
var AuthorsService = new service.AuthorsService();
var _prefix = '/authors';
var authors = [
    {
        method: 'GET',
        path: _prefix + '/list',
        handler: function (request, reply) {
            AuthorsService.getAuthorsList().then(function (data) {
                reply(data);
            });
        },
        config: {
            description: 'Retrieve Authors list',
            tags: ['authors']
        }
    }
];
module.exports = authors;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1vZHVsZXMvYXV0aG9ycy9hdXRob3JzLnJvdXRlcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxZQUFZLENBQUM7QUFFYixBQUlBLGlEQUppRDtBQUNqRCw0Q0FBNEM7QUFHNUMsSUFBTyxPQUFPLFdBQVcsbUJBQW1CLENBQUMsQ0FBQztBQUU5QyxJQUFJLGNBQWMsR0FBRyxJQUFJLE9BQU8sQ0FBQyxjQUFjLEVBQUUsQ0FBQztBQUNsRCxJQUFJLE9BQU8sR0FBRyxVQUFVLENBQUM7QUFDekIsSUFBSSxPQUFPLEdBQUc7SUFDVjtRQUNJLE1BQU0sRUFBRSxLQUFLO1FBQ2IsSUFBSSxFQUFFLE9BQU8sR0FBRyxPQUFPO1FBQ3ZCLE9BQU8sRUFBRSxVQUFTLE9BQU8sRUFBRSxLQUFLO1lBQzVCLGNBQWMsQ0FBQyxjQUFjLEVBQUUsQ0FDOUIsSUFBSSxDQUFDLFVBQUMsSUFBZ0I7Z0JBQ25CLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUNoQixDQUFDLENBQUMsQ0FBQTtRQUNOLENBQUM7UUFDRCxNQUFNLEVBQUU7WUFDSixXQUFXLEVBQUUsdUJBQXVCO1lBQ3BDLElBQUksRUFBRSxDQUFDLFNBQVMsQ0FBQztTQUNwQjtLQUNKO0NBQ0osQ0FBQTtBQUdELE1BQU0sQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDIiwiZmlsZSI6Im1vZHVsZXMvYXV0aG9ycy9hdXRob3JzLnJvdXRlcy5qcyIsInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0JztcblxuLy8vPHJlZmVyZW5jZSBwYXRoPVwiLi4vLi4vLi4vdHlwaW5ncy90c2QuZC50c1wiIC8+XG4vLy88cmVmZXJlbmNlIHBhdGg9XCIuL2F1dGhvcnMuc2VydmljZS50c1wiIC8+XG5cblxuaW1wb3J0IHNlcnZpY2UgPSByZXF1aXJlKCcuL2F1dGhvcnMuc2VydmljZScpO1xuXG52YXIgQXV0aG9yc1NlcnZpY2UgPSBuZXcgc2VydmljZS5BdXRob3JzU2VydmljZSgpO1xudmFyIF9wcmVmaXggPSAnL2F1dGhvcnMnO1xudmFyIGF1dGhvcnMgPSBbXG4gICAge1xuICAgICAgICBtZXRob2Q6ICdHRVQnLFxuICAgICAgICBwYXRoOiBfcHJlZml4ICsgJy9saXN0JyxcbiAgICAgICAgaGFuZGxlcjogZnVuY3Rpb24ocmVxdWVzdCwgcmVwbHkpIHtcbiAgICAgICAgICAgIEF1dGhvcnNTZXJ2aWNlLmdldEF1dGhvcnNMaXN0KClcbiAgICAgICAgICAgIC50aGVuKChkYXRhOiBBcnJheTxhbnk+KSA9PiB7XG4gICAgICAgICAgICAgICAgcmVwbHkoZGF0YSk7XG4gICAgICAgICAgICB9KVxuICAgICAgICB9LFxuICAgICAgICBjb25maWc6IHtcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiAnUmV0cmlldmUgQXV0aG9ycyBsaXN0JyxcbiAgICAgICAgICAgIHRhZ3M6IFsnYXV0aG9ycyddXG4gICAgICAgIH1cbiAgICB9XG5dXG5cblxubW9kdWxlLmV4cG9ydHMgPSBhdXRob3JzO1xuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9