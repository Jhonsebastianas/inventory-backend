import { Types } from "mongoose";
import { StockDetail } from "../../../model/document/stock-detail.document";
import { StockDetailDTO } from "../../../model/dto/stock-detail.dto";

export class StockDetailMapper {

    static mapToStockDetailDTO(stockDetail: StockDetail): StockDetailDTO {
        if (stockDetail == null) {
            return null;
        }
        const stockDetailDTO = new StockDetailDTO();
        stockDetailDTO.id = stockDetail?._id.toString();
        stockDetailDTO.provider = stockDetail?.provider;
        stockDetailDTO.purchasePrice = stockDetail?.purchasePrice;
        stockDetailDTO.totalGrossProfit = stockDetail?.totalGrossProfit;
        stockDetailDTO.quantity = stockDetail?.quantity;
        stockDetailDTO.quantityPurchased = stockDetail?.quantityPurchased;
        return stockDetailDTO;
    }

    static mapToStockDetail(stockDetailDTO: StockDetailDTO): StockDetail {
        if (stockDetailDTO == null) {
            return null;
        }
        const stockDetail= new StockDetail();
        // Generar nuevo ObjectId solo si el id no es válido o no existe
        stockDetail._id = stockDetailDTO.id && Types.ObjectId.isValid(stockDetailDTO?.id)
            ? new Types.ObjectId(stockDetailDTO?.id)
            : new Types.ObjectId();  // Generar nuevo ObjectId
        stockDetail.provider = stockDetailDTO?.provider;
        stockDetail.purchasePrice = stockDetailDTO?.purchasePrice;
        stockDetail.totalGrossProfit = stockDetailDTO?.totalGrossProfit;
        stockDetail.quantity = stockDetailDTO?.quantity;
        stockDetail.quantityPurchased = stockDetailDTO?.quantityPurchased;
        return stockDetail;
    }

}  