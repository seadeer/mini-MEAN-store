var mongoose = require('mongoose')
var Schema = mongoose.Schema;
var ProductSchema = new mongoose.Schema(
{
    name: String,
    quantity: Number,
    orders: [],
    image: String,
    description: String
},
    {timestamps: true}
);

var Product = mongoose.model('Product', ProductSchema);
