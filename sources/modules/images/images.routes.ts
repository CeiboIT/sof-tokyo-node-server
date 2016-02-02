'use strict';

///<reference path="../../../typings/tsd.d.ts" />

import service = require('./images.service');

var ImagesService = new service.ImageService();
var _prefix = '/images';
var images = [
    {
        method: 'POST',
        path: _prefix + '/upload',
        handler: function(request, reply) {
            ImagesService.uploadImage(request.payload)
                .then((data) => {
                    reply(data);
                })
        },
        config: {
            description: 'Upload image to cloud server',
            tags: ['images']
        }
    }
]

module.exports = images;
