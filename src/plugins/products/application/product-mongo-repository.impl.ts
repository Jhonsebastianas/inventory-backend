import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import { Injectable } from "@nestjs/common";
import { ProductMongoRepository } from "../domain/repository/internal/mongodb/product.repository";
import { Product } from "../domain/model/document/product.document";

@Injectable()
export class ProductRepositoryImpl implements ProductMongoRepository {

    constructor(@InjectModel(Product.name) private productModel: Model<Product>) { }

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
        return await this.productModel.find();
    }

    async findById(id: string): Promise<Product> {
        return await this.productModel.findById(id).exec();
    }

    async findByName(name: string): Promise<Product> {
        return await this.productModel.findOne({ name }).exec();
    }

    async findByLikeName(name: string): Promise<Product[]> {
        const regex = new RegExp(name, 'i'); // 'i' para que la búsqueda sea insensible a mayúsculas
        return await this.productModel.find({ name: regex }).exec();
    }

}