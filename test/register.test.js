var dbCleanup = require('./utils/db');
var expect = require('chai').expect;
var request = require('supertest');
var app = require('../src/app');

describe('Registration', function() {
  it("sends a valid request", function(done) {
    var user = {
      'email': `supertest${Math.random()}@example.com`,
      'name': `Super ${Math.random()}`,
    };

    request(app)
      .post('/register')
      .send(user)
      .expect(200, done);
  })
});