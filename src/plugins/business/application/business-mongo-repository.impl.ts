import { Injectable } from "@nestjs/common";
import { BusinessRepository } from "../domain/repository/mongodb/business.repository";
import { Business } from "../domain/model/document/business.document";
import { InjectModel } from "@nestjs/mongoose";
import { Model, Types } from "mongoose";

@Injectable()
export class BusinessRepositoryImpl implements BusinessRepository {

    constructor(@InjectModel(Business.name) private businessModel: Model<Business>) { }

    async save(business: Business): Promise<Business> {
        const newBusiness = new this.businessModel(business);
        return await newBusiness.save();
    }

    async update(business: Business): Promise<Business> {
        return await this.businessModel.findByIdAndUpdate(business._id, business, { new: true }).exec();
    }

    async delete(id: string): Promise<void> {
        await this.businessModel.findByIdAndDelete(id).exec();
    }

    async findById(id: string): Promise<Business> {
        return await this.businessModel.findById(id).exec();
    }

    async findByOwnerId(ownerId: string): Promise<Business> {
        return await this.businessModel.findOne({ ownerId: new Types.ObjectId(ownerId) });
    }

    async findByEmployeeId(employeeId: string): Promise<Business> {
        return await this.businessModel.findOne({ employeeId: new Types.ObjectId(employeeId) });
    }

}