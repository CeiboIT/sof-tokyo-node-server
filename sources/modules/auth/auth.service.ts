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
    register(username, email, nonce, display_name): Q.IPromise<{}>;
    login(username, password): Q.IPromise<{}>;
    fbLogin(token): Q.IPromise<{}>;
//    fbLogin(access_token): Q.IPromise<{}>;
    isAuthorized(cookie): Q.IPromise<{}>;
    resetPassword(username): Q.IPromise<{}>;
}

export class AuthService implements IAuthService {
    private db = connection.service;

    getNonce(controller, method): Q.IPromise<{}> {
        return this.db.query('core/get_nonce/?controller=' + controller +
                             '&method=' + method)
    }

    register(username, email, nonce, display_name): Q.IPromise<{}> {
        return this.db.query('user/register/?username=' + username +
                             '&email=' + email +
                             '&nonce=' + nonce +
                             '&display_name=' + display_name)
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
