const express = require('express');
const dotenv = require('dotenv');
const swaggerUI = require('swagger-ui-express');
const swaggerDocs = require('swagger-jsdoc');
const userRouter = require('./routes/user.Route');
const productRouter = require('./routes/product.Route');
const cartRouter = require('./routes/cart.Route');
const orderRouter = require('./routes/order.Route');



const app = express();
app.use(express.json());
dotenv.config()

const PORT = process.env.PORT

app.listen(PORT, ()=>{
    console.log(`Server is running on the http:\\localhost:${PORT}`);
})
const options ={
    definition:{
     openapi:"3.0.0",
     info:{
        title:"Ecommerce API",
        version:"1.0.0",
        description:"This is the REST API application made with express. It is a simple Express Ecommerce API."

     },
     servers:[{
        url:"http://localhost:4000"
     }]
    },
    apis:['../Task7/swaggerDocs/*.js']  
}
const specs = swaggerDocs(options);

app.use('/users',userRouter);
app.use('/products', productRouter);
app.use('/cart',cartRouter);
app.use('/order',orderRouter);
app.use('/docs',swaggerUI.serve, swaggerUI.setup(specs))
