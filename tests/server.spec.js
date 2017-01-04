const request = require('supertest');
const chai = require('chai');
const app = require('../server');
const expect = chai.expect;

var post = {
  name: 'jay',
  price: 80,
  inventory: 100
};

describe('/products', function() {
  it('should be a /products route', function(done) {
    request(app)
      .post('/products')
      // .expect('Content-Type', /json/)
      .expect(200, done);
  });
  it('should have an incoming request of { name: String, price: String, inventory: String }', function(done) {
    request(app)
      .post('/products')
      .expect(200, {
        name: post.name,
        price: post.price,
        ineventory: post.inventory
        })
      .end(function(err, res){

      })

  })
});