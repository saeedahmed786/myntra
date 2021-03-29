const mongoonse = require('mongoose');

const cartSchema = new mongoonse.Schema({
    title: {
        type: String,
        required: true,
        unique: true,
    },
    subTitle: {
        type: String, 
        required: true
    },
    price: {
        type: Number, 
        required: true
    },
    offer: {
        type: Number, 
        required: true
    },
    priceAfterOff: {
        type: Number, 
        required: true
    },
    offPrice: {
        type: Number, 
        required: true
    },
    coupan : {
        type: String, 
        default: ''
    },
    coupanStatus: {
        type: String,
        default: 'false'
    },
    coupanDiscount : {
        type: String, 
        default: ''
    },
    coupanDiscountAmount : {
        type: Number, 
        default: ''
    },
    productSize: {
        type: String
    },
   productColor: {
       type: String
   },
   qty: {
       type: Number,
       default: 0
   },
    productPicture: {
        type: String,
        required: true
    },
    productSizes: [
        {
            size: {
            type: String
            }
    }
   ],
    category:  {type: String, required: true},
    brand:  {type: String, required: true},
    


}

);

const cartModel = new mongoonse.model('cart', cartSchema);

module.exports = cartModel;