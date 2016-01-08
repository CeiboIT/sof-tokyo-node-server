/// <reference path="../../../typings/tsd.d.ts" />
/// <reference path="../connection/connection.service.ts" />

import Q = require("q");
import connection = require('../connection/connection.service')

export interface IProductsService {
    // GET
    getProductsNew(page): Q.IPromise<{}>;
    getProductsList(page): Q.IPromise<{}>;
    getProductById(productId): Q.IPromise<{}>;
    getProductsByAuthor(authorId, page): Q.IPromise<{}>;
    getProductsByCategory(categoryId, page): Q.IPromise<{}>;
    getProductsByTag(tagId, page): Q.IPromise<{}>;
    getProductsBySchool(schoolId, page): Q.IPromise<{}>;
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

    getProductsNew(page): Q.IPromise<{}> {
        var _listPromise = Q.defer();
        this.db.query('core/?json=get_recent_posts&count=4&page=' + page)
            .then((results) => {
                _listPromise.resolve(results);
            })

        return _listPromise.promise;
    }

    getProductsList(page): Q.IPromise<{}> {
        var _listPromise = Q.defer();
        this.db.query('core/?json=get_posts&count=4&page=' + page)
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

    getProductsBySchool(schoolId, page): Q.IPromise<{}> {
        var _listPromise = Q.defer();
        this.db.query('core/?json=get_posts&count=200')
            .then((results) => {
                var posts = results['posts'];

                this.db.query_db("SELECT user_id FROM wp2_bp_xprofile_data WHERE value='" + schoolId + "' AND field_id=4")
                    .then((data) => {
                        var userIds = []
                        for (var i in data) {
                            userIds.push(data[i].user_id);
                        }

                        function inArray(myArray, myValue) {
                            var inArray = false;
                            myArray.map(function(key) {
                                if (key === myValue) {
                                    inArray = true;
                                }
                            });
                            return inArray;
                        };

                        var schoolPosts = [];
                        for (var j in posts) {
                            //if (userIds.includes(posts[j].author.id)) {
                            if (inArray(userIds, posts[j].author.id)) {
                                schoolPosts.push(posts[j]);
                            };
                        };
                        results['posts'] = schoolPosts;
                        results['school'] = schoolId;
                        results['count'] = schoolPosts.length;
                        results['count_total'] = schoolPosts.length;

                        _listPromise.resolve(results);
                    })
            })

        return _listPromise.promise;
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
