/// <reference path="../../../typings/tsd.d.ts" />
/// <reference path="../connection/connection.service.ts" />

import Q = require("q");
import connection = require('../connection/connection.service')

export interface IMetadataService {
    // GET
    getSubcategoriesList(): Q.IPromise<{}>;
    getSubcategoriesByProductId(productId): Q.IPromise<{}>;
    getSchoolsList(): Q.IPromise<{}>;
    getSchoolsByProductId(productId): Q.IPromise<{}>;
    getStylesList(): Q.IPromise<{}>;
    getStylesByProductId(productId): Q.IPromise<{}>;
    getLikesByProductId(productId): Q.IPromise<{}>;
}


export class MetadataService implements IMetadataService {
    private db = connection.service;

    getSubcategoriesList(): Q.IPromise<{}> {
        var _listPromise = Q.defer();
        this.db.query_db("SELECT DISTINCT meta_key, meta_value FROM wp2_postmeta WHERE meta_key LIKE 'sofbackend__sof_work_meta__category_1'")
            .then((data) => {
                _listPromise.resolve(data);
            })
        return _listPromise.promise;
    }

    getSubcategoriesByProductId(productId): Q.IPromise<{}> {
        var _promise = Q.defer();
        this.db.query_db("SELECT meta_key, meta_value FROM wp2_postmeta WHERE post_id=" + productId +
            " AND meta_key LIKE 'sofbackend__sof_work_meta__category_1'")
            .then((data) => {
                _promise.resolve(data);
            })
        return _promise.promise;
    }

    getSchoolsList(): Q.IPromise<{}> {
        var _listPromise = Q.defer();
        this.db.query_db("SELECT DISTINCT meta_key, meta_value FROM wp2_postmeta WHERE meta_key LIKE 'sofbackend__sof_work_meta__category_1'")
            .then((data) => {
                _listPromise.resolve(data);
            })
        return _listPromise.promise;
    }

    getSchoolsByProductId(productId): Q.IPromise<{}> {
        var _promise = Q.defer();
        this.db.query_db("SELECT meta_key, meta_value FROM wp2_postmeta WHERE post_id=" + productId +
            " AND meta_key LIKE 'sofbackend__sof_work_meta__category_1'")
            .then((data) => {
                _promise.resolve(data);
            })
        return _promise.promise;
    }

    getStylesList(): Q.IPromise<{}> {
        var _listPromise = Q.defer();
        this.db.query_db("SELECT DISTINCT meta_key, meta_value FROM wp2_postmeta WHERE meta_key LIKE 'sofbackend__sof_work_meta__style'")
            .then((data) => {
                _listPromise.resolve(data);
            })
        return _listPromise.promise;
    }

    getStylesByProductId(productId): Q.IPromise<{}> {
        var _promise = Q.defer();
        this.db.query_db("SELECT meta_key, meta_value FROM wp2_postmeta WHERE post_id=" + productId +
            " AND meta_key LIKE 'sofbackend__sof_work_meta__style'")
            .then((data) => {
                _promise.resolve(data);
            })
        return _promise.promise;
    }

    getLikesByProductId(productId): Q.IPromise<{}> {
        var _promise = Q.defer();
        this.db.query_db("SELECT meta_key, meta_value FROM wp2_postmeta WHERE post_id=" + productId +
            " AND meta_key LIKE '_item_likes'")
            .then((data) => {
                _promise.resolve(data);
            })
        return _promise.promise;
    }
};
