const mongoose = require('mongoose')
const productSchema = new mongoose.Schema({
    name  :{
        type : String,
    },
    url: {
        type: String,
        unique: true
    },
    imageUrl:{
        type: String,
    },
    price : {
        type : Number
    }
    });
const Products = mongoose.model('Products',productSchema)
module.exports = Products;
