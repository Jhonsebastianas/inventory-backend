import { ResponseDTO } from "@core/domain/response.dto";
import { SaleDTO } from "../model/dto/sale.dto";
import { CreateSaleDTO } from "../model/dto/create-sale.dto";

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
}