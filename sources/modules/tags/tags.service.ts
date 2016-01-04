/// <reference path="../../../typings/tsd.d.ts" />
/// <reference path="../connection/connection.service.ts" />

import Q = require("q");
import connection = require('../connection/connection.service')

export interface ITagsService {
    getTagsList(): Q.IPromise<{}>
    getTagById(tagId): Q.IPromise<{}>
}


export class TagsService implements ITagsService {
    private db = connection.service;

    getTagsList(): Q.IPromise<{}> {
        var _listPromise = Q.defer();

        this.db.query('?json=get_tag_index')
            .then((results) => {
                _listPromise.resolve(results['tags']);
            })

        return _listPromise.promise;
    }

    getTagById(tagId): Q.IPromise<{}> {
        return this.db.query('?json=1&p=' + tagId)
    }
};
