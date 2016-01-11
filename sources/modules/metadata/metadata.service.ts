/// <reference path="../../../typings/tsd.d.ts" />
/// <reference path="../connection/connection.service.ts" />

import Q = require("q");
import connection = require('../connection/connection.service')

export interface IMetadataService {
    // GET
    getSubcategories0List(): Q.IPromise<{}>;
    getSubcategories1List(): Q.IPromise<{}>;
    getSchoolsList(): Q.IPromise<{}>;
    getStylesList(): Q.IPromise<{}>;
    getSchoolByMemberId(memberId): Q.IPromise<{}>;
    getProductLikes(productId): Q.IPromise<{}>;
    getProductUniqueVisits(productId): Q.IPromise<{}>;
    getProductTotalVisits(productId): Q.IPromise<{}>;
    getBanners(): Q.IPromise<{}>;

    // POST
    createProductLike(productId): Q.IPromise<{}>;
    createBanner(message): Q.IPromise<{}>;
}


export class MetadataService implements IMetadataService {
    private db = connection.service;

    getSubcategories0List(): Q.IPromise<{}> {
        var _listPromise = Q.defer();
        this.db.query_db("SELECT DISTINCT meta_value AS value FROM wp2_postmeta WHERE meta_key = 'sofbackend__sof_work_meta__category_0'")
            .then((data) => {
                _listPromise.resolve(data);
            })
        return _listPromise.promise;
    }

    getSubcategories1List(): Q.IPromise<{}> {
        var _listPromise = Q.defer();
        this.db.query_db("SELECT DISTINCT meta_value AS value FROM wp2_postmeta WHERE meta_key = 'sofbackend__sof_work_meta__category_1'")
            .then((data) => {
                _listPromise.resolve(data);
            })
        return _listPromise.promise;
    }

    getSchoolsList(): Q.IPromise<{}> {
        var _listPromise = Q.defer();
        this.db.query_db("SELECT DISTINCT value FROM wp2_bp_xprofile_data WHERE field_id=4")
            .then((data) => {
                _listPromise.resolve(data);
            })
        return _listPromise.promise;
    }

    getStylesList(): Q.IPromise<{}> {
        var _listPromise = Q.defer();
        this.db.query_db("SELECT DISTINCT meta_value AS value FROM wp2_postmeta WHERE meta_key = 'sofbackend__sof_work_meta__style'")
            .then((data) => {
                _listPromise.resolve(data);
            })
        return _listPromise.promise;
    }

    getSchoolByMemberId(memberId): Q.IPromise<{}> {
        var _promise = Q.defer();
        this.db.query_db("SELECT value FROM wp2_bp_xprofile_data WHERE field_id=4 AND user_id=" + memberId)
            .then((data) => {
                _promise.resolve(data);
            })
        return _promise.promise;
    }

    getProductLikes(productId): Q.IPromise<{}> {
        var _promise = Q.defer();
        this.db.query_db("SELECT meta_value AS value FROM wp2_postmeta WHERE meta_key='_item_likes' AND post_id=" + productId)
            .then((data) => {
                _promise.resolve(data);
            })
        return _promise.promise;
    }

    createProductLike(productId): Q.IPromise<{}> {
        var _promise = Q.defer();
        this.db.query_db("UPDATE wp2_postmeta SET meta_value = meta_value + 1 WHERE meta_key='_item_likes' AND post_id=" + productId)
            .then((data) => {
                _promise.resolve(data);
            })
        return _promise.promise;
    }

    getProductUniqueVisits(productId): Q.IPromise<{}> {
        var _promise = Q.defer();
        this.db.query_db("SELECT COUNT(DISTINCT meta_value) AS value FROM wp2_postmeta WHERE meta_key = 'visit' AND post_id=" + productId)
            .then((data) => {
                _promise.resolve(data);
            })
        return _promise.promise;
    }

    getProductTotalVisits(productId): Q.IPromise<{}> {
        var _promise = Q.defer();
        this.db.query_db("SELECT COUNT(meta_value) AS value FROM wp2_postmeta WHERE meta_key = 'visit' AND post_id=" + productId)
            .then((data) => {
                _promise.resolve(data);
            })
        return _promise.promise;
    }

    getBanners(): Q.IPromise<{}> {
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
