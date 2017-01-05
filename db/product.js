module.exports = (function(){
  var products =[]

  var _add = function(data){
    products.push(data)
    console.log(products);
    return products;
  }

  var _reset = function(){
    products = [];

  }

  return {
    add: _add,
    reset: _reset
  }

})();