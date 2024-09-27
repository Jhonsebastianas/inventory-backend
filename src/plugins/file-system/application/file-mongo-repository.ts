import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import { Injectable } from "@nestjs/common";
import { FileMongoRepository } from "../domain/repository/internal/mongodb/file.repository";
import { File } from "../domain/model/document/file.document";

@Injectable()
export class FileRepositoryImpl implements FileMongoRepository {

    constructor(@InjectModel(File.name) private fileModel: Model<File>) { }

    async save(file: File): Promise<File> {
        const newFile = new this.fileModel(file);
        return await newFile.save();
    }

    async update(file: File): Promise<File> {
        return await this.fileModel.findByIdAndUpdate(file._id, file, { new: true }).exec();
    }

    async delete(id: string): Promise<void> {
        await this.fileModel.findByIdAndDelete(id).exec();
    }

    async findById(id: string): Promise<File> {
        return await this.fileModel.findById(id).exec();
    }

}