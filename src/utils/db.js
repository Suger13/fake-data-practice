const { MongoClient } = require('mongodb')

const client = new MongoClient(`mongodb://localhost:27017`, {
    useUnifiedTopology : true
})

const db = client.db("fake-db")

exports.client = client;
exports.db = db;