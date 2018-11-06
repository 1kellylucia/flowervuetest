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
    });