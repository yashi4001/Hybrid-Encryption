const mongoose = require('mongoose')
require("dotenv").config();

const mongo = async() => {
    try{
        //Database connection
       const MONGOURI = 'mongodb+srv://user1234:Vk1KG4aJFNBeDdWo@cluster0.izm5ovr.mongodb.net/?retryWrites=true&w=majority';
        await mongoose.connect(MONGOURI, {
            useUnifiedTopology: true,
            useNewUrlParser: true,
        });
        mongoose.Promise = global.Promise;
        console.log("Database connected!")
    }
    catch(err){
        console.log(err);
        console.log("Cannot connect to the Database")
    }
}
module.exports = mongo