var mongoose = require('mongoose')
var Schema = mongoose.Schema;
var ProductSchema = new mongoose.Schema(
{
    name: String,
    quantity: Number,
    orders: [],
},
    {timestamps: true}
);

var Product = mongoose.model('Product', ProductSchema);
