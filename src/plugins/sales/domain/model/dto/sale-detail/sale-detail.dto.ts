import { ClientDTO } from "src/plugins/clients/domain/model/dto/client.dto";
import { SaleProduct } from "../../document/sale-product.document";
import { SalePaymentMethodDTO } from "../sale-payment-method.dto";
import { SaleDetailUser } from "./sale-detail-user";

export class SaleDetailDTO {
    id: string;
    idUser: string;
    userSold: SaleDetailUser;
    businessId: string;
    clientId: string;
    client: ClientDTO;
    invoiceIdentifier: string;
    createdAt: Date;
    products: SaleProduct[];
    paymentMethods: SalePaymentMethodDTO[];
    totalInvoiced: number;
    totalProducts: number;
    proofPayment: string;
}