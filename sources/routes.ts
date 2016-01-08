import AuthRoutes = require("./modules/auth/auth.routes");
import AuthorsRoutes = require("./modules/authors/authors.routes");
import CategoriesRoutes = require("./modules/categories/categories.routes");
import MetadataRoutes = require("./modules/metadata/metadata.routes");
import ProductsRoutes = require("./modules/products/products.routes");
import TagsRoutes = require("./modules/tags/tags.routes");

module.exports = [].concat(
    AuthRoutes,
    AuthorsRoutes,
    CategoriesRoutes,
    MetadataRoutes,
    ProductsRoutes,
    TagsRoutes
);
