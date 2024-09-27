import { ResponseRedirectDTO } from "@core/domain/response-redirect.dto";
import { EncryptService } from "@core/encryption/encrypt.service";
import { FzUtil } from "@core/util/fz-util";
import { SimpleLoginInDTO } from "@login/domain/model/dto/simple-login-in.dto";
import { SimpleLoginOutDTO, SimpleLoginOutDTOBuilder } from "@login/domain/model/dto/simple-login-out.dto";
import { UserTokenDTO } from "@login/domain/model/dto/user-token.dto";
import { LoginService } from "@login/domain/service/login.service";
import { ForbiddenException, Injectable, UnauthorizedException } from "@nestjs/common";
import { UserServiceImpl } from "src/plugins/user/application/user-service.impl";
import { TokenServiceImpl } from "./token-service.impl";
import { UserDTO } from "src/plugins/user/domain/model/dto/user.dto";

@Injectable()
export class LoginServiceImpl implements LoginService {

    constructor(
        private userService: UserServiceImpl,
        private tokenService: TokenServiceImpl,
    ) { }

    activateJWTaccount(token: string): Promise<ResponseRedirectDTO> {
        throw new Error("Method not implemented.");
    }

    async simpleLogin(simpleLogin: SimpleLoginInDTO): Promise<SimpleLoginOutDTO> {
        const user: UserDTO = await this.userService.findByUsername(simpleLogin.username);
        if (FzUtil.isEmptyNull(user)) {
            throw new UnauthorizedException("Usuario o contraseña incorrecto.");
        }

        if (!await EncryptService.verify(user.password, simpleLogin.password)) {
            throw new UnauthorizedException("Usuario o contraseña incorrecto.");
        }

        // if (!user.active) {
        //     throw new ForbiddenException('Aún no has activado tu cuenta');
        // }

        const userToken = new UserTokenDTO();
        userToken.id = user._id;
        userToken.username = user.username;
        userToken.grants = [];
        
        const token: string = this.tokenService.create({ ...userToken });

        return new SimpleLoginOutDTOBuilder()
            .whitNames(user.names)
            .whitGrants(userToken.grants)
            .whitToken(token)
            .build();
    }

    retrieveJWTaccount(token: string): Promise<ResponseRedirectDTO> {
        throw new Error("Method not implemented.");
    }

    retrieveAccountBySMS(smsCode: string): Promise<any> {
        throw new Error("Method not implemented.");
    }

}