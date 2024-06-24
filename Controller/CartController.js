const Cart = require('../models/Cart');
const User = require('../models/User');
const mongoose = require('mongoose');
const Product = require('../models/Product');


const CartController = {
    CreateCart: async (req, res) => {
        const { userId, items } = req.body;
        console.log(req.body);
        try {
            // Check if the userId is a valid ObjectId (optional, depending on your frontend validation)
            if (!mongoose.Types.ObjectId.isValid(userId)) {
                return res.status(400).json({ msg: 'Invalid userId format' });
            }
    
            // Check if the user exists
            const user = await User.findById(userId);
            if (!user) {
                return res.status(404).json({ msg: 'User not found' });
            }
    
            // Check if the products exist
            for (const item of items) {
                const product = await Product.findById(item.product);
                if (!product) {
                    return res.status(404).json({ msg: `Product not found: ${item.product}` });
                }
            }
    
            // Create new cart
            const newCart = new Cart({
                user: userId,
                items
            });
    
            await newCart.save();
            res.status(201).json(newCart);
        } catch (error) {
            console.error('Error creating cart:', error);
            res.status(500).json({ msg: 'Server error', error });
        }
    },
    
    UpdateCart: async (req, res)=> {
        const { cartId } = req.params;
        const { items } = req.body;

        try {
            // Find the cart by ID
            const cart = await Cart.findById(cartId);
            if (!cart) {
                return res.status(404).json({ msg: 'Cart not found' });
            }

            // Update items in the cart
            cart.items = items;

            await cart.save();
            res.status(200).json(cart);
        } catch (error) {
            res.status(500).json({ msg: 'Server error', error });
        }
    },

    getCartById: async (req,res)=>{
        const {userId} = req.params;
        console.log(userId)
    
     try{
        const cart = await Cart.findOne({user: userId});
        if (!cart) {
          return res.status(404).json({ message: 'Cart not found' });
        }
        
       return res.json(cart);
       
     } 
     catch(error){
        console.error('Error fetching Cart:', error);
      return  res.status(500).json({ message: 'Server error' });
     }
   
      
  

    }
}
module.exports={CartController};