import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Sale } from 'src/plugins/sales/domain/model/document/sale.document';

@Injectable()
export class FinancialServiceImpl {

    constructor(
        @InjectModel(Sale.name) private saleModel: Model<Sale>,
    ) { }

    async getFinancialStates(range: 'day' | 'week' | 'month' | 'year', date: Date) {
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
        }
    
        return this.saleModel.aggregate([
            {
                $match: {
                    createdAt: { $gte: startDate, $lt: endDate },
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
    }
}
