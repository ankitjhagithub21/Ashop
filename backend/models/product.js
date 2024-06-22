const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true,

    },
    stock: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    image:{
        type:String,
        required:true
    },
    category:{
        type:String,
        required:true
    },
    sold:{
        type:Number,
        default:0
    },
    createdAt:{
        type:Date,
        default:Date.now()
    }

});



const Product = mongoose.model('Product', productSchema);

module.exports = Product;