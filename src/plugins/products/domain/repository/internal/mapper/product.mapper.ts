import { Types } from "mongoose";
import { Product } from "../../../model/document/product.document";
import { ProductDTO } from "../../../model/dto/product.dto";

export class ProductMapper {

    static mapToUserDTO(product: Product): ProductDTO {
        const productDTO = new ProductDTO();
        productDTO.id = product._id.toString();
        productDTO.name = product.name;
        productDTO.description = product.description;
        productDTO.price = product.price;
        productDTO.stock = product.stock;
        return productDTO;
    }

    static mapToUser(productDTO: ProductDTO): Product {
        const product = new Product();
        product._id = new Types.ObjectId(productDTO.id);
        product.name = productDTO.name;
        product.description = productDTO.description;
        product.price = productDTO.price;
        product.stock = productDTO.stock;
        return product;
    }

}  