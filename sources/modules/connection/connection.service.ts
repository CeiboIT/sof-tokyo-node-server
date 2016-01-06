///<reference path='../../../typings/tsd.d.ts' />
'use strict';

import mysql = require("mysql");
import q = require("q");
import request = require("request");

export interface IConnectionService {
    query(params): q.IPromise<{}>
}

export class ConnectionService implements IConnectionService {
    private connectionStream;
    private options;
    constructor() { }

    query(params): q.IPromise<{}> {
        var _queryPromise = q.defer();
        request('http://www.sof.tokyo/' + params, function(error, response, body) {
            if (!error && response.statusCode == 200) {
                _queryPromise.resolve(JSON.parse(body)) // Show the HTML for the Google homepage.
            }
        })

        return _queryPromise.promise;
    }

}

export var service = new ConnectionService();
