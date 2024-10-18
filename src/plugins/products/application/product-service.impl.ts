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


@Injectable()
export class ProductServiceImpl implements ProductService {

    private readonly logger = new Logger(ProductServiceImpl.name, { timestamp: true });

    constructor(
        private productMongoRepository: ProductRepositoryImpl,
    ) { }

    async registerProduct(productRegister: ProductRegisterDTO): Promise<ResponseDTO> {
        const product: Product = await this.productMongoRepository.findByName(productRegister.name);

        if (product != null) {
            throw new ConflictException("El producto ya se encuentra registrado en el sistema");
        }

        const newProduct = new Product();
        newProduct.description = productRegister?.description;
        newProduct.name = productRegister?.name;
        newProduct.price = productRegister?.price;
        newProduct.stock = productRegister?.stockDetails.reduce((total, detail) => total += detail.quantity, 0);
        newProduct.percentageTax = productRegister?.percentageTax;
        newProduct.stockDetails = productRegister?.stockDetails.map(detail => StockDetailMapper.mapToStockDetail(detail));
        newProduct.quantityStockReplenished = product?.quantityStockReplenished;

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
                remainingQuantity = 0; // Todo se ha reducido
            } else {
                // Si la cantidad disponible no es suficiente
                remainingQuantity -= availableQuantity; // Restamos lo que queda disponible
                stockDetail.quantity = 0; // Este detalle de inventario queda en 0
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
            // Aquí podrías implementar alguna lógica adicional, como notificaciones
        }
    
        // Finalmente, actualizamos el producto
        await this.updateProduct(idProduct, product);
    }    

}