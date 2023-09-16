import { Publisher, Subjects, TicketCreatedEvent } from "@euticketing/common";

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
  readonly subject = Subjects.TicketCreated;
}
