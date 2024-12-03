import { Types } from "mongoose";
import { Product } from "../../../model/document/product.document";
import { ProductDTO } from "../../../model/dto/product.dto";
import { StockDetailMapper } from "./stock-detail.mapper";

export class ProductMapper {

    static mapToProductDTO(product: Product): ProductDTO {
        if (product == null) {
            return null;
        }
        const productDTO = new ProductDTO();
        productDTO.id = product._id?.toString();
        productDTO.businessId = product?.businessId?.toString();
        productDTO.name = product?.name;
        productDTO.description = product?.description;
        productDTO.price = product?.price;
        productDTO.stock = product?.stock;
        productDTO.stockDetails = product?.stockDetails.flatMap(detail => StockDetailMapper.mapToStockDetailDTO(detail));
        productDTO.percentageTax = product?.percentageTax;
        productDTO.presentation = product?.presentation;
        productDTO.quantityStockReplenished = product?.quantityStockReplenished;
        productDTO.weightedAveragePurchasePrice = product?.weightedAveragePurchasePrice;
        return productDTO;
    }

    static mapToProduct(productDTO: ProductDTO): Product {
        if (productDTO == null) {
            return null;
        }
        const product = new Product();
        product._id = new Types.ObjectId(productDTO?.id);
        product.businessId = new Types.ObjectId(productDTO?.businessId);
        product.name = productDTO?.name;
        product.description = productDTO?.description;
        product.price = productDTO?.price;
        product.stock = productDTO?.stock;
        product.stockDetails = productDTO?.stockDetails.flatMap(detail => StockDetailMapper.mapToStockDetail(detail));
        product.percentageTax = productDTO?.percentageTax;
        product.presentation = productDTO?.presentation;
        product.quantityStockReplenished = productDTO?.quantityStockReplenished;
        product.weightedAveragePurchasePrice = productDTO?.weightedAveragePurchasePrice;
        return product;
    }

}  