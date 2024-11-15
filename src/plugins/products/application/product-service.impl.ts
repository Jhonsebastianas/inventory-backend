import { Injectable, Logger } from "@nestjs/common";
import { ProductRepositoryImpl } from "./product-mongo-repository.impl";
import { ProductService } from "../domain/service/product.service";
import { ResponseDTO, ResponseDtoBuilder } from "@core/domain/response.dto";
import { ProductRegisterDTO } from "../domain/model/dto/product-register.dto";
import { ProductDTO } from "../domain/model/dto/product.dto";
import { ProductMapper } from "../domain/repository/internal/mapper/product.mapper";
import { Product } from "../domain/model/document/product.document";
import { ConflictException } from "@core/exceptions/manager.exception";
import { StockDetailMapper } from "../domain/repository/internal/mapper/stock-detail.mapper";
import { BusinessServiceImpl } from "src/plugins/business/application/business-service.impl";
import { Types } from "mongoose";
import { SendEmailDTO, SendEmailDTOBuilder } from "src/plugins/notification/domain/model/dto/send-email.dto";
import { UserServiceImpl } from "@user/application/user-service.impl";
import { UserDTO } from "@user/domain/model/dto/user.dto";
import { EmailParametersBuilder } from "src/plugins/notification/domain/model/dto/email-parameters.dto";
import { EmailServiceImpl } from "src/plugins/notification/application/email-service.impl";


@Injectable()
export class ProductServiceImpl implements ProductService {

    private readonly logger = new Logger(ProductServiceImpl.name, { timestamp: true });

    constructor(
        private businessService: BusinessServiceImpl,
        private emailService: EmailServiceImpl,
        private productMongoRepository: ProductRepositoryImpl,
        private userService: UserServiceImpl,
    ) { }

    async registerProduct(productRegister: ProductRegisterDTO): Promise<ResponseDTO> {
        const product: Product = await this.productMongoRepository.findByName(productRegister.name);

        if (product != null) {
            throw new ConflictException("El producto ya se encuentra registrado en el sistema");
        }

        const business = await this.businessService.getBusinessWorkingOn();

        const newProduct = new Product();
        newProduct.businessId = new Types.ObjectId(business?.id);
        newProduct.description = productRegister?.description;
        newProduct.name = productRegister?.name;
        newProduct.price = productRegister?.price;
        newProduct.stock = productRegister?.stockDetails.reduce((total, detail) => total += detail.quantity, 0);
        newProduct.percentageTax = productRegister?.percentageTax;

        let sumTotalPurchasePrices = 0;

        newProduct.stockDetails = productRegister?.stockDetails.map(detail => { 
            const totalPurchasePrice = detail.purchasePrice * detail.quantity;
            sumTotalPurchasePrices = sumTotalPurchasePrices + totalPurchasePrice;
            return {...StockDetailMapper.mapToStockDetail(detail),
                quantityPurchased: detail.quantity,
                totalPurchasePrice,
                totalGrossProfit: 0.0,
            } 
        });

        newProduct.quantityStockReplenished = product?.quantityStockReplenished;
        newProduct.weightedAveragePurchasePrice = sumTotalPurchasePrices / newProduct.stock;

        await this.productMongoRepository.save(newProduct);
        return new ResponseDtoBuilder().ok().whitMessage("Producto registrado con éxito").build();
    }
    
    async updateProduct(id: string, productUpdate: ProductDTO): Promise<ResponseDTO> {
        const product: Product = await this.productMongoRepository.findById(id);

        if (product == null) {
            throw new ConflictException("El producto no se encuentra registrado en el sistema");
        }

        await this.productMongoRepository.update(ProductMapper.mapToProduct(productUpdate));

        return new ResponseDtoBuilder().ok()
            .whitMessage("Producto registrado con éxito")
            .build();
    }

    async deleteProduct(id: string): Promise<ResponseDTO> {
        await this.productMongoRepository.delete(id);
        return new ResponseDtoBuilder().ok().whitMessage("Producto eliminado con éxito").build();
    }

    async findAll(): Promise<ProductDTO[]> {
        return (await this.productMongoRepository.findAll())
            .flatMap(product => ProductMapper.mapToProductDTO(product));
    }

    async findById(id: string): Promise<ProductDTO> {
        return ProductMapper.mapToProductDTO(await this.productMongoRepository.findById(id));
    }

    async findByName(name: string): Promise<ProductDTO> {
        return ProductMapper.mapToProductDTO(await this.productMongoRepository.findByName(name));
    }

    async findByLikeName(name: string): Promise<ProductDTO[]> {
        return (await this.productMongoRepository.findByLikeName(name))
            .flatMap(product => ProductMapper.mapToProductDTO(product));
    }

    async reduceInventories(idProduct: string, quantity: number): Promise<void> {
        const product: ProductDTO = await this.findById(idProduct);
    
        let remainingQuantity = quantity; // Cantidad a reducir en stockDetails
        let updatedStock = 0; // Nuevo stock total después de la reducción
    
        // Recorremos los detalles de inventario (stockDetails) para ir reduciendo las existencias
        for (const stockDetail of product.stockDetails) {
            if (remainingQuantity <= 0) break; // Si ya hemos reducido toda la cantidad, salimos del bucle
    
            const availableQuantity = stockDetail.quantity;
    
            if (availableQuantity >= remainingQuantity) {
                // Si la cantidad disponible es suficiente para cubrir lo que queda por reducir
                stockDetail.quantity -= remainingQuantity;
                updatedStock += stockDetail.quantity; // Sumamos al stock total

                const profit = product.price - stockDetail.purchasePrice;
                stockDetail.totalGrossProfit = stockDetail.totalGrossProfit + (remainingQuantity * profit);
                remainingQuantity = 0; // Todo se ha reducido
                
            } else {
                // Si la cantidad disponible no es suficiente
                remainingQuantity -= availableQuantity; // Restamos lo que queda disponible
                stockDetail.quantity = 0; // Este detalle de inventario queda en 0

                const profit = product.price - stockDetail.purchasePrice;
                stockDetail.totalGrossProfit = stockDetail.totalGrossProfit + (availableQuantity * profit);
            }
    
            // Sumamos la cantidad restante al stock total
            updatedStock += stockDetail.quantity;
        }
    
        const newStock = product.stock - quantity;
        product.stock = (newStock > 0) ? newStock : 0;
    
        // Verificamos si el inventario está por debajo del nivel de reorden
        if (product.stock <= product.quantityStockReplenished) {
            this.logger.log("Inventario próximo a reordenar");
            console.log("Inventario próximo a reordenar");
            const business = await this.businessService.getBusinessWorkingOn();
            const userOwnerBusiness: UserDTO = await this.userService.findById(business.ownerId);
            const sendEmailDTO: SendEmailDTO = new SendEmailDTOBuilder()
            .withRecipientEmails([userOwnerBusiness.contact.email])
                .withParameters(new EmailParametersBuilder()
                    .withEmail(userOwnerBusiness.contact.email)
                    .withUserNames(userOwnerBusiness.names)
                    .withProductName(product.name)
                    .withCurrentStock(product.stock.toString())
                    .withQuantityStockReplenished(product.quantityStockReplenished.toString())
                    .build()
                )
            .build();
            this.emailService.sendNotificationsLowProductStock(sendEmailDTO);
        }
    
        // Finalmente, actualizamos el producto
        await this.updateProduct(idProduct, product);
    }    

}