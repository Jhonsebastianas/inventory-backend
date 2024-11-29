import { ApiProperty } from "@nestjs/swagger";
import { SaleProduct } from "../document/sale-product.document";
import { SalePaymentMethodDTO } from "./sale-payment-method.dto";

export class SaleDTO {
    id: string;
    idUser: string;
    businessId: string;
    clientId: string;
    invoiceIdentifier: string;
    createdAt: Date;
    products: SaleProduct[];
    paymentMethods: SalePaymentMethodDTO[];
    totalInvoiced: number;
    totalProducts: number;
    proofPayment: string;
}