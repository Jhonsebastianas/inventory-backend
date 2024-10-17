import { Injectable } from "@nestjs/common";
import { ProductRepositoryImpl } from "./product-mongo-repository.impl";
import { ProductService } from "../domain/service/product.service";
import { ResponseDTO, ResponseDtoBuilder } from "@core/domain/response.dto";
import { ProductRegisterDTO } from "../domain/model/dto/product-register.dto";
import { ProductDTO } from "../domain/model/dto/product.dto";
import { ProductMapper } from "../domain/repository/internal/mapper/product.mapper";
import { Product } from "../domain/model/document/product.document";
import { ConflictException } from "@core/exceptions/manager.exception";


@Injectable()
export class ProductServiceImpl implements ProductService {

    constructor(
        private productMongoRepository: ProductRepositoryImpl,
    ) { }

    async registerProduct(productRegister: ProductRegisterDTO): Promise<ResponseDTO> {
        const product: Product = await this.productMongoRepository.findByName(productRegister.name);

        if (product != null) {
            throw new ConflictException("El producto ya se encuentra registrado en el sistema");
        }

        const newProduct = new Product();
        newProduct.description = productRegister.description;
        newProduct.name = productRegister.name;
        newProduct.price = productRegister.price;
        newProduct.stock = productRegister.stock;
        newProduct.percentageTax = productRegister.percentageTax;

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

    async updateStock(idProduct: string, quantity: number): Promise<void> {
        const product: ProductDTO = await this.findById(idProduct);
        if (quantity < 0) {
            // alert of low stocks
        }
        const newStock = product.stock + quantity;
        if (newStock < 0) {
            product.stock = 0;
        }
        product.stock = (newStock > 0) ? product.stock + quantity : 0;
        await this.updateProduct(idProduct, product);
    }

}