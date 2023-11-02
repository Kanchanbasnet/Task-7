const express = require('express');
const dotenv = require('dotenv');
const userRouter = require('./routes/user.Route');



const app = express();
app.use(express.json());
dotenv.config()

const PORT = process.env.PORT

app.listen(PORT, ()=>{
    console.log(`Server is running on the http:\\localhost:${PORT}`);
})

app.use('/users',userRouter);