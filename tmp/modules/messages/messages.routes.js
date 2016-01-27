'use strict';
/// <reference path="../../../typings/tsd.d.ts" />
/// <reference path="./messages.service.ts" />
var service = require('./messages.service');
var Joi = require('joi');
var MessagesService = new service.MessagesService();
var _prefix = '/messages';
var messages = [
    {
        method: 'GET',
        path: _prefix + '/show/{userId}',
        handler: function (request, reply) {
            MessagesService.showMessages(request.params.userId).then(function (data) {
                reply({ messages: data });
            });
        },
        config: {
            validate: {
                query: {
                    userId: Joi.number().integer()
                }
            },
            description: 'Retrieve Messages from UserID',
            tags: ['messages']
        }
    },
    {
        method: 'PUT',
        path: _prefix + '/read',
        handler: function (request, reply) {
            MessagesService.readMessages(request.payload.userId, request.payload.threadId).then(function (data) {
                reply({ response: data });
            });
        },
        config: {
            validate: {
                query: {
                    userId: Joi.number().integer(),
                    threadId: Joi.number().integer()
                }
            },
            description: 'Update unread Messages to 0 of ThreadID from UserID',
            tags: ['messages']
        }
    },
    {
        method: 'POST',
        path: _prefix + '/create',
        handler: function (request, reply) {
            MessagesService.createMessage(request.payload.senderId, request.payload.receiverId, request.payload.subject, request.payload.message).then(function (data) {
                reply(data);
            });
        },
        config: {
            validate: {
                query: {
                    senderId: Joi.number().integer(),
                    receiverId: Joi.number().integer(),
                    subject: Joi.string(),
                    message: Joi.string()
                }
            },
            description: 'Create a new Message',
            tags: ['messages']
        }
    },
    {
        method: 'POST',
        path: _prefix + '/response',
        handler: function (request, reply) {
            MessagesService.responseMessage(request.payload.threadId, request.payload.senderId, request.payload.receiverId, request.payload.subject, request.payload.message).then(function (data) {
                reply(data);
            });
        },
        config: {
            validate: {
                query: {
                    threadId: Joi.number().integer(),
                    senderId: Joi.number().integer(),
                    receiverId: Joi.number().integer(),
                    subject: Joi.string(),
                    message: Joi.string()
                }
            },
            description: 'Response a Message',
            tags: ['messages']
        }
    },
];
module.exports = messages;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1vZHVsZXMvbWVzc2FnZXMvbWVzc2FnZXMucm91dGVzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLFlBQVksQ0FBQztBQUViLEFBR0Esa0RBSGtEO0FBQ2xELDhDQUE4QztBQUU5QyxJQUFPLE9BQU8sV0FBVyxvQkFBb0IsQ0FBQyxDQUFDO0FBQy9DLElBQU8sR0FBRyxXQUFXLEtBQUssQ0FBQyxDQUFDO0FBRTVCLElBQUksZUFBZSxHQUFHLElBQUksT0FBTyxDQUFDLGVBQWUsRUFBRSxDQUFDO0FBQ3BELElBQUksT0FBTyxHQUFHLFdBQVcsQ0FBQztBQUMxQixJQUFJLFFBQVEsR0FBRztJQUNYO1FBQ0ksTUFBTSxFQUFFLEtBQUs7UUFDYixJQUFJLEVBQUUsT0FBTyxHQUFHLGdCQUFnQjtRQUNoQyxPQUFPLEVBQUUsVUFBUyxPQUFPLEVBQUUsS0FBSztZQUM1QixlQUFlLENBQUMsWUFBWSxDQUN4QixPQUFPLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUNyQixJQUFJLENBQUMsVUFBQyxJQUFJO2dCQUNQLEtBQUssQ0FBQyxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDO1lBQzlCLENBQUMsQ0FBQyxDQUFBO1FBQ1YsQ0FBQztRQUNELE1BQU0sRUFBRTtZQUNKLFFBQVEsRUFBRTtnQkFDTixLQUFLLEVBQUU7b0JBQ0gsTUFBTSxFQUFFLEdBQUcsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxPQUFPLEVBQUU7aUJBQ2pDO2FBQ0o7WUFDRCxXQUFXLEVBQUUsK0JBQStCO1lBQzVDLElBQUksRUFBRSxDQUFDLFVBQVUsQ0FBQztTQUNyQjtLQUNKO0lBQ0Q7UUFDSSxNQUFNLEVBQUUsS0FBSztRQUNiLElBQUksRUFBRSxPQUFPLEdBQUcsT0FBTztRQUN2QixPQUFPLEVBQUUsVUFBUyxPQUFPLEVBQUUsS0FBSztZQUM1QixlQUFlLENBQUMsWUFBWSxDQUN4QixPQUFPLENBQUMsT0FBTyxDQUFDLE1BQU0sRUFDdEIsT0FBTyxDQUFDLE9B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J3VzZSBzdHJpY3QnO1xuXG4vLy8gPHJlZmVyZW5jZSBwYXRoPVwiLi4vLi4vLi4vdHlwaW5ncy90c2QuZC50c1wiIC8+XG4vLy8gPHJlZmVyZW5jZSBwYXRoPVwiLi9tZXNzYWdlcy5zZXJ2aWNlLnRzXCIgLz5cblxuaW1wb3J0IHNlcnZpY2UgPSByZXF1aXJlKCcuL21lc3NhZ2VzLnNlcnZpY2UnKTtcbmltcG9ydCBKb2kgPSByZXF1aXJlKCdqb2knKTtcblxudmFyIE1lc3NhZ2VzU2VydmljZSA9IG5ldyBzZXJ2aWNlLk1lc3NhZ2VzU2VydmljZSgpO1xudmFyIF9wcmVmaXggPSAnL21lc3NhZ2VzJztcbnZhciBtZXNzYWdlcyA9IFtcbiAgICB7XG4gICAgICAgIG1ldGhvZDogJ0dFVCcsXG4gICAgICAgIHBhdGg6IF9wcmVmaXggKyAnL3Nob3cve3VzZXJJZH0nLFxuICAgICAgICBoYW5kbGVyOiBmdW5jdGlvbihyZXF1ZXN0LCByZXBseSkge1xuICAgICAgICAgICAgTWVzc2FnZXNTZXJ2aWNlLnNob3dNZXNzYWdlcyhcbiAgICAgICAgICAgICAgICByZXF1ZXN0LnBhcmFtcy51c2VySWQpXG4gICAgICAgICAgICAgICAgLnRoZW4oKGRhdGEpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgcmVwbHkoeyBtZXNzYWdlczogZGF0YSB9KTtcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICB9LFxuICAgICAgICBjb25maWc6IHtcbiAgICAgICAgICAgIHZhbGlkYXRlOiB7XG4gICAgICAgICAgICAgICAgcXVlcnk6IHtcbiAgICAgICAgICAgICAgICAgICAgdXNlcklkOiBKb2kubnVtYmVyKCkuaW50ZWdlcigpXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiAnUmV0cmlldmUgTWVzc2FnZXMgZnJvbSBVc2VySUQnLFxuICAgICAgICAgICAgdGFnczogWydtZXNzYWdlcyddXG4gICAgICAgIH1cbiAgICB9LFxuICAgIHtcbiAgICAgICAgbWV0aG9kOiAnUFVUJyxcbiAgICAgICAgcGF0aDogX3ByZWZpeCArICcvcmVhZCcsXG4gICAgICAgIGhhbmRsZXI6IGZ1bmN0aW9uKHJlcXVlc3QsIHJlcGx5KSB7XG4gICAgICAgICAgICBNZXNzYWdlc1NlcnZpY2UucmVhZE1lc3NhZ2VzKFxuICAgICAgICAgICAgICAgIHJlcXVlc3QucGF5bG9hZC51c2VySWQsXG4gICAgICAgICAgICAgICAgcmVxdWVzdC5wYXlsb2FkLnRocmVhZElkKVxuICAgICAgICAgICAgICAgIC50aGVuKChkYXRhKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHJlcGx5KHsgcmVzcG9uc2U6IGRhdGEgfSk7XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgfSxcbiAgICAgICAgY29uZmlnOiB7XG4gICAgICAgICAgICB2YWxpZGF0ZToge1xuICAgICAgICAgICAgICAgIHF1ZXJ5OiB7XG4gICAgICAgICAgICAgICAgICAgIHVzZXJJZDogSm9pLm51bWJlcigpLmludGVnZXIoKSxcbiAgICAgICAgICAgICAgICAgICAgdGhyZWFkSWQ6IEpvaS5udW1iZXIoKS5pbnRlZ2VyKClcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZGVzY3JpcHRpb246ICdVcGRhdGUgdW5yZWFkIE1lc3NhZ2VzIHRvIDAgb2YgVGhyZWFkSUQgZnJvbSBVc2VySUQnLFxuICAgICAgICAgICAgdGFnczogWydtZXNzYWdlcyddXG4gICAgICAgIH1cbiAgICB9LFxuICAgIHtcbiAgICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICAgIHBhdGg6IF9wcmVmaXggKyAnL2NyZWF0ZScsXG4gICAgICAgIGhhbmRsZXI6IGZ1bmN0aW9uKHJlcXVlc3QsIHJlcGx5KSB7XG4gICAgICAgICAgICBNZXNzYWdlc1NlcnZpY2UuY3JlYXRlTWVzc2FnZShcbiAgICAgICAgICAgICAgICByZXF1ZXN0LnBheWxvYWQuc2VuZGVySWQsXG4gICAgICAgICAgICAgICAgcmVxdWVzdC5wYXlsb2FkLnJlY2VpdmVySWQsXG4gICAgICAgICAgICAgICAgcmVxdWVzdC5wYXlsb2FkLnN1YmplY3QsXG4gICAgICAgICAgICAgICAgcmVxdWVzdC5wYXlsb2FkLm1lc3NhZ2UpXG4gICAgICAgICAgICAgICAgLnRoZW4oKGRhdGEpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgcmVwbHkoZGF0YSk7XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgfSxcbiAgICAgICAgY29uZmlnOiB7XG4gICAgICAgICAgICB2YWxpZGF0ZToge1xuICAgICAgICAgICAgICAgIHF1ZXJ5OiB7XG4gICAgICAgICAgICAgICAgICAgIHNlbmRlcklkOiBKb2kubnVtYmVyKCkuaW50ZWdlcigpLFxuICAgICAgICAgICAgICAgICAgICByZWNlaXZlcklkOiBKb2kubnVtYmVyKCkuaW50ZWdlcigpLFxuICAgICAgICAgICAgICAgICAgICBzdWJqZWN0OiBKb2kuc3RyaW5nKCksXG4gICAgICAgICAgICAgICAgICAgIG1lc3NhZ2U6IEpvaS5zdHJpbmcoKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogJ0NyZWF0ZSBhIG5ldyBNZXNzYWdlJyxcbiAgICAgICAgICAgIHRhZ3M6IFsnbWVzc2FnZXMnXVxuICAgICAgICB9XG4gICAgfSxcbiAgICB7XG4gICAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgICBwYXRoOiBfcHJlZml4ICsgJy9yZXNwb25zZScsXG4gICAgICAgIGhhbmRsZXI6IGZ1bmN0aW9uKHJlcXVlc3QsIHJlcGx5KSB7XG4gICAgICAgICAgICBNZXNzYWdlc1NlcnZpY2UucmVzcG9uc2VNZXNzYWdlKFxuICAgICAgICAgICAgICAgIHJlcXVlc3QucGF5bG9hZC50aHJlYWRJZCxcbiAgICAgICAgICAgICAgICByZXF1ZXN0LnBheWxvYWQuc2VuZGVySWQsXG4gICAgICAgICAgICAgICAgcmVxdWVzdC5wYXlsb2FkLnJlY2VpdmVySWQsXG4gICAgICAgICAgICAgICAgcmVxdWVzdC5wYXlsb2FkLnN1YmplY3QsXG4gICAgICAgICAgICAgICAgcmVxdWVzdC5wYXlsb2FkLm1lc3NhZ2UpXG4gICAgICAgICAgICAgICAgLnRoZW4oKGRhdGEpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgcmVwbHkoZGF0YSk7XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgfSxcbiAgICAgICAgY29uZmlnOiB7XG4gICAgICAgICAgICB2YWxpZGF0ZToge1xuICAgICAgICAgICAgICAgIHF1ZXJ5OiB7XG4gICAgICAgICAgICAgICAgICAgIHRocmVhZElkOiBKb2kubnVtYmVyKCkuaW50ZWdlcigpLFxuICAgICAgICAgICAgICAgICAgICBzZW5kZXJJZDogSm9pLm51bWJlcigpLmludGVnZXIoKSxcbiAgICAgICAgICAgICAgICAgICAgcmVjZWl2ZXJJZDogSm9pLm51bWJlcigpLmludGVnZXIoKSxcbiAgICAgICAgICAgICAgICAgICAgc3ViamVjdDogSm9pLnN0cmluZygpLFxuICAgICAgICAgICAgICAgICAgICBtZXNzYWdlOiBKb2kuc3RyaW5nKClcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZGVzY3JpcHRpb246ICdSZXNwb25zZSBhIE1lc3NhZ2UnLFxuICAgICAgICAgICAgdGFnczogWydtZXNzYWdlcyddXG4gICAgICAgIH1cbiAgICB9LFxuXVxuXG5tb2R1bGUuZXhwb3J0cyA9IG1lc3NhZ2VzO1xuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9