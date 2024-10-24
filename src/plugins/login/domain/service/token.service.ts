import { ExecutionContext } from "@nestjs/common";
import { UserTokenDTO } from "../model/dto/user-token.dto";

export interface TokenService {

    create(payload: any, options: any): any;

    verify(token: any): any;

    getUserByToken(token: string): UserTokenDTO;
    
}