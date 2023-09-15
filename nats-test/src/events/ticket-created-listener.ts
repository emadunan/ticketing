import { Message } from "node-nats-streaming";
import { Listener } from "../../../common/src/events/base-listener";
import { TicketCreatedEvent, Subjects } from "@euticketing/common";

export class TicketCreatedListener extends Listener<TicketCreatedEvent> {
  // Note: Old implemetation without readonly keyword
  // subject: Subjects.TicketCreated = Subjects.TicketCreated;
  readonly subject = Subjects.TicketCreated;

  queueGroupName = "payments-service";

  onMessage(data: TicketCreatedEvent["data"], msg: Message): void {
    console.log("Event data:", data);

    msg.ack();
  }
}