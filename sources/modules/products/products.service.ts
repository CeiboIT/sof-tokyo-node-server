/// <reference path="../../../typings/tsd.d.ts" />
/// <reference path="../connection/connection.service.ts" />

import Q = require("q");
import connection = require('../connection/connection.service')

export interface IProductsService {
    getProductsList(): Q.IPromise<{}>;
    getProductById(productId): Q.IPromise<{}>;
    getProductsByAuthor(authorId) : Q.IPromise<{}>;
}


export class ProductsService implements IProductsService {
    private db = connection.service;

    // TODO Necesitamos implementar paginacion Urgente!!!! 

    getProductsList(): Q.IPromise<{}> {
        var _listPromise = Q.defer();
        this.db.query('?json=get_recent_posts&count=4')
            .then((results) => {
                _listPromise.resolve({data: results});
            })

        return _listPromise.promise;
    }

    getProductById(productId): Q.IPromise<{}> {
        return this.db.query('?json=1&p=' + productId)
    }
    
    getProductsByAuthor(authorId) : Q.IPromise<{}>{
        return this.db.query('?get_author_posts=' + authorId)
    }
};