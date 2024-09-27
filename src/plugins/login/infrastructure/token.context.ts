import { cookieConstants } from '@login/domain/constants';
import { UserTokenDTO } from '@login/domain/model/dto/user-token.dto';
import { Injectable, Scope, Inject } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';

@Injectable({ scope: Scope.REQUEST })
export class TokenContext {
    constructor(@Inject(REQUEST) private request: Request) { }

    get tokenUser(): string {
        return this.request.cookies[cookieConstants.token];
    }
}