/// <reference path="../../../typings/tsd.d.ts" />
/// <reference path="../connection/connection.service.ts" />

import Q = require("q");
import connection = require('../connection/connection.service')

export interface IFavoritesService {
    // GET
    showFavorites(userId): Q.IPromise<{}>;
    // POST
    createFavorite(productId, userId): Q.IPromise<{}>;
    removeFavorite(productId, userId): Q.IPromise<{}>;
}

export class FavoritesService implements IFavoritesService {
    private db = connection.service;

    showFavorites(userId): Q.IPromise<{}> {
        var _promise = Q.defer();
        var query = "SELECT * FROM " +
                        "( " +
                        "SELECT post_id " +
                        "FROM wp2_user_favorites " +
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
        var query = "INSERT INTO wp2_user_favorites (post_id, user_id) " +
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
        var query = "DELETE FROM wp2_user_favorites " +
                    "WHERE post_id=" + productId + " AND user_id=" + userId + " " +
                    "LIMIT 1";
        this.db.query_db(query)
            .then((data) => {
                _promise.resolve(data);
            });

        return _promise.promise;
    }

};
