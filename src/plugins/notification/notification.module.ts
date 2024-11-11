import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { EmailServiceImpl } from "./application/email-service.impl";

const documents = [

];

const repositories = [

];

const services = [
    EmailServiceImpl,
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