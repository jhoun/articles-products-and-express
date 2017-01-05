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
    return products;
  }

  var _editById = function(routeId, newName){
    console.log('req.params.id', routeId);
    console.log('products: ', products);
    console.log('products[0].id: ', products[0].id);
    console.log('newName: ', newName);
    if (Number(routeId) === products[0].id) {
      products[0].name = newName;
    }
    console.log('newProducts: ', products);
  }

  var _reset = function(){
    products = [];
    i = 0;
  }

  return {
    add: _add,
    reset: _reset,
    editById: _editById
  }

})();