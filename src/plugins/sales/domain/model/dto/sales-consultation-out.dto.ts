import { MetricsSalesConsultation } from "./metrics-sales-consultation";
import { SaleDTO } from "./sale.dto";

export class SalesConsultationOutDTO {
    sales: SaleDTO[];
    metrics: MetricsSalesConsultation;
}