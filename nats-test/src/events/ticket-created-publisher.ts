import { TicketCreatedEvent, Subjects, Publisher } from "@euticketing/common";

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
  readonly subject = Subjects.TicketCreated;
}