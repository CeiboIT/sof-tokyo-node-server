'use strict';
///<reference path="../../../typings/tsd.d.ts" />
var service = require('./images.service');
var Joi = require('joi');
var ImagesService = new service.ImagesService();
var _prefix = '/images';
var images = [
    {
        method: 'POST',
        path: _prefix + '/upload',
        handler: function (request, reply) {
            ImagesService.uploadImage(request.payload.file, request.payload.productId, request.payload.field).then(function (data) {
                reply(data);
            });
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
            description: 'Upload image to product',
            tags: ['images']
        }
    },
    {
        method: 'POST',
        path: _prefix + '/update',
        handler: function (request, reply) {
            ImagesService.updateImage(request.payload.file, request.payload.productId, request.payload.field).then(function (data) {
                reply(data);
            });
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
            description: 'Update image from product',
            tags: ['images']
        }
    }
];
module.exports = images;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1vZHVsZXMvaW1hZ2VzL2ltYWdlcy5yb3V0ZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsWUFBWSxDQUFDO0FBRWIsQUFFQSxpREFGaUQ7QUFFakQsSUFBTyxPQUFPLFdBQVcsa0JBQWtCLENBQUMsQ0FBQztBQUM3QyxJQUFPLEdBQUcsV0FBVyxLQUFLLENBQUMsQ0FBQztBQUU1QixJQUFJLGFBQWEsR0FBRyxJQUFJLE9BQU8sQ0FBQyxhQUFhLEVBQUUsQ0FBQztBQUNoRCxJQUFJLE9BQU8sR0FBRyxTQUFTLENBQUM7QUFDeEIsSUFBSSxNQUFNLEdBQUc7SUFDVDtRQUNJLE1BQU0sRUFBRSxNQUFNO1FBQ2QsSUFBSSxFQUFFLE9BQU8sR0FBRyxTQUFTO1FBQ3pCLE9BQU8sRUFBRSxVQUFTLE9BQU8sRUFBRSxLQUFLO1lBQzVCLGFBQWEsQ0FBQyxXQUFXLENBQ3JCLE9BQU8sQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUNwQixPQUFPLENBQUMsT0FBTyxDQUFDLFNBQVMsRUFDekIsT0FBTyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FDckIsSUFBSSxDQUFDLFVBQUMsSUFBSTtnQkFDUCxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDaEIsQ0FBQyxDQUFDLENBQUE7UUFDVixDQUFDO1FBQ0QsTUFBTSxFQUFFO1lBQ0osUUFBUSxFQUFFO2dCQUNOLEtBQUssRUFBRTtvQkFDSCxJQUFJLEVBQUUsR0FBRyxDQUFDLE1BQU0sRUFBRTtvQkFDbEIsU0FBUyxFQUFFLEdBQUcsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxPQUFPLEVBQUU7b0JBQ2pDLEtBQUssRUFBRSxHQUFHLENBQUMsTUFBTSxFQUFFO2lCQUN0QjthQUNKO1lBQ0QsS0FBSyxFQUFFO2dCQUNILHVHQUF1RztnQkFDdkcsNEJBQTRCO2FBQy9CO1lBQ0QsV0FBVyxFQUFFLHlCQUF5QjtZQUN0QyxJQUFJLEVBQUUsQ0FBQyxRQUFRLENBQUM7U0FDbkI7S0FDSjtJQUNEO1FBQ0ksTUFBTSxFQUFFLE1BQU07UUFDZCxJQUFJLEVBQUUsT0FBTyxHQUFHLFNBQVM7UUFDekIsT0FBTyxFQUFFLFVBQVMsT0FBTyxFQUFFLEtBQUs7WUFDNUIsYUFBYSxDQUFDLFdBQVcsQ0FDckIsT0FBTyxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQ3BCLE9BQU8sQ0FBQyxPQUFPLENBQUMsU0FBUyxFQUN6QixPQUFPLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUNyQixJQUFJLENBQUMsVUFBQyxJQUFJO2dCQUNQLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUNoQixDQUFDLENBQUMsQ0FBQTtRQUNWLENBQUM7UUFDRCxNQUFNLEVBQUU7WUFDSixRQUFRLEVBQUU7Z0JBQ04sS0FBSyxFQUFFO29CQUNILElBQUksRUFBRSxHQUFHLENBQUMsTUFBTSxFQUFFO29CQUNsQixTQUFTLEVBQUUsR0FBRyxDQUFDLE1BQU0sRUFBRSxDQUFDLE9BQU8sRUFBRTtvQkFDakMsS0FBSyxFQUFFLEdBQUcsQ0FBQyxNQUFNLEVBQUU7aUJBQ3RCO2FBQ0o7WUFDRCxLQUFLLEVBQUU7Z0JBQ0gsdUdBQXVHO2dCQUN2Ryw0QkFBNEI7YUFDL0I7WUFDRCxXQUFXLEVBQUUsMkJBQTJCO1lBQ3hDLElBQUksRUFBRSxDQUFDLFFBQVEsQ0FBQztTQUNuQjtLQUNKO0NBQ0osQ0FBQTtBQUVELE1BQU0sQ0FBQyxPQUFPLEdBQUcsTUFBTSxDQUFDIiwiZmlsZSI6Im1vZHVsZXMvaW1hZ2VzL2ltYWdlcy5yb3V0ZXMuanMiLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCc7XG5cbi8vLzxyZWZlcmVuY2UgcGF0aD1cIi4uLy4uLy4uL3R5cGluZ3MvdHNkLmQudHNcIiAvPlxuXG5pbXBvcnQgc2VydmljZSA9IHJlcXVpcmUoJy4vaW1hZ2VzLnNlcnZpY2UnKTtcbmltcG9ydCBKb2kgPSByZXF1aXJlKCdqb2knKTtcblxudmFyIEltYWdlc1NlcnZpY2UgPSBuZXcgc2VydmljZS5JbWFnZXNTZXJ2aWNlKCk7XG52YXIgX3ByZWZpeCA9ICcvaW1hZ2VzJztcbnZhciBpbWFnZXMgPSBbXG4gICAge1xuICAgICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgICAgcGF0aDogX3ByZWZpeCArICcvdXBsb2FkJyxcbiAgICAgICAgaGFuZGxlcjogZnVuY3Rpb24ocmVxdWVzdCwgcmVwbHkpIHtcbiAgICAgICAgICAgIEltYWdlc1NlcnZpY2UudXBsb2FkSW1hZ2UoXG4gICAgICAgICAgICAgICAgcmVxdWVzdC5wYXlsb2FkLmZpbGUsXG4gICAgICAgICAgICAgICAgcmVxdWVzdC5wYXlsb2FkLnByb2R1Y3RJZCxcbiAgICAgICAgICAgICAgICByZXF1ZXN0LnBheWxvYWQuZmllbGQpXG4gICAgICAgICAgICAgICAgLnRoZW4oKGRhdGEpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgcmVwbHkoZGF0YSk7XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgfSxcbiAgICAgICAgY29uZmlnOiB7XG4gICAgICAgICAgICB2YWxpZGF0ZToge1xuICAgICAgICAgICAgICAgIHF1ZXJ5OiB7XG4gICAgICAgICAgICAgICAgICAgIGZpbGU6IEpvaS5zdHJpbmcoKSxcbiAgICAgICAgICAgICAgICAgICAgcHJvZHVjdElkOiBKb2kubnVtYmVyKCkuaW50ZWdlcigpLFxuICAgICAgICAgICAgICAgICAgICBmaWVsZDogSm9pLnN0cmluZygpLFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBub3RlczogW1xuICAgICAgICAgICAgICAgIFwiRmllbGQgdmFsdWVzOiAnc29mYmFja2VuZF9fc29mX3dvcmtfbWV0YV9fcG9zdEltYWdlJy8nc29mYmFja2VuZF9fc29mX3dvcmtfbWV0YV9fc3ViSW1hZ2VYJyAoWCA9IDEtOSlcIixcbiAgICAgICAgICAgICAgICBcIkZpbGUgdmFsdWVzOiAtYmFzZTY0IGRhdGEtXCJcbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogJ1VwbG9hZCBpbWFnZSB0byBwcm9kdWN0JyxcbiAgICAgICAgICAgIHRhZ3M6IFsnaW1hZ2VzJ11cbiAgICAgICAgfVxuICAgIH0sXG4gICAge1xuICAgICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgICAgcGF0aDogX3ByZWZpeCArICcvdXBkYXRlJyxcbiAgICAgICAgaGFuZGxlcjogZnVuY3Rpb24ocmVxdWVzdCwgcmVwbHkpIHtcbiAgICAgICAgICAgIEltYWdlc1NlcnZpY2UudXBkYXRlSW1hZ2UoXG4gICAgICAgICAgICAgICAgcmVxdWVzdC5wYXlsb2FkLmZpbGUsXG4gICAgICAgICAgICAgICAgcmVxdWVzdC5wYXlsb2FkLnByb2R1Y3RJZCxcbiAgICAgICAgICAgICAgICByZXF1ZXN0LnBheWxvYWQuZmllbGQpXG4gICAgICAgICAgICAgICAgLnRoZW4oKGRhdGEpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgcmVwbHkoZGF0YSk7XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgfSxcbiAgICAgICAgY29uZmlnOiB7XG4gICAgICAgICAgICB2YWxpZGF0ZToge1xuICAgICAgICAgICAgICAgIHF1ZXJ5OiB7XG4gICAgICAgICAgICAgICAgICAgIGZpbGU6IEpvaS5zdHJpbmcoKSxcbiAgICAgICAgICAgICAgICAgICAgcHJvZHVjdElkOiBKb2kubnVtYmVyKCkuaW50ZWdlcigpLFxuICAgICAgICAgICAgICAgICAgICBmaWVsZDogSm9pLnN0cmluZygpLFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBub3RlczogW1xuICAgICAgICAgICAgICAgIFwiRmllbGQgdmFsdWVzOiAnc29mYmFja2VuZF9fc29mX3dvcmtfbWV0YV9fcG9zdEltYWdlJy8nc29mYmFja2VuZF9fc29mX3dvcmtfbWV0YV9fc3ViSW1hZ2VYJyAoWCA9IDEtOSlcIixcbiAgICAgICAgICAgICAgICBcIkZpbGUgdmFsdWVzOiAtYmFzZTY0IGRhdGEtXCJcbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogJ1VwZGF0ZSBpbWFnZSBmcm9tIHByb2R1Y3QnLFxuICAgICAgICAgICAgdGFnczogWydpbWFnZXMnXVxuICAgICAgICB9XG4gICAgfVxuXVxuXG5tb2R1bGUuZXhwb3J0cyA9IGltYWdlcztcbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==