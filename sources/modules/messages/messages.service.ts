/// <reference path="../../../typings/tsd.d.ts" />
/// <reference path="../connection/connection.service.ts" />

import Q = require("q");
import connection = require('../connection/connection.service')

export interface IMessagesService {
    // GET
    showMessages(userId): Q.IPromise<{}>;
//    readMessages(userId, threadId): Q.IPromise<{}>;
    // POST
    createMessage(sender_id, receiver_id, subject, message): Q.IPromise<{}>;
    responseMessage(thread_id, sender_id, receiver_id, subject, message): Q.IPromise<{}>;
}

export class MessagesService implements IMessagesService {
    private db = connection.service;

    createMessage(sender_id, receiver_id, subject, message): Q.IPromise<{}> {
        var _promise = Q.defer();
        var thread_id = Math.floor((Math.random() * 100000) + 1);
        var now = new Date();
        // insert record sender
        this.db.query_db("INSERT INTO wp2_bp_messages_recipients (id, user_id, thread_id, unread_count, sender_only, is_deleted) " +
                            "VALUES (NULL," + sender_id + "," + thread_id + ",0,0,0)")
            .then(() => {

                // insert record receiver
                this.db.query_db("INSERT INTO wp2_bp_messages_recipients (id, user_id, thread_id, unread_count, sender_only, is_deleted) " +
                                    "VALUES (NULL," + receiver_id + "," + thread_id + ",1,0,0)")
                    .then(() => {

                        // insert message
                        this.db.query_db("INSERT INTO wp2_bp_messages_messages (id, thread_id, sender_id, subject, message, date_sent) " +
                                            "VALUES (NULL," + thread_id + "," + sender_id + ",'" + subject + "','" + message + "','" + now.toISOString() + "')")
                            .then(() => {
                                var response = {
                                    status: 'Message created OK',
                                    thread_id: thread_id,
                                    sender_id: sender_id,
                                    receiver_id: receiver_id,
                                    subject: subject,
                                    message: message,
                                    date_sent: now.toISOString()
                                };
                                _promise.resolve(response);
                            })

                    })

            })
        return _promise.promise;
    }

    responseMessage(thread_id, sender_id, receiver_id, subject, message): Q.IPromise<{}> {
        var _promise = Q.defer();
        var resSubject = 'Re: ' + subject;
        var now = new Date();
        // update record sender
        this.db.query_db("UPDATE wp2_bp_messages_recipients SET unread_count = 0 " +
                            "WHERE user_id = " + sender_id + " AND thread_id = " + thread_id)
            .then(() => {

                // update record receiver
                this.db.query_db("UPDATE wp2_bp_messages_recipients SET unread_count = unread_count+1 WHERE " +
                                " user_id = " + receiver_id + " AND thread_id = " + thread_id)
                    .then(() => {

                        // insert message
                        this.db.query_db("INSERT INTO wp2_bp_messages_messages (id, thread_id, sender_id, subject, message, date_sent) " +
                                            "VALUES (NULL," + thread_id + "," + sender_id + ",'" + resSubject + "','" + message + "','" + now.toISOString() + "')")
                            .then(() => {
                                var response = {
                                    status: 'Message response OK',
                                    thread_id: thread_id,
                                    sender_id: sender_id,
                                    receiver_id: receiver_id,
                                    subject: subject,
                                    message: message,
                                    date_sent: now.toISOString()
                                };
                                _promise.resolve(response);
                            })

                    })

            })
        return _promise.promise;
    }

    showMessages(userId): Q.IPromise<{}> {
        var _promise = Q.defer();

        this.db.query_db("SELECT thread_id FROM wp2_bp_messages_recipients WHERE user_id = " + userId)
            .then((response) => {
                var _threadsPopulate = [];
                var threads = JSON.parse(JSON.stringify(response));

                threads.forEach((thread) => {
                    var threadPromise = Q.defer();
                    _threadsPopulate.push(threadPromise.promise);

                    var query = "SELECT display_name, sender_id, subject, message FROM wp2_bp_messages_messages " +
                                "INNER JOIN wp2_users " +
                                "ON wp2_bp_messages_messages.sender_id = wp2_users.ID " +
                                "WHERE thread_id = " + thread.thread_id;
                    this.db.query_db(query)
                        .then((response2) => {
                            thread.messages = response2;
                            threadPromise.resolve(response2);
                        })
                });

                Q.all(_threadsPopulate)
                    .then((values) => {
                        _promise.resolve(threads);
                    });

            })
        return _promise.promise;
    }

/*
    readMessages(userId, threadId): Q.IPromise<{}> {
        var _promise = Q.defer();

        // unread = 0;
    }
*/

};
