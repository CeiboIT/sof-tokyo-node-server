'use strict';

///<reference path="../../../typings/tsd.d.ts" />
///<reference path="./email.service.ts" />


import service = require('./email.service');

var EmailService = new service.EmailService();
var _prefix = '/email';
var email = [
    {
        method: 'GET',
        path: _prefix + '/test',
        handler: function(request, reply) {
            EmailService.sendTestEmail()
                .then((data: Array<any>) => {
                    reply(data);
                })
        },
        config: {
            description: 'Send a test Email',
            tags: ['email']
        }
    }
]


module.exports = email;
