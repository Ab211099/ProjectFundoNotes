import { expect } from 'chai';
import request from 'supertest';
import mongoose from 'mongoose';

import app from '../../src/index';
var token;
var id;
describe('Uservar token; APIs Test', () => {
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


  //4.Test case for Invalid password

  describe('UserRegistration--Invalid Password', () => {
    const inputBody = {
      "Firstname": "Abhishek",
      "Lastname": "Bhavekar",
      "EmailId": "bhavekarabhi@gmail.com",
      "password": "@bh"
    }
    it('Given invalid Password should throw corresponding error', (done) => {
      request(app)
        .post('/api/v1/users/Register')
        .send(inputBody)
        .end((_err, res) => {
          expect(res.statusCode).to.be.equal(500);
          done();
        });
    });
  });

  //5.Test case for valid user login
  
  describe('UserLogin', () => {
    const inputBody = {
      "EmailId": "abhibhvaekar@gmail.com",
      "password": "@1234566"
    }
    it('user login details should be saved in database', (done) => {
      request(app)
        .post('/api/v1/users/logins')
        .send(inputBody)
        .end((err, res) => {
          token = res.body.data;
          console.log("Login token===================>>>>>>",res.body.data);
          expect(res.statusCode).to.be.equal(200);
          done();
        });
    });
  });
  //6.Test case for invalid Email

  describe('UserLogin--invalid EmailId', () => {
    const inputBody = {
      "EmailId": "bhavekarabh",
      "password": "@bhi007b"
    }
    it('Given invalid Emailid should throw corresponding error', (done) => {
      request(app)
        .post('/api/v1/users/logins')
        .send(inputBody)
        .end((err, res) => {
          expect(res.statusCode).to.be.equal(500);
          done();
        });
    });
  });
  //7.Test case for invalid password

  describe('UserLogin--invalid password', () => {
    const inputBody = {
      "EmailId": "bhavekarabhi@gmail.com",
      "password": "@bh"
    }
    it('Given invalid user password details should throw corresponding error', (done) => {
      request(app)
        .post('/api/v1/users/logins')
        .send(inputBody)
        .end((err, res) => {
          expect(res.statusCode).to.be.equal(500);
          done();
        });
    });
  });

  //8.Test case for both invalid Password and Invalid EmailID

  describe('UserLogin-Invalid password&email', () => {
    const inputBody = {
      "EmailId": "bhavek@a",
      "password": "@bh"
    }
    it('Given invalid user Password and EmailId details should throw corresponding error', (done) => {
      request(app)
        .post('/api/v1/users/logins')
        .send(inputBody)
        .end((err, res) => {
          expect(res.statusCode).to.be.equal(500);
          done();
        });
    });
  });

  //9. Test case to create a new note

 
  describe('Create Note', () => {
    const inputBody = {
      "title": "note",
      "description": "hello",
    }
    console.log("Token error===================>>>>>>",token);
    it('note created sucessfully', (done) => {
      request(app)
      .post('/api/v1/notes')
        .set('authorization', `Bearer ${token}`)
        .send(inputBody)
        .end((err, res) => {
          // id = res.body.data._id;
          expect(res.statusCode).to.be.equal(200);
          done();
        });
    });
  });



  // //10. Test case for without giving title value in notes

  // describe('creating new note', () => {
  //   const inputBody = {
  //     "title": "",
  //     "description": "hello"
  //   }
  //   it('title should be required', (done) => {
  //     request(app)
  //       .post('/api/v1/notes')
  //       .set('authorization', `Bearer ${token}`)
  //       .send(inputBody)
  //       .end((err, res) => {
  //         expect(res.statusCode).to.be.equal(500);
  //         done();
  //       });
  //   });

  // });


  // //11:Test case for invalid Description
  // describe('creating new note', () => {
  //   const inputBody = {
  //     "title": "notes"
  //   }
  //   it('description should be required', (done) => {
  //     request(app)
  //       .post('/api/v1/notes')
  //       .set('authorization', `Bearer ${token}`)
  //       .send(inputBody)
  //       .end((err, res) => {
  //         expect(res.statusCode).to.be.equal(500);
  //         done();
  //       });
  //   });
  // });

  // //12. Test case for getting all Notes
  // describe('get all the notes of the user', () => {
  //   it('notes fetched successfully', (done) => {
  //     request(app)
  //       .get('/api/v1/notes')
  //       .set('authorization', `Bearer ${token}`)
  //       .end((err, res) => {
  //         console.log(res.body);
  //         expect(res.statusCode).to.be.equal(200);
  //         done();
  //       });
  //   });
  // });


  // //13.Update a note by id 
  // describe('updating the note', () => {
  //   const inputBody = {
  //     "color": "green"
  //   }
  //   it('note updated successfully', (done) => {
  //     request(app)
  //       .put(`/api/v1/notes/${id}`)
  //       .set('authorization', `Bearer ${token}`)
  //       .send(inputBody)
  //       .end((err, res) => {
  //         console.log("id update=============================>", id);
  //         expect(res.statusCode).to.be.equal(202);
  //         done();
  //       });
  //   });
  // });

  // //14.Delete a note by id test case
  // describe('Deleted a note by id', () => {
  //   it('Given note details should be deleted from database using id', (done) => {
  //     request(app)
  //       .delete(`/api/v1/notes/${id}`)
  //       .set('authorization', `Bearer ${token}`)
  //       .end((err, res) => {
  //         console.log(res.body);
  //         expect(res.statusCode).to.be.equal(200);
  //         done();
  //       });
  //   });

  // });

})

