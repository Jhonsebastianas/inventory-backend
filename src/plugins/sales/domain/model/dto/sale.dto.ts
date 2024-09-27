import { SaleProduct } from "../document/sale-product.document";
import { SalePaymentMethodDTO } from "./sale-payment-method.dto";

export class SaleDTO {
    id: string;
    idUser: string;
    invoiceIdentifier: string;
    products: SaleProduct[];
    paymentMethods: SalePaymentMethodDTO[];
    totalInvoiced: number;
    totalProducts: number;
    proofPayment: string;
}