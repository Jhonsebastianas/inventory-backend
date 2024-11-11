import { Module } from "@nestjs/common";
import { LoginController } from "./infrastructure/login.controller";
import { LoginServiceImpl } from "./application/login-service-impl";
import { UserModule } from "../user/user.module";
import { TokenServiceImpl } from "./application/token-service.impl";
import { TokenContext } from "./infrastructure/token.context";
import { JwtModule, JwtService } from "@nestjs/jwt";
import { jwtConstants } from "./domain/constants";
import { UserSessionServiceImpl } from "./application/user-session-service.impl";
import { OtpCode, OtpCodeSchema } from "./domain/model/document/otp-code.document";
import { MongooseModule } from "@nestjs/mongoose";
import { OtpCodeRepositoryImpl } from "./application/otp-code-mongo-repository.impl";
import { OtpCodeServiceImpl } from "./application/otp-code-service.impl";
import { NotificationModule } from "../notification/notification.module";

const documents = [
    { name: OtpCode.name, schema: OtpCodeSchema },
];

const dependencies = [
    UserModule,
    NotificationModule,
    JwtModule.register({
        global: true,
        secret: jwtConstants.secret,
        // signOptions: { expiresIn: '60s' },
      }),
    MongooseModule.forFeature(documents),
];

const repositories = [
    OtpCodeRepositoryImpl,
];

const services = [
    // JwtService,
    TokenContext,
    TokenServiceImpl,
    LoginServiceImpl,
    UserSessionServiceImpl,
    OtpCodeServiceImpl,
];

const controllers = [
    LoginController,
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
export class LoginModule { }