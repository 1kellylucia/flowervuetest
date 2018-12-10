let chai = require('chai');
let chaiHttp = require('chai-http');
let expect = chai.expect;
chai.use(chaiHttp);
let _ = require('lodash' );
const request = require('supertest');
const app = require('../../app');
describe('flowers', function () {
    before(function () {
        console.log('start');
    });
    let flower = {
        flower_: 'rose',
        amount: 500,
        prize: 1,
        uplikes: 1
    };

    describe('GET /flowers', function () {
        it('should return all the flowers in an array', function (done) {
            request(app)
                .get('/flowers')
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(200, done);

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
    describe('GET /flowers/0/more', function () {
        it('should return an aggregation after looking up other tables', function (done) {
            request(app)
                .get('/flowers/0/more')
                .set('Accept', 'application/json')
                .send(flower)
                .end(function (err, res) {
                    expect(res).to.have.status(200);
                    expect(res.body).to.have.property('message').equal('success', flower);
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
                .end(function (err, res) {
                    expect(res).to.have.status(200);
                    expect(res.body).to.have.property('message').equal('success', flower);
                    done();
                });
        });
    });
    describe('PUT /flowers/:_id/amount', function () {
        it('should return not found', function (done) {
            request(app)
                .put('/flowers/11/amount')
                .set('Accept', 'application/json')
                .end(function (err, res) {
                    expect(res).to.have.status(200);
                    expect(res.body).to.have.property('message').equal('flower NOT Found!', err);
                    done();
                });

        });
        it('should return flower Successfully UpLiked or not ', function (done) {
            request(app)
                .put('/flowers/5bd35607191d8f226383b929/amount')
                .set('Accept', 'application/json')
                .end(function (err, res) {
                    if (err) {
                        expect(res).to.have.status(200);
                        expect(res.body).to.have.property('message').equal('flower NOT UpLiked!', err);
                        done();
                    }
                    else {
                        expect(res).to.have.status(200);
                        let flower = res.body.data;
                        expect(flower).to.include({flower_: "sakura"});
                        done();
                    }
                });
        });
    });
        /*after(function(){
             request(app)
             .get('/flowers/5bd35607191d8f226383b929')
             .set('Accept','application/json')
             .end(function(err, res) {
                 let result = _.map(res.body, function(flower) {
                     likes = flower.uplikes;
                     return likes;

                 });
                 expect(result).to.include( 1 );
                 done();
             });
         });*/
    });
    describe('DELETE /flowers/:_id', function () {
        it('should delete flower successfully ', function (done) {
            request(app)
                .delete('/flowers/5be0b7dd735acf4126f477a1')
                .set('Accept', 'application/json')
                .end(function (err, res) {
                    expect(res).to.have.status(200);
                    expect(res.body).to.have.property('message').equal('flowers Successfully Deleted!');
                    done();
                });
        });
        it('should return an error if the id cannot be found', function (done) {
            request(app)
                .delete('/flowers/AAA')
                .set('Accept', 'application/json')
                .end(function (err, res) {
                    expect(res).to.have.status(200);
                    expect(res.body).to.have.property('message').equal('flowers NOT DELETED!');
                    done();
                });
        });
        after(function () {
            request(app)
                .get('/flowers/5be0b7dd735acf4126f477a1')
                .set('Accept', 'application/json')
                .end(function (err, res) {
                    let result = _.map(res.body, function (flower) {
                        return flowers;
                    });
                    expect(result).to.equal(null);
                    done();
                });

        });


    });
