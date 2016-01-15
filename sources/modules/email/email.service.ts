/// <reference path="../../../typings/tsd.d.ts" />
/// <reference path="../connection/connection.service.ts" />

import Q = require("q");
var conf = require('../../optin.conf');
var mandrill = require('mandrill-api/mandrill');

var emailClient = new mandrill.Mandrill(conf.mandrill.key);
if (emailClient.apikey) console.log('✓ Mandrill: running');

export interface IEmailService {
    // GET
    sendTestEmail(): void;
}


export class EmailService implements IEmailService {
    sendTestEmail(): void {

        var message = {
            "html": "<p>Testing sof-tokyo-node-server</p>",
            "text": "Sof-tokyo-node-server",
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
                return "Message sent";
            }
        });
    }
};
