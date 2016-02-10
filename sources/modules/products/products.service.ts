/// <reference path="../../../typings/tsd.d.ts" />
/// <reference path="../connection/connection.service.ts" />

import Q = require("q");
import connection = require('../connection/connection.service')
import auth = require("../auth/auth.service")
import metadata = require("../metadata/metadata.service");

var authServ = new auth.AuthService();
var metadataServ = new metadata.MetadataService();

export interface IProductsService {
    // GET
    getProductsNew(page): Q.IPromise<{}>;
    getProductsList(page): Q.IPromise<{}>;
    getProductById(productId): Q.IPromise<{}>;
    getProductsByAuthor(authorId, page): Q.IPromise<{}>;
    getProductsBySchool(schoolId, page): Q.IPromise<{}>;
    getProductsBySubcategory0(subcategory0Id, page): Q.IPromise<{}>;
    getProductsBySubcategory1(subcategory1Id, page): Q.IPromise<{}>;
    getProductsByStyle(styleId, page): Q.IPromise<{}>;
    getProductsBySex(sexId, page): Q.IPromise<{}>;
    getProductsBySearch(search, page): Q.IPromise<{}>;
    getProductsByOptionsSearch(search, subcategory0, subcategory1, style, sex, school): Q.IPromise<{}>;
    getProductsRankingByLikes(): Q.IPromise<{}>;
    getProductsRankingByVisits(): Q.IPromise<{}>;
    // POST
    createProduct(nonce, author, title, content, status, school, subcategory0, subcategory1, styles): Q.IPromise<{}>;
    createComment(productId, cookie, content): Q.IPromise<{}>;
    // PUT
    updateProduct(nonce, productId, author, title, content, status, categories, tags): Q.IPromise<{}>;
    // DELETE
    deleteProduct(nonce, productId): Q.IPromise<{}>;
}

var inArray = function(myArray, myValue) {
    var inArray = false;
    myArray.map(function(key) {
        if (key === myValue) {
            inArray = true;
        }
    });
    return inArray;
};

export class ProductsService implements IProductsService {
    private db = connection.service;

    getProductsNew(page): Q.IPromise<{}> {
        var _listPromise = Q.defer();
        this.db.query('core/?json=get_recent_posts&count=4&page=' + page)
            .then((results) => {
                var _postAuthorPopulate = [];
                var _postMetadataPopulate = [];

                results['posts'].forEach((result) => {
                    var authorPromise = Q.defer();
                    var metadataPromise = Q.defer();
                    _postAuthorPopulate.push(authorPromise.promise);
                    _postMetadataPopulate.push(metadataPromise.promise);

                    // populate author's avatar
                    authServ.getUserAvatar(result.author.id, "thumb")
                        .then((data) => {
                            result['author']['avatar'] = data['avatar'];
                            authorPromise.resolve(data);

                            // populate metadata
                            metadataServ.getProductMetadata(result.id)
                                .then((data2) => {
                                    result['metadata'] = data2;
                                    metadataPromise.resolve(data2);
                                })
                        })
                });

                Q.all(_postAuthorPopulate.concat(_postMetadataPopulate))
                    .then((values) => {
                        _listPromise.resolve(results);
                    });
            });

        return _listPromise.promise;
    }

    getProductsList(page): Q.IPromise<{}> {
        var _listPromise = Q.defer();
        var count = 6;
        this.db.query('core/?json=get_posts&count=' + count + '&page=' + page)
            .then((results) => {

                function shuffle(o) {
                    for (var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
                    return o;
                }
                var shuffled = shuffle(results['posts']);

                results['posts'] = shuffled;
                var _postAuthorPopulate = [];
                var _postMetadataPopulate = [];

                results['posts'].forEach((result) => {
                    var authorPromise = Q.defer();
                    var metadataPromise = Q.defer();
                    _postAuthorPopulate.push(authorPromise.promise);
                    _postMetadataPopulate.push(metadataPromise.promise);

                    // populate author's avatar
                    authServ.getUserAvatar(result.author.id, "thumb")
                        .then((data) => {
                            result['author']['avatar'] = data['avatar'];
                            authorPromise.resolve(data);

                            // populate metadatagi
                            metadataServ.getProductMetadata(result.id)
                                .then((data2) => {
                                    result['metadata'] = data2;
                                    metadataPromise.resolve(data2);
                                })
                        })
                });

                Q.all(_postAuthorPopulate.concat(_postMetadataPopulate))
                    .then((values) => {
                        _listPromise.resolve(results);
                    });
            });

        return _listPromise.promise;
    }

    getProductById(productId): Q.IPromise<{}> {
        var _productPromise = Q.defer();
        this.db.query('core/get_post/?id=' + productId)
            .then((result) => {
                var _promises = [];

                // save visit
                var saveVisitPromise = Q.defer();
                _promises.push(saveVisitPromise.promise);

                var visitQuery = "INSERT INTO wp2_post_views (id, type, period, count) " +
                                    "VALUES (" + productId + ",4,'total',1) " +
                                    "ON DUPLICATE KEY UPDATE count=count+1";
                this.db.query_db(visitQuery)
                    .then(() => {
                        saveVisitPromise.resolve(undefined);
                });

                // populate product visits
                var viewVisitsPromise = Q.defer();
                _promises.push(viewVisitsPromise.promise);

                var visitQuery = "SELECT count FROM wp2_post_views " +
                                    "WHERE id=" + productId + " AND type=4 AND period='total'";
                this.db.query_db(visitQuery)
                    .then((data) => {
                        result['post']['visits'] = data[0]['count'];
                        viewVisitsPromise.resolve(undefined);
                });

                // populate author's avatar
                authServ.getUserAvatar(result['post']['author']['id'], "thumb")
                    .then((data) => {
                        var authorPromise = Q.defer();
                        _promises.push(authorPromise.promise);
                        result['post']['author']['avatar'] = data['avatar'];
                        authorPromise.resolve(data);
                });

                if(result['post']['comments'] && result['post']['comments'].length) {
                    // for each comment
                    result['post']['comments'].forEach((comment) => {
                        var commentPromise = Q.defer();
                        _promises.push(commentPromise.promise);

                        // populate comments avatar
                        authServ.getUserAvatar(comment.author.id, "thumb")
                            .then((avatar) => {
                                comment['author']['avatar'] = avatar['avatar'];
                                commentPromise.resolve(avatar);
                            })
                    });
                }

                // populate metadata
                metadataServ.getProductMetadata(result['post']['id'])
                    .then((metadata) => {
                        var metadataPromise = Q.defer();
                        _promises.push(metadataPromise.promise);
                        result['post']['metadata'] = metadata;
                        metadataPromise.resolve(metadata);
                    })

                Q.all(_promises)
                    .then((values) => {
                        _productPromise.resolve(result);
                });
            });

        return _productPromise.promise;
    }

    getProductsByAuthor(authorId): Q.IPromise<{}> {
        var _promise = Q.defer();
        this.db.query('core/get_author_posts/?count=4&id=' + authorId)
            .then((results) => {
                var _postAuthorPopulate = [];
                var _postMetadataPopulate = [];
                var headerPromise = Q.defer();
                _postAuthorPopulate.push(headerPromise.promise);

                // populate header avatar
                authServ.getUserAvatar(results['author']['id'], "thumb")
                    .then((data) => {
                        results['author']['avatar'] = data['avatar'];
                        headerPromise.resolve(data);

                        results['posts'].forEach((result) => {
                            var authorPromise = Q.defer();
                            var metadataPromise = Q.defer();
                            _postAuthorPopulate.push(authorPromise.promise);
                            _postMetadataPopulate.push(metadataPromise.promise);

                            // populate author's avatar
                            result['author']['avatar'] = data['avatar'];
                            authorPromise.resolve(data);

                            // populate metadata
                            metadataServ.getProductMetadata(result.id)
                                .then((data2) => {
                                    result['metadata'] = data2;
                                    metadataPromise.resolve(data2);
                                })
                        })

                        Q.all(_postAuthorPopulate.concat(_postMetadataPopulate))
                            .then((values) => {
                                _promise.resolve(results);
                            });
                    });
            });
        return _promise.promise;
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

                        var schoolPosts = [];
                        for (var j in posts) {
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

    getProductsByOptionsSearch(search, subcategory0, subcategory1, style, sex): Q.IPromise<{}> {
        var _promise = Q.defer();
        if (search == 'null') search = '';
        if (subcategory0 == 'null') search = '';
        if (subcategory1 == 'null') search = '';
        if (style == 'null') search = '';
        if (sex == 'null') search = '';
        var query = "SELECT post_data.post_id, post_data.title, post_data.date, post_data.author, " +
                    "image.image, subcategory0.subcategory0, subcategory1.subcategory1, style.style, sex.sex " +
                    "FROM " +
                        "(SELECT wp2_posts.ID AS post_id, " +
                        "wp2_posts.post_title AS title, " +
                        "wp2_posts.post_date_gmt AS date, " +
                        "wp2_users.display_name AS author, " +
                        "wp2_users.ID AS author_id " +
                        "FROM `wp2_posts` " +
                        "JOIN wp2_users " +
                        "ON wp2_posts.post_author = wp2_users.ID " +
                        "WHERE wp2_posts.post_title LIKE '%" + search + "%' " +
                        ") post_data " +
                    "JOIN " +
                        "(SELECT wp2_postmeta.post_id, " +
                        "wp2_postmeta.meta_value AS image " +
                        "FROM wp2_postmeta " +
                        "WHERE wp2_postmeta.meta_key = 'sofbackend__sof_work_meta__postImage' " +
                        ") image " +
                    "ON post_data.post_id = image.post_id " +
                    "JOIN " +
                        "(SELECT wp2_postmeta.post_id, " +
                        "wp2_postmeta.meta_value AS subcategory0 " +
                        "FROM wp2_postmeta " +
                        "WHERE wp2_postmeta.meta_key = 'sofbackend__sof_work_meta__category_0' " +
                        "AND wp2_postmeta.meta_value LIKE '%" + subcategory0 + "%' " +
                        ") subcategory0 " +
                    "ON post_data.post_id = subcategory0.post_id " +
                    "JOIN " +
                        "(SELECT wp2_postmeta.post_id, " +
                        "wp2_postmeta.meta_value AS subcategory1 " +
                        "FROM wp2_postmeta " +
                        "WHERE wp2_postmeta.meta_key = 'sofbackend__sof_work_meta__category_1' " +
                        "AND wp2_postmeta.meta_value LIKE '%" + subcategory1 + "%' " +
                        ") subcategory1 " +
                    "ON post_data.post_id = subcategory1.post_id " +
                    "JOIN " +
                        "(SELECT wp2_postmeta.post_id, " +
                        "wp2_postmeta.meta_value AS style " +
                        "FROM wp2_postmeta " +
                        "WHERE wp2_postmeta.meta_key = 'sofbackend__sof_work_meta__style' " +
                        "AND wp2_postmeta.meta_value LIKE '%" + style + "%' " +
                        ") style " +
                    "ON post_data.post_id = style.post_id " +
                    "JOIN " +
                        "(SELECT wp2_postmeta.post_id, " +
                        "wp2_postmeta.meta_value AS sex " +
                        "FROM wp2_postmeta " +
                        "WHERE wp2_postmeta.meta_key = 'sofbackend__sof_work_meta__sex' " +
                        "AND wp2_postmeta.meta_value LIKE '%" + sex + "%' " +
                        ") sex " +
                    "ON post_data.post_id = sex.post_id " +
                    "ORDER BY post_id " +
                    "LIMIT 10";
        this.db.query_db(query)
        .then((data) => {
//            _promise.resolve(data);

            var dataJson = JSON.parse(JSON.stringify(data));

            var _postAuthorPopulate = [];
            var _postMetadataPopulate = [];

            dataJson.forEach((result) => {
                console.log(result);
                var authorPromise = Q.defer();
                var metadataPromise = Q.defer();
                _postAuthorPopulate.push(authorPromise.promise);
                _postMetadataPopulate.push(metadataPromise.promise);

                // populate author's avatar
                authServ.getUserAvatar(result['author_id'], "thumb")
                    .then((data) => {
                        result['author_avatar'] = data['avatar'];
                        authorPromise.resolve(data);

                        // populate metadata
                        metadataServ.getProductMetadata(result.post_id)
                            .then((data2) => {
                                result['metadata'] = data2;
                                metadataPromise.resolve(data2);
                            })
                    })
            });

            Q.all(_postAuthorPopulate.concat(_postMetadataPopulate))
                .then((values) => {
                    _promise.resolve(dataJson);
                });



        })
        return _promise.promise;
    }

    getProductsBySubcategory0(subcategory0Id, page): Q.IPromise<{}>  {
        var _listPromise = Q.defer();
        this.db.query('core/?json=get_posts&count=200')
            .then((results) => {
                var posts = results['posts'];

                var subcategory0Posts = [];
                for (var i in posts) {

                    if (posts[i]['custom_fields']['sofbackend__sof_work_meta__category_0'] == subcategory0Id) {
                        subcategory0Posts.push(posts[i]);
                    };
                };

                results['posts'] = subcategory0Posts;
                results['subcategory0'] = subcategory0Id;
                results['count'] = subcategory0Posts.length;
                results['count_total'] = subcategory0Posts.length;

                _listPromise.resolve(results);
            })
        return _listPromise.promise;
    }

    getProductsBySubcategory1(subcategory1Id, page): Q.IPromise<{}>  {
        var _listPromise = Q.defer();
        this.db.query('core/?json=get_posts&count=200')
            .then((results) => {
                var posts = results['posts'];

                var subcategory1Posts = [];
                for (var i in posts) {

                    if (posts[i]['custom_fields']['sofbackend__sof_work_meta__category_1'] == subcategory1Id) {
                        subcategory1Posts.push(posts[i]);
                    };
                };

                results['posts'] = subcategory1Posts;
                results['subcategory1'] = subcategory1Id;
                results['count'] = subcategory1Posts.length;
                results['count_total'] = subcategory1Posts.length;

                _listPromise.resolve(results);
            })
        return _listPromise.promise;
    }

    getProductsByStyle(styleId, page): Q.IPromise<{}>  {
        var _listPromise = Q.defer();
        this.db.query('core/?json=get_posts&count=200')
            .then((results) => {
                var posts = results['posts'];

                var stylePosts = [];
                for (var i in posts) {

                    if (posts[i]['custom_fields']['sofbackend__sof_work_meta__style'] == styleId) {
                        stylePosts.push(posts[i]);
                    };
                };

                results['posts'] = stylePosts;
                results['style'] = styleId;
                results['count'] = stylePosts.length;
                results['count_total'] = stylePosts.length;

                _listPromise.resolve(results);
            })
        return _listPromise.promise;
    }

    getProductsBySex(sexId, page): Q.IPromise<{}>  {
        var _listPromise = Q.defer();
        this.db.query('core/?json=get_posts&count=200')
            .then((results) => {
                var posts = results['posts'];

                var sexPosts = [];
                for (var i in posts) {

                    if (posts[i]['custom_fields']['sofbackend__sof_work_meta__sex'] == sexId) {
                        sexPosts.push(posts[i]);
                    };
                };

                results['posts'] = sexPosts;
                results['sex'] = sexId;
                results['count'] = sexPosts.length;
                results['count_total'] = sexPosts.length;

                _listPromise.resolve(results);
            })
        return _listPromise.promise;
    }

    createProduct(nonce, author, title, content, status, school, subcategory0, subcategory1, styles): Q.IPromise<{}> {
        return this.db.query('posts/create_post/?nonce=' + nonce +
                             '&author=' + author +
                             '&title=' + title +
                             '&content=' + content +
                             '&status=' + status)
            .then((post) => {
                console.log(post);

                // FALTA GUARDAR SCHOOL, SUBCATEGORY, STYLES

                return post;
            })
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

    getProductsBySearch(search, page): Q.IPromise<{}> {
        var _searchPromise = Q.defer();
        this.db.query('core/get_search_results/?count=4&search=' + search +
            '&page=' + page).then((results) => {
            var _postAuthorPopulate = [];

            results['posts'].forEach((result) => {
                var authorPromise = Q.defer();
                _postAuthorPopulate.push(authorPromise.promise);
                authServ.getUserAvatar(result.author.id, "thumb")
                    .then((data) => {
                        result['author']['avatar']= data['avatar'];
                        authorPromise.resolve(data);

                        metadataServ.getProductMetadata(result.id)
                            .then((data2) => {
                                result['metadata'] = data2;
                            })
                    })
            });

            Q.all(_postAuthorPopulate)
                .then(() => {
                    _searchPromise.resolve(results);
                });
        });

        return _searchPromise.promise;
    }

    getProductsRankingByLikes(): Q.IPromise<{}> {
        var _responsePromise = Q.defer();
        var _productsPromises = [];
        var _response = {
            posts : []
        };

        var query = "SELECT * FROM " +
                    "( " +
                    "SELECT wp2_posts.ID AS post_id, " +
                    "wp2_posts.post_title AS title, " +
                    "wp2_posts.post_date_gmt AS date, " +
                    "wp2_postmeta.meta_value AS likes, " +
                    "wp2_users.display_name AS author " +
                    "FROM `wp2_posts` " +
                    "JOIN wp2_users ON wp2_posts.post_author = wp2_users.ID " +
                    "JOIN wp2_postmeta ON wp2_posts.ID = wp2_postmeta.post_id " +
                    "WHERE wp2_postmeta.meta_key = '_item_likes' " +
                    ") table1 " +
                    "ORDER BY likes DESC " +
                    "LIMIT 5";
        this.db.query_db(query)
            .then((data : any[]) => {
                data.forEach((product) => {
                    var _promise = Q.defer();
                    _productsPromises.push(_promise.promise);
                    this.getProductById(product['post_id'])
                        .then((result) => {
                            _promise.resolve(result['post']);
                        })
                })

                Q.all(_productsPromises)
                    .then((results) => {
                        _responsePromise.resolve(results);
                    });
            });

        return _responsePromise.promise;
    }

    getProductsRankingByVisits(): Q.IPromise<{}> {
        var _promise = Q.defer();
        var query = "SELECT * FROM " +
                    "( " +
                    "SELECT wp2_posts.ID AS post_id, " +
                    "wp2_posts.post_title AS title, " +
                    "wp2_posts.post_date_gmt AS date, " +
                    "wp2_users.display_name AS author, " +
                    "wp2_post_views.count AS visits " +
                    "FROM `wp2_posts` " +
                    "JOIN wp2_users ON wp2_posts.post_author = wp2_users.ID " +
                    "JOIN wp2_post_views ON wp2_posts.ID = wp2_post_views.id " +
                    "WHERE wp2_post_views.period = 'total' " +
                    ") table1 " +
                    "JOIN " +
                    "( " +
                    "SELECT wp2_postmeta.post_id, " +
                    "wp2_postmeta.meta_value AS image " +
                    "FROM wp2_postmeta " +
                    "WHERE wp2_postmeta.meta_key = 'sofbackend__sof_work_meta__postImage' " +
                    ") table2 " +
                    "ON table1.post_id = table2.post_id " +
                    "ORDER BY visits DESC " +
                    "LIMIT 10";
        this.db.query_db(query)
            .then((data) => {
                _promise.resolve(data);
            });

        return _promise.promise;
    }

};
