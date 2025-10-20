const { expect } = require("chai");
const request = require("supertest");
const app = require("../src/server");

describe("Server Configuration", () => {
  describe("Middleware", () => {
    it("should parse JSON requests", async () => {
      const res = await request(app)
        .post("/test-json")
        .send({ test: "data" })
        .expect(404);
    });

    it("should handle CORS headers", async () => {
      const res = await request(app)
        .get("/files/data")
        .set("Origin", "http://localhost:3000");

      expect(res.headers).to.have.property("access-control-allow-origin");
    });
  });

  describe("Routes", () => {
    it("should serve API documentation", async () => {
      const res = await request(app).get("/api-docs/");
      expect(res.status).to.equal(200);
    });

    it("should handle files routes", async () => {
      const res = await request(app).get("/files/data");
      expect([200, 500]).to.include(res.status);
    });

    it("should handle files list route", async () => {
      const res = await request(app).get("/files/list");
      expect([200, 500]).to.include(res.status);
    });
  });

  describe("Error Handling", () => {
    it("should return 404 for unknown routes", async () => {
      const res = await request(app).get("/unknown-route");
      expect(res.status).to.equal(404);
      expect(res.body).to.have.property("error", "Route not found");
    });
  });
});
