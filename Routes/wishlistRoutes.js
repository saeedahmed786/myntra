const express = require('express');
const Wish = require('../Models/wishlistModel');
const upload = require('./multer');

const router = express.Router();


router.get('/get', async (req, res) => {
    const getWish =  await Wish.find({});
    if(getWish) {
        res.status(200).json({getWish});
    } else {
        res.status(404).json({errorMessage: 'No products in Wishlist.'})
    }
})

router.get('/:id', async(req, res) => {
    const findProduct = await Wish.findById({_id: req.params.id}).exec();
    if(findProduct) {
      res.status(200).send({findProduct});
    }

   });

router.post('/post', upload.single(), async(req, res) => {   
    console.log(req.body.coupan);
    console.log(req.body.coupanDiscount);
    const alreadyPresent = await Wish.findOne({title: req.body.title});
    if(alreadyPresent) {
        res.status(201).json({errorMessage: 'Product is already present in Wishlist'});
    } else {
           
        if(req.body.sizes && req.body.sizes.length > 0) {
            productSizes = req.body.sizes.map(savedSize => {
              return{
                size: savedSize
              }
              });
          }
        const wish = new Wish({
            title: req.body.title,
            subTitle: req.body.subTitle,
            price: req.body.price,
            offer: req.body.offer,
            offPrice: req.body.offPrice,
            priceAfterOff: req.body.priceAfterOff,
            coupan: req.body.coupan,
            coupanDiscount: req.body.coupanDiscount,
            productSizes,
            category: req.body.cat,
            brand: req.body.brand,
            productPicture: req.body.image
    });
        await wish.save(((error, result) => {
            if(result) {
                res.status(200).json({successMessage: 'Product added to Wishlist successfully.'});
            }
            if(error) {
                    res.status(201).json({errorMessage: 'Product is already in Wishlist'});
                }    
    
        }));
    }
           
    

});

router.delete('/remove/:id', async (req, res) => {
    const findProduct = await Wish.findById({_id : req.params.id});
    if(findProduct) {
        findProduct.remove();
        res.status(200).json({successMessage: 'Product removed from the Wishlist successfully'});
        
    } else {
        res.status(404).json({errorMessage: 'Product cannot be removed from the Wishlist.'})
    }
})

router.delete('/move/:id', async (req, res) => {
    const findProduct = await Wish.findById({_id : req.params.id});
    if(findProduct) {
        findProduct.remove();
        res.status(200).json({successMessage: 'Product moved to Cart successfully'});
        
    } else {
        res.status(404).json({errorMessage: 'Product cannot be moved from the Wishlist.'})
    }
})



module.exports = router;