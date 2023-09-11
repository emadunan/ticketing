import request from "supertest";
import app from "../../app";

describe("/api/users/signin", () => {
  it("should return 400 if invalid email", async () => {
    return request(app)
      .post("/api/users/signin")
      .send({
        email: "test@test.com",
        password: "test"
      })
      .expect(400);
  });

  it("should return 400 if invalid password", async () => {
    await request(app)
    .post("/api/users/signup")
    .send({
      email: "test@test.com",
      password: "test"
    })
    .expect(201);

    return request(app)
      .post("/api/users/signin")
      .send({
        email: "test@test.com",
        password: "wrong"
      })
      .expect(400);
  });

  it("should respond with cookie if given valid creds", async () => {
    await request(app)
    .post("/api/users/signup")
    .send({
      email: "test@test.com",
      password: "test"
    })
    .expect(201);

    const response = await request(app)
      .post("/api/users/signin")
      .send({
        email: "test@test.com",
        password: "test"
      })
      .expect(200);

    expect(response.get("Set-Cookie")).toBeDefined();
  });
});