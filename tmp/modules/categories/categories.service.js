/// <reference path="../../../typings/tsd.d.ts" />
/// <reference path="../connection/connection.service.ts" />
/*
import Q = require("q");
import connection = require('../connection/connection.service')

export interface ICategoriesService {
    getCategoriesList(): Q.IPromise<{}>
    getCategoryById(productId): Q.IPromise<{}>
}


export class CategoriesService implements ICategoriesService {
    private db = connection.service;

    // TODO Necesitamos implementar paginacion Urgente!!!!


    getCategoriesList(): Q.IPromise<{}> {
        var _listPromise = Q.defer();

        this.db.query('?json=get_recent_posts')
            .then((results) => {
                _listPromise.resolve(results['posts']);
            })

        return _listPromise.promise;
    }

    getCategoryById(categoryId): Q.IPromise<{}> {
        return this.db.query('?json=1&p=' + categoryId)
    }
/// <reference path="../../../typings/tsd.d.ts" />
/// <reference path="../connection/connection.service.ts" />
/*
import Q = require("q");
import connection = require('../connection/connection.service')

export interface ICategoriesService {
    getCategoriesList(): Q.IPromise<{}>
    getCategoryById(productId): Q.IPromise<{}>
}


export class CategoriesService implements ICategoriesService {
    private db = connection.service;

    // TODO Necesitamos implementar paginacion Urgente!!!! 


    getCategoriesList(): Q.IPromise<{}> {
        var _listPromise = Q.defer();

        this.db.query('?json=get_recent_posts')
            .then((results) => {
                _listPromise.resolve(results['posts']);
            })

        return _listPromise.promise;
    }

    getCategoryById(categoryId): Q.IPromise<{}> {
        return this.db.query('?json=1&p=' + categoryId)
    }
 

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1vZHVsZXMvY2F0ZWdvcmllcy9jYXRlZ29yaWVzLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsa0RBQWtEO0FBQ2xELDREQUE0RDtBQUM1RDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQThCSSIsImZpbGUiOiJtb2R1bGVzL2NhdGVnb3JpZXMvY2F0ZWdvcmllcy5zZXJ2aWNlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy8vIDxyZWZlcmVuY2UgcGF0aD1cIi4uLy4uLy4uL3R5cGluZ3MvdHNkLmQudHNcIiAvPlxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPVwiLi4vY29ubmVjdGlvbi9jb25uZWN0aW9uLnNlcnZpY2UudHNcIiAvPlxyXG4vKlxyXG5pbXBvcnQgUSA9IHJlcXVpcmUoXCJxXCIpO1xyXG5pbXBvcnQgY29ubmVjdGlvbiA9IHJlcXVpcmUoJy4uL2Nvbm5lY3Rpb24vY29ubmVjdGlvbi5zZXJ2aWNlJylcclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgSUNhdGVnb3JpZXNTZXJ2aWNlIHtcclxuICAgIGdldENhdGVnb3JpZXNMaXN0KCk6IFEuSVByb21pc2U8e30+XHJcbiAgICBnZXRDYXRlZ29yeUJ5SWQocHJvZHVjdElkKTogUS5JUHJvbWlzZTx7fT5cclxufVxyXG5cclxuXHJcbmV4cG9ydCBjbGFzcyBDYXRlZ29yaWVzU2VydmljZSBpbXBsZW1lbnRzIElDYXRlZ29yaWVzU2VydmljZSB7XHJcbiAgICBwcml2YXRlIGRiID0gY29ubmVjdGlvbi5zZXJ2aWNlO1xyXG5cclxuICAgIC8vIFRPRE8gTmVjZXNpdGFtb3MgaW1wbGVtZW50YXIgcGFnaW5hY2lvbiBVcmdlbnRlISEhISBcclxuXHJcblxyXG4gICAgZ2V0Q2F0ZWdvcmllc0xpc3QoKTogUS5JUHJvbWlzZTx7fT4ge1xyXG4gICAgICAgIHZhciBfbGlzdFByb21pc2UgPSBRLmRlZmVyKCk7XHJcblxyXG4gICAgICAgIHRoaXMuZGIucXVlcnkoJz9qc29uPWdldF9yZWNlbnRfcG9zdHMnKVxyXG4gICAgICAgICAgICAudGhlbigocmVzdWx0cykgPT4ge1xyXG4gICAgICAgICAgICAgICAgX2xpc3RQcm9taXNlLnJlc29sdmUocmVzdWx0c1sncG9zdHMnXSk7XHJcbiAgICAgICAgICAgIH0pXHJcblxyXG4gICAgICAgIHJldHVybiBfbGlzdFByb21pc2UucHJvbWlzZTtcclxuICAgIH1cclxuXHJcbiAgICBnZXRDYXRlZ29yeUJ5SWQoY2F0ZWdvcnlJZCk6IFEuSVByb21pc2U8e30+IHtcclxuICAgICAgICByZXR1cm4gdGhpcy5kYi5xdWVyeSgnP2pzb249MSZwPScgKyBjYXRlZ29yeUlkKVxyXG4gICAgfVxyXG59OyovIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9