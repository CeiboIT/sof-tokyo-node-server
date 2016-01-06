/// <reference path="../../../typings/tsd.d.ts" />
/// <reference path="../connection/connection.service.ts" />

import Q = require("q");
import connection = require('../connection/connection.service')

export interface IProductsService {
    // GET
    getProductsList(page): Q.IPromise<{}>;
    getProductById(productId, page): Q.IPromise<{}>;
    getProductsByAuthor(authorId, page): Q.IPromise<{}>;
    getProductsByCategory(categoryId, page): Q.IPromise<{}>;
    getProductsByTag(tagId, page): Q.IPromise<{}>;
    // POST
    createProduct(nonce, author, title, content, status, categories, tags): Q.IPromise<{}>;
    createComment(productId, cookie, content): Q.IPromise<{}>;
    // PUT
    updateProduct(nonce, productId, author, title, content, status, categories, tags): Q.IPromise<{}>;
    // DELETE
    deleteProduct(nonce, productId): Q.IPromise<{}>;
}


export class ProductsService implements IProductsService {
    private db = connection.service;

    getProductsList(page): Q.IPromise<{}> {
        var _listPromise = Q.defer();
        this.db.query('core/get_recent_posts&count=4&page=' + page)
            .then((results) => {
                _listPromise.resolve(results);
            })

        return _listPromise.promise;
    }

    getProductById(productId): Q.IPromise<{}> {
        return this.db.query('core/get_post/?id=' + productId)
    }

    getProductsByAuthor(authorId, page): Q.IPromise<{}> {
        return this.db.query('core/get_author_posts/?count=4&id=' + authorId +
                             '&page=' + page)
    }

    getProductsByCategory(categoryId, page): Q.IPromise<{}> {
        return this.db.query('core/get_category_posts/?count=4&id=' + categoryId +
                             '&page=' + page)
    }

    getProductsByTag(tagId, page): Q.IPromise<{}> {
        return this.db.query('core/get_tag_posts/?count=4&id=' + tagId +
                             '&page=' + page)
    }

    createProduct(nonce, author, title, content, status, categories, tags): Q.IPromise<{}> {
        return this.db.query('posts/create_post/?nonce=' + nonce +
                             '&author=' + author +
                             '&title=' + title +
                             '&content=' + content +
                             '&status=' + status +
                             '&categories=' + categories +
                             '&tags=' + tags)
    }

    updateProduct(nonce, productId, author, title, content, status, categories, tags): Q.IPromise<{}> {
        return this.db.query('posts/update_post/?nonce=' + nonce +
                             '&id=' + productId +
                             '&author=' + author +
                             '&title=' + title +
                             '&content=' + content +
                             '&status=' + status +
                             '&categories=' + categories +
                             '&tags=' + tags)
    }

    deleteProduct(nonce, productId): Q.IPromise<{}> {
        return this.db.query('posts/delete_post/?nonce=' + nonce +
                             '&id=' + productId)
    }

    createComment(productId, cookie, content): Q.IPromise<{}> {
        return this.db.query('user/post_comment/?post_id=' + productId +
                             '&cookie=' + cookie +
                             '&comment_status=1' +
                             '&content=' + content)
    }

};
