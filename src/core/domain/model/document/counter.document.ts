import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Types } from "mongoose";


@Schema({ collection: "counters", timestamps: true })
export class Counter {
    _id: Types.ObjectId;

    @Prop({ required: true, unique: true })
    name: string;

    @Prop({ required: true, default: 0 })
    sequenceValue: number;
}

export const CounterSchema = SchemaFactory.createForClass(Counter);
export type CounterDocument = Counter & Document;