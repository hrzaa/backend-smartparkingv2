import supertest from "supertest";
import {web} from "../src/application/web.js";
import { logger } from "../src/application/logging.js";
import { createTestUser, removeTestUser, getTestUser } from "./test-util.js";
import bcrypt from "bcrypt";

describe('POST /api/users', function() {

    afterEach(async() =>{
        await removeTestUser();
    })


    it("should can register new user", async () => {
      const result = await supertest(web).post("/api/users").send({
        username: "test",
        password: "rahasia",
        name: "test",
      });

      expect(result.status).toBe(200);
      expect(result.body.data.username).toBe("test");
      expect(result.body.data.name).toBe("test");
      expect(result.body.data.password).toBeUndefined();
    });

    it("should reject if request is invalid", async () => {
      const result = await supertest(web).post("/api/users").send({
        username: "",
        password: "",
        name: "",
      });

      logger.info(result.body);

      expect(result.status).toBe(400);
      expect(result.body.errors).toBeDefined();
    });

     it("should reject if username already registered", async () => {
       let result = await supertest(web).post("/api/users").send({
         username: "test",
         password: "rahasia",
         name: "test",
       });

        logger.info(result.body);

       expect(result.status).toBe(200);
       expect(result.body.data.username).toBe("test");
       expect(result.body.data.name).toBe("test");
       expect(result.body.data.password).toBeUndefined();

       result = await supertest(web).post("/api/users").send({
         username: "test",
         password: "rahasia",
         name: "test",
       });

        logger.info(result.body);

       expect(result.status).toBe(400);
       expect(result.body.errors).toBeDefined();
     });

});


describe('POST /api/users/login', function(){
  beforeEach(async () => {
    await createTestUser();
  });

  afterEach(async () => {
    await removeTestUser();
  });


  it("should can login", async () => {
    const result = await supertest(web).post("/api/users/login").send({
      username: "test",
      password: "rahasia",
    });

    logger.info(result.body);

    expect(result.status).toBe(200);
    expect(result.body.data.token).toBeDefined();
    expect(result.body.data.token).not.toBe("test");
  });

});


describe('GET /api/users/current', function(){
    beforeEach(async () => {
      await createTestUser();
    });

    afterEach(async () => {
      await removeTestUser();
    });

    it("should get current user", async() => {
      const result = await supertest(web)
        .get("/api/users/current")
        .set("Authorization", "test");

      expect(result.status).toBe(200);
      expect(result.body.data.username).toBe("test");
      expect(result.body.data.name).toBe("test");
    });

    it("should reject if token is invalid", async () => {
      const result = await supertest(web)
        .get("/api/users/current")
        .set("Authorization", "salah");

      expect(result.status).toBe(401);
      expect(result.body.errors).toBeDefined();
    });
});

describe('PATCH /api/users/current', function(){
   beforeEach(async () => {
     await createTestUser();
   });

   afterEach(async () => {
     await removeTestUser();
   });

   it('should can update user', async()=>{
    const result = await supertest(web)
      .patch("/api/users/current")
      .set("Authorization", "test")
      .send({
        name: "hareza",
        password: "rahasialagi"
      });
    
      expect(result.status).toBe(200);
      expect(result.body.data.username).toBe("test");
      expect(result.body.data.name).toBe("hareza");

      const user = await getTestUser();
      expect(await bcrypt.compare("rahasialagi", user.password)).toBe(true);
   });

   it("should can update user name", async () => {
     const result = await supertest(web)
       .patch("/api/users/current")
       .set("Authorization", "test")
       .send({
         name: "hareza",
       });

     expect(result.status).toBe(200);
     expect(result.body.data.username).toBe("test");
     expect(result.body.data.name).toBe("hareza");

   });

   it("should can update user password", async () => {
     const result = await supertest(web)
       .patch("/api/users/current")
       .set("Authorization", "test")
       .send({
         password: "rahasialagi",
       });

     expect(result.status).toBe(200);
     expect(result.body.data.username).toBe("test");
     expect(result.body.data.name).toBe("test");

     const user = await getTestUser();
     expect(await bcrypt.compare("rahasialagi", user.password)).toBe(true);
   });

   it("should reject if request is not valid", async () => {
     const result = await supertest(web)
       .patch("/api/users/current")
       .set("Authorization", "salah")
       .send({
         password: "",
       });

     expect(result.status).toBe(401);
    
   });
});

describe('DELETE /api/users/logout', function(){
  beforeEach(async () => {
    await createTestUser();
  });

  afterEach(async () => {
    await removeTestUser();
  });

  it("should can logout", async () => {
    const result = await supertest(web)
      .delete("/api/users/logout")
      .set("Authorization", "test");

    expect(result.status).toBe(200);
    expect(result.body.data).toBe("OK");

    const user = await getTestUser();
    expect(user.token).toBeNull();
  });

  it("should reject logout if token is invalid", async () => {
    const result = await supertest(web)
      .delete("/api/users/logout")
      .set("Authorization", "salah");

    expect(result.status).toBe(401);
  });

});