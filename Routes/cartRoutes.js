const express = require('express');
const Cart = require('../Models/cartModel');
const upload = require('./multer');
const Product = require('../Models/productModel');

const router = express.Router();

router.get('/get', async (req, res) => {
    const getCart =  await Cart.find({});
    if(getCart) {
        res.status(200).json({getCart});
    } else {
        res.status(404).json({errorMessage: 'No products in Cart.'})
    }
})

router.get('/:id', async(req, res) => {
    const findProduct = await Cart.findById({_id: req.params.id}).exec();
    if(findProduct) {
      res.status(200).send({findProduct});
    }

   });

router.post('/post', upload.single(), async(req, res) => {   
    const alreadyPresent = await Cart.findOne({title: req.body.title});
    if(alreadyPresent) {
        res.status(201).json({errorMessage: 'Product is already present in cart'});
    } else {
        if(req.body.sizes && req.body.sizes.length > 0) {
            productSizes = req.body.sizes.map(savedSize => {
              return{
                size: savedSize
              }
              });
          }
        const cart = new Cart({
            title: req.body.title,
            subTitle: req.body.subTitle,
            price: req.body.price,
            offer: req.body.offer,
            offPrice: req.body.offPrice,
            priceAfterOff: req.body.priceAfterOff,
            coupan: req.body.coupan,
            coupanDiscount: req.body.coupanDiscount,
            productSize: req.body.sizeToShop,
            productSizes,
            category: req.body.cat,
            brand: req.body.brand,
            productPicture: req.body.image
    });
        await cart.save(((error, result) => {
            if(result) {
                res.status(200).json({successMessage: 'Product added to cart successfully.'});
            }
            if(error) {
                    res.status(201).json({errorMessage: 'Product is already in cart'});
                }    
    
        }));
    }
    
});

router.delete('/remove/:id', async (req, res) => {
    const findProduct = await Cart.findById({_id : req.params.id});
    if(findProduct) {
        findProduct.remove();
        res.status(200).json({successMessage: 'Product removed from the cart successfully'});
        
    } else {
        res.status(404).json({errorMessage: 'Product cannot be removed from the cart.'})
    }
})

router.delete('/move/:id', async (req, res) => {
    const findProduct = await Cart.findById({_id : req.params.id});
    if(findProduct) {
        findProduct.remove();
        res.status(200).json({successMessage: 'Product moved to Wishlist successfully'});
        
    } else {
        res.status(404).json({errorMessage: 'Product cannot be moved from the cart.'})
    }
});

router.delete('/remove/:id', async (req, res) => {
    const findProduct = await Cart.findById({_id : req.params.id});
    if(findProduct) {
        findProduct.remove();
        res.status(200).json({successMessage: 'Product removed from the cart successfully'});
        
    } else {
        res.status(404).json({errorMessage: 'Product cannot be removed from the cart.'})
    }
})

router.delete('/move/:id', async (req, res) => {
    const findProduct = await Cart.findById({_id : req.params.id});
    if(findProduct) {
        findProduct.remove();
        res.status(200).json({successMessage: 'Product moved to Wishlist successfully'});
        
    } else {
        res.status(404).json({errorMessage: 'Product cannot be moved from the cart.'})
    }
});

router.post('/postQty/:id', async (req, res) => {
    const findProduct = await Cart.findById({_id: req.params.id});
    if(findProduct) {
        findProduct.qty = req.body.qtyToShop
        findProduct.save((error, result) => {
            if(result) {
                res.status(200).json({successMessage: 'Quantity updated successfully.'})
            } 
            if(error) {
                res.status(400).json({successMessage: 'Quantity not updated.'})
            }
        })
    }
});

router.post('/postSize/:id', async (req, res) => {
    const findProduct = await Cart.findById({_id: req.params.id});
    if(findProduct) {
        findProduct.productSize = req.body.sizeToShop
        findProduct.save((error, result) => {
            if(result) {
                res.status(200).json({successMessage: 'Size updated successfully.'})
            } 
            if(error) {
                res.status(400).json({successMessage: 'Size not updated.'})
            }
        })
    }
});

router.post('/coupan/apply', upload.single(''), async(req, res) => {
    const records = await Cart.find().where('_id').in(req.body.prodId).exec();
    await records.map(async (CartProd) => {
    if (CartProd.coupan === req.body.coupanCode) {
        if(CartProd.coupanStatus === "true") {
            res.status(201).json({errorMessage: 'Coupan already applied to products in Bag.'});
        } else {
            const discount = CartProd.coupanDiscount;
            const priceAfterOff = CartProd.priceAfterOff;
            const coupanApplying = discount * priceAfterOff / 100;
            CartProd.priceAfterOff = priceAfterOff - coupanApplying;
            CartProd.coupanDiscountAmount = coupanApplying;
            CartProd.coupanStatus = "true";
           await CartProd.save();
          res.status(200).json({successMessage: 'Applied'});
        }
    } 
    else if (CartProd.coupan !== req.body.coupanCode) {
        res.status(201).json({errorMessage: 'Invalid Coupan'});
    } else {
        return null;
    }


   
});

})



module.exports = router;