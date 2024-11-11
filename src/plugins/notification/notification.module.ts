import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";

const documents = [

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
export class NotificationModule { }