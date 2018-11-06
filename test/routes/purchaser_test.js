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
 describe('POST /purchaser', function () {
    let purchaser = { 
        PurchaserName: 'mike',
        P_flowers:'rose',
        funds:1000
   };
    it('should return confirmation message and update ', function (done) {       
         request(app)
         .post('/purchaser')
         .set('Accept', 'application/json')
         .send(purchaser)
         .end(function(err, res) {
             if(!err){
             expect(res).to.have.status(200);
             expect(res.body).to.have.property('message').equal('success',purchaser ); 
             done();
             }
             else{
                expect(res.body).to.have.property('message').equal('this order NOT Added!',err );
             }
  });
});
});
describe('GET /purchaser/:PurchaserName', function () {
    it('should return a single order', function (done) {
        request(app)
            .get('/purchaser/mike')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .end(function(err, res) {
                expect(res).to.have.status(200);
                let result = _.map(res.body, (purchaser) => {
                    return { funds: purchaser.funds,
                        flower: purchaser.P_flowers } 
                    });
                expect(result).to.include( { funds: 1000,flower:'rose'  } );
                done();
            });
     });
});
describe('DELETE /purchaser/:PurchaserName',function(){
    it('should delete purchaser successfully ',function(done){
        request(app)
        .delete('/purchaser/mike')
        .set('Accept','application/json')
        .end(function(err,res){
            expect(res).to.have.status(200);
            expect(res.body).to.have.property('message').equal('Purchaser Successfully Deleted!');
            done();
            });
    });
});
});