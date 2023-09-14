import request from "supertest";
import app from "../../app";
import { Ticket } from "../../models/ticket";

describe('POST /api/tickets', () => {
  it("should listening to /api/tickets for post requests", async () => {
    const response = await request(app)
      .post("/api/tickets")
      .send({});

    expect(response.status).not.toEqual(404);
  });

  it("should only be accessed if the user is signed in", async () => {
    const response = await request(app)
      .post("/api/tickets")
      .send({});

    expect(response.status).toEqual(401);
  });

  it("should not yield 401 if the user is signed in", async () => {
    const response = await request(app)
      .post("/api/tickets")
      .set("Cookie", global.signup())
      .send({});

    expect(response.status).not.toEqual(401);
  });

  it("should throw error if invalid title is provided", async () => {
    await request(app)
      .post("/api/tickets")
      .set("Cookie", global.signup())
      .send({
        title: "",
        price: 10
      })
      .expect(400);
  });

  it("should throw error if invalid price is provided", async () => {
    await request(app)
      .post("/api/tickets")
      .set("Cookie", global.signup())
      .send({
        title: "book",
        price: -10
      })
      .expect(400);
  });

  it("creates a ticket with valid inputs", async () => {
    // Add in a check to make sure a ticket was saved
    let tickets = await Ticket.find({});
    expect(tickets.length).toBe(0);

    const title = "book";
    const price = 10;

    const response = await request(app)
      .post("/api/tickets")
      .set("Cookie", global.signup())
      .send({ title, price })
      .expect(201);
      
    expect(typeof response.body.id).toBe("string");

    tickets = await Ticket.find({});
    expect(tickets.length).toBe(1);
    expect(tickets[0].price).toBe(price);
    expect(tickets[0].title).toBe(title);
  });

});