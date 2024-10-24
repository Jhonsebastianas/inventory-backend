import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Types } from "mongoose";

@Schema({ collection: "business" })
export class Business {
    _id: Types.ObjectId;

    @Prop({ required: true })
    name: string;

    @Prop({ required: true, type: Types.ObjectId, ref: 'users', name: "_id" })
    ownerId: Types.ObjectId;

    @Prop({ required: false, type: [ Types.ObjectId ] })
    employeeId: Types.ObjectId[];

    @Prop({ required: true, default: false, })
    active: boolean;
}

export const BusinessSchema = SchemaFactory.createForClass(Business);
export type BusinessDocument = Business & Document;