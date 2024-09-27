import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Sale, SaleSchema } from "./domain/model/document/sale.document";

const documents = [
    { name: Sale.name, schema: SaleSchema },
];

const repositories = [
    
];

const services = [
    
];

const controllers = [
    
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
export class SalesModule { }