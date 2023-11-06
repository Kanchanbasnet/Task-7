const pool = require('../../db');
//const queries = require('../../queries/cart.queries');


exports.addToCart = async (req, res) => {
  const { items, user_id } = req.body;
  
  try {
    // Check whether the user exists
    const existingUser = await pool.query("SELECT * FROM users WHERE id = $1", [user_id]);
    if (existingUser.rows.length === 0) {
      return res.status(404).json('User not found.');
    }

    // Check whether the cart of the user exists or not
    const existingCart = await pool.query("SELECT * FROM carts WHERE user_id = $1", [user_id]);

    if (existingCart.rows.length > 0) {
      const cart_id = existingCart.rows[0].id;
      for (const item of items) {
        // Check whether the product exists
        const existingProduct = await pool.query("SELECT * FROM products WHERE product_id = $1", [item.product_id]);
        if (existingProduct.rows.length === 0) {
          return res.status(404).json({ message: "Product not found" });
        }

        const productResults = existingProduct.rows[0];

        if (productResults.quantity < item.quantity) {
          return res.status(400).json({ message: "The quantity of the product is not available at the moment." });
        }

        const checkProducts = await pool.query("SELECT * FROM cart_items WHERE cart_id = $1 AND product_id = $2", [cart_id, item.product_id]);
        if (checkProducts.rows.length === 0) {
          const price = item.quantity * productResults.price;
          await pool.query("INSERT INTO cart_items (cart_id, product_id, quantity, price) VALUES ($1, $2, $3, $4)", [cart_id, item.product_id, item.quantity, price]);
        } else {
          const productsDetails = checkProducts.rows[0];
          const updateQuantity = productsDetails.quantity + item.quantity;
          const price = updateQuantity * productResults.price;
          await pool.query("UPDATE cart_items SET quantity = $1, price = $2 WHERE cart_id = $3 AND product_id = $4", [updateQuantity, price, cart_id, item.product_id]);
        }
      }

      // Calculate and update the total price of the cart
      const updateTotalPriceQuery = "SELECT SUM(price) AS totalprice FROM cart_items WHERE cart_id = $1";
      const updateTotalPriceResult = await pool.query(updateTotalPriceQuery, [cart_id]);
      const updateTotalPrice = updateTotalPriceResult.rows[0].totalprice;

      await pool.query("UPDATE carts SET totalprice = $1 WHERE id = $2", [updateTotalPrice, cart_id]);

      return res.status(200).send('Cart updated successfully.');
    } else {
      // If the cart doesn't exist, create a new cart
      let totalprice = 0;
      const insertCart = await pool.query("INSERT INTO carts(user_id, totalprice) VALUES ($1, $2) RETURNING id", [user_id, totalprice]);
      const newCartId = insertCart.rows[0].id;

      for (const item of items) {
        const existingProduct = await pool.query("SELECT * FROM products WHERE product_id = $1", [item.product_id]);
        if (existingProduct.rows.length === 0) {
          return res.status(404).json("Product not found.");
        }

        const productResults = existingProduct.rows[0];
        if (productResults.quantity < item.quantity) {
          return res.status(400).json({ message: "The quantity of the product is not available at the moment." });
        }

        const price = item.quantity * productResults.price;
        totalprice += price;

        await pool.query("INSERT INTO cart_items (cart_id, product_id, quantity, price) VALUES ($1, $2, $3, $4)", [newCartId, item.product_id, item.quantity, price]);
      }

      // Update the total price of the newly created cart
      await pool.query("UPDATE carts SET totalprice = $1 WHERE id = $2", [totalprice, newCartId]);

      return res.status(200).json({ message: "New cart created successfully." });
    }
  } catch (error) {
    return res.status(500).send("Internal Server Error");
  }
};


exports.getAllCart = async (req, res) => {
  try {
    const query = `
      SELECT c.id, c.user_id, c.totalprice, c.created_at, c.updated_at, ci.product_id, ci.quantity, ci.price
      FROM carts c
      LEFT JOIN cart_items ci ON c.id = ci.cart_id;
    `;

    const result = await pool.query(query);

    // Create a data structure to organize the results by cart
    const carts = {};

    // Loop through the result rows and organize them by cart
    result.rows.forEach((row) => {
      const cartId = row.id;

      // If the cart doesn't exist in the data structure, create it
      if (!carts[cartId]) {
        carts[cartId] = {
          id: cartId,
          user_id: row.user_id,
          totalprice: row.totalprice,
          created_at: row.created_at,
          updated_at: row.updated_at,
          items: [],
        };
      }

      // Add the cart item details to the corresponding cart
      carts[cartId].items.push({
        product_id: row.product_id,
        quantity: row.quantity,
        price: row.price,
      });
    });

    // Convert the data structure to an array of carts
    const cartList = Object.values(carts);

    res.status(200).json(cartList);
  } catch (error) {
    console.log(error);
    res.status(500).send('Internal Server error.');
  }
};


exports.getCartById = async (req, res) => {
  const cartId = req.params.id; // Assuming the cart ID is provided as a route parameter

  try {
    const query = `
      SELECT c.id, c.user_id, c.totalprice, c.created_at, c.updated_at, ci.product_id, ci.quantity, ci.price
      FROM carts c
      LEFT JOIN cart_items ci ON c.id = ci.cart_id
      WHERE c.id = $1;
    `;

    const result = await pool.query(query, [cartId]);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    const cart = {
      id: result.rows[0].id,
      user_id: result.rows[0].user_id,
      totalprice: result.rows[0].totalprice,
      created_at: result.rows[0].created_at,
      updated_at: result.rows[0].updated_at,
      items: [],
    };

    result.rows.forEach((row) => {
      cart.items.push({
        product_id: row.product_id,
        quantity: row.quantity,
        price: row.price,
      });
    });

    res.status(200).json(cart);
  } catch (error) {
    console.log(error);
    res.status(500).send('Internal Server error.');
  }
};
