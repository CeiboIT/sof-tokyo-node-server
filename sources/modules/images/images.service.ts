/// <reference path="../../../typings/tsd.d.ts" />
/// <reference path="../connection/connection.service.ts" />

import Q = require("q");
var cloudinary = require('cloudinary');
var conf = require('../../optin.conf');

cloudinary.config({ 
    cloud_name: conf.cloudinary.cloud_name,
    api_key: conf.cloudinary.api_key,
    api_secret: conf.cloudinary.api_secret
});

export interface IImagesService {
    // POST
    uploadImage(body: any): Q.IPromise<{}>;
}

export class ImageService implements IImagesService {

    uploadImage(body): Q.IPromise<{}> {
        var _uploadPromise = Q.defer();

        cloudinary.uploader.upload(body.file, function (result) {
            _uploadPromise.resolve(result);
        });

        return _uploadPromise.promise;
    }
};
