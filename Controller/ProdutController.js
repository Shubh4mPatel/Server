const Product = require('../models/Product')

const ProductController={
  getAllProduct: async (req,res)=>{
    try {
        const products = await Product.find();
        res.json(products);
      } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
      }
    },
  getProductById: async (req,res)=>{
    const {ProductId} = req.params;
   
    try {
      const product = await Product.findById({_id : ProductId});
      if (!product) {
        return res.status(404).json({ message: 'Product not found' });
      }
      res.json(product);
    } catch (error) {
      console.error('Error fetching product:', error);
      res.status(500).json({ message: 'Server error' });
    }
  }
}
module.exports={ProductController};
