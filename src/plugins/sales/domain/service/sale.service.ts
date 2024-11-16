import { ResponseDTO } from "@core/domain/response.dto";
import { SaleDTO } from "../model/dto/sale.dto";
import { CreateSaleDTO } from "../model/dto/create-sale.dto";
import { SalesConsultationInDTO } from "../model/dto/sales-consultation-in.dto";
import { SalesConsultationOutDTO } from "../model/dto/sales-consultation-out.dto";

export interface SaleService {

    /**
     * Método encargado de registrar una venta.
     * 
     * @param { CreateSaleDTO } saleToRegister venta a registrar.
     */
    registerSale(saleToRegister: CreateSaleDTO): Promise<ResponseDTO>;

    /**
     * Return all sales
     */
    findAll(): Promise<SaleDTO[]>;

    /**
     * consultation of sales by filters
     * Created on date 16/11/2024 at 09:53:28. <br>
     * 
     * @param consultation information to conusltation
     */
    salesConsultation(consultation: SalesConsultationInDTO): Promise<SalesConsultationOutDTO>;
}