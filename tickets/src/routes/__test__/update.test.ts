import request from "supertest";
import app from "../../app";
import mongoose from "mongoose";

import { natsWrapper } from "../../nats-wrapper";

describe('PUT /api/tickets', () => {
  it("should yield 404 if the provided id does not exist", async () => {
    const id = new mongoose.Types.ObjectId().toHexString();
    await request(app)
      .put(`/api/tickets/${id}`)
      .set("Cookie", global.signup())
      .send({
        title: "title1",
        price: 20
      })
      .expect(404);
  });

  it("should yield 401 if the user is not authenticated", async () => {
    const id = new mongoose.Types.ObjectId().toHexString();
    await request(app)
      .put(`/api/tickets/${id}`)
      .send({
        title: "title1",
        price: 20
      })
      .expect(401);
  });

  it("should yield 401 if the user does not own the ticket", async () => {
    const response = await request(app)
      .post(`/api/tickets/`)
      .set("Cookie", global.signup())
      .send({
        title: "title1",
        price: 20
      })
      .expect(201);

    await request(app)
      .put(`/api/tickets/${response.body.id}`)
      .set("Cookie", global.signup())
      .send({
        title: "title_updated",
        price: 30
      })
      .expect(401);
  });

  it("should yield 400 if the user provides an invalid title or price", async () => {
    const cookie = global.signup();

    const response = await request(app)
      .post(`/api/tickets/`)
      .set("Cookie", cookie)
      .send({
        title: "title1",
        price: 20
      });

    await request(app)
      .put(`/api/tickets/${response.body.id}`)
      .set("Cookie", cookie)
      .send({
        title: "",
        price: 20
      })
      .expect(400);

    await request(app)
      .put(`/api/tickets/${response.body.id}`)
      .set("Cookie", cookie)
      .send({
        title: "title_updated",
        price: -10
      })
      .expect(400);
  });

  it("should update ticket provided valid inputs", async () => {
    const cookie = global.signup();

    const response = await request(app)
      .post(`/api/tickets/`)
      .set("Cookie", cookie)
      .send({
        title: "title1",
        price: 20
      });

    await request(app)
      .put(`/api/tickets/${response.body.id}`)
      .set("Cookie", cookie)
      .send({
        title: "title_updated",
        price: 10
      })
      .expect(200);

  });

  it("should publishes an event", async () => {
    const cookie = global.signup();

    const title = "book";
    const price = 10;

    const response = await request(app)
      .post(`/api/tickets/`)
      .set("Cookie", cookie)
      .send({ title, price });

    await request(app)
      .put(`/api/tickets/${response.body.id}`)
      .set("Cookie", cookie)
      .send({ title, price })
      .expect(200);

    expect(natsWrapper.client.publish).toHaveBeenCalled();
  });
})
