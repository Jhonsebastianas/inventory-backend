import { MovementsFinancial } from "@financial-register/domain/model/document/movements-financial.document";
import { MovementsFinancialRepository } from "@financial-register/domain/repository/mongodb/movements-financial.repository";
import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import mongoose, { Model } from "mongoose";

@Injectable()
export class MovementsFinancialRepositoryImpl implements MovementsFinancialRepository {

    constructor(@InjectModel(MovementsFinancial.name) private movementsFinancialModel: Model<MovementsFinancial>) { }

    async save(movementsFinancial: MovementsFinancial): Promise<MovementsFinancial> {
        const newMovementsFinancial = new this.movementsFinancialModel(movementsFinancial);
        return await newMovementsFinancial.save();
    }

    async update(movementsFinancial: MovementsFinancial): Promise<MovementsFinancial> {
        return await this.movementsFinancialModel.findByIdAndUpdate(movementsFinancial._id, movementsFinancial, { new: true }).exec();
    }

    async delete(idMovementsFinancial: string): Promise<void> {
        await this.movementsFinancialModel.findByIdAndDelete(idMovementsFinancial).exec();
    }

    async findById(id: string): Promise<MovementsFinancial> {
        return await this.movementsFinancialModel.findById(id).exec();
    }

    async findAllUser(idUser: string): Promise<MovementsFinancial[]> {
        return await this.movementsFinancialModel.find({ user: new mongoose.Types.ObjectId(idUser) }).exec();
    }

    async findByMonthAndYearAndUser(month: string, year: string, idUser: string): Promise<MovementsFinancial> {
        return await this.movementsFinancialModel.findOne({ user: new mongoose.Types.ObjectId(idUser), month, year }).exec();
    }

}