export class InformationReductionInventoryDTO {
    previousStock: number;
    newStock: number;
    isExistenceBelowLimit: boolean = false;
    productName: string;
}