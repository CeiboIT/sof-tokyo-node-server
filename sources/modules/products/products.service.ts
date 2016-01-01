/// <reference path="../../../typings/tsd.d.ts" />
/// <reference path="../connection/connection.service.ts" />

import Q = require("q");
import connection = require('../connection/connection.service')

export interface IProductsService {
    getProductsList(): Q.IPromise<{}>
    getProductById(productId): Q.IPromise<{}>
}


export class ProductsService implements IProductsService {
    private db;

    // TODO Necesitamos implementar paginacion Urgente!!!! 
    private postCriterias = {
        order: { byDate: ' ORDER BY post_date DESC' },
        defaultSize: '5'
    }

    constructor() {
        this.db = connection.service;
    }

    getProductsList(): Q.IPromise<{}> {
        return this.db.query(
            'SELECT * from wp2_posts' + this.postCriterias.order.byDate + ' LIMIT ' + this.postCriterias.defaultSize
        )
    }

    getProductById(productId): Q.IPromise<{}> {
        return this.db.query('SELECT * from wp2_posts WHERE ID=' + productId)
    }
};