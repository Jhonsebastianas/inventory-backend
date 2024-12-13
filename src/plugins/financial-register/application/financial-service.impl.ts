import { Injectable } from '@nestjs/common';
import { Model, Types } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Sale } from 'src/plugins/sales/domain/model/document/sale.document';
import { FinancialResponseDto } from '@financial-register/domain/model/dto/financial-response.dto';
import { BusinessServiceImpl } from 'src/plugins/business/application/business-service.impl';

@Injectable()
export class FinancialServiceImpl {

    constructor(
        @InjectModel(Sale.name) private saleModel: Model<Sale>,
        private businessService: BusinessServiceImpl,
    ) { }

    async getFinancialStates(range: 'day' | 'week' | 'month' | 'year' | 'total', date: Date): Promise<FinancialResponseDto> {
        const startDate = new Date(date);
        let endDate = new Date(date);

        switch (range) {
            case 'day':
                endDate.setDate(endDate.getDate() + 1);
                break;
            case 'week':
                startDate.setDate(startDate.getDate() - startDate.getDay());
                endDate.setDate(startDate.getDate() + 7);
                break;
            case 'month':
                startDate.setDate(1);
                endDate = new Date(startDate.getFullYear(), startDate.getMonth() + 1, 1);
                break;
            case 'year':
                startDate.setMonth(0, 1);
                endDate = new Date(startDate.getFullYear() + 1, 0, 1);
                break;
            case 'total':
                startDate.setFullYear(2000, 1);
                startDate.setMonth(0, 1);
                endDate.setDate(endDate.getDate() + 1);
                break;
        }

        const currentBusiness = await this.businessService.getBusinessWorkingOn();

        const [financialData]: any = await this.saleModel.aggregate([
            {
                $match: {
                    createdAt: { $gte: startDate, $lt: endDate },
                    businessId: new Types.ObjectId(currentBusiness.id)
                },
            },
            {
                $group: {
                    _id: null,
                    totalRevenue: { $sum: '$totalInvoiced' },
                    totalProfit: { $sum: '$totalProfit' },
                },
            },
            {
                $project: {
                    _id: 0,
                    totalRevenue: 1,
                    totalProfit: 1,
                },
            },
        ]);

        // Retornar los datos usando el DTO
        return new FinancialResponseDto(financialData?.totalRevenue, financialData?.totalProfit);
    }
}
