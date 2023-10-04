const Item=require('../models/itemSchema');

const addItems=async(req,res)=>{
    const newItem=new Item({
        name:req.body.name,
        date:req.body.date,
        quantity:req.body.quantity
    });

    try{
        const savedItem=await newItem.save();
        res.status(200).json(savedItem);
    }
    catch(err){
        res.status(500).json(err);
    }
}

const getItems=async(req,res)=>{
    try{
        const items=await Item.find({});
        res.status(200).json(items);
    }
    catch(err){
        res.save(500).json(err);
    }
}

const getItem=async(req,res)=>{
    try{
        const {id}=req.params;
        const data=await Item.findById(id);
        res.status(200).json(data);
    }
    catch(err){
        res.status(500).json(err);
    }
}

const updateItem=async(req,res)=>{
        const updatedItem=new Item(req.body);

    try{
        // console.log(req.body);
        await Item.updateOne({_id:req.params.id},updatedItem);
        res.status(200).json(updatedItem);
    }
    catch(err){
        res.status(500).json(err);
    }
}

const deleteItem=async(req,res)=>{
    try{
        await Item.deleteOne({_id:req.params.id});
        res.status(200).json('Item Deleted Successfully');
    }
    catch(err){
        res.status(500).json(err);
    }
}


module.exports={
    addItems,
    getItems,
    getItem,
    updateItem,
    deleteItem
}