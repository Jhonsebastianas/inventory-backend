import { StockDetailDTO } from "./stock-detail.dto";

export class ProductDTO {
    id: string;
    businessId: string;
    name: string;
    description: string;
    price: number;
    stock: number;
    stockDetails: StockDetailDTO[];
    percentageTax: number;
    quantityStockReplenished: number;
    weightedAveragePurchasePrice: number;
}