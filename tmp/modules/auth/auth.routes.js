'use strict';
///<reference path="../../../typings/tsd.d.ts" />
///<reference path="./authors.service.ts" />
var service = require('./auth.service');
var Joi = require('joi');
var AuthService = new service.AuthService();
var _prefix = '/auth';
var auth = [
    {
        method: 'GET',
        path: _prefix + '/nonce/{controller}/{method}',
        handler: function (request, reply) {
            AuthService.getNonce(request.params.controller, request.params.method).then(function (data) {
                reply(data);
            });
        },
        config: {
            validate: {
                query: {
                    controller: Joi.string(),
                    method: Joi.string()
                }
            },
            description: "Retrieve a Nonce",
            notes: [
                "Controller values: 'posts'",
                "Method values: 'create_post'/'update_post'/'delete_post'"
            ],
            tags: ['auth']
        }
    },
    {
        method: 'POST',
        path: _prefix + '/register',
        handler: function (request, reply) {
            AuthService.register(request.payload.username, request.payload.email, request.payload.display_name, request.payload.years, request.payload.country, request.payload.school, request.payload.ob).then(function (data) {
                reply(data);
            });
        },
        config: {
            validate: {
                query: {
                    username: Joi.string(),
                    email: Joi.string(),
                    display_name: Joi.string(),
                    years: Joi.number().integer(),
                    country: Joi.string(),
                    school: Joi.string(),
                    ob: Joi.string()
                }
            },
            description: 'Create a new User (need to create a new Nonce first and pass it as param)',
            tags: ['auth']
        }
    },
    {
        method: 'POST',
        path: _prefix + '/login',
        handler: function (request, reply) {
            AuthService.login(request.payload.username, request.payload.password).then(function (data) {
                reply(data);
            });
        },
        config: {
            validate: {
                query: {
                    username: Joi.string(),
                    password: Joi.string()
                }
            },
            description: 'Login a User > Retrieve a Session Cookie',
            tags: ['auth']
        }
    },
    {
        method: 'POST',
        path: _prefix + '/facebook/login',
        handler: function (request, reply) {
            AuthService.fbLogin(request.payload.token).then(function (data) {
                reply(data);
            });
        },
        config: {
            validate: {
                query: {
                    token: Joi.string()
                }
            },
            description: 'Login using Facebook',
            tags: ['auth']
        }
    },
    {
        method: 'POST',
        path: _prefix + '/is_authorized',
        handler: function (request, reply) {
            AuthService.isAuthorized(request.payload.cookie).then(function (data) {
                reply(data);
            });
        },
        config: {
            validate: {
                query: {
                    cookie: Joi.string()
                }
            },
            description: 'Check if a Session Cookie is still valid',
            tags: ['auth']
        }
    },
    {
        method: 'GET',
        path: _prefix + '/get_user/{userId}',
        handler: function (request, reply) {
            AuthService.getUserInfo(request.params.userId).then(function (data) {
                reply(data);
            });
        },
        config: {
            validate: {
                query: {
                    userId: Joi.string()
                }
            },
            description: 'Retrieve User info',
            tags: ['auth']
        }
    },
    ,
    {
        method: 'GET',
        path: _prefix + '/get_avatar/{userId}/{type}',
        handler: function (request, reply) {
            AuthService.getUserAvatar(request.params.userId, request.params.type).then(function (data) {
                reply(data);
            });
        },
        config: {
            validate: {
                query: {
                    userId: Joi.string(),
                    type: Joi.string()
                }
            },
            description: "Retrieve User's Avatar",
            notes: [
                "Type values: 'full'/'thumb'"
            ],
            tags: ['auth']
        }
    },
    ,
    {
        method: 'POST',
        path: _prefix + '/reset_password',
        handler: function (request, reply) {
            AuthService.resetPassword(request.params.username).then(function (data) {
                reply(data);
            });
        },
        config: {
            validate: {
                query: {
                    username: Joi.string()
                }
            },
            description: "Reset User's Password and send an email with instructions",
            tags: ['auth']
        }
    },
];
module.exports = auth;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1vZHVsZXMvYXV0aC9hdXRoLnJvdXRlcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxZQUFZLENBQUM7QUFFYixBQUlBLGlEQUppRDtBQUNqRCw0Q0FBNEM7QUFHNUMsSUFBTyxPQUFPLFdBQVcsZ0JBQWdCLENBQUMsQ0FBQztBQUMzQyxJQUFPLEdBQUcsV0FBVyxLQUFLLENBQUMsQ0FBQztBQUU1QixJQUFJLFdBQVcsR0FBRyxJQUFJLE9BQU8sQ0FBQyxXQUFXLEVBQUUsQ0FBQztBQUM1QyxJQUFJLE9BQU8sR0FBRyxPQUFPLENBQUM7QUFDdEIsSUFBSSxJQUFJLEdBQUc7SUFDUDtRQUNJLE1BQU0sRUFBRSxLQUFLO1FBQ2IsSUFBSSxFQUFFLE9BQU8sR0FBRyw4QkFBOEI7UUFDOUMsT0FBTyxFQUFFLFVBQVMsT0FBTyxFQUFFLEtBQUs7WUFDNUIsV0FBVyxDQUFDLFFBQVEsQ0FDaEIsT0FBTyxDQUFDLE1BQU0sQ0FBQyxVQUFVLEVBQ3pCLE9BQU8sQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQ3pCLElBQUksQ0FBQyxVQUFDLElBQUk7Z0JBQ1AsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ2hCLENBQUMsQ0FBQyxDQUFBO1FBQ04sQ0FBQztRQUNELE1BQU0sRUFBRTtZQUNKLFFBQVEsRUFBRTtnQkFDTixLQUFLLEVBQUU7b0JBQ0gsVUFBVSxFQUFFLEdBQUcsQ0FBQyxNQUFNLEVBQUU7b0JBQ3hCLE1BQU0sRUFBRSxHQUFHLENBQUMsTUFBTSxFQUFFO2lCQUN2QjthQUNKO1lBQ0QsV0FBVyxFQUFFLGtCQUFrQjtZQUMvQixLQUFLLEVBQUU7Z0JBQ0gsNEJBQTRCO2dCQUM1QiwwREFBMEQ7YUFDN0Q7WUFDRCxJQUFJLEVBQUUsQ0FBQyxNQUFNLENBQUM7U0FDakI7S0FDSjtJQUNEO1FBQ0ksTUFBTSxFQUFFLE1BQU07UUFDZCxJQUFJLEVBQUUsT0FBTyxHQUFHLFdBQVc7UUFDM0IsT0FBTyxFQUFFLFVBQVMsT0FBTyxFQUFFLEtB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RTtvQkFDSCxNQUFNLEVBQUUsR0FBRyxDQUFDLE1BQU0sRUFBRTtvQkFDcEIsSUFBSSxFQUFFLEdBQUcsQ0FBQyxNQUFNLEVBQUU7aUJBQ3JCO2FBQ0o7WUFDRCxXQUFXLEVBQUUsd0JBQXdCO1lBQ3JDLEtBQUssRUFBRTtnQkFDSCw2QkFBNkI7YUFDaEM7WUFDRCxJQUFJLEVBQUUsQ0FBQyxNQUFNLENBQUM7U0FDakI7S0FDSjtJQUFDLEFBQUM7SUFDSDtRQUNJLE1BQU0sRUFBRSxNQUFNO1FBQ2QsSUFBSSxFQUFFLE9BQU8sR0FBRyxpQkFBaUI7UUFDakMsT0FBTyxFQUFFLFVBQVMsT0FBTyxFQUFFLEtBQUs7WUFDNUIsV0FBVyxDQUFDLGFBQWEsQ0FDckIsT0FBTyxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FDM0IsSUFBSSxDQUFDLFVBQUMsSUFBSTtnQkFDUCxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDaEIsQ0FBQyxDQUFDLENBQUE7UUFDTixDQUFDO1FBQ0QsTUFBTSxFQUFFO1lBQ0osUUFBUSxFQUFFO2dCQUNOLEtBQUssRUFBRTtvQkFDSCxRQUFRLEVBQUUsR0FBRyxDQUFDLE1BQU0sRUFBRTtpQkFDekI7YUFDSjtZQUNELFdBQVcsRUFBRSwyREFBMkQ7WUFDeEUsSUFBSSxFQUFFLENBQUMsTUFBTSxDQUFDO1NBQ2pCO0tBQ0o7Q0FDSixDQUFBO0FBR0QsTUFBTSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMiLCJmaWxlIjoibW9kdWxlcy9hdXRoL2F1dGgucm91dGVzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnO1xuXG4vLy88cmVmZXJlbmNlIHBhdGg9XCIuLi8uLi8uLi90eXBpbmdzL3RzZC5kLnRzXCIgLz5cbi8vLzxyZWZlcmVuY2UgcGF0aD1cIi4vYXV0aG9ycy5zZXJ2aWNlLnRzXCIgLz5cblxuXG5pbXBvcnQgc2VydmljZSA9IHJlcXVpcmUoJy4vYXV0aC5zZXJ2aWNlJyk7XG5pbXBvcnQgSm9pID0gcmVxdWlyZSgnam9pJyk7XG5cbnZhciBBdXRoU2VydmljZSA9IG5ldyBzZXJ2aWNlLkF1dGhTZXJ2aWNlKCk7XG52YXIgX3ByZWZpeCA9ICcvYXV0aCc7XG52YXIgYXV0aCA9IFtcbiAgICB7XG4gICAgICAgIG1ldGhvZDogJ0dFVCcsXG4gICAgICAgIHBhdGg6IF9wcmVmaXggKyAnL25vbmNlL3tjb250cm9sbGVyfS97bWV0aG9kfScsXG4gICAgICAgIGhhbmRsZXI6IGZ1bmN0aW9uKHJlcXVlc3QsIHJlcGx5KSB7XG4gICAgICAgICAgICBBdXRoU2VydmljZS5nZXROb25jZShcbiAgICAgICAgICAgICAgICByZXF1ZXN0LnBhcmFtcy5jb250cm9sbGVyLFxuICAgICAgICAgICAgICAgIHJlcXVlc3QucGFyYW1zLm1ldGhvZClcbiAgICAgICAgICAgIC50aGVuKChkYXRhKSA9PiB7XG4gICAgICAgICAgICAgICAgcmVwbHkoZGF0YSk7XG4gICAgICAgICAgICB9KVxuICAgICAgICB9LFxuICAgICAgICBjb25maWc6IHtcbiAgICAgICAgICAgIHZhbGlkYXRlOiB7XG4gICAgICAgICAgICAgICAgcXVlcnk6IHtcbiAgICAgICAgICAgICAgICAgICAgY29udHJvbGxlcjogSm9pLnN0cmluZygpLFxuICAgICAgICAgICAgICAgICAgICBtZXRob2Q6IEpvaS5zdHJpbmcoKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJSZXRyaWV2ZSBhIE5vbmNlXCIsXG4gICAgICAgICAgICBub3RlczogW1xuICAgICAgICAgICAgICAgIFwiQ29udHJvbGxlciB2YWx1ZXM6ICdwb3N0cydcIixcbiAgICAgICAgICAgICAgICBcIk1ldGhvZCB2YWx1ZXM6ICdjcmVhdGVfcG9zdCcvJ3VwZGF0ZV9wb3N0Jy8nZGVsZXRlX3Bvc3QnXCJcbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgICB0YWdzOiBbJ2F1dGgnXVxuICAgICAgICB9XG4gICAgfSxcbiAgICB7XG4gICAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgICBwYXRoOiBfcHJlZml4ICsgJy9yZWdpc3RlcicsXG4gICAgICAgIGhhbmRsZXI6IGZ1bmN0aW9uKHJlcXVlc3QsIHJlcGx5KSB7XG4gICAgICAgICAgICBBdXRoU2VydmljZS5yZWdpc3RlcihcbiAgICAgICAgICAgICAgICByZXF1ZXN0LnBheWxvYWQudXNlcm5hbWUsXG4gICAgICAgICAgICAgICAgcmVxdWVzdC5wYXlsb2FkLmVtYWlsLFxuICAgICAgICAgICAgICAgIHJlcXVlc3QucGF5bG9hZC5kaXNwbGF5X25hbWUsXG4gICAgICAgICAgICAgICAgcmVxdWVzdC5wYXlsb2FkLnllYXJzLFxuICAgICAgICAgICAgICAgIHJlcXVlc3QucGF5bG9hZC5jb3VudHJ5LFxuICAgICAgICAgICAgICAgIHJlcXVlc3QucGF5bG9hZC5zY2hvb2wsXG4gICAgICAgICAgICAgICAgcmVxdWVzdC5wYXlsb2FkLm9iKVxuICAgICAgICAgICAgLnRoZW4oKGRhdGEpID0+IHtcbiAgICAgICAgICAgICAgICByZXBseShkYXRhKTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgIH0sXG4gICAgICAgIGNvbmZpZzoge1xuICAgICAgICAgICAgdmFsaWRhdGU6IHtcbiAgICAgICAgICAgICAgICBxdWVyeToge1xuICAgICAgICAgICAgICAgICAgICB1c2VybmFtZTogSm9pLnN0cmluZygpLFxuICAgICAgICAgICAgICAgICAgICBlbWFpbDogSm9pLnN0cmluZygpLFxuICAgICAgICAgICAgICAgICAgICBkaXNwbGF5X25hbWU6IEpvaS5zdHJpbmcoKSxcbiAgICAgICAgICAgICAgICAgICAgeWVhcnM6IEpvaS5udW1iZXIoKS5pbnRlZ2VyKCksXG4gICAgICAgICAgICAgICAgICAgIGNvdW50cnk6IEpvaS5zdHJpbmcoKSxcbiAgICAgICAgICAgICAgICAgICAgc2Nob29sOiBKb2kuc3RyaW5nKCksXG4gICAgICAgICAgICAgICAgICAgIG9iOiBKb2kuc3RyaW5nKClcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZGVzY3JpcHRpb246ICdDcmVhdGUgYSBuZXcgVXNlciAobmVlZCB0byBjcmVhdGUgYSBuZXcgTm9uY2UgZmlyc3QgYW5kIHBhc3MgaXQgYXMgcGFyYW0pJyxcbiAgICAgICAgICAgIHRhZ3M6IFsnYXV0aCddXG4gICAgICAgIH1cbiAgICB9LFxuICAgIHtcbiAgICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICAgIHBhdGg6IF9wcmVmaXggKyAnL2xvZ2luJyxcbiAgICAgICAgaGFuZGxlcjogZnVuY3Rpb24ocmVxdWVzdCwgcmVwbHkpIHtcbiAgICAgICAgICAgIEF1dGhTZXJ2aWNlLmxvZ2luKFxuICAgICAgICAgICAgICAgIHJlcXVlc3QucGF5bG9hZC51c2VybmFtZSxcbiAgICAgICAgICAgICAgICByZXF1ZXN0LnBheWxvYWQucGFzc3dvcmQpXG4gICAgICAgICAgICAgICAgLnRoZW4oKGRhdGEpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgcmVwbHkoZGF0YSk7XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgfSxcbiAgICAgICAgY29uZmlnOiB7XG4gICAgICAgICAgICB2YWxpZGF0ZToge1xuICAgICAgICAgICAgICAgIHF1ZXJ5OiB7XG4gICAgICAgICAgICAgICAgICAgIHVzZXJuYW1lOiBKb2kuc3RyaW5nKCksXG4gICAgICAgICAgICAgICAgICAgIHBhc3N3b3JkOiBKb2kuc3RyaW5nKClcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZGVzY3JpcHRpb246ICdMb2dpbiBhIFVzZXIgPiBSZXRyaWV2ZSBhIFNlc3Npb24gQ29va2llJyxcbiAgICAgICAgICAgIHRhZ3M6IFsnYXV0aCddXG4gICAgICAgIH1cbiAgICB9LFxuICAgIHtcbiAgICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICAgIHBhdGg6IF9wcmVmaXggKyAnL2ZhY2Vib29rL2xvZ2luJyxcbiAgICAgICAgaGFuZGxlcjogZnVuY3Rpb24ocmVxdWVzdCwgcmVwbHkpIHtcbiAgICAgICAgICAgIEF1dGhTZXJ2aWNlLmZiTG9naW4oXG4gICAgICAgICAgICAgICAgcmVxdWVzdC5wYXlsb2FkLnRva2VuKVxuICAgICAgICAgICAgICAgIC50aGVuKChkYXRhKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHJlcGx5KGRhdGEpO1xuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgIH0sXG4gICAgICAgIGNvbmZpZzoge1xuICAgICAgICAgICAgdmFsaWRhdGU6IHtcbiAgICAgICAgICAgICAgICBxdWVyeToge1xuICAgICAgICAgICAgICAgICAgICB0b2tlbjogSm9pLnN0cmluZygpXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiAnTG9naW4gdXNpbmcgRmFjZWJvb2snLFxuICAgICAgICAgICAgdGFnczogWydhdXRoJ11cbiAgICAgICAgfVxuICAgIH0sXG4gICAge1xuICAgICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgICAgcGF0aDogX3ByZWZpeCArICcvaXNfYXV0aG9yaXplZCcsXG4gICAgICAgIGhhbmRsZXI6IGZ1bmN0aW9uKHJlcXVlc3QsIHJlcGx5KSB7XG4gICAgICAgICAgICBBdXRoU2VydmljZS5pc0F1dGhvcml6ZWQoXG4gICAgICAgICAgICAgICAgcmVxdWVzdC5wYXlsb2FkLmNvb2tpZSlcbiAgICAgICAgICAgIC50aGVuKChkYXRhKSA9PiB7XG4gICAgICAgICAgICAgICAgcmVwbHkoZGF0YSk7XG4gICAgICAgICAgICB9KVxuICAgICAgICB9LFxuICAgICAgICBjb25maWc6IHtcbiAgICAgICAgICAgIHZhbGlkYXRlOiB7XG4gICAgICAgICAgICAgICAgcXVlcnk6IHtcbiAgICAgICAgICAgICAgICAgICAgY29va2llOiBKb2kuc3RyaW5nKClcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZGVzY3JpcHRpb246ICdDaGVjayBpZiBhIFNlc3Npb24gQ29va2llIGlzIHN0aWxsIHZhbGlkJyxcbiAgICAgICAgICAgIHRhZ3M6IFsnYXV0aCddXG4gICAgICAgIH1cbiAgICB9LFxuICAgIHtcbiAgICAgICAgbWV0aG9kOiAnR0VUJyxcbiAgICAgICAgcGF0aDogX3ByZWZpeCArICcvZ2V0X3VzZXIve3VzZXJJZH0nLFxuICAgICAgICBoYW5kbGVyOiBmdW5jdGlvbihyZXF1ZXN0LCByZXBseSkge1xuICAgICAgICAgICAgQXV0aFNlcnZpY2UuZ2V0VXNlckluZm8oXG4gICAgICAgICAgICAgICAgcmVxdWVzdC5wYXJhbXMudXNlcklkKVxuICAgICAgICAgICAgLnRoZW4oKGRhdGEpID0+IHtcbiAgICAgICAgICAgICAgICByZXBseShkYXRhKTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgIH0sXG4gICAgICAgIGNvbmZpZzoge1xuICAgICAgICAgICAgdmFsaWRhdGU6IHtcbiAgICAgICAgICAgICAgICBxdWVyeToge1xuICAgICAgICAgICAgICAgICAgICB1c2VySWQ6IEpvaS5zdHJpbmcoKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogJ1JldHJpZXZlIFVzZXIgaW5mbycsXG4gICAgICAgICAgICB0YWdzOiBbJ2F1dGgnXVxuICAgICAgICB9XG4gICAgfSwgLFxuICAgIHtcbiAgICAgICAgbWV0aG9kOiAnR0VUJyxcbiAgICAgICAgcGF0aDogX3ByZWZpeCArICcvZ2V0X2F2YXRhci97dXNlcklkfS97dHlwZX0nLFxuICAgICAgICBoYW5kbGVyOiBmdW5jdGlvbihyZXF1ZXN0LCByZXBseSkge1xuICAgICAgICAgICAgQXV0aFNlcnZpY2UuZ2V0VXNlckF2YXRhcihcbiAgICAgICAgICAgICAgICByZXF1ZXN0LnBhcmFtcy51c2VySWQsXG4gICAgICAgICAgICAgICAgcmVxdWVzdC5wYXJhbXMudHlwZSlcbiAgICAgICAgICAgIC50aGVuKChkYXRhKSA9PiB7XG4gICAgICAgICAgICAgICAgcmVwbHkoZGF0YSk7XG4gICAgICAgICAgICB9KVxuICAgICAgICB9LFxuICAgICAgICBjb25maWc6IHtcbiAgICAgICAgICAgIHZhbGlkYXRlOiB7XG4gICAgICAgICAgICAgICAgcXVlcnk6IHtcbiAgICAgICAgICAgICAgICAgICAgdXNlcklkOiBKb2kuc3RyaW5nKCksXG4gICAgICAgICAgICAgICAgICAgIHR5cGU6IEpvaS5zdHJpbmcoKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJSZXRyaWV2ZSBVc2VyJ3MgQXZhdGFyXCIsXG4gICAgICAgICAgICBub3RlczogW1xuICAgICAgICAgICAgICAgIFwiVHlwZSB2YWx1ZXM6ICdmdWxsJy8ndGh1bWInXCJcbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgICB0YWdzOiBbJ2F1dGgnXVxuICAgICAgICB9XG4gICAgfSwgLFxuICAgIHtcbiAgICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICAgIHBhdGg6IF9wcmVmaXggKyAnL3Jlc2V0X3Bhc3N3b3JkJyxcbiAgICAgICAgaGFuZGxlcjogZnVuY3Rpb24ocmVxdWVzdCwgcmVwbHkpIHtcbiAgICAgICAgICAgIEF1dGhTZXJ2aWNlLnJlc2V0UGFzc3dvcmQoXG4gICAgICAgICAgICAgICAgcmVxdWVzdC5wYXJhbXMudXNlcm5hbWUpXG4gICAgICAgICAgICAudGhlbigoZGF0YSkgPT4ge1xuICAgICAgICAgICAgICAgIHJlcGx5KGRhdGEpO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgfSxcbiAgICAgICAgY29uZmlnOiB7XG4gICAgICAgICAgICB2YWxpZGF0ZToge1xuICAgICAgICAgICAgICAgIHF1ZXJ5OiB7XG4gICAgICAgICAgICAgICAgICAgIHVzZXJuYW1lOiBKb2kuc3RyaW5nKClcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZGVzY3JpcHRpb246IFwiUmVzZXQgVXNlcidzIFBhc3N3b3JkIGFuZCBzZW5kIGFuIGVtYWlsIHdpdGggaW5zdHJ1Y3Rpb25zXCIsXG4gICAgICAgICAgICB0YWdzOiBbJ2F1dGgnXVxuICAgICAgICB9XG4gICAgfSxcbl1cblxuXG5tb2R1bGUuZXhwb3J0cyA9IGF1dGg7XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=