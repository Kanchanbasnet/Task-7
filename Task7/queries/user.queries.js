
exports.getUsers = "SELECT * FROM users";
exports.getUserById = "SELECT * FROM users WHERE id = $1"
exports.checkEmail = "SELECT u FROM users u WHERE u.email = $1"
exports.createUser = "INSERT INTO users (name, email, address) VALUES ($1, $2, $3) RETURNING *";
exports.updateUser = "UPDATE users SET name = $1, email = $2, address = $3 WHERE id = $4"
exports. deleteUser = "DELETE  FROM users WHERE id = $1"
