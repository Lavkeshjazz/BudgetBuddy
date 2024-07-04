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
    price :{
        type : Number
    },
    lowestprice :{
        type : Number
    },
    averageprice :{
        type : Number
    },
    highestprice :{
        type : Number
    },
    counter : {
        type : Number,
        default: 0
    },
    priceHistory : [{
        price:{
            type : Number
        },
        date : {
            type : Date
        }
    }]
});

// Function to calculate and update lowest, average, and highest prices
productSchema.methods.updatePriceStats = function () {
    let lowest = Number.POSITIVE_INFINITY;
    let highest = Number.NEGATIVE_INFINITY;
    let sum = 0;

    this.priceHistory.forEach(entry => {
        if (entry.price < lowest) {
            lowest = entry.price;
        }
        if (entry.price > highest) {
            highest = entry.price;
        }
        sum += entry.price;
    });

    this.lowestprice = lowest;
    this.highestprice = highest;
    this.averageprice = sum / this.priceHistory.length;
};

productSchema.pre("save", function(){
    this.counter = this.counter+1;
})

const Products = mongoose.model('Products',productSchema)
module.exports = Products;


