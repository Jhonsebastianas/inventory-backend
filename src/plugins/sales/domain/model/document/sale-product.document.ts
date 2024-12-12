import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Types } from "mongoose";

@Schema({ timestamps: true })
export class SaleProduct {

    @Prop({ required: true, type: Types.ObjectId, ref: 'Product', name: "id_producto" })
    idProducto: Types.ObjectId;

    @Prop({ required: true })
    name: string;

    @Prop({ required: true, type: Number })
    price: number; // Precio de venta por unidad

    @Prop({ required: false, type: Number })
    purchasePrice: number; // Precio de compra por unidad

    @Prop({ required: true, type: Number })
    quantity: number;

    @Prop({
        required: false,
        type: Number,
        default: function () {
            return this.price - this.purchasePrice;
        },
    })
    profit: number; // Ganancia por unidad

    @Prop({
        required: false,
        type: Number,
        default: function () {
            return (this.price - this.purchasePrice) * this.quantity;
        },
    })
    totalProfit: number; // Ganancia total por este producto
}

export const SaleProductSchema = SchemaFactory.createForClass(SaleProduct);
export type SaleProductDocument = SaleProduct & Document;