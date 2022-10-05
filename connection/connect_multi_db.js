const mongoose = require('mongoose');
require('dotenv').config();

function newConnect(strConnect){
    const conn = mongoose.createConnection(strConnect);

        conn.on('connected', (req, res)=>{
            console.log(`Mongoodb::: connected:: ${conn.name}`);
        });
        conn.on('disconnected', (req, res)=>{
            console.log(`Mongoodb::: disconnected:: ${conn.name}`);
        });

        conn.on('error', (req, res)=>{
            console.log(`Mongoodb::: error:: ${JSON.stringify(error)}`);
        });

        process.on('SIGINT', async ()=>{
            await conn.close();
            process.exit(0);

        });
        console.log('Server is connected!')
        return conn;
}
 const  connectTest= newConnect(process.env.DATABASEURLTEST);
module.exports = {
    connectTest
}