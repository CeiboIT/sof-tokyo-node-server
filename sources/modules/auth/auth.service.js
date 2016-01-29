"use strict";
var Q = require("q");
var connection = require('../connection/connection.service');
var AuthService = (function () {
    function AuthService() {
        this.db = connection.service;
    }
    AuthService.prototype.getNonce = function (controller, method) {
        return this.db.query('core/get_nonce/?controller=' + controller +
            '&method=' + method);
    };
    AuthService.prototype.register = function (username, email, display_name, years, country, school, ob) {
        var _this = this;
        var _promisesList = [];
        var registerPromise = Q.defer();
        _promisesList.push(registerPromise.promise);
        this.getNonce('user', 'register')
            .then(function (nonce) {
            _this.db.query('user/register/?username=' + username +
                '&email=' + email +
                '&nonce=' + nonce['nonce'] +
                '&display_name=' + display_name)
                .then(function (results) {
                var i = [0, 1, 2, 3, 4];
                var fieldIds = [1, 645, 2, 4, 646];
                var fieldValues = [display_name, years, country, school, ob];
                if (results['status'] == 'error') {
                    registerPromise.resolve(results);
                    return registerPromise.promise;
                }
                else {
                    var userId = results['user_id'];
                    i.forEach(function (id) {
                        var xProfilePromise = Q.defer();
                        _promisesList.push(xProfilePromise.promise);
                        console.log("enter", id);
                        if (fieldIds[id] == 645) {
                            var xProfileQuery = "INSERT INTO wp2_bp_xprofile_data (id, field_id, user_id, value, last_updated) " +
                                "VALUES (null," + fieldIds[id] + "," + userId + "," + fieldValues[id] + ",'" + new Date().toISOString() + "')";
                        }
                        else {
                            var xProfileQuery = "INSERT INTO wp2_bp_xprofile_data (id, field_id, user_id, value, last_updated) " +
                                "VALUES (null," + fieldIds[id] + "," + userId + ",'" + fieldValues[id] + "','" + new Date().toISOString() + "')";
                        }
                        ;
                        _this.db.query_db(xProfileQuery)
                            .then(function (data) {
                            xProfilePromise.resolve(data);
                        });
                    });
                }
                ;
                Q.all(_promisesList)
                    .then(function (values) {
                    console.log("final");
                    registerPromise.resolve(results);
                });
            });
        });
        return registerPromise.promise;
    };
    AuthService.prototype.login = function (username, password) {
        return this.db.query('user/generate_auth_cookie/?username=' + username +
            '&password=' + password);
    };
    AuthService.prototype.fbLogin = function (token) {
        return this.db.query('user/fb_connect/?access_token=' + token);
    };
    AuthService.prototype.isAuthorized = function (cookie) {
        return this.db.query('user/validate_auth_cookie/?cookie=' + cookie);
    };
    AuthService.prototype.getUserInfo = function (userId) {
        return this.db.query('user/get_userinfo/?user_id=' + userId);
    };
    AuthService.prototype.getUserAvatar = function (userId, type) {
        return this.db.query('user/get_avatar/?user_id=' + userId +
            '&type=' + type);
    };
    AuthService.prototype.resetPassword = function (username) {
        return this.db.query('user/retrieve_password/?user_login=' + username);
    };
    return AuthService;
}());
exports.AuthService = AuthService;
;
