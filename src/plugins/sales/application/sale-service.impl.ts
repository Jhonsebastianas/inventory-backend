import { Injectable } from "@nestjs/common";
import { SaleService } from "../domain/service/sale.service";
import { SaleRepositoryImpl } from "./sale-mongo-repository.impl";
import { ResponseDTO, ResponseDtoBuilder } from "@core/domain/response.dto";
import { SaleDTO } from "../domain/model/dto/sale.dto";
import { SaleMapper } from "../domain/repository/internal/mapper/sale.mapper";
import { Sale } from "../domain/model/document/sale.document";
import { FzUtil } from "@core/util/fz-util";
import { UserSessionServiceImpl } from "@login/application/user-session-service.impl";
import { Types } from "mongoose";
import { CreateSaleDTO } from "../domain/model/dto/create-sale.dto";
import { SaleProductMapper } from "../domain/repository/internal/mapper/sale-product.mapper";
import { ProductServiceImpl } from "src/plugins/products/application/product-service.impl";


@Injectable()
export class SaleServiceImpl implements SaleService {

    constructor(
        private saleMongoRepository: SaleRepositoryImpl,
        private userSessionServiceImpl: UserSessionServiceImpl,
        private productService: ProductServiceImpl,
    ) { }

    async registerSale(saleToRegister: CreateSaleDTO): Promise<ResponseDTO> {
        // if (saleToRegister.idUser) {
        //     return new ResponseDtoBuilder().ok().whitMessage("La venta ya se encuentra registrada").build();
        // }

        const newSale = new Sale();
        newSale.createdAt = FzUtil.getCurrentDate();
        newSale.idUser = new Types.ObjectId(await this.userSessionServiceImpl.getIdUser());
        newSale.invoiceIdentifier = "00000001"; // Realizar ajuste con consecutivos
        newSale.paymentMethods = saleToRegister.paymentMethods;
        newSale.products = saleToRegister.products.flatMap(product => SaleProductMapper.mapToSaleProduct(product));
        newSale.totalInvoiced = saleToRegister.products.reduce((total, precio) => total += precio.price * precio.quantity, 0);
        newSale.totalProducts = saleToRegister.products.map(product => product.quantity).reduce((total, cantidad) => total += cantidad, 0);

        for (const product of saleToRegister.products) {
            this.productService.updateStock(product.id, FzUtil.getNegative(product.quantity));
        }

        // REGISTRO DE FACTURA
        //newSale.proofPayment

        await this.saleMongoRepository.save(newSale);
        return new ResponseDtoBuilder().created().whitMessage("Venta registrada con éxito").build();
    }

    async findAll(): Promise<SaleDTO[]> {
        return (await this.saleMongoRepository.findAll()).flatMap(sale => SaleMapper.mapToSaleDTO(sale));
    }


}