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