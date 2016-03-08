/// <reference path="../../../typings/tsd.d.ts" />
/// <reference path="../connection/connection.service.ts" />

import Q = require("q");
import connection = require('../connection/connection.service')
import Products = require('../products/products.service')
import Auth =require('../auth/auth.service')
import avatar = require('../auth/avatar.service');

var productsServ = new Products.ProductsService();

export interface IMembersService {
    // GET
    getMembersList(): Q.IPromise<{}>;
    getMemberById(memberId): Q.IPromise<{}>;
}


export class MembersService implements IMembersService {
    private db = connection.service;

    getMembersList(): Q.IPromise<{}> {
        var _listPromise = Q.defer();
        this.db.query_db("SELECT id, display_name FROM wp2_users")
            .then((data) => {
                _listPromise.resolve(data);
            });
        return _listPromise.promise;
    }

    getMemberById(memberId): Q.IPromise<{}> {
        var _promise = Q.defer();
        var avatarService = new avatar.AvatarService();

        productsServ.getProductsByAuthor(memberId).then(result => {
            avatarService.getUserAvatar(memberId, "thumb")
                .then(avatarInfo => {
                     result['author']['avatar'] = avatarInfo['avatar'];
                    _promise.resolve(result);
                });
        });
        return _promise.promise;
    }
};
