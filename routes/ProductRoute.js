const express = require('express');
const { ProductController } = require('../Controller/ProdutController');

const ProductRouter=express.Router();

ProductRouter.get('/allProducts',ProductController.getAllProduct);
ProductRouter.get('/:ProductId',ProductController.getProductById);
module.exports={ProductRouter}