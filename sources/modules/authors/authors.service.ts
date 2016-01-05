/// <reference path="../../../typings/tsd.d.ts" />
/// <reference path="../connection/connection.service.ts" />

import Q = require("q");
import connection = require('../connection/connection.service')

export interface IAuthorsService {
    getAuthorsList(): Q.IPromise<{}>
}


export class AuthorsService implements IAuthorsService {
    private db = connection.service;

    getAuthorsList(): Q.IPromise<{}> {
        var _listPromise = Q.defer();

        this.db.query('?json=get_author_index')
            .then((results) => {
                _listPromise.resolve(results['authors']);
            })

        return _listPromise.promise;
    }
};
