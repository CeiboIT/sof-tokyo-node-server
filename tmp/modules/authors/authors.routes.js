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
            description: 'Say hello'
        }
    }
];
module.exports = authors;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1vZHVsZXMvYXV0aG9ycy9hdXRob3JzLnJvdXRlcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxZQUFZLENBQUM7QUFFYixBQUlBLGlEQUppRDtBQUNqRCw0Q0FBNEM7QUFHNUMsSUFBTyxPQUFPLFdBQVcsbUJBQW1CLENBQUMsQ0FBQztBQUU5QyxJQUFJLGNBQWMsR0FBRyxJQUFJLE9BQU8sQ0FBQyxjQUFjLEVBQUUsQ0FBQztBQUNsRCxJQUFJLE9BQU8sR0FBRyxVQUFVLENBQUM7QUFDekIsSUFBSSxPQUFPLEdBQUc7SUFDVjtRQUNJLE1BQU0sRUFBRSxLQUFLO1FBQ2IsSUFBSSxFQUFFLE9BQU8sR0FBRyxPQUFPO1FBQ3ZCLE9BQU8sRUFBRSxVQUFTLE9BQU8sRUFBRSxLQUFLO1lBRTVCLGNBQWMsQ0FBQyxjQUFjLEVBQUUsQ0FBQyxJQUFJLENBQUMsVUFBQyxJQUFnQjtnQkFDbEQsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ2hCLENBQUMsQ0FBQyxDQUFBO1FBQ04sQ0FBQztRQUNELE1BQU0sRUFBRTtZQUNKLFdBQVcsRUFBRSxXQUFXO1NBQzNCO0tBQ0o7Q0FDSixDQUFBO0FBR0QsTUFBTSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUMiLCJmaWxlIjoibW9kdWxlcy9hdXRob3JzL2F1dGhvcnMucm91dGVzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnO1xuXG4vLy88cmVmZXJlbmNlIHBhdGg9XCIuLi8uLi8uLi90eXBpbmdzL3RzZC5kLnRzXCIgLz5cbi8vLzxyZWZlcmVuY2UgcGF0aD1cIi4vYXV0aG9ycy5zZXJ2aWNlLnRzXCIgLz5cblxuXG5pbXBvcnQgc2VydmljZSA9IHJlcXVpcmUoJy4vYXV0aG9ycy5zZXJ2aWNlJyk7XG5cbnZhciBBdXRob3JzU2VydmljZSA9IG5ldyBzZXJ2aWNlLkF1dGhvcnNTZXJ2aWNlKCk7XG52YXIgX3ByZWZpeCA9ICcvYXV0aG9ycyc7XG52YXIgYXV0aG9ycyA9IFtcbiAgICB7XG4gICAgICAgIG1ldGhvZDogJ0dFVCcsXG4gICAgICAgIHBhdGg6IF9wcmVmaXggKyAnL2xpc3QnLFxuICAgICAgICBoYW5kbGVyOiBmdW5jdGlvbihyZXF1ZXN0LCByZXBseSkge1xuXG4gICAgICAgICAgICBBdXRob3JzU2VydmljZS5nZXRBdXRob3JzTGlzdCgpLnRoZW4oKGRhdGE6IEFycmF5PGFueT4pID0+IHtcbiAgICAgICAgICAgICAgICByZXBseShkYXRhKTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgIH0sXG4gICAgICAgIGNvbmZpZzoge1xuICAgICAgICAgICAgZGVzY3JpcHRpb246ICdTYXkgaGVsbG8nXG4gICAgICAgIH1cbiAgICB9XG5dXG5cblxubW9kdWxlLmV4cG9ydHMgPSBhdXRob3JzO1xuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9