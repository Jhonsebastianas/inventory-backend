import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { BusinessModule } from "../business/business.module";
import { Client, ClientSchema } from "./domain/model/document/client.document";
import { ClientRepositoryImpl } from "./application/client-mongo-repository.impl";
import { ClientServiceImpl } from "./application/client-service.impl";
import { ClientController } from "./infrastructure/client.controller";

const documents = [
    { name: Client.name, schema: ClientSchema },
];

const repositories = [
    ClientRepositoryImpl,
];

const services = [
    ClientServiceImpl,
];

const controllers = [
    ClientController,
];

@Module({
    imports: [
        MongooseModule.forFeature(documents),
        BusinessModule,
    ],
    controllers,
    providers: [
        ...repositories,
        ...services,
    ],
    exports: [
        ...repositories,
        ...services,
    ],
})
export class ClientsModule { }