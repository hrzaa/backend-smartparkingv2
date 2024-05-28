import supertest from "supertest";
import { web } from "../src/application/web.js";
import { logger } from "../src/application/logging.js";
import { removeAllTestParkings, createTestParkings, getTestParkings, createTestUser, removeTestUser } from "./test-util.js";

describe("POST /api/parkings/in", function () {

    afterEach(async () => {
        await removeAllTestParkings();
    });

    it("should can create new parking in", async () => {
        const result = await supertest(web).post("/api/parkings/in").send({
            code: "test",
        });

        expect(result.status).toBe(200);
        expect(result.body.data.code).toBe("test");
        expect(result.body.data.status).toBe("start");
    });

});

describe("POST /api/parkings/out", function () {
    beforeEach(async () => {
        await createTestParkings();
    });

    afterEach(async () => {
      await removeAllTestParkings();
    });

    // Test case untuk berhasil melakukan parkir keluar
    it("should successfully park out", async () => {
      const response = await supertest(web)
        .post("/api/parkings/out")
        .send({ code: "test" });

      expect(response.status).toBe(200);
      expect(response.body.data).toBeDefined();
      expect(response.body.data.updatedParking.code).toBe("test");
      expect(response.body.data.updatedParking.status).toBe("end");
    });

  it("should return error if code is missing", async () => {
    const result = await supertest(web)
      .post("/api/parkings/out")
      .send({
          code: ""
      });

    logger.info(result.body);

    expect(result.status).toBe(400);
    expect(result.body.errors).toBeDefined();
  });


});


describe("GET /api/parkings", function (){

  afterEach(async () => {
    await removeAllTestParkings();
    await removeTestUser();
  });

  it("should can get parkings", async() => {
    const user = await createTestUser();
    await createTestParkings();

    const result = await supertest(web)
      .get("/api/parkings")
      .query({ apiKey: user.token });

    expect(result.status).toBe(200);
    expect(result.body.data).toBeDefined();

  })
});




