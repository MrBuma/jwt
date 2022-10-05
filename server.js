const express = require('express');
const app = express();

require('dotenv').config();
// require('../tokenweb/connection/connnect_mgdb');
 const routeUser = require('../tokenweb/routers/user.router');
const creatError = require('http-errors');
app.use(express.json());
app.use(express.urlencoded({extended: true}));


app.use('/users', routeUser);
app.get('/', (req, res, next)=>{
    res.send("Home page");
});

app.use((err, req, res, next)=>{
    
       res.json({
        status: err.status || 500,
        mesage: err.message
    });
})
const port = process.env.PORT || 3000;

app.listen(port, (req, res)=>{
    console.log(`Server is running at port ${port}`);
    });