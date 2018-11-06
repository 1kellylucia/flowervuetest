let chai = require('chai');
let chaiHttp = require('chai-http');
let expect = chai.expect;
chai.use(chaiHttp);
let _ = require('lodash' );

const request = require('supertest');
const app = require('../../app');
describe('flowers', function () {
    beforeEach(function(){  
        console.log('start');
    });
    let flower = {
        flower_: 'rose', 
        amount: 500, 
        prize: 1, 
        uplikes: 1
       }
  
describe('GET /flowers', function ()  {
    it('should return all the flowers in an array', function (done) {
        request(app)
            .get('/flowers')
            .set('Accept','application/json')
            .expect('Content-Type',/json/)          
            .expect(200,done);
            
    });

});
describe('GET /flowers/:flower_', function () {
    it('should return a single flower', function (done) {
        request(app)
            .get('/flowers/rose')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200, done);
    });
});
});