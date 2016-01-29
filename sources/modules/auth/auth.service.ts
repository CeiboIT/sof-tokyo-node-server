/// <reference path="../../../typings/tsd.d.ts" />
/// <reference path="../connection/connection.service.ts" />

import Q = require("q");
import connection = require('../connection/connection.service');

export interface IAuthService {
    // GET
    getNonce(controller, method): Q.IPromise<{}>;
    getUserInfo(userId): Q.IPromise<{}>;
    getUserAvatar(userId, type): Q.IPromise<{}>;
    // POST
    register(username, email, display_name, years, country, school, ob): Q.IPromise<{}>;
    login(username, password): Q.IPromise<{}>;
    fbLogin(token): Q.IPromise<{}>;
    isAuthorized(cookie): Q.IPromise<{}>;
    resetPassword(username): Q.IPromise<{}>;
}

export class AuthService implements IAuthService {
    private db = connection.service;

    getNonce(controller, method): Q.IPromise<{}> {
        return this.db.query('core/get_nonce/?controller=' + controller +
                             '&method=' + method)
    }

    register(username, email, display_name, years, country, school, ob): Q.IPromise<{}> {
        var _promisesList = [];
        var registerPromise = Q.defer();
        _promisesList.push(registerPromise.promise);
        this.getNonce('user', 'register')
            .then((nonce) => {
                console.log(nonce['nonce']);
                this.db.query('user/register/?username=' + username +
                                     '&email=' + email +
                                     '&nonce=' + nonce['nonce'] +
                                     '&display_name=' + display_name)
                    .then((results) => {

                        console.log("USERID:" results['user_id']);

                        var fieldIds = [1, 645, 2, 4, 646];
                        var fieldValues = [display_name, years, country, school, ob];
                        for (var i in fieldIds) {
                            var xProfilePromise = Q.defer()
                            _promisesList.push(xProfilePromise.promise);

                            var xProfileQuery = "INSERT INTO wp2_bp_xprofile_data (id, field_id, user_id, value, last_updated) " +
                                                "VALUES (null, " + fieldIds[i] + "," + results['user_id'] + "," + fieldValue[i] + "," + new Date().toISOString() + ")";

                            this.db.query_db(xProfileQuery)
                                .then(() {
                                    xProfilePromise.resolve(results);
                                })

                        }
                    });


                    Q.all(_promisesList)
                        .then((values) => {
                            registerPromise.resolve(results);
                        });
            });

        return _registerPromise.promise;
    }

    login(username, password): Q.IPromise<{}> {
        return this.db.query('user/generate_auth_cookie/?username=' + username +
                             '&password=' + password)
    }

    fbLogin(token): Q.IPromise<{}> {
        return this.db.query('user/fb_connect/?access_token=' + token)
    }

    isAuthorized(cookie): Q.IPromise<{}> {
        return this.db.query('user/validate_auth_cookie/?cookie=' + cookie)
    }

    getUserInfo(userId): Q.IPromise<{}> {
        return this.db.query('user/get_userinfo/?user_id=' + userId)
    }

    getUserAvatar(userId, type): Q.IPromise<{}> {
        return this.db.query('user/get_avatar/?user_id=' + userId +
                             '&type=' + type)
    }

    resetPassword(username): Q.IPromise<{}> {
        return this.db.query('user/retrieve_password/?user_login=' + username)
    }
};
