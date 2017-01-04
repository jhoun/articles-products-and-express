const request = require('supertest');
const chai = require('chai');
const app = require('../server');
const expect = chai.expect;
const should = chai.should;



describe('/products', function() {
  // it('should be a /products route', function(done) {
  //   request(app)
  //     .post('/products')
  //     // .expect('Content-Type', /json/)
  //     .expect(200, done);
  // });
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