/// <reference path="../../../typings/tsd.d.ts" />
/// <reference path="../connection/connection.service.ts" />

import Q = require("q");
import connection = require('../connection/connection.service')

export interface IAuthService {
    getNonce(controller, method): Q.IPromise<{}>;
    register(username, email, nonce, display_name): Q.IPromise<{}>;
    login(username, password): Q.IPromise<{}>;
//    fbLogin(access_token): Q.IPromise<{}>;
    isAuthorized(cookie): Q.IPromise<{}>;
    getUserInfo(userId): Q.IPromise<{}>;
    getUserAvatar(userId, type): Q.IPromise<{}>;
    resetPassword(username): Q.IPromise<{}>;
}


export class AuthService implements IAuthService {
    private db = connection.service;

    getNonce(controller, method): Q.IPromise<{}> {
        return this.db.query('api/get_nonce/?controller=' + controller +
                             '&method=' + method)
    }

    register(username, email, nonce, display_name): Q.IPromise<{}> {
        return this.db.query('api/user/register/?username=' + username +
                             '&email=' + email +
                             '&nonce=' + nonce +
                             '&display_name=' + display_name)
    }

    login(username, password): Q.IPromise<{}> {
        return this.db.query('api/user/generate_auth_cookie/?username=' + username +
                             '&password=' + password)
    }

/*
    fbLogin(access_token): Q.IPromise<{}> {
        return this.db.query('api/user/fb_connect/?access_token=' + access_token)
    }
*/

    isAuthorized(cookie): Q.IPromise<{}> {
        return this.db.query('api/user/validate_auth_cookie/?cookie=' + cookie)
    }

    getUserInfo(userId): Q.IPromise<{}> {
        return this.db.query('api/user/get_userinfo/?user_id=' + userId)
    }

    getUserAvatar(userId, type): Q.IPromise<{}> {
        return this.db.query('api/user/get_avatar/?user_id=' + userId +
                             '&type=' + type)
    }

    resetPassword(username): Q.IPromise<{}> {
        return this.db.query('api/user/retrieve_password/?user_login=' + username)
    }
};
