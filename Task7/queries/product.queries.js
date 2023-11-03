exports.getProducts = "SELECT * FROM products";
exports.getProductById = "SELECT * FROM products WHERE product_id = $1"
exports.checkname = "SELECT p FROM products p WHERE p.product_name= $1"
exports.outOfStock = "SELECT * FROM products WHERE quantity < 5";
exports.createProduct = "INSERT INTO products (product_name, description, price, quantity, product_type, product_image) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *"
exports.updateQuantity = "UPDATE products SET quantity = $1 WHERE product_id = $2"
exports.updateProduct = "UPDATE products SET product_name = $1, description = $2, price = $3, quantity = $4, product_type = $5, product_image = $6 WHERE product_id = $7"
exports.deleteProduct = "DELETE  FROM products WHERE product_id = $1"
exports.searchProducts = "SELECT *FROM products WHERE to_tsvector(coalesce(product_name, '') || ' ' ||coalesce(product_type, '') || ' ' || coalesce(description, '')) @@to_tsquery($1)";