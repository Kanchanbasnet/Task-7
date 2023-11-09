const pool = require('../../db');


exports.checkout = async (req, res) => {
    const cart_id = parseInt(req.query.cart_id);
    const user_id = parseInt(req.query.user_id);
  
    const userCart = await pool.query("SELECT * FROM carts WHERE user_id = $1 AND id = $2", [user_id, cart_id]);
    if (userCart.rows.length === 0) {
      return res.status(404).json({ message: "Cart does not exist" });
    }
    const userCartResult = userCart.rows[0];
  
    const cartData = await pool.query("SELECT ci.quantity, ci.price, p.product_id, p.product_name FROM cart_items ci JOIN products p ON ci.product_id = p.product_id WHERE ci.cart_id = $1", [userCartResult.id]);
    userCartResult.products = cartData.rows;
  
    if (userCartResult.totalprice < 500) {
      return res.status(400).json({ message: "The total price should be at least 500 to place an order." });
    }
  
    const order = await pool.query("INSERT INTO orders (user_id, totalprice) VALUES ($1, $2) RETURNING *", [user_id, userCartResult.totalprice]);
    const order_id = order.rows[0].id;
  
    for (const product of userCartResult.products) {
      const productExist = await pool.query("SELECT * FROM products WHERE product_id = $1", [product.product_id]);
      if (productExist.rows.length === 0) {
        return res.status(404).json({ message: 'Product not found' });
      }
  
      const productExistResult = productExist.rows[0];
  
      if (productExistResult) {
        productExistResult.quantity -= product.quantity;
  
        if (productExistResult.quantity < 0) {
          return res.status(400).json({ message: 'The quantity of the product is insufficient.' });
        }
  
        await pool.query("UPDATE products SET quantity = $1 WHERE product_id = $2", [productExistResult.quantity, product.product_id]);
        await pool.query("INSERT INTO order_items (order_id, product_id, quantity, price) VALUES ($1, $2, $3, $4)", [order_id, product.product_id, product.quantity, product.price]);
      }
    }
  
    await pool.query("DELETE FROM cart_items WHERE cart_id = $1", [cart_id]);
    await pool.query("DELETE FROM carts WHERE user_id = $1", [user_id]);
  
    res.status(200).json({ userCartResult, message: "Order generated successfully." });
  };

  exports.getAllOrders = async (req,res)=>{
    try {
        const query = `
          SELECT
            o.id AS order_id,
            o.user_id,
            o.totalprice AS order_total_price,
            o.order_date AS order_date,
            oi.quantity AS product_quantity,
            p.product_name AS product_name,
            p.product_type AS product_type
          FROM orders o
          JOIN order_items oi ON o.id = oi.order_id
          JOIN products p ON oi.product_id = p.product_id;
        `;
      
        const queryResult = await pool.query(query);
      
        if (queryResult.rows.length === 0) {
          res.json({ message: 'There are no orders yet.' });
          return;
        }
      
        const orders = {};
      
        queryResult.rows.forEach((row) => {
          const order_id = row.order_id;
      
          if (!orders[order_id]) {
            orders[order_id] = {
              id: order_id,
              user_id: row.user_id,
              totalprice: row.order_total_price,
              order_date: row.order_date,
              products: [],
            };
          }
      
          // Add each product to the order's products array
          orders[order_id].products.push({
            product_name: row.product_name,
            product_type: row.product_type,
            quantity: row.product_quantity,
          });
        });
      
        // Convert the object into an array of orders
        const orderList = Object.values(orders);
      
        res.json(orderList);
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
      }
      
   
  }
  exports.getOneOrder = async (req, res) => {
    const user_id = parseInt(req.query.user_id);
    try {
      const userQuery = await pool.query('SELECT * FROM users WHERE id = $1', [user_id]);
      if (userQuery.rows.length === 0) {
        return res.status(404).json({ message: 'User not found.' });
      }
  
      const query = `
        SELECT
          o.id AS order_id,
          o.user_id,
          o.totalprice AS order_total_price,
          o.order_date AS order_date,
          oi.quantity AS product_quantity,
          p.product_name AS product_name,
          p.product_type AS product_type
        FROM orders o
        JOIN order_items oi ON o.id = oi.order_id
        JOIN products p ON oi.product_id = p.product_id
        WHERE o.user_id = $1;
      `;
      const queryResult = await pool.query(query, [user_id]);
  
      if (queryResult.rows.length === 0) {
        return res.status(404).json({ message: 'Order does not exist.' });
      }
  
      const orders = [];
      for (const row of queryResult.rows) {
        const existingOrder = orders.find((order) => order.order_id === row.order_id);
        if (existingOrder) {
          existingOrder.products.push({
            product_name: row.product_name,
            product_type: row.product_type,
            quantity: row.product_quantity,
          });
        } else {
          orders.push({
            id: row.order_id,
            user_id: row.user_id,
            totalprice: row.order_total_price,
            order_date: row.order_date,
            products: [
              {
                product_name: row.product_name,
                product_type: row.product_type,
                quantity: row.product_quantity,
              },
            ],
          });
        }
      }
      res.status(200).json(orders);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  };

exports.getTopSellingProducts = async(req, res)=>{
    try{
      const query = `
      SELECT
        p.product_id,
        p.product_name,
        p.product_type,
        SUM(oi.quantity) AS total_sold
      FROM order_items oi
      JOIN products p ON oi.product_id = p.product_id
      GROUP BY p.product_id
      ORDER BY total_sold DESC
      LIMIT 10;
    `;
    const queryResult =await  pool.query(query);
    if(queryResult.rows.length===0){
      res.status(404).json({message: 'No top products Found.'});
    }
    res.status(200).json(queryResult.rows);

    }
    catch(error){
      console.log(error);
      res.status(500).send('Internal Server Error.')

    }
  }

  