const { ObjectId } = require('mongodb')
const { db } = require('../../../utils/db.js')

const productController = {

    //get
    async getProduct (req, res) {   
        const result = await db.collection('products').find().toArray()
        console.log(result)
        res.json({
            data : result
        })
    },

    async getProductById(req, res) {
        data  = await db.collection('products').findOne({
            _id : ObjectId(req.params.id)
        })
        
        res.json({
            data : data
        })
    },

    //create
    async postProduct(req, res) {

        let result = await db.collection("products").insertOne({
            name : req.body.name,
            price : req.body.price
        })

        const getRecent = await db.collection("products").findOne({
            _id : result.insertedId
        })

        res.status(200).json({
            msg : "product added",
            data : getRecent
        })
    },

    //delete
    async deleteProduct(req, res){
        await db.collection("products").deleteOne({
            _id : ObjectId(req.params.id)
        })

        res.status(202).json({
            msg : "user has been deleted"
        })
    }
}

module.exports = productController;