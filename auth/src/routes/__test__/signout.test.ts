import request from "supertest";
import app from "../../app";

describe("/api/users/signout", () => {
  it("should clear cookie after signout", async () => {
    await request(app)
      .post("/api/users/signup")
      .send({
        email: "test@test.com",
        password: "test"
      })
      .expect(201);

    const response = await request(app)
      .post("/api/users/signout")
      .send({})
      .expect(200);

    const setCookieExpectedValue = "session=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; httponly";
    expect(response.get("Set-Cookie")[0]).toBe(setCookieExpectedValue);
  });
});