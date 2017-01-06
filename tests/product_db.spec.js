const chai = require('chai')
const expect = chai.expect;
const should = chai.should;
const Product = require('../db/product');


describe('product db', function() {
  it('new product in db should have id property with price & inventory changed to a number data type', function(done) {
    let data =  {name: 'green bag', price: '23', inventory: '100'};
    let data2 =  {name: 'green bag', price: '23', inventory: '100'};

    Product.add(data);
    let result = Product.add(data2);
    expect(result).to.deep.equal([{id: 1, name:'green bag', price: 23, inventory: 100}, {id: 2, name:'green bag', price: 23, inventory: 100}]);
    Product.reset();
    done();
  });

  it('should have updated product name', function(done) {
    let postData =  {name: 'green bag', price: '23', inventory: '100'};

    let addResult = Product.add(postData);

    let editByIdResult = Product.editById(1, 'rainbow bag', '1000', '5');

    expect(editByIdResult).to.deep.equal([{id: 1, name:'rainbow bag', price: 1000, inventory: 5}]);
    Product.reset();
    done();
  });
})

