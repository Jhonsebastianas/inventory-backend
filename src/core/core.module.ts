import { MongooseModule } from "@nestjs/mongoose";
import { Counter, CounterSchema } from "./domain/model/document/counter.document";
import { Module } from "@nestjs/common";
import { CounterServiceImpl } from "./application/counter-service.impl";

const documents = [
    { name: Counter.name, schema: CounterSchema },
];

const repositories = [
];

const services = [
    CounterServiceImpl,
];

const controllers = [
];

@Module({
    imports: [
        MongooseModule.forFeature(documents),
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
export class CoreModule { }