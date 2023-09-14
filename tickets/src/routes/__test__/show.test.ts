import request from "supertest";
import app from "../../app";
import mongoose from "mongoose";

describe('GET /api/tickets/:ticketId', () => {
  it("should return 404 if ticket not found", async () => {
    const id = new mongoose.Types.ObjectId().toHexString();
    await request(app)
      .get(`/api/tickets/${id}`)
      .send()
      .expect(404);
  });

  it("should return a ticket if ticket is found", async () => {
    const title = "concert";
    const price = 20;

    const response = await request(app)
      .post("/api/tickets")
      .set("Cookie", global.signup())
      .send({ title, price })
      .expect(201);

    const ticketResponse = await request(app)
      .get(`/api/tickets/${response.body.id}`)
      .send()
      .expect(200);

    expect(ticketResponse.body.title).toBe(title);
    expect(ticketResponse.body.price).toBe(price);
  })
})