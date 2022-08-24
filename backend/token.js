//requiring mongoose
const mongoose=require('mongoose');
const Schema=mongoose.Schema;

//defining structure of user schema
const Token=new Schema({
    user:{
        type:String,
    },
    pass_token:{
        type:String
    }
});

const token=mongoose.model('Token',Token);

//exporting teacher schema
module.exports=token