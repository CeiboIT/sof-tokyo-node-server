/// <reference path="../../../typings/tsd.d.ts" />
/// <reference path="../connection/connection.service.ts" />

import Q = require("q");
import connection = require('../connection/connection.service')

export interface IMetadataService {
    // GET
    getSubcategoriesList(): Q.IPromise<{}>;
    getSchoolsList(): Q.IPromise<{}>;
    getStylesList(): Q.IPromise<{}>;

    getMetadataByProductId(productId): Q.IPromise<{}>;
}


export class MetadataService implements IMetadataService {
    private db = connection.service;

    getSubcategoriesList(): Q.IPromise<{}> {
        var _listPromise = Q.defer();
        this.db.query_db("SELECT DISTINCT meta_key, meta_value FROM wp2_postmeta WHERE meta_key = 'sofbackend__sof_work_meta__category_1'")
            .then((data) => {
                _listPromise.resolve(data);
            })
        return _listPromise.promise;
    }

    getSchoolsList(): Q.IPromise<{}> {
        var _listPromise = Q.defer();
        this.db.query_db("SELECT DISTINCT meta_key, meta_value FROM wp2_postmeta WHERE meta_key = 'sofbackend__sof_work_meta__category_1'")
            .then((data) => {
                _listPromise.resolve(data);
            })
        return _listPromise.promise;
    }

    getStylesList(): Q.IPromise<{}> {
        var _listPromise = Q.defer();
        this.db.query_db("SELECT DISTINCT meta_key, meta_value FROM wp2_postmeta WHERE meta_key = 'sofbackend__sof_work_meta__style'")
            .then((data) => {
                _listPromise.resolve(data);
            })
        return _listPromise.promise;
    }

    getMetadataByProductId(productId): Q.IPromise<{}> {
        var _promise = Q.defer();
        this.db.query_db("SELECT meta_key, meta_value FROM wp2_postmeta WHERE post_id=" + productId)
            .then((data) => {
                _promise.resolve(data);
            })
        return _promise.promise;
    }
};
