const express=require('express');
const { addItems,getItems, getItem, updateItem, deleteItem } = require('../controllers/itemController');
const router=express.Router();

router.post('/',addItems);
router.get('/',getItems);

router.get('/:id',getItem);
router.post('/:id',updateItem);

router.delete('/:id',deleteItem);

module.exports=router;