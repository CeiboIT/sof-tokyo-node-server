/// <reference path="../../../typings/tsd.d.ts" />
/// <reference path="../connection/connection.service.ts" />

import Q = require("q");
var conf = require('../../optin.conf');
var mandrill = require('mandrill-api/mandrill');

var emailClient = new mandrill.Mandrill(conf.mandrill.key);
if (emailClient.apikey) console.log('✓ Mandrill: running');

export interface IEmailService {
    // GET
    sendTestEmail(): Q.IPromise<{}>;
    sendNewEmail(fromEmail, fromName, to, subject, content): Q.IPromise<{}>;
}


export class EmailService implements IEmailService {
    sendTestEmail(): Q.IPromise<{}> {
        var _promise = Q.defer();

        var message = {
            "html": "<p>Testing sof-tokyo-node-server</p>",
            "subject": "test email",
            "from_email": conf.mandrill.adminEmail,
            "from_name": conf.mandrill.adminName,
            "to": [{
                "email": conf.mandrill.userEmail,
                "name": conf.mandrill.userName,
                "type": "to"
            }]
        };

        emailClient.messages.send({
            message: message,
            async: false
        }, function(result) {
            if (result[0].status === 'sent' || result[0].status === 'queued') {
                _promise.resolve('Message sent');
            }
        });

        return _promise.promise;
    }

    sendNewEmail(fromEmail, fromName, schools): Q.IPromise<{}> {
        var _promise = Q.defer();

        var message = {
            "subject": "User " + fromName + " requires a book",
            "from_email": "matias.caputti@gmail.com",
            "from_name": "Info sof-tokyo",
            "to": [{
                "email": "matias.caputti@gmail.com",
                //"email": "info@sof.tokyo",
                "type": "to"
            }],
            "merge": true,
            "merge_language": "handlebars",
            "global_merge_vars": [
                {
                    "name": "username",
                    "content": fromName
                },
                {
                    "name": "email",
                    "content": fromEmail
                },
                {
                    "name": "schools",
                    "content": schools
                }
            ]
        };

        emailClient.messages.sendTemplate({
            template_name: 'sofTokyoBooksSales',
            template_content: {},
            message: message,
            async: false
        }, function(result) {
            if (result[0].status === 'sent' || result[0].status === 'queued') {
                _promise.resolve({status: 'ok', message:'Message sent'});
            }
        }, function(error){
            _promise.resolve({status: 'error', message:error});
        });

        return _promise.promise;
    }
};
