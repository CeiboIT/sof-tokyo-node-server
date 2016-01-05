/// <reference path="../../../typings/tsd.d.ts" />
/// <reference path="../connection/connection.service.ts" />

import Q = require("q");
import connection = require('../connection/connection.service')

export interface ICategoriesService {
    getCategoriesList(): Q.IPromise<{}>
}


export class CategoriesService implements ICategoriesService {
    private db = connection.service;

    getCategoriesList(): Q.IPromise<{}> {
        var _listPromise = Q.defer();

        this.db.query('?json=get_category_index')
            .then((results) => {
                _listPromise.resolve(results['categories']);
            })

        return _listPromise.promise;
    }
};
