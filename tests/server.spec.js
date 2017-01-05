const request = require('supertest');
const chai = require('chai');
const app = require('../server');
const Product = require('../db/product');
const expect = chai.expect;
const should = chai.should;



describe('/products', function() {
  it('respond with redirecting to /products', function(done) {
    request(app)
      .post('/products')
      .type('form')
      .send({
        name:'Red Bag',
        price: '34',
        inventory: '100'
      })
      .end (function (err, res) {
        if (err) {
          throw new Error(err);
        }
        expect(res.header.location).to.equal('/products')
        Product.reset();
        done()
      });
  })

  it('if object is empty then send user back to new article route', function(done){
    request(app)
    .post('/products')
    .type('form')
    .send({})
    .end (function (err, res) {
        if (err) {
          throw new Error(err);
        }
        expect(res.header.location).to.equal('/products/new')
        done()
    });
  })

  it('if object is invalid then send user back to new article route', function(done){
    request(app)
    .post('/products')
    .type('form')
    .send({
      name:'Red Bag',
      price: 'ten',
      inventory: 'fifty'
    })
    .end (function (err, res) {
        if (err) {
          throw new Error(err);
        }
        expect(res.header.location).to.equal('/products/new')
        done()
    });
  })



});