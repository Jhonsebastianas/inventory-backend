import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Sale, SaleSchema } from "./domain/model/document/sale.document";
import { SaleRepositoryImpl } from "./application/sale-mongo-repository.impl";
import { SaleServiceImpl } from "./application/sale-service.impl";
import { SaleController } from "./infrastructure/sale.controller";
import { LoginModule } from "@login/login.module";
import { ProductsModule } from "../products/products.module";
import { BusinessModule } from "../business/business.module";
import { ClientsModule } from "../clients/clients.module";
import { CoreModule } from "@core/core.module";
import { UserModule } from "@user/user.module";

const documents = [
    { name: Sale.name, schema: SaleSchema },
];

const repositories = [
    SaleRepositoryImpl,
];

const services = [
    SaleServiceImpl,
];

const controllers = [
    SaleController,
];

@Module({
    imports: [
        MongooseModule.forFeature(documents),
        CoreModule,
        LoginModule,
        UserModule,
        BusinessModule,
        ProductsModule,
        ClientsModule,
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
export class SalesModule { }