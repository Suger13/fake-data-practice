const { ObjectId } = require('mongodb')
const { db } = require('../../../utils/db.js')

const productController = {
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

    async postProduct(req, res) {
        await db.collection("products").insertOne({
            "first_name" : "aun",
            "last_name" : "singhjoo", 
            "email" : "email@email.com",
            "gender" : "mali",
            "ip_address" : "192.168.1.0"
        })

        res.status(200).json({
            msg : "user has been created"
        })
    },

    async deleteProduct(req, res){
        await db.collection("products").deleteOne({
            _id : ObjectId(req.params.id)
        })

        console.log(await db.collection("products").findOne({
            _id : ObjectId(req.params.id)
        }))

        res.status(202).json({
            msg : "user has been deleted"
        })
    }

}

module.exports = productController;