'use strict';

///<reference path="../../../typings/tsd.d.ts" />

import service = require('./images.service');
import Joi = require('joi');

var ImagesService = new service.ImageService();
var _prefix = '/images';
var images = [
    {
        method: 'POST',
        path: _prefix + '/upload',
        handler: function(request, reply) {
            ImagesService.uploadImage(
                request.payload.file,
                request.payload.productId,
                request.payload.field)
                .then((data) => {
                    reply(data);
                })
        },
        config: {
            validate: {
                query: {
                    file: Joi.string(),
                    productId: Joi.number().integer(),
                    field: Joi.string(),
                }
            },
            notes: [
                "Field values: 'sofbackend__sof_work_meta__postImage'/'sofbackend__sof_work_meta__subImageX' (X = 1-9)",
                "File values: -base64 data-"
            ],
            description: 'Upload image to cloud server',
            tags: ['images']
        }
    }
]

module.exports = images;
