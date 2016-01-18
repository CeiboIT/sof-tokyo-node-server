/// <reference path="../../../typings/tsd.d.ts" />
/// <reference path="../connection/connection.service.ts" />
var Q = require("q");
var connection = require('../connection/connection.service');
var authors = require("../auth/auth.service");
var authorsServ = new authors.AuthService();
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
        this.db.query('core/?json=get_posts&count=4&page=' + page).then(function (results) {
            function shuffle(o) {
                for (var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x)
                    ;
                return o;
            }
            var shuffled = shuffle(results['posts']);
            results['posts'] = shuffled;
            var _postAuthorPopulate = [];
            results['posts'].forEach(function (result) {
                var authorPromise = Q.defer();
                _postAuthorPopulate.push(authorPromise.promise);
                authorsServ.getUserInfo(result.id).then(function (data) {
                    result['author'] = data;
                    authorPromise.resolve(data);
                });
            });
            Q.all(_postAuthorPopulate).then(function (values) {
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
    ProductsService.prototype.getProductsByAuthor = function (authorId, page) {
        return this.db.query('core/get_author_posts/?count=4&id=' + authorId + '&page=' + page);
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
                authorsServ.getUserInfo(result.id).then(function (data) {
                    result['author'] = data;
                    authorPromise.resolve(data);
                });
            });
            Q.all(_postAuthorPopulate).then(function (values) {
                _searchPromise.resolve(results);
            });
        });
        return _searchPromise.promise;
    };
    return ProductsService;
})();
exports.ProductsService = ProductsService;
;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1vZHVsZXMvcHJvZHVjdHMvcHJvZHVjdHMuc2VydmljZS50cyJdLCJuYW1lcyI6WyJQcm9kdWN0c1NlcnZpY2UiLCJQcm9kdWN0c1NlcnZpY2UuY29uc3RydWN0b3IiLCJQcm9kdWN0c1NlcnZpY2UuZ2V0UHJvZHVjdHNOZXciLCJQcm9kdWN0c1NlcnZpY2UuZ2V0UHJvZHVjdHNMaXN0IiwiUHJvZHVjdHNTZXJ2aWNlLmdldFByb2R1Y3RzTGlzdC5zaHVmZmxlIiwiUHJvZHVjdHNTZXJ2aWNlLmdldFByb2R1Y3RCeUlkIiwiUHJvZHVjdHNTZXJ2aWNlLmdldFByb2R1Y3RzQnlBdXRob3IiLCJQcm9kdWN0c1NlcnZpY2UuZ2V0UHJvZHVjdHNCeUNhdGVnb3J5IiwiUHJvZHVjdHNTZXJ2aWNlLmdldFByb2R1Y3RzQnlUYWciLCJQcm9kdWN0c1NlcnZpY2UuZ2V0UHJvZHVjdHNCeVNjaG9vbCIsIlByb2R1Y3RzU2VydmljZS5nZXRQcm9kdWN0c0J5U3ViY2F0ZWdvcnkwIiwiUHJvZHVjdHNTZXJ2aWNlLmdldFByb2R1Y3RzQnlTdWJjYXRlZ29yeTEiLCJQcm9kdWN0c1NlcnZpY2UuZ2V0UHJvZHVjdHNCeVN0eWxlIiwiUHJvZHVjdHNTZXJ2aWNlLmNyZWF0ZVByb2R1Y3QiLCJQcm9kdWN0c1NlcnZpY2UudXBkYXRlUHJvZHVjdCIsIlByb2R1Y3RzU2VydmljZS5kZWxldGVQcm9kdWN0IiwiUHJvZHVjdHNTZXJ2aWNlLmNyZWF0ZUNvbW1lbnQiLCJQcm9kdWN0c1NlcnZpY2UuZ2V0UHJvZHVjdHNCeVNlYXJjaCJdLCJtYXBwaW5ncyI6IkFBQUEsa0RBQWtEO0FBQ2xELDREQUE0RDtBQUU1RCxJQUFPLENBQUMsV0FBVyxHQUFHLENBQUMsQ0FBQztBQUN4QixJQUFPLFVBQVUsV0FBVyxrQ0FBa0MsQ0FBQyxDQUFBO0FBRS9ELElBQU8sT0FBTyxXQUFXLHNCQUFzQixDQUFDLENBQUE7QUFDaEQsSUFBSSxXQUFXLEdBQUcsSUFBSSxPQUFPLENBQUMsV0FBVyxFQUFF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LENBQzdCQSxJQUFJQSxDQUFDQSxVQUFDQSxJQUFJQTtvQkFDUEEsTUFBTUEsQ0FBQ0EsUUFBUUEsQ0FBQ0EsR0FBRUEsSUFBSUEsQ0FBQ0E7b0JBQ3ZCQSxhQUFhQSxDQUFDQSxPQUFPQSxDQUFDQSxJQUFJQSxDQUFDQSxDQUFDQTtnQkFDaENBLENBQUNBLENBQUNBLENBQUFBO1lBQ1ZBLENBQUNBLENBQUNBLENBQUNBO1lBRUhBLENBQUNBLENBQUNBLEdBQUdBLENBQUNBLG1CQUFtQkEsQ0FBQ0EsQ0FDckJBLElBQUlBLENBQUNBLFVBQUNBLE1BQU1BO2dCQUNUQSxjQUFjQSxDQUFDQSxPQUFPQSxDQUFDQSxPQUFPQSxDQUFDQSxDQUFDQTtZQUNwQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7UUFDWEEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7UUFFSEEsTUFBTUEsQ0FBQ0EsY0FBY0EsQ0FBQ0EsT0FBT0EsQ0FBQ0E7SUFDbENBLENBQUNBO0lBRUxqQixzQkFBQ0E7QUFBREEsQ0F2UEEsQUF1UENBLElBQUE7QUF2UFksdUJBQWUsR0FBZixlQXVQWixDQUFBO0FBQUEsQ0FBQyIsImZpbGUiOiJtb2R1bGVzL3Byb2R1Y3RzL3Byb2R1Y3RzLnNlcnZpY2UuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvLy8gPHJlZmVyZW5jZSBwYXRoPVwiLi4vLi4vLi4vdHlwaW5ncy90c2QuZC50c1wiIC8+XG4vLy8gPHJlZmVyZW5jZSBwYXRoPVwiLi4vY29ubmVjdGlvbi9jb25uZWN0aW9uLnNlcnZpY2UudHNcIiAvPlxuXG5pbXBvcnQgUSA9IHJlcXVpcmUoXCJxXCIpO1xuaW1wb3J0IGNvbm5lY3Rpb24gPSByZXF1aXJlKCcuLi9jb25uZWN0aW9uL2Nvbm5lY3Rpb24uc2VydmljZScpXG5cbmltcG9ydCBhdXRob3JzID0gcmVxdWlyZShcIi4uL2F1dGgvYXV0aC5zZXJ2aWNlXCIpXG52YXIgYXV0aG9yc1NlcnYgPSBuZXcgYXV0aG9ycy5BdXRoU2VydmljZSgpO1xuXG5cbmV4cG9ydCBpbnRlcmZhY2UgSVByb2R1Y3RzU2VydmljZSB7XG4gICAgLy8gR0VUXG4gICAgZ2V0UHJvZHVjdHNOZXcocGFnZSk6IFEuSVByb21pc2U8e30+O1xuICAgIGdldFByb2R1Y3RzTGlzdChwYWdlKTogUS5JUHJvbWlzZTx7fT47XG4gICAgZ2V0UHJvZHVjdEJ5SWQocHJvZHVjdElkLCB1c2VySWQpOiBRLklQcm9taXNlPHt9PjtcbiAgICBnZXRQcm9kdWN0c0J5QXV0aG9yKGF1dGhvcklkLCBwYWdlKTogUS5JUHJvbWlzZTx7fT47XG4gICAgZ2V0UHJvZHVjdHNCeUNhdGVnb3J5KGNhdGVnb3J5SWQsIHBhZ2UpOiBRLklQcm9taXNlPHt9PjtcbiAgICBnZXRQcm9kdWN0c0J5VGFnKHRhZ0lkLCBwYWdlKTogUS5JUHJvbWlzZTx7fT47XG4gICAgZ2V0UHJvZHVjdHNCeVNjaG9vbChzY2hvb2xJZCwgcGFnZSk6IFEuSVByb21pc2U8e30+O1xuICAgIGdldFByb2R1Y3RzQnlTdWJjYXRlZ29yeTAoc3ViY2F0ZWdvcnkwSWQsIHBhZ2UpOiBRLklQcm9taXNlPHt9PjtcbiAgICBnZXRQcm9kdWN0c0J5U3ViY2F0ZWdvcnkxKHN1YmNhdGVnb3J5MUlkLCBwYWdlKTogUS5JUHJvbWlzZTx7fT47XG4gICAgZ2V0UHJvZHVjdHNCeVN0eWxlKHN0eWxlSWQsIHBhZ2UpOiBRLklQcm9taXNlPHt9PjtcbiAgICBnZXRQcm9kdWN0c0J5U2VhcmNoKHNlYXJjaCwgcGFnZSk6IFEuSVByb21pc2U8e30+O1xuICAgIC8vIFBPU1RcbiAgICBjcmVhdGVQcm9kdWN0KG5vbmNlLCBhdXRob3IsIHRpdGxlLCBjb250ZW50LCBzdGF0dXMsIHNjaG9vbCwgc3ViY2F0ZWdvcnkwLCBzdWJjYXRlZ29yeTEsIHN0eWxlcyk6IFEuSVByb21pc2U8e30+O1xuICAgIGNyZWF0ZUNvbW1lbnQocHJvZHVjdElkLCBjb29raWUsIGNvbnRlbnQpOiBRLklQcm9taXNlPHt9PjtcbiAgICAvLyBQVVRcbiAgICB1cGRhdGVQcm9kdWN0KG5vbmNlLCBwcm9kdWN0SWQsIGF1dGhvciwgdGl0bGUsIGNvbnRlbnQsIHN0YXR1cywgY2F0ZWdvcmllcywgdGFncyk6IFEuSVByb21pc2U8e30+O1xuICAgIC8vIERFTEVURVxuICAgIGRlbGV0ZVByb2R1Y3Qobm9uY2UsIHByb2R1Y3RJZCk6IFEuSVByb21pc2U8e30+O1xufVxuXG52YXIgaW5BcnJheSA9IGZ1bmN0aW9uKG15QXJyYXksIG15VmFsdWUpIHtcbiAgICB2YXIgaW5BcnJheSA9IGZhbHNlO1xuICAgIG15QXJyYXkubWFwKGZ1bmN0aW9uKGtleSkge1xuICAgICAgICBpZiAoa2V5ID09PSBteVZhbHVlKSB7XG4gICAgICAgICAgICBpbkFycmF5ID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgIH0pO1xuICAgIHJldHVybiBpbkFycmF5O1xufTtcblxuZXhwb3J0IGNsYXNzIFByb2R1Y3RzU2VydmljZSBpbXBsZW1lbnRzIElQcm9kdWN0c1NlcnZpY2Uge1xuICAgIHByaXZhdGUgZGIgPSBjb25uZWN0aW9uLnNlcnZpY2U7XG5cbiAgICBnZXRQcm9kdWN0c05ldyhwYWdlKTogUS5JUHJvbWlzZTx7fT4ge1xuICAgICAgICB2YXIgX2xpc3RQcm9taXNlID0gUS5kZWZlcigpO1xuICAgICAgICB0aGlzLmRiLnF1ZXJ5KCdjb3JlLz9qc29uPWdldF9yZWNlbnRfcG9zdHMmY291bnQ9NCZwYWdlPScgKyBwYWdlKVxuICAgICAgICAgICAgLnRoZW4oKHJlc3VsdHMpID0+IHtcbiAgICAgICAgICAgICAgICBfbGlzdFByb21pc2UucmVzb2x2ZShyZXN1bHRzKTtcbiAgICAgICAgICAgIH0pXG5cbiAgICAgICAgcmV0dXJuIF9saXN0UHJvbWlzZS5wcm9taXNlO1xuICAgIH1cblxuICAgIGdldFByb2R1Y3RzTGlzdChwYWdlKTogUS5JUHJvbWlzZTx7fT4ge1xuICAgICAgICB2YXIgX2xpc3RQcm9taXNlID0gUS5kZWZlcigpO1xuICAgICAgICB0aGlzLmRiLnF1ZXJ5KCdjb3JlLz9qc29uPWdldF9wb3N0cyZjb3VudD00JnBhZ2U9JyArIHBhZ2UpXG4gICAgICAgICAgICAudGhlbigocmVzdWx0cykgPT4ge1xuXG4gICAgICAgICAgICAgICAgZnVuY3Rpb24gc2h1ZmZsZShvKSB7XG4gICAgICAgICAgICAgICAgICAgIGZvciAodmFyIGosIHgsIGkgPSBvLmxlbmd0aDsgaTsgaiA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIGkpLCB4ID0gb1stLWldLCBvW2ldID0gb1tqXSwgb1tqXSA9IHgpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gbztcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB2YXIgc2h1ZmZsZWQgPSBzaHVmZmxlKHJlc3VsdHNbJ3Bvc3RzJ10pO1xuICAgICAgICAgICAgICAgIHJlc3VsdHNbJ3Bvc3RzJ10gPSBzaHVmZmxlZDtcblxuICAgICAgICAgICAgICAgIHZhciBfcG9zdEF1dGhvclBvcHVsYXRlID0gW107XG5cbiAgICAgICAgICAgICAgICByZXN1bHRzWydwb3N0cyddLmZvckVhY2goKHJlc3VsdCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICB2YXIgYXV0aG9yUHJvbWlzZSA9IFEuZGVmZXIoKTtcbiAgICAgICAgICAgICAgICAgICAgX3Bvc3RBdXRob3JQb3B1bGF0ZS5wdXNoKGF1dGhvclByb21pc2UucHJvbWlzZSk7XG4gICAgICAgICAgICAgICAgICAgIGF1dGhvcnNTZXJ2LmdldFVzZXJJbmZvKHJlc3VsdC5pZClcbiAgICAgICAgICAgICAgICAgICAgICAgIC50aGVuKChkYXRhKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0WydhdXRob3InXT0gZGF0YTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhdXRob3JQcm9taXNlLnJlc29sdmUoZGF0YSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgUS5hbGwoX3Bvc3RBdXRob3JQb3B1bGF0ZSlcbiAgICAgICAgICAgICAgICAgICAgLnRoZW4oKHZhbHVlcykgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgX2xpc3RQcm9taXNlLnJlc29sdmUocmVzdWx0cyk7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIF9saXN0UHJvbWlzZS5wcm9taXNlO1xuICAgIH1cblxuICAgIGdldFByb2R1Y3RCeUlkKHByb2R1Y3RJZCwgdXNlcklkKTogUS5JUHJvbWlzZTx7fT4ge1xuICAgICAgICByZXR1cm4gdGhpcy5kYi5xdWVyeSgnY29yZS9nZXRfcG9zdC8/aWQ9JyArIHByb2R1Y3RJZClcbiAgICAgICAgICAgIC50aGVuKChyZXN1bHQpID0+IHtcbiAgICAgICAgICAgICAgICAvLyBzYXZlIHZpc2l0IGlmIGlzIGxvZ3VlZCBpblxuICAgICAgICAgICAgICAgIGlmICh1c2VySWQgIT09ICdudWxsJykge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5kYi5xdWVyeV9kYihcIklOU0VSVCBJTlRPIHdwMl9wb3N0bWV0YSAobWV0YV9pZCwgcG9zdF9pZCwgbWV0YV9rZXksIG1ldGFfdmFsdWUpIFZBTFVFUyAoTlVMTCxcIiArIHByb2R1Y3RJZCArIFwiLCd2aXNpdCcsJ1wiICsgdXNlcklkICsgXCInKVwiKVxuICAgICAgICAgICAgICAgICAgICAgICAgLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICB9KVxuICAgIH1cblxuICAgIGdldFByb2R1Y3RzQnlBdXRob3IoYXV0aG9ySWQsIHBhZ2UpOiBRLklQcm9taXNlPHt9PiB7XG4gICAgICAgIHJldHVybiB0aGlzLmRiLnF1ZXJ5KCdjb3JlL2dldF9hdXRob3JfcG9zdHMvP2NvdW50PTQmaWQ9JyArIGF1dGhvcklkICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJyZwYWdlPScgKyBwYWdlKVxuICAgIH1cblxuICAgIGdldFByb2R1Y3RzQnlDYXRlZ29yeShjYXRlZ29yeUlkLCBwYWdlKTogUS5JUHJvbWlzZTx7fT4ge1xuICAgICAgICByZXR1cm4gdGhpcy5kYi5xdWVyeSgnY29yZS9nZXRfY2F0ZWdvcnlfcG9zdHMvP2NvdW50PTQmaWQ9JyArIGNhdGVnb3J5SWQgK1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnJnBhZ2U9JyArIHBhZ2UpXG4gICAgfVxuXG4gICAgZ2V0UHJvZHVjdHNCeVRhZyh0YWdJZCwgcGFnZSk6IFEuSVByb21pc2U8e30+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZGIucXVlcnkoJ2NvcmUvZ2V0X3RhZ19wb3N0cy8/Y291bnQ9NCZpZD0nICsgdGFnSWQgK1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnJnBhZ2U9JyArIHBhZ2UpXG4gICAgfVxuXG4gICAgZ2V0UHJvZHVjdHNCeVNjaG9vbChzY2hvb2xJZCwgcGFnZSk6IFEuSVByb21pc2U8e30+IHtcbiAgICAgICAgdmFyIF9saXN0UHJvbWlzZSA9IFEuZGVmZXIoKTtcbiAgICAgICAgdGhpcy5kYi5xdWVyeSgnY29yZS8/anNvbj1nZXRfcG9zdHMmY291bnQ9MjAwJylcbiAgICAgICAgICAgIC50aGVuKChyZXN1bHRzKSA9PiB7XG4gICAgICAgICAgICAgICAgdmFyIHBvc3RzID0gcmVzdWx0c1sncG9zdHMnXTtcblxuICAgICAgICAgICAgICAgIHRoaXMuZGIucXVlcnlfZGIoXCJTRUxFQ1QgdXNlcl9pZCBGUk9NIHdwMl9icF94cHJvZmlsZV9kYXRhIFdIRVJFIHZhbHVlPSdcIiArIHNjaG9vbElkICsgXCInIEFORCBmaWVsZF9pZD00XCIpXG4gICAgICAgICAgICAgICAgICAgIC50aGVuKChkYXRhKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgdXNlcklkcyA9IFtdXG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBpIGluIGRhdGEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB1c2VySWRzLnB1c2goZGF0YVtpXS51c2VyX2lkKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHNjaG9vbFBvc3RzID0gW107XG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBqIGluIHBvc3RzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGluQXJyYXkodXNlcklkcywgcG9zdHNbal0uYXV0aG9yLmlkKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzY2hvb2xQb3N0cy5wdXNoKHBvc3RzW2pdKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdHNbJ3Bvc3RzJ10gPSBzY2hvb2xQb3N0cztcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdHNbJ3NjaG9vbCddID0gc2Nob29sSWQ7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXN1bHRzWydjb3VudCddID0gc2Nob29sUG9zdHMubGVuZ3RoO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0c1snY291bnRfdG90YWwnXSA9IHNjaG9vbFBvc3RzLmxlbmd0aDtcblxuXG5cblxuXG5cbiAgICAgICAgICAgICAgICAgICAgICAgIF9saXN0UHJvbWlzZS5yZXNvbHZlKHJlc3VsdHMpO1xuICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgfSlcbiAgICAgICAgcmV0dXJuIF9saXN0UHJvbWlzZS5wcm9taXNlO1xuICAgIH1cblxuICAgIGdldFByb2R1Y3RzQnlTdWJjYXRlZ29yeTAoc3ViY2F0ZWdvcnkwSWQsIHBhZ2UpOiBRLklQcm9taXNlPHt9PiDCoHtcbiAgICAgICAgdmFyIF9saXN0UHJvbWlzZSA9IFEuZGVmZXIoKTtcbiAgICAgICAgdGhpcy5kYi5xdWVyeSgnY29yZS8/anNvbj1nZXRfcG9zdHMmY291bnQ9MjAwJylcbiAgICAgICAgICAgIC50aGVuKChyZXN1bHRzKSA9PiB7XG4gICAgICAgICAgICAgICAgdmFyIHBvc3RzID0gcmVzdWx0c1sncG9zdHMnXTtcblxuICAgICAgICAgICAgICAgIHZhciBzdWJjYXRlZ29yeTBQb3N0cyA9IFtdO1xuICAgICAgICAgICAgICAgIGZvciAodmFyIGkgaW4gcG9zdHMpIHtcblxuICAgICAgICAgICAgICAgICAgICBpZiAocG9zdHNbaV1bJ2N1c3RvbV9maWVsZHMnXVsnc29mYmFja2VuZF9fc29mX3dvcmtfbWV0YV9fY2F0ZWdvcnlfMCddID09IHN1YmNhdGVnb3J5MElkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzdWJjYXRlZ29yeTBQb3N0cy5wdXNoKHBvc3RzW2ldKTtcbiAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAgICAgcmVzdWx0c1sncG9zdHMnXSA9IHN1YmNhdGVnb3J5MFBvc3RzO1xuICAgICAgICAgICAgICAgIHJlc3VsdHNbJ3N1YmNhdGVnb3J5MCddID0gc3ViY2F0ZWdvcnkwSWQ7XG4gICAgICAgICAgICAgICAgcmVzdWx0c1snY291bnQnXSA9IHN1YmNhdGVnb3J5MFBvc3RzLmxlbmd0aDtcbiAgICAgICAgICAgICAgICByZXN1bHRzWydjb3VudF90b3RhbCddID0gc3ViY2F0ZWdvcnkwUG9zdHMubGVuZ3RoO1xuXG4gICAgICAgICAgICAgICAgX2xpc3RQcm9taXNlLnJlc29sdmUocmVzdWx0cyk7XG4gICAgICAgICAgICB9KVxuICAgICAgICByZXR1cm4gX2xpc3RQcm9taXNlLnByb21pc2U7XG4gICAgfVxuXG4gICAgZ2V0UHJvZHVjdHNCeVN1YmNhdGVnb3J5MShzdWJjYXRlZ29yeTFJZCwgcGFnZSk6IFEuSVByb21pc2U8e30+IMKge1xuICAgICAgICB2YXIgX2xpc3RQcm9taXNlID0gUS5kZWZlcigpO1xuICAgICAgICB0aGlzLmRiLnF1ZXJ5KCdjb3JlLz9qc29uPWdldF9wb3N0cyZjb3VudD0yMDAnKVxuICAgICAgICAgICAgLnRoZW4oKHJlc3VsdHMpID0+IHtcbiAgICAgICAgICAgICAgICB2YXIgcG9zdHMgPSByZXN1bHRzWydwb3N0cyddO1xuXG4gICAgICAgICAgICAgICAgdmFyIHN1YmNhdGVnb3J5MVBvc3RzID0gW107XG4gICAgICAgICAgICAgICAgZm9yICh2YXIgaSBpbiBwb3N0cykge1xuXG4gICAgICAgICAgICAgICAgICAgIGlmIChwb3N0c1tpXVsnY3VzdG9tX2ZpZWxkcyddWydzb2ZiYWNrZW5kX19zb2Zfd29ya19tZXRhX19jYXRlZ29yeV8wJ10gPT0gc3ViY2F0ZWdvcnkxSWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHN1YmNhdGVnb3J5MVBvc3RzLnB1c2gocG9zdHNbaV0pO1xuICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgICAgICByZXN1bHRzWydwb3N0cyddID0gc3ViY2F0ZWdvcnkxUG9zdHM7XG4gICAgICAgICAgICAgICAgcmVzdWx0c1snc3ViY2F0ZWdvcnkwJ10gPSBzdWJjYXRlZ29yeTFJZDtcbiAgICAgICAgICAgICAgICByZXN1bHRzWydjb3VudCddID0gc3ViY2F0ZWdvcnkxUG9zdHMubGVuZ3RoO1xuICAgICAgICAgICAgICAgIHJlc3VsdHNbJ2NvdW50X3RvdGFsJ10gPSBzdWJjYXRlZ29yeTFQb3N0cy5sZW5ndGg7XG5cbiAgICAgICAgICAgICAgICBfbGlzdFByb21pc2UucmVzb2x2ZShyZXN1bHRzKTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgIHJldHVybiBfbGlzdFByb21pc2UucHJvbWlzZTtcbiAgICB9XG5cbiAgICBnZXRQcm9kdWN0c0J5U3R5bGUoc3R5bGVJZCwgcGFnZSk6IFEuSVByb21pc2U8e30+IMKge1xuICAgICAgICB2YXIgX2xpc3RQcm9taXNlID0gUS5kZWZlcigpO1xuICAgICAgICB0aGlzLmRiLnF1ZXJ5KCdjb3JlLz9qc29uPWdldF9wb3N0cyZjb3VudD0yMDAnKVxuICAgICAgICAgICAgLnRoZW4oKHJlc3VsdHMpID0+IHtcbiAgICAgICAgICAgICAgICB2YXIgcG9zdHMgPSByZXN1bHRzWydwb3N0cyddO1xuXG4gICAgICAgICAgICAgICAgdmFyIHN0eWxlUG9zdHMgPSBbXTtcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBpIGluIHBvc3RzKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKHBvc3RzW2ldWydjdXN0b21fZmllbGRzJ11bJ3NvZmJhY2tlbmRfX3NvZl93b3JrX21ldGFfX2NhdGVnb3J5XzAnXSA9PSBzdHlsZUlkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzdHlsZVBvc3RzLnB1c2gocG9zdHNbaV0pO1xuICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgICAgICByZXN1bHRzWydwb3N0cyddID0gc3R5bGVQb3N0cztcbiAgICAgICAgICAgICAgICByZXN1bHRzWydzdWJjYXRlZ29yeTAnXSA9IHN0eWxlSWQ7XG4gICAgICAgICAgICAgICAgcmVzdWx0c1snY291bnQnXSA9IHN0eWxlUG9zdHMubGVuZ3RoO1xuICAgICAgICAgICAgICAgIHJlc3VsdHNbJ2NvdW50X3RvdGFsJ10gPSBzdHlsZVBvc3RzLmxlbmd0aDtcblxuICAgICAgICAgICAgICAgIF9saXN0UHJvbWlzZS5yZXNvbHZlKHJlc3VsdHMpO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgcmV0dXJuIF9saXN0UHJvbWlzZS5wcm9taXNlO1xuICAgIH1cblxuICAgIGNyZWF0ZVByb2R1Y3Qobm9uY2UsIGF1dGhvciwgdGl0bGUsIGNvbnRlbnQsIHN0YXR1cywgc2Nob29sLCBzdWJjYXRlZ29yeTAsIHN1YmNhdGVnb3J5MSwgc3R5bGVzKTogUS5JUHJvbWlzZTx7fT4ge1xuICAgICAgICByZXR1cm4gdGhpcy5kYi5xdWVyeSgncG9zdHMvY3JlYXRlX3Bvc3QvP25vbmNlPScgKyBub25jZSArXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICcmYXV0aG9yPScgKyBhdXRob3IgK1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnJnRpdGxlPScgKyB0aXRsZSArXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICcmY29udGVudD0nICsgY29udGVudCArXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICcmc3RhdHVzPScgKyBzdGF0dXMpXG4gICAgICAgICAgICAudGhlbigocG9zdCkgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHBvc3QpO1xuXG4gICAgICAgICAgICAgICAgLy8gRkFMVEEgR1VBUkRBUiBTQ0hPT0wsIFNVQkNBVEVHT1JZLCBTVFlMRVNcblxuICAgICAgICAgICAgICAgIHJldHVybiBwb3N0O1xuICAgICAgICAgICAgfSlcbiAgICB9XG5cbiAgICB1cGRhdGVQcm9kdWN0KG5vbmNlLCBwcm9kdWN0SWQsIGF1dGhvciwgdGl0bGUsIGNvbnRlbnQsIHN0YXR1cywgY2F0ZWdvcmllcywgdGFncyk6IFEuSVByb21pc2U8e30+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZGIucXVlcnkoJ3Bvc3RzL3VwZGF0ZV9wb3N0Lz9ub25jZT0nICsgbm9uY2UgK1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnJmlkPScgKyBwcm9kdWN0SWQgK1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnJmF1dGhvcj0nICsgYXV0aG9yICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJyZ0aXRsZT0nICsgdGl0bGUgK1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnJmNvbnRlbnQ9JyArIGNvbnRlbnQgK1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnJnN0YXR1cz0nICsgc3RhdHVzICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJyZjYXRlZ29yaWVzPScgKyBjYXRlZ29yaWVzICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJyZ0YWdzPScgKyB0YWdzKVxuICAgIH1cblxuICAgIGRlbGV0ZVByb2R1Y3Qobm9uY2UsIHByb2R1Y3RJZCk6IFEuSVByb21pc2U8e30+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZGIucXVlcnkoJ3Bvc3RzL2RlbGV0ZV9wb3N0Lz9ub25jZT0nICsgbm9uY2UgK1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnJmlkPScgKyBwcm9kdWN0SWQpXG4gICAgfVxuXG4gICAgY3JlYXRlQ29tbWVudChwcm9kdWN0SWQsIGNvb2tpZSwgY29udGVudCk6IFEuSVByb21pc2U8e30+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZGIucXVlcnkoJ3VzZXIvcG9zdF9jb21tZW50Lz9wb3N0X2lkPScgKyBwcm9kdWN0SWQgK1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnJmNvb2tpZT0nICsgY29va2llICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJyZjb21tZW50X3N0YXR1cz0xJyArXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICcmY29udGVudD0nICsgY29udGVudClcbiAgICB9XG5cbiAgICBnZXRQcm9kdWN0c0J5U2VhcmNoKHNlYXJjaCwgcGFnZSk6IFEuSVByb21pc2U8e30+IHtcblxuICAgICAgICB2YXIgX3NlYXJjaFByb21pc2UgPSBRLmRlZmVyKCk7XG4gICAgICAgIHRoaXMuZGIucXVlcnkoJ2NvcmUvZ2V0X3NlYXJjaF9yZXN1bHRzLz9jb3VudD00JnNlYXJjaD0nICsgc2VhcmNoICtcbiAgICAgICAgICAgICcmcGFnZT0nICsgcGFnZSkudGhlbigocmVzdWx0cykgPT4ge1xuXG4gICAgICAgICAgICB2YXIgX3Bvc3RBdXRob3JQb3B1bGF0ZSA9IFtdO1xuXG4gICAgICAgICAgICByZXN1bHRzWydwb3N0cyddLmZvckVhY2goKHJlc3VsdCkgPT4ge1xuICAgICAgICAgICAgICAgIHZhciBhdXRob3JQcm9taXNlID0gUS5kZWZlcigpO1xuICAgICAgICAgICAgICAgIF9wb3N0QXV0aG9yUG9wdWxhdGUucHVzaChhdXRob3JQcm9taXNlLnByb21pc2UpO1xuICAgICAgICAgICAgICAgIGF1dGhvcnNTZXJ2LmdldFVzZXJJbmZvKHJlc3VsdC5pZClcbiAgICAgICAgICAgICAgICAgICAgLnRoZW4oKGRhdGEpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdFsnYXV0aG9yJ109IGRhdGE7XG4gICAgICAgICAgICAgICAgICAgICAgICBhdXRob3JQcm9taXNlLnJlc29sdmUoZGF0YSk7XG4gICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgUS5hbGwoX3Bvc3RBdXRob3JQb3B1bGF0ZSlcbiAgICAgICAgICAgICAgICAudGhlbigodmFsdWVzKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIF9zZWFyY2hQcm9taXNlLnJlc29sdmUocmVzdWx0cyk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiBfc2VhcmNoUHJvbWlzZS5wcm9taXNlO1xuICAgIH1cblxufTtcbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==