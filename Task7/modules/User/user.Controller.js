const pool = require('../../db');
const queries = require('../../queries/user.queries');

exports.getUsers = (req,res)=>{
    pool.query(queries.getUsers,(error, results)=>{
        if (error){
            throw error;
        }
        res.status(200).json(results.rows)
    })
}

exports.getUserById = (req,res)=>{
    const id = parseInt(req.params.id);
    pool.query(queries.getUserById, [id],(error, results)=>{
        if (error){
            throw error;
        }
        res.status(200).json(results.rows)

    })
}

exports.createUser = (req,res)=>{
    const {name, email, address} = req.body;
    pool.query(queries.checkEmail, [email],(error, results)=>{
        if(results.rows.length){
            res.send("User already Exists.");
        }else{
        pool.query(queries.createUser, [name, email, address], (error, results)=>{
            if(error){
                throw error
            }
            res.status(200).json({message:"User created Successfully.", data: results.rows[0]})
        })
    }
    })

}

exports.updateUser = (req, res)=>{
    const id =parseInt(req.params.id);
    const {name, email, address} = req.body
    pool.query(queries.getUserById, [id], (error, results)=>{
        if (error){
            throw error;
        }
        if(results.rows.length===0){
            res.status(404).send('User doesnot exists');
        }
        else{
            pool.query(queries.updateUser, [name, email, address, id], (updateError, updateResults)=>{
                if (updateError){
                    throw updateError
                }
                res.status(200).send({message:'User updated Successfully'});
            })
        }

    })
}

exports.deleteUser = (req,res)=>{
    const id = parseInt(req.params.id);
    pool.query(queries.getUserById, [id], (error, results)=>{
        if (error){
            throw error
        }
        if(results.rows.length === 0){
            res.status(404).send('User doesnot exists')
        }
        else{
            pool.query(queries.deleteUser, [id], (deleteError)=>{
                if(deleteError){
                    throw deleteError
                }
                res.status(200).send(`User with ${id} deleted successfully`);

            })
        }
    })

}