/// <reference path="../../../typings/tsd.d.ts" />
/// <reference path="../connection/connection.service.d.ts" />
import Q = require("q");
export interface IMetadataService {
    getSubcategories0List(): Q.IPromise<{}>;
    getSubcategories1List(): Q.IPromise<{}>;
    getSchoolsList(): Q.IPromise<{}>;
    getStylesList(): Q.IPromise<{}>;
    getSchoolByMemberId(memberId: any): Q.IPromise<{}>;
    getProductMetadata(productId: any): Q.IPromise<{}>;
    getProductUniqueVisits(productId: any): Q.IPromise<{}>;
    getProductTotalVisits(productId: any): Q.IPromise<{}>;
    createProductLike(productId: any): Q.IPromise<{}>;
}
export declare class MetadataService implements IMetadataService {
    private db;
    getSubcategories0List(): Q.IPromise<{}>;
    getSubcategories1List(): Q.IPromise<{}>;
    getSchoolsList(): Q.IPromise<{}>;
    getStylesList(): Q.IPromise<{}>;
    getSchoolByMemberId(memberId: any): Q.IPromise<{}>;
    getProductMetadata(productId: any): Q.IPromise<{}>;
    createProductLike(productId: any): Q.IPromise<{}>;
    getProductUniqueVisits(productId: any): Q.IPromise<{}>;
    getProductTotalVisits(productId: any): Q.IPromise<{}>;
}
