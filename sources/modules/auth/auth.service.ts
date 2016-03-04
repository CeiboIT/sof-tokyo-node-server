/// <reference path="../../../typings/tsd.d.ts" />
/// <reference path="../connection/connection.service.ts" />

import Q = require("q");
import connection = require('../connection/connection.service');

export class UserAvatar {
    private _avatar: string;
    
    constructor (avatarUrl: string) {
        this._avatar = avatarUrl;
    }

    get avatar(): string {
        return this._avatar;
    }
}

export interface IAuthService {
    // GET
    getNonce(controller, method): Q.IPromise<{}>;
    getUserInfo(userId): Q.IPromise<{}>;
    getUserAvatar(userId, type): Q.IPromise<{}>;
    getUserAvatarUrl(userId): Q.IPromise<UserAvatar>;
    
    // POST
    register(username, email, password, display_name, years, country, school, ob): Q.IPromise<{}>;
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

    register(username, email, password, display_name, years, country, school, ob): Q.IPromise<{}> {
        var _promisesList = [];
        var registerPromise = Q.defer();
        this.getNonce('user', 'register')
            .then((nonce) => {
                this.db.query('user/register/?username=' + username +
                                     '&email=' + email +
                                     '&password=' + password +
                                     '&nonce=' + nonce['nonce'] +
                                     '&notify=yes' +
                                     '&user_registered=yes' +
                                     '&display_name=' + display_name)
                    .then((results) => {
                        var i = [0, 1, 2, 3, 4];
                        var fieldIds = [1, 645, 2, 4, 646];
                        var fieldValues = [display_name, years, country, school, ob];

                        if (results['status'] == 'error') {
                            if(results['error'] == "E-mail address is already in use.") {
                                results['code'] = '000';
                            };
                            if(results['error'] == "Username already exists.") {
                                results['code'] = '001';
                            };
                            registerPromise.resolve(results);
                            return registerPromise.promise;
                        } else {
                            var userId = results['user_id'];

                            i.forEach((id) => {
                                var xProfilePromise = Q.defer()
                                _promisesList.push(xProfilePromise.promise);

                                // if years value
                                if (fieldIds[id] == 645) {
                                    // number value
                                    var xProfileQuery = "INSERT INTO wp2_bp_xprofile_data (id, field_id, user_id, value, last_updated) " +
                                                                "VALUES (null," + fieldIds[id] + "," + userId + "," + fieldValues[id] + ",'" + new Date().toISOString() + "')";
                                } else {
                                    // string value
                                    var xProfileQuery = "INSERT INTO wp2_bp_xprofile_data (id, field_id, user_id, value, last_updated) " +
                                                                "VALUES (null," + fieldIds[id] + "," + userId + ",'" + fieldValues[id] + "','" + new Date().toISOString() + "')";
                                };

                                this.db.query_db(xProfileQuery)
                                    .then((data) => {
                                        xProfilePromise.resolve(data);
                                    })
                            });

                            Q.all(_promisesList)
                                .then((values) => {
                                    results['username'] = username;
                                    results['email'] = email;
                                    results['display_name'] = display_name;
                                    results['years'] = years;
                                    results['country'] = country;
                                    results['school'] = school;
                                    results['ob'] = ob;
                                    registerPromise.resolve(results);
                                });
                        };
                    });
            });

        return registerPromise.promise;
    }

    login(username, password): Q.IPromise<{}> {
        var loginPromise = Q.defer();
        this.db.query('user/generate_auth_cookie/?username=' + username +
                             '&password=' + password)
        .then((results) => {
            if (results['status'] == 'error') {
                if(results['error'] == "Invalid username and/or password.") {
                    results['code'] = '100';
                };
            };
            loginPromise.resolve(results);
        });

        return loginPromise.promise;
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

    getUserAvatarUrl(userId): Q.IPromise<UserAvatar> {
        var deferred = Q.defer();
        var query = "SELECT meta_value FROM wp2_usermeta WHERE user_id=" + userId + " AND meta_key='kleo_fb_picture' ";
        try {
            this.db.query_db(query)
                .then((response: any[]) => {
                    if (response.length > 0) {
                        deferred.resolve(new UserAvatar(response[0].meta_value));
                    } else {
                        deferred.resolve(new UserAvatar(''));
                    }
                });
        } catch (error) {
            console.error('getUserAvatarUrl error ', error);
        }
        return deferred.promise;
    }

    getUserAvatar(userId, type): Q.IPromise<UserAvatar> {
        return this.db.query('user/get_avatar/?user_id=' + userId +
                             '&type=' + type);
    }

    resetPassword(username): Q.IPromise<{}> {
        return this.db.query('user/retrieve_password/?user_login=' + username)
    }
};
