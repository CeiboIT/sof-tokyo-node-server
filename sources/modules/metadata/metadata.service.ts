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
}


export class MetadataService implements IMetadataService {
    private db = connection.service;

    getSubcategories0List(): Q.IPromise<{}> {
        var _listPromise = Q.defer();
        this.db.query_db("SELECT DISTINCT meta_key, meta_value FROM wp2_postmeta WHERE meta_key = 'sofbackend__sof_work_meta__category_0'")
            .then((data) => {
                _listPromise.resolve(data);
            })
        return _listPromise.promise;
    }

    getSubcategories1List(): Q.IPromise<{}> {
        var _listPromise = Q.defer();
        this.db.query_db("SELECT DISTINCT meta_key, meta_value FROM wp2_postmeta WHERE meta_key = 'sofbackend__sof_work_meta__category_1'")
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
        this.db.query_db("SELECT DISTINCT meta_key, meta_value FROM wp2_postmeta WHERE meta_key = 'sofbackend__sof_work_meta__style'")
            .then((data) => {
                _listPromise.resolve(data);
            })
        return _listPromise.promise;
    }

    getSchoolByMemberId(memberId): Q.IPromise<{}> {
        var _promise = Q.defer();
        this.db.query_db("SELECT value FROM wp2_bp_xprofile_data WHERE field_id=4 AND user_id=" + memberId)
            .then((data) => {
                _promise.resolve(data[0]);
            })
        return _promise.promise;
    }
};
