/// <reference path="../../../typings/tsd.d.ts" />
/// <reference path="../connection/connection.service.d.ts" />
import Q = require("q");
export interface IProductsService {
    getProductsNew(page: any): Q.IPromise<{}>;
    getProductsList(page: any): Q.IPromise<{}>;
    getProductById(productId: any): Q.IPromise<{}>;
    getProductsByAuthor(authorId: any, page: any): Q.IPromise<{}>;
    getProductsBySchool(schoolId: any, page: any): Q.IPromise<{}>;
    getProductsBySubcategory0(subcategory0Id: any, page: any): Q.IPromise<{}>;
    getProductsBySubcategory1(subcategory1Id: any, page: any): Q.IPromise<{}>;
    getProductsByStyle(styleId: any, page: any): Q.IPromise<{}>;
    getProductsBySearch(search: any, page: any): Q.IPromise<{}>;
    getProductsRankingByLikes(): Q.IPromise<{}>;
    getProductsRankingByVisits(): Q.IPromise<{}>;
    createProduct(nonce: any, author: any, title: any, content: any, status: any, school: any, subcategory0: any, subcategory1: any, styles: any): Q.IPromise<{}>;
    createComment(productId: any, cookie: any, content: any): Q.IPromise<{}>;
    updateProduct(nonce: any, productId: any, author: any, title: any, content: any, status: any, categories: any, tags: any): Q.IPromise<{}>;
    deleteProduct(nonce: any, productId: any): Q.IPromise<{}>;
}
export declare class ProductsService implements IProductsService {
    private db;
    getProductsNew(page: any): Q.IPromise<{}>;
    getProductsList(page: any): Q.IPromise<{}>;
    getProductById(productId: any): Q.IPromise<{}>;
    getProductsByAuthor(authorId: any): Q.IPromise<{}>;
    getProductsBySchool(schoolId: any, page: any): Q.IPromise<{}>;
    getProductsBySubcategory0(subcategory0Id: any, page: any): Q.IPromise<{}>;
    getProductsBySubcategory1(subcategory1Id: any, page: any): Q.IPromise<{}>;
    getProductsByStyle(styleId: any, page: any): Q.IPromise<{}>;
    createProduct(nonce: any, author: any, title: any, content: any, status: any, school: any, subcategory0: any, subcategory1: any, styles: any): Q.IPromise<{}>;
    updateProduct(nonce: any, productId: any, author: any, title: any, content: any, status: any, categories: any, tags: any): Q.IPromise<{}>;
    deleteProduct(nonce: any, productId: any): Q.IPromise<{}>;
    createComment(productId: any, cookie: any, content: any): Q.IPromise<{}>;
    getProductsBySearch(search: any, page: any): Q.IPromise<{}>;
    getProductsRankingByLikes(): Q.IPromise<{}>;
    getProductsRankingByVisits(): Q.IPromise<{}>;
}
