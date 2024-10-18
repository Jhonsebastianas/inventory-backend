import { cookieConstants } from '@login/domain/constants';
import { UserTokenDTO } from '@login/domain/model/dto/user-token.dto';
import { Injectable, Scope, Inject } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';

@Injectable({ scope: Scope.REQUEST })
export class TokenContext {
    constructor(@Inject(REQUEST) private request: Request) { }

    get tokenUser(): string {
        if (this.request.cookies[cookieConstants.token]) {
            return this.request.cookies[cookieConstants.token];
        }
        const authHeader = this.request.headers['authorization'];
        if (authHeader && authHeader.startsWith('Bearer ')) {
            return authHeader.split(' ')[1];  // Retorna el token sin el "Bearer "
        }
        return null;
    }
}