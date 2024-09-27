import { AuthException } from "@core/exceptions/manager.exception";
import { UserTokenDTO } from "@login/domain/model/dto/user-token.dto";
import { TokenService } from "@login/domain/service/token.service";
import { TokenContext } from "@login/infrastructure/token.context";
import { ExecutionContext, Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class TokenServiceImpl implements TokenService {

    constructor(private tokenContext: TokenContext, private jwtService: JwtService) {}

    create(payload: any, options?: any): string {
        return this.jwtService.sign(payload, options);
    }

    verify(token: any) {
        try {
            return this.jwtService.verify(token);
        } catch (error) {
            throw new AuthException("El usuario no se encuentra autorizado para ingresar al sistema.");
        }
    }

    getUserByToken(): UserTokenDTO {
        const token = this.tokenContext.tokenUser;
        return this.verify(token);
    }

    getUserByContext(context: ExecutionContext): UserTokenDTO {
        throw new Error("Method not implemented.");
    }

}