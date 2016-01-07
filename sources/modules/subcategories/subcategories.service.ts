/// <reference path="../../../typings/tsd.d.ts" />
/// <reference path="../connection/connection.service.ts" />

import Q = require("q");
import connection = require('../connection/connection.service')

export interface ISubcategoriesService {
    // GET
    getSubcategoriesList(): Q.IPromise<{}>;
}


export class SubcategoriesService implements ISubcategoriesService {
    private db = connection.service;

    getSubcategoriesList(): Q.IPromise<{}> {
        var _listPromise = Q.defer();
        //this.db.query_db("SELECT meta_key, meta_value FROM wp2_postmeta WHERE meta_key LIKE 'sofbackend__sof_work_meta__category_%'")
        this.db.query_db("SELECT meta_key, meta_value FROM wp2_postmeta WHERE meta_key LIKE 'sofbackend__sof_work_meta'")
            .then((data) => {
                _listPromise.resolve(data);
            })
        return _listPromise.promise;
    }
};
