var mongoose = require('mongoose');
var Customer = mongoose.model('Customer');
var Product = mongoose.model('Product');


module.exports = {

    index: function(req, res){
        Customer.find({}, function(err, customers){
            if(customers.length < 1){
                res.json("No customers yet!");
            }
            else if(err){
                res.json(err);
            }
            else{
                res.json(customers);
            }
        });
    },

    create: function(req, res){
        console.log(req.body)
        Customer.findOne({name:req.body.name}, function(err, customer){
            console.log("found customer ", customer)
            if(err){
                console.log(err);
            }
            else{
                if(customer){
                    console.log("existing customer", customer)
                    res.json(customer)
                }
                else{
                    var customer = new Customer(req.body);
                    customer.save(function(err, customer){
                        console.log(customer, "saving new customer");
                        if(err){
                            res.json(err);
                        }
                        else{
                            res.json(customer);
                        }
                    });
                }
            }
        })
    },

    delete: function(req, res){
        console.log("Deleting", req.params.id)
        Customer.findOneAndRemove({_id:req.params.id}, function(err){
            if(err){
                res.json(err)
            }
            else{
                res.send("Delete success!")
            }
        })

    },

    addOrder: function(req, res){
        var order = req.body;
        Customer.findByIdAndUpdate(req.params.id, {$push: {"orders":{order}}}, function(err){
            if(err){
                res.json(err)
            }
            else{
                res.json("Customer updated!")
            }
        })

    }


}
