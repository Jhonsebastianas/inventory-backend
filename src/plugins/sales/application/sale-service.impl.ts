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
import { ProductServiceImpl } from "src/plugins/products/application/product-service.impl";
import { BusinessServiceImpl } from "src/plugins/business/application/business-service.impl";
import { SalesConsultationInDTO } from "../domain/model/dto/sales-consultation-in.dto";
import { SalesConsultationOutDTO } from "../domain/model/dto/sales-consultation-out.dto";
import { MetricsSalesConsultation } from "../domain/model/dto/metrics-sales-consultation";
import { ClientServiceImpl } from "src/plugins/clients/application/client-service.impl";
import { SaleDetailDTO } from "../domain/model/dto/sale-detail/sale-detail.dto";
import { UserServiceImpl } from "@user/application/user-service.impl";
import { UserDTO } from "@user/domain/model/dto/user.dto";
import { SaleDetailUser } from "../domain/model/dto/sale-detail/sale-detail-user";
import { CreateSaleOutDTO } from "../domain/model/dto/create-sale-out.dto";
import { InformationReductionInventoryDTO } from "src/plugins/products/domain/model/dto/information-reduction-inventoty.dto";


@Injectable()
export class SaleServiceImpl implements SaleService {

    constructor(
        private clientService: ClientServiceImpl,
        private saleMongoRepository: SaleRepositoryImpl,
        private userSessionServiceImpl: UserSessionServiceImpl,
        private userServiceImpl: UserServiceImpl,
        private productService: ProductServiceImpl,
        private businessService: BusinessServiceImpl,
    ) { }

    async registerSale(saleToRegister: CreateSaleDTO): Promise<ResponseDTO> {
        const currentBusiness = await this.businessService.getBusinessWorkingOn();

        // Registro o búsqueda del cliente
        let client = null;
        if (saleToRegister.client) {
            client = await this.clientService.findClientByIdentification(
                saleToRegister.client.identification.type.id,
                saleToRegister.client.identification.value
            );
            if (!client) {
                await this.clientService.registerClient(saleToRegister.client);
                client = await this.clientService.findClientByIdentification(
                    saleToRegister.client.identification.type.id,
                    saleToRegister.client.identification.value
                );
            }
        }

        // Obtención del ID de usuario en sesión
        const userId = new Types.ObjectId(await this.userSessionServiceImpl.getIdUser());

        // Procesamiento de productos
        const productsWithDetails = await Promise.all(
            saleToRegister.products.map(async (product) => {
                const productDetails = await this.productService.findById(product.id);
                return {
                    idProducto: new Types.ObjectId(product.id),
                    name: productDetails.name,
                    price: product.price,
                    purchasePrice: productDetails.weightedAveragePurchasePrice, // Precio de compra
                    quantity: product.quantity,
                    profit: product.price - productDetails.weightedAveragePurchasePrice, // Ganancia por unidad
                    totalProfit: (product.price - productDetails.weightedAveragePurchasePrice) * product.quantity, // Ganancia total
                };
            })
        );

        // Cálculo de métricas totales
        const totalInvoiced = productsWithDetails.reduce((total, product) => total + product.price * product.quantity, 0);
        const totalProducts = productsWithDetails.reduce((total, product) => total + product.quantity, 0);
        const totalProfit = productsWithDetails.reduce((total, product) => total + product.totalProfit, 0);

        // Reducción de inventarios
        const createSaleOut = new CreateSaleOutDTO();

        const inventoryUpdates = await Promise.all(
            saleToRegister.products.map(async (product) => {
                const inventoryInformation: InformationReductionInventoryDTO = await this.productService.reduceInventories(product.id, product.quantity);
                return inventoryInformation;
            })
        );

        // Agregar las informaciones reducidas al objeto `createSaleOut`
        createSaleOut.informationReductionInventory.push(...inventoryUpdates);

        // Creación de la venta
        const newSale = new Sale();
        if (client) newSale.clientId = new Types.ObjectId(client.id);
        newSale.createdAt = saleToRegister.saleDate ?? FzUtil.getCurrentDate();
        newSale.idUser = userId;
        newSale.businessId = new Types.ObjectId(currentBusiness.id);
        newSale.paymentMethods = saleToRegister.paymentMethods;
        newSale.products = productsWithDetails; // Incluye los detalles de cada producto
        newSale.totalInvoiced = totalInvoiced;
        newSale.totalProducts = totalProducts;
        newSale.totalProfit = totalProfit; // Ganancia total de la venta

        // Registro de la venta en la base de datos
        const savedSale = await this.saleMongoRepository.save(newSale);

        createSaleOut.idSale = savedSale._id.toString();

        return new ResponseDtoBuilder()
            .created()
            .whitData(createSaleOut)
            .whitMessage("Venta registrada con éxito")
            .build();
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

    async findSalesDetailByIdSale(idSale: string): Promise<SaleDetailDTO> {
        const sale: SaleDTO = SaleMapper.mapToSaleDTO(await this.saleMongoRepository.findById(idSale));
        const saleDetail = new SaleDetailDTO();
        Object.assign(saleDetail, sale);

        const userSold: UserDTO = await this.userServiceImpl.findById(sale.idUser);
        const userDetail = new SaleDetailUser();
        userDetail.id = sale.idUser;
        userDetail.names = userSold.names;
        saleDetail.userSold = userDetail;

        if (sale.clientId) {
            saleDetail.client = await this.clientService.findByIdClient(sale.clientId);
        }

        return saleDetail;
    }

}