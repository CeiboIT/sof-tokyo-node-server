"use strict";
var Q = require("q");
var connection = require('../connection/connection.service');
var auth = require("../auth/auth.service");
var metadata = require("../metadata/metadata.service");
var authServ = new auth.AuthService();
var metadataServ = new metadata.MetadataService();
var inArray = function (myArray, myValue) {
    var inArray = false;
    myArray.map(function (key) {
        if (key === myValue) {
            inArray = true;
        }
    });
    return inArray;
};
var ProductsService = (function () {
    function ProductsService() {
        this.db = connection.service;
    }
    ProductsService.prototype.getProductsNew = function (page) {
        var _listPromise = Q.defer();
        this.db.query('core/?json=get_recent_posts&count=4&page=' + page)
            .then(function (results) {
            _listPromise.resolve(results);
        });
        return _listPromise.promise;
    };
    ProductsService.prototype.getProductsList = function (page) {
        var _listPromise = Q.defer();
        var count = 15;
        this.db.query('core/?json=get_posts&count=' + count + '&page=' + page)
            .then(function (results) {
            function shuffle(o) {
                for (var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x)
                    ;
                return o;
            }
            var shuffled = shuffle(results['posts']);
            results['posts'] = shuffled;
            var _postAuthorPopulate = [];
            var _postMetadataPopulate = [];
            results['posts'].forEach(function (result) {
                var authorPromise = Q.defer();
                _postAuthorPopulate.push(authorPromise.promise);
                authServ.getUserAvatar(result.author.id, "thumb")
                    .then(function (data) {
                    result['author']['avatar'] = data['avatar'];
                    authorPromise.resolve(data);
                    console.log("res aut");
                    var metadataPromise = Q.defer();
                    _postMetadataPopulate.push(metadataPromise.promise);
                    metadataServ.getProductMetadata(result.id)
                        .then(function (data2) {
                        result['metadata'] = data2;
                        metadataPromise.resolve(data2);
                        console.log("res met");
                    });
                });
            });
            Q.all(_postAuthorPopulate.concat(_postMetadataPopulate))
                .then(function (values) {
                console.log("FINISH");
                _listPromise.resolve(results);
            });
        });
        return _listPromise.promise;
    };
    ProductsService.prototype.getProductById = function (productId, userId) {
        var _this = this;
        var _productPromise = Q.defer();
        this.db.query('core/get_post/?id=' + productId)
            .then(function (result) {
            var _promises = [];
            var authorPromise = Q.defer();
            var metadataPromise = Q.defer();
            var visitPromise = Q.defer();
            _promises.push(authorPromise.promise);
            _promises.push(metadataPromise.promise);
            _promises.push(visitPromise.promise);
            authServ.getUserAvatar(result['post']['author']['id'], "thumb")
                .then(function (data) {
                result['post']['author']['avatar'] = data['avatar'];
                console.log("resolve authP");
                authorPromise.resolve(data);
                metadataServ.getProductMetadata(result['post']['id'])
                    .then(function (data2) {
                    result['post']['metadata'] = data2;
                    console.log("resolve metaP");
                    metadataPromise.resolve(data2);
                    if (userId != 'null') {
                        _this.db.query_db("INSERT INTO wp2_postmeta (meta_id, post_id, meta_key, meta_value) VALUES (NULL," + productId + ",'visit','" + userId + "')")
                            .then(function () {
                            console.log("resolve visitP");
                            visitPromise.resolve(undefined);
                        });
                    }
                    else {
                        visitPromise.resolve(undefined);
                    }
                    ;
                });
            });
            Q.all(_promises)
                .then(function (values) {
                console.log("FINISH");
                _productPromise.resolve(result);
            });
        });
        return _productPromise.promise;
    };
    ProductsService.prototype.getProductsByAuthor = function (authorId) {
        var _promise = Q.defer();
        this.db.query('core/get_author_posts/?count=4&id=' + authorId)
            .then(function (results) {
            var _postAuthorPopulate = [];
            authServ.getUserAvatar(results['author']['id'], "thumb")
                .then(function (data) {
                results['author']['avatar'] = data['avatar'];
                var authorPromise = Q.defer();
                results['posts'].forEach(function (result) {
                    _postAuthorPopulate.push(authorPromise.promise);
                    result['author']['avatar'] = data['avatar'];
                    authorPromise.resolve(data);
                });
                Q.all(_postAuthorPopulate.concat(authorPromise))
                    .then(function (values) {
                    _promise.resolve(results);
                });
            });
        });
        return _promise.promise;
    };
    ProductsService.prototype.getProductsByCategory = function (categoryId, page) {
        var promise = Q.defer();
        this.db.query('core/get_category_posts/?count=4&id=' + categoryId +
            '&page=' + page)
            .then(function (result) {
            authServ.getUserAvatar(result['author']['id'], "thumb")
                .then(function (data) {
                result['author']['avatar'] = data['avatar'];
                promise.resolve(result);
            });
        });
        return promise.promise;
    };
    ProductsService.prototype.getProductsByTag = function (tagId, page) {
        var promise = Q.defer();
        this.db.query('core/get_tag_posts/?count=4&id=' + tagId +
            '&page=' + page)
            .then(function (result) {
            authServ.getUserAvatar(result['author']['id'], "thumb")
                .then(function (data) {
                result['author']['avatar'] = data['avatar'];
                promise.resolve(result);
            });
        });
        return promise.promise;
    };
    ProductsService.prototype.getProductsBySchool = function (schoolId, page) {
        var _this = this;
        var _listPromise = Q.defer();
        this.db.query('core/?json=get_posts&count=200')
            .then(function (results) {
            var posts = results['posts'];
            _this.db.query_db("SELECT user_id FROM wp2_bp_xprofile_data WHERE value='" + schoolId + "' AND field_id=4")
                .then(function (data) {
                var userIds = [];
                for (var i in data) {
                    userIds.push(data[i].user_id);
                }
                var schoolPosts = [];
                for (var j in posts) {
                    if (inArray(userIds, posts[j].author.id)) {
                        schoolPosts.push(posts[j]);
                    }
                    ;
                }
                ;
                results['posts'] = schoolPosts;
                results['school'] = schoolId;
                results['count'] = schoolPosts.length;
                results['count_total'] = schoolPosts.length;
                _listPromise.resolve(results);
            });
        });
        return _listPromise.promise;
    };
    ProductsService.prototype.getProductsBySubcategory0 = function (subcategory0Id, page) {
        var _listPromise = Q.defer();
        this.db.query('core/?json=get_posts&count=200')
            .then(function (results) {
            var posts = results['posts'];
            var subcategory0Posts = [];
            for (var i in posts) {
                if (posts[i]['custom_fields']['sofbackend__sof_work_meta__category_0'] == subcategory0Id) {
                    subcategory0Posts.push(posts[i]);
                }
                ;
            }
            ;
            results['posts'] = subcategory0Posts;
            results['subcategory0'] = subcategory0Id;
            results['count'] = subcategory0Posts.length;
            results['count_total'] = subcategory0Posts.length;
            _listPromise.resolve(results);
        });
        return _listPromise.promise;
    };
    ProductsService.prototype.getProductsBySubcategory1 = function (subcategory1Id, page) {
        var _listPromise = Q.defer();
        this.db.query('core/?json=get_posts&count=200')
            .then(function (results) {
            var posts = results['posts'];
            var subcategory1Posts = [];
            for (var i in posts) {
                if (posts[i]['custom_fields']['sofbackend__sof_work_meta__category_0'] == subcategory1Id) {
                    subcategory1Posts.push(posts[i]);
                }
                ;
            }
            ;
            results['posts'] = subcategory1Posts;
            results['subcategory0'] = subcategory1Id;
            results['count'] = subcategory1Posts.length;
            results['count_total'] = subcategory1Posts.length;
            _listPromise.resolve(results);
        });
        return _listPromise.promise;
    };
    ProductsService.prototype.getProductsByStyle = function (styleId, page) {
        var _listPromise = Q.defer();
        this.db.query('core/?json=get_posts&count=200')
            .then(function (results) {
            var posts = results['posts'];
            var stylePosts = [];
            for (var i in posts) {
                if (posts[i]['custom_fields']['sofbackend__sof_work_meta__category_0'] == styleId) {
                    stylePosts.push(posts[i]);
                }
                ;
            }
            ;
            results['posts'] = stylePosts;
            results['subcategory0'] = styleId;
            results['count'] = stylePosts.length;
            results['count_total'] = stylePosts.length;
            _listPromise.resolve(results);
        });
        return _listPromise.promise;
    };
    ProductsService.prototype.createProduct = function (nonce, author, title, content, status, school, subcategory0, subcategory1, styles) {
        return this.db.query('posts/create_post/?nonce=' + nonce +
            '&author=' + author +
            '&title=' + title +
            '&content=' + content +
            '&status=' + status)
            .then(function (post) {
            console.log(post);
            return post;
        });
    };
    ProductsService.prototype.updateProduct = function (nonce, productId, author, title, content, status, categories, tags) {
        return this.db.query('posts/update_post/?nonce=' + nonce +
            '&id=' + productId +
            '&author=' + author +
            '&title=' + title +
            '&content=' + content +
            '&status=' + status +
            '&categories=' + categories +
            '&tags=' + tags);
    };
    ProductsService.prototype.deleteProduct = function (nonce, productId) {
        return this.db.query('posts/delete_post/?nonce=' + nonce +
            '&id=' + productId);
    };
    ProductsService.prototype.createComment = function (productId, cookie, content) {
        return this.db.query('user/post_comment/?post_id=' + productId +
            '&cookie=' + cookie +
            '&comment_status=1' +
            '&content=' + content);
    };
    ProductsService.prototype.getProductsBySearch = function (search, page) {
        var _searchPromise = Q.defer();
        this.db.query('core/get_search_results/?count=4&search=' + search +
            '&page=' + page).then(function (results) {
            var _postAuthorPopulate = [];
            results['posts'].forEach(function (result) {
                var authorPromise = Q.defer();
                _postAuthorPopulate.push(authorPromise.promise);
                authServ.getUserAvatar(result.author.id, "thumb")
                    .then(function (data) {
                    result['author']['avatar'] = data['avatar'];
                    authorPromise.resolve(data);
                    metadataServ.getProductMetadata(result.id)
                        .then(function (data2) {
                        result['metadata'] = data2;
                    });
                });
            });
            Q.all(_postAuthorPopulate)
                .then(function () {
                _searchPromise.resolve(results);
            });
        });
        return _searchPromise.promise;
    };
    return ProductsService;
}());
exports.ProductsService = ProductsService;
;
