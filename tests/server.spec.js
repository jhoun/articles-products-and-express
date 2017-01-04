const request = require('supertest');
const chai = require('chai');
const app = require('../server');
const bodyParser = require('body-parser')
const expect = chai.expect;

describe('GET /user', function() {
  it('respond with json', function(done) {
    request(app)
      .get('/user')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, done);
  });
});