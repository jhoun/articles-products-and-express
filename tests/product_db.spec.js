const chai = require('chai')
const expect = chai.expect;
const should = chai.should;
const Product = require('../db/product');

describe('product db', function() {
  it('add method should add new product to db', function(done) {
    expect(Product.add({name: 'red bag', price: '23', inventory: '100'})).to.deep.equal([{name: 'red bag', price: '23', inventory: '100'}]);
    done();
  })
})