import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { User, UserSchema } from "./domain/model/document/user.document";
import { UserRepositoryImpl } from "./application/user-mongo-repository.impl";
import { RegisterUserController } from "./infrastructure/register-user.controller";
import { UserServiceImpl } from "./application/user-service.impl";

const documents = [
    { name: User.name, schema: UserSchema },
];

const repositories = [
    UserRepositoryImpl,
];

const services = [
    UserServiceImpl,
];

const controllers = [
    RegisterUserController,
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
export class UserModule { }