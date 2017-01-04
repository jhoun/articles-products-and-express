const request = require('supertest');
const chai = require('chai');
const app = require('../server');
const expect = chai.expect;


describe('/products', function() {
  it('should be a /products route', function(done) {
    request(app)
      .post('/products')
      // .expect('Content-Type', /json/)
      .expect(200, done);
  });
});