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
import { BusinessServiceImpl } from "src/plugins/business/application/business-service.impl";
import { SalesConsultationInDTO } from "../domain/model/dto/sales-consultation-in.dto";
import { SalesConsultationOutDTO } from "../domain/model/dto/sales-consultation-out.dto";
import { MetricsSalesConsultation } from "../domain/model/dto/metrics-sales-consultation";
import { ClientServiceImpl } from "src/plugins/clients/application/client-service.impl";


@Injectable()
export class SaleServiceImpl implements SaleService {

    constructor(
        private clientService: ClientServiceImpl,
        private saleMongoRepository: SaleRepositoryImpl,
        private userSessionServiceImpl: UserSessionServiceImpl,
        private productService: ProductServiceImpl,
        private businessService: BusinessServiceImpl,
    ) { }

    async registerSale(saleToRegister: CreateSaleDTO): Promise<ResponseDTO> {
        const currentBusiness = await this.businessService.getBusinessWorkingOn();

        // Registro de cliente
        let client;
        if (saleToRegister.client != null) {
            client = await this.clientService.findClientByIdentification(saleToRegister.client.identification.type.id, saleToRegister.client.identification.value);
            if (client == null) {
                await this.clientService.registerClient(saleToRegister.client);
                client = await this.clientService.findClientByIdentification(saleToRegister.client.identification.type.id, saleToRegister.client.identification.value);
            }
        }



        const newSale = new Sale();
        if (client != null) {
            newSale.clientId = new Types.ObjectId(client?.id);
        }
        newSale.createdAt = FzUtil.getCurrentDate();
        newSale.idUser = new Types.ObjectId(await this.userSessionServiceImpl.getIdUser());
        newSale.businessId = new Types.ObjectId(currentBusiness.id);
        newSale.paymentMethods = saleToRegister.paymentMethods;
        newSale.products = saleToRegister.products.flatMap(product => SaleProductMapper.mapToSaleProduct(product));
        newSale.totalInvoiced = saleToRegister.products.reduce((total, precio) => total += precio.price * precio.quantity, 0);
        newSale.totalProducts = saleToRegister.products.map(product => product.quantity).reduce((total, cantidad) => total += cantidad, 0);

        for (const product of saleToRegister.products) {
            await this.productService.reduceInventories(product.id, product.quantity);
        }

        // REGISTRO DE FACTURA
        //newSale.proofPayment

        await this.saleMongoRepository.save(newSale);
        return new ResponseDtoBuilder().created().whitMessage("Venta registrada con éxito").build();
    }

    async findAll(): Promise<SaleDTO[]> {
        return (await this.saleMongoRepository.findAll()).flatMap(sale => SaleMapper.mapToSaleDTO(sale));
    }


    async salesConsultation(consultation: SalesConsultationInDTO): Promise<SalesConsultationOutDTO> {
        const sales: SaleDTO[] = (await this.saleMongoRepository.findByDateRange(consultation.startDate, consultation.endDate)).flatMap(sale => SaleMapper.mapToSaleDTO(sale));
        const metrics = new MetricsSalesConsultation();
        metrics.totalInvoiced = sales.map(sale => sale.totalInvoiced).reduce((total, current) => total += current, 0);
        const consultationOut = new SalesConsultationOutDTO();
        consultationOut.sales = sales;
        consultationOut.metrics = metrics;
        return consultationOut;
    }


}