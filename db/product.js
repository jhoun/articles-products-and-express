module.exports = (function(){
  var products =[];
  var i = 0;

  var _add = function(data){
    ++i;
    var id = i;
    data.id = Number(id);
    data.price = Number(data.price);
    data.inventory = Number(data.inventory);
    products.push(data)
    console.log('products after add: ',products);
    return products;
  }

  var _editById = function(routeId, newName, newPrice, newInventory){
    for (var i = 0; i < products.length; i++){
      if (products[i].id === Number(routeId)) {
        products[i].name = newName;
        products[i].price = Number(newPrice);
        products[i].inventory = Number(newInventory);
      }
    }
      return products;
  }

  var _isIdFound = function(routeId){
    for (var i = 0; i < products.length; i++){
      if (Number(routeId) === products[i].id){
        console.log('products[i]: ', products[i]);
        return products[i];
      }
    }
      return false;
    }

  var _delete = function(routeId){
    for (var i = 0; i < products.length; i ++){
      if (Number(routeId) === products[i].id){
        products.splice(i, 1);
      }
    }
  }

  var _all = function(){
    return products;
  }

  var _reset = function(){
    products = [];
    i = 0;
  }

  return {
    add: _add,
    reset: _reset,
    editById: _editById,
    isIdFound: _isIdFound,
    delete: _delete,
    all: _all
  }

})();