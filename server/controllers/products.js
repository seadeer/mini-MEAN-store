var mongoose = require('mongoose');
var Customer = mongoose.model('Customer');
var Product = mongoose.model('Product');


module.exports = {

    index: function(req, res){
        Product.find({}, function(err, products){
            if(products.length < 1){
                res.json("No products yet!");
            }
            else if(err){
                res.json(err);
            }
            else{
                res.json(products);
            }
        });
    },

    create: function(req, res){
        var product = new Product({name: req.body.name});
        Product.findOne({name:req.body.name}, function(err, product){
            if(err){
                res.json(err);
            }
            else{
                if(product){
                    console.log("existing product", product)
                }
                else{
                    var product = new Product(req.body);
                    product.save(function(err, product){
                        console.log(product, "saving new product");
                        if(err){
                            res.json(err);
                        }
                        else{res.json(product);
                        }
                    });
                }
            }
        });
    },

    delete: function(req, res){
        console.log("Deleting", req.params.id)
        Product.findOneAndRemove({id:req.params.id}),
        function(err){
            if(err){
                res.json(err);
            }
            else{
                res.send("Delete success!");
            }
        };

    },

    addOrder: function(req, res){
        var order = req.body;
        var quantity = parseInt(req.body.quantity);
        console.log(quantity);
        console.log("Adding order", req.params.id, req.body);
        Product.findByIdAndUpdate(req.params.id, {$inc:{quantity: -quantity}}, function(err, query){
            if(err){
                res.json(err);
            }
            else{
                console.log(query);
                Product.findByIdAndUpdate(req.params.id, {$push: {"orders": {order}}}, function(err){
                    if(err){
                        res.json(err);
                    }
                    else{
                        res.send("Update successful!");
                    }
                });
            }
    });
},

};
