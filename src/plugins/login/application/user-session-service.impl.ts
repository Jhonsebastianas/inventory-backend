import { UserSessionService } from "@login/domain/service/user-session.service";
import { Injectable } from "@nestjs/common";
import { UserServiceImpl } from "src/plugins/user/application/user-service.impl";
import { UserDTO } from "src/plugins/user/domain/model/dto/user.dto";
import { TokenServiceImpl } from "./token-service.impl";
import { UserTokenDTO } from "@login/domain/model/dto/user-token.dto";

@Injectable()
export class UserSessionServiceImpl implements UserSessionService {

    constructor(
        private userService: UserServiceImpl,
        private tokenService: TokenServiceImpl,
    ) { }

    async getIdUser(): Promise<string> {
        const userToken: UserTokenDTO = this.tokenService.getUserByToken();
        return userToken.id;
    }

    async getInfoUser(): Promise<UserDTO> {
        const userToken: UserTokenDTO = this.tokenService.getUserByToken();
        return await this.userService.findByUsername(userToken.username);
    }

}