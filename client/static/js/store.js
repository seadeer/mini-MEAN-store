var store = angular.module('store', ['ngRoute']);

//routes
store.config(function($routeProvider){
    $routeProvider

    .when('/', {
        templateUrl: '/partials/customers.html'
    })
    .when('/customers', {
    templateUrl: '/partials/customers.html'
  })

  .when('/orders', {
    templateUrl: '/partials/orders.html'
  })

  .otherwise('/', {
    templateUrl: '/partials/customers.html'
  });
});

//filters
store.filter('range', function(){
    return function(input, total){
        total = parseInt(total);

        for(var i=1; i<=total; i++){
            input.push(i);
        }
        return input;
    };
});

//customer factory
store.factory('customerFactory', function($http){
    var factory = {};
    factory.index = function(callback){
        $http.get('/customers').success(function(output){
            customers = output;
            console.log(customers);
            callback(customers);
        });
    };

    factory.create = function(customer, callback){
        $http.post('/customers/new', customer).success(function(output){
            callback(output);
        });
    };

    factory.delete = function(id, callback){
        $http.post('/customers/'+ id + '/delete').success(function(output){
            callback(output);
        });
    };

    factory.orderProduct = function(order, callback){
        var customerId = order.theCustomer._id;
        var request = {
            product: order.theProduct.name,
            productID: order.theProduct._id,
            quantity: order.theQuantity,
            date: new Date(),
        }
        console.log(request);
        $http.post('/customers/' + customerId + '/order', request).success(function(output){
            callback(output)
        })
        
    };

    return factory;
});

//products factory
store.factory('productFactory', function($http){
    var factory = {};
    factory.index = function(callback){
        $http.get('/products').success(function(output){
            products = output;
            console.log(products);
            callback(products);
        })
    };

    factory.create = function(product, callback){
        $http.post('/products/new', product).success(function(output){
            callback(output)
        })
    };

    factory.orderProduct = function(order){
        var productId = order.theProduct._id;
        var request = {
            customerID: order.theCustomer._id,
            customer: order.theCustomer.name,
            quantity: order.theQuantity,
            date: new Date(),
        }
        $http.post('/products/' + productId + '/order', request).success(function(output){
            console.log(output);
        })
        
    };

    factory.delete = function(id, callback){
        $http.post('/products/'+ id + '/delete').success(function(output){
            callback(output);
        });
    }; 
    return factory;
});

//customers controller
store.controller('customersController', function(customerFactory){
    var that = this;

    var index = function(){
        customerFactory.index(function(data){
            console.log(data);
                if(data){
                    that.customers = data;
                }
            });
    };

    index();

    this.create = function(){
        console.log(that.newCustomer);
        customerFactory.create(that.newCustomer, function(data){
            console.log(data);
            index();
            that.newCustomer = {};
        });
    };

    this.delete = function(ind){
        console.log(that.customers[ind]);
        var id = that.customers[ind]._id;
        customerFactory.delete(id, function(data){
            console.log(data);
        });
        index();
    };


    
});


//orders controller
store.controller('ordersController', function(customerFactory, productFactory){
    var that = this;
    var getCustomers = function(){
        customerFactory.index(function(data){
            if(data){
                that.customers = data;
            }
        })
    }
    getCustomers();

    var index = function(){
        productFactory.index(function(data){
            if(data){
                that.products = data;
            }
        });
    };

    index();

    this.create = function(){
        console.log(that.newProduct);
        productFactory.create(that.newProduct, function(data){
            index();
            that.newProduct = {};
        });
    };

    this.delete = function(ind){
        console.log(that.products[ind]);
        var id = that.products[ind]._id;
        productFactory.delete(id, function(data){
            console.log(data);
            index();
        });
    };

    this.orderProduct = function(){
        var order = that;
        productFactory.orderProduct(order);
        customerFactory.orderProduct(order, function(data){
            console.log(data);
            index();
            getCustomers();
        });
       
        };
    });



