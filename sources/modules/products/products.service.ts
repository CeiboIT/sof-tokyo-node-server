/// <reference path="../../../typings/tsd.d.ts" />
/// <reference path="../connection/connection.service.ts" />

import Q = require("q");
import connection = require('../connection/connection.service')

export interface IProductsService {
    getProductsList(page): Q.IPromise<{}>;
    getProductById(productId, page): Q.IPromise<{}>;
    getProductsByAuthor(authorId, page) : Q.IPromise<{}>;
}


export class ProductsService implements IProductsService {
    private db = connection.service;

    // TODO Necesitamos implementar paginacion Urgente!!!!

    getProductsList(page): Q.IPromise<{}> {
        var _listPromise = Q.defer();
        this.db.query('?json=get_recent_posts&count=4&page=' + page)
            .then((results) => {
                _listPromise.resolve(results);
            })

        return _listPromise.promise;
    }

    getProductById(productId): Q.IPromise<{}> {
        return this.db.query('?json=1&p=' + productId)
    }

    getProductsByAuthor(authorId, page): Q.IPromise<{}> {
        return this.db.query('?json=get_author_posts&count=4&id=' + authorId + '&page=' + page)
    }

    getProductsByCategory(categoryId, page): Q.IPromise<{}> {
        return this.db.query('?json=get_category_posts&count=4&id=' + categoryId + '&page=' + page)
    }
};
