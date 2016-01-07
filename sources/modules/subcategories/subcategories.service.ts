/// <reference path="../../../typings/tsd.d.ts" />
/// <reference path="../connection/connection.service.ts" />

import Q = require("q");
import connection = require('../connection/connection.service')

export interface ISubcategoriesService {
    // GET
    getSubcategoriesList(): Q.IPromise<{}>;
    getSubcategoryByProductId(productId): Q.IPromise<{}>;
}


export class SubcategoriesService implements ISubcategoriesService {
    private db = connection.service;

    getSubcategoriesList(): Q.IPromise<{}> {
        var _listPromise = Q.defer();
        this.db.query_db("SELECT DISTINCT meta_key, meta_value FROM wp2_postmeta WHERE meta_key LIKE 'sofbackend__sof_work_meta__category_%'")
            .then((data) => {
                _listPromise.resolve(data);
            })
        return _listPromise.promise;
    }

    getSubcategoryByProductId(productId): Q.IPromise<{}> {
        var _promise = Q.defer();
        this.db.query_db("SELECT meta_key, meta_value FROM wp2_postmeta WHERE post_id=" + productId +
                         " AND meta_key LIKE 'sofbackend__sof_work_meta__category_%'")
            .then((data) => {
                _promise.resolve(data);
            })
        return _promise.promise;
    }
};
