'use strict';
///<reference path="../../../typings/tsd.d.ts" />
///<reference path="./tags.service.ts" />
var service = require('./tags.service');
var TagsService = new service.TagsService();
var _prefix = '/tags';
var tags = [
    {
        method: 'GET',
        path: _prefix + '/list',
        handler: function (request, reply) {
            TagsService.getTagsList().then(function (data) {
                reply(data);
            });
        },
        config: {
            description: 'Retrieve Tag list'
        }
    }
];
module.exports = tags;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1vZHVsZXMvdGFncy90YWdzLnJvdXRlcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxZQUFZLENBQUM7QUFFYixBQUlBLGlEQUppRDtBQUNqRCx5Q0FBeUM7QUFHekMsSUFBTyxPQUFPLFdBQVcsZ0JBQWdCLENBQUMsQ0FBQztBQUUzQyxJQUFJLFdBQVcsR0FBRyxJQUFJLE9BQU8sQ0FBQyxXQUFXLEVBQUUsQ0FBQztBQUM1QyxJQUFJLE9BQU8sR0FBRyxPQUFPLENBQUM7QUFDdEIsSUFBSSxJQUFJLEdBQUc7SUFDUDtRQUNJLE1BQU0sRUFBRSxLQUFLO1FBQ2IsSUFBSSxFQUFFLE9BQU8sR0FBRyxPQUFPO1FBQ3ZCLE9BQU8sRUFBRSxVQUFTLE9BQU8sRUFBRSxLQUFLO1lBRTVCLFdBQVcsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxJQUFJLENBQUMsVUFBQyxJQUFnQjtnQkFDNUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ2hCLENBQUMsQ0FBQyxDQUFBO1FBQ04sQ0FBQztRQUNELE1BQU0sRUFBRTtZQUNKLFdBQVcsRUFBRSxtQkFBbUI7U0FDbkM7S0FDSjtDQUNKLENBQUE7QUFHRCxNQUFNLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyIsImZpbGUiOiJtb2R1bGVzL3RhZ3MvdGFncy5yb3V0ZXMuanMiLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCc7XG5cbi8vLzxyZWZlcmVuY2UgcGF0aD1cIi4uLy4uLy4uL3R5cGluZ3MvdHNkLmQudHNcIiAvPlxuLy8vPHJlZmVyZW5jZSBwYXRoPVwiLi90YWdzLnNlcnZpY2UudHNcIiAvPlxuXG5cbmltcG9ydCBzZXJ2aWNlID0gcmVxdWlyZSgnLi90YWdzLnNlcnZpY2UnKTtcblxudmFyIFRhZ3NTZXJ2aWNlID0gbmV3IHNlcnZpY2UuVGFnc1NlcnZpY2UoKTtcbnZhciBfcHJlZml4ID0gJy90YWdzJztcbnZhciB0YWdzID0gW1xuICAgIHtcbiAgICAgICAgbWV0aG9kOiAnR0VUJyxcbiAgICAgICAgcGF0aDogX3ByZWZpeCArICcvbGlzdCcsXG4gICAgICAgIGhhbmRsZXI6IGZ1bmN0aW9uKHJlcXVlc3QsIHJlcGx5KSB7XG5cbiAgICAgICAgICAgIFRhZ3NTZXJ2aWNlLmdldFRhZ3NMaXN0KCkudGhlbigoZGF0YTogQXJyYXk8YW55PikgPT4ge1xuICAgICAgICAgICAgICAgIHJlcGx5KGRhdGEpO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgfSxcbiAgICAgICAgY29uZmlnOiB7XG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogJ1JldHJpZXZlIFRhZyBsaXN0J1xuICAgICAgICB9XG4gICAgfVxuXVxuXG5cbm1vZHVsZS5leHBvcnRzID0gdGFncztcbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==