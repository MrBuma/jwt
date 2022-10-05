const mongoose = require('mongoose');

const conn = mongoose.createConnection('mongodb://localhost:27017/test', {useNewUrlParser: true, useUnifiedTopology: true});

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

module.exports = conn;



