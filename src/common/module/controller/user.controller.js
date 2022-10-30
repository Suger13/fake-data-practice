const bcrypt = require('bcrypt');
const { ObjectID } = require('bson');
const { reset } = require('nodemon');
const { db } = require('../../../utils/db.js');
// const jwt = require('jsonwebtoken');

const userController = {
    async register(req, res) {
        const user = {
            username : req.body.username,
            password : req.body.password,
            first_name : req.body.firstname,
            last_name : req.body.lastname
        }

        const salt = await bcrypt.genSalt(10)
        user.password = await bcrypt.hash(user.password, salt)

        const result = await db.collection("users").insertOne(user)

        console.log(await db.collection("users").findOne(result.insertedId))

        res.status(201).json({
            msg : "user has been created!"
        })

    },
    async getUser(req, res) {
        try{
            const result = await db.collection("users").find().toArray()
            
            res.json({
                data : result
            })

        }catch(err){
            console.log("err woyyy")
        }
    },

    async getuserById(req, res){
        const result = await db.collection("users").findOne({
            _id : ObjectID(req.params.id)
        })

        res.json({
            data : result
        })
    },
    async updateUser(req, res) {
        try{
            const updateUser = await db.collection("users").updateOne({"_id" : ObjectID(req.params.id)}, {
                $set : {
                    first_name : req.body.firstname,
                    last_name : req.body.lastname
                }
            })

        }catch(err){
            console.log(err)
        }

        res.status(200).json({
            msg : "user has been updated!"
        })
    },
    async deleteUser(req, res) {
        const result = await db.collection("users").deleteOne({
            _id : ObjectID(req.params.id)
        })

        console.log(result)

        res.status(200).json({
            msg : "user has been deleted"
        })
        
    }
}

module.exports = userController;