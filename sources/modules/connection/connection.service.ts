///<reference path='../../../typings/tsd.d.ts' />
'use strict';

import mysql = require("mysql");
import q = require("q");
import request = require("request");

export interface IConnectionService {
    query(params): q.IPromise<{}>
    query_db(params): q.IPromise<{}>
}

export class ConnectionService implements IConnectionService {
    private connectionStream;
    private dbConfig;

    constructor() {
        this.dbConfig = {
            host: 'gator2009.hostgator.com',
            user: 'tdnb1207_sof',
            password: 'pkc~^_9WZ(us',
            // database: 'tdnb1207_sof', // production
            database: 'tdnb1207_sof_develop', // develop
            debug: false,
            insecureAuth: true
        }
    }

    query(params): q.IPromise<{}> {
        var _queryPromise = q.defer();
        request('http://sof.tokyo/api/' + params, function(error, response, body) {
            if (!error && response.statusCode == 200) {
                _queryPromise.resolve(JSON.parse(body)) // Show the HTML for the Google homepage.
            } else {
                console.error('connection.service > query error ', error);
                _queryPromise.reject(error);
                // _queryPromise.resolve(JSON.parse(body))
            }
        })
        return _queryPromise.promise;
    }

    query_db(params): q.IPromise<{}> {
        var defer = q.defer();
        var _rows;
        var _connection = mysql.createConnection(this.dbConfig);
        _connection.query(params, (err, rows) => {
            _connection.end();
            if (err) {
                defer.reject(err); throw err
            };
            defer.resolve(rows);
        })
        return defer.promise;
    }

}

export var service = new ConnectionService();
