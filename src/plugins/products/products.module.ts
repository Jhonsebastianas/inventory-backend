import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Product, ProductSchema } from "./domain/model/document/product.document";
import { ProductRepositoryImpl } from "./application/product-mongo-repository.impl";
import { ProductServiceImpl } from "./application/product-service.impl";
import { ProductController } from "./infrastructure/product.controller";

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
    imports: [MongooseModule.forFeature(documents)],
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