import { Injectable } from "@nestjs/common";
import { ClientRepository } from "../domain/repository/mongodb/client.repository";
import { InjectModel } from "@nestjs/mongoose";
import { Client } from "../domain/model/document/client.document";
import { Model, Types } from "mongoose";
import { BusinessServiceImpl } from "src/plugins/business/application/business-service.impl";
import { IdentificationDocumentDTO } from "@core/domain/identification-document.dto";


@Injectable()
export class ClientRepositoryImpl implements ClientRepository {

    constructor(
        @InjectModel(Client.name) private clientModel: Model<Client>,
        private businessService: BusinessServiceImpl,
    ) { }

    async save(client: Client): Promise<Client> {
        const newClient = new this.clientModel(client);
        return await newClient.save();
    }

    async update(client: Client): Promise<Client> {
        return await this.clientModel.findByIdAndUpdate(client._id, client, { new: true }).exec();
    }

    async delete(id: string): Promise<void> {
        await this.clientModel.findByIdAndDelete(id).exec();
    }

    async findById(id: string): Promise<Client> {
        const currentBusiness = await this.businessService.getBusinessWorkingOn();
        return await this.clientModel.findOne({ _id: new Types.ObjectId(id), businessId: new Types.ObjectId(currentBusiness.id) }).exec();
    }

    async findByIdentification(identification: IdentificationDocumentDTO): Promise<Client> {
        const currentBusiness = await this.businessService.getBusinessWorkingOn();
        return await this.clientModel.findOne({ 'identification.value': identification.value, 'identification.type.id': identification.type.id, businessId: new Types.ObjectId(currentBusiness.id) }).exec();
    }
}