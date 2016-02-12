/// <reference path="../../../typings/tsd.d.ts" />
/// <reference path="../connection/connection.service.ts" />
var Q = require("q");
var cloudinary = require('cloudinary');
var conf = require('../../optin.conf');
var metadata = require("../metadata/metadata.service");
var metadataServ = new metadata.MetadataService();
cloudinary.config({
    cloud_name: conf.cloudinary.cloud_name,
    api_key: conf.cloudinary.api_key,
    api_secret: conf.cloudinary.api_secret
});
var ImagesService = (function () {
    function ImagesService() {
    }
    ImagesService.prototype.uploadImage = function (file, productId, field) {
        var _uploadPromise = Q.defer();
        // upload -base64 data- to cloudinary
        cloudinary.uploader.upload(file, function (result) {
            // save cloudinary result url as post metadata field
            metadataServ.createProductImage(productId, field, result.url).then(function (result2) {
                _uploadPromise.resolve(result);
            });
        });
        return _uploadPromise.promise;
    };
    return ImagesService;
})();
exports.ImagesService = ImagesService;
;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1vZHVsZXMvaW1hZ2VzL2ltYWdlcy5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbIkltYWdlc1NlcnZpY2UiLCJJbWFnZXNTZXJ2aWNlLmNvbnN0cnVjdG9yIiwiSW1hZ2VzU2VydmljZS51cGxvYWRJbWFnZSJdLCJtYXBwaW5ncyI6IkFBQUEsa0RBQWtEO0FBQ2xELDREQUE0RDtBQUU1RCxJQUFPLENBQUMsV0FBVyxHQUFHLENBQUMsQ0FBQztBQUN4QixJQUFJLFVBQVUsR0FBRyxPQUFPLENBQUMsWUFBWSxDQUFDLENBQUM7QUFDdkMsSUFBSSxJQUFJLEdBQUcsT0FBTyxDQUFDLGtCQUFrQixDQUFDLENBQUM7QUFFdkMsSUFBTyxRQUFRLFdBQVcsOEJBQThCLENBQUMsQ0FBQztBQUMxRCxJQUFJLFlBQVksR0FBRyxJQUFJLFFBQVEsQ0FBQyxlQUFlLEVBQUUsQ0FBQztBQUVsRCxVQUFVLENBQUMsTUFBTSxDQUFDO0lBQ2QsVUFBVSxFQUFFLElBQUksQ0FBQyxVQUFVLENBQUMsVUFBVTtJQUN0QyxPQUFPLEVBQUUsSUFBSSxDQUFDLFVBQVUsQ0FBQyxPQUFPO0lBQ2hDLFVBQVUsRUFBRSxJQUFJLENBQUMsVUFBVSxDQUFDLFVBQVU7Q0FDekMsQ0FBQyxDQUFDO0FBT0gsSUFBYSxhQUFhO0lBQTFCQSxTQUFhQSxhQUFhQTtJQWlCMUJDLENBQUNBO0lBZkdELG1DQUFXQSxHQUFYQSxVQUFZQSxJQUFJQSxFQUFFQSxTQUFTQSxFQUFFQSxLQUFLQTtRQUM5QkUsSUFBSUEsY0FBY0EsR0FBR0EsQ0FBQ0EsQ0FBQ0EsS0FBS0EsRUFBRUEsQ0FBQ0E7UUFFL0JBLEFBQ0FBLHFDQURxQ0E7UUFDckNBLFVBQVVBLENBQUNBLFFBQVFBLENBQUNBLE1BQU1BLENBQUNBLElBQUlBLEVBQUVBLFVBQVVBLE1BQU1BO1lBRTdDLEFBQ0Esb0RBRG9EO1lBQ3BELFlBQVksQ0FBQyxrQkFBa0IsQ0FBQyxTQUFTLEVBQUUsS0FBSyxFQUFFLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FDeEQsSUFBSSxDQUFDLFVBQUMsT0FBTztnQkFDVixjQUFjLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQ25DLENBQUMsQ0FBQyxDQUFBO1FBQ1YsQ0FBQyxDQUFDQSxDQUFDQTtRQUVIQSxNQUFNQSxDQUFDQSxjQUFjQSxDQUFDQSxPQUFPQSxDQUFDQTtJQUNsQ0EsQ0FBQ0E7SUFDTEYsb0JBQUNBO0FBQURBLENBakJBLEFBaUJDQSxJQUFBO0FBakJZLHFCQUFhLEdBQWIsYUFpQlosQ0FBQTtBQUFBLENBQUMiLCJmaWxlIjoibW9kdWxlcy9pbWFnZXMvaW1hZ2VzLnNlcnZpY2UuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvLy8gPHJlZmVyZW5jZSBwYXRoPVwiLi4vLi4vLi4vdHlwaW5ncy90c2QuZC50c1wiIC8+XG4vLy8gPHJlZmVyZW5jZSBwYXRoPVwiLi4vY29ubmVjdGlvbi9jb25uZWN0aW9uLnNlcnZpY2UudHNcIiAvPlxuXG5pbXBvcnQgUSA9IHJlcXVpcmUoXCJxXCIpO1xudmFyIGNsb3VkaW5hcnkgPSByZXF1aXJlKCdjbG91ZGluYXJ5Jyk7XG52YXIgY29uZiA9IHJlcXVpcmUoJy4uLy4uL29wdGluLmNvbmYnKTtcblxuaW1wb3J0IG1ldGFkYXRhID0gcmVxdWlyZShcIi4uL21ldGFkYXRhL21ldGFkYXRhLnNlcnZpY2VcIik7XG52YXIgbWV0YWRhdGFTZXJ2ID0gbmV3IG1ldGFkYXRhLk1ldGFkYXRhU2VydmljZSgpO1xuXG5jbG91ZGluYXJ5LmNvbmZpZyh7XG4gICAgY2xvdWRfbmFtZTogY29uZi5jbG91ZGluYXJ5LmNsb3VkX25hbWUsXG4gICAgYXBpX2tleTogY29uZi5jbG91ZGluYXJ5LmFwaV9rZXksXG4gICAgYXBpX3NlY3JldDogY29uZi5jbG91ZGluYXJ5LmFwaV9zZWNyZXRcbn0pO1xuXG5leHBvcnQgaW50ZXJmYWNlIElJbWFnZXNTZXJ2aWNlIHtcbiAgICAvLyBQT1NUXG4gICAgdXBsb2FkSW1hZ2UoZmlsZSwgcHJvZHVjdElkLCBmaWVsZCk6IFEuSVByb21pc2U8e30+O1xufVxuXG5leHBvcnQgY2xhc3MgSW1hZ2VzU2VydmljZSBpbXBsZW1lbnRzIElJbWFnZXNTZXJ2aWNlIHtcblxuICAgIHVwbG9hZEltYWdlKGZpbGUsIHByb2R1Y3RJZCwgZmllbGQpOiBRLklQcm9taXNlPHt9PiB7XG4gICAgICAgIHZhciBfdXBsb2FkUHJvbWlzZSA9IFEuZGVmZXIoKTtcblxuICAgICAgICAvLyB1cGxvYWQgLWJhc2U2NCBkYXRhLSB0byBjbG91ZGluYXJ5XG4gICAgICAgIGNsb3VkaW5hcnkudXBsb2FkZXIudXBsb2FkKGZpbGUsIGZ1bmN0aW9uIChyZXN1bHQpIHtcblxuICAgICAgICAgICAgLy8gc2F2ZSBjbG91ZGluYXJ5IHJlc3VsdCB1cmwgYXMgcG9zdCBtZXRhZGF0YSBmaWVsZFxuICAgICAgICAgICAgbWV0YWRhdGFTZXJ2LmNyZWF0ZVByb2R1Y3RJbWFnZShwcm9kdWN0SWQsIGZpZWxkLCByZXN1bHQudXJsKVxuICAgICAgICAgICAgICAgIC50aGVuKChyZXN1bHQyKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIF91cGxvYWRQcm9taXNlLnJlc29sdmUocmVzdWx0KTtcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gX3VwbG9hZFByb21pc2UucHJvbWlzZTtcbiAgICB9XG59O1xuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9