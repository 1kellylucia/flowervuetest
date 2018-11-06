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
describe('GET /flowers/0/more',function(){
    it('should return an aggregation after looking up other tables', function(done){
        request(app)
        .get('/flowers/0/more')
        .set('Accept', 'application/json')
        .send(flower)
        .end(function(err, res) {
            expect(res).to.have.status(200);
            expect(res.body).to.have.property('message').equal('success',flower); 
            done();
        });
    });
});
describe('POST /flowers', function () {

    it('should return confirmation message and update flowerstore', function (done) {       
         request(app)
         .post('/flowers')
         .set('Accept', 'application/json')
         .send(flower)
         .end(function(err, res) {
             expect(res).to.have.status(200);
             expect(res.body).to.have.property('message').equal('success',flower ); 
             done();
  });
 });
});


});