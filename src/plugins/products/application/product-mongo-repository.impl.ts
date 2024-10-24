import { Model, Types } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import { Injectable } from "@nestjs/common";
import { ProductMongoRepository } from "../domain/repository/internal/mongodb/product.repository";
import { Product } from "../domain/model/document/product.document";
import { BusinessServiceImpl } from "src/plugins/business/application/business-service.impl";

@Injectable()
export class ProductRepositoryImpl implements ProductMongoRepository {

    constructor(
        @InjectModel(Product.name) private productModel: Model<Product>,
        private businessService: BusinessServiceImpl,
    ) { }

    async save(product: Product): Promise<Product> {
        const newUser = new this.productModel(product);
        return await newUser.save();
    }

    async update(product: Product): Promise<Product> {
        return await this.productModel.findByIdAndUpdate(product._id, product, { new: true }).exec();
    }

    async delete(idProduct: string): Promise<void> {
        await this.productModel.findByIdAndDelete(idProduct).exec();
    }

    async findAll(): Promise<Product[]> {
        const currentBusiness = await this.businessService.getBusinessWorkingOn();
        return await this.productModel.find({ businessId: new Types.ObjectId(currentBusiness.id) });
    }

    async findById(id: string): Promise<Product> {
        const currentBusiness = await this.businessService.getBusinessWorkingOn();
        return await this.productModel.findOne({ _id: new Types.ObjectId(id), businessId: new Types.ObjectId(currentBusiness.id) }).exec();
    }

    async findByName(name: string): Promise<Product> {
        const currentBusiness = await this.businessService.getBusinessWorkingOn();
        return await this.productModel.findOne({ name, businessId: new Types.ObjectId(currentBusiness.id) }).exec();
    }

    async findByLikeName(name: string): Promise<Product[]> {
        const currentBusiness = await this.businessService.getBusinessWorkingOn();
        const regex = new RegExp(name, 'i'); // 'i' para que la búsqueda sea insensible a mayúsculas
        return await this.productModel.find({ name: regex, businessId: new Types.ObjectId(currentBusiness.id) }).exec();
    }

}