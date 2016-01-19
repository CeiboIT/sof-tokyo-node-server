/// <reference path="../../../typings/tsd.d.ts" />
/// <reference path="../connection/connection.service.ts" />
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
        this.db.query('core/?json=get_recent_posts&count=4&page=' + page).then(function (results) {
            _listPromise.resolve(results);
        });
        return _listPromise.promise;
    };
    ProductsService.prototype.getProductsList = function (page) {
        var _listPromise = Q.defer();
        var count = 15;
        this.db.query('core/?json=get_posts&count=' + count + '&page=' + page).then(function (results) {
            function shuffle(o) {
                for (var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x)
                    ;
                return o;
            }
            var shuffled = shuffle(results['posts']);
            results['posts'] = shuffled;
            var _postAuthorPopulate = [];
            var _postLikePopulate = [];
            results['posts'].forEach(function (result) {
                var authorPromise = Q.defer();
                var likesPromise = Q.defer();
                _postAuthorPopulate.push(authorPromise.promise);
                authServ.getUserAvatar(result.author.id, "thumb").then(function (data) {
                    result['author']['avatar'] = data['avatar'];
                    authorPromise.resolve(data);
                    metadataServ.getProductMetadata(result.id).then(function (data2) {
                        result['metadata'] = data2;
                    });
                });
            });
            Q.all(_postAuthorPopulate.concat(_postLikePopulate)).then(function (values) {
                _listPromise.resolve(results);
            });
        });
        return _listPromise.promise;
    };
    ProductsService.prototype.getProductById = function (productId, userId) {
        var _this = this;
        return this.db.query('core/get_post/?id=' + productId).then(function (result) {
            // save visit if is logued in
            if (userId !== 'null') {
                return _this.db.query_db("INSERT INTO wp2_postmeta (meta_id, post_id, meta_key, meta_value) VALUES (NULL," + productId + ",'visit','" + userId + "')").then(function () {
                    return result;
                });
            }
            ;
        });
    };
    ProductsService.prototype.getProductsByAuthor = function (authorId) {
        return this.db.query('core/get_author_posts/?count=4&id=' + authorId);
    };
    ProductsService.prototype.getProductsByCategory = function (categoryId, page) {
        return this.db.query('core/get_category_posts/?count=4&id=' + categoryId + '&page=' + page);
    };
    ProductsService.prototype.getProductsByTag = function (tagId, page) {
        return this.db.query('core/get_tag_posts/?count=4&id=' + tagId + '&page=' + page);
    };
    ProductsService.prototype.getProductsBySchool = function (schoolId, page) {
        var _this = this;
        var _listPromise = Q.defer();
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
        this.db.query('core/?json=get_posts&count=200').then(function (results) {
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
        this.db.query('core/?json=get_posts&count=200').then(function (results) {
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
        return this.db.query('posts/create_post/?nonce=' + nonce + '&author=' + author + '&title=' + title + '&content=' + content + '&status=' + status).then(function (post) {
            console.log(post);
            // FALTA GUARDAR SCHOOL, SUBCATEGORY, STYLES
            return post;
        });
    };
    ProductsService.prototype.updateProduct = function (nonce, productId, author, title, content, status, categories, tags) {
        return this.db.query('posts/update_post/?nonce=' + nonce + '&id=' + productId + '&author=' + author + '&title=' + title + '&content=' + content + '&status=' + status + '&categories=' + categories + '&tags=' + tags);
    };
    ProductsService.prototype.deleteProduct = function (nonce, productId) {
        return this.db.query('posts/delete_post/?nonce=' + nonce + '&id=' + productId);
    };
    ProductsService.prototype.createComment = function (productId, cookie, content) {
        return this.db.query('user/post_comment/?post_id=' + productId + '&cookie=' + cookie + '&comment_status=1' + '&content=' + content);
    };
    ProductsService.prototype.getProductsBySearch = function (search, page) {
        var _searchPromise = Q.defer();
        this.db.query('core/get_search_results/?count=4&search=' + search + '&page=' + page).then(function (results) {
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
    return ProductsService;
})();
exports.ProductsService = ProductsService;
;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1vZHVsZXMvcHJvZHVjdHMvcHJvZHVjdHMuc2VydmljZS50cyJdLCJuYW1lcyI6WyJQcm9kdWN0c1NlcnZpY2UiLCJQcm9kdWN0c1NlcnZpY2UuY29uc3RydWN0b3IiLCJQcm9kdWN0c1NlcnZpY2UuZ2V0UHJvZHVjdHNOZXciLCJQcm9kdWN0c1NlcnZpY2UuZ2V0UHJvZHVjdHNMaXN0IiwiUHJvZHVjdHNTZXJ2aWNlLmdldFByb2R1Y3RzTGlzdC5zaHVmZmxlIiwiUHJvZHVjdHNTZXJ2aWNlLmdldFByb2R1Y3RCeUlkIiwiUHJvZHVjdHNTZXJ2aWNlLmdldFByb2R1Y3RzQnlBdXRob3IiLCJQcm9kdWN0c1NlcnZpY2UuZ2V0UHJvZHVjdHNCeUNhdGVnb3J5IiwiUHJvZHVjdHNTZXJ2aWNlLmdldFByb2R1Y3RzQnlUYWciLCJQcm9kdWN0c1NlcnZpY2UuZ2V0UHJvZHVjdHNCeVNjaG9vbCIsIlByb2R1Y3RzU2VydmljZS5nZXRQcm9kdWN0c0J5U3ViY2F0ZWdvcnkwIiwiUHJvZHVjdHNTZXJ2aWNlLmdldFByb2R1Y3RzQnlTdWJjYXRlZ29yeTEiLCJQcm9kdWN0c1NlcnZpY2UuZ2V0UHJvZHVjdHNCeVN0eWxlIiwiUHJvZHVjdHNTZXJ2aWNlLmNyZWF0ZVByb2R1Y3QiLCJQcm9kdWN0c1NlcnZpY2UudXBkYXRlUHJvZHVjdCIsIlByb2R1Y3RzU2VydmljZS5kZWxldGVQcm9kdWN0IiwiUHJvZHVjdHNTZXJ2aWNlLmNyZWF0ZUNvbW1lbnQiLCJQcm9kdWN0c1NlcnZpY2UuZ2V0UHJvZHVjdHNCeVNlYXJjaCJdLCJtYXBwaW5ncyI6IkFBQUEsa0RBQWtEO0FBQ2xELDREQUE0RDtBQUU1RCxJQUFPLENBQUMsV0FBVyxHQUFHLENBQUMsQ0FBQztBQUN4QixJQUFPLFVBQVUsV0FBVyxrQ0FBa0MsQ0FBQyxDQUFBO0FBQy9ELElBQU8sSUFBSSxXQUFXLHNCQUFzQixDQUFDLENBQUE7QUFDN0MsSUFBTyxRQUFRLFdBQVcsOEJBQThCLENBQUMsQ0FBQztBQUUxRCxJ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bUJBLENBQUNBLENBQ3JCQSxJQUFJQSxDQUFDQTtnQkFDRkEsY0FBY0EsQ0FBQ0EsT0FBT0EsQ0FBQ0EsT0FBT0EsQ0FBQ0EsQ0FBQ0E7WUFDcENBLENBQUNBLENBQUNBLENBQUNBO1FBQ1hBLENBQUNBLENBQUNBLENBQUNBO1FBRUhBLE1BQU1BLENBQUNBLGNBQWNBLENBQUNBLE9BQU9BLENBQUNBO0lBQ2xDQSxDQUFDQTtJQUVMakIsc0JBQUNBO0FBQURBLENBM1BBLEFBMlBDQSxJQUFBO0FBM1BZLHVCQUFlLEdBQWYsZUEyUFosQ0FBQTtBQUFBLENBQUMiLCJmaWxlIjoibW9kdWxlcy9wcm9kdWN0cy9wcm9kdWN0cy5zZXJ2aWNlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy8vIDxyZWZlcmVuY2UgcGF0aD1cIi4uLy4uLy4uL3R5cGluZ3MvdHNkLmQudHNcIiAvPlxuLy8vIDxyZWZlcmVuY2UgcGF0aD1cIi4uL2Nvbm5lY3Rpb24vY29ubmVjdGlvbi5zZXJ2aWNlLnRzXCIgLz5cblxuaW1wb3J0IFEgPSByZXF1aXJlKFwicVwiKTtcbmltcG9ydCBjb25uZWN0aW9uID0gcmVxdWlyZSgnLi4vY29ubmVjdGlvbi9jb25uZWN0aW9uLnNlcnZpY2UnKVxuaW1wb3J0IGF1dGggPSByZXF1aXJlKFwiLi4vYXV0aC9hdXRoLnNlcnZpY2VcIilcbmltcG9ydCBtZXRhZGF0YSA9IHJlcXVpcmUoXCIuLi9tZXRhZGF0YS9tZXRhZGF0YS5zZXJ2aWNlXCIpO1xuXG52YXIgYXV0aFNlcnYgPSBuZXcgYXV0aC5BdXRoU2VydmljZSgpO1xudmFyIG1ldGFkYXRhU2VydiA9IG5ldyBtZXRhZGF0YS5NZXRhZGF0YVNlcnZpY2UoKTtcblxuZXhwb3J0IGludGVyZmFjZSBJUHJvZHVjdHNTZXJ2aWNlIHtcbiAgICAvLyBHRVRcbiAgICBnZXRQcm9kdWN0c05ldyhwYWdlKTogUS5JUHJvbWlzZTx7fT47XG4gICAgZ2V0UHJvZHVjdHNMaXN0KHBhZ2UpOiBRLklQcm9taXNlPHt9PjtcbiAgICBnZXRQcm9kdWN0QnlJZChwcm9kdWN0SWQsIHVzZXJJZCk6IFEuSVByb21pc2U8e30+O1xuICAgIGdldFByb2R1Y3RzQnlBdXRob3IoYXV0aG9ySWQsIHBhZ2UpOiBRLklQcm9taXNlPHt9PjtcbiAgICBnZXRQcm9kdWN0c0J5Q2F0ZWdvcnkoY2F0ZWdvcnlJZCwgcGFnZSk6IFEuSVByb21pc2U8e30+O1xuICAgIGdldFByb2R1Y3RzQnlUYWcodGFnSWQsIHBhZ2UpOiBRLklQcm9taXNlPHt9PjtcbiAgICBnZXRQcm9kdWN0c0J5U2Nob29sKHNjaG9vbElkLCBwYWdlKTogUS5JUHJvbWlzZTx7fT47XG4gICAgZ2V0UHJvZHVjdHNCeVN1YmNhdGVnb3J5MChzdWJjYXRlZ29yeTBJZCwgcGFnZSk6IFEuSVByb21pc2U8e30+O1xuICAgIGdldFByb2R1Y3RzQnlTdWJjYXRlZ29yeTEoc3ViY2F0ZWdvcnkxSWQsIHBhZ2UpOiBRLklQcm9taXNlPHt9PjtcbiAgICBnZXRQcm9kdWN0c0J5U3R5bGUoc3R5bGVJZCwgcGFnZSk6IFEuSVByb21pc2U8e30+O1xuICAgIGdldFByb2R1Y3RzQnlTZWFyY2goc2VhcmNoLCBwYWdlKTogUS5JUHJvbWlzZTx7fT47XG4gICAgLy8gUE9TVFxuICAgIGNyZWF0ZVByb2R1Y3Qobm9uY2UsIGF1dGhvciwgdGl0bGUsIGNvbnRlbnQsIHN0YXR1cywgc2Nob29sLCBzdWJjYXRlZ29yeTAsIHN1YmNhdGVnb3J5MSwgc3R5bGVzKTogUS5JUHJvbWlzZTx7fT47XG4gICAgY3JlYXRlQ29tbWVudChwcm9kdWN0SWQsIGNvb2tpZSwgY29udGVudCk6IFEuSVByb21pc2U8e30+O1xuICAgIC8vIFBVVFxuICAgIHVwZGF0ZVByb2R1Y3Qobm9uY2UsIHByb2R1Y3RJZCwgYXV0aG9yLCB0aXRsZSwgY29udGVudCwgc3RhdHVzLCBjYXRlZ29yaWVzLCB0YWdzKTogUS5JUHJvbWlzZTx7fT47XG4gICAgLy8gREVMRVRFXG4gICAgZGVsZXRlUHJvZHVjdChub25jZSwgcHJvZHVjdElkKTogUS5JUHJvbWlzZTx7fT47XG59XG5cbnZhciBpbkFycmF5ID0gZnVuY3Rpb24obXlBcnJheSwgbXlWYWx1ZSkge1xuICAgIHZhciBpbkFycmF5ID0gZmFsc2U7XG4gICAgbXlBcnJheS5tYXAoZnVuY3Rpb24oa2V5KSB7XG4gICAgICAgIGlmIChrZXkgPT09IG15VmFsdWUpIHtcbiAgICAgICAgICAgIGluQXJyYXkgPSB0cnVlO1xuICAgICAgICB9XG4gICAgfSk7XG4gICAgcmV0dXJuIGluQXJyYXk7XG59O1xuXG5leHBvcnQgY2xhc3MgUHJvZHVjdHNTZXJ2aWNlIGltcGxlbWVudHMgSVByb2R1Y3RzU2VydmljZSB7XG4gICAgcHJpdmF0ZSBkYiA9IGNvbm5lY3Rpb24uc2VydmljZTtcblxuICAgIGdldFByb2R1Y3RzTmV3KHBhZ2UpOiBRLklQcm9taXNlPHt9PiB7XG4gICAgICAgIHZhciBfbGlzdFByb21pc2UgPSBRLmRlZmVyKCk7XG4gICAgICAgIHRoaXMuZGIucXVlcnkoJ2NvcmUvP2pzb249Z2V0X3JlY2VudF9wb3N0cyZjb3VudD00JnBhZ2U9JyArIHBhZ2UpXG4gICAgICAgICAgICAudGhlbigocmVzdWx0cykgPT4ge1xuICAgICAgICAgICAgICAgIF9saXN0UHJvbWlzZS5yZXNvbHZlKHJlc3VsdHMpO1xuICAgICAgICAgICAgfSlcblxuICAgICAgICByZXR1cm4gX2xpc3RQcm9taXNlLnByb21pc2U7XG4gICAgfVxuXG4gICAgZ2V0UHJvZHVjdHNMaXN0KHBhZ2UpOiBRLklQcm9taXNlPHt9PiB7XG4gICAgICAgIHZhciBfbGlzdFByb21pc2UgPSBRLmRlZmVyKCk7XG4gICAgICAgIHZhciBjb3VudCA9IDE1O1xuICAgICAgICB0aGlzLmRiLnF1ZXJ5KCdjb3JlLz9qc29uPWdldF9wb3N0cyZjb3VudD0nICsgY291bnQgKyAnJnBhZ2U9JyArIHBhZ2UpXG4gICAgICAgICAgICAudGhlbigocmVzdWx0cykgPT4ge1xuXG4gICAgICAgICAgICAgICAgZnVuY3Rpb24gc2h1ZmZsZShvKSB7XG4gICAgICAgICAgICAgICAgICAgIGZvciAodmFyIGosIHgsIGkgPSBvLmxlbmd0aDsgaTsgaiA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIGkpLCB4ID0gb1stLWldLCBvW2ldID0gb1tqXSwgb1tqXSA9IHgpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gbztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdmFyIHNodWZmbGVkID0gc2h1ZmZsZShyZXN1bHRzWydwb3N0cyddKTtcblxuICAgICAgICAgICAgICAgIHJlc3VsdHNbJ3Bvc3RzJ10gPSBzaHVmZmxlZDtcbiAgICAgICAgICAgICAgICB2YXIgX3Bvc3RBdXRob3JQb3B1bGF0ZSA9IFtdO1xuICAgICAgICAgICAgICAgIHZhciBfcG9zdExpa2VQb3B1bGF0ZSA9IFtdO1xuXG4gICAgICAgICAgICAgICAgcmVzdWx0c1sncG9zdHMnXS5mb3JFYWNoKChyZXN1bHQpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGF1dGhvclByb21pc2UgPSBRLmRlZmVyKCk7XG4gICAgICAgICAgICAgICAgICAgIHZhciBsaWtlc1Byb21pc2UgPSBRLmRlZmVyKCk7XG4gICAgICAgICAgICAgICAgICAgIF9wb3N0QXV0aG9yUG9wdWxhdGUucHVzaChhdXRob3JQcm9taXNlLnByb21pc2UpO1xuICAgICAgICAgICAgICAgICAgICBhdXRoU2Vydi5nZXRVc2VyQXZhdGFyKHJlc3VsdC5hdXRob3IuaWQsIFwidGh1bWJcIilcbiAgICAgICAgICAgICAgICAgICAgICAgIC50aGVuKChkYXRhKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0WydhdXRob3InXVsnYXZhdGFyJ109IGRhdGFbJ2F2YXRhciddO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGF1dGhvclByb21pc2UucmVzb2x2ZShkYXRhKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1ldGFkYXRhU2Vydi5nZXRQcm9kdWN0TWV0YWRhdGEocmVzdWx0LmlkKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAudGhlbigoZGF0YTIpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdFsnbWV0YWRhdGEnXSA9IGRhdGEyO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgIFEuYWxsKF9wb3N0QXV0aG9yUG9wdWxhdGUuY29uY2F0KF9wb3N0TGlrZVBvcHVsYXRlKSlcbiAgICAgICAgICAgICAgICAgICAgLnRoZW4oKHZhbHVlcykgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgX2xpc3RQcm9taXNlLnJlc29sdmUocmVzdWx0cyk7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIF9saXN0UHJvbWlzZS5wcm9taXNlO1xuICAgIH1cblxuICAgIGdldFByb2R1Y3RCeUlkKHByb2R1Y3RJZCwgdXNlcklkKTogUS5JUHJvbWlzZTx7fT4ge1xuICAgICAgICByZXR1cm4gdGhpcy5kYi5xdWVyeSgnY29yZS9nZXRfcG9zdC8/aWQ9JyArIHByb2R1Y3RJZClcbiAgICAgICAgICAgIC50aGVuKChyZXN1bHQpID0+IHtcbiAgICAgICAgICAgICAgICAvLyBzYXZlIHZpc2l0IGlmIGlzIGxvZ3VlZCBpblxuICAgICAgICAgICAgICAgIGlmICh1c2VySWQgIT09ICdudWxsJykge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5kYi5xdWVyeV9kYihcIklOU0VSVCBJTlRPIHdwMl9wb3N0bWV0YSAobWV0YV9pZCwgcG9zdF9pZCwgbWV0YV9rZXksIG1ldGFfdmFsdWUpIFZBTFVFUyAoTlVMTCxcIiArIHByb2R1Y3RJZCArIFwiLCd2aXNpdCcsJ1wiICsgdXNlcklkICsgXCInKVwiKVxuICAgICAgICAgICAgICAgICAgICAgICAgLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICB9KVxuICAgIH1cblxuICAgIGdldFByb2R1Y3RzQnlBdXRob3IoYXV0aG9ySWQpOiBRLklQcm9taXNlPHt9PiB7XG4gICAgICAgIHJldHVybiB0aGlzLmRiLnF1ZXJ5KCdjb3JlL2dldF9hdXRob3JfcG9zdHMvP2NvdW50PTQmaWQ9JyArIGF1dGhvcklkKVxuICAgIH1cblxuICAgIGdldFByb2R1Y3RzQnlDYXRlZ29yeShjYXRlZ29yeUlkLCBwYWdlKTogUS5JUHJvbWlzZTx7fT4ge1xuICAgICAgICByZXR1cm4gdGhpcy5kYi5xdWVyeSgnY29yZS9nZXRfY2F0ZWdvcnlfcG9zdHMvP2NvdW50PTQmaWQ9JyArIGNhdGVnb3J5SWQgK1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnJnBhZ2U9JyArIHBhZ2UpXG4gICAgfVxuXG4gICAgZ2V0UHJvZHVjdHNCeVRhZyh0YWdJZCwgcGFnZSk6IFEuSVByb21pc2U8e30+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZGIucXVlcnkoJ2NvcmUvZ2V0X3RhZ19wb3N0cy8/Y291bnQ9NCZpZD0nICsgdGFnSWQgK1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnJnBhZ2U9JyArIHBhZ2UpXG4gICAgfVxuXG4gICAgZ2V0UHJvZHVjdHNCeVNjaG9vbChzY2hvb2xJZCwgcGFnZSk6IFEuSVByb21pc2U8e30+IHtcbiAgICAgICAgdmFyIF9saXN0UHJvbWlzZSA9IFEuZGVmZXIoKTtcbiAgICAgICAgdGhpcy5kYi5xdWVyeSgnY29yZS8/anNvbj1nZXRfcG9zdHMmY291bnQ9MjAwJylcbiAgICAgICAgICAgIC50aGVuKChyZXN1bHRzKSA9PiB7XG4gICAgICAgICAgICAgICAgdmFyIHBvc3RzID0gcmVzdWx0c1sncG9zdHMnXTtcblxuICAgICAgICAgICAgICAgIHRoaXMuZGIucXVlcnlfZGIoXCJTRUxFQ1QgdXNlcl9pZCBGUk9NIHdwMl9icF94cHJvZmlsZV9kYXRhIFdIRVJFIHZhbHVlPSdcIiArIHNjaG9vbElkICsgXCInIEFORCBmaWVsZF9pZD00XCIpXG4gICAgICAgICAgICAgICAgICAgIC50aGVuKChkYXRhKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgdXNlcklkcyA9IFtdXG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBpIGluIGRhdGEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB1c2VySWRzLnB1c2goZGF0YVtpXS51c2VyX2lkKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHNjaG9vbFBvc3RzID0gW107XG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBqIGluIHBvc3RzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGluQXJyYXkodXNlcklkcywgcG9zdHNbal0uYXV0aG9yLmlkKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzY2hvb2xQb3N0cy5wdXNoKHBvc3RzW2pdKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdHNbJ3Bvc3RzJ10gPSBzY2hvb2xQb3N0cztcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdHNbJ3NjaG9vbCddID0gc2Nob29sSWQ7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXN1bHRzWydjb3VudCddID0gc2Nob29sUG9zdHMubGVuZ3RoO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0c1snY291bnRfdG90YWwnXSA9IHNjaG9vbFBvc3RzLmxlbmd0aDtcblxuICAgICAgICAgICAgICAgICAgICAgICAgX2xpc3RQcm9taXNlLnJlc29sdmUocmVzdWx0cyk7XG4gICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB9KVxuICAgICAgICByZXR1cm4gX2xpc3RQcm9taXNlLnByb21pc2U7XG4gICAgfVxuXG4gICAgZ2V0UHJvZHVjdHNCeVN1YmNhdGVnb3J5MChzdWJjYXRlZ29yeTBJZCwgcGFnZSk6IFEuSVByb21pc2U8e30+IMKge1xuICAgICAgICB2YXIgX2xpc3RQcm9taXNlID0gUS5kZWZlcigpO1xuICAgICAgICB0aGlzLmRiLnF1ZXJ5KCdjb3JlLz9qc29uPWdldF9wb3N0cyZjb3VudD0yMDAnKVxuICAgICAgICAgICAgLnRoZW4oKHJlc3VsdHMpID0+IHtcbiAgICAgICAgICAgICAgICB2YXIgcG9zdHMgPSByZXN1bHRzWydwb3N0cyddO1xuXG4gICAgICAgICAgICAgICAgdmFyIHN1YmNhdGVnb3J5MFBvc3RzID0gW107XG4gICAgICAgICAgICAgICAgZm9yICh2YXIgaSBpbiBwb3N0cykge1xuXG4gICAgICAgICAgICAgICAgICAgIGlmIChwb3N0c1tpXVsnY3VzdG9tX2ZpZWxkcyddWydzb2ZiYWNrZW5kX19zb2Zfd29ya19tZXRhX19jYXRlZ29yeV8wJ10gPT0gc3ViY2F0ZWdvcnkwSWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHN1YmNhdGVnb3J5MFBvc3RzLnB1c2gocG9zdHNbaV0pO1xuICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgICAgICByZXN1bHRzWydwb3N0cyddID0gc3ViY2F0ZWdvcnkwUG9zdHM7XG4gICAgICAgICAgICAgICAgcmVzdWx0c1snc3ViY2F0ZWdvcnkwJ10gPSBzdWJjYXRlZ29yeTBJZDtcbiAgICAgICAgICAgICAgICByZXN1bHRzWydjb3VudCddID0gc3ViY2F0ZWdvcnkwUG9zdHMubGVuZ3RoO1xuICAgICAgICAgICAgICAgIHJlc3VsdHNbJ2NvdW50X3RvdGFsJ10gPSBzdWJjYXRlZ29yeTBQb3N0cy5sZW5ndGg7XG5cbiAgICAgICAgICAgICAgICBfbGlzdFByb21pc2UucmVzb2x2ZShyZXN1bHRzKTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgIHJldHVybiBfbGlzdFByb21pc2UucHJvbWlzZTtcbiAgICB9XG5cbiAgICBnZXRQcm9kdWN0c0J5U3ViY2F0ZWdvcnkxKHN1YmNhdGVnb3J5MUlkLCBwYWdlKTogUS5JUHJvbWlzZTx7fT4gwqB7XG4gICAgICAgIHZhciBfbGlzdFByb21pc2UgPSBRLmRlZmVyKCk7XG4gICAgICAgIHRoaXMuZGIucXVlcnkoJ2NvcmUvP2pzb249Z2V0X3Bvc3RzJmNvdW50PTIwMCcpXG4gICAgICAgICAgICAudGhlbigocmVzdWx0cykgPT4ge1xuICAgICAgICAgICAgICAgIHZhciBwb3N0cyA9IHJlc3VsdHNbJ3Bvc3RzJ107XG5cbiAgICAgICAgICAgICAgICB2YXIgc3ViY2F0ZWdvcnkxUG9zdHMgPSBbXTtcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBpIGluIHBvc3RzKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKHBvc3RzW2ldWydjdXN0b21fZmllbGRzJ11bJ3NvZmJhY2tlbmRfX3NvZl93b3JrX21ldGFfX2NhdGVnb3J5XzAnXSA9PSBzdWJjYXRlZ29yeTFJZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgc3ViY2F0ZWdvcnkxUG9zdHMucHVzaChwb3N0c1tpXSk7XG4gICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgICAgIHJlc3VsdHNbJ3Bvc3RzJ10gPSBzdWJjYXRlZ29yeTFQb3N0cztcbiAgICAgICAgICAgICAgICByZXN1bHRzWydzdWJjYXRlZ29yeTAnXSA9IHN1YmNhdGVnb3J5MUlkO1xuICAgICAgICAgICAgICAgIHJlc3VsdHNbJ2NvdW50J10gPSBzdWJjYXRlZ29yeTFQb3N0cy5sZW5ndGg7XG4gICAgICAgICAgICAgICAgcmVzdWx0c1snY291bnRfdG90YWwnXSA9IHN1YmNhdGVnb3J5MVBvc3RzLmxlbmd0aDtcblxuICAgICAgICAgICAgICAgIF9saXN0UHJvbWlzZS5yZXNvbHZlKHJlc3VsdHMpO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgcmV0dXJuIF9saXN0UHJvbWlzZS5wcm9taXNlO1xuICAgIH1cblxuICAgIGdldFByb2R1Y3RzQnlTdHlsZShzdHlsZUlkLCBwYWdlKTogUS5JUHJvbWlzZTx7fT4gwqB7XG4gICAgICAgIHZhciBfbGlzdFByb21pc2UgPSBRLmRlZmVyKCk7XG4gICAgICAgIHRoaXMuZGIucXVlcnkoJ2NvcmUvP2pzb249Z2V0X3Bvc3RzJmNvdW50PTIwMCcpXG4gICAgICAgICAgICAudGhlbigocmVzdWx0cykgPT4ge1xuICAgICAgICAgICAgICAgIHZhciBwb3N0cyA9IHJlc3VsdHNbJ3Bvc3RzJ107XG5cbiAgICAgICAgICAgICAgICB2YXIgc3R5bGVQb3N0cyA9IFtdO1xuICAgICAgICAgICAgICAgIGZvciAodmFyIGkgaW4gcG9zdHMpIHtcblxuICAgICAgICAgICAgICAgICAgICBpZiAocG9zdHNbaV1bJ2N1c3RvbV9maWVsZHMnXVsnc29mYmFja2VuZF9fc29mX3dvcmtfbWV0YV9fY2F0ZWdvcnlfMCddID09IHN0eWxlSWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0eWxlUG9zdHMucHVzaChwb3N0c1tpXSk7XG4gICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgICAgIHJlc3VsdHNbJ3Bvc3RzJ10gPSBzdHlsZVBvc3RzO1xuICAgICAgICAgICAgICAgIHJlc3VsdHNbJ3N1YmNhdGVnb3J5MCddID0gc3R5bGVJZDtcbiAgICAgICAgICAgICAgICByZXN1bHRzWydjb3VudCddID0gc3R5bGVQb3N0cy5sZW5ndGg7XG4gICAgICAgICAgICAgICAgcmVzdWx0c1snY291bnRfdG90YWwnXSA9IHN0eWxlUG9zdHMubGVuZ3RoO1xuXG4gICAgICAgICAgICAgICAgX2xpc3RQcm9taXNlLnJlc29sdmUocmVzdWx0cyk7XG4gICAgICAgICAgICB9KVxuICAgICAgICByZXR1cm4gX2xpc3RQcm9taXNlLnByb21pc2U7XG4gICAgfVxuXG4gICAgY3JlYXRlUHJvZHVjdChub25jZSwgYXV0aG9yLCB0aXRsZSwgY29udGVudCwgc3RhdHVzLCBzY2hvb2wsIHN1YmNhdGVnb3J5MCwgc3ViY2F0ZWdvcnkxLCBzdHlsZXMpOiBRLklQcm9taXNlPHt9PiB7XG4gICAgICAgIHJldHVybiB0aGlzLmRiLnF1ZXJ5KCdwb3N0cy9jcmVhdGVfcG9zdC8/bm9uY2U9JyArIG5vbmNlICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJyZhdXRob3I9JyArIGF1dGhvciArXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICcmdGl0bGU9JyArIHRpdGxlICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJyZjb250ZW50PScgKyBjb250ZW50ICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJyZzdGF0dXM9JyArIHN0YXR1cylcbiAgICAgICAgICAgIC50aGVuKChwb3N0KSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2cocG9zdCk7XG5cbiAgICAgICAgICAgICAgICAvLyBGQUxUQSBHVUFSREFSIFNDSE9PTCwgU1VCQ0FURUdPUlksIFNUWUxFU1xuXG4gICAgICAgICAgICAgICAgcmV0dXJuIHBvc3Q7XG4gICAgICAgICAgICB9KVxuICAgIH1cblxuICAgIHVwZGF0ZVByb2R1Y3Qobm9uY2UsIHByb2R1Y3RJZCwgYXV0aG9yLCB0aXRsZSwgY29udGVudCwgc3RhdHVzLCBjYXRlZ29yaWVzLCB0YWdzKTogUS5JUHJvbWlzZTx7fT4ge1xuICAgICAgICByZXR1cm4gdGhpcy5kYi5xdWVyeSgncG9zdHMvdXBkYXRlX3Bvc3QvP25vbmNlPScgKyBub25jZSArXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICcmaWQ9JyArIHByb2R1Y3RJZCArXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICcmYXV0aG9yPScgKyBhdXRob3IgK1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnJnRpdGxlPScgKyB0aXRsZSArXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICcmY29udGVudD0nICsgY29udGVudCArXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICcmc3RhdHVzPScgKyBzdGF0dXMgK1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnJmNhdGVnb3JpZXM9JyArIGNhdGVnb3JpZXMgK1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnJnRhZ3M9JyArIHRhZ3MpXG4gICAgfVxuXG4gICAgZGVsZXRlUHJvZHVjdChub25jZSwgcHJvZHVjdElkKTogUS5JUHJvbWlzZTx7fT4ge1xuICAgICAgICByZXR1cm4gdGhpcy5kYi5xdWVyeSgncG9zdHMvZGVsZXRlX3Bvc3QvP25vbmNlPScgKyBub25jZSArXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICcmaWQ9JyArIHByb2R1Y3RJZClcbiAgICB9XG5cbiAgICBjcmVhdGVDb21tZW50KHByb2R1Y3RJZCwgY29va2llLCBjb250ZW50KTogUS5JUHJvbWlzZTx7fT4ge1xuICAgICAgICByZXR1cm4gdGhpcy5kYi5xdWVyeSgndXNlci9wb3N0X2NvbW1lbnQvP3Bvc3RfaWQ9JyArIHByb2R1Y3RJZCArXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICcmY29va2llPScgKyBjb29raWUgK1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnJmNvbW1lbnRfc3RhdHVzPTEnICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJyZjb250ZW50PScgKyBjb250ZW50KVxuICAgIH1cblxuICAgIGdldFByb2R1Y3RzQnlTZWFyY2goc2VhcmNoLCBwYWdlKTogUS5JUHJvbWlzZTx7fT4ge1xuICAgICAgICB2YXIgX3NlYXJjaFByb21pc2UgPSBRLmRlZmVyKCk7XG4gICAgICAgIHRoaXMuZGIucXVlcnkoJ2NvcmUvZ2V0X3NlYXJjaF9yZXN1bHRzLz9jb3VudD00JnNlYXJjaD0nICsgc2VhcmNoICtcbiAgICAgICAgICAgICcmcGFnZT0nICsgcGFnZSkudGhlbigocmVzdWx0cykgPT4ge1xuICAgICAgICAgICAgdmFyIF9wb3N0QXV0aG9yUG9wdWxhdGUgPSBbXTtcblxuICAgICAgICAgICAgcmVzdWx0c1sncG9zdHMnXS5mb3JFYWNoKChyZXN1bHQpID0+IHtcbiAgICAgICAgICAgICAgICB2YXIgYXV0aG9yUHJvbWlzZSA9IFEuZGVmZXIoKTtcbiAgICAgICAgICAgICAgICBfcG9zdEF1dGhvclBvcHVsYXRlLnB1c2goYXV0aG9yUHJvbWlzZS5wcm9taXNlKTtcbiAgICAgICAgICAgICAgICBhdXRoU2Vydi5nZXRVc2VyQXZhdGFyKHJlc3VsdC5hdXRob3IuaWQsIFwidGh1bWJcIilcbiAgICAgICAgICAgICAgICAgICAgLnRoZW4oKGRhdGEpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdFsnYXV0aG9yJ11bJ2F2YXRhciddPSBkYXRhWydhdmF0YXInXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGF1dGhvclByb21pc2UucmVzb2x2ZShkYXRhKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgbWV0YWRhdGFTZXJ2LmdldFByb2R1Y3RNZXRhZGF0YShyZXN1bHQuaWQpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLnRoZW4oKGRhdGEyKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdFsnbWV0YWRhdGEnXSA9IGRhdGEyO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgUS5hbGwoX3Bvc3RBdXRob3JQb3B1bGF0ZSlcbiAgICAgICAgICAgICAgICAudGhlbigoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIF9zZWFyY2hQcm9taXNlLnJlc29sdmUocmVzdWx0cyk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiBfc2VhcmNoUHJvbWlzZS5wcm9taXNlO1xuICAgIH1cblxufTtcbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==