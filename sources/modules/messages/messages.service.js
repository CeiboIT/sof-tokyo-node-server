"use strict";
var Q = require("q");
var connection = require('../connection/connection.service');
var MessagesService = (function () {
    function MessagesService() {
        this.db = connection.service;
    }
    MessagesService.prototype.showMessages = function (userId) {
        var _this = this;
        var _promise = Q.defer();
        this.db.query_db("SELECT thread_id, unread_count FROM wp2_bp_messages_recipients WHERE user_id = " + userId)
            .then(function (response) {
            var _threadsPopulate = [];
            var threads = JSON.parse(JSON.stringify(response));
            threads.forEach(function (thread) {
                var threadPromise = Q.defer();
                _threadsPopulate.push(threadPromise.promise);
                var query = "SELECT display_name, sender_id, subject, message FROM wp2_bp_messages_messages " +
                    "INNER JOIN wp2_users " +
                    "ON wp2_bp_messages_messages.sender_id = wp2_users.ID " +
                    "WHERE thread_id = " + thread.thread_id;
                _this.db.query_db(query)
                    .then(function (response2) {
                    thread.messages = response2;
                    threadPromise.resolve(response2);
                });
            });
            Q.all(_threadsPopulate)
                .then(function (values) {
                _promise.resolve(threads);
            });
        });
        return _promise.promise;
    };
    MessagesService.prototype.readMessages = function (userId, threadId) {
        var _promise = Q.defer();
        this.db.query_db("UPDATE wp2_bp_messages_recipients SET unread_count = 0 WHERE " +
            " user_id = " + userId + " AND thread_id = " + threadId)
            .then(function () {
            var response = {
                status: 'Read messages OK',
                userId: userId,
                threadId: threadId
            };
            _promise.resolve(response);
        });
        return _promise.promise;
    };
    MessagesService.prototype.createMessage = function (sender_id, receiver_id, subject, message) {
        var _this = this;
        var _promise = Q.defer();
        var thread_id = Math.floor((Math.random() * 100000) + 1);
        var now = new Date();
        this.db.query_db("INSERT INTO wp2_bp_messages_recipients (id, user_id, thread_id, unread_count, sender_only, is_deleted) " +
            "VALUES (NULL," + sender_id + "," + thread_id + ",0,0,0)")
            .then(function () {
            _this.db.query_db("INSERT INTO wp2_bp_messages_recipients (id, user_id, thread_id, unread_count, sender_only, is_deleted) " +
                "VALUES (NULL," + receiver_id + "," + thread_id + ",1,0,0)")
                .then(function () {
                _this.db.query_db("INSERT INTO wp2_bp_messages_messages (id, thread_id, sender_id, subject, message, date_sent) " +
                    "VALUES (NULL," + thread_id + "," + sender_id + ",'" + subject + "','" + message + "','" + now.toISOString() + "')")
                    .then(function () {
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
                });
            });
        });
        return _promise.promise;
    };
    MessagesService.prototype.responseMessage = function (thread_id, sender_id, receiver_id, subject, message) {
        var _this = this;
        var _promise = Q.defer();
        var resSubject = 'Re: ' + subject;
        var now = new Date();
        this.db.query_db("UPDATE wp2_bp_messages_recipients SET unread_count = 0 " +
            "WHERE user_id = " + sender_id + " AND thread_id = " + thread_id)
            .then(function () {
            _this.db.query_db("UPDATE wp2_bp_messages_recipients SET unread_count = unread_count+1 WHERE " +
                " user_id = " + receiver_id + " AND thread_id = " + thread_id)
                .then(function () {
                _this.db.query_db("INSERT INTO wp2_bp_messages_messages (id, thread_id, sender_id, subject, message, date_sent) " +
                    "VALUES (NULL," + thread_id + "," + sender_id + ",'" + resSubject + "','" + message + "','" + now.toISOString() + "')")
                    .then(function () {
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
                });
            });
        });
        return _promise.promise;
    };
    return MessagesService;
}());
exports.MessagesService = MessagesService;
;
