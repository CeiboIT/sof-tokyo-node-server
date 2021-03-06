/// <reference path="../../../typings/tsd.d.ts" />
/// <reference path="../connection/connection.service.ts" />

import Q = require("q");
var cloudinary = require('cloudinary');
var conf = require('../../optin.conf');

import metadata = require("../metadata/metadata.service");
var metadataServ = new metadata.MetadataService();

cloudinary.config({
    cloud_name: conf.cloudinary.cloud_name,
    api_key: conf.cloudinary.api_key,
    api_secret: conf.cloudinary.api_secret
});

export interface IImagesService {
    // POST
    uploadImage(file, productId, field): Q.IPromise<{}>;
    updateImage(file, productId, field): Q.IPromise<{}>;
}

export class ImagesService implements IImagesService {

    uploadImage(file, productId, field): Q.IPromise<{}> {
        var _uploadPromise = Q.defer();

        // upload -base64 data- to cloudinary
        cloudinary.uploader.upload(file, function (result) {

            // save cloudinary result url as post metadata field
            metadataServ.createProductImage(productId, field, result.url)
                .then((result2) => {
                    _uploadPromise.resolve(result);
                })
        });

        return _uploadPromise.promise;
    }

    updateImage(file, productId, field): Q.IPromise<{}> {
        var _updatePromise = Q.defer();

        // upload -base64 data- to cloudinary
        cloudinary.uploader.upload(file, function (result) {

            // save cloudinary result url as post metadata field
            metadataServ.updateProductImage(productId, field, result.url)
                .then((result2) => {
                    _updatePromise.resolve(result);
                })
        });

        return _updatePromise.promise;

    }
};
