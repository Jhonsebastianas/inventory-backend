import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Product, ProductSchema } from "./domain/model/document/product.document";
import { ProductRepositoryImpl } from "./application/product-mongo-repository.impl";
import { ProductServiceImpl } from "./application/product-service.impl";
import { ProductController } from "./infrastructure/product.controller";
import { BusinessModule } from "../business/business.module";
import { UserModule } from "@user/user.module";
import { NotificationModule } from "../notification/notification.module";

const documents = [
    { name: Product.name, schema: ProductSchema },
];

const repositories = [
    ProductRepositoryImpl,
];

const services = [
    ProductServiceImpl,
];

const controllers = [
    ProductController,
];

@Module({
    imports: [
        MongooseModule.forFeature(documents),
        UserModule,
        BusinessModule,
        NotificationModule,
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
export class ProductsModule { }