///<reference path='../../../typings/tsd.d.ts' />
'use strict';
var mysql = require("mysql");
var q = require("q");
var request = require("request");
var ConnectionService = (function () {
    function ConnectionService() {
        this.dbConfig = {
            host: 'gator2009.hostgator.com',
            user: 'tdnb1207_sof',
            password: 'pkc~^_9WZ(us',
            database: 'tdnb1207_sof',
            // database: 'tdnb1207_sof_develop', // develop
            // database: 'tdnb1207_sof_backup',
            debug: false,
            insecureAuth: true
        };
    }
    ConnectionService.prototype.query = function (params) {
        var _queryPromise = q.defer();
        request('http://sof.tokyo/api/' + params, function (error, response, body) {
            if (!error && response.statusCode == 200) {
                _queryPromise.resolve(JSON.parse(body)); // Show the HTML for the Google homepage.
            }
            else {
                console.error('connection.service > query error ', error);
                _queryPromise.reject(error);
            }
        });
        return _queryPromise.promise;
    };
    ConnectionService.prototype.query_db = function (params) {
        var defer = q.defer();
        var _rows;
        var _connection = mysql.createConnection(this.dbConfig);
        _connection.query(params, function (err, rows) {
            _connection.end();
            if (err) {
                defer.reject(err);
                throw err;
            }
            ;
            defer.resolve(rows);
        });
        return defer.promise;
    };
    return ConnectionService;
})();
exports.ConnectionService = ConnectionService;
exports.service = new ConnectionService();

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1vZHVsZXMvY29ubmVjdGlvbi9jb25uZWN0aW9uLnNlcnZpY2UudHMiXSwibmFtZXMiOlsiQ29ubmVjdGlvblNlcnZpY2UiLCJDb25uZWN0aW9uU2VydmljZS5jb25zdHJ1Y3RvciIsIkNvbm5lY3Rpb25TZXJ2aWNlLnF1ZXJ5IiwiQ29ubmVjdGlvblNlcnZpY2UucXVlcnlfZGIiXSwibWFwcGluZ3MiOiJBQUFBLEFBQ0EsaURBRGlEO0FBQ2pELFlBQVksQ0FBQztBQUViLElBQU8sS0FBSyxXQUFXLE9BQU8sQ0FBQyxDQUFDO0FBQ2hDLElBQU8sQ0FBQyxXQUFXLEdBQUcsQ0FBQyxDQUFDO0FBQ3hCLElBQU8sT0FBTyxXQUFXLFNBQVMsQ0FBQyxDQUFDO0FBT3BDLElBQWEsaUJBQWlCO0lBSTFCQSxTQUpTQSxpQkFBaUJBO1FBS3RCQyxJQUFJQSxDQUFDQSxRQUFRQSxHQUFHQTtZQUNaQSxJQUFJQSxFQUFFQSx5QkFBeUJBO1lBQy9CQSxJQUFJQSxFQUFFQSxjQUFjQTtZQUNwQkEsUUFBUUEsRUFBRUEsY0FBY0E7WUFDeEJBLFFBQVFBLEVBQUVBLGNBQWNBO1lBQ3hCQSxBQUNBQSwrQ0FEK0NBO1lBQy9DQSxLQUFLQSxFQUFFQSxLQUFLQTtZQUNaQSxZQUFZQSxFQUFFQSxJQUFJQTtTQUNyQkEsQ0FBQUE7SUFDTEEsQ0FBQ0E7SUFFREQsaUNBQUtBLEdBQUxBLFVBQU1BLE1BQU1BO1FBQ1JFLElBQUlBLGFBQWFBLEdBQUdBLENBQUNBLENBQUNBLEtBQUtBLEVBQUVBLENBQUNBO1FBQzlCQSxPQUFPQSxDQUFDQSx1QkFBdUJBLEdBQUdBLE1BQU1BLEVBQUVBLFVBQVNBLEtBQUtBLEVBQUVBLFFBQVFBLEVBQUVBLElBQUlBO1lBQ3BFLEVBQUUsQ0FBQyxDQUFDLENBQUMsS0FBSyxJQUFJLFFBQVEsQ0FBQyxVQUFVLElBQUksR0FBRyxDQUFDLENBQUMsQ0FBQztnQkFDdkMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUMseUNBQXlDO1lBQ3JGLENBQUMsR0FEMEM7WUFDekMsSUFBSSxDQUFDLENBQUM7Z0JBQ0osT0FBTyxDQUFDLEtBQUssQ0FBQyxtQ0FBbUMsRUFBRSxLQUFLLENBQUMsQ0FBQztnQkFDMUQsYUFBYSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUVoQyxDQUFDO1FBQ0wsQ0FBQyxDQUFDQSxDQUFBQTtRQUNGQSxNQUFNQSxDQUFDQSxhQUFhQSxDQUFDQSxPQUFPQSxDQUFDQTtJQUNqQ0EsQ0FBQ0E7SUFFREYsb0NBQVFBLEdBQVJBLFVBQVNBLE1BQU1BO1FBQ1hHLElBQUlBLEtBQUtBLEdBQUdBLENBQUNBLENBQUNBLEtBQUtBLEVBQUVBLENBQUNBO1FBQ3RCQSxJQUFJQSxLQUFLQSxDQUFDQTtRQUNWQSxJQUFJQSxXQUFXQSxHQUFHQSxLQUFLQSxDQUFDQSxnQkFBZ0JBLENBQUNBLElBQUlBLENBQUNBLFFBQVFBLENBQUNBLENBQUNBO1FBQ3hEQSxXQUFXQSxDQUFDQSxLQUFLQSxDQUFDQSxNQUFNQSxFQUFFQSxVQUFDQSxHQUFHQSxFQUFFQSxJQUFJQTtZQUNoQ0EsV0FBV0EsQ0FBQ0EsR0FBR0EsRUFBRUEsQ0FBQ0E7WUFDbEJBLEVBQUVBLENBQUNBLENBQUNBLEdBQUdBLENBQUNBLENBQUNBLENBQUNBO2dCQUNOQSxLQUFLQSxDQUFDQSxNQUFNQSxDQUFDQSxHQUFHQSxDQUFDQSxDQUFDQTtnQkFBQ0EsTUFBTUEsR0FBR0EsQ0FBQUE7WUFDaENBLENBQUNBO1lBQUFBLENBQUNBO1lBQ0ZBLEtBQUtBLENBQUNBLE9BQU9BLENBQUNBLElBQUlBLENBQUNBLENBQUNBO1FBQ3hCQSxDQUFDQSxDQUFDQSxDQUFBQTtRQUNGQSxNQUFNQSxDQUFDQSxLQUFLQSxDQUFDQSxPQUFPQSxDQUFDQTtJQUN6QkEsQ0FBQ0E7SUFFTEgsd0JBQUNBO0FBQURBLENBNUNBLEFBNENDQSxJQUFBO0FBNUNZLHlCQUFpQixHQUFqQixpQkE0Q1osQ0FBQTtBQUVVLGVBQU8sR0FBRyxJQUFJLGlCQUFpQixFQUFFLENBQUMiLCJmaWxlIjoibW9kdWxlcy9jb25uZWN0aW9uL2Nvbm5lY3Rpb24uc2VydmljZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vLzxyZWZlcmVuY2UgcGF0aD0nLi4vLi4vLi4vdHlwaW5ncy90c2QuZC50cycgLz5cbid1c2Ugc3RyaWN0JztcblxuaW1wb3J0IG15c3FsID0gcmVxdWlyZShcIm15c3FsXCIpO1xuaW1wb3J0IHEgPSByZXF1aXJlKFwicVwiKTtcbmltcG9ydCByZXF1ZXN0ID0gcmVxdWlyZShcInJlcXVlc3RcIik7XG5cbmV4cG9ydCBpbnRlcmZhY2UgSUNvbm5lY3Rpb25TZXJ2aWNlIHtcbiAgICBxdWVyeShwYXJhbXMpOiBxLklQcm9taXNlPHt9PlxuICAgIHF1ZXJ5X2RiKHBhcmFtcyk6IHEuSVByb21pc2U8e30+XG59XG5cbmV4cG9ydCBjbGFzcyBDb25uZWN0aW9uU2VydmljZSBpbXBsZW1lbnRzIElDb25uZWN0aW9uU2VydmljZSB7XG4gICAgcHJpdmF0ZSBjb25uZWN0aW9uU3RyZWFtO1xuICAgIHByaXZhdGUgZGJDb25maWc7XG5cbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdGhpcy5kYkNvbmZpZyA9IHtcbiAgICAgICAgICAgIGhvc3Q6ICdnYXRvcjIwMDkuaG9zdGdhdG9yLmNvbScsXG4gICAgICAgICAgICB1c2VyOiAndGRuYjEyMDdfc29mJyxcbiAgICAgICAgICAgIHBhc3N3b3JkOiAncGtjfl5fOVdaKHVzJyxcbiAgICAgICAgICAgIGRhdGFiYXNlOiAndGRuYjEyMDdfc29mJywgLy8gcHJvZHVjdGlvblxuICAgICAgICAgICAgLy8gZGF0YWJhc2U6ICd0ZG5iMTIwN19zb2ZfZGV2ZWxvcCcsIC8vIGRldmVsb3BcbiAgICAgICAgICAgIGRlYnVnOiBmYWxzZSxcbiAgICAgICAgICAgIGluc2VjdXJlQXV0aDogdHJ1ZVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgcXVlcnkocGFyYW1zKTogcS5JUHJvbWlzZTx7fT4ge1xuICAgICAgICB2YXIgX3F1ZXJ5UHJvbWlzZSA9IHEuZGVmZXIoKTtcbiAgICAgICAgcmVxdWVzdCgnaHR0cDovL3NvZi50b2t5by9hcGkvJyArIHBhcmFtcywgZnVuY3Rpb24oZXJyb3IsIHJlc3BvbnNlLCBib2R5KSB7XG4gICAgICAgICAgICBpZiAoIWVycm9yICYmIHJlc3BvbnNlLnN0YXR1c0NvZGUgPT0gMjAwKSB7XG4gICAgICAgICAgICAgICAgX3F1ZXJ5UHJvbWlzZS5yZXNvbHZlKEpTT04ucGFyc2UoYm9keSkpIC8vIFNob3cgdGhlIEhUTUwgZm9yIHRoZSBHb29nbGUgaG9tZXBhZ2UuXG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ2Nvbm5lY3Rpb24uc2VydmljZSA+IHF1ZXJ5IGVycm9yICcsIGVycm9yKTtcbiAgICAgICAgICAgICAgICBfcXVlcnlQcm9taXNlLnJlamVjdChlcnJvcik7XG4gICAgICAgICAgICAgICAgLy8gX3F1ZXJ5UHJvbWlzZS5yZXNvbHZlKEpTT04ucGFyc2UoYm9keSkpXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICAgIHJldHVybiBfcXVlcnlQcm9taXNlLnByb21pc2U7XG4gICAgfVxuXG4gICAgcXVlcnlfZGIocGFyYW1zKTogcS5JUHJvbWlzZTx7fT4ge1xuICAgICAgICB2YXIgZGVmZXIgPSBxLmRlZmVyKCk7XG4gICAgICAgIHZhciBfcm93cztcbiAgICAgICAgdmFyIF9jb25uZWN0aW9uID0gbXlzcWwuY3JlYXRlQ29ubmVjdGlvbih0aGlzLmRiQ29uZmlnKTtcbiAgICAgICAgX2Nvbm5lY3Rpb24ucXVlcnkocGFyYW1zLCAoZXJyLCByb3dzKSA9PiB7XG4gICAgICAgICAgICBfY29ubmVjdGlvbi5lbmQoKTtcbiAgICAgICAgICAgIGlmIChlcnIpIHtcbiAgICAgICAgICAgICAgICBkZWZlci5yZWplY3QoZXJyKTsgdGhyb3cgZXJyXG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgZGVmZXIucmVzb2x2ZShyb3dzKTtcbiAgICAgICAgfSlcbiAgICAgICAgcmV0dXJuIGRlZmVyLnByb21pc2U7XG4gICAgfVxuXG59XG5cbmV4cG9ydCB2YXIgc2VydmljZSA9IG5ldyBDb25uZWN0aW9uU2VydmljZSgpO1xuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
