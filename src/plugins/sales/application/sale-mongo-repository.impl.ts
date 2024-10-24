import { Injectable } from "@nestjs/common";
import { SaleMongoRepository } from "../domain/repository/internal/mongodb/sale.repository";
import { Sale } from "../domain/model/document/sale.document";
import { Model, Types } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import { SaleDTO } from "../domain/model/dto/sale.dto";
import { BusinessServiceImpl } from "src/plugins/business/application/business-service.impl";

@Injectable()
export class SaleRepositoryImpl implements SaleMongoRepository {

    constructor(
        @InjectModel(Sale.name) private saleModel: Model<Sale>,
        private businessService: BusinessServiceImpl,
    ) { }

    async save(sale: Sale): Promise<Sale> {
        const newUser = new this.saleModel(sale);
        return await newUser.save();
    }

    async update(sale: Sale): Promise<Sale> {
        return await this.saleModel.findByIdAndUpdate(sale._id, sale, { new: true }).exec();
    }

    async delete(id: string): Promise<void> {
        await this.saleModel.findByIdAndDelete(id).exec();
    }

    async findById(id: string): Promise<Sale> {
        const currentBusiness = await this.businessService.getBusinessWorkingOn();
        return await this.saleModel.findOne({ _id: new Types.ObjectId(id), businessId: new Types.ObjectId(currentBusiness.id) }).exec();
    }

    async findAll(): Promise<Sale[]> {
        const currentBusiness = await this.businessService.getBusinessWorkingOn();
        return await this.saleModel.find({ businessId: new Types.ObjectId(currentBusiness.id) });
    }

}