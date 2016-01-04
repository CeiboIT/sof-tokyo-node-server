/// <reference path="../../../typings/tsd.d.ts" />
/// <reference path="../connection/connection.service.ts" />

import Q = require("q");
import connection = require('../connection/connection.service')

export interface ICategoriesService {
    getCategoriesList(): Q.IPromise<{}>
    getCategoryById(categoryId): Q.IPromise<{}>
}


export class CategoriesService implements ICategoriesService {
    private db = connection.service;

    // TODO Necesitamos implementar paginacion Urgente!!!!


    getCategoriesList(): Q.IPromise<{}> {
        var _listPromise = Q.defer();

        this.db.query('?json=get_recent_posts')
            .then((results) => {
                _listPromise.resolve(results['posts']);
            })

        return _listPromise.promise;
    }

    getCategoryById(categoryId): Q.IPromise<{}> {
        return this.db.query('?json=1&p=' + categoryId)
    }
};
