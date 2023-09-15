import { Message, Stan } from "node-nats-streaming";
import { Subjects } from "./subjects";
interface Event {
    subject: Subjects;
    data: any;
}
export declare abstract class Listener<T extends Event> {
    private client;
    abstract queueGroupName: string;
    abstract subject: T["subject"];
    abstract onMessage(data: T["data"], msg: Message): void;
    protected ackWait: number;
    constructor(client: Stan);
    subscriptionOptions(): import("node-nats-streaming").SubscriptionOptions;
    listen(): void;
    parseMessage(msg: Message): any;
}
export {};
