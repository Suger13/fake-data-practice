const bcrypt = require('bcrypt');
const { ObjectID } = require('bson');
const { reset } = require('nodemon');
const { db } = require('../../../utils/db.js');
// const jwt = require('jsonwebtoken');

const userController = {
    async register(req, res) {
        try{
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
        }catch(err){
            console.log(err)
            res.status(400).json({
                msg : "invalid input"
            })
        }

    },
    async getUser(req, res) {
        try{
            const result = await db.collection("users").find().toArray()
            
            res.json({
                data : result
            })

        }catch(err){
            console.err(err)
            res.status(400).json({
                msg : "invalid input"
            })
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

            const before = await db.collection("users").findOne({
                _id : ObjectID(req.params.id)
            })


            await db.collection("users").updateOne({"_id" : ObjectID(req.params.id)}, {
                $set : {
                    first_name : req.body.firstName,
                    last_name : req.body.lastName
                }
            })

            const after = await db.collection("users").findOne({
                _id : ObjectID(req.params.id)
            })
            

            after.first_name && after.last_name ? res.status(200).json({ msg : "user has been updated!" }) : await db.collection("users").updateOne(
                {"_id" : ObjectID(req.params.id)},
                { $set : {
                    first_name : before.first_name,
                    last_name : before.last_name
                }}
            ).then(res.json({ msg : "invalid obj.key"}))
            

        }catch(err){
            console.log(err)
            res.status(400).json({
                msg : "invalid input"
            })
        }

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