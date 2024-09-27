import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Types } from "mongoose";

@Schema({ collection: "products", timestamps: true })
export class Product {
    _id: Types.ObjectId;

    @Prop({ required: true })
    name: string;

    @Prop({ required: false })
    description: string;

    @Prop({ required: true, type: Number })
    price: number;

    @Prop({ required: true, default: false, })
    stock: number;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
export type ProductDocument = Product & Document;