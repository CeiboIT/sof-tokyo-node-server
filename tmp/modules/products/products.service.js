/// <reference path="../../../typings/tsd.d.ts" />
/// <reference path="../connection/connection.service.ts" />
var Q = require("q"),
    connection = require('../connection/connection.service'),
    auth = require("../auth/auth.service"),
    metadata = require("../metadata/metadata.service"),
    images = require("../images/images.service"),
    avatar = require('../auth/avatar.service'),
    authServ = new auth.AuthService(),
    metadataServ = new metadata.MetadataService(),
    imagesServ = new images.ImagesService(),
    inArray = function (myArray, myValue) {
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
        this.db.query('core/?json=get_recent_posts&count=10&page=' + page).then(function (results) {
            var _postAuthorPopulate = [];
            var _postMetadataPopulate = [];
            results['posts'].forEach(function (result) {
                var authorPromise = Q.defer();
                var metadataPromise = Q.defer();
                _postAuthorPopulate.push(authorPromise.promise);
                _postMetadataPopulate.push(metadataPromise.promise);
                // populate author's avatar
                authServ.getUserAvatar(result.author.id, "thumb").then(function (data) {
                    result['author']['avatar'] = data['avatar'];
                    authorPromise.resolve(data);
                    // populate metadata
                    metadataServ.getProductMetadata(result.id).then(function (data2) {
                        result['metadata'] = data2;
                        metadataPromise.resolve(data2);
                    });
                });
            });
            Q.all(_postAuthorPopulate.concat(_postMetadataPopulate)).then(function (values) {
                _listPromise.resolve(results);
            });
        });
        return _listPromise.promise;
    };
    ProductsService.prototype.getProductsList = function (page) {
        var _listPromise = Q.defer();
        var count = 10;
        var avatarService = new avatar.AvatarService();
        console.log('products.service > getProductsList start ', new Date());
        this.db.query('core/?json=get_posts&count=' + count + '&page=' + page).then(function (results) {
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
                var metadataPromise = Q.defer();
                _postAuthorPopulate.push(authorPromise.promise);
                _postMetadataPopulate.push(metadataPromise.promise);
                // populate author's avatar
                avatarService.getUserAvatar(result.author.id, 'thumb').then(function (data) {
                    result['author']['avatar'] = data['avatar'];
                    authorPromise.resolve(data);
                });
                // populate metadatagi
                metadataServ.getProductMetadata(result.id).then(function (data2) {
                    result['metadata'] = data2;
                    metadataPromise.resolve(data2);
                });
            });
            Q.all(_postAuthorPopulate.concat(_postMetadataPopulate)).then(function (values) {
                console.log('products.service > getProductsList finish ', new Date());
                _listPromise.resolve(results);
            });
        });
        return _listPromise.promise;
    };
    ProductsService.prototype.getProductById = function (productId) {
        var _this = this;
        var _productPromise = Q.defer();
        this.db.query('core/get_post/?id=' + productId).then(function (result) {
            var _promises = [];
            // save visit
            var saveVisitPromise = Q.defer();
            _promises.push(saveVisitPromise.promise);
            var visitQuery = "INSERT INTO wp2_post_views (id, type, period, count) " + "VALUES (" + productId + ",4,'total',1) " + "ON DUPLICATE KEY UPDATE count=count+1";
            _this.db.query_db(visitQuery).then(function () {
                saveVisitPromise.resolve(undefined);
            });
            // populate product visits
            var viewVisitsPromise = Q.defer();
            _promises.push(viewVisitsPromise.promise);
            var visitQuery = "SELECT count FROM wp2_post_views " + "WHERE id=" + productId + " AND type=4 AND period='total'";
            _this.db.query_db(visitQuery).then(function (data) {
                result['post']['visits'] = data[0]['count'];
                viewVisitsPromise.resolve(undefined);
            });
            // populate author's avatar
            authServ.getUserAvatar(result['post']['author']['id'], "thumb").then(function (data) {
                var authorPromise = Q.defer();
                _promises.push(authorPromise.promise);
                result['post']['author']['avatar'] = data['avatar'];
                authorPromise.resolve(data);
            });
            if (result['post']['comments'] && result['post']['comments'].length) {
                // for each comment
                result['post']['comments'].forEach(function (comment) {
                    var commentPromise = Q.defer();
                    _promises.push(commentPromise.promise);
                    // populate comments avatar
                    authServ.getUserAvatar(comment.author.id, "thumb").then(function (avatar) {
                        comment['author']['avatar'] = avatar['avatar'];
                        commentPromise.resolve(avatar);
                    });
                });
            }
            // populate metadata
            metadataServ.getProductMetadata(result['post']['id']).then(function (metadata) {
                var metadataPromise = Q.defer();
                _promises.push(metadataPromise.promise);
                result['post']['metadata'] = metadata;
                metadataPromise.resolve(metadata);
            });
            Q.all(_promises).then(function (values) {
                _productPromise.resolve(result);
            });
        });
        return _productPromise.promise;
    };
    ProductsService.prototype.getProductsByAuthor = function (authorId) {
        var _promise = Q.defer();
        var avatarService = new avatar.AvatarService();
        this.db.query('core/get_author_posts/?count=10&id=' + authorId).then(function (results) {
            var _postAuthorPopulate = [];
            var _postMetadataPopulate = [];
            var headerPromise = Q.defer();
            _postAuthorPopulate.push(headerPromise.promise);
            // populate header avatar
            avatarService.getUserAvatar(results['author']['id'], "thumb").then(function (data) {
                results['author']['avatar'] = data['avatar'];
                headerPromise.resolve(data);
                results['posts'].forEach(function (result) {
                    var authorPromise = Q.defer();
                    var metadataPromise = Q.defer();
                    _postAuthorPopulate.push(authorPromise.promise);
                    _postMetadataPopulate.push(metadataPromise.promise);
                    // populate author's avatar
                    result['author']['avatar'] = data['avatar'];
                    authorPromise.resolve(data['avatar']);
                    // populate metadata
                    metadataServ.getProductMetadata(result.id).then(function (data2) {
                        result['metadata'] = data2;
                        metadataPromise.resolve(data2);
                    });
                });
            });
            Q.all(_postAuthorPopulate.concat(_postMetadataPopulate)).then(function (values) {
                _promise.resolve(results);
            });
        });
        return _promise.promise;
    };
    ProductsService.prototype.getProductsBySchool = function (schoolId, page) {
        var _this = this;
        var _listPromise = Q.defer();
        var _postAuthorPopulate = [];
        var _postMetadataPopulate = [];
        this.db.query('core/?json=get_posts&count=200').then(function (results) {
            var posts = results['posts'];
            _this.db.query_db("SELECT user_id FROM wp2_bp_xprofile_data WHERE value='" + schoolId + "' AND field_id=4").then(function (data) {
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
                // pagination
                var count = 10;
                results['count_total'] = schoolPosts.length;
                results['pages'] = Math.floor(schoolPosts.length / count);
                if (schoolPosts.length > count - 1) {
                    var from = -count + (count * page);
                    var to = 0 + (count * page);
                    schoolPosts = schoolPosts.slice(from, to);
                }
                ;
                results['posts'] = schoolPosts;
                results['school'] = schoolId;
                results['count'] = schoolPosts.length;
                results['posts'].forEach(function (result) {
                    var authorPromise = Q.defer();
                    var metadataPromise = Q.defer();
                    _postAuthorPopulate.push(authorPromise.promise);
                    _postMetadataPopulate.push(metadataPromise.promise);
                    // populate author's avatar
                    authServ.getUserAvatar(result.author.id, "thumb").then(function (data) {
                        result['author']['avatar'] = data['avatar'];
                        authorPromise.resolve(data);
                        // populate metadatagi
                        metadataServ.getProductMetadata(result.id).then(function (data2) {
                            result['metadata'] = data2;
                            metadataPromise.resolve(data2);
                        });
                    });
                });
                Q.all(_postAuthorPopulate.concat(_postMetadataPopulate)).then(function (values) {
                    _listPromise.resolve(results);
                });
            });
        });
        return _listPromise.promise;
    };
    ProductsService.prototype.getProductsByOptionsSearch = function (search, subcategory0, subcategory1, style, sex) {
        var _promise = Q.defer();
        if (search == 'null')
            search = '';
        if (subcategory0 == 'null')
            search = '';
        if (subcategory1 == 'null')
            search = '';
        if (style == 'null')
            search = '';
        if (sex == 'null')
            search = '';
        var query = "SELECT post_data.post_id, post_data.title, post_data.date, post_data.author, " + "image.image, subcategory0.subcategory0, subcategory1.subcategory1, style.style, sex.sex " + "FROM " + "(SELECT wp2_posts.ID AS post_id, " + "wp2_posts.post_title AS title, " + "wp2_posts.post_date_gmt AS date, " + "wp2_users.display_name AS author, " + "wp2_users.ID AS author_id " + "FROM `wp2_posts` " + "JOIN wp2_users " + "ON wp2_posts.post_author = wp2_users.ID " + "WHERE wp2_posts.post_title LIKE '%" + search + "%' " + ") post_data " + "JOIN " + "(SELECT wp2_postmeta.post_id, " + "wp2_postmeta.meta_value AS image " + "FROM wp2_postmeta " + "WHERE wp2_postmeta.meta_key = 'sofbackend__sof_work_meta__postImage' " + ") image " + "ON post_data.post_id = image.post_id " + "JOIN " + "(SELECT wp2_postmeta.post_id, " + "wp2_postmeta.meta_value AS subcategory0 " + "FROM wp2_postmeta " + "WHERE wp2_postmeta.meta_key = 'sofbackend__sof_work_meta__category_0' " + "AND wp2_postmeta.meta_value LIKE '%" + subcategory0 + "%' " + ") subcategory0 " + "ON post_data.post_id = subcategory0.post_id " + "JOIN " + "(SELECT wp2_postmeta.post_id, " + "wp2_postmeta.meta_value AS subcategory1 " + "FROM wp2_postmeta " + "WHERE wp2_postmeta.meta_key = 'sofbackend__sof_work_meta__category_1' " + "AND wp2_postmeta.meta_value LIKE '%" + subcategory1 + "%' " + ") subcategory1 " + "ON post_data.post_id = subcategory1.post_id " + "JOIN " + "(SELECT wp2_postmeta.post_id, " + "wp2_postmeta.meta_value AS style " + "FROM wp2_postmeta " + "WHERE wp2_postmeta.meta_key = 'sofbackend__sof_work_meta__style' " + "AND wp2_postmeta.meta_value LIKE '%" + style + "%' " + ") style " + "ON post_data.post_id = style.post_id " + "JOIN " + "(SELECT wp2_postmeta.post_id, " + "wp2_postmeta.meta_value AS sex " + "FROM wp2_postmeta " + "WHERE wp2_postmeta.meta_key = 'sofbackend__sof_work_meta__sex' " + "AND wp2_postmeta.meta_value LIKE '%" + sex + "%' " + ") sex " + "ON post_data.post_id = sex.post_id " + "ORDER BY post_id " + "LIMIT 10";
        this.db.query_db(query).then(function (data) {
            var dataJson = JSON.parse(JSON.stringify(data));
            var _postAuthorPopulate = [];
            var _postMetadataPopulate = [];
            dataJson.forEach(function (result) {
                var authorPromise = Q.defer();
                var metadataPromise = Q.defer();
                _postAuthorPopulate.push(authorPromise.promise);
                _postMetadataPopulate.push(metadataPromise.promise);
                // populate author's avatar
                authServ.getUserAvatar(result['author_id'], "thumb").then(function (data) {
                    result['author_avatar'] = data['avatar'];
                    authorPromise.resolve(data);
                    // populate metadata
                    metadataServ.getProductMetadata(result.post_id).then(function (data2) {
                        result['metadata'] = data2;
                        metadataPromise.resolve(data2);
                    });
                });
            });
            Q.all(_postAuthorPopulate.concat(_postMetadataPopulate)).then(function (values) {
                _promise.resolve(dataJson);
            });
        });
        return _promise.promise;
    };
    ProductsService.prototype.getProductsBySubcategory0 = function (subcategory0Id, page) {
        var _listPromise = Q.defer();
        var _postAuthorPopulate = [];
        var _postMetadataPopulate = [];
        this.db.query('core/?json=get_posts&count=200').then(function (results) {
            var posts = results['posts'];
            var subcategory0Posts = [];
            for (var i in posts) {
                if (posts[i]['custom_fields']['sofbackend__sof_work_meta__category_0'] == subcategory0Id) {
                    subcategory0Posts.push(posts[i]);
                }
                ;
            }
            ;
            // pagination
            var count = 10;
            results['count_total'] = subcategory0Posts.length;
            results['pages'] = Math.floor(subcategory0Posts.length / count);
            if (subcategory0Posts.length > count - 1) {
                var from = -count + (count * page);
                var to = 0 + (count * page);
                subcategory0Posts = subcategory0Posts.slice(from, to);
            }
            ;
            results['posts'] = subcategory0Posts;
            results['subcategory0'] = subcategory0Id;
            results['count'] = subcategory0Posts.length;
            results['posts'].forEach(function (result) {
                var authorPromise = Q.defer();
                var metadataPromise = Q.defer();
                _postAuthorPopulate.push(authorPromise.promise);
                _postMetadataPopulate.push(metadataPromise.promise);
                // populate author's avatar
                authServ.getUserAvatar(result.author.id, "thumb").then(function (data) {
                    result['author']['avatar'] = data['avatar'];
                    authorPromise.resolve(data);
                    // populate metadatagi
                    metadataServ.getProductMetadata(result.id).then(function (data2) {
                        result['metadata'] = data2;
                        metadataPromise.resolve(data2);
                    });
                });
            });
            Q.all(_postAuthorPopulate.concat(_postMetadataPopulate)).then(function (values) {
                _listPromise.resolve(results);
            });
        });
        return _listPromise.promise;
    };
    ProductsService.prototype.getProductsBySubcategory1 = function (subcategory1Id, page) {
        var _listPromise = Q.defer();
        var _postAuthorPopulate = [];
        var _postMetadataPopulate = [];
        this.db.query('core/?json=get_posts&count=200').then(function (results) {
            var posts = results['posts'];
            var subcategory1Posts = [];
            for (var i in posts) {
                if (posts[i]['custom_fields']['sofbackend__sof_work_meta__category_1'] == subcategory1Id) {
                    subcategory1Posts.push(posts[i]);
                }
                ;
            }
            ;
            // pagination
            var count = 10;
            results['count_total'] = subcategory1Posts.length;
            results['pages'] = Math.floor(subcategory1Posts.length / count);
            if (subcategory1Posts.length > count - 1) {
                var from = -count + (count * page);
                var to = 0 + (count * page);
                subcategory1Posts = subcategory1Posts.slice(from, to);
            }
            ;
            results['posts'] = subcategory1Posts;
            results['subcategory1'] = subcategory1Id;
            results['count'] = subcategory1Posts.length;
            results['posts'].forEach(function (result) {
                var authorPromise = Q.defer();
                var metadataPromise = Q.defer();
                _postAuthorPopulate.push(authorPromise.promise);
                _postMetadataPopulate.push(metadataPromise.promise);
                // populate author's avatar
                authServ.getUserAvatar(result.author.id, "thumb").then(function (data) {
                    result['author']['avatar'] = data['avatar'];
                    authorPromise.resolve(data);
                    // populate metadatagi
                    metadataServ.getProductMetadata(result.id).then(function (data2) {
                        result['metadata'] = data2;
                        metadataPromise.resolve(data2);
                    });
                });
            });
            Q.all(_postAuthorPopulate.concat(_postMetadataPopulate)).then(function (values) {
                _listPromise.resolve(results);
            });
        });
        return _listPromise.promise;
    };
    ProductsService.prototype.getProductsByStyle = function (styleId, page) {
        var _listPromise = Q.defer();
        var _postAuthorPopulate = [];
        var _postMetadataPopulate = [];
        this.db.query('core/?json=get_posts&count=200').then(function (results) {
            var posts = results['posts'];
            var stylePosts = [];
            for (var i in posts) {
                if (posts[i]['custom_fields']['sofbackend__sof_work_meta__style'] == styleId) {
                    stylePosts.push(posts[i]);
                }
                ;
            }
            ;
            // pagination
            var count = 10;
            results['count_total'] = stylePosts.length;
            results['pages'] = Math.floor(stylePosts.length / count);
            if (stylePosts.length > count - 1) {
                var from = -count + (count * page);
                var to = 0 + (count * page);
                stylePosts = stylePosts.slice(from, to);
            }
            ;
            results['posts'] = stylePosts;
            results['style'] = styleId;
            results['count'] = stylePosts.length;
            results['posts'].forEach(function (result) {
                var authorPromise = Q.defer();
                var metadataPromise = Q.defer();
                _postAuthorPopulate.push(authorPromise.promise);
                _postMetadataPopulate.push(metadataPromise.promise);
                // populate author's avatar
                authServ.getUserAvatar(result.author.id, "thumb").then(function (data) {
                    result['author']['avatar'] = data['avatar'];
                    authorPromise.resolve(data);
                    // populate metadatagi
                    metadataServ.getProductMetadata(result.id).then(function (data2) {
                        result['metadata'] = data2;
                        metadataPromise.resolve(data2);
                    });
                });
            });
            Q.all(_postAuthorPopulate.concat(_postMetadataPopulate)).then(function (values) {
                _listPromise.resolve(results);
            });
        });
        return _listPromise.promise;
    };
    ProductsService.prototype.getProductsBySex = function (sexId, page) {
        var _listPromise = Q.defer();
        var _postAuthorPopulate = [];
        var _postMetadataPopulate = [];
        this.db.query('core/?json=get_posts&count=200').then(function (results) {
            var posts = results['posts'];
            var sexPosts = [];
            for (var i in posts) {
                if (posts[i]['custom_fields']['sofbackend__sof_work_meta__sex'] == sexId) {
                    sexPosts.push(posts[i]);
                }
                ;
            }
            ;
            // pagination
            var count = 6;
            results['count_total'] = sexPosts.length;
            results['pages'] = Math.floor(sexPosts.length / count);
            if (sexPosts.length > 5) {
                var from = -count + (count * page);
                var to = 0 + (count * page);
                sexPosts = sexPosts.slice(from, to);
            }
            ;
            results['posts'] = sexPosts;
            results['sex'] = sexId;
            results['count'] = sexPosts.length;
            results['posts'].forEach(function (result) {
                var authorPromise = Q.defer();
                var metadataPromise = Q.defer();
                _postAuthorPopulate.push(authorPromise.promise);
                _postMetadataPopulate.push(metadataPromise.promise);
                // populate author's avatar
                authServ.getUserAvatar(result.author.id, "thumb").then(function (data) {
                    result['author']['avatar'] = data['avatar'];
                    authorPromise.resolve(data);
                    // populate metadatagi
                    metadataServ.getProductMetadata(result.id).then(function (data2) {
                        result['metadata'] = data2;
                        metadataPromise.resolve(data2);
                    });
                });
            });
            Q.all(_postAuthorPopulate.concat(_postMetadataPopulate)).then(function (values) {
                _listPromise.resolve(results);
            });
        });
        return _listPromise.promise;
    };
    ProductsService.prototype.createProduct = function (authorId, title, content, img, subcategory0, subcategory1, styles, sex, subImg1, subImg2, subImg3, subImg4, subImg5, subImg6, subImg7, subImg8, subImg9, productionCost, sell, sellPrice, sellNote, rental, rentalPrice, rentalNote) {
        var _this = this,
            _promise = Q.defer(),
            promisesList = [],
            now = new Date(),
            query = "INSERT INTO wp2_posts (ID, post_author, post_content, post_title, post_status, comment_status, ping_status, post_name, post_type, post_date, post_date_gmt) " + "VALUES (NULL, '" + authorId + "', '" + content + "', '" + title + "', 'draft', 'open', 'open', '" + title.replace(/\s/g, '-') + "', 'post', '" + now.toISOString() + "','" + now.toISOString() + "')";
        this.db.query_db(query).then(function (data) {
            var guid = "http://sof.tokyo/?p=" + data['insertId'],
                query2 = "UPDATE wp2_posts SET guid = '" + guid + "' WHERE ID = " + data['insertId'];
            _this.db.query_db(query2).then(function (data2) {
                var query3 = "INSERT INTO wp2_postmeta (meta_id, post_id, meta_key, meta_value)" + "VALUES ";
                if (subcategory0){
                    query3 = query3.concat("(NULL," + data['insertId'] + ",'sofbackend__sof_work_meta__category_0','" + subcategory0 + "') ");
                    var meta = 'a:2:{s:9:"separated";s:32:"02103d4eebc83e72e0b4f4b8f824641b";s:4:"keys";a:21:{i:0;s:9:"postImage";i:1;s:5:"style";i:2;s:3:"sex";i:3;s:14:"productionCost";i:4;s:4:"sell";i:5;s:9:"sellPrice";i:6;s:8:"sellNote";i:7;s:6:"rental";i:8;s:11:"rentalPrice";i:9;s:10:"rentalNote";i:10;s:9:"subImage1";i:11;s:9:"subImage2";i:12;s:9:"subImage3";i:13;s:9:"subImage4";i:14;s:9:"subImage5";i:15;s:9:"subImage6";i:16;s:9:"subImage7";i:17;s:9:"subImage8";i:18;s:9:"subImage9";i:19;s:10:"category_0";i:20;s:10:"category_1";}}';
                    query3 = query3.concat(",(NULL," + data['insertId'] + ",'sofbackend__sof_work_meta','" + meta + "') ");
                }
                ;
                if (subcategory1)
                    query3 = query3.concat(",(NULL," + data['insertId'] + ",'sofbackend__sof_work_meta__category_1','" + subcategory1 + "') ");
                if (styles) {
                    for (var i in styles) {
                        query3 = query3.concat(",(NULL," + data['insertId'] + ",'sofbackend__sof_work_meta__style','" + styles[i] + "') ");
                    }
                }
                ;
                if (sex)
                    query3 = query3.concat(",(NULL," + data['insertId'] + ",'sofbackend__sof_work_meta__sex','" + sex + "') ");
                    
                if (img) {
                    var imagePromise = Q.defer();
                    promisesList.push(imagePromise.promise);
                    imagesServ.uploadImage(img, data['insertId'], 'sofbackend__sof_work_meta__postImage').then(function (result) {
                        
                        var postImg = "INSERT INTO wp2_posts (ID, post_author, post_content, post_title, post_status, comment_status, ping_status, post_name, post_type, post_mime_type, post_date, post_date_gmt) " + "VALUES (NULL, '" + authorId + "', '" + '' + "', '" + 
                        '' + "', 'inherit', 'open', 'closed', '" + '' + "', 'attachment', 'image/jpeg', '" + now.toISOString() + "','" + now.toISOString() + "')";
                        
                        //result.url -> url de la imagen
                        
                        _this.db.query_db(postImg).then(function (resPostImg) {
                            metadataServ.createProductImageID(data['insertId'], '_thumbnail_id', resPostImg['insertId']).then(function (res) {
                                metadataServ.createMetadata(resPostImg['insertId'], '_wp_attached_file', result.url).then(function (res2) {
                                    imagePromise.resolve(result);
                                });
                            });
                        });    
                    });
                }
                ;
                if (subImg1) {
                    var subimage1Promise = Q.defer();
                    promisesList.push(subimage1Promise.promise);
                    imagesServ.uploadImage(subImg1, data['insertId'], 'sofbackend__sof_work_meta__subImage1').then(function (result) {
                        
                        var postImg = "INSERT INTO wp2_posts (ID, post_author, post_content, post_title, post_status, comment_status, ping_status, post_name, post_type, post_mime_type, post_date, post_date_gmt) " + "VALUES (NULL, '" + authorId + "', '" + '' + "', '" + 
                        '' + "', 'inherit', 'open', 'closed', '" + '' + "', 'attachment', 'image/jpeg', '" + now.toISOString() + "','" + now.toISOString() + "')";
                        
                        //result.url -> url de la imagen
                        
                        _this.db.query_db(postImg).then(function (resPostImg) {
                            metadataServ.createMetadata(resPostImg['insertId'], '_wp_attached_file', result.url).then(function (res2) {
                                subimage1Promise.resolve(result);
                            });
                        });   
                        
                    });
                }
                ;
                if (subImg2) {
                    var subimage2Promise = Q.defer();
                    promisesList.push(subimage2Promise.promise);
                    imagesServ.uploadImage(subImg2, data['insertId'], 'sofbackend__sof_work_meta__subImage2').then(function (result) {
                        
                        var postImg = "INSERT INTO wp2_posts (ID, post_author, post_content, post_title, post_status, comment_status, ping_status, post_name, post_type, post_mime_type, post_date, post_date_gmt) " + "VALUES (NULL, '" + authorId + "', '" + '' + "', '" + 
                        '' + "', 'inherit', 'open', 'closed', '" + '' + "', 'attachment', 'image/jpeg', '" + now.toISOString() + "','" + now.toISOString() + "')";
                        
                        //result.url -> url de la imagen
                        
                        _this.db.query_db(postImg).then(function (resPostImg) {
                            metadataServ.createMetadata(resPostImg['insertId'], '_wp_attached_file', result.url).then(function (res2) {
                                subimage2Promise.resolve(result);
                            });
                        }); 
                        
                    });
                }
                ;
                if (subImg3) {
                    var subimage3Promise = Q.defer();
                    promisesList.push(subimage3Promise.promise);
                    imagesServ.uploadImage(subImg3, data['insertId'], 'sofbackend__sof_work_meta__subImage3').then(function (result) {
                        
                        var postImg = "INSERT INTO wp2_posts (ID, post_author, post_content, post_title, post_status, comment_status, ping_status, post_name, post_type, post_mime_type, post_date, post_date_gmt) " + "VALUES (NULL, '" + authorId + "', '" + '' + "', '" + 
                        '' + "', 'inherit', 'open', 'closed', '" + '' + "', 'attachment', 'image/jpeg', '" + now.toISOString() + "','" + now.toISOString() + "')";
                        
                        //result.url -> url de la imagen
                        
                        _this.db.query_db(postImg).then(function (resPostImg) {
                            metadataServ.createMetadata(resPostImg['insertId'], '_wp_attached_file', result.url).then(function (res2) {
                                subimage3Promise.resolve(result);
                            });
                        });
                    });
                }
                ;
                if (subImg4) {
                    var subimage4Promise = Q.defer();
                    promisesList.push(subimage4Promise.promise);
                    imagesServ.uploadImage(subImg4, data['insertId'], 'sofbackend__sof_work_meta__subImage4').then(function (result) {
                        
                        var postImg = "INSERT INTO wp2_posts (ID, post_author, post_content, post_title, post_status, comment_status, ping_status, post_name, post_type, post_mime_type, post_date, post_date_gmt) " + "VALUES (NULL, '" + authorId + "', '" + '' + "', '" + 
                        '' + "', 'inherit', 'open', 'closed', '" + '' + "', 'attachment', 'image/jpeg', '" + now.toISOString() + "','" + now.toISOString() + "')";
                        
                        //result.url -> url de la imagen
                        
                        _this.db.query_db(postImg).then(function (resPostImg) {
                            metadataServ.createMetadata(resPostImg['insertId'], '_wp_attached_file', result.url).then(function (res2) {
                                subimage4Promise.resolve(result);
                            });
                        });
                    });
                }
                ;
                if (subImg5) {
                    var subimage5Promise = Q.defer();
                    promisesList.push(subimage5Promise.promise);
                    imagesServ.uploadImage(subImg5, data['insertId'], 'sofbackend__sof_work_meta__subImage5').then(function (result) {
                        
                        var postImg = "INSERT INTO wp2_posts (ID, post_author, post_content, post_title, post_status, comment_status, ping_status, post_name, post_type, post_mime_type, post_date, post_date_gmt) " + "VALUES (NULL, '" + authorId + "', '" + '' + "', '" + 
                        '' + "', 'inherit', 'open', 'closed', '" + '' + "', 'attachment', 'image/jpeg', '" + now.toISOString() + "','" + now.toISOString() + "')";
                        
                        //result.url -> url de la imagen
                        
                        _this.db.query_db(postImg).then(function (resPostImg) {
                            metadataServ.createMetadata(resPostImg['insertId'], '_wp_attached_file', result.url).then(function (res2) {
                                subimage5Promise.resolve(result);
                            });
                        });
                    });
                }
                ;
                if (subImg6) {
                    var subimage6Promise = Q.defer();
                    promisesList.push(subimage6Promise.promise);
                    imagesServ.uploadImage(subImg6, data['insertId'], 'sofbackend__sof_work_meta__subImage6').then(function (result) {
                        
                        var postImg = "INSERT INTO wp2_posts (ID, post_author, post_content, post_title, post_status, comment_status, ping_status, post_name, post_type, post_mime_type, post_date, post_date_gmt) " + "VALUES (NULL, '" + authorId + "', '" + '' + "', '" + 
                        '' + "', 'inherit', 'open', 'closed', '" + '' + "', 'attachment', 'image/jpeg', '" + now.toISOString() + "','" + now.toISOString() + "')";
                        
                        //result.url -> url de la imagen
                        
                        _this.db.query_db(postImg).then(function (resPostImg) {
                            metadataServ.createMetadata(resPostImg['insertId'], '_wp_attached_file', result.url).then(function (res2) {
                                subimage6Promise.resolve(result);
                            });
                        });
                    });
                }
                ;
                if (subImg7) {
                    var subimage7Promise = Q.defer();
                    promisesList.push(subimage7Promise.promise);
                    imagesServ.uploadImage(subImg7, data['insertId'], 'sofbackend__sof_work_meta__subImage7').then(function (result) {
                        
                        var postImg = "INSERT INTO wp2_posts (ID, post_author, post_content, post_title, post_status, comment_status, ping_status, post_name, post_type, post_mime_type, post_date, post_date_gmt) " + "VALUES (NULL, '" + authorId + "', '" + '' + "', '" + 
                        '' + "', 'inherit', 'open', 'closed', '" + '' + "', 'attachment', 'image/jpeg', '" + now.toISOString() + "','" + now.toISOString() + "')";
                        
                        //result.url -> url de la imagen
                        
                        _this.db.query_db(postImg).then(function (resPostImg) {
                            metadataServ.createMetadata(resPostImg['insertId'], '_wp_attached_file', result.url).then(function (res2) {
                                subimage7Promise.resolve(result);
                            });
                        });
                    });
                }
                ;
                if (subImg8) {
                    var subimage8Promise = Q.defer();
                    promisesList.push(subimage8Promise.promise);
                    imagesServ.uploadImage(subImg8, data['insertId'], 'sofbackend__sof_work_meta__subImage8').then(function (result) {
                        
                        var postImg = "INSERT INTO wp2_posts (ID, post_author, post_content, post_title, post_status, comment_status, ping_status, post_name, post_type, post_mime_type, post_date, post_date_gmt) " + "VALUES (NULL, '" + authorId + "', '" + '' + "', '" + 
                        '' + "', 'inherit', 'open', 'closed', '" + '' + "', 'attachment', 'image/jpeg', '" + now.toISOString() + "','" + now.toISOString() + "')";
                        
                        //result.url -> url de la imagen
                        
                        _this.db.query_db(postImg).then(function (resPostImg) {
                            metadataServ.createMetadata(resPostImg['insertId'], '_wp_attached_file', result.url).then(function (res2) {
                                subimage8Promise.resolve(result);
                            });
                        });
                    });
                }
                ;
                if (subImg9) {
                    var subimage9Promise = Q.defer();
                    promisesList.push(subimage9Promise.promise);
                    imagesServ.uploadImage(subImg9, data['insertId'], 'sofbackend__sof_work_meta__subImage9').then(function (result) {
                        
                        var postImg = "INSERT INTO wp2_posts (ID, post_author, post_content, post_title, post_status, comment_status, ping_status, post_name, post_type, post_mime_type, post_date, post_date_gmt) " + "VALUES (NULL, '" + authorId + "', '" + '' + "', '" + 
                        '' + "', 'inherit', 'open', 'closed', '" + '' + "', 'attachment', 'image/jpeg', '" + now.toISOString() + "','" + now.toISOString() + "')";
                        
                        //result.url -> url de la imagen
                        
                        _this.db.query_db(postImg).then(function (resPostImg) {
                            metadataServ.createMetadata(resPostImg['insertId'], '_wp_attached_file', result.url).then(function (res2) {
                                subimage9Promise.resolve(result);
                            });
                        });
                    });
                }
                ;
                
                if (productionCost)
                    query3 = query3.concat(",(NULL," + data['insertId'] + ",'sofbackend__sof_work_meta__productionCost'," + productionCost + ") ");
                if (sell)
                    query3 = query3.concat(",(NULL," + data['insertId'] + ",'sofbackend__sof_work_meta__sell','" + sell + "') ");
                if (sellPrice)
                    query3 = query3.concat(",(NULL," + data['insertId'] + ",'sofbackend__sof_work_meta__sellPrice'," + sellPrice + ") ");
                if (sellNote)
                    query3 = query3.concat(",(NULL," + data['insertId'] + ",'sofbackend__sof_work_meta__sellNote','" + sellNote + "') ");
                if (rental)
                    query3 = query3.concat(",(NULL," + data['insertId'] + ",'sofbackend__sof_work_meta__rental','" + rental + "') ");
                if (rentalPrice)
                    query3 = query3.concat(",(NULL," + data['insertId'] + ",'sofbackend__sof_work_meta__rentalPrice'," + rentalPrice + ") ");
                if (rentalNote)
                    query3 = query3.concat(",(NULL," + data['insertId'] + ",'sofbackend__sof_work_meta__rentalNote','" + rentalNote + "') ");
                    
                var query3Promise = Q.defer();
                promisesList.push(query3Promise.promise);
                _this.db.query_db(query3).then(function (data3) {
                    query3Promise.resolve(data3);
                });
            });
            Q.all(promisesList).then(function (values) {
                _promise.resolve(data);
            });
        });
        return _promise.promise;
    };
    ProductsService.prototype.updateProduct = function (productId, title, content, img, subcategory0, subcategory1, styles, sex, subImg1, subImg2, subImg3, subImg4, subImg5, subImg6, productionCost, sell, sellPrice, sellNote, rental, rentalPrice, rentalNote) {
        var _promise = Q.defer();
        var promisesList = [];
        if (title) {
            var titlePromise = Q.defer();
            promisesList.push(titlePromise.promise);
            this.db.query_db("UPDATE wp2_posts SET post_title=" + title + " WHERE ID=" + productId).then(function () {
                titlePromise.resolve(true);
            });
        }
        ;
        if (content) {
            var contentPromise = Q.defer();
            promisesList.push(contentPromise.promise);
            this.db.query_db("UPDATE wp2_posts SET post_content=" + content + " WHERE ID=" + productId).then(function () {
                contentPromise.resolve(true);
            });
        }
        ;
        if (img) {
            var imagePromise = Q.defer();
            promisesList.push(imagePromise.promise);
            imagesServ.updateImage(img, productId, 'sofbackend__sof_work_meta__postImage').then(function (result) {
                imagePromise.resolve(result);
            });
        }
        ;
        if (subcategory0) {
            var subcat0Promise = Q.defer();
            promisesList.push(subcat0Promise.promise);
            this.db.query_db("UPDATE wp2_postmeta SET meta_value=" + subcategory0 + " WHERE meta_key='sofbackend__sof_work_meta__category_0' AND post_id=" + productId).then(function () {
                subcat0Promise.resolve(true);
            });
        }
        ;
        if (subcategory1) {
            var subcat1Promise = Q.defer();
            promisesList.push(subcat1Promise.promise);
            this.db.query_db("UPDATE wp2_postmeta SET meta_value=" + subcategory1 + " WHERE meta_key='sofbackend__sof_work_meta__category_1' AND post_id=" + productId).then(function () {
                subcat1Promise.resolve(true);
            });
        }
        ;
        if (sex) {
            var sexPromise = Q.defer();
            promisesList.push(sexPromise.promise);
            this.db.query_db("UPDATE wp2_postmeta SET meta_value=" + sex + " WHERE meta_key='sofbackend__sof_work_meta__sex' AND post_id=" + productId).then(function () {
                sexPromise.resolve(true);
            });
        }
        ;
        Q.all(promisesList).then(function (values) {
            _promise.resolve(true);
        });
        return _promise.promise;
    };
    ProductsService.prototype.deleteProduct = function (nonce, productId) {
        return this.db.query('posts/delete_post/?nonce=' + nonce + '&id=' + productId);
    };
    ProductsService.prototype.createComment = function (productId, cookie, content) {
        return this.db.query('user/post_comment/?post_id=' + productId + '&cookie=' + cookie + '&comment_status=1' + '&content=' + content);
    };
    ProductsService.prototype.getProductsBySearch = function (search, page) {
        var _searchPromise = Q.defer();
        this.db.query('core/get_search_results/?count=10&search=' + search + '&page=' + page).then(function (results) {
            var _postAuthorPopulate = [];
            results['posts'].forEach(function (result) {
                var authorPromise = Q.defer();
                _postAuthorPopulate.push(authorPromise.promise);
                authServ.getUserAvatar(result.author.id, "thumb").then(function (data) {
                    result['author']['avatar'] = data['avatar'];
                    authorPromise.resolve(data);
                    metadataServ.getProductMetadata(result.id).then(function (data2) {
                        result['metadata'] = data2;
                    });
                });
            });
            Q.all(_postAuthorPopulate).then(function () {
                _searchPromise.resolve(results);
            });
        });
        return _searchPromise.promise;
    };
    ProductsService.prototype.getProductsRankingByLikes = function () {
        var _this = this;
        var _responsePromise = Q.defer();
        var _productsPromises = [];
        var _response = {
            posts: []
        };
        var query = "SELECT * FROM " + "( " + "SELECT wp2_posts.ID AS post_id, " + "wp2_posts.post_title AS title, " + "wp2_posts.post_date_gmt AS date, " + "wp2_postmeta.meta_value AS likes, " + "wp2_users.display_name AS author " + "FROM `wp2_posts` " + "JOIN wp2_users ON wp2_posts.post_author = wp2_users.ID " + "JOIN wp2_postmeta ON wp2_posts.ID = wp2_postmeta.post_id " + "WHERE wp2_postmeta.meta_key = '_item_likes' " + ") table1 " + "ORDER BY likes DESC " + "LIMIT 5";
        this.db.query_db(query).then(function (data) {
            data.forEach(function (product) {
                var _promise = Q.defer();
                _productsPromises.push(_promise.promise);
                _this.getProductById(product['post_id']).then(function (result) {
                    _promise.resolve(result['post']);
                });
            });
            Q.all(_productsPromises).then(function (results) {
                _responsePromise.resolve(results);
            });
        });
        return _responsePromise.promise;
    };
    ProductsService.prototype.getProductsRankingByVisits = function () {
        var _promise = Q.defer();
        var query = "SELECT * FROM " + "( " + "SELECT wp2_posts.ID AS post_id, " + "wp2_posts.post_title AS title, " + "wp2_posts.post_date_gmt AS date, " + "wp2_users.display_name AS author, " + "wp2_post_views.count AS visits " + "FROM `wp2_posts` " + "JOIN wp2_users ON wp2_posts.post_author = wp2_users.ID " + "JOIN wp2_post_views ON wp2_posts.ID = wp2_post_views.id " + "WHERE wp2_post_views.period = 'total' " + ") table1 " + "JOIN " + "( " + "SELECT wp2_postmeta.post_id, " + "wp2_postmeta.meta_value AS image " + "FROM wp2_postmeta " + "WHERE wp2_postmeta.meta_key = 'sofbackend__sof_work_meta__postImage' " + ") table2 " + "ON table1.post_id = table2.post_id " + "ORDER BY visits DESC " + "LIMIT 10";
        this.db.query_db(query).then(function (data) {
            _promise.resolve(data);
        });
        return _promise.promise;
    };
    ProductsService.prototype.test1ProductList = function () {
        var _promise = Q.defer();
        var count = 10;
        var query = "SELECT wp2_posts.ID AS post_id, post_title, wp2_users.display_name AS author, wp2_users.id AS author_id, " + "wp2_posts.post_content, wp2_posts.post_date_gmt, " + "views_table.post_views, " + "GROUP_CONCAT(CONCAT('\"', meta_key, '\": ', '\"', meta_value, '\"') SEPARATOR ', ') AS metadata " + "FROM wp2_posts " + "INNER JOIN wp2_postmeta " + "ON wp2_posts.ID = wp2_postmeta.post_id " + "INNER JOIN wp2_users " + "ON wp2_posts.post_author = wp2_users.ID " + "INNER JOIN ( " + "SELECT id AS post_id, count AS post_views " + "FROM wp2_post_views " + "WHERE wp2_post_views.type = 4 " + ") AS views_table " + "ON wp2_posts.ID = views_table.post_id " + "WHERE wp2_posts.post_type = 'post' " + "GROUP BY wp2_posts.ID " + "ORDER BY RAND() " + "LIMIT " + count;
        this.db.query_db(query).then(function (data) {
            _promise.resolve(data);
        });
        return _promise.promise;
    };
    ProductsService.prototype.test2ProductList = function () {
        var _promise = Q.defer();
        var count = 10;
        var query = "SELECT wp2_posts.ID AS post_id, post_title, wp2_users.display_name AS author, wp2_users.id AS author_id, " + "wp2_posts.post_content, wp2_posts.post_date_gmt, " + "views_table.post_views, " + "CONCAT('{', GROUP_CONCAT(CONCAT('\"', meta_key, '\": ', '\"', meta_value, '\"') SEPARATOR ', '), '}') AS metadata " + "FROM wp2_posts " + "INNER JOIN wp2_postmeta " + "ON wp2_posts.ID = wp2_postmeta.post_id " + "INNER JOIN wp2_users " + "ON wp2_posts.post_author = wp2_users.ID " + "INNER JOIN ( " + "SELECT id AS post_id, count AS post_views " + "FROM wp2_post_views " + "WHERE wp2_post_views.type = 4 " + ") AS views_table " + "ON wp2_posts.ID = views_table.post_id " + "WHERE wp2_posts.post_type = 'post' " + "GROUP BY wp2_posts.ID " + "ORDER BY RAND() " + "LIMIT " + count;
        this.db.query_db(query).then(function (data) {
            var dataJson = JSON.parse(JSON.stringify(data));
            var _postAuthorPopulate = [];
            dataJson.forEach(function (product) {
                var authorPromise = Q.defer();
                _postAuthorPopulate.push(authorPromise.promise);
                authServ.getUserAvatar(product.author_id, "thumb").then(function (data) {
                    product['author_avatar'] = data['avatar'];
                    authorPromise.resolve(data);
                });
            });
            Q.all(_postAuthorPopulate).then(function (values) {
                _promise.resolve(dataJson);
            });
        });
        return _promise.promise;
    };
    return ProductsService;
})();
exports.ProductsService = ProductsService;
;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1vZHVsZXMvcHJvZHVjdHMvcHJvZHVjdHMuc2VydmljZS50cyJdLCJuYW1lcyI6WyJQcm9kdWN0c1NlcnZpY2UiLCJQcm9kdWN0c1NlcnZpY2UuY29uc3RydWN0b3IiLCJQcm9kdWN0c1NlcnZpY2UuZ2V0UHJvZHVjdHNOZXciLCJQcm9kdWN0c1NlcnZpY2UuZ2V0UHJvZHVjdHNMaXN0IiwiUHJvZHVjdHNTZXJ2aWNlLmdldFByb2R1Y3RzTGlzdC5zaHVmZmxlIiwiUHJvZHVjdHNTZXJ2aWNlLmdldFByb2R1Y3RCeUlkIiwiUHJvZHVjdHNTZXJ2aWNlLmdldFByb2R1Y3RzQnlBdXRob3IiLCJQcm9kdWN0c1NlcnZpY2UuZ2V0UHJvZHVjdHNCeVNjaG9vbCIsIlByb2R1Y3RzU2VydmljZS5nZXRQcm9kdWN0c0J5T3B0aW9uc1NlYXJjaCIsIlByb2R1Y3RzU2VydmljZS5nZXRQcm9kdWN0c0J5U3ViY2F0ZWdvcnkwIiwiUHJvZHVjdHNTZXJ2aWNlLmdldFByb2R1Y3RzQnlTdWJjYXRlZ29yeTEiLCJQcm9kdWN0c1NlcnZpY2UuZ2V0UHJvZHVjdHNCeVN0eWxlIiwiUHJvZHVjdHNTZXJ2aWNlLmdldFByb2R1Y3RzQnlTZXgiLCJQcm9kdWN0c1NlcnZpY2UuY3JlYXRlUHJvZHVjdCIsIlByb2R1Y3RzU2VydmljZS51cGRhdGVQcm9kdWN0IiwiUHJvZHVjdHNTZXJ2aWNlLmRlbGV0ZVByb2R1Y3QiLCJQcm9kdWN0c1NlcnZpY2UuY3JlYXRlQ29tbWVudCIsIlByb2R1Y3RzU2VydmljZS5nZXRQcm9kdWN0c0J5U2VhcmNoIiwiUHJvZHVjdHNTZXJ2aWNlLmdldFByb2R1Y3RzUmFua2luZ0J5TGlrZXMiLCJQcm9kdWN0c1NlcnZpY2UuZ2V0UHJvZHVjdHNSYW5raW5nQnlWaXNpdHMiLCJQcm9kdWN0c1NlcnZpY2UudGVzdDFQcm9kdWN0TGlzdCIsIlByb2R1Y3RzU2VydmljZS50ZXN0MlByb2R1Y3RMaXN0Il0sIm1hcHBpbmdzIjoiQUFBQSxrREFBa0Q7QUFDbEQs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Q0EsQ0FBQ0EsQ0FBQ0E7WUFDZkEsSUFBSUEsY0FBY0EsR0FBR0EsQ0FBQ0EsQ0FBQ0EsS0FBS0EsRUFBRUEsQ0FBQ0E7WUFDL0JBLFlBQVlBLENBQUNBLElBQUlBLENBQUNBLGNBQWNBLENBQUNBLE9BQU9BLENBQUNBLENBQUNBO1lBQzFDQSxJQUFJQSxDQUFDQSxFQUFFQSxDQUFDQSxRQUFRQSxDQUFDQSxxQ0FBcUNBLEdBQUdBLFlBQVlBLEdBQUdBLHNFQUFzRUEsR0FBR0EsU0FBU0EsQ0FBQ0EsQ0FDMUpBLElBQUlBLENBQUNBO2dCQUNGQSxjQUFjQSxDQUFDQSxPQUFPQSxDQUFDQSxJQUFJQSxDQUFDQSxDQUFDQTtZQUNqQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7UUFDUEEsQ0FBQ0E7UUFBQUEsQ0FBQ0E7UUFFRkEsRUFBRUEsQ0FBQ0EsQ0FBQ0EsWUFBWUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7WUFDZkEsSUFBSUEsY0FBY0EsR0FBR0EsQ0FBQ0EsQ0FBQ0EsS0FBS0EsRUFBRUEsQ0FBQ0E7WUFDL0JBLFlBQVlBLENBQUNBLElBQUlBLENBQUNBLGNBQWNBLENBQUNBLE9BQU9BLENBQUNBLENBQUNBO1lBQzFDQSxJQUFJQSxDQUFDQSxFQUFFQSxDQUFDQSxRQUFRQSxDQUFDQSxxQ0FBcUNBLEdBQUdBLFlBQVlBLEdBQUdBLHNFQUFzRUEsR0FBR0EsU0FBU0EsQ0FBQ0EsQ0FDMUpBLElBQUlBLENBQUNBO2dCQUNGQSxjQUFjQSxDQUFDQSxPQUFPQSxDQUFDQSxJQUFJQSxDQUFDQSxDQUFDQTtZQUNqQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7UUFDUEEsQ0FBQ0E7UUFBQUEsQ0FBQ0E7UUFFRkEsRUFBRUEsQ0FBQ0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7WUFDTkEsSUFBSUEsVUFBVUEsR0FBR0EsQ0FBQ0EsQ0FBQ0EsS0FBS0EsRUFBRUEsQ0FBQ0E7WUFDM0JBLFlBQVlBLENBQUNBLElBQUlBLENBQUNBLFVBQVVBLENBQUNBLE9BQU9BLENBQUNBLENBQUNBO1lBQ3RDQSxJQUFJQSxDQUFDQSxF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QUNBLENBQ3pCQSxJQUFJQSxDQUFDQSxVQUFDQSxNQUFNQTtnQkFDVEEsUUFBUUEsQ0FBQ0EsT0FBT0EsQ0FBQ0EsUUFBUUEsQ0FBQ0EsQ0FBQ0E7WUFDL0JBLENBQUNBLENBQUNBLENBQUNBO1FBQ1BBLENBQUNBLENBQUNBLENBQUNBO1FBRVBBLE1BQU1BLENBQUNBLFFBQVFBLENBQUNBLE9BQU9BLENBQUNBO0lBQzVCQSxDQUFDQTtJQUNMckIsc0JBQUNBO0FBQURBLENBdDlCQSxBQXM5QkNBLElBQUE7QUF0OUJZLHVCQUFlLEdBQWYsZUFzOUJaLENBQUE7QUFBQSxDQUFDIiwiZmlsZSI6Im1vZHVsZXMvcHJvZHVjdHMvcHJvZHVjdHMuc2VydmljZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vLyA8cmVmZXJlbmNlIHBhdGg9XCIuLi8uLi8uLi90eXBpbmdzL3RzZC5kLnRzXCIgLz5cbi8vLyA8cmVmZXJlbmNlIHBhdGg9XCIuLi9jb25uZWN0aW9uL2Nvbm5lY3Rpb24uc2VydmljZS50c1wiIC8+XG5cbmltcG9ydCBRID0gcmVxdWlyZShcInFcIik7XG5pbXBvcnQgXyA9IHJlcXVpcmUoJ2xvZGFzaCcpO1xuaW1wb3J0IGNvbm5lY3Rpb24gPSByZXF1aXJlKCcuLi9jb25uZWN0aW9uL2Nvbm5lY3Rpb24uc2VydmljZScpXG5pbXBvcnQgYXV0aCA9IHJlcXVpcmUoXCIuLi9hdXRoL2F1dGguc2VydmljZVwiKVxuaW1wb3J0IG1ldGFkYXRhID0gcmVxdWlyZShcIi4uL21ldGFkYXRhL21ldGFkYXRhLnNlcnZpY2VcIik7XG5pbXBvcnQgaW1hZ2VzID0gcmVxdWlyZShcIi4uL2ltYWdlcy9pbWFnZXMuc2VydmljZVwiKTtcbmltcG9ydCBhdmF0YXIgPSByZXF1aXJlKCcuLi9hdXRoL2F2YXRhci5zZXJ2aWNlJyk7XG5cbnZhciBhdXRoU2VydiA9IG5ldyBhdXRoLkF1dGhTZXJ2aWNlKCk7XG52YXIgbWV0YWRhdGFTZXJ2ID0gbmV3IG1ldGFkYXRhLk1ldGFkYXRhU2VydmljZSgpO1xudmFyIGltYWdlc1NlcnYgPSBuZXcgaW1hZ2VzLkltYWdlc1NlcnZpY2UoKTtcblxuZXhwb3J0IGludGVyZmFjZSBJUHJvZHVjdHNTZXJ2aWNlIHtcbiAgICAvLyBHRVRcbiAgICBnZXRQcm9kdWN0c05ldyhwYWdlKTogUS5JUHJvbWlzZTx7fT47XG4gICAgZ2V0UHJvZHVjdHNMaXN0KHBhZ2UpOiBRLklQcm9taXNlPHt9PjtcbiAgICBnZXRQcm9kdWN0QnlJZChwcm9kdWN0SWQpOiBRLklQcm9taXNlPHt9PjtcbiAgICBnZXRQcm9kdWN0c0J5QXV0aG9yKGF1dGhvcklkLCBwYWdlKTogUS5JUHJvbWlzZTx7fT47XG4gICAgZ2V0UHJvZHVjdHNCeVNjaG9vbChzY2hvb2xJZCwgcGFnZSk6IFEuSVByb21pc2U8e30+O1xuICAgIGdldFByb2R1Y3RzQnlTdWJjYXRlZ29yeTAoc3ViY2F0ZWdvcnkwSWQsIHBhZ2UpOiBRLklQcm9taXNlPHt9PjtcbiAgICBnZXRQcm9kdWN0c0J5U3ViY2F0ZWdvcnkxKHN1YmNhdGVnb3J5MUlkLCBwYWdlKTogUS5JUHJvbWlzZTx7fT47XG4gICAgZ2V0UHJvZHVjdHNCeVN0eWxlKHN0eWxlSWQsIHBhZ2UpOiBRLklQcm9taXNlPHt9PjtcbiAgICBnZXRQcm9kdWN0c0J5U2V4KHNleElkLCBwYWdlKTogUS5JUHJvbWlzZTx7fT47XG4gICAgZ2V0UHJvZHVjdHNCeVNlYXJjaChzZWFyY2gsIHBhZ2UpOiBRLklQcm9taXNlPHt9PjtcbiAgICBnZXRQcm9kdWN0c0J5T3B0aW9uc1NlYXJjaChzZWFyY2gsIHN1YmNhdGVnb3J5MCwgc3ViY2F0ZWdvcnkxLCBzdHlsZSwgc2V4LCBzY2hvb2wpOiBRLklQcm9taXNlPHt9PjtcbiAgICBnZXRQcm9kdWN0c1JhbmtpbmdCeUxpa2VzKCk6IFEuSVByb21pc2U8e30+O1xuICAgIGdldFByb2R1Y3RzUmFua2luZ0J5VmlzaXRzKCk6IFEuSVByb21pc2U8e30+O1xuICAgIC8vIFBPU1RcbiAgICBjcmVhdGVQcm9kdWN0KGF1dGhvcklkLCB0aXRsZSwgY29udGVudCxcbiAgICAgICAgICAgICAgICAgICAgaW1nLCBzdWJjYXRlZ29yeTAsIHN1YmNhdGVnb3J5MSwgc3R5bGVzLCBzZXgsIHN1YmltZzEsIHN1YmltZzIsIHN1YmltZzMsIHN1YmltZzQsIHN1YmltZzUsIHN1YmltZzYsXG4gICAgICAgICAgICAgICAgICAgIHByb2R1Y3Rpb25Db3N0LCBzZWxsLCBzZWxsUHJpY2UsIHNlbGxOb3RlLCByZW50YWwsIHJlbnRhbFByaWNlLCByZW50YWxOb3RlKTogUS5JUHJvbWlzZTx7fT47XG4gICAgY3JlYXRlQ29tbWVudChwcm9kdWN0SWQsIGNvb2tpZSwgY29udGVudCk6IFEuSVByb21pc2U8e30+O1xuICAgIC8vIFBVVFxuICAgIHVwZGF0ZVByb2R1Y3QocHJvZHVjdElkLCB0aXRsZSwgY29udGVudCxcbiAgICAgICAgICAgICAgICAgICAgaW1nLCBzdWJjYXRlZ29yeTAsIHN1YmNhdGVnb3J5MSwgc3R5bGVzLCBzZXgsIHN1YmltZzEsIHN1YmltZzIsIHN1YmltZzMsIHN1YmltZzQsIHN1YmltZzUsIHN1YmltZzYsXG4gICAgICAgICAgICAgICAgICAgIHByb2R1Y3Rpb25Db3N0LCBzZWxsLCBzZWxsUHJpY2UsIHNlbGxOb3RlLCByZW50YWwsIHJlbnRhbFByaWNlLCByZW50YWxOb3RlKTogUS5JUHJvbWlzZTx7fT47XG4gICAgLy8gREVMRVRFXG4gICAgZGVsZXRlUHJvZHVjdChub25jZSwgcHJvZHVjdElkKTogUS5JUHJvbWlzZTx7fT47XG5cbiAgICB0ZXN0MVByb2R1Y3RMaXN0KCk6IFEuSVByb21pc2U8e30+O1xuICAgIHRlc3QyUHJvZHVjdExpc3QoKTogUS5JUHJvbWlzZTx7fT47XG59XG5cbnZhciBpbkFycmF5ID0gZnVuY3Rpb24obXlBcnJheSwgbXlWYWx1ZSkge1xuICAgIHZhciBpbkFycmF5ID0gZmFsc2U7XG4gICAgbXlBcnJheS5tYXAoZnVuY3Rpb24oa2V5KSB7XG4gICAgICAgIGlmIChrZXkgPT09IG15VmFsdWUpIHtcbiAgICAgICAgICAgIGluQXJyYXkgPSB0cnVlO1xuICAgICAgICB9XG4gICAgfSk7XG4gICAgcmV0dXJuIGluQXJyYXk7XG59O1xuXG5leHBvcnQgY2xhc3MgUHJvZHVjdHNTZXJ2aWNlIGltcGxlbWVudHMgSVByb2R1Y3RzU2VydmljZSB7XG4gICAgcHJpdmF0ZSBkYiA9IGNvbm5lY3Rpb24uc2VydmljZTtcblxuICAgIGdldFByb2R1Y3RzTmV3KHBhZ2UpOiBRLklQcm9taXNlPHt9PiB7XG4gICAgICAgIHZhciBfbGlzdFByb21pc2UgPSBRLmRlZmVyKCk7XG4gICAgICAgIHRoaXMuZGIucXVlcnkoJ2NvcmUvP2pzb249Z2V0X3JlY2VudF9wb3N0cyZjb3VudD0xMCZwYWdlPScgKyBwYWdlKVxuICAgICAgICAgICAgLnRoZW4oKHJlc3VsdHMpID0+IHtcbiAgICAgICAgICAgICAgICB2YXIgX3Bvc3RBdXRob3JQb3B1bGF0ZSA9IFtdO1xuICAgICAgICAgICAgICAgIHZhciBfcG9zdE1ldGFkYXRhUG9wdWxhdGUgPSBbXTtcblxuICAgICAgICAgICAgICAgIHJlc3VsdHNbJ3Bvc3RzJ10uZm9yRWFjaCgocmVzdWx0KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBhdXRob3JQcm9taXNlID0gUS5kZWZlcigpO1xuICAgICAgICAgICAgICAgICAgICB2YXIgbWV0YWRhdGFQcm9taXNlID0gUS5kZWZlcigpO1xuICAgICAgICAgICAgICAgICAgICBfcG9zdEF1dGhvclBvcHVsYXRlLnB1c2goYXV0aG9yUHJvbWlzZS5wcm9taXNlKTtcbiAgICAgICAgICAgICAgICAgICAgX3Bvc3RNZXRhZGF0YVBvcHVsYXRlLnB1c2gobWV0YWRhdGFQcm9taXNlLnByb21pc2UpO1xuXG4gICAgICAgICAgICAgICAgICAgIC8vIHBvcHVsYXRlIGF1dGhvcidzIGF2YXRhclxuICAgICAgICAgICAgICAgICAgICBhdXRoU2Vydi5nZXRVc2VyQXZhdGFyKHJlc3VsdC5hdXRob3IuaWQsIFwidGh1bWJcIilcbiAgICAgICAgICAgICAgICAgICAgICAgIC50aGVuKChkYXRhKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0WydhdXRob3InXVsnYXZhdGFyJ10gPSBkYXRhWydhdmF0YXInXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhdXRob3JQcm9taXNlLnJlc29sdmUoZGF0YSk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBwb3B1bGF0ZSBtZXRhZGF0YVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1ldGFkYXRhU2Vydi5nZXRQcm9kdWN0TWV0YWRhdGEocmVzdWx0LmlkKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAudGhlbigoZGF0YTIpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdFsnbWV0YWRhdGEnXSA9IGRhdGEyO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbWV0YWRhdGFQcm9taXNlLnJlc29sdmUoZGF0YTIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgIFEuYWxsKF9wb3N0QXV0aG9yUG9wdWxhdGUuY29uY2F0KF9wb3N0TWV0YWRhdGFQb3B1bGF0ZSkpXG4gICAgICAgICAgICAgICAgLnRoZW4oKHZhbHVlcykgPT4ge1xuICAgICAgICAgICAgICAgICAgICBfbGlzdFByb21pc2UucmVzb2x2ZShyZXN1bHRzKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiBfbGlzdFByb21pc2UucHJvbWlzZTtcbiAgICB9XG5cbiAgICBnZXRQcm9kdWN0c0xpc3QocGFnZSk6IFEuSVByb21pc2U8e30+IHtcbiAgICAgICAgdmFyIF9saXN0UHJvbWlzZSA9IFEuZGVmZXIoKTtcbiAgICAgICAgdmFyIGNvdW50ID0gMTA7XG4gICAgICAgIHZhciBhdmF0YXJTZXJ2aWNlID0gbmV3IGF2YXRhci5BdmF0YXJTZXJ2aWNlKCk7XG4gICAgICAgIGNvbnNvbGUubG9nKCdwcm9kdWN0cy5zZXJ2aWNlID4gZ2V0UHJvZHVjdHNMaXN0IHN0YXJ0ICcsIG5ldyBEYXRlKCkpO1xuICAgICAgICB0aGlzLmRiLnF1ZXJ5KCdjb3JlLz9qc29uPWdldF9wb3N0cyZjb3VudD0nICsgY291bnQgKyAnJnBhZ2U9JyArIHBhZ2UpXG4gICAgICAgICAgICAudGhlbigocmVzdWx0cykgPT4ge1xuXG4gICAgICAgICAgICAgICAgZnVuY3Rpb24gc2h1ZmZsZShvKSB7XG4gICAgICAgICAgICAgICAgICAgIGZvciAodmFyIGosIHgsIGkgPSBvLmxlbmd0aDsgaTsgaiA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIGkpLCB4ID0gb1stLWldLCBvW2ldID0gb1tqXSwgb1tqXSA9IHgpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gbztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdmFyIHNodWZmbGVkID0gc2h1ZmZsZShyZXN1bHRzWydwb3N0cyddKTtcblxuICAgICAgICAgICAgICAgIHJlc3VsdHNbJ3Bvc3RzJ10gPSBzaHVmZmxlZDtcbiAgICAgICAgICAgICAgICB2YXIgX3Bvc3RBdXRob3JQb3B1bGF0ZSA9IFtdO1xuICAgICAgICAgICAgICAgIHZhciBfcG9zdE1ldGFkYXRhUG9wdWxhdGUgPSBbXTtcblxuICAgICAgICAgICAgICAgIHJlc3VsdHNbJ3Bvc3RzJ10uZm9yRWFjaCgocmVzdWx0KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBhdXRob3JQcm9taXNlID0gUS5kZWZlcigpO1xuICAgICAgICAgICAgICAgICAgICB2YXIgbWV0YWRhdGFQcm9taXNlID0gUS5kZWZlcigpO1xuICAgICAgICAgICAgICAgICAgICBfcG9zdEF1dGhvclBvcHVsYXRlLnB1c2goYXV0aG9yUHJvbWlzZS5wcm9taXNlKTtcbiAgICAgICAgICAgICAgICAgICAgX3Bvc3RNZXRhZGF0YVBvcHVsYXRlLnB1c2gobWV0YWRhdGFQcm9taXNlLnByb21pc2UpO1xuXG4gICAgICAgICAgICAgICAgICAgIC8vIHBvcHVsYXRlIGF1dGhvcidzIGF2YXRhclxuICAgICAgICAgICAgICAgICAgICBhdmF0YXJTZXJ2aWNlLmdldFVzZXJBdmF0YXIocmVzdWx0LmF1dGhvci5pZCwgJ3RodW1iJylcbiAgICAgICAgICAgICAgICAgICAgICAgIC50aGVuKChkYXRhKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0WydhdXRob3InXVsnYXZhdGFyJ10gPSBkYXRhWydhdmF0YXInXTsgICAgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYXV0aG9yUHJvbWlzZS5yZXNvbHZlKGRhdGEpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIC8vIHBvcHVsYXRlIG1ldGFkYXRhZ2lcbiAgICAgICAgICAgICAgICAgICAgbWV0YWRhdGFTZXJ2LmdldFByb2R1Y3RNZXRhZGF0YShyZXN1bHQuaWQpXG4gICAgICAgICAgICAgICAgICAgICAgICAudGhlbigoZGF0YTIpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXN1bHRbJ21ldGFkYXRhJ10gPSBkYXRhMjtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtZXRhZGF0YVByb21pc2UucmVzb2x2ZShkYXRhMik7XG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICBRLmFsbChfcG9zdEF1dGhvclBvcHVsYXRlLmNvbmNhdChfcG9zdE1ldGFkYXRhUG9wdWxhdGUpKVxuICAgICAgICAgICAgICAgICAgICAudGhlbigodmFsdWVzKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygncHJvZHVjdHMuc2VydmljZSA+IGdldFByb2R1Y3RzTGlzdCBmaW5pc2ggJywgbmV3IERhdGUoKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBfbGlzdFByb21pc2UucmVzb2x2ZShyZXN1bHRzKTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gX2xpc3RQcm9taXNlLnByb21pc2U7XG4gICAgfVxuXG4gICAgZ2V0UHJvZHVjdEJ5SWQocHJvZHVjdElkKTogUS5JUHJvbWlzZTx7fT4ge1xuICAgICAgICB2YXIgX3Byb2R1Y3RQcm9taXNlID0gUS5kZWZlcigpO1xuICAgICAgICB0aGlzLmRiLnF1ZXJ5KCdjb3JlL2dldF9wb3N0Lz9pZD0nICsgcHJvZHVjdElkKVxuICAgICAgICAgICAgLnRoZW4oKHJlc3VsdCkgPT4ge1xuICAgICAgICAgICAgICAgIHZhciBfcHJvbWlzZXMgPSBbXTtcblxuICAgICAgICAgICAgICAgIC8vIHNhdmUgdmlzaXRcbiAgICAgICAgICAgICAgICB2YXIgc2F2ZVZpc2l0UHJvbWlzZSA9IFEuZGVmZXIoKTtcbiAgICAgICAgICAgICAgICBfcHJvbWlzZXMucHVzaChzYXZlVmlzaXRQcm9taXNlLnByb21pc2UpO1xuXG4gICAgICAgICAgICAgICAgdmFyIHZpc2l0UXVlcnkgPSBcIklOU0VSVCBJTlRPIHdwMl9wb3N0X3ZpZXdzIChpZCwgdHlwZSwgcGVyaW9kLCBjb3VudCkgXCIgK1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJWQUxVRVMgKFwiICsgcHJvZHVjdElkICsgXCIsNCwndG90YWwnLDEpIFwiICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiT04gRFVQTElDQVRFIEtFWSBVUERBVEUgY291bnQ9Y291bnQrMVwiO1xuICAgICAgICAgICAgICAgIHRoaXMuZGIucXVlcnlfZGIodmlzaXRRdWVyeSlcbiAgICAgICAgICAgICAgICAgICAgLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgc2F2ZVZpc2l0UHJvbWlzZS5yZXNvbHZlKHVuZGVmaW5lZCk7XG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICAvLyBwb3B1bGF0ZSBwcm9kdWN0IHZpc2l0c1xuICAgICAgICAgICAgICAgIHZhciB2aWV3VmlzaXRzUHJvbWlzZSA9IFEuZGVmZXIoKTtcbiAgICAgICAgICAgICAgICBfcHJvbWlzZXMucHVzaCh2aWV3VmlzaXRzUHJvbWlzZS5wcm9taXNlKTtcblxuICAgICAgICAgICAgICAgIHZhciB2aXNpdFF1ZXJ5ID0gXCJTRUxFQ1QgY291bnQgRlJPTSB3cDJfcG9zdF92aWV3cyBcIiArXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIldIRVJFIGlkPVwiICsgcHJvZHVjdElkICsgXCIgQU5EIHR5cGU9NCBBTkQgcGVyaW9kPSd0b3RhbCdcIjtcbiAgICAgICAgICAgICAgICB0aGlzLmRiLnF1ZXJ5X2RiKHZpc2l0UXVlcnkpXG4gICAgICAgICAgICAgICAgICAgIC50aGVuKChkYXRhKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXN1bHRbJ3Bvc3QnXVsndmlzaXRzJ10gPSBkYXRhWzBdWydjb3VudCddO1xuICAgICAgICAgICAgICAgICAgICAgICAgdmlld1Zpc2l0c1Byb21pc2UucmVzb2x2ZSh1bmRlZmluZWQpO1xuICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgLy8gcG9wdWxhdGUgYXV0aG9yJ3MgYXZhdGFyXG4gICAgICAgICAgICAgICAgYXV0aFNlcnYuZ2V0VXNlckF2YXRhcihyZXN1bHRbJ3Bvc3QnXVsnYXV0aG9yJ11bJ2lkJ10sIFwidGh1bWJcIilcbiAgICAgICAgICAgICAgICAgICAgLnRoZW4oKGRhdGEpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBhdXRob3JQcm9taXNlID0gUS5kZWZlcigpO1xuICAgICAgICAgICAgICAgICAgICAgICAgX3Byb21pc2VzLnB1c2goYXV0aG9yUHJvbWlzZS5wcm9taXNlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdFsncG9zdCddWydhdXRob3InXVsnYXZhdGFyJ10gPSBkYXRhWydhdmF0YXInXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGF1dGhvclByb21pc2UucmVzb2x2ZShkYXRhKTtcbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgIGlmKHJlc3VsdFsncG9zdCddWydjb21tZW50cyddICYmIHJlc3VsdFsncG9zdCddWydjb21tZW50cyddLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgICAgICAvLyBmb3IgZWFjaCBjb21tZW50XG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdFsncG9zdCddWydjb21tZW50cyddLmZvckVhY2goKGNvbW1lbnQpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBjb21tZW50UHJvbWlzZSA9IFEuZGVmZXIoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIF9wcm9taXNlcy5wdXNoKGNvbW1lbnRQcm9taXNlLnByb21pc2UpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBwb3B1bGF0ZSBjb21tZW50cyBhdmF0YXJcbiAgICAgICAgICAgICAgICAgICAgICAgIGF1dGhTZXJ2LmdldFVzZXJBdmF0YXIoY29tbWVudC5hdXRob3IuaWQsIFwidGh1bWJcIilcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAudGhlbigoYXZhdGFyKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbW1lbnRbJ2F1dGhvciddWydhdmF0YXInXSA9IGF2YXRhclsnYXZhdGFyJ107XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbW1lbnRQcm9taXNlLnJlc29sdmUoYXZhdGFyKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAvLyBwb3B1bGF0ZSBtZXRhZGF0YVxuICAgICAgICAgICAgICAgIG1ldGFkYXRhU2Vydi5nZXRQcm9kdWN0TWV0YWRhdGEocmVzdWx0Wydwb3N0J11bJ2lkJ10pXG4gICAgICAgICAgICAgICAgICAgIC50aGVuKChtZXRhZGF0YSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIG1ldGFkYXRhUHJvbWlzZSA9IFEuZGVmZXIoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIF9wcm9taXNlcy5wdXNoKG1ldGFkYXRhUHJvbWlzZS5wcm9taXNlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdFsncG9zdCddWydtZXRhZGF0YSddID0gbWV0YWRhdGE7XG4gICAgICAgICAgICAgICAgICAgICAgICBtZXRhZGF0YVByb21pc2UucmVzb2x2ZShtZXRhZGF0YSk7XG4gICAgICAgICAgICAgICAgICAgIH0pXG5cbiAgICAgICAgICAgICAgICBRLmFsbChfcHJvbWlzZXMpXG4gICAgICAgICAgICAgICAgICAgIC50aGVuKCh2YWx1ZXMpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIF9wcm9kdWN0UHJvbWlzZS5yZXNvbHZlKHJlc3VsdCk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gX3Byb2R1Y3RQcm9taXNlLnByb21pc2U7XG4gICAgfVxuXG4gICAgZ2V0UHJvZHVjdHNCeUF1dGhvcihhdXRob3JJZCk6IFEuSVByb21pc2U8e30+IHtcbiAgICAgICAgdmFyIF9wcm9taXNlID0gUS5kZWZlcigpO1xuICAgICAgICB2YXIgYXZhdGFyU2VydmljZSA9IG5ldyBhdmF0YXIuQXZhdGFyU2VydmljZSgpO1xuXG4gICAgICAgIHRoaXMuZGIucXVlcnkoJ2NvcmUvZ2V0X2F1dGhvcl9wb3N0cy8/Y291bnQ9MTAmaWQ9JyArIGF1dGhvcklkKVxuICAgICAgICAgICAgLnRoZW4oKHJlc3VsdHMpID0+IHtcbiAgICAgICAgICAgICAgICB2YXIgX3Bvc3RBdXRob3JQb3B1bGF0ZSA9IFtdO1xuICAgICAgICAgICAgICAgIHZhciBfcG9zdE1ldGFkYXRhUG9wdWxhdGUgPSBbXTtcbiAgICAgICAgICAgICAgICB2YXIgaGVhZGVyUHJvbWlzZSA9IFEuZGVmZXIoKTtcbiAgICAgICAgICAgICAgICBfcG9zdEF1dGhvclBvcHVsYXRlLnB1c2goaGVhZGVyUHJvbWlzZS5wcm9taXNlKTtcblxuICAgICAgICAgICAgICAgIC8vIHBvcHVsYXRlIGhlYWRlciBhdmF0YXJcbiAgICAgICAgICAgICAgICAgYXZhdGFyU2VydmljZS5nZXRVc2VyQXZhdGFyKHJlc3VsdHNbJ2F1dGhvciddWydpZCddLCBcInRodW1iXCIpXG4gICAgICAgICAgICAgICAgICAgIC50aGVuKChkYXRhKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXN1bHRzWydhdXRob3InXVsnYXZhdGFyJ10gPSBkYXRhWydhdmF0YXInXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGhlYWRlclByb21pc2UucmVzb2x2ZShkYXRhKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdHNbJ3Bvc3RzJ10uZm9yRWFjaCgocmVzdWx0KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGF1dGhvclByb21pc2UgPSBRLmRlZmVyKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIG1ldGFkYXRhUHJvbWlzZSA9IFEuZGVmZXIoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBfcG9zdEF1dGhvclBvcHVsYXRlLnB1c2goYXV0aG9yUHJvbWlzZS5wcm9taXNlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBfcG9zdE1ldGFkYXRhUG9wdWxhdGUucHVzaChtZXRhZGF0YVByb21pc2UucHJvbWlzZSk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBwb3B1bGF0ZSBhdXRob3IncyBhdmF0YXJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXN1bHRbJ2F1dGhvciddWydhdmF0YXInXSA9IGRhdGFbJ2F2YXRhciddO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGF1dGhvclByb21pc2UucmVzb2x2ZShkYXRhWydhdmF0YXInXSk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBwb3B1bGF0ZSBtZXRhZGF0YVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1ldGFkYXRhU2Vydi5nZXRQcm9kdWN0TWV0YWRhdGEocmVzdWx0LmlkKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAudGhlbigoZGF0YTIpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdFsnbWV0YWRhdGEnXSA9IGRhdGEyO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbWV0YWRhdGFQcm9taXNlLnJlc29sdmUoZGF0YTIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pOyAgICBcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgUS5hbGwoX3Bvc3RBdXRob3JQb3B1bGF0ZS5jb25jYXQoX3Bvc3RNZXRhZGF0YVBvcHVsYXRlKSlcbiAgICAgICAgICAgICAgICAgICAgLnRoZW4oKHZhbHVlcykgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgX3Byb21pc2UucmVzb2x2ZShyZXN1bHRzKTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIF9wcm9taXNlLnByb21pc2U7XG4gICAgfVxuXG4gICAgZ2V0UHJvZHVjdHNCeVNjaG9vbChzY2hvb2xJZCwgcGFnZSk6IFEuSVByb21pc2U8e30+IHtcbiAgICAgICAgdmFyIF9saXN0UHJvbWlzZSA9IFEuZGVmZXIoKTtcbiAgICAgICAgdmFyIF9wb3N0QXV0aG9yUG9wdWxhdGUgPSBbXTtcbiAgICAgICAgdmFyIF9wb3N0TWV0YWRhdGFQb3B1bGF0ZSA9IFtdO1xuXG4gICAgICAgIHRoaXMuZGIucXVlcnkoJ2NvcmUvP2pzb249Z2V0X3Bvc3RzJmNvdW50PTIwMCcpXG4gICAgICAgICAgICAudGhlbigocmVzdWx0cykgPT4ge1xuICAgICAgICAgICAgICAgIHZhciBwb3N0cyA9IHJlc3VsdHNbJ3Bvc3RzJ107XG5cbiAgICAgICAgICAgICAgICB0aGlzLmRiLnF1ZXJ5X2RiKFwiU0VMRUNUIHVzZXJfaWQgRlJPTSB3cDJfYnBfeHByb2ZpbGVfZGF0YSBXSEVSRSB2YWx1ZT0nXCIgKyBzY2hvb2xJZCArIFwiJyBBTkQgZmllbGRfaWQ9NFwiKVxuICAgICAgICAgICAgICAgICAgICAudGhlbigoZGF0YSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHVzZXJJZHMgPSBbXVxuICAgICAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgaSBpbiBkYXRhKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdXNlcklkcy5wdXNoKGRhdGFbaV0udXNlcl9pZCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBzY2hvb2xQb3N0cyA9IFtdO1xuICAgICAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgaiBpbiBwb3N0cykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpbkFycmF5KHVzZXJJZHMsIHBvc3RzW2pdLmF1dGhvci5pZCkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2Nob29sUG9zdHMucHVzaChwb3N0c1tqXSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIHBhZ2luYXRpb25cbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBjb3VudCA9IDEwO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0c1snY291bnRfdG90YWwnXSA9IHNjaG9vbFBvc3RzLmxlbmd0aDtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdHNbJ3BhZ2VzJ10gPSBNYXRoLmZsb29yKHNjaG9vbFBvc3RzLmxlbmd0aCAvIGNvdW50KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChzY2hvb2xQb3N0cy5sZW5ndGggPiBjb3VudC0xKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGZyb20gPSAtY291bnQgKyAoY291bnQgKiBwYWdlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgdG8gPSAwICsgKGNvdW50ICogcGFnZSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzY2hvb2xQb3N0cyA9IHNjaG9vbFBvc3RzLnNsaWNlKGZyb20sIHRvKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdHNbJ3Bvc3RzJ10gPSBzY2hvb2xQb3N0cztcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdHNbJ3NjaG9vbCddID0gc2Nob29sSWQ7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXN1bHRzWydjb3VudCddID0gc2Nob29sUG9zdHMubGVuZ3RoO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICByZXN1bHRzWydwb3N0cyddLmZvckVhY2goKHJlc3VsdCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBhdXRob3JQcm9taXNlID0gUS5kZWZlcigpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBtZXRhZGF0YVByb21pc2UgPSBRLmRlZmVyKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgX3Bvc3RBdXRob3JQb3B1bGF0ZS5wdXNoKGF1dGhvclByb21pc2UucHJvbWlzZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgX3Bvc3RNZXRhZGF0YVBvcHVsYXRlLnB1c2gobWV0YWRhdGFQcm9taXNlLnByb21pc2UpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gcG9wdWxhdGUgYXV0aG9yJ3MgYXZhdGFyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYXV0aFNlcnYuZ2V0VXNlckF2YXRhcihyZXN1bHQuYXV0aG9yLmlkLCBcInRodW1iXCIpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC50aGVuKChkYXRhKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXN1bHRbJ2F1dGhvciddWydhdmF0YXInXSA9IGRhdGFbJ2F2YXRhciddO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXV0aG9yUHJvbWlzZS5yZXNvbHZlKGRhdGEpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBwb3B1bGF0ZSBtZXRhZGF0YWdpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtZXRhZGF0YVNlcnYuZ2V0UHJvZHVjdE1ldGFkYXRhKHJlc3VsdC5pZClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAudGhlbigoZGF0YTIpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0WydtZXRhZGF0YSddID0gZGF0YTI7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1ldGFkYXRhUHJvbWlzZS5yZXNvbHZlKGRhdGEyKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIFEuYWxsKF9wb3N0QXV0aG9yUG9wdWxhdGUuY29uY2F0KF9wb3N0TWV0YWRhdGFQb3B1bGF0ZSkpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLnRoZW4oKHZhbHVlcykgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfbGlzdFByb21pc2UucmVzb2x2ZShyZXN1bHRzKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIH0pXG4gICAgICAgIHJldHVybiBfbGlzdFByb21pc2UucHJvbWlzZTtcbiAgICB9XG5cbiAgICBnZXRQcm9kdWN0c0J5T3B0aW9uc1NlYXJjaChzZWFyY2gsIHN1YmNhdGVnb3J5MCwgc3ViY2F0ZWdvcnkxLCBzdHlsZSwgc2V4KTogUS5JUHJvbWlzZTx7fT4ge1xuICAgICAgICB2YXIgX3Byb21pc2UgPSBRLmRlZmVyKCk7XG4gICAgICAgIGlmIChzZWFyY2ggPT0gJ251bGwnKSBzZWFyY2ggPSAnJztcbiAgICAgICAgaWYgKHN1YmNhdGVnb3J5MCA9PSAnbnVsbCcpIHNlYXJjaCA9ICcnO1xuICAgICAgICBpZiAoc3ViY2F0ZWdvcnkxID09ICdudWxsJykgc2VhcmNoID0gJyc7XG4gICAgICAgIGlmIChzdHlsZSA9PSAnbnVsbCcpIHNlYXJjaCA9ICcnO1xuICAgICAgICBpZiAoc2V4ID09ICdudWxsJykgc2VhcmNoID0gJyc7XG4gICAgICAgIHZhciBxdWVyeSA9IFwiU0VMRUNUIHBvc3RfZGF0YS5wb3N0X2lkLCBwb3N0X2RhdGEudGl0bGUsIHBvc3RfZGF0YS5kYXRlLCBwb3N0X2RhdGEuYXV0aG9yLCBcIiArXG4gICAgICAgICAgICAgICAgICAgIFwiaW1hZ2UuaW1hZ2UsIHN1YmNhdGVnb3J5MC5zdWJjYXRlZ29yeTAsIHN1YmNhdGVnb3J5MS5zdWJjYXRlZ29yeTEsIHN0eWxlLnN0eWxlLCBzZXguc2V4IFwiICtcbiAgICAgICAgICAgICAgICAgICAgXCJGUk9NIFwiICtcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiKFNFTEVDVCB3cDJfcG9zdHMuSUQgQVMgcG9zdF9pZCwgXCIgK1xuICAgICAgICAgICAgICAgICAgICAgICAgXCJ3cDJfcG9zdHMucG9zdF90aXRsZSBBUyB0aXRsZSwgXCIgK1xuICAgICAgICAgICAgICAgICAgICAgICAgXCJ3cDJfcG9zdHMucG9zdF9kYXRlX2dtdCBBUyBkYXRlLCBcIiArXG4gICAgICAgICAgICAgICAgICAgICAgICBcIndwMl91c2Vycy5kaXNwbGF5X25hbWUgQVMgYXV0aG9yLCBcIiArXG4gICAgICAgICAgICAgICAgICAgICAgICBcIndwMl91c2Vycy5JRCBBUyBhdXRob3JfaWQgXCIgK1xuICAgICAgICAgICAgICAgICAgICAgICAgXCJGUk9NIGB3cDJfcG9zdHNgIFwiICtcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiSk9JTiB3cDJfdXNlcnMgXCIgK1xuICAgICAgICAgICAgICAgICAgICAgICAgXCJPTiB3cDJfcG9zdHMucG9zdF9hdXRob3IgPSB3cDJfdXNlcnMuSUQgXCIgK1xuICAgICAgICAgICAgICAgICAgICAgICAgXCJXSEVSRSB3cDJfcG9zdHMucG9zdF90aXRsZSBMSUtFICclXCIgKyBzZWFyY2ggKyBcIiUnIFwiICtcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiKSBwb3N0X2RhdGEgXCIgK1xuICAgICAgICAgICAgICAgICAgICBcIkpPSU4gXCIgK1xuICAgICAgICAgICAgICAgICAgICAgICAgXCIoU0VMRUNUIHdwMl9wb3N0bWV0YS5wb3N0X2lkLCBcIiArXG4gICAgICAgICAgICAgICAgICAgICAgICBcIndwMl9wb3N0bWV0YS5tZXRhX3ZhbHVlIEFTIGltYWdlIFwiICtcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiRlJPTSB3cDJfcG9zdG1ldGEgXCIgK1xuICAgICAgICAgICAgICAgICAgICAgICAgXCJXSEVSRSB3cDJfcG9zdG1ldGEubWV0YV9rZXkgPSAnc29mYmFja2VuZF9fc29mX3dvcmtfbWV0YV9fcG9zdEltYWdlJyBcIiArXG4gICAgICAgICAgICAgICAgICAgICAgICBcIikgaW1hZ2UgXCIgK1xuICAgICAgICAgICAgICAgICAgICBcIk9OIHBvc3RfZGF0YS5wb3N0X2lkID0gaW1hZ2UucG9zdF9pZCBcIiArXG4gICAgICAgICAgICAgICAgICAgIFwiSk9JTiBcIiArXG4gICAgICAgICAgICAgICAgICAgICAgICBcIihTRUxFQ1Qgd3AyX3Bvc3RtZXRhLnBvc3RfaWQsIFwiICtcbiAgICAgICAgICAgICAgICAgICAgICAgIFwid3AyX3Bvc3RtZXRhLm1ldGFfdmFsdWUgQVMgc3ViY2F0ZWdvcnkwIFwiICtcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiRlJPTSB3cDJfcG9zdG1ldGEgXCIgK1xuICAgICAgICAgICAgICAgICAgICAgICAgXCJXSEVSRSB3cDJfcG9zdG1ldGEubWV0YV9rZXkgPSAnc29mYmFja2VuZF9fc29mX3dvcmtfbWV0YV9fY2F0ZWdvcnlfMCcgXCIgK1xuICAgICAgICAgICAgICAgICAgICAgICAgXCJBTkQgd3AyX3Bvc3RtZXRhLm1ldGFfdmFsdWUgTElLRSAnJVwiICsgc3ViY2F0ZWdvcnkwICsgXCIlJyBcIiArXG4gICAgICAgICAgICAgICAgICAgICAgICBcIikgc3ViY2F0ZWdvcnkwIFwiICtcbiAgICAgICAgICAgICAgICAgICAgXCJPTiBwb3N0X2RhdGEucG9zdF9pZCA9IHN1YmNhdGVnb3J5MC5wb3N0X2lkIFwiICtcbiAgICAgICAgICAgICAgICAgICAgXCJKT0lOIFwiICtcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiKFNFTEVDVCB3cDJfcG9zdG1ldGEucG9zdF9pZCwgXCIgK1xuICAgICAgICAgICAgICAgICAgICAgICAgXCJ3cDJfcG9zdG1ldGEubWV0YV92YWx1ZSBBUyBzdWJjYXRlZ29yeTEgXCIgK1xuICAgICAgICAgICAgICAgICAgICAgICAgXCJGUk9NIHdwMl9wb3N0bWV0YSBcIiArXG4gICAgICAgICAgICAgICAgICAgICAgICBcIldIRVJFIHdwMl9wb3N0bWV0YS5tZXRhX2tleSA9ICdzb2ZiYWNrZW5kX19zb2Zfd29ya19tZXRhX19jYXRlZ29yeV8xJyBcIiArXG4gICAgICAgICAgICAgICAgICAgICAgICBcIkFORCB3cDJfcG9zdG1ldGEubWV0YV92YWx1ZSBMSUtFICclXCIgKyBzdWJjYXRlZ29yeTEgKyBcIiUnIFwiICtcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiKSBzdWJjYXRlZ29yeTEgXCIgK1xuICAgICAgICAgICAgICAgICAgICBcIk9OIHBvc3RfZGF0YS5wb3N0X2lkID0gc3ViY2F0ZWdvcnkxLnBvc3RfaWQgXCIgK1xuICAgICAgICAgICAgICAgICAgICBcIkpPSU4gXCIgK1xuICAgICAgICAgICAgICAgICAgICAgICAgXCIoU0VMRUNUIHdwMl9wb3N0bWV0YS5wb3N0X2lkLCBcIiArXG4gICAgICAgICAgICAgICAgICAgICAgICBcIndwMl9wb3N0bWV0YS5tZXRhX3ZhbHVlIEFTIHN0eWxlIFwiICtcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiRlJPTSB3cDJfcG9zdG1ldGEgXCIgK1xuICAgICAgICAgICAgICAgICAgICAgICAgXCJXSEVSRSB3cDJfcG9zdG1ldGEubWV0YV9rZXkgPSAnc29mYmFja2VuZF9fc29mX3dvcmtfbWV0YV9fc3R5bGUnIFwiICtcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiQU5EIHdwMl9wb3N0bWV0YS5tZXRhX3ZhbHVlIExJS0UgJyVcIiArIHN0eWxlICsgXCIlJyBcIiArXG4gICAgICAgICAgICAgICAgICAgICAgICBcIikgc3R5bGUgXCIgK1xuICAgICAgICAgICAgICAgICAgICBcIk9OIHBvc3RfZGF0YS5wb3N0X2lkID0gc3R5bGUucG9zdF9pZCBcIiArXG4gICAgICAgICAgICAgICAgICAgIFwiSk9JTiBcIiArXG4gICAgICAgICAgICAgICAgICAgICAgICBcIihTRUxFQ1Qgd3AyX3Bvc3RtZXRhLnBvc3RfaWQsIFwiICtcbiAgICAgICAgICAgICAgICAgICAgICAgIFwid3AyX3Bvc3RtZXRhLm1ldGFfdmFsdWUgQVMgc2V4IFwiICtcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiRlJPTSB3cDJfcG9zdG1ldGEgXCIgK1xuICAgICAgICAgICAgICAgICAgICAgICAgXCJXSEVSRSB3cDJfcG9zdG1ldGEubWV0YV9rZXkgPSAnc29mYmFja2VuZF9fc29mX3dvcmtfbWV0YV9fc2V4JyBcIiArXG4gICAgICAgICAgICAgICAgICAgICAgICBcIkFORCB3cDJfcG9zdG1ldGEubWV0YV92YWx1ZSBMSUtFICclXCIgKyBzZXggKyBcIiUnIFwiICtcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiKSBzZXggXCIgK1xuICAgICAgICAgICAgICAgICAgICBcIk9OIHBvc3RfZGF0YS5wb3N0X2lkID0gc2V4LnBvc3RfaWQgXCIgK1xuICAgICAgICAgICAgICAgICAgICBcIk9SREVSIEJZIHBvc3RfaWQgXCIgK1xuICAgICAgICAgICAgICAgICAgICBcIkxJTUlUIDEwXCI7XG4gICAgICAgIHRoaXMuZGIucXVlcnlfZGIocXVlcnkpXG4gICAgICAgIC50aGVuKChkYXRhKSA9PiB7XG4gICAgICAgICAgICB2YXIgZGF0YUpzb24gPSBKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KGRhdGEpKTtcblxuICAgICAgICAgICAgdmFyIF9wb3N0QXV0aG9yUG9wdWxhdGUgPSBbXTtcbiAgICAgICAgICAgIHZhciBfcG9zdE1ldGFkYXRhUG9wdWxhdGUgPSBbXTtcblxuICAgICAgICAgICAgZGF0YUpzb24uZm9yRWFjaCgocmVzdWx0KSA9PiB7XG4gICAgICAgICAgICAgICAgdmFyIGF1dGhvclByb21pc2UgPSBRLmRlZmVyKCk7XG4gICAgICAgICAgICAgICAgdmFyIG1ldGFkYXRhUHJvbWlzZSA9IFEuZGVmZXIoKTtcbiAgICAgICAgICAgICAgICBfcG9zdEF1dGhvclBvcHVsYXRlLnB1c2goYXV0aG9yUHJvbWlzZS5wcm9taXNlKTtcbiAgICAgICAgICAgICAgICBfcG9zdE1ldGFkYXRhUG9wdWxhdGUucHVzaChtZXRhZGF0YVByb21pc2UucHJvbWlzZSk7XG5cbiAgICAgICAgICAgICAgICAvLyBwb3B1bGF0ZSBhdXRob3IncyBhdmF0YXJcbiAgICAgICAgICAgICAgICBhdXRoU2Vydi5nZXRVc2VyQXZhdGFyKHJlc3VsdFsnYXV0aG9yX2lkJ10sIFwidGh1bWJcIilcbiAgICAgICAgICAgICAgICAgICAgLnRoZW4oKGRhdGEpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdFsnYXV0aG9yX2F2YXRhciddID0gZGF0YVsnYXZhdGFyJ107XG4gICAgICAgICAgICAgICAgICAgICAgICBhdXRob3JQcm9taXNlLnJlc29sdmUoZGF0YSk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIHBvcHVsYXRlIG1ldGFkYXRhXG4gICAgICAgICAgICAgICAgICAgICAgICBtZXRhZGF0YVNlcnYuZ2V0UHJvZHVjdE1ldGFkYXRhKHJlc3VsdC5wb3N0X2lkKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC50aGVuKChkYXRhMikgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXN1bHRbJ21ldGFkYXRhJ10gPSBkYXRhMjtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbWV0YWRhdGFQcm9taXNlLnJlc29sdmUoZGF0YTIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgUS5hbGwoX3Bvc3RBdXRob3JQb3B1bGF0ZS5jb25jYXQoX3Bvc3RNZXRhZGF0YVBvcHVsYXRlKSlcbiAgICAgICAgICAgICAgICAudGhlbigodmFsdWVzKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIF9wcm9taXNlLnJlc29sdmUoZGF0YUpzb24pO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICB9KVxuICAgICAgICByZXR1cm4gX3Byb21pc2UucHJvbWlzZTtcbiAgICB9XG5cbiAgICBnZXRQcm9kdWN0c0J5U3ViY2F0ZWdvcnkwKHN1YmNhdGVnb3J5MElkLCBwYWdlKTogUS5JUHJvbWlzZTx7fT4gwqB7XG4gICAgICAgIHZhciBfbGlzdFByb21pc2UgPSBRLmRlZmVyKCk7XG4gICAgICAgIHZhciBfcG9zdEF1dGhvclBvcHVsYXRlID0gW107XG4gICAgICAgIHZhciBfcG9zdE1ldGFkYXRhUG9wdWxhdGUgPSBbXTtcblxuICAgICAgICB0aGlzLmRiLnF1ZXJ5KCdjb3JlLz9qc29uPWdldF9wb3N0cyZjb3VudD0yMDAnKVxuICAgICAgICAgICAgLnRoZW4oKHJlc3VsdHMpID0+IHtcbiAgICAgICAgICAgICAgICB2YXIgcG9zdHMgPSByZXN1bHRzWydwb3N0cyddO1xuXG4gICAgICAgICAgICAgICAgdmFyIHN1YmNhdGVnb3J5MFBvc3RzID0gW107XG4gICAgICAgICAgICAgICAgZm9yICh2YXIgaSBpbiBwb3N0cykge1xuXG4gICAgICAgICAgICAgICAgICAgIGlmIChwb3N0c1tpXVsnY3VzdG9tX2ZpZWxkcyddWydzb2ZiYWNrZW5kX19zb2Zfd29ya19tZXRhX19jYXRlZ29yeV8wJ10gPT0gc3ViY2F0ZWdvcnkwSWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHN1YmNhdGVnb3J5MFBvc3RzLnB1c2gocG9zdHNbaV0pO1xuICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgICAgICAvLyBwYWdpbmF0aW9uXG4gICAgICAgICAgICAgICAgdmFyIGNvdW50ID0gMTA7XG4gICAgICAgICAgICAgICAgcmVzdWx0c1snY291bnRfdG90YWwnXSA9IHN1YmNhdGVnb3J5MFBvc3RzLmxlbmd0aDtcbiAgICAgICAgICAgICAgICByZXN1bHRzWydwYWdlcyddID0gTWF0aC5mbG9vcihzdWJjYXRlZ29yeTBQb3N0cy5sZW5ndGggLyBjb3VudCk7XG4gICAgICAgICAgICAgICAgaWYgKHN1YmNhdGVnb3J5MFBvc3RzLmxlbmd0aCA+IGNvdW50LTEpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGZyb20gPSAtY291bnQgKyAoY291bnQgKiBwYWdlKTtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHRvID0gMCArIChjb3VudCAqIHBhZ2UpXG4gICAgICAgICAgICAgICAgICAgIHN1YmNhdGVnb3J5MFBvc3RzID0gc3ViY2F0ZWdvcnkwUG9zdHMuc2xpY2UoZnJvbSwgdG8pO1xuICAgICAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgICAgICByZXN1bHRzWydwb3N0cyddID0gc3ViY2F0ZWdvcnkwUG9zdHM7XG4gICAgICAgICAgICAgICAgcmVzdWx0c1snc3ViY2F0ZWdvcnkwJ10gPSBzdWJjYXRlZ29yeTBJZDtcbiAgICAgICAgICAgICAgICByZXN1bHRzWydjb3VudCddID0gc3ViY2F0ZWdvcnkwUG9zdHMubGVuZ3RoO1xuXG4gICAgICAgICAgICAgICAgcmVzdWx0c1sncG9zdHMnXS5mb3JFYWNoKChyZXN1bHQpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGF1dGhvclByb21pc2UgPSBRLmRlZmVyKCk7XG4gICAgICAgICAgICAgICAgICAgIHZhciBtZXRhZGF0YVByb21pc2UgPSBRLmRlZmVyKCk7XG4gICAgICAgICAgICAgICAgICAgIF9wb3N0QXV0aG9yUG9wdWxhdGUucHVzaChhdXRob3JQcm9taXNlLnByb21pc2UpO1xuICAgICAgICAgICAgICAgICAgICBfcG9zdE1ldGFkYXRhUG9wdWxhdGUucHVzaChtZXRhZGF0YVByb21pc2UucHJvbWlzZSk7XG5cbiAgICAgICAgICAgICAgICAgICAgLy8gcG9wdWxhdGUgYXV0aG9yJ3MgYXZhdGFyXG4gICAgICAgICAgICAgICAgICAgIGF1dGhTZXJ2LmdldFVzZXJBdmF0YXIocmVzdWx0LmF1dGhvci5pZCwgXCJ0aHVtYlwiKVxuICAgICAgICAgICAgICAgICAgICAgICAgLnRoZW4oKGRhdGEpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXN1bHRbJ2F1dGhvciddWydhdmF0YXInXSA9IGRhdGFbJ2F2YXRhciddO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGF1dGhvclByb21pc2UucmVzb2x2ZShkYXRhKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIHBvcHVsYXRlIG1ldGFkYXRhZ2lcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtZXRhZGF0YVNlcnYuZ2V0UHJvZHVjdE1ldGFkYXRhKHJlc3VsdC5pZClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnRoZW4oKGRhdGEyKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXN1bHRbJ21ldGFkYXRhJ10gPSBkYXRhMjtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1ldGFkYXRhUHJvbWlzZS5yZXNvbHZlKGRhdGEyKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICBRLmFsbChfcG9zdEF1dGhvclBvcHVsYXRlLmNvbmNhdChfcG9zdE1ldGFkYXRhUG9wdWxhdGUpKVxuICAgICAgICAgICAgICAgICAgICAudGhlbigodmFsdWVzKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBfbGlzdFByb21pc2UucmVzb2x2ZShyZXN1bHRzKTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KVxuICAgICAgICByZXR1cm4gX2xpc3RQcm9taXNlLnByb21pc2U7XG4gICAgfVxuXG4gICAgZ2V0UHJvZHVjdHNCeVN1YmNhdGVnb3J5MShzdWJjYXRlZ29yeTFJZCwgcGFnZSk6IFEuSVByb21pc2U8e30+IMKge1xuICAgICAgICB2YXIgX2xpc3RQcm9taXNlID0gUS5kZWZlcigpO1xuICAgICAgICB2YXIgX3Bvc3RBdXRob3JQb3B1bGF0ZSA9IFtdO1xuICAgICAgICB2YXIgX3Bvc3RNZXRhZGF0YVBvcHVsYXRlID0gW107XG5cbiAgICAgICAgdGhpcy5kYi5xdWVyeSgnY29yZS8/anNvbj1nZXRfcG9zdHMmY291bnQ9MjAwJylcbiAgICAgICAgICAgIC50aGVuKChyZXN1bHRzKSA9PiB7XG4gICAgICAgICAgICAgICAgdmFyIHBvc3RzID0gcmVzdWx0c1sncG9zdHMnXTtcblxuICAgICAgICAgICAgICAgIHZhciBzdWJjYXRlZ29yeTFQb3N0cyA9IFtdO1xuICAgICAgICAgICAgICAgIGZvciAodmFyIGkgaW4gcG9zdHMpIHtcblxuICAgICAgICAgICAgICAgICAgICBpZiAocG9zdHNbaV1bJ2N1c3RvbV9maWVsZHMnXVsnc29mYmFja2VuZF9fc29mX3dvcmtfbWV0YV9fY2F0ZWdvcnlfMSddID09IHN1YmNhdGVnb3J5MUlkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzdWJjYXRlZ29yeTFQb3N0cy5wdXNoKHBvc3RzW2ldKTtcbiAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAgICAgLy8gcGFnaW5hdGlvblxuICAgICAgICAgICAgICAgIHZhciBjb3VudCA9IDEwO1xuICAgICAgICAgICAgICAgIHJlc3VsdHNbJ2NvdW50X3RvdGFsJ10gPSBzdWJjYXRlZ29yeTFQb3N0cy5sZW5ndGg7XG4gICAgICAgICAgICAgICAgcmVzdWx0c1sncGFnZXMnXSA9IE1hdGguZmxvb3Ioc3ViY2F0ZWdvcnkxUG9zdHMubGVuZ3RoIC8gY291bnQpO1xuICAgICAgICAgICAgICAgIGlmIChzdWJjYXRlZ29yeTFQb3N0cy5sZW5ndGggPiBjb3VudC0xKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBmcm9tID0gLWNvdW50ICsgKGNvdW50ICogcGFnZSk7XG4gICAgICAgICAgICAgICAgICAgIHZhciB0byA9IDAgKyAoY291bnQgKiBwYWdlKVxuICAgICAgICAgICAgICAgICAgICBzdWJjYXRlZ29yeTFQb3N0cyA9IHN1YmNhdGVnb3J5MVBvc3RzLnNsaWNlKGZyb20sIHRvKTtcbiAgICAgICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAgICAgcmVzdWx0c1sncG9zdHMnXSA9IHN1YmNhdGVnb3J5MVBvc3RzO1xuICAgICAgICAgICAgICAgIHJlc3VsdHNbJ3N1YmNhdGVnb3J5MSddID0gc3ViY2F0ZWdvcnkxSWQ7XG4gICAgICAgICAgICAgICAgcmVzdWx0c1snY291bnQnXSA9IHN1YmNhdGVnb3J5MVBvc3RzLmxlbmd0aDtcblxuICAgICAgICAgICAgICAgIHJlc3VsdHNbJ3Bvc3RzJ10uZm9yRWFjaCgocmVzdWx0KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBhdXRob3JQcm9taXNlID0gUS5kZWZlcigpO1xuICAgICAgICAgICAgICAgICAgICB2YXIgbWV0YWRhdGFQcm9taXNlID0gUS5kZWZlcigpO1xuICAgICAgICAgICAgICAgICAgICBfcG9zdEF1dGhvclBvcHVsYXRlLnB1c2goYXV0aG9yUHJvbWlzZS5wcm9taXNlKTtcbiAgICAgICAgICAgICAgICAgICAgX3Bvc3RNZXRhZGF0YVBvcHVsYXRlLnB1c2gobWV0YWRhdGFQcm9taXNlLnByb21pc2UpO1xuXG4gICAgICAgICAgICAgICAgICAgIC8vIHBvcHVsYXRlIGF1dGhvcidzIGF2YXRhclxuICAgICAgICAgICAgICAgICAgICBhdXRoU2Vydi5nZXRVc2VyQXZhdGFyKHJlc3VsdC5hdXRob3IuaWQsIFwidGh1bWJcIilcbiAgICAgICAgICAgICAgICAgICAgICAgIC50aGVuKChkYXRhKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0WydhdXRob3InXVsnYXZhdGFyJ10gPSBkYXRhWydhdmF0YXInXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhdXRob3JQcm9taXNlLnJlc29sdmUoZGF0YSk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBwb3B1bGF0ZSBtZXRhZGF0YWdpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbWV0YWRhdGFTZXJ2LmdldFByb2R1Y3RNZXRhZGF0YShyZXN1bHQuaWQpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC50aGVuKChkYXRhMikgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0WydtZXRhZGF0YSddID0gZGF0YTI7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtZXRhZGF0YVByb21pc2UucmVzb2x2ZShkYXRhMik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgUS5hbGwoX3Bvc3RBdXRob3JQb3B1bGF0ZS5jb25jYXQoX3Bvc3RNZXRhZGF0YVBvcHVsYXRlKSlcbiAgICAgICAgICAgICAgICAgICAgLnRoZW4oKHZhbHVlcykgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgX2xpc3RQcm9taXNlLnJlc29sdmUocmVzdWx0cyk7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgcmV0dXJuIF9saXN0UHJvbWlzZS5wcm9taXNlO1xuICAgIH1cblxuICAgIGdldFByb2R1Y3RzQnlTdHlsZShzdHlsZUlkLCBwYWdlKTogUS5JUHJvbWlzZTx7fT4gwqB7XG4gICAgICAgIHZhciBfbGlzdFByb21pc2UgPSBRLmRlZmVyKCk7XG4gICAgICAgIHZhciBfcG9zdEF1dGhvclBvcHVsYXRlID0gW107XG4gICAgICAgIHZhciBfcG9zdE1ldGFkYXRhUG9wdWxhdGUgPSBbXTtcblxuICAgICAgICB0aGlzLmRiLnF1ZXJ5KCdjb3JlLz9qc29uPWdldF9wb3N0cyZjb3VudD0yMDAnKVxuICAgICAgICAgICAgLnRoZW4oKHJlc3VsdHMpID0+IHtcbiAgICAgICAgICAgICAgICB2YXIgcG9zdHMgPSByZXN1bHRzWydwb3N0cyddO1xuXG4gICAgICAgICAgICAgICAgdmFyIHN0eWxlUG9zdHMgPSBbXTtcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBpIGluIHBvc3RzKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKHBvc3RzW2ldWydjdXN0b21fZmllbGRzJ11bJ3NvZmJhY2tlbmRfX3NvZl93b3JrX21ldGFfX3N0eWxlJ10gPT0gc3R5bGVJZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgc3R5bGVQb3N0cy5wdXNoKHBvc3RzW2ldKTtcbiAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAgICAgLy8gcGFnaW5hdGlvblxuICAgICAgICAgICAgICAgIHZhciBjb3VudCA9IDEwO1xuICAgICAgICAgICAgICAgIHJlc3VsdHNbJ2NvdW50X3RvdGFsJ10gPSBzdHlsZVBvc3RzLmxlbmd0aDtcbiAgICAgICAgICAgICAgICByZXN1bHRzWydwYWdlcyddID0gTWF0aC5mbG9vcihzdHlsZVBvc3RzLmxlbmd0aCAvIGNvdW50KTtcbiAgICAgICAgICAgICAgICBpZiAoc3R5bGVQb3N0cy5sZW5ndGggPiBjb3VudC0xKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBmcm9tID0gLWNvdW50ICsgKGNvdW50ICogcGFnZSk7XG4gICAgICAgICAgICAgICAgICAgIHZhciB0byA9IDAgKyAoY291bnQgKiBwYWdlKVxuICAgICAgICAgICAgICAgICAgICBzdHlsZVBvc3RzID0gc3R5bGVQb3N0cy5zbGljZShmcm9tLCB0byk7XG4gICAgICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgICAgIHJlc3VsdHNbJ3Bvc3RzJ10gPSBzdHlsZVBvc3RzO1xuICAgICAgICAgICAgICAgIHJlc3VsdHNbJ3N0eWxlJ10gPSBzdHlsZUlkO1xuICAgICAgICAgICAgICAgIHJlc3VsdHNbJ2NvdW50J10gPSBzdHlsZVBvc3RzLmxlbmd0aDtcblxuICAgICAgICAgICAgICAgIHJlc3VsdHNbJ3Bvc3RzJ10uZm9yRWFjaCgocmVzdWx0KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBhdXRob3JQcm9taXNlID0gUS5kZWZlcigpO1xuICAgICAgICAgICAgICAgICAgICB2YXIgbWV0YWRhdGFQcm9taXNlID0gUS5kZWZlcigpO1xuICAgICAgICAgICAgICAgICAgICBfcG9zdEF1dGhvclBvcHVsYXRlLnB1c2goYXV0aG9yUHJvbWlzZS5wcm9taXNlKTtcbiAgICAgICAgICAgICAgICAgICAgX3Bvc3RNZXRhZGF0YVBvcHVsYXRlLnB1c2gobWV0YWRhdGFQcm9taXNlLnByb21pc2UpO1xuXG4gICAgICAgICAgICAgICAgICAgIC8vIHBvcHVsYXRlIGF1dGhvcidzIGF2YXRhclxuICAgICAgICAgICAgICAgICAgICBhdXRoU2Vydi5nZXRVc2VyQXZhdGFyKHJlc3VsdC5hdXRob3IuaWQsIFwidGh1bWJcIilcbiAgICAgICAgICAgICAgICAgICAgICAgIC50aGVuKChkYXRhKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0WydhdXRob3InXVsnYXZhdGFyJ10gPSBkYXRhWydhdmF0YXInXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhdXRob3JQcm9taXNlLnJlc29sdmUoZGF0YSk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBwb3B1bGF0ZSBtZXRhZGF0YWdpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbWV0YWRhdGFTZXJ2LmdldFByb2R1Y3RNZXRhZGF0YShyZXN1bHQuaWQpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC50aGVuKChkYXRhMikgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0WydtZXRhZGF0YSddID0gZGF0YTI7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtZXRhZGF0YVByb21pc2UucmVzb2x2ZShkYXRhMik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgUS5hbGwoX3Bvc3RBdXRob3JQb3B1bGF0ZS5jb25jYXQoX3Bvc3RNZXRhZGF0YVBvcHVsYXRlKSlcbiAgICAgICAgICAgICAgICAgICAgLnRoZW4oKHZhbHVlcykgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgX2xpc3RQcm9taXNlLnJlc29sdmUocmVzdWx0cyk7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgcmV0dXJuIF9saXN0UHJvbWlzZS5wcm9taXNlO1xuICAgIH1cblxuICAgIGdldFByb2R1Y3RzQnlTZXgoc2V4SWQsIHBhZ2UpOiBRLklQcm9taXNlPHt9PiDCoHtcbiAgICAgICAgdmFyIF9saXN0UHJvbWlzZSA9IFEuZGVmZXIoKTtcbiAgICAgICAgdmFyIF9wb3N0QXV0aG9yUG9wdWxhdGUgPSBbXTtcbiAgICAgICAgdmFyIF9wb3N0TWV0YWRhdGFQb3B1bGF0ZSA9IFtdO1xuXG4gICAgICAgIHRoaXMuZGIucXVlcnkoJ2NvcmUvP2pzb249Z2V0X3Bvc3RzJmNvdW50PTIwMCcpXG4gICAgICAgICAgICAudGhlbigocmVzdWx0cykgPT4ge1xuICAgICAgICAgICAgICAgIHZhciBwb3N0cyA9IHJlc3VsdHNbJ3Bvc3RzJ107XG5cbiAgICAgICAgICAgICAgICB2YXIgc2V4UG9zdHMgPSBbXTtcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBpIGluIHBvc3RzKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKHBvc3RzW2ldWydjdXN0b21fZmllbGRzJ11bJ3NvZmJhY2tlbmRfX3NvZl93b3JrX21ldGFfX3NleCddID09IHNleElkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzZXhQb3N0cy5wdXNoKHBvc3RzW2ldKTtcbiAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAgICAgLy8gcGFnaW5hdGlvblxuICAgICAgICAgICAgICAgIHZhciBjb3VudCA9IDY7XG4gICAgICAgICAgICAgICAgcmVzdWx0c1snY291bnRfdG90YWwnXSA9IHNleFBvc3RzLmxlbmd0aDtcbiAgICAgICAgICAgICAgICByZXN1bHRzWydwYWdlcyddID0gTWF0aC5mbG9vcihzZXhQb3N0cy5sZW5ndGggLyBjb3VudCk7XG4gICAgICAgICAgICAgICAgaWYgKHNleFBvc3RzLmxlbmd0aCA+IDUpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGZyb20gPSAtY291bnQgKyAoY291bnQgKiBwYWdlKTtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHRvID0gMCArIChjb3VudCAqIHBhZ2UpXG4gICAgICAgICAgICAgICAgICAgIHNleFBvc3RzID0gc2V4UG9zdHMuc2xpY2UoZnJvbSwgdG8pO1xuICAgICAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgICAgICByZXN1bHRzWydwb3N0cyddID0gc2V4UG9zdHM7XG4gICAgICAgICAgICAgICAgcmVzdWx0c1snc2V4J10gPSBzZXhJZDtcbiAgICAgICAgICAgICAgICByZXN1bHRzWydjb3VudCddID0gc2V4UG9zdHMubGVuZ3RoO1xuXG4gICAgICAgICAgICAgICAgcmVzdWx0c1sncG9zdHMnXS5mb3JFYWNoKChyZXN1bHQpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGF1dGhvclByb21pc2UgPSBRLmRlZmVyKCk7XG4gICAgICAgICAgICAgICAgICAgIHZhciBtZXRhZGF0YVByb21pc2UgPSBRLmRlZmVyKCk7XG4gICAgICAgICAgICAgICAgICAgIF9wb3N0QXV0aG9yUG9wdWxhdGUucHVzaChhdXRob3JQcm9taXNlLnByb21pc2UpO1xuICAgICAgICAgICAgICAgICAgICBfcG9zdE1ldGFkYXRhUG9wdWxhdGUucHVzaChtZXRhZGF0YVByb21pc2UucHJvbWlzZSk7XG5cbiAgICAgICAgICAgICAgICAgICAgLy8gcG9wdWxhdGUgYXV0aG9yJ3MgYXZhdGFyXG4gICAgICAgICAgICAgICAgICAgIGF1dGhTZXJ2LmdldFVzZXJBdmF0YXIocmVzdWx0LmF1dGhvci5pZCwgXCJ0aHVtYlwiKVxuICAgICAgICAgICAgICAgICAgICAgICAgLnRoZW4oKGRhdGEpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXN1bHRbJ2F1dGhvciddWydhdmF0YXInXSA9IGRhdGFbJ2F2YXRhciddO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGF1dGhvclByb21pc2UucmVzb2x2ZShkYXRhKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIHBvcHVsYXRlIG1ldGFkYXRhZ2lcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtZXRhZGF0YVNlcnYuZ2V0UHJvZHVjdE1ldGFkYXRhKHJlc3VsdC5pZClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnRoZW4oKGRhdGEyKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXN1bHRbJ21ldGFkYXRhJ10gPSBkYXRhMjtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1ldGFkYXRhUHJvbWlzZS5yZXNvbHZlKGRhdGEyKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICBRLmFsbChfcG9zdEF1dGhvclBvcHVsYXRlLmNvbmNhdChfcG9zdE1ldGFkYXRhUG9wdWxhdGUpKVxuICAgICAgICAgICAgICAgICAgICAudGhlbigodmFsdWVzKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBfbGlzdFByb21pc2UucmVzb2x2ZShyZXN1bHRzKTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIH0pXG4gICAgICAgIHJldHVybiBfbGlzdFByb21pc2UucHJvbWlzZTtcbiAgICB9XG5cbiAgICBjcmVhdGVQcm9kdWN0KGF1dGhvcklkLCB0aXRsZSwgY29udGVudCxcbiAgICAgICAgICAgICAgICAgICAgaW1nLCBzdWJjYXRlZ29yeTAsIHN1YmNhdGVnb3J5MSwgc3R5bGVzLCBzZXgsIHN1YkltZzEsIHN1YkltZzIsIHN1YkltZzMsIHN1YkltZzQsIHN1YkltZzUsIHN1YkltZzYsXG4gICAgICAgICAgICAgICAgICAgIHByb2R1Y3Rpb25Db3N0LCBzZWxsLCBzZWxsUHJpY2UsIHNlbGxOb3RlLCByZW50YWwsIHJlbnRhbFByaWNlLCByZW50YWxOb3RlKTogUS5JUHJvbWlzZTx7fT4ge1xuXG4gICAgICAgIHZhciBfcHJvbWlzZSA9IFEuZGVmZXIoKTtcbiAgICAgICAgdmFyIHByb21pc2VzTGlzdCA9IFtdO1xuICAgICAgICB2YXIgbm93ID0gbmV3IERhdGUoKTtcbiAgICAgICAgdmFyIHF1ZXJ5ID0gXCJJTlNFUlQgSU5UTyB3cDJfcG9zdHMgKElELCBwb3N0X2F1dGhvciwgcG9zdF9jb250ZW50LCBwb3N0X3RpdGxlLCBwb3N0X3N0YXR1cywgY29tbWVudF9zdGF0dXMsIHBpbmdfc3RhdHVzLCBwb3N0X25hbWUsIHBvc3RfdHlwZSwgcG9zdF9kYXRlLCBwb3N0X2RhdGVfZ210KSBcIiArXG4gICAgICAgICAgICAgICAgICAgIFwiVkFMVUVTIChOVUxMLCAnXCIgKyBhdXRob3JJZCArIFwiJywgJ1wiICsgY29udGVudCArIFwiJywgJ1wiICsgdGl0bGUgKyBcIicsICdwdWJsaXNoJywgJ29wZW4nLCAnb3BlbicsICdcIiArIHRpdGxlLnJlcGxhY2UoL1xccy9nICwgJy0nKSArIFwiJywgJ3Bvc3QnLCAnXCIgKyBub3cudG9JU09TdHJpbmcoKSArIFwiJywnXCIgKyBub3cudG9JU09TdHJpbmcoKSArIFwiJylcIjtcblxuICAgICAgICB0aGlzLmRiLnF1ZXJ5X2RiKHF1ZXJ5KVxuICAgICAgICAgICAgLnRoZW4oKGRhdGEpID0+IHtcbiAgICAgICAgICAgICAgICB2YXIgZ3VpZCA9IFwiaHR0cDovL3NvZi50b2t5by8/cD1cIiArIGRhdGFbJ2luc2VydElkJ107XG4gICAgICAgICAgICAgICAgdmFyIHF1ZXJ5MiA9IFwiVVBEQVRFIHdwMl9wb3N0cyBTRVQgZ3VpZCA9ICdcIiArIGd1aWQgKyBcIicgV0hFUkUgSUQgPSBcIiArIGRhdGFbJ2luc2VydElkJ107XG5cbiAgICAgICAgICAgICAgICB0aGlzLmRiLnF1ZXJ5X2RiKHF1ZXJ5MilcbiAgICAgICAgICAgICAgICAgICAgLnRoZW4oKGRhdGEyKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgcXVlcnkzID0gXCJJTlNFUlQgSU5UTyB3cDJfcG9zdG1ldGEgKG1ldGFfaWQsIHBvc3RfaWQsIG1ldGFfa2V5LCBtZXRhX3ZhbHVlKVwiICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiVkFMVUVTIFwiO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoaW1nKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGltYWdlUHJvbWlzZSA9IFEuZGVmZXIoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcm9taXNlc0xpc3QucHVzaChpbWFnZVByb21pc2UucHJvbWlzZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaW1hZ2VzU2Vydi51cGxvYWRJbWFnZShpbWcsIGRhdGFbJ2luc2VydElkJ10sICdzb2ZiYWNrZW5kX19zb2Zfd29ya19tZXRhX19wb3N0SW1hZ2UnKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC50aGVuKChyZXN1bHQpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaW1hZ2VQcm9taXNlLnJlc29sdmUocmVzdWx0KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoc3ViY2F0ZWdvcnkwKSBxdWVyeTMgPSBxdWVyeTMuY29uY2F0KFwiKE5VTEwsXCIgKyBkYXRhWydpbnNlcnRJZCddICsgXCIsJ3NvZmJhY2tlbmRfX3NvZl93b3JrX21ldGFfX2NhdGVnb3J5XzAnLCdcIiArIHN1YmNhdGVnb3J5MCArIFwiJykgXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHN1YmNhdGVnb3J5MSkgcXVlcnkzID0gcXVlcnkzLmNvbmNhdChcIiwoTlVMTCxcIiArIGRhdGFbJ2luc2VydElkJ10gKyBcIiwnc29mYmFja2VuZF9fc29mX3dvcmtfbWV0YV9fY2F0ZWdvcnlfMScsJ1wiICsgc3ViY2F0ZWdvcnkxICsgXCInKSBcIik7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoc3R5bGVzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgaSBpbiBzdHlsZXMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcXVlcnkzID0gcXVlcnkzLmNvbmNhdChcIiwoTlVMTCxcIiArIGRhdGFbJ2luc2VydElkJ10gKyBcIiwnc29mYmFja2VuZF9fc29mX3dvcmtfbWV0YV9fc3R5bGVzJywnXCIgKyBzdHlsZXNbaV0gKyBcIicpIFwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHNleCkgcXVlcnkzID0gcXVlcnkzLmNvbmNhdChcIiwoTlVMTCxcIiArIGRhdGFbJ2luc2VydElkJ10gKyBcIiwnc29mYmFja2VuZF9fc29mX3dvcmtfbWV0YV9fc2V4JywnXCIgKyBzZXggKyBcIicpIFwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChzdWJJbWcxKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHN1YmltYWdlMVByb21pc2UgPSBRLmRlZmVyKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJvbWlzZXNMaXN0LnB1c2goc3ViaW1hZ2UxUHJvbWlzZS5wcm9taXNlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbWFnZXNTZXJ2LnVwbG9hZEltYWdlKGltZywgZGF0YVsnaW5zZXJ0SWQnXSwgJ3NvZmJhY2tlbmRfX3NvZl93b3JrX21ldGFfX3N1YkltYWdlMScpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLnRoZW4oKHJlc3VsdCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdWJpbWFnZTFQcm9taXNlLnJlc29sdmUocmVzdWx0KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoc3ViSW1nMikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBzdWJpbWFnZTJQcm9taXNlID0gUS5kZWZlcigpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByb21pc2VzTGlzdC5wdXNoKHN1YmltYWdlMlByb21pc2UucHJvbWlzZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaW1hZ2VzU2Vydi51cGxvYWRJbWFnZShpbWcsIGRhdGFbJ2luc2VydElkJ10sICdzb2ZiYWNrZW5kX19zb2Zfd29ya19tZXRhX19zdWJJbWFnZTInKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC50aGVuKChyZXN1bHQpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3ViaW1hZ2UyUHJvbWlzZS5yZXNvbHZlKHJlc3VsdCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHN1YkltZzMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgc3ViaW1hZ2UzUHJvbWlzZSA9IFEuZGVmZXIoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcm9taXNlc0xpc3QucHVzaChzdWJpbWFnZTNQcm9taXNlLnByb21pc2UpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGltYWdlc1NlcnYudXBsb2FkSW1hZ2UoaW1nLCBkYXRhWydpbnNlcnRJZCddLCAnc29mYmFja2VuZF9fc29mX3dvcmtfbWV0YV9fc3ViSW1hZ2UzJylcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAudGhlbigocmVzdWx0KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN1YmltYWdlM1Byb21pc2UucmVzb2x2ZShyZXN1bHQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChzdWJJbWc0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHN1YmltYWdlNFByb21pc2UgPSBRLmRlZmVyKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJvbWlzZXNMaXN0LnB1c2goc3ViaW1hZ2U0UHJvbWlzZS5wcm9taXNlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbWFnZXNTZXJ2LnVwbG9hZEltYWdlKGltZywgZGF0YVsnaW5zZXJ0SWQnXSwgJ3NvZmJhY2tlbmRfX3NvZl93b3JrX21ldGFfX3N1YkltYWdlNCcpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLnRoZW4oKHJlc3VsdCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdWJpbWFnZTRQcm9taXNlLnJlc29sdmUocmVzdWx0KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoc3ViSW1nNSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBzdWJpbWFnZTVQcm9taXNlID0gUS5kZWZlcigpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByb21pc2VzTGlzdC5wdXNoKHN1YmltYWdlMVByb21pc2UucHJvbWlzZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaW1hZ2VzU2Vydi51cGxvYWRJbWFnZShpbWcsIGRhdGFbJ2luc2VydElkJ10sICdzb2ZiYWNrZW5kX19zb2Zfd29ya19tZXRhX19zdWJJbWFnZTUnKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC50aGVuKChyZXN1bHQpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3ViaW1hZ2U1UHJvbWlzZS5yZXNvbHZlKHJlc3VsdCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHN1YkltZzYpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgc3ViaW1hZ2U2UHJvbWlzZSA9IFEuZGVmZXIoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcm9taXNlc0xpc3QucHVzaChzdWJpbWFnZTFQcm9taXNlLnByb21pc2UpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGltYWdlc1NlcnYudXBsb2FkSW1hZ2UoaW1nLCBkYXRhWydpbnNlcnRJZCddLCAnc29mYmFja2VuZF9fc29mX3dvcmtfbWV0YV9fc3ViSW1hZ2U2JylcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAudGhlbigocmVzdWx0KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN1YmltYWdlNlByb21pc2UucmVzb2x2ZShyZXN1bHQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChwcm9kdWN0aW9uQ29zdCkgcXVlcnkzID0gcXVlcnkzLmNvbmNhdChcIiwoTlVMTCxcIiArIGRhdGFbJ2luc2VydElkJ10gKyBcIiwnc29mYmFja2VuZF9fc29mX3dvcmtfbWV0YV9fcHJvZHVjdGlvbkNvc3QnLFwiICsgcHJvZHVjdGlvbkNvc3QgKyBcIikgXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHNlbGwpIHF1ZXJ5MyA9IHF1ZXJ5My5jb25jYXQoXCIsKE5VTEwsXCIgKyBkYXRhWydpbnNlcnRJZCddICsgXCIsJ3NvZmJhY2tlbmRfX3NvZl93b3JrX21ldGFfX3NlbGwnLCdcIiArIHNlbGwgKyBcIicpIFwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChzZWxsUHJpY2UpIHF1ZXJ5MyA9IHF1ZXJ5My5jb25jYXQoXCIsKE5VTEwsXCIgKyBkYXRhWydpbnNlcnRJZCddICsgXCIsJ3NvZmJhY2tlbmRfX3NvZl93b3JrX21ldGFfX3NlbGxQcmljZScsXCIgKyBzZWxsUHJpY2UgKyBcIikgXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHNlbGxOb3RlKSBxdWVyeTMgPSBxdWVyeTMuY29uY2F0KFwiLChOVUxMLFwiICsgZGF0YVsnaW5zZXJ0SWQnXSArIFwiLCdzb2ZiYWNrZW5kX19zb2Zfd29ya19tZXRhX19zZWxsTm90ZScsJ1wiICsgc2VsbE5vdGUgKyBcIicpIFwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyZW50YWwpIHF1ZXJ5MyA9IHF1ZXJ5My5jb25jYXQoXCIsKE5VTEwsXCIgKyBkYXRhWydpbnNlcnRJZCddICsgXCIsJ3NvZmJhY2tlbmRfX3NvZl93b3JrX21ldGFfX3JlbnRhbCcsJ1wiICsgcmVudGFsICsgXCInKSBcIik7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAocmVudGFsUHJpY2UpIHF1ZXJ5MyA9IHF1ZXJ5My5jb25jYXQoXCIsKE5VTEwsXCIgKyBkYXRhWydpbnNlcnRJZCddICsgXCIsJ3NvZmJhY2tlbmRfX3NvZl93b3JrX21ldGFfX3JlbnRhbFByaWNlJyxcIiArIHJlbnRhbFByaWNlICsgXCIpIFwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyZW50YWxOb3RlKSBxdWVyeTMgPSBxdWVyeTMuY29uY2F0KFwiLChOVUxMLFwiICsgZGF0YVsnaW5zZXJ0SWQnXSArIFwiLCdzb2ZiYWNrZW5kX19zb2Zfd29ya19tZXRhX19yZW50YWxOb3RlJywnXCIgKyByZW50YWxOb3RlICsgXCInKSBcIik7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBxdWVyeTNQcm9taXNlID0gUS5kZWZlcigpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcHJvbWlzZXNMaXN0LnB1c2gocXVlcnkzUHJvbWlzZS5wcm9taXNlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZGIucXVlcnlfZGIocXVlcnkzKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC50aGVuKChkYXRhMykgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBxdWVyeTNQcm9taXNlLnJlc29sdmUoZGF0YTMpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgICAgICBRLmFsbChwcm9taXNlc0xpc3QpXG4gICAgICAgICAgICAgICAgICAgICAgICAudGhlbigodmFsdWVzKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgX3Byb21pc2UucmVzb2x2ZShkYXRhKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIHJldHVybiBfcHJvbWlzZS5wcm9taXNlO1xuICAgIH1cblxuICAgIHVwZGF0ZVByb2R1Y3QocHJvZHVjdElkLCB0aXRsZSwgY29udGVudCxcbiAgICAgICAgICAgICAgICAgICAgaW1nLCBzdWJjYXRlZ29yeTAsIHN1YmNhdGVnb3J5MSwgc3R5bGVzLCBzZXgsIHN1YkltZzEsIHN1YkltZzIsIHN1YkltZzMsIHN1YkltZzQsIHN1YkltZzUsIHN1YkltZzYsXG4gICAgICAgICAgICAgICAgICAgIHByb2R1Y3Rpb25Db3N0LCBzZWxsLCBzZWxsUHJpY2UsIHNlbGxOb3RlLCByZW50YWwsIHJlbnRhbFByaWNlLCByZW50YWxOb3RlKTogUS5JUHJvbWlzZTx7fT4ge1xuICAgICAgICB2YXIgX3Byb21pc2UgPSBRLmRlZmVyKCk7XG4gICAgICAgIHZhciBwcm9taXNlc0xpc3QgPSBbXTtcblxuICAgICAgICBpZiAodGl0bGUpIHtcbiAgICAgICAgICAgIHZhciB0aXRsZVByb21pc2UgPSBRLmRlZmVyKCk7XG4gICAgICAgICAgICBwcm9taXNlc0xpc3QucHVzaCh0aXRsZVByb21pc2UucHJvbWlzZSk7XG4gICAgICAgICAgICB0aGlzLmRiLnF1ZXJ5X2RiKFwiVVBEQVRFIHdwMl9wb3N0cyBTRVQgcG9zdF90aXRsZT1cIiArIHRpdGxlICsgXCIgV0hFUkUgSUQ9XCIgKyBwcm9kdWN0SWQpXG4gICAgICAgICAgICAudGhlbigoKSA9PiB7XG4gICAgICAgICAgICAgICAgdGl0bGVQcm9taXNlLnJlc29sdmUodHJ1ZSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfTtcblxuICAgICAgICBpZiAoY29udGVudCkge1xuICAgICAgICAgICAgdmFyIGNvbnRlbnRQcm9taXNlID0gUS5kZWZlcigpO1xuICAgICAgICAgICAgcHJvbWlzZXNMaXN0LnB1c2goY29udGVudFByb21pc2UucHJvbWlzZSk7XG4gICAgICAgICAgICB0aGlzLmRiLnF1ZXJ5X2RiKFwiVVBEQVRFIHdwMl9wb3N0cyBTRVQgcG9zdF9jb250ZW50PVwiICsgY29udGVudCArIFwiIFdIRVJFIElEPVwiICsgcHJvZHVjdElkKVxuICAgICAgICAgICAgLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnRlbnRQcm9taXNlLnJlc29sdmUodHJ1ZSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfTtcblxuICAgICAgICBpZiAoaW1nKSB7XG4gICAgICAgICAgICB2YXIgaW1hZ2VQcm9taXNlID0gUS5kZWZlcigpO1xuICAgICAgICAgICAgcHJvbWlzZXNMaXN0LnB1c2goaW1hZ2VQcm9taXNlLnByb21pc2UpO1xuICAgICAgICAgICAgaW1hZ2VzU2Vydi51cGRhdGVJbWFnZShpbWcsIHByb2R1Y3RJZCwgJ3NvZmJhY2tlbmRfX3NvZl93b3JrX21ldGFfX3Bvc3RJbWFnZScpXG4gICAgICAgICAgICAudGhlbigocmVzdWx0KSA9PiB7XG4gICAgICAgICAgICAgICAgaW1hZ2VQcm9taXNlLnJlc29sdmUocmVzdWx0KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9O1xuXG4gICAgICAgIGlmIChzdWJjYXRlZ29yeTApIHtcbiAgICAgICAgICAgIHZhciBzdWJjYXQwUHJvbWlzZSA9IFEuZGVmZXIoKTtcbiAgICAgICAgICAgIHByb21pc2VzTGlzdC5wdXNoKHN1YmNhdDBQcm9taXNlLnByb21pc2UpO1xuICAgICAgICAgICAgdGhpcy5kYi5xdWVyeV9kYihcIlVQREFURSB3cDJfcG9zdG1ldGEgU0VUIG1ldGFfdmFsdWU9XCIgKyBzdWJjYXRlZ29yeTAgKyBcIiBXSEVSRSBtZXRhX2tleT0nc29mYmFja2VuZF9fc29mX3dvcmtfbWV0YV9fY2F0ZWdvcnlfMCcgQU5EIHBvc3RfaWQ9XCIgKyBwcm9kdWN0SWQpXG4gICAgICAgICAgICAudGhlbigoKSA9PiB7XG4gICAgICAgICAgICAgICAgc3ViY2F0MFByb21pc2UucmVzb2x2ZSh0cnVlKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9O1xuXG4gICAgICAgIGlmIChzdWJjYXRlZ29yeTEpIHtcbiAgICAgICAgICAgIHZhciBzdWJjYXQxUHJvbWlzZSA9IFEuZGVmZXIoKTtcbiAgICAgICAgICAgIHByb21pc2VzTGlzdC5wdXNoKHN1YmNhdDFQcm9taXNlLnByb21pc2UpO1xuICAgICAgICAgICAgdGhpcy5kYi5xdWVyeV9kYihcIlVQREFURSB3cDJfcG9zdG1ldGEgU0VUIG1ldGFfdmFsdWU9XCIgKyBzdWJjYXRlZ29yeTEgKyBcIiBXSEVSRSBtZXRhX2tleT0nc29mYmFja2VuZF9fc29mX3dvcmtfbWV0YV9fY2F0ZWdvcnlfMScgQU5EIHBvc3RfaWQ9XCIgKyBwcm9kdWN0SWQpXG4gICAgICAgICAgICAudGhlbigoKSA9PiB7XG4gICAgICAgICAgICAgICAgc3ViY2F0MVByb21pc2UucmVzb2x2ZSh0cnVlKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9O1xuXG4gICAgICAgIGlmIChzZXgpIHtcbiAgICAgICAgICAgIHZhciBzZXhQcm9taXNlID0gUS5kZWZlcigpO1xuICAgICAgICAgICAgcHJvbWlzZXNMaXN0LnB1c2goc2V4UHJvbWlzZS5wcm9taXNlKTtcbiAgICAgICAgICAgIHRoaXMuZGIucXVlcnlfZGIoXCJVUERBVEUgd3AyX3Bvc3RtZXRhIFNFVCBtZXRhX3ZhbHVlPVwiICsgc2V4ICsgXCIgV0hFUkUgbWV0YV9rZXk9J3NvZmJhY2tlbmRfX3NvZl93b3JrX21ldGFfX3NleCcgQU5EIHBvc3RfaWQ9XCIgKyBwcm9kdWN0SWQpXG4gICAgICAgICAgICAudGhlbigoKSA9PiB7XG4gICAgICAgICAgICAgICAgc2V4UHJvbWlzZS5yZXNvbHZlKHRydWUpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH07XG5cbiAgICAgICAgUS5hbGwocHJvbWlzZXNMaXN0KVxuICAgICAgICAgICAgLnRoZW4oKHZhbHVlcykgPT4ge1xuICAgICAgICAgICAgICAgIF9wcm9taXNlLnJlc29sdmUodHJ1ZSk7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gX3Byb21pc2UucHJvbWlzZTtcbiAgICB9XG5cbiAgICBkZWxldGVQcm9kdWN0KG5vbmNlLCBwcm9kdWN0SWQpOiBRLklQcm9taXNlPHt9PiB7XG4gICAgICAgIHJldHVybiB0aGlzLmRiLnF1ZXJ5KCdwb3N0cy9kZWxldGVfcG9zdC8/bm9uY2U9JyArIG5vbmNlICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJyZpZD0nICsgcHJvZHVjdElkKVxuICAgIH1cblxuICAgIGNyZWF0ZUNvbW1lbnQocHJvZHVjdElkLCBjb29raWUsIGNvbnRlbnQpOiBRLklQcm9taXNlPHt9PiB7XG4gICAgICAgIHJldHVybiB0aGlzLmRiLnF1ZXJ5KCd1c2VyL3Bvc3RfY29tbWVudC8/cG9zdF9pZD0nICsgcHJvZHVjdElkICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJyZjb29raWU9JyArIGNvb2tpZSArXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICcmY29tbWVudF9zdGF0dXM9MScgK1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnJmNvbnRlbnQ9JyArIGNvbnRlbnQpXG4gICAgfVxuXG4gICAgZ2V0UHJvZHVjdHNCeVNlYXJjaChzZWFyY2gsIHBhZ2UpOiBRLklQcm9taXNlPHt9PiB7XG4gICAgICAgIHZhciBfc2VhcmNoUHJvbWlzZSA9IFEuZGVmZXIoKTtcbiAgICAgICAgdGhpcy5kYi5xdWVyeSgnY29yZS9nZXRfc2VhcmNoX3Jlc3VsdHMvP2NvdW50PTEwJnNlYXJjaD0nICsgc2VhcmNoICtcbiAgICAgICAgICAgICcmcGFnZT0nICsgcGFnZSkudGhlbigocmVzdWx0cykgPT4ge1xuICAgICAgICAgICAgdmFyIF9wb3N0QXV0aG9yUG9wdWxhdGUgPSBbXTtcblxuICAgICAgICAgICAgcmVzdWx0c1sncG9zdHMnXS5mb3JFYWNoKChyZXN1bHQpID0+IHtcbiAgICAgICAgICAgICAgICB2YXIgYXV0aG9yUHJvbWlzZSA9IFEuZGVmZXIoKTtcbiAgICAgICAgICAgICAgICBfcG9zdEF1dGhvclBvcHVsYXRlLnB1c2goYXV0aG9yUHJvbWlzZS5wcm9taXNlKTtcbiAgICAgICAgICAgICAgICBhdXRoU2Vydi5nZXRVc2VyQXZhdGFyKHJlc3VsdC5hdXRob3IuaWQsIFwidGh1bWJcIilcbiAgICAgICAgICAgICAgICAgICAgLnRoZW4oKGRhdGEpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdFsnYXV0aG9yJ11bJ2F2YXRhciddPSBkYXRhWydhdmF0YXInXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGF1dGhvclByb21pc2UucmVzb2x2ZShkYXRhKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgbWV0YWRhdGFTZXJ2LmdldFByb2R1Y3RNZXRhZGF0YShyZXN1bHQuaWQpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLnRoZW4oKGRhdGEyKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdFsnbWV0YWRhdGEnXSA9IGRhdGEyO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgUS5hbGwoX3Bvc3RBdXRob3JQb3B1bGF0ZSlcbiAgICAgICAgICAgICAgICAudGhlbigoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIF9zZWFyY2hQcm9taXNlLnJlc29sdmUocmVzdWx0cyk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiBfc2VhcmNoUHJvbWlzZS5wcm9taXNlO1xuICAgIH1cblxuICAgIGdldFByb2R1Y3RzUmFua2luZ0J5TGlrZXMoKTogUS5JUHJvbWlzZTx7fT4ge1xuICAgICAgICB2YXIgX3Jlc3BvbnNlUHJvbWlzZSA9IFEuZGVmZXIoKTtcbiAgICAgICAgdmFyIF9wcm9kdWN0c1Byb21pc2VzID0gW107XG4gICAgICAgIHZhciBfcmVzcG9uc2UgPSB7XG4gICAgICAgICAgICBwb3N0cyA6IFtdXG4gICAgICAgIH07XG5cbiAgICAgICAgdmFyIHF1ZXJ5ID0gXCJTRUxFQ1QgKiBGUk9NIFwiICtcbiAgICAgICAgICAgICAgICAgICAgXCIoIFwiICtcbiAgICAgICAgICAgICAgICAgICAgXCJTRUxFQ1Qgd3AyX3Bvc3RzLklEIEFTIHBvc3RfaWQsIFwiICtcbiAgICAgICAgICAgICAgICAgICAgXCJ3cDJfcG9zdHMucG9zdF90aXRsZSBBUyB0aXRsZSwgXCIgK1xuICAgICAgICAgICAgICAgICAgICBcIndwMl9wb3N0cy5wb3N0X2RhdGVfZ210IEFTIGRhdGUsIFwiICtcbiAgICAgICAgICAgICAgICAgICAgXCJ3cDJfcG9zdG1ldGEubWV0YV92YWx1ZSBBUyBsaWtlcywgXCIgK1xuICAgICAgICAgICAgICAgICAgICBcIndwMl91c2Vycy5kaXNwbGF5X25hbWUgQVMgYXV0aG9yIFwiICtcbiAgICAgICAgICAgICAgICAgICAgXCJGUk9NIGB3cDJfcG9zdHNgIFwiICtcbiAgICAgICAgICAgICAgICAgICAgXCJKT0lOIHdwMl91c2VycyBPTiB3cDJfcG9zdHMucG9zdF9hdXRob3IgPSB3cDJfdXNlcnMuSUQgXCIgK1xuICAgICAgICAgICAgICAgICAgICBcIkpPSU4gd3AyX3Bvc3RtZXRhIE9OIHdwMl9wb3N0cy5JRCA9IHdwMl9wb3N0bWV0YS5wb3N0X2lkIFwiICtcbiAgICAgICAgICAgICAgICAgICAgXCJXSEVSRSB3cDJfcG9zdG1ldGEubWV0YV9rZXkgPSAnX2l0ZW1fbGlrZXMnIFwiICtcbiAgICAgICAgICAgICAgICAgICAgXCIpIHRhYmxlMSBcIiArXG4gICAgICAgICAgICAgICAgICAgIFwiT1JERVIgQlkgbGlrZXMgREVTQyBcIiArXG4gICAgICAgICAgICAgICAgICAgIFwiTElNSVQgNVwiO1xuICAgICAgICB0aGlzLmRiLnF1ZXJ5X2RiKHF1ZXJ5KVxuICAgICAgICAgICAgLnRoZW4oKGRhdGEgOiBhbnlbXSkgPT4ge1xuICAgICAgICAgICAgICAgIGRhdGEuZm9yRWFjaCgocHJvZHVjdCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICB2YXIgX3Byb21pc2UgPSBRLmRlZmVyKCk7XG4gICAgICAgICAgICAgICAgICAgIF9wcm9kdWN0c1Byb21pc2VzLnB1c2goX3Byb21pc2UucHJvbWlzZSk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZ2V0UHJvZHVjdEJ5SWQocHJvZHVjdFsncG9zdF9pZCddKVxuICAgICAgICAgICAgICAgICAgICAgICAgLnRoZW4oKHJlc3VsdCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9wcm9taXNlLnJlc29sdmUocmVzdWx0Wydwb3N0J10pO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICB9KVxuXG4gICAgICAgICAgICAgICAgUS5hbGwoX3Byb2R1Y3RzUHJvbWlzZXMpXG4gICAgICAgICAgICAgICAgICAgIC50aGVuKChyZXN1bHRzKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBfcmVzcG9uc2VQcm9taXNlLnJlc29sdmUocmVzdWx0cyk7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIF9yZXNwb25zZVByb21pc2UucHJvbWlzZTtcbiAgICB9XG5cbiAgICBnZXRQcm9kdWN0c1JhbmtpbmdCeVZpc2l0cygpOiBRLklQcm9taXNlPHt9PiB7XG4gICAgICAgIHZhciBfcHJvbWlzZSA9IFEuZGVmZXIoKTtcbiAgICAgICAgdmFyIHF1ZXJ5ID0gXCJTRUxFQ1QgKiBGUk9NIFwiICtcbiAgICAgICAgICAgICAgICAgICAgXCIoIFwiICtcbiAgICAgICAgICAgICAgICAgICAgXCJTRUxFQ1Qgd3AyX3Bvc3RzLklEIEFTIHBvc3RfaWQsIFwiICtcbiAgICAgICAgICAgICAgICAgICAgXCJ3cDJfcG9zdHMucG9zdF90aXRsZSBBUyB0aXRsZSwgXCIgK1xuICAgICAgICAgICAgICAgICAgICBcIndwMl9wb3N0cy5wb3N0X2RhdGVfZ210IEFTIGRhdGUsIFwiICtcbiAgICAgICAgICAgICAgICAgICAgXCJ3cDJfdXNlcnMuZGlzcGxheV9uYW1lIEFTIGF1dGhvciwgXCIgK1xuICAgICAgICAgICAgICAgICAgICBcIndwMl9wb3N0X3ZpZXdzLmNvdW50IEFTIHZpc2l0cyBcIiArXG4gICAgICAgICAgICAgICAgICAgIFwiRlJPTSBgd3AyX3Bvc3RzYCBcIiArXG4gICAgICAgICAgICAgICAgICAgIFwiSk9JTiB3cDJfdXNlcnMgT04gd3AyX3Bvc3RzLnBvc3RfYXV0aG9yID0gd3AyX3VzZXJzLklEIFwiICtcbiAgICAgICAgICAgICAgICAgICAgXCJKT0lOIHdwMl9wb3N0X3ZpZXdzIE9OIHdwMl9wb3N0cy5JRCA9IHdwMl9wb3N0X3ZpZXdzLmlkIFwiICtcbiAgICAgICAgICAgICAgICAgICAgXCJXSEVSRSB3cDJfcG9zdF92aWV3cy5wZXJpb2QgPSAndG90YWwnIFwiICtcbiAgICAgICAgICAgICAgICAgICAgXCIpIHRhYmxlMSBcIiArXG4gICAgICAgICAgICAgICAgICAgIFwiSk9JTiBcIiArXG4gICAgICAgICAgICAgICAgICAgIFwiKCBcIiArXG4gICAgICAgICAgICAgICAgICAgIFwiU0VMRUNUIHdwMl9wb3N0bWV0YS5wb3N0X2lkLCBcIiArXG4gICAgICAgICAgICAgICAgICAgIFwid3AyX3Bvc3RtZXRhLm1ldGFfdmFsdWUgQVMgaW1hZ2UgXCIgK1xuICAgICAgICAgICAgICAgICAgICBcIkZST00gd3AyX3Bvc3RtZXRhIFwiICtcbiAgICAgICAgICAgICAgICAgICAgXCJXSEVSRSB3cDJfcG9zdG1ldGEubWV0YV9rZXkgPSAnc29mYmFja2VuZF9fc29mX3dvcmtfbWV0YV9fcG9zdEltYWdlJyBcIiArXG4gICAgICAgICAgICAgICAgICAgIFwiKSB0YWJsZTIgXCIgK1xuICAgICAgICAgICAgICAgICAgICBcIk9OIHRhYmxlMS5wb3N0X2lkID0gdGFibGUyLnBvc3RfaWQgXCIgK1xuICAgICAgICAgICAgICAgICAgICBcIk9SREVSIEJZIHZpc2l0cyBERVNDIFwiICtcbiAgICAgICAgICAgICAgICAgICAgXCJMSU1JVCAxMFwiO1xuICAgICAgICB0aGlzLmRiLnF1ZXJ5X2RiKHF1ZXJ5KVxuICAgICAgICAgICAgLnRoZW4oKGRhdGEpID0+IHtcbiAgICAgICAgICAgICAgICBfcHJvbWlzZS5yZXNvbHZlKGRhdGEpO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIF9wcm9taXNlLnByb21pc2U7XG4gICAgfVxuXG4gICAgdGVzdDFQcm9kdWN0TGlzdCgpOiBRLklQcm9taXNlPHt9PiB7XG4gICAgICAgIHZhciBfcHJvbWlzZSA9IFEuZGVmZXIoKTtcbiAgICAgICAgdmFyIGNvdW50ID0gMTA7XG4gICAgICAgIHZhciBxdWVyeSA9IFwiU0VMRUNUIHdwMl9wb3N0cy5JRCBBUyBwb3N0X2lkLCBwb3N0X3RpdGxlLCB3cDJfdXNlcnMuZGlzcGxheV9uYW1lIEFTIGF1dGhvciwgd3AyX3VzZXJzLmlkIEFTIGF1dGhvcl9pZCwgXCIgK1xuICAgICAgICAgICAgICAgICAgICBcIndwMl9wb3N0cy5wb3N0X2NvbnRlbnQsIHdwMl9wb3N0cy5wb3N0X2RhdGVfZ210LCBcIiArXG4gICAgICAgICAgICAgICAgICAgIFwidmlld3NfdGFibGUucG9zdF92aWV3cywgXCIgK1xuICAgICAgICAgICAgICAgICAgICBcIkdST1VQX0NPTkNBVChDT05DQVQoJ1xcXCInLCBtZXRhX2tleSwgJ1xcXCI6ICcsICdcXFwiJywgbWV0YV92YWx1ZSwgJ1xcXCInKSBTRVBBUkFUT1IgJywgJykgQVMgbWV0YWRhdGEgXCIgK1xuICAgICAgICAgICAgICAgICAgICBcIkZST00gd3AyX3Bvc3RzIFwiICtcblxuICAgICAgICAgICAgICAgICAgICAgICAgXCJJTk5FUiBKT0lOIHdwMl9wb3N0bWV0YSBcIiArXG4gICAgICAgICAgICAgICAgICAgICAgICBcIk9OIHdwMl9wb3N0cy5JRCA9IHdwMl9wb3N0bWV0YS5wb3N0X2lkIFwiICtcblxuICAgICAgICAgICAgICAgICAgICAgICAgXCJJTk5FUiBKT0lOIHdwMl91c2VycyBcIiArXG4gICAgICAgICAgICAgICAgICAgICAgICBcIk9OIHdwMl9wb3N0cy5wb3N0X2F1dGhvciA9IHdwMl91c2Vycy5JRCBcIiArXG5cbiAgICAgICAgICAgICAgICAgICAgICAgIFwiSU5ORVIgSk9JTiAoIFwiICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIlNFTEVDVCBpZCBBUyBwb3N0X2lkLCBjb3VudCBBUyBwb3N0X3ZpZXdzIFwiICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIkZST00gd3AyX3Bvc3Rfdmlld3MgXCIgK1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiV0hFUkUgd3AyX3Bvc3Rfdmlld3MudHlwZSA9IDQgXCIgK1xuICAgICAgICAgICAgICAgICAgICAgICAgXCIpIEFTIHZpZXdzX3RhYmxlIFwiICtcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiT04gd3AyX3Bvc3RzLklEID0gdmlld3NfdGFibGUucG9zdF9pZCBcIiArXG5cbiAgICAgICAgICAgICAgICAgICAgXCJXSEVSRSB3cDJfcG9zdHMucG9zdF90eXBlID0gJ3Bvc3QnIFwiICtcbiAgICAgICAgICAgICAgICAgICAgXCJHUk9VUCBCWSB3cDJfcG9zdHMuSUQgXCIgK1xuICAgICAgICAgICAgICAgICAgICBcIk9SREVSIEJZIFJBTkQoKSBcIiArXG4gICAgICAgICAgICAgICAgICAgIFwiTElNSVQgXCIgKyBjb3VudDtcbiAgICAgICAgdGhpcy5kYi5xdWVyeV9kYihxdWVyeSlcbiAgICAgICAgICAgIC50aGVuKChkYXRhKSA9PiB7XG4gICAgICAgICAgICAgICAgX3Byb21pc2UucmVzb2x2ZShkYXRhKTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiBfcHJvbWlzZS5wcm9taXNlO1xuICAgIH1cblxuICAgIHRlc3QyUHJvZHVjdExpc3QoKTogUS5JUHJvbWlzZTx7fT4ge1xuICAgICAgICB2YXIgX3Byb21pc2UgPSBRLmRlZmVyKCk7XG4gICAgICAgIHZhciBjb3VudCA9IDEwO1xuICAgICAgICB2YXIgcXVlcnkgPSBcIlNFTEVDVCB3cDJfcG9zdHMuSUQgQVMgcG9zdF9pZCwgcG9zdF90aXRsZSwgd3AyX3VzZXJzLmRpc3BsYXlfbmFtZSBBUyBhdXRob3IsIHdwMl91c2Vycy5pZCBBUyBhdXRob3JfaWQsIFwiICtcbiAgICAgICAgICAgICAgICAgICAgXCJ3cDJfcG9zdHMucG9zdF9jb250ZW50LCB3cDJfcG9zdHMucG9zdF9kYXRlX2dtdCwgXCIgK1xuICAgICAgICAgICAgICAgICAgICBcInZpZXdzX3RhYmxlLnBvc3Rfdmlld3MsIFwiICtcbiAgICAgICAgICAgICAgICAgICAgXCJDT05DQVQoJ3snLCBHUk9VUF9DT05DQVQoQ09OQ0FUKCdcXFwiJywgbWV0YV9rZXksICdcXFwiOiAnLCAnXFxcIicsIG1ldGFfdmFsdWUsICdcXFwiJykgU0VQQVJBVE9SICcsICcpLCAnfScpIEFTIG1ldGFkYXRhIFwiICtcbiAgICAgICAgICAgICAgICAgICAgXCJGUk9NIHdwMl9wb3N0cyBcIiArXG5cbiAgICAgICAgICAgICAgICAgICAgICAgIFwiSU5ORVIgSk9JTiB3cDJfcG9zdG1ldGEgXCIgK1xuICAgICAgICAgICAgICAgICAgICAgICAgXCJPTiB3cDJfcG9zdHMuSUQgPSB3cDJfcG9zdG1ldGEucG9zdF9pZCBcIiArXG5cbiAgICAgICAgICAgICAgICAgICAgICAgIFwiSU5ORVIgSk9JTiB3cDJfdXNlcnMgXCIgK1xuICAgICAgICAgICAgICAgICAgICAgICAgXCJPTiB3cDJfcG9zdHMucG9zdF9hdXRob3IgPSB3cDJfdXNlcnMuSUQgXCIgK1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBcIklOTkVSIEpPSU4gKCBcIiArXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJTRUxFQ1QgaWQgQVMgcG9zdF9pZCwgY291bnQgQVMgcG9zdF92aWV3cyBcIiArXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJGUk9NIHdwMl9wb3N0X3ZpZXdzIFwiICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIldIRVJFIHdwMl9wb3N0X3ZpZXdzLnR5cGUgPSA0IFwiICtcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiKSBBUyB2aWV3c190YWJsZSBcIiArXG4gICAgICAgICAgICAgICAgICAgICAgICBcIk9OIHdwMl9wb3N0cy5JRCA9IHZpZXdzX3RhYmxlLnBvc3RfaWQgXCIgK1xuXG4gICAgICAgICAgICAgICAgICAgIFwiV0hFUkUgd3AyX3Bvc3RzLnBvc3RfdHlwZSA9ICdwb3N0JyBcIiArXG4gICAgICAgICAgICAgICAgICAgIFwiR1JPVVAgQlkgd3AyX3Bvc3RzLklEIFwiICtcbiAgICAgICAgICAgICAgICAgICAgXCJPUkRFUiBCWSBSQU5EKCkgXCIgK1xuICAgICAgICAgICAgICAgICAgICBcIkxJTUlUIFwiICsgY291bnQ7XG4gICAgICAgIHRoaXMuZGIucXVlcnlfZGIocXVlcnkpXG4gICAgICAgICAgICAudGhlbigoZGF0YSkgPT4ge1xuICAgICAgICAgICAgICAgIHZhciBkYXRhSnNvbiA9IEpTT04ucGFyc2UoSlNPTi5zdHJpbmdpZnkoZGF0YSkpO1xuICAgICAgICAgICAgICAgIHZhciBfcG9zdEF1dGhvclBvcHVsYXRlID0gW107XG5cbiAgICAgICAgICAgICAgICBkYXRhSnNvbi5mb3JFYWNoKChwcm9kdWN0KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBhdXRob3JQcm9taXNlID0gUS5kZWZlcigpO1xuICAgICAgICAgICAgICAgICAgICBfcG9zdEF1dGhvclBvcHVsYXRlLnB1c2goYXV0aG9yUHJvbWlzZS5wcm9taXNlKTtcblxuICAgICAgICAgICAgICAgICAgICBhdXRoU2Vydi5nZXRVc2VyQXZhdGFyKHByb2R1Y3QuYXV0aG9yX2lkLCBcInRodW1iXCIpXG4gICAgICAgICAgICAgICAgICAgIC50aGVuKChkYXRhKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBwcm9kdWN0WydhdXRob3JfYXZhdGFyJ10gPSBkYXRhWydhdmF0YXInXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGF1dGhvclByb21pc2UucmVzb2x2ZShkYXRhKTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICBRLmFsbChfcG9zdEF1dGhvclBvcHVsYXRlKVxuICAgICAgICAgICAgICAgIC50aGVuKCh2YWx1ZXMpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgX3Byb21pc2UucmVzb2x2ZShkYXRhSnNvbik7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gX3Byb21pc2UucHJvbWlzZTtcbiAgICB9XG59O1xuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9