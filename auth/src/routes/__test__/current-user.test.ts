import request from "supertest";
import app from "../../app";

describe("/api/users/currentuser", () => {
  it("should responds with details about current user", async () => {
    // signup() defined globally only in testing env
    // @/auth/src/test/setup.ts
    const cookie = await signup();

    const response = await request(app)
      .get("/api/users/currentuser")
      .set("Cookie", cookie)
      .send()
      .expect(200);

    expect(response.body.currentUser.email).toBe("test@test.com");
  });

  it("should respond with null if not authenticated", async () => {
    const response = await request(app)
      .get("/api/users/currentuser")
      .send()
      .expect(200)

    expect(response.body.currentUser).toBeNull();
  })
});