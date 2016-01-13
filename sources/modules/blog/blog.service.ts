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

        this.db.query_db("SELECT * FROM `wp2_posts` " +
                         "INNER JOIN `wp2_users` ON `wp2_posts`.`post_author` = `wp2_users`.`ID` " +
                         "WHERE `wp2_posts`.`post_type` = 'info' AND `wp2_posts`.`post_status` = 'publish'")
            .then((data) => {
                _promise.resolve(data);
            })
        return _promise.promise;
    }

    getBanner(bannerId): Q.IPromise<{}> {
        var _promise = Q.defer();
        this.db.query_db("SELECT * FROM `wp2_posts` " +
                         "INNER JOIN `wp2_users` ON `wp2_posts`.`post_author` = `wp2_users`.`ID` " +
                         "WHERE `wp2_posts`.`post_type` = 'info' AND `wp2_posts`.`post_status` = 'publish' AND `wp2_posts`.`ID`=" + bannerId)
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
