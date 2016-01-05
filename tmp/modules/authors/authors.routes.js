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
            description: 'Retrieve Authors list'
        }
    }
];
module.exports = authors;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1vZHVsZXMvYXV0aG9ycy9hdXRob3JzLnJvdXRlcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxZQUFZLENBQUM7QUFFYixBQUlBLGlEQUppRDtBQUNqRCw0Q0FBNEM7QUFHNUMsSUFBTyxPQUFPLFdBQVcsbUJBQW1CLENBQUMsQ0FBQztBQUU5QyxJQUFJLGNBQWMsR0FBRyxJQUFJLE9BQU8sQ0FBQyxjQUFjLEVBQUUsQ0FBQztBQUNsRCxJQUFJLE9BQU8sR0FBRyxVQUFVLENBQUM7QUFDekIsSUFBSSxPQUFPLEdBQUc7SUFDVjtRQUNJLE1BQU0sRUFBRSxLQUFLO1FBQ2IsSUFBSSxFQUFFLE9BQU8sR0FBRyxPQUFPO1FBQ3ZCLE9BQU8sRUFBRSxVQUFTLE9BQU8sRUFBRSxLQUFLO1lBQzVCLGNBQWMsQ0FBQyxjQUFjLEVBQUUsQ0FBQyxJQUFJLENBQUMsVUFBQyxJQUFnQjtnQkFDbEQsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ2hCLENBQUMsQ0FBQyxDQUFBO1FBQ04sQ0FBQztRQUNELE1BQU0sRUFBRTtZQUNKLFdBQVcsRUFBRSx1QkFBdUI7U0FDdkM7S0FDSjtDQUNKLENBQUE7QUFHRCxNQUFNLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQyIsImZpbGUiOiJtb2R1bGVzL2F1dGhvcnMvYXV0aG9ycy5yb3V0ZXMuanMiLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCc7XG5cbi8vLzxyZWZlcmVuY2UgcGF0aD1cIi4uLy4uLy4uL3R5cGluZ3MvdHNkLmQudHNcIiAvPlxuLy8vPHJlZmVyZW5jZSBwYXRoPVwiLi9hdXRob3JzLnNlcnZpY2UudHNcIiAvPlxuXG5cbmltcG9ydCBzZXJ2aWNlID0gcmVxdWlyZSgnLi9hdXRob3JzLnNlcnZpY2UnKTtcblxudmFyIEF1dGhvcnNTZXJ2aWNlID0gbmV3IHNlcnZpY2UuQXV0aG9yc1NlcnZpY2UoKTtcbnZhciBfcHJlZml4ID0gJy9hdXRob3JzJztcbnZhciBhdXRob3JzID0gW1xuICAgIHtcbiAgICAgICAgbWV0aG9kOiAnR0VUJyxcbiAgICAgICAgcGF0aDogX3ByZWZpeCArICcvbGlzdCcsXG4gICAgICAgIGhhbmRsZXI6IGZ1bmN0aW9uKHJlcXVlc3QsIHJlcGx5KSB7XG4gICAgICAgICAgICBBdXRob3JzU2VydmljZS5nZXRBdXRob3JzTGlzdCgpLnRoZW4oKGRhdGE6IEFycmF5PGFueT4pID0+IHtcbiAgICAgICAgICAgICAgICByZXBseShkYXRhKTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgIH0sXG4gICAgICAgIGNvbmZpZzoge1xuICAgICAgICAgICAgZGVzY3JpcHRpb246ICdSZXRyaWV2ZSBBdXRob3JzIGxpc3QnXG4gICAgICAgIH1cbiAgICB9XG5dXG5cblxubW9kdWxlLmV4cG9ydHMgPSBhdXRob3JzO1xuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9