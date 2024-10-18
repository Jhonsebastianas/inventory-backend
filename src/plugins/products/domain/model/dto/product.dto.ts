import { StockDetail } from "../document/stock-detail.document";
import { StockDetailDTO } from "./stock-detail.dto";

export class ProductDTO {
    id: string;
    name: string;
    description: string;
    price: number;
    stock: number;
    stockDetails: StockDetailDTO[];
    percentageTax: number;
    quantityStockReplenished: number;
    weightedPurchasePrice: number;
}