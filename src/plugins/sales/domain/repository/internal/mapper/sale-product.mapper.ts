import { Types } from "mongoose";
import { SaleProductDTO } from "../../../model/dto/sale-product.dto";
import { SaleProduct } from "../../../model/document/sale-product.document";

export class SaleProductMapper {

    static mapToSaleProductDTO(saleProduct: SaleProductDTO): SaleProductDTO {
        const saleProductDTO = new SaleProductDTO();
        saleProductDTO.id = saleProduct.id;
        saleProductDTO.name = saleProduct.name;
        saleProductDTO.price = saleProduct.price;
        saleProductDTO.quantity = saleProduct.quantity;
        return saleProductDTO;
    }
    
    static mapToSaleProduct(saleProductDTO: SaleProductDTO): SaleProduct {
        const saleProduct = new SaleProduct();
        saleProduct.idProducto = new Types.ObjectId(saleProductDTO.id);
        saleProduct.name = saleProductDTO.name;
        saleProduct.price = saleProductDTO.price;
        saleProduct.quantity = saleProductDTO.quantity;
        return saleProduct;
    }

}  