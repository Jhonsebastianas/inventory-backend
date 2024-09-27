import { Module } from "@nestjs/common";
import { LoginController } from "./infrastructure/login.controller";
import { LoginServiceImpl } from "./application/login-service-impl";
import { UserModule } from "../user/user.module";
import { TokenServiceImpl } from "./application/token-service.impl";
import { TokenContext } from "./infrastructure/token.context";
import { JwtModule, JwtService } from "@nestjs/jwt";
import { jwtConstants } from "./domain/constants";
import { UserSessionServiceImpl } from "./application/user-session-service.impl";

const dependencies = [
    UserModule,
    JwtModule.register({
        global: true,
        secret: jwtConstants.secret,
        // signOptions: { expiresIn: '60s' },
      }),
];

const documents = [];

const repositories = [];

const services = [
    // JwtService,
    TokenContext,
    TokenServiceImpl,
    LoginServiceImpl,
    UserSessionServiceImpl,
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