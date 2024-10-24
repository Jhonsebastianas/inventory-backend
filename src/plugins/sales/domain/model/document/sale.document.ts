import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Types } from "mongoose";
import { SaleProduct, SaleProductSchema } from "./sale-product.document";
import { SalePaymentMethodDTO } from "../dto/sale-payment-method.dto";
import { FzUtil } from "@core/util/fz-util";

@Schema({ collection: "sales", timestamps: true })
export class Sale {
    _id: Types.ObjectId;

    @Prop({ type: Types.ObjectId, ref: 'User', required: true, name: 'id_user' })
    idUser: Types.ObjectId;

    @Prop({ required: true, type: Types.ObjectId, ref: 'business', name: "_id" })
    businessId: Types.ObjectId;

    @Prop({ required: false, type: String, name: "invoice_identifier", default: FzUtil.genUUID()})
    invoiceIdentifier: string;

    @Prop({ required: true, type: [ SaleProductSchema ] })
    products: SaleProduct[];

    @Prop({ required: true })
    paymentMethods: SalePaymentMethodDTO[];

    @Prop({ required: true, name: "total_invoiced" })
    totalInvoiced: number;

    @Prop({ required: true, name: "total_products" })
    totalProducts: number;

    @Prop({ required: true, name: "created_at", default: FzUtil.getCurrentDate() })
    createdAt: Date;

    @Prop({ type: Types.ObjectId, ref: 'File', required: false, name: 'proof_payment' }) // Referencia al archivo
    proofPayment: Types.ObjectId;
}

export const SaleSchema = SchemaFactory.createForClass(Sale);
export type SaleDocument = Sale & Document;