import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Business, BusinessSchema } from "./domain/model/document/business.document";
import { BusinessRepositoryImpl } from "./application/business-mongo-repository.impl";
import { LoginModule } from "@login/login.module";
import { BusinessServiceImpl } from "./application/business-service.impl";
import { BusinessController } from "./infrastructure/business.controller";

const documents = [
    { name: Business.name, schema: BusinessSchema },
];

const repositories = [
    BusinessRepositoryImpl,
];

const services = [
    BusinessServiceImpl,
];

const controllers = [
    BusinessController,
];

@Module({
    imports: [
        MongooseModule.forFeature(documents),
        LoginModule,
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
export class BusinessModule { }