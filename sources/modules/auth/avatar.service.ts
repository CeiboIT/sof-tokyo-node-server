/// <reference path="../../index.ts" />

import Q = require("q");
import connection = require('../connection/connection.service');
var hapiServer = require('../../index');

var dbConn = connection.service;

export class AvatarService {
    private db;

    constructor () {
        this.db = connection.service; 
        if (!hapiServer.server.methods.getCachedAvatar) {
            console.log('avatarService > constructor > adding method');
            hapiServer.server.method('getCachedAvatar', this.getUserAvatarUrl, {
                cache: {
                    cache: 'mongodb',
                    expiresIn: 300 * 1000,
                    generateTimeout: 10000
                }
            });
        }
    }

    getUserAvatarUrl(userId, type, next) : void {
        console.log('avatarService getUserAvatarUrl ', userId);
        dbConn.query('user/get_avatar/?user_id=' + userId + '&type=' + type)
            .then(function (response) {
                if (response['error']) {
                    console.error('getUserAvatarUrl >  ERROR ', response['error']);
                    next(response['error'], null);
                } else {
                    console.log('avatarService > getUserAvatarUrl > then resolved ', response);                
                    next(null, response);                    
                }
            });
    }

    getUserAvatar(userId, type): Q.IPromise<{}> {
        var deferred = Q.defer();
        hapiServer.server.methods.getCachedAvatar(userId, type, function (err, response) {

            if (err) {
                console.error('avatarService > getUserAvatar ERROR ', err);
                deferred.resolve(err);
                return err;
            }
            console.log('avatarService > getUserAvatar > resolved ', JSON.stringify(response));
            deferred.resolve(response);
        });
        return deferred.promise;
    }

}