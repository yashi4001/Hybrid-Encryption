//requiring mongoose
const mongoose=require('mongoose');
const Schema=mongoose.Schema;

//defining structure of user schema
const Password=new Schema({
    user:{
        type:String,
    },
    password:{
        type:String
    },
    label:{
        type:String
    }
});

const password=mongoose.model('Password',Password);

//exporting teacher schema
module.exports=password