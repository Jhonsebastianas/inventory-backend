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

    @Prop({ required: true, type: Number })
    totalPurchasePrice: number;

    @Prop({ required: true, default: 0.0, type: Number  })
    quantity: number;

    @Prop({ required: true, default: 0.0, type: Number })
    quantityPurchased: number;

}

export const StockDetailSchema = SchemaFactory.createForClass(StockDetail);
export type StockDetailDocument = StockDetail & Document;