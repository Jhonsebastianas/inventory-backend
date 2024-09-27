import { Module } from "@nestjs/common";
import { UserModule } from "@user/user.module";
import { MovementsFinancial, MovementsFinancialSchema } from "./domain/model/document/movements-financial.document";
import { MongooseModule } from "@nestjs/mongoose";
import { MovementsFinancialRepositoryImpl } from "./application/movements-financial-repository.impl";
import { MovementsFinancialServiceImpl } from "./application/movements-financial-service.impl";
import { MovementsFinancialController } from "./infrastructure/movements-financial.controller";
import { LoginModule } from "@login/login.module";

const documents = [
    { name: MovementsFinancial.name, schema: MovementsFinancialSchema }
];

const dependencies = [
    UserModule,
    MongooseModule.forFeature(documents),
    LoginModule,
];

const repositories = [
    MovementsFinancialRepositoryImpl,
];

const services = [
    MovementsFinancialServiceImpl,
];

const controllers = [
    MovementsFinancialController,
];

@Module({
    imports: [...dependencies],
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
export class FinancialRegisterModule { }