/// <reference path="../../../typings/tsd.d.ts" />
/// <reference path="../connection/connection.service.ts" />

import Q = require("q");
import connection = require('../connection/connection.service')

export interface IMembersService {
    // GET
    getMembersList(): Q.IPromise<{}>;
    getMemberById(memberId): Q.IPromise<{}>;
}


export class MembersService implements IMembersService {
    private db = connection.service;

    getMembersList(): Q.IPromise<{}> {
        var _listPromise = Q.defer();
        this.db.query_db("SELECT id, display_name FROM wp2_users")
            .then((data) => {
                _listPromise.resolve(data);
            })
        return _listPromise.promise;
    }

    getMemberById(memberId): Q.IPromise<{}> {
        var _promise = Q.defer();
        this.db.query_db("SELECT id, user_login, user_nicename, user_email, user_url, user_registered, display_name FROM wp2_users WHERE id=" + memberId)
            .then((data) => {
                _promise.resolve(data[0]);
            })
        return _promise.promise;
    }


};
