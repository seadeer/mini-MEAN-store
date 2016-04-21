var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var CustomerSchema = new mongoose.Schema(
{
    name: String,
    orders: []
}, {timestamps: true
})

var Customer = mongoose.model('Customer', CustomerSchema);
