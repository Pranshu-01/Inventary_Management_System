const mongoose=require('mongoose');

const ItemSchema=new mongoose.Schema({
    name:{type:String,required:true},
    date:{type:Object},
    quantity:{type:Object}
})

module.exports=mongoose.model("Item",ItemSchema);