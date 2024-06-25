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
        password: "rahasia123",
      });

      expect(result.status).toBe(200);
      expect(result.body.data.username).toBe("test");
      expect(result.body.data.password).toBeUndefined();
    });

    it("should reject if request is invalid", async () => {
      const result = await supertest(web).post("/api/users").send({
        username: "",
        password: "",
      });

      logger.info(result.body);

      expect(result.status).toBe(400);
      expect(result.body.errors).toBeDefined();
    });

});


describe('POST /api/user/login', function(){
   beforeEach(async () => {
    await createTestUser();
  });

  afterEach(async () => {
    await removeTestUser();
  });

  it("should can login", async () => {
    const result = await supertest(web).post("/api/user/login").send({
      username: "testUser",
      password: "testPass",
    });

    logger.info(result.body);

    expect(result.status).toBe(200);
    expect(result.body.data.token).toBeDefined();
    expect(result.body.data.token).not.toBe("testToken");
  });

  it('should reject login if request is invalid', async () => {
    const result = await supertest(web)
      .post('/api/user/login')
      .send({
        username: "",
        password: ""
      });

    logger.info(result.body);

    expect(result.status).toBe(400);
    expect(result.body.errors).toBeDefined();
  });

  it('should reject login if password is wrong', async () => {
    const result = await supertest(web)
      .post('/api/user/login')
      .send({
        username: "testUser",
        password: "testPassSalah"
      });

    logger.info(result.body);

    expect(result.status).toBe(401);
    expect(result.body.errors).toBeDefined();
  });

  it('should reject login if username is wrong', async () => {
    const result = await supertest(web)
      .post('/api/user/login')
      .send({
        username: "testUserSalah",
        password: "testPassSalah"
      });

    logger.info(result.body);

    expect(result.status).toBe(401);
    expect(result.body.errors).toBeDefined();
  });

});


describe("GET /api/user/get", function () {
  afterEach(async () => {
    await removeTestUser();
  });

  it("should can get current user", async () => {
    const user = await createTestUser();
    const result = await supertest(web)
      .get(`/api/user/get/${user.userId}`)
      .query({ apiKey: user.token });

    logger.info(result.body);

    expect(result.status).toBe(200);
    expect(result.body.data.username).toBe("testUser");
  });

  it("should reject if token is invalid", async () => {
    const user = await createTestUser();
    const result = await supertest(web)
      .get(`/api/user/get/${user.userId}`)
      .query({ apiKey: "salah" });

    expect(result.status).toBe(401);
    expect(result.body.errors).toBeDefined();
  });
});

describe('PATCH /api/user/update', function(){
  afterEach(async () => {
    await removeTestUser();
  });

  it("should can update user", async () => {
    const user = await createTestUser();
    const result = await supertest(web)
      .patch(`/api/user/update/${user.userId}`)
      .query({ apiKey: user.token })
      .send({
        username: "testUser1",
        password: "testPass1",
      });

    logger.info(result.body);

    expect(result.status).toBe(200);
    expect(result.body.data.username).toBe("testUser1");

    const pass = await getTestUser();
    expect(await bcrypt.compare("testPass1", pass.password)).toBe(true);
  });

  it("should can update user username", async () => {
    const user = await createTestUser();
    const result = await supertest(web)
      .patch(`/api/user/update/${user.userId}`)
      .query({ apiKey: user.token })
      .send({
        username: "testUser2",
      });

    logger.info(result.body);

    expect(result.status).toBe(200);
    expect(result.body.data.username).toBe("testUser2");
  });

  it("should can update user password", async () => {
    const user = await createTestUser();
    const result = await supertest(web)
      .patch(`/api/user/update/${user.userId}`)
      .query({ apiKey: user.token })
      .send({
        password: "testPass2",
      });

    logger.info(result.body);

    expect(result.status).toBe(200);
    expect(result.body.data.username).toBe("testUser");

    const pass = await getTestUser();
    expect(await bcrypt.compare("testPass2", pass.password)).toBe(true);
  });

  it("should reject if request is not valid", async () => {
    const user = await createTestUser();
    const result = await supertest(web)
      .patch(`/api/user/update/${user.userId}`)
      .query({ apiKey: user.token })
      .send({
        password: "pass", // Password min(8)
      });

    logger.info(result.body);

    expect(result.status).toBe(400);
  });
});

describe('DELETE /api/user/logout', function(){
  afterEach(async () => {
    await removeTestUser();
  });

  it("should can logout", async () => {
    const user = await createTestUser();
    const result = await supertest(web)
      .delete(`/api/user/logout/${user.userId}`)
      .query({ apiKey: user.token });

    expect(result.status).toBe(200);
    expect(result.body.data.token).toBeNull();

    const data = await getTestUser();
    expect(data.token).toBeNull();
  });

  it("should reject logout if token is invalid", async () => {
    const user = await createTestUser();
    const result = await supertest(web)
      .delete(`/api/user/logout/${user.userId}`)
      .query({ apiKey: "salah" });

    expect(result.status).toBe(401);
  });
});