import ProductsRoutes = require("./modules/products/products.routes");
import CategoriesRoutes = require("./modules/categories/categories.routes");
import TagsRoutes = require("./modules/tags/tags.routes");
import AuthorsRoutes = require("./modules/authors/authors.routes");

module.exports = [].concat(
    ProductsRoutes,
    CategoriesRoutes,
    TagsRoutes,
    AuthorsRoutes
);
