const chai = require("chai");
const chaiHttp = require('chai-http');
const assert = chai.assert;
const server = require('../server');

const validString = '5..91372.3...8.5.9.9.25..8.68.47.23...95..46.7.4.....5.2.......4..8916..85.72...3';
const validStringSolution = '568913724342687519197254386685479231219538467734162895926345178473891652851726943';
const invalidString = '5.1.9...6.9...5...1..3.6.2.5...1...3.6.2.8...9...6...4.7.2.5..4...7...8.3...9.1.6';
const invalidShortString = '123456789.........'
const invalidStringwithChar = '5a.91372.3...8.5.9.9.25..8.68.47.23...95..46.7.4.....5.2.......4..8916..85.72...3';

chai.use(chaiHttp);

suite('Functional Tests', () => {
    suite('/api/solve Solve puzzle with ', () => {
        test('valid puzzle string',(done) => {
            chai.request(server)
                .post('/api/solve')
                .send({ puzzle: validString })
                .end((err,res)=>{
                    assert.strictEqual(res.status, 200)
                    assert.property(res.body, "solution")
                    assert.deepEqual(res.body, { solution: validStringSolution })
                    done()
                });
        });

        test('missing puzzle string',(done) => {
            chai.request(server)
                .post('/api/solve')
                .send()
                .end((err,res)=>{
                    assert.strictEqual(res.status, 200)
                    assert.deepEqual(res.body, { error: "Required field missing" })
                    done()
                });
        });
        
        test('invalid character in string',(done) => {
            chai.request(server)
                .post('/api/solve')
                .send({puzzle: invalidStringwithChar})
                .end((err,res)=>{
                    assert.strictEqual(res.status, 200)
                    assert.deepEqual(res.body, { error: "Invalid characters in puzzle" })
                    done()
                });
        });
        
        test('incorrect length of string',(done) => {
            chai.request(server)
                .post('/api/solve')
                .send({puzzle: invalidShortString})
                .end((err,res)=>{
                    assert.strictEqual(res.status, 200)
                    assert.deepEqual(res.body, { error: "Expected puzzle to be 81 characters long" })
                    done()
                });
        });

        test('no solution',(done) => {
            chai.request(server)
                .post('/api/solve')
                .send({puzzle: invalidString})
                .end((err,res)=>{
                    assert.strictEqual(res.status, 200)
                    assert.deepEqual(res.body, { error: "Puzzle cannot be solved" })
                    done()
                });
        });

    });
    suite('/api/check Check a puzzle placement with',() => {
        test('all fields', (done) => { 
            chai.request(server)
                .post('/api/check')
                .send({
                    puzzle: validString,
                    coordinate: 'A2',
                    value: '4'
                })
                .end((err,res) => {
                    assert.strictEqual(res.status, 200)
                    assert.deepEqual(res.body, { valid: true })
                    done()
                });

        });

        test('single placement conflict', (done) => { 
            chai.request(server)
                .post('/api/check')
                .send({
                    puzzle: validString,
                    coordinate: 'A2',
                    value: '1'
                })
                .end((err,res) => {
                    assert.strictEqual(res.status, 200)
                    assert.deepEqual(res.body, { valid: false, conflict: ["row"] })
                    done()
                });
        });

        test('multiple placement conflict', (done) => { 
            chai.request(server)
                .post('/api/check')
                .send({
                    puzzle: validString,
                    coordinate: 'A2',
                    value: '2'
                })
                .end((err,res) => {
                    assert.strictEqual(res.status, 200)
                    assert.deepEqual(res.body, { valid: false, conflict: ["row", "column"] })
                    done()
                });
        });

        test('all placement conflict', (done) => { 
            chai.request(server)
                .post('/api/check')
                .send({
                    puzzle: validString,
                    coordinate: 'A2',
                    value: '5'
                })
                .end((err,res) => {
                    assert.strictEqual(res.status, 200)
                    assert.deepEqual(res.body, { valid: false, conflict: ["row", "column", "region"] })
                    done()
                });
        });

        test('missing required fields', (done) => { 
            chai.request(server)
                .post('/api/check')
                .send({
                    puzzle: validString,
                    coordinate: '',
                    value: ''
                })
                .end((err,res) => {
                    assert.strictEqual(res.status, 200)
                    assert.deepEqual(res.body, { error: 'Required field(s) missing'  })
                    done()
                });
        });
    
        test('strinch with invalid character', (done) => { 
            chai.request(server)
                .post('/api/check')
                .send({
                    puzzle: invalidStringwithChar,
                    coordinate: 'A2',
                    value: '4'
                })
                .end((err,res) => {
                    assert.strictEqual(res.status, 200)
                    assert.deepEqual(res.body, { error: 'Invalid characters in puzzle'  })
                    done()
                });
        });
    
        test('string with invalid length', (done) => { 
            chai.request(server)
                .post('/api/check')
                .send({
                    puzzle: invalidShortString,
                    coordinate: 'A2',
                    value: '4'
                })
                .end((err,res) => {
                    assert.strictEqual(res.status, 200)
                    assert.deepEqual(res.body, { error: 'Expected puzzle to be 81 characters long' })
                    done()
                });
        });

        test('invalid coordinates', (done) => { 
            chai.request(server)
                .post('/api/check')
                .send({
                    puzzle: validString,
                    coordinate: 'M2',
                    value: '4'
                })
                .end((err,res) => {
                    assert.strictEqual(res.status, 200)
                    assert.deepEqual(res.body, { error: 'Invalid coordinate' })
                    done()
                });
        });   
        
        test('invalid value', (done) => { 
            chai.request(server)
                .post('/api/check')
                .send({
                    puzzle: validString,
                    coordinate: 'M2',
                    value: '*'
                })
                .end((err,res) => {
                    assert.strictEqual(res.status, 200)
                    assert.deepEqual(res.body, { error: 'Invalid value' })
                    done()
                });
        })
    });
});

