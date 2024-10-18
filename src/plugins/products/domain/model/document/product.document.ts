import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Types } from "mongoose";
import { StockDetail, StockDetailSchema } from "./stock-detail.document";

@Schema({ collection: "products", timestamps: true })
export class Product {
    _id: Types.ObjectId;

    @Prop({ required: true })
    name: string;

    @Prop({ required: false })
    description: string;

    @Prop({ required: true, type: Number })
    price: number; // selling price

    @Prop({ required: false, type: Number })
    weightedPurchasePrice: number; // Precio de compra ponderado

    @Prop({ required: true, default: false, })
    stock: number;

    @Prop({ required: false, type: [ StockDetailSchema ] })
    stockDetails: StockDetail[];

    @Prop({ required: false, type: Number })
    quantityStockReplenished: number; // indica cuando se tiene que reemplazar el stock

    @Prop({ required: false, type: Number })
    percentageTax: number;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
export type ProductDocument = Product & Document;