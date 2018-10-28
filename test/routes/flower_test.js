let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../../bin/www');
let expect = chai.expect;

chai.use(chaiHttp);
let _ = require('lodash' );

describe('flowers', function () {

    describe('GET /flowers', () => {
        it('should return all the flowers in an array', function (done) {
            chai.request(server)
                .get('/flowers')
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    expect(res.body).to.be.a('array');
                    done();
                });
        });
    });
    describe('POST /flowers', function () {
        it('should return confirmation message and update flowerstore', function (done) {
            let flower = {
                flower_: 'sakura',
                amount: 1200,
                prize: 10,
                uplikes: 0
            };
            chai.request(server)
                .post('/flowers')
                .send(flower)
                .end(function (err, res) {
                    expect(res).to.have.status(200);
                    expect(res.body).to.have.property('message').equal('success', flower);
                    done();
                });
        });
    });
    describe('PUT /flowers/likes', () => {
        it('should return a message and the flowers uplikes by 1', function (done) {
            chai.request(server)
                .put('/flowers/5bd32338c12ae71cf1f619bf/amount')
                .end(function (err, res) {
                    expect(res).to.have.status(200);
                    let flower = res.body.data;
                    expect(flower).to.include({flower_: "sakura"});
                    done();
                });
        });
    });
    describe ('invalid function',function(){
        it('should return a message if the flower is empty ',function(done){
            chai.request(server)
                .delete('/flowers/sakura')
                .end(function(err, res) {
                    expect(res).to.have.status(200);
                    expect(res.body).to.have.property('message').equal('flowers NOT DELETED!' );

                    done();
                });
        });
    })

});
