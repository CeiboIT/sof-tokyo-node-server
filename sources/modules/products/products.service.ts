/// <reference path="../../../typings/tsd.d.ts" />
/// <reference path="../connection/connection.service.ts" />

import Q = require("q");
import connection = require('../connection/connection.service')
import _ = require("lodash");
import http = require("http");

export interface IProductsService {
    getProductsList(): Q.IPromise<{}>
    getProductById(productId): Q.IPromise<{}>
}


export class ProductsService implements IProductsService {
    private db = connection.service;

    // TODO Necesitamos implementar paginacion Urgente!!!! 


    getProductsList(): Q.IPromise<{}> {
        var _listPromise = Q.defer();

        this.db.query('?json=get_recent_posts')
            .then((results) => {
                _listPromise.resolve(results['posts']);
            })

        return _listPromise.promise;
    }

    getProductById(productId): Q.IPromise<{}> {
        return this.db.query('?json=1&p=' + productId)
    }
};