import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Types } from "mongoose";
import { StockDetail, StockDetailSchema } from "./stock-detail.document";

@Schema({ collection: "products", timestamps: true })
export class Product {
    _id: Types.ObjectId;

    @Prop({ required: true, type: Types.ObjectId, ref: 'business', name: "_id" })
    businessId: Types.ObjectId;

    @Prop({ required: true })
    name: string;

    @Prop({ required: false })
    description: string;

    @Prop({ required: true, type: Number })
    price: number; // selling price

    @Prop({ required: true, default: false, })
    stock: number;

    @Prop({ required: false, default: "unidad", })
    presentation: string; // unidad, 150 ml

    @Prop({ required: false, type: [ StockDetailSchema ] })
    stockDetails: StockDetail[];

    @Prop({ required: false, type: Number, default: 6 })
    quantityStockReplenished: number; // indica cuando se tiene que reemplazar el stock

    @Prop({ required: false, type: Number })
    percentageTax: number;

    @Prop({ required: false, type: Number })
    weightedAveragePurchasePrice: number; // Precio de compra ponderado
}

export const ProductSchema = SchemaFactory.createForClass(Product);
export type ProductDocument = Product & Document;