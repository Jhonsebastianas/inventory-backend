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
    presentation: string; // unidad, 150 ml
    quantityStockReplenished: number;
    weightedAveragePurchasePrice: number;
}