import { Module } from "@nestjs/common";
import { UserModule } from "@user/user.module";
import { MongooseModule } from "@nestjs/mongoose";
import { MovementsFinancialRepositoryImpl } from "./application/movements-financial-repository.impl";
import { LoginModule } from "@login/login.module";
import { FinancialController } from "./infrastructure/financial.controller";
import { SalesModule } from "../sales/sales.module";
import { FinancialServiceImpl } from "./application/financial-service.impl";
import { Sale, SaleSchema } from "../sales/domain/model/document/sale.document";
import { BusinessModule } from "../business/business.module";

const documents = [
    { name: Sale.name, schema: SaleSchema },
];

const dependencies = [
    SalesModule,
    UserModule,
    MongooseModule.forFeature(documents),
    LoginModule,
    BusinessModule,
];

const repositories = [
];

const services = [
    FinancialServiceImpl,
];

const controllers = [
    FinancialController,
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
export class FinancialModule { }