import { Types } from "mongoose";
import { Sale } from "../../../model/document/sale.document";
import { SaleDTO } from "../../../model/dto/sale.dto";

export class SaleMapper {

    static mapToSaleDTO(sale: Sale): SaleDTO {
        const saleDTO = new SaleDTO();
        saleDTO.id = sale._id.toString();
        saleDTO.idUser = sale.idUser.toString();
        saleDTO.invoiceIdentifier = sale.invoiceIdentifier;
        saleDTO.paymentMethods = sale.paymentMethods;
        saleDTO.products = sale.products;
        saleDTO.proofPayment = sale.proofPayment.toString();
        saleDTO.totalInvoiced = sale.totalInvoiced;
        saleDTO.totalProducts = sale.totalProducts;
        return saleDTO;
    }
    
    static mapToSale(saleDTO: SaleDTO): Sale {
        const sale = new Sale();
        sale._id = new Types.ObjectId(saleDTO.id);
        sale.idUser = new Types.ObjectId(saleDTO.idUser);
        sale.invoiceIdentifier = saleDTO.invoiceIdentifier;
        sale.paymentMethods = saleDTO.paymentMethods;
        sale.products = saleDTO.products;
        sale.proofPayment = new Types.ObjectId(saleDTO.proofPayment);
        sale.totalInvoiced = saleDTO.totalInvoiced;
        sale.totalProducts = saleDTO.totalProducts;
        return sale;
    }

}  