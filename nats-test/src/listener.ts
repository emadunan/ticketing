import nats, { Message, Stan } from "node-nats-streaming";
import { TicketCreatedListener } from "./events/ticket-created-listener";

console.clear();

const stan = nats.connect("ticketing", "123", {
  url: "http://localhost:4222"
});

stan.on("connect", () => {
  console.log("Listener connected to NATS");

  stan.on("close", () => {
    console.log("NATS connection closed");
    process.exit();
  });

  const ticketListener = new TicketCreatedListener(stan);
  ticketListener.listen();

  // PROCEDURAL IMPLEMENTATION
  // // setDeliverAllAvailable()
  // // setDurableName(x: string)
  // // QueueGroup are working well together;
  // const options = stan
  //   .subscriptionOptions()
  //   .setManualAckMode(true)
  //   .setDeliverAllAvailable()
  //   .setDurableName("test-service");

  // const subscription = stan.subscribe("ticket:create", "testQueueGroup", options);

  // subscription.on("message", (msg: Message) => {
  //   const sequence = msg.getSequence();
  //   const data = msg.getData();

  //   if (typeof data === "string") {
  //     console.log(`Received event #${sequence}, with data: ${data}`);
  //   }

  //   msg.ack();
  // });
});

process.on("SIGINT", () => stan.close());
process.on("SIGTERM", () => stan.close());
