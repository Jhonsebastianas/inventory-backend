import { InformationReductionInventoryDTO } from "src/plugins/products/domain/model/dto/information-reduction-inventoty.dto";

export class CreateSaleOutDTO {
    idSale: string;
    informationReductionInventory: InformationReductionInventoryDTO[] = [];
}