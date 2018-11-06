let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../../bin/www');
let expect = chai.expect;
chai.use(chaiHttp);
let _ = require('lodash' );
const request = require('supertest');
const app = require('../../app');
describe('orders', function () {
     
        
           describe('GET /order', function ()  {
            it('should return all the orders in an array', function (done) {
                request(app)
                    .get('/order')
                    .set('Accept','application/json')
                    .expect('Content-Type',/json/)          
                    .expect(200,done);
            });    
        });
        describe('GET /order/:id', function () {
            it('should return a single order', function (done) {
                request(app)
                    .get('/order/100003')
                    .set('Accept', 'application/json')
                    .expect('Content-Type', /json/)
                    .end(function(err, res) {
                        expect(res).to.have.status(200);
                        let result = _.map(res.body, (order) => {
                            return { id: order.id,
                                flower: order.o_flowers } 
                            });
                        expect(result).to.include( { id: 100003,flower:'magnolia'  } );
                        done();
             });
                    
            });
        });
        describe('POST /order', function () {
            let order = { 
                id: 100003 , 
                amount: 200, 
                o_flowers: 'magnolia'
           };
            it('should return confirmation message and update ', function (done) {       
                 request(app)
                 .post('/order')
                 .set('Accept', 'application/json')
                 .send(order)
                 .end(function(err, res) {
                     if(!err){
                     expect(res).to.have.status(200);
                     expect(res.body).to.have.property('message').equal('success',order ); 
                     done();
                     }
                     else{
                        expect(res.body).to.have.property('message').equal('this order NOT Added!',err );
                     }
          });
          after(function  (done) {
            chai.request(server)
                .get('/order')
                .end(function(err, res) {
                    let result = _.map(res.body, (order) => {
                        return { o_flowers: order.o_flowers, 
                           id: order.id };
                    }  );
                    expect(result).to.include( { o_flowers:'magnolia' ,id:100003} );
                    done();
                });
        }); 
        });
     });
     describe('DELETE /order/:id',function(){
        it('should delete order successfully ',function(done){
            request(app)
            .delete('/order/100003')
            .set('Accept','application/json')
            .end(function(err,res){
                expect(res).to.have.status(200);
                expect(res.body).to.have.property('message').equal('order Deleted!');
                done();
                });
        });
        it('should return an error if the id cannot be found',function(done){
            request(app)
            .delete('/order/111WW')
            .set('Accept','application/json')
            .end(function(err,res){
                expect(res).to.have.status(200);
                expect(res.body).to.have.property('message').equal('order NOT Deleted!');
                done();
            });
        });
    });
    });