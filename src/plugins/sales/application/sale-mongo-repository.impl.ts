import { Injectable } from "@nestjs/common";
import { SaleMongoRepository } from "../domain/repository/internal/mongodb/sale.repository";
import { Sale } from "../domain/model/document/sale.document";
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";

@Injectable()
export class SaleRepositoryImpl implements SaleMongoRepository {

    constructor(@InjectModel(Sale.name) private saleModel: Model<Sale>) { }

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
        return await this.saleModel.findById(id).exec();
    }

}