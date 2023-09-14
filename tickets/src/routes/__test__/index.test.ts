import request from "supertest";
import app from "../../app";

async function createTicket(num: number) {
  return request(app)
  .post("/api/tickets")
  .send({
    title: `ticket_${num}`,
    price: 10
  });
}

describe('GET /api/tickets', () => {
  it("should fetch a list of tickets", async () => {
    createTicket(1);
    createTicket(2);
    createTicket(3);

    const response = await request(app)
      .get("/api/tickets")
      .send()
      .expect(200)
  });


})