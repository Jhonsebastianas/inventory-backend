import { IdentificationDocumentDTO } from "@core/domain/identification-document.dto";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ContactDTO } from "@user/domain/model/dto/contact.dto";
import { Types } from "mongoose";

@Schema({ collection: "clients" })
export class Client {
    _id: Types.ObjectId;

    @Prop({ required: true, type: Types.ObjectId, ref: 'business', name: "_id" })
    businessId: Types.ObjectId;

    @Prop({ required: true })
    names: string;

    @Prop({ required: true })
    lastnames: string;

    @Prop({ required: true })
    identification: IdentificationDocumentDTO;

    @Prop({ required: false })
    contact: ContactDTO;

    @Prop({ required: true, default: true, })
    active: boolean;
}

export const ClientSchema = SchemaFactory.createForClass(Client);
export type ClientDocument = Client & Document;