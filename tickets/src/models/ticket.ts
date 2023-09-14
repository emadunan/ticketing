import mongoose, { Schema, model } from 'mongoose';

interface ITicket {
  title: string;
  price: number;
  userId: string;
}

const ticketSchema = new Schema<ITicket>({
  title: { type: String, required: true },
  price: { type: Number, required: true },
  userId: { type: String, required: true },
}, {
  // Mutate the view of returning document representation
  toJSON: {
    transform(doc, ret) {
      ret.id = ret._id;
      delete ret._id;
      delete ret.__v;
    },
  }
});

// An interface that define User document
interface ITicketDoc extends mongoose.Document {
  title: string;
  price: number;
  userId: string;
}

// Workaround to add build() static function into Ticket Model
interface ITicketModel extends mongoose.Model<ITicketDoc> {
  build(ticket: ITicket): ITicketDoc;
}

ticketSchema.statics.build = (ticket: ITicket) => {
  return new Ticket(ticket);
}

const Ticket = model<ITicketDoc, ITicketModel>('Ticket', ticketSchema);

export { Ticket };
