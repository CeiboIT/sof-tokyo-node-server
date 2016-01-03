///<reference path='../../../typings/tsd.d.ts' />
'use strict';
var q = require("q");
var request = require("request");
var ConnectionService = (function () {
    function ConnectionService() {
    }
    ConnectionService.prototype.query = function (params) {
        var _queryPromise = q.defer();
        request('http://www.sof.tokyo/' + params, function (error, response, body) {
            if (!error && response.statusCode == 200) {
                _queryPromise.resolve(JSON.parse(body)); // Show the HTML for the Google homepage. 
            }
        });
        return _queryPromise.promise;
    };
    return ConnectionService;
})();
exports.ConnectionService = ConnectionService;
exports.service = new ConnectionService();

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1vZHVsZXMvY29ubmVjdGlvbi9jb25uZWN0aW9uLnNlcnZpY2UudHMiXSwibmFtZXMiOlsiQ29ubmVjdGlvblNlcnZpY2UiLCJDb25uZWN0aW9uU2VydmljZS5jb25zdHJ1Y3RvciIsIkNvbm5lY3Rpb25TZXJ2aWNlLnF1ZXJ5Il0sIm1hcHBpbmdzIjoiQUFBQSxBQUNBLGlEQURpRDtBQUNqRCxZQUFZLENBQUM7QUFHYixJQUFPLENBQUMsV0FBVyxHQUFHLENBQUMsQ0FBQztBQUN4QixJQUFPLE9BQU8sV0FBVyxTQUFTLENBQUMsQ0FBQztBQU1wQyxJQUFhLGlCQUFpQjtJQUcxQkEsU0FIU0EsaUJBQWlCQTtJQUdWQyxDQUFDQTtJQUVqQkQsaUNBQUtBLEdBQUxBLFVBQU1BLE1BQU1BO1FBQ1JFLElBQUlBLGFBQWFBLEdBQUdBLENBQUNBLENBQUNBLEtBQUtBLEVBQUVBLENBQUNBO1FBQzlCQSxPQUFPQSxDQUFDQSx1QkFBdUJBLEdBQUdBLE1BQU1BLEVBQUVBLFVBQVNBLEtBQUtBLEVBQUVBLFFBQVFBLEVBQUVBLElBQUlBO1lBQ3BFLEVBQUUsQ0FBQyxDQUFDLENBQUMsS0FBSyxJQUFJLFFBQVEsQ0FBQyxVQUFVLElBQUksR0FBRyxDQUFDLENBQUMsQ0FBQztnQkFDdkMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUMsMENBQTBDO1lBQ3RGLENBQUMsR0FEMEM7UUFFL0MsQ0FBQyxDQUFDQSxDQUFBQTtRQUVGQSxNQUFNQSxDQUFDQSxhQUFhQSxDQUFDQSxPQUFPQSxDQUFDQTtJQUNqQ0EsQ0FBQ0E7SUFFTEYsd0JBQUNBO0FBQURBLENBaEJBLEFBZ0JDQSxJQUFBO0FBaEJZLHlCQUFpQixHQUFqQixpQkFnQlosQ0FBQTtBQUVVLGVBQU8sR0FBRyxJQUFJLGlCQUFpQixFQUFFLENBQUMiLCJmaWxlIjoibW9kdWxlcy9jb25uZWN0aW9uL2Nvbm5lY3Rpb24uc2VydmljZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vLzxyZWZlcmVuY2UgcGF0aD0nLi4vLi4vLi4vdHlwaW5ncy90c2QuZC50cycgLz5cclxuJ3VzZSBzdHJpY3QnO1xyXG5cclxuaW1wb3J0IG15c3FsID0gcmVxdWlyZShcIm15c3FsXCIpO1xyXG5pbXBvcnQgcSA9IHJlcXVpcmUoXCJxXCIpO1xyXG5pbXBvcnQgcmVxdWVzdCA9IHJlcXVpcmUoXCJyZXF1ZXN0XCIpO1xyXG5cclxuZXhwb3J0IGludGVyZmFjZSBJQ29ubmVjdGlvblNlcnZpY2Uge1xyXG4gICAgcXVlcnkocGFyYW1zKTogcS5JUHJvbWlzZTx7fT5cclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIENvbm5lY3Rpb25TZXJ2aWNlIGltcGxlbWVudHMgSUNvbm5lY3Rpb25TZXJ2aWNlIHtcclxuICAgIHByaXZhdGUgY29ubmVjdGlvblN0cmVhbTtcclxuICAgIHByaXZhdGUgb3B0aW9ucztcclxuICAgIGNvbnN0cnVjdG9yKCkgeyB9XHJcblxyXG4gICAgcXVlcnkocGFyYW1zKTogcS5JUHJvbWlzZTx7fT4ge1xyXG4gICAgICAgIHZhciBfcXVlcnlQcm9taXNlID0gcS5kZWZlcigpO1xyXG4gICAgICAgIHJlcXVlc3QoJ2h0dHA6Ly93d3cuc29mLnRva3lvLycgKyBwYXJhbXMsIGZ1bmN0aW9uKGVycm9yLCByZXNwb25zZSwgYm9keSkge1xyXG4gICAgICAgICAgICBpZiAoIWVycm9yICYmIHJlc3BvbnNlLnN0YXR1c0NvZGUgPT0gMjAwKSB7XHJcbiAgICAgICAgICAgICAgICBfcXVlcnlQcm9taXNlLnJlc29sdmUoSlNPTi5wYXJzZShib2R5KSkgLy8gU2hvdyB0aGUgSFRNTCBmb3IgdGhlIEdvb2dsZSBob21lcGFnZS4gXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG5cclxuICAgICAgICByZXR1cm4gX3F1ZXJ5UHJvbWlzZS5wcm9taXNlO1xyXG4gICAgfVxyXG5cclxufVxyXG5cclxuZXhwb3J0IHZhciBzZXJ2aWNlID0gbmV3IENvbm5lY3Rpb25TZXJ2aWNlKCk7XHJcbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==