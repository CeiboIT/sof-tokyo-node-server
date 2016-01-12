/// <reference path="../../../typings/tsd.d.ts" />
/// <reference path="../connection/connection.service.ts" />

import Q = require("q");
import connection = require('../connection/connection.service')

export interface IBlogService {
    // GET
    getBanners(): Q.IPromise<{}>;
    getBanner(bannerId): Q.IPromise<{}>;

    // POST
    createBanner(banner): Q.IPromise<{}>;
}


export class BlogService implements IBlogService {
    private db = connection.service;

    getBanners(): Q.IPromise<{}> {
        var _promise = Q.defer();
        this.db.query_db("SELECT meta_value AS value FROM wp2_postmeta WHERE meta_key = 'banner'")
            .then((data) => {
                _promise.resolve(data);
            })
        return _promise.promise;
    }

    getBanner(): Q.IPromise<{}> {
        var _promise = Q.defer();
        this.db.query_db("SELECT meta_value AS value FROM wp2_postmeta WHERE meta_key = 'banner'")
            .then((data) => {
                _promise.resolve(data);
            })
        return _promise.promise;
    }

    createBanner(banner): Q.IPromise<{}> {
        var _promise = Q.defer();
        this.db.query_db("INSERT INTO wp2_postmeta (meta_id, post_id, meta_key, meta_value) VALUES (NULL, 0, 'banner', '" + JSON.stringify(banner) + "')")
            .then((data) => {
                _promise.resolve(data);
            })
        return _promise.promise;
    }

};
