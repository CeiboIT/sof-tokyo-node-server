///<reference path='../../../typings/tsd.d.ts' />
'use strict';
var mysql = require("mysql");
var ConnectionService = (function () {
    function ConnectionService() {
        var _dbConfig = {
            host: 'gator2009.hostgator.com',
            user: 'tdnb1207_sof',
            password: 'pkc~^_9WZ(us',
            //database	: 'tdnb1207_sof', // production
            database: 'tdnb1207_sof_develop',
            debug: false,
            insecureAuth: true
        };
        this.connection = mysql.createConnection(_dbConfig);
    }
    ConnectionService.prototype.getConnection = function () {
        return this.connection;
    };
    return ConnectionService;
})();
exports.ConnectionService = ConnectionService;
exports.service = new ConnectionService();

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1vZHVsZXMvY29ubmVjdGlvbi9jb25uZWN0aW9uLnNlcnZpY2UudHMiXSwibmFtZXMiOlsiQ29ubmVjdGlvblNlcnZpY2UiLCJDb25uZWN0aW9uU2VydmljZS5jb25zdHJ1Y3RvciIsIkNvbm5lY3Rpb25TZXJ2aWNlLmdldENvbm5lY3Rpb24iXSwibWFwcGluZ3MiOiJBQUFBLEFBQ0EsaURBRGlEO0FBQ2pELFlBQVksQ0FBQztBQUViLElBQU8sS0FBSyxXQUFXLE9BQU8sQ0FBQyxDQUFDO0FBRWhDLElBQWEsaUJBQWlCO0lBSTVCQSxTQUpXQSxpQkFBaUJBO1FBSzNCQyxJQUFJQSxTQUFTQSxHQUNiQTtZQUNhQSxJQUFJQSxFQUFJQSx5QkFBeUJBO1lBQ2pDQSxJQUFJQSxFQUFJQSxjQUFjQTtZQUN0QkEsUUFBUUEsRUFBR0EsY0FBY0E7WUFDekJBLEFBQ0FBLDBDQUQwQ0E7WUFDMUNBLFFBQVFBLEVBQUdBLHNCQUFzQkE7WUFDN0NBLEtBQUtBLEVBQU9BLEtBQUtBO1lBQ2pCQSxZQUFZQSxFQUFFQSxJQUFJQTtTQUNsQkEsQ0FBQ0E7UUFFRkEsSUFBSUEsQ0FBQ0EsVUFBVUEsR0FBR0EsS0FBS0EsQ0FBQ0EsZ0JBQWdCQSxDQUFDQSxTQUFTQSxDQUFDQSxDQUFDQTtJQUNyREEsQ0FBQ0E7SUFFREQseUNBQWFBLEdBQWJBO1FBQ0NFLE1BQU1BLENBQUNBLElBQUlBLENBQUNBLFVBQVVBLENBQUNBO0lBQ3hCQSxDQUFDQTtJQUVGRix3QkFBQ0E7QUFBREEsQ0F2QkQsQUF1QkVBLElBQUE7QUF2QlcseUJBQWlCLEdBQWpCLGlCQXVCWCxDQUFBO0FBRVUsZUFBTyxHQUFHLElBQUksaUJBQWlCLEVBQUUsQ0FBQyIsImZpbGUiOiJtb2R1bGVzL2Nvbm5lY3Rpb24vY29ubmVjdGlvbi5zZXJ2aWNlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy8vPHJlZmVyZW5jZSBwYXRoPScuLi8uLi8uLi90eXBpbmdzL3RzZC5kLnRzJyAvPlxuJ3VzZSBzdHJpY3QnO1xuXG5pbXBvcnQgbXlzcWwgPSByZXF1aXJlKFwibXlzcWxcIik7XG5cbmV4cG9ydCBjbGFzcyBDb25uZWN0aW9uU2VydmljZVxuIHtcblx0IHByaXZhdGUgY29ubmVjdGlvbjtcblxuXHQgY29uc3RydWN0b3IoKSB7XG5cdFx0IHZhciBfZGJDb25maWcgPVxuXHRcdFx0e1xuICAgICAgICAgICAgICAgIGhvc3RcdFx0OiAnZ2F0b3IyMDA5Lmhvc3RnYXRvci5jb20nLFxuICAgICAgICAgICAgICAgIHVzZXJcdFx0OiAndGRuYjEyMDdfc29mJyxcbiAgICAgICAgICAgICAgICBwYXNzd29yZFx0OiAncGtjfl5fOVdaKHVzJyxcbiAgICAgICAgICAgICAgICAvL2RhdGFiYXNlXHQ6ICd0ZG5iMTIwN19zb2YnLCAvLyBwcm9kdWN0aW9uXG4gICAgICAgICAgICAgICAgZGF0YWJhc2VcdDogJ3RkbmIxMjA3X3NvZl9kZXZlbG9wJywgLy8gZGV2ZWxvcFxuXHRcdFx0XHRkZWJ1ZyAgICBcdDogZmFsc2UsXG5cdFx0XHRcdGluc2VjdXJlQXV0aDogdHJ1ZVxuXHRcdFx0fTtcblxuXHRcdFx0dGhpcy5jb25uZWN0aW9uID0gbXlzcWwuY3JlYXRlQ29ubmVjdGlvbihfZGJDb25maWcpO1xuXHQgfVxuXG5cdCBnZXRDb25uZWN0aW9uKCkge1xuXHRcdCByZXR1cm4gdGhpcy5jb25uZWN0aW9uO1xuXHQgfVxuXG4gfVxuXG4gZXhwb3J0IHZhciBzZXJ2aWNlID0gbmV3IENvbm5lY3Rpb25TZXJ2aWNlKCk7XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=