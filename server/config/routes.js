var customers = require('../controllers/customers');
var products = require('../controllers/products');

module.exports = function(app){
    app.get('/', function(req, res){
        console.log("Hello, I'm working!");
    });

    app.get('/customers', function(req, res){
        customers.index(req, res);
    });

    app.post('/customers/new', function(req, res){
        customers.create(req, res);
    });

    app.post('/customers/:id/delete', function(req, res){
        customers.delete(req, res);
    });

    app.post('/customers/:id/order', function(req, res){
        customers.addOrder(req, res);
    })

    app.get('/products', function(req, res){
        products.index(req, res);
    });

    app.post('/products/new', function(req, res){
        products.create(req, res);
    });

    app.post('/products/:id/delete', function(req, res){
        products.delete(req, res);
    })

    app.post('/products/:id/order', function(req, res){
        products.addOrder(req, res);
    })


};
