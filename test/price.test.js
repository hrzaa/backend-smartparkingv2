import supertest from "supertest";
import { web } from "../src/application/web.js";
import { logger } from "../src/application/logging.js";
import { createTestPrice, createTestUser, removeTestPrice, removeTestUser } from "./test-util.js";


describe("POST /api/price/create", function () {
  afterEach(async () => {
    await removeTestUser();
    await removeTestPrice();
  });

    it("should create a new price", async () => {
    const user = await createTestUser();

    const result = await supertest(web)
      .post("/api/price/create")
      .query({ apiKey: user.token })
      .send({
        price: 1000,
      });

      console.log("Create result:", result.body);

    expect(result.status).toBe(200);
    expect(result.body.data.price).toBe(1000);
  });
});

describe("PATCH /api/price/update", function () {
  afterEach(async () => {
    await removeTestUser();
    await removeTestPrice();
  });

   it("should update the price", async () => {
     const user = await createTestUser();
     const price = await createTestPrice();

     const result = await supertest(web)
       .patch(`/api/price/update/${price.priceId}`) // Use priceId from test price
       .query({ apiKey: user.token })
       .send({
         price: 1000, // New price value
       });

     console.log("Update result:", result.body);

     expect(result.status).toBe(200);
     expect(result.body.data.price).toBe(1000); // Ensure this matches your API response structure
   });
});



describe("GET /api/prices", function () {
    
  afterEach(async () => {
    await removeTestUser();
    await removeTestPrice();
  });   

    it("should get price", async () => {
    const user = await createTestUser();

    await supertest(web)
      .post("/api/price/create")
      .query({ apiKey: user.token })
      .send({
        price: 1000,
      });

    const result = await supertest(web)
      .get('/api/prices')
      .query({ apiKey: user.token }) 

      console.log(result)

    expect(result.status).toBe(200);
    expect(result.error).toBeDefined();
  });
});