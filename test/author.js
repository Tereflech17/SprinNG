const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require("../app");
const Author = require("../models/user/author");
// const User   = require("../models/user/user");

//Assertion style
chai.should(); 

chai.use(chaiHttp);

//search query param
const qurey = {
    id: '6406c078ca6e7c0c76d9647e',
    firstName: 'Terence',
    lastName: 'Biney',
    location: 'GH',

};

describe('Author API', () => {
    // beforeEach((done) => {

    // })
    /**
     *  Test the GET route
     */
    describe('GET /author/search', () => {
        it('It should get all authors by query param search', (done) => {
                chai.request(server)
                .get('/author/search?search_key=Biney')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    console.log(res.body.message);
                done();    
            });
        });
    });
    /**
     *  Test the GET (by id) route
     */
    
     describe('GET /author/:id', () => {
        const id = '6406c078ca6e7c0c76d9647e'; 
        it('It should get an author by id value', () => {
            chai.request(server)
            .get(`/author/${id}`)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                console.log(res.body.message);
            done();
            });
        });
     });

    /**
     *  Test the POST route
     */
    describe('POST /welcome', () => {
        let authorInfo = {
            biography: 'The is a biography of an author blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah',
            location: 'United States',
            website : 'http://example.com',
            linkedin: '',
            twitter: '',
            instagram: '',
        }
        it('It should not POST author info without user account field', () => {
            chai.request(server)
            .post('/welcome')
            .send(authorInfo)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('errors');
                // res.body.errors.should.have.property('Author.userID');
            done();
            });
        });
    });

    /**
     *  Test the PUT route
     */
});