import { LoginServiceImpl } from "@login/application/login-service-impl";
import { UserSessionServiceImpl } from "@login/application/user-session-service.impl";
import { cookieConstants } from "@login/domain/constants";
import { SimpleLoginInDTO } from "@login/domain/model/dto/simple-login-in.dto";
import { SimpleLoginOutDTO } from "@login/domain/model/dto/simple-login-out.dto";
import { Body, Controller, Get, Post, Res, UsePipes, ValidationPipe } from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { Response } from 'express';
import { User } from "src/plugins/user/domain/model/document/user.document";
import { UserDTO } from "src/plugins/user/domain/model/dto/user.dto";

@Controller("login")
@ApiTags("login")
export class LoginController {

    constructor(
        private loginService: LoginServiceImpl,
        private userSession: UserSessionServiceImpl,
    ) { }

    @Post()
    @ApiOperation({ description: 'Inicia sesión' })
    @UsePipes(new ValidationPipe({ transform: true }))
    @ApiResponse({
        status: 200,
        description: 'Login exitoso',
        type: SimpleLoginOutDTO,
    })
    async simpleLogin(@Body() loginIn: SimpleLoginInDTO, @Res() response: Response): Promise<SimpleLoginOutDTO> {
        const simpleLoginOut = await this.loginService.simpleLogin(loginIn);
        response.cookie(cookieConstants.token, simpleLoginOut.token, {
            httpOnly: true, // La cookie no es accesible mediante JavaScript en el cliente
            sameSite: 'strict', // La cookie se envía solo para peticiones del mismo sitio
            secure: process.env.NODE_ENV === 'production', // En producción, envía la cookie solo sobre HTTPS
            maxAge: 3600000 // Tiempo de expiración de la cookie en milisegundos
        });
        response.send(simpleLoginOut);
        return simpleLoginOut;
    }

    @Get("getInfoUser")
    @ApiOperation({ description: 'get info user session' })
    @UsePipes(new ValidationPipe({ transform: true }))
    @ApiResponse({
        status: 200,
        description: 'Login exitoso',
        type: UserDTO,
    })
    async getInfoUser(): Promise<UserDTO> {
        return await this.userSession.getInfoUser();
    }

}