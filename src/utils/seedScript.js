const faker = require('@faker-js/faker')
const client = require('./db.js')

async function seedDB() {
    try{
        await client.connect();
        console.log("connected correctly to server")

        const collection = client.db("fake-db").collection("fakeCollection")

        collection.drop();

        let timeSeriesData = [];

        for (let i = 0; i< 100; i++){
            const firstName = faker.name.firstName();
            const lastName = faker.name.lastName();
            const timestamp = fakesr.date.past()
            collection.insertOne({
                firstName : firstName,
                lastName : lastName,
                created_at : timestamp
            })
        }

        


    } catch(err){
        console.log(err.message)
    }
}

// seedDB()