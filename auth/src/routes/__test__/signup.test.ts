import request from "supertest";
import app from "../../app";

describe("/api/users/signup", () => {
  it("should return 201 on successful", async () => {
    return request(app)
      .post("/api/users/signup")
      .send({
        email: "test@test.com",
        password: "test"
      })
      .expect(201);
  });

  it("should return 400 if invalid email", async () => {
    return request(app)
      .post("/api/users/signup")
      .send({
        email: "testtest.com",
        password: "test"
      })
      .expect(400);
  });

  it("should return 400 if invalid password", async () => {
    return request(app)
      .post("/api/users/signup")
      .send({
        email: "test@test.com",
        password: "t"
      })
      .expect(400);
  });

  it("should disallow duplicate emails", async () => {
    await request(app)
      .post("/api/users/signup")
      .send({
        email: "test@test.com",
        password: "password"
      })
      .expect(201);
    
    return request(app)
      .post("/api/users/signup")
      .send({
        email: "test@test.com",
        password: "password"
      })
      .expect(400);
  });

  it("should set a cookie after successful signup", async () => {
    const response = await request(app)
      .post("/api/users/signup")
      .send({
        email: "test@test.com",
        password: "test"
      })
      .expect(201);

      expect(response.get("Set-Cookie")).toBeDefined();
  });
});
