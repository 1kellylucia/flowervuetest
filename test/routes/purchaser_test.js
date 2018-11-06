let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../../bin/www');
let expect = chai.expect;
chai.use(chaiHttp);
let _ = require('lodash' );
const request = require('supertest');
const app = require('../../app');
describe('purchaser', function () {
     
        
    describe('GET /purchaser', function ()  {
     it('should return all the orders in an array', function (done) {
         request(app)
             .get('/purchaser')
             .set('Accept','application/json')
             .expect('Content-Type',/json/)          
             .expect(200,done);
     });    
 });
});