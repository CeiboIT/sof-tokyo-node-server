'use strict';
///<reference path="../../../typings/tsd.d.ts" />
///<reference path="./email.service.ts" />
var service = require('./email.service');
var Joi = require('joi');
var EmailService = new service.EmailService();
var _prefix = '/email';
var email = [
    {
        method: 'GET',
        path: _prefix + '/test',
        handler: function (request, reply) {
            EmailService.sendTestEmail().then(function (data) {
                reply(data);
            });
        },
        config: {
            description: 'Send a test Email',
            tags: ['email']
        }
    },
    {
        method: 'POST',
        path: _prefix + '/new',
        handler: function (request, reply) {
            EmailService.sendNewEmail(request.payload.fromEmail, request.payload.fromName, request.payload.schools).then(function (data) {
                reply(data);
            });
        },
        config: {
            validate: {
                query: {
                    fromEmail: Joi.string(),
                    fromName: Joi.string(),
                    schools: Joi.array()
                }
            },
            description: 'Send a new Email',
            tags: ['email']
        }
    },
];
module.exports = email;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1vZHVsZXMvZW1haWwvZW1haWwucm91dGVzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLFlBQVksQ0FBQztBQUViLEFBSUEsaURBSmlEO0FBQ2pELDBDQUEwQztBQUcxQyxJQUFPLE9BQU8sV0FBVyxpQkFBaUIsQ0FBQyxDQUFDO0FBQzVDLElBQU8sR0FBRyxXQUFXLEtBQUssQ0FBQyxDQUFDO0FBRTVCLElBQUksWUFBWSxHQUFHLElBQUksT0FBTyxDQUFDLFlBQVksRUFBRSxDQUFDO0FBQzlDLElBQUksT0FBTyxHQUFHLFFBQVEsQ0FBQztBQUN2QixJQUFJLEtBQUssR0FBRztJQUNSO1FBQ0ksTUFBTSxFQUFFLEtBQUs7UUFDYixJQUFJLEVBQUUsT0FBTyxHQUFHLE9BQU87UUFDdkIsT0FBTyxFQUFFLFVBQVMsT0FBTyxFQUFFLEtBQUs7WUFDNUIsWUFBWSxDQUFDLGFBQWEsRUFBRSxDQUN2QixJQUFJLENBQUMsVUFBQyxJQUFJO2dCQUNQLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUNoQixDQUFDLENBQUMsQ0FBQTtRQUNWLENBQUM7UUFDRCxNQUFNLEVBQUU7WUFDSixXQUFXLEVBQUUsbUJBQW1CO1lBQ2hDLElBQUksRUFBRSxDQUFDLE9BQU8sQ0FBQztTQUNsQjtLQUNKO0lBQ0Q7UUFDSSxNQUFNLEVBQUUsTUFBTTtRQUNkLElBQUksRUFBRSxPQUFPLEdBQUcsTUFBTTtRQUN0QixPQUFPLEVBQUUsVUFBUyxPQUFPLEVBQUUsS0FBSztZQUM1QixZQUFZLENBQUMsWUFBWSxDQUNyQixPQUFPLENBQUMsT0FBTyxDQUFDLFNBQVMsRUFDekIsT0FBTyxDQUFDLE9BQU8sQ0FBQyxRQUFRLEVBQ3hCLE9BQU8sQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQ3ZCLElBQUksQ0FBQyxVQUFDLElBQUk7Z0JBQ1AsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ2hCLENBQUMsQ0FBQyxDQUFBO1FBQ1YsQ0FBQztRQUNELE1BQU0sRUFBRTtZQUNKLFFBQVEsRUFBRTtnQkFDTixLQUFLLEVBQUU7b0JBQ0gsU0FBUyxFQUFFLEdBQUcsQ0FBQyxNQUFNLEVBQUU7b0JBQ3ZCLFFBQVEsRUFBRSxHQUFHLENBQUMsTUFBTSxFQUFFO29CQUN0QixPQUFPLEVBQUUsR0FBRyxDQUFDLEtBQUssRUFBRTtpQkFDdkI7YUFDSjtZQUNELFdBQVcsRUFBRSxrQkFBa0I7WUFDL0IsSUFBSSxFQUFFLENBQUMsT0FBTyxDQUFDO1NBQ2xCO0tBQ0o7Q0FDSixDQUFBO0FBR0QsTUFBTSxDQUFDLE9BQU8sR0FBRyxLQUFLLENBQUMiLCJmaWxlIjoibW9kdWxlcy9lbWFpbC9lbWFpbC5yb3V0ZXMuanMiLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCc7XG5cbi8vLzxyZWZlcmVuY2UgcGF0aD1cIi4uLy4uLy4uL3R5cGluZ3MvdHNkLmQudHNcIiAvPlxuLy8vPHJlZmVyZW5jZSBwYXRoPVwiLi9lbWFpbC5zZXJ2aWNlLnRzXCIgLz5cblxuXG5pbXBvcnQgc2VydmljZSA9IHJlcXVpcmUoJy4vZW1haWwuc2VydmljZScpO1xuaW1wb3J0IEpvaSA9IHJlcXVpcmUoJ2pvaScpO1xuXG52YXIgRW1haWxTZXJ2aWNlID0gbmV3IHNlcnZpY2UuRW1haWxTZXJ2aWNlKCk7XG52YXIgX3ByZWZpeCA9ICcvZW1haWwnO1xudmFyIGVtYWlsID0gW1xuICAgIHtcbiAgICAgICAgbWV0aG9kOiAnR0VUJyxcbiAgICAgICAgcGF0aDogX3ByZWZpeCArICcvdGVzdCcsXG4gICAgICAgIGhhbmRsZXI6IGZ1bmN0aW9uKHJlcXVlc3QsIHJlcGx5KSB7XG4gICAgICAgICAgICBFbWFpbFNlcnZpY2Uuc2VuZFRlc3RFbWFpbCgpXG4gICAgICAgICAgICAgICAgLnRoZW4oKGRhdGEpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgcmVwbHkoZGF0YSk7XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgfSxcbiAgICAgICAgY29uZmlnOiB7XG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogJ1NlbmQgYSB0ZXN0IEVtYWlsJyxcbiAgICAgICAgICAgIHRhZ3M6IFsnZW1haWwnXVxuICAgICAgICB9XG4gICAgfSxcbiAgICB7XG4gICAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgICBwYXRoOiBfcHJlZml4ICsgJy9uZXcnLFxuICAgICAgICBoYW5kbGVyOiBmdW5jdGlvbihyZXF1ZXN0LCByZXBseSkge1xuICAgICAgICAgICAgRW1haWxTZXJ2aWNlLnNlbmROZXdFbWFpbChcbiAgICAgICAgICAgICAgICByZXF1ZXN0LnBheWxvYWQuZnJvbUVtYWlsLFxuICAgICAgICAgICAgICAgIHJlcXVlc3QucGF5bG9hZC5mcm9tTmFtZSxcbiAgICAgICAgICAgICAgICByZXF1ZXN0LnBheWxvYWQuc2Nob29scylcbiAgICAgICAgICAgICAgICAudGhlbigoZGF0YSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICByZXBseShkYXRhKTtcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICB9LFxuICAgICAgICBjb25maWc6IHtcbiAgICAgICAgICAgIHZhbGlkYXRlOiB7XG4gICAgICAgICAgICAgICAgcXVlcnk6IHtcbiAgICAgICAgICAgICAgICAgICAgZnJvbUVtYWlsOiBKb2kuc3RyaW5nKCksXG4gICAgICAgICAgICAgICAgICAgIGZyb21OYW1lOiBKb2kuc3RyaW5nKCksXG4gICAgICAgICAgICAgICAgICAgIHNjaG9vbHM6IEpvaS5hcnJheSgpXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiAnU2VuZCBhIG5ldyBFbWFpbCcsXG4gICAgICAgICAgICB0YWdzOiBbJ2VtYWlsJ11cbiAgICAgICAgfVxuICAgIH0sXG5dXG5cblxubW9kdWxlLmV4cG9ydHMgPSBlbWFpbDtcbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==