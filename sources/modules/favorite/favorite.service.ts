/// <reference path="../../../typings/tsd.d.ts" />
/// <reference path="../connection/connection.service.ts" />

import Q = require("q");
import connection = require('../connection/connection.service')

export interface IFavoriteService {
    // GET
    showFavorite(userId): Q.IPromise<{}>;
    // POST
    createFavorite(userId, productId): Q.IPromise<{}>;
    removeFavorite(userId, productId): Q.IPromise<{}>;
}

export class FavoriteService implements IFavoriteService {
    private db = connection.service;

    showFavorite(userId): Q.IPromise<{}> {
        var _promise = Q.defer();
        var query = "SELECT * FROM " +
                        "( " +
                        "SELECT post_id " +
                        "FROM wp2_user_favorite " +
                        "WHERE user_id=" + userId +
                        ") list " +
                    "JOIN " +
                        "( " +
                        "SELECT * FROM " +
                            "( " +
                            "SELECT ID as post_id, post_author, post_title " +
                            "FROM wp2_posts " +
                            ") posts " +
                        "JOIN " +
                            "( " +
                            "SELECT ID as user_id, display_name " +
                            "FROM wp2_users " +
                            ") users " +
                            "ON posts.post_author = users.user_id " +
                        ") data " +
                    "ON list.post_id = data.post_id";
        this.db.query_db(query)
            .then((data) => {
                _promise.resolve(data);
            });

        return _promise.promise;
    }

    createFavorite(userId, productId): Q.IPromise<{}> {
        var _promise = Q.defer();
        var query = "INSERT INTO wp2_user_favorite (post_id, user_id) " +
                    "VALUES (" + productId + "," + userId + ") " +
                    "ON DUPLICATE KEY UPDATE user_id=user_id";
        this.db.query_db(query)
            .then((data) => {
                _promise.resolve(data);
            });

        return _promise.promise;
    }

    removeFavorite(userId, productId): Q.IPromise<{}> {
        var _promise = Q.defer();
        var query = "DELETE FROM wp2_user_favorite " +
                    "WHERE post_id=" + productId + " AND user_id=" + userId + " " +
                    "LIMIT 1";
        this.db.query_db(query)
            .then((data) => {
                _promise.resolve(data);
            });

        return _promise.promise;
    }

};
