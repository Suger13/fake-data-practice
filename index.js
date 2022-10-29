const express = require('express');
const { client, db } = require('./src/utils/db.js')
const productRouter = require('./src/common/module/productRouter.js')
require('dotenv').config()

const app = express();
const port =  process.env.PORT || 4025

const init = async () => {

    await client.connect()
    console.log(`database : ${db.databaseName} has connected to server`)
    
    app.get('/', (req, res) => {
        res.send('hello world')
    })
    app.use('/products', productRouter)
    
    
    app.listen(port, () => {
        console.log(`server is running on port ${port}`)
    })

}

init()