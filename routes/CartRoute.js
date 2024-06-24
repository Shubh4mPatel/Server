const express = require('express');
const { CartController } = require('../Controller/CartController');

const CartRouter=express.Router();


CartRouter.post('/CreateCart',CartController.CreateCart);
CartRouter.post('/UpdateCart',CartController.UpdateCart);
CartRouter.get('/:userId',CartController.getCartById);


module.exports={CartRouter}