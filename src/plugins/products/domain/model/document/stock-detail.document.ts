import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Types } from "mongoose";

@Schema({ timestamps: true })
export class StockDetail {
    _id: Types.ObjectId;

    @Prop({ required: false })
    provider: string;

    @Prop({ required: true, type: Number })
    purchasePrice: number;

    @Prop({ required: true, type: Number, default: 0.0 })
    totalGrossProfit: number; // Beneficio bruto

    @Prop({ required: true, default: 0, })
    quantity: number;

    @Prop({ required: true, default: 0, })
    quantityPurchased: number;

}

export const StockDetailSchema = SchemaFactory.createForClass(StockDetail);
export type StockDetailDocument = StockDetail & Document;