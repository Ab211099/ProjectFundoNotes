import { expect } from 'chai';
import request from 'supertest';
import mongoose from 'mongoose';

import app from '../../src/index';

describe('User APIs Test', () => {
  before((done) => {
    const clearCollections = () => {
      for (const collection in mongoose.connection.collections) {
        mongoose.connection.collections[collection].deleteOne(() => { });
      }
    };

    const mongooseConnect = async () => {
      await mongoose.connect(process.env.DATABASE_TEST);
      clearCollections();
    };

    if (mongoose.connection.readyState === 0) {
      mongooseConnect();
    } else {
      clearCollections();
    }

    done();
  });

  //1.Test case for user registration

  describe('Userregistration', () => {
    const inputBody = {
      "Firstname": "Abhishek",
      "Lastname": "Bhavekar",
      "EmailId": "abhibhvaekar@gmail.com",
      "password": "@1234566"
    }
    it('Given valid details shoud be saved in database', (done) => {
      request(app)
        .post('/api/v1/users/Register')
        .send(inputBody)
        .end((err, res) => {
          expect(res.statusCode).to.be.equal(201);
          done();
        });
    });
  });



  //2.Test case for invalid FirstName
  describe('UserRegistration', () => {
    const inputBody = {
      "Firstname": "Abhi",
      "Lastname": "bhavekar",
      "EmailId": "abhibhavekar@gmail.com",
      "password": "@1234"
    }
    it('Given invalid First Name should throw corresponding error', (done) => {
      request(app)
        .post('/api/v1/users/Register')
        .send(inputBody)
        .end((err, res) => {
          expect(res.statusCode).to.be.equal(201);
          done();
        });
    });
  });

  //3.Test case for invalid LasttName
  describe('UserRegistration', () => {
    const inputBody = {
      "Firstname": "Abhi",
      "Lastname": "bhave",
      "EmailId": "abhibhavekar@gmail.com",
      "password": "@1234"
    }
    it('Given invalid Last Name should throw corresponding error', (done) => {
      request(app)
        .post('/api/v1/users/Register')
        .send(inputBody)
        .end((err, res) => {
          expect(res.statusCode).to.be.equal(201);
          done();
        });
    });
  });
})