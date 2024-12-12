import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Types } from "mongoose";

@Schema({ timestamps: true })
export class SaleProduct {

    @Prop({ required: true, type: Types.ObjectId, ref: 'Product', name: "id_producto" })
    idProducto: Types.ObjectId;

    @Prop({ required: true })
    name: string;

    @Prop({ required: true, type: Number })
    price: number;

    @Prop({ required: true, type: Number })
    quantity: number;
}

export const SaleProductSchema = SchemaFactory.createForClass(SaleProduct);
export type SaleProductDocument = SaleProduct & Document;