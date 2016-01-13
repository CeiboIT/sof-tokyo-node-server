/// <reference path="../../../typings/tsd.d.ts" />
/// <reference path="../connection/connection.service.ts" />

import Q = require("q");
import connection = require('../connection/connection.service')

export interface IBlogService {
    // GET
    getBanners(): Q.IPromise<{}>;
    getBanner(bannerId): Q.IPromise<{}>;

    // POST
    createBanner(post_author, post_content, post_title, post_name): Q.IPromise<{}>;
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

    createBanner(post_author, post_content, post_title, post_name): Q.IPromise<{}> {
        var _promise = Q.defer();
        var query = "INSERT INTO wp2_posts (ID, post_author, post_content, post_title, post_status, comment_status, ping_status, post_name, post_type)" +
                    " VALUES (NULL, '" + post_author + "', '" + post_content + "', '" + post_title + "', 'publish', 'open', 'open', '" + post_name + "', 'info')";

        this.db.query_db(query)
            .then((data) => {
                _promise.resolve(data);
            })
        return _promise.promise;
    }

};
