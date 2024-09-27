import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Types } from "mongoose";
import { SaleProduct, SaleProductSchema } from "./sale-product.document";
import { SalePaymentMethodDTO } from "../dto/sale-payment-method.dto";

@Schema({ collection: "sales", timestamps: true })
export class Sale {
    _id: Types.ObjectId;

    @Prop({ type: Types.ObjectId, ref: 'User', required: true, name: 'id_user' })
    idUser: Types.ObjectId;

    @Prop({ required: false, name: "invoice_identifier" })
    invoiceIdentifier: string;

    @Prop({ required: true, type: [ SaleProductSchema ] })
    products: SaleProduct[];

    @Prop({ required: true })
    paymentMethods: SalePaymentMethodDTO[];

    @Prop({ required: true, name: "total_invoiced" })
    totalInvoiced: number;

    @Prop({ required: true, name: "total_products" })
    totalProducts: number;

    @Prop({ type: Types.ObjectId, ref: 'File', required: false, name: 'proof_payment' }) // Referencia al archivo
    proofPayment: Types.ObjectId;
}

export const SaleSchema = SchemaFactory.createForClass(Sale);
export type SaleDocument = Sale & Document;