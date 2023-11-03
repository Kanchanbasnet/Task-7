const pool = require('../../db');
const queries = require('../../queries/cart.queries');
const util = require('util');
const query = util.promisify(pool.query).bind(pool);


exports.addToCart = async(req,res)=>{

}

exports.getAllCart = async(req,res)=>{

}

exports.getCartById = async (req,res)=>{
    
}