var AuthRoutes = require("./modules/auth/auth.routes");
var AuthorsRoutes = require("./modules/authors/authors.routes");
var CategoriesRoutes = require("./modules/categories/categories.routes");
var MetadataRoutes = require("./modules/metadata/metadata.routes");
var ProductsRoutes = require("./modules/products/products.routes");
var TagsRoutes = require("./modules/tags/tags.routes");
var MembersRoutes = require("./modules/members/members.routes");
var BlogRoutes = require("./modules/blog/blog.routes");
var EmailRoutes = require("./modules/email/email.routes");
var MessagesRoutes = require("./modules/messages/messages.routes");
var ImagesRoutes = require("./modules/images/images.routes");
var FavoriteRoutes = require("./modules/favorite/favorite.routes");
module.exports = [].concat(AuthRoutes, AuthorsRoutes, CategoriesRoutes, MetadataRoutes, ProductsRoutes, TagsRoutes, MembersRoutes, BlogRoutes, EmailRoutes, MessagesRoutes, ImagesRoutes, FavoriteRoutes);

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInJvdXRlcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFPLFVBQVUsV0FBVyw0QkFBNEIsQ0FBQyxDQUFDO0FBQzFELElBQU8sYUFBYSxXQUFXLGtDQUFrQyxDQUFDLENBQUM7QUFDbkUsSUFBTyxnQkFBZ0IsV0FBVyx3Q0FBd0MsQ0FBQyxDQUFDO0FBQzVFLElBQU8sY0FBYyxXQUFXLG9DQUFvQyxDQUFDLENBQUM7QUFDdEUsSUFBTyxjQUFjLFdBQVcsb0NBQW9DLENBQUMsQ0FBQztBQUN0RSxJQUFPLFVBQVUsV0FBVyw0QkFBNEIsQ0FBQyxDQUFDO0FBQzFELElBQU8sYUFBYSxXQUFXLGtDQUFrQyxDQUFDLENBQUM7QUFDbkUsSUFBTyxVQUFVLFdBQVcsNEJBQTRCLENBQUMsQ0FBQztBQUMxRCxJQUFPLFdBQVcsV0FBVyw4QkFBOEIsQ0FBQyxDQUFDO0FBQzdELElBQU8sY0FBYyxXQUFXLG9DQUFvQyxDQUFDLENBQUM7QUFDdEUsSUFBTyxZQUFZLFdBQVcsZ0NBQWdDLENBQUMsQ0FBQztBQUNoRSxJQUFPLGNBQWMsV0FBVyxvQ0FBb0MsQ0FBQyxDQUFDO0FBRXRFLE1BQU0sQ0FBQyxPQUFPLEdBQUcsRUFBRSxDQUFDLE1BQU0sQ0FDdEIsVUFBVSxFQUNWLGFBQWEsRUFDYixnQkFBZ0IsRUFDaEIsY0FBYyxFQUNkLGNBQWMsRUFDZCxVQUFVLEVBQ1YsYUFBYSxFQUNiLFVBQVUsRUFDVixXQUFXLEVBQ1gsY0FBYyxFQUNkLFlBQVksRUFDWixjQUFjLENBQ2pCLENBQUMiLCJmaWxlIjoicm91dGVzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IEF1dGhSb3V0ZXMgPSByZXF1aXJlKFwiLi9tb2R1bGVzL2F1dGgvYXV0aC5yb3V0ZXNcIik7XG5pbXBvcnQgQXV0aG9yc1JvdXRlcyA9IHJlcXVpcmUoXCIuL21vZHVsZXMvYXV0aG9ycy9hdXRob3JzLnJvdXRlc1wiKTtcbmltcG9ydCBDYXRlZ29yaWVzUm91dGVzID0gcmVxdWlyZShcIi4vbW9kdWxlcy9jYXRlZ29yaWVzL2NhdGVnb3JpZXMucm91dGVzXCIpO1xuaW1wb3J0IE1ldGFkYXRhUm91dGVzID0gcmVxdWlyZShcIi4vbW9kdWxlcy9tZXRhZGF0YS9tZXRhZGF0YS5yb3V0ZXNcIik7XG5pbXBvcnQgUHJvZHVjdHNSb3V0ZXMgPSByZXF1aXJlKFwiLi9tb2R1bGVzL3Byb2R1Y3RzL3Byb2R1Y3RzLnJvdXRlc1wiKTtcbmltcG9ydCBUYWdzUm91dGVzID0gcmVxdWlyZShcIi4vbW9kdWxlcy90YWdzL3RhZ3Mucm91dGVzXCIpO1xuaW1wb3J0IE1lbWJlcnNSb3V0ZXMgPSByZXF1aXJlKFwiLi9tb2R1bGVzL21lbWJlcnMvbWVtYmVycy5yb3V0ZXNcIik7XG5pbXBvcnQgQmxvZ1JvdXRlcyA9IHJlcXVpcmUoXCIuL21vZHVsZXMvYmxvZy9ibG9nLnJvdXRlc1wiKTtcbmltcG9ydCBFbWFpbFJvdXRlcyA9IHJlcXVpcmUoXCIuL21vZHVsZXMvZW1haWwvZW1haWwucm91dGVzXCIpO1xuaW1wb3J0IE1lc3NhZ2VzUm91dGVzID0gcmVxdWlyZShcIi4vbW9kdWxlcy9tZXNzYWdlcy9tZXNzYWdlcy5yb3V0ZXNcIik7XG5pbXBvcnQgSW1hZ2VzUm91dGVzID0gcmVxdWlyZShcIi4vbW9kdWxlcy9pbWFnZXMvaW1hZ2VzLnJvdXRlc1wiKTtcbmltcG9ydCBGYXZvcml0ZVJvdXRlcyA9IHJlcXVpcmUoXCIuL21vZHVsZXMvZmF2b3JpdGUvZmF2b3JpdGUucm91dGVzXCIpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IFtdLmNvbmNhdChcbiAgICBBdXRoUm91dGVzLFxuICAgIEF1dGhvcnNSb3V0ZXMsXG4gICAgQ2F0ZWdvcmllc1JvdXRlcyxcbiAgICBNZXRhZGF0YVJvdXRlcyxcbiAgICBQcm9kdWN0c1JvdXRlcyxcbiAgICBUYWdzUm91dGVzLFxuICAgIE1lbWJlcnNSb3V0ZXMsXG4gICAgQmxvZ1JvdXRlcyxcbiAgICBFbWFpbFJvdXRlcyxcbiAgICBNZXNzYWdlc1JvdXRlcyxcbiAgICBJbWFnZXNSb3V0ZXMsXG4gICAgRmF2b3JpdGVSb3V0ZXNcbik7XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=