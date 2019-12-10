const mongoose=require('mongoose');

const Schema=mongoose.Schema;

const BlogSchema=new Schema({
    title:{
        type:String,
        required:true
    },
    image:{
        type:String,
        required:true
    },
    body:{
        type:String,
        required:true
    },
    creator:{
        type:Schema.Types.ObjectId,
        required:true
    },
    created:{
        type:Date,
        default:Date.now
    }
})

module.exports=mongoose.model('Blog', BlogSchema);