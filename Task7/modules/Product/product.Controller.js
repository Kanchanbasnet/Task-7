const pool = require('../../db');
const queries = require('../../queries/product.queries');

exports.getProducts =(req,res)=>{
    pool.query(queries.getProducts, (error, results)=>{
        if (error){
            throw error;
        }
        res.status(200).json(results.rows);
    })

}

exports.getProductById =  (req, res)=>{
    const product_id = parseInt(req.params.id) 
    pool.query(queries.getProductById, [product_id], (error, results)=>{
        if (error){
            throw error
        }
        if(results.rows.length===0){
            res.status(400).json({message:`Product with the ${product_id} does not exist.`})
        }
        else{
            res.status(200).json(results.rows[0]);
        }
    })

}



exports.outOfStock = (req,res)=>{
    pool.query(queries.outOfStock, (error, results)=>{
        if(error){
            throw error
        }
        if(results.rows.length===0){
            res.send('No out of stock products.')
        }
        else{
            res.status(200).json({'Out of Stock':results.rows})
        }
    })

}

exports.createProduct = (req,res)=>{
    const {product_name, description, price, quantity, product_type } = req.body
    const product_image = req.file ? req.file.filename : null;
    pool.query(queries.checkname, [product_name], (error, results)=>{
        if(results.rows.length){
            res.send('Product Already Exists.')
        }
        else{
            pool.query(queries.createProduct, [product_name, description, price, quantity, product_type, product_image],(error, results)=>{
                if(error){
                    throw error;
                }
                res.status(200).json({message:'Product Created Successfully.', data: results.rows[0]})
            })
        }
    })
}

exports.updateQuantity = (req, res)=>{
    const product_id = parseInt(req.params.id);
    const {quantity} = req.body
    pool.query(queries.getProductById, [product_id], (error, results)=>{
        if(error){
            throw error
        }
        if (results.rows.length===0){
            res.send(`Product with the id ${product_id} does not exist`);
        }
        else{
            pool.query(queries.updateQuantity, [ quantity, product_id], (fetchError, fetchResults)=>{
                if (fetchError){
                    console.log(fetchError)
                    
                }
                res.status(200).json({message:'Product quantity updated successfully.'})
            })

        }

    })

}

exports.updateProduct = (req, res)=>{
    const product_id = parseInt(req.params.id)
    const {product_name, description, price, quantity, product_type } = req.body
    const product_image = req.file ? req.file.filename : null;
    pool.query(queries.getProductById, [product_id], (error, results)=>{
        if(error){
            throw error
        }
        if (results.rows.length===0){
            res.send(`Product with the id ${product_id} does not exist`);
        }
        else{
            pool.query(queries.updateProduct, [product_name, description, price, quantity, product_type,product_image, product_id], (fetchError, fetchResults)=>{
                if (fetchError){
                    console.log(fetchError)
                    
                }else{
                res.status(200).json({message:'Product updated successfully.'})
                }
            })

        }

    })

    
    

}

exports.deleteProduct =  (req,res) =>{
    const product_id = parseInt(req.params.id)
    pool.query(queries.getProductById, [product_id],(error, results)=>{
        if (error){
            console.log(error);
            res.send(error);
        }
        if(results.rows.length===0){
            res.status(404).send(`Product with the id ${product_id} does not exist.`)
        }
        else{
            pool.query(queries.deleteProduct, [product_id], (error)=>{
                if (error){
                    console.log(error)
                } else{
                res.status(200).json({message: `Product with the id ${product_id} deleted successfully.`})
                }
            })
        }
    })

}
// exports.searchProducts = (req, res) => {
//     const { keyword } = req.query;
//     if (!keyword) {
//         res.status(400).json({ error: 'Keyword is required.' });
//     } else {
//         pool.query(queries.searchProducts, [keyword], (error, results) => {
//             if (error) {
//                 console.error(error);
//                 res.status(500).json({ error: 'An error occurred while searching for products.' });
//             } else {
//                 if (results.rows.length === 0) {
//                     res.status(404).json(`No results found for the keyword "${keyword}".`);
//                 } else {
//                     res.status(200).json(results.rows);
//                 }
//             }
//         });
//     }
// }

exports.searchProducts = async (req, res) => {
    const query = req.query.name;
    const keyword = `%${query}%`;
    const queryText = "SELECT * FROM products WHERE product_name ILIKE $1 OR description ILIKE $1 OR product_type ILIKE $1;";
    const { rows } = await pool.query(queryText, [keyword]);

    if (rows.length === 0) {
        res.status(404).json({ message: `No results found for the keyword "${query}".` });
        return;
    }

    for (const row of rows) {
        const searchHistory = "INSERT INTO search_tracking (product_id, keyword, search_date, search_count) VALUES ($1, $2, NOW(), 1) ON CONFLICT (product_id) DO UPDATE SET search_count = search_tracking.search_count + 1";
        await pool.query(searchHistory, [row.product_id, query]);
    }

    res.status(200).json(rows);
};

exports.topTenProducts = async (req, res)=>{
    const query = `
      SELECT st.product_id, st.search_count, p.product_name, p.price, p.description, p.quantity, p.product_type
      FROM search_tracking st
      INNER JOIN products p ON st.product_id = p.product_id
      ORDER BY st.search_count DESC
      LIMIT 10;
    `;
    const { rows } = await pool.query(query);
    res.status(200).json( rows );
  } 



  