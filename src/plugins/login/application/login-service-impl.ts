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
import { ResponseDTO, ResponseDtoBuilder } from "@core/domain/response.dto";
import { OtpCodeServiceImpl } from "./otp-code-service.impl";
import { RecoverAccountInDTO } from "@login/domain/model/dto/recover-account-in.dto";
import { RecoverAccountOutDTO } from "@login/domain/model/dto/recover-account-out.dto";
import { EmailServiceImpl } from "src/plugins/notification/application/email-service.impl";
import { SendEmailDTO, SendEmailDTOBuilder } from "src/plugins/notification/domain/model/dto/send-email.dto";
import { EmailParametersBuilder } from "src/plugins/notification/domain/model/dto/email-parameters.dto";
import { ChangePasswordDTO } from "@login/domain/model/dto/change-password.dto";

@Injectable()
export class LoginServiceImpl implements LoginService {

    constructor(
        private userService: UserServiceImpl,
        private otpCodeService: OtpCodeServiceImpl,
        private tokenService: TokenServiceImpl,
        private emailService: EmailServiceImpl,
    ) { }

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

    async sendVerificationCodeRecoverAccount(recoverAccountInfo: RecoverAccountInDTO): Promise<ResponseDTO> {
        const user: UserDTO = await this.userService.findByEmail(recoverAccountInfo.email);
        if (user == null) {
            throw new UnauthorizedException("Correo electrónico incorrecto.");
        }
        const otpCode = await this.otpCodeService.generateOtp(user._id);

        const sendEmailDTO: SendEmailDTO = new SendEmailDTOBuilder()
            .withRecipientEmails([recoverAccountInfo.email])
            .withParameters(new EmailParametersBuilder()
                .withEmail(recoverAccountInfo.email)
                .withUserNames(user.names)
                .withOtpCode(otpCode.code)
                .build()
            )
            .build();
        await this.emailService.sendRecoverAccountMail(sendEmailDTO);

        const tokenUser = this.tokenService.create(user._id);
        const outInfo = new RecoverAccountOutDTO();
        outInfo.token = tokenUser;
        outInfo.email = recoverAccountInfo.email;

        return new ResponseDtoBuilder()
            .ok()
            .whitData(outInfo)
            .whitMessage("Código de verificación enviado al correo " + recoverAccountInfo.email)
            .build();
    }

    async verifyRecoveryCode(recoverAccount: RecoverAccountOutDTO): Promise<ResponseDTO> {
        const idUser = this.tokenService.getIdUserByToken(recoverAccount.token);
        const user: UserDTO = await this.userService.findById(idUser);

        if (user == null) {
            throw new UnauthorizedException("Correo electrónico incorrecto.");
        }

        if (user.contact.email != recoverAccount.email) {
            throw new UnauthorizedException("Correo electrónico incorrecto.");
        }

        const isCodeOk: boolean = await this.otpCodeService.verifyOtp(idUser, recoverAccount.code);

        if (!isCodeOk) {
            throw new UnauthorizedException("Código de verifiación incorrecto");
        }

        return new ResponseDtoBuilder()
            .ok()
            .whitData(recoverAccount)
            .whitMessage("Código de verificación confirmado")
            .build();
    }

    async changePasswordRecoverAccount(changePassword: ChangePasswordDTO): Promise<ResponseDTO> {
        const idUser = this.tokenService.getIdUserByToken(changePassword.token);
        const user: UserDTO = await this.userService.findById(idUser);

        if (user == null) {
            throw new UnauthorizedException("Correo electrónico incorrecto.");
        }

        if (user.contact.email != changePassword.email) {
            throw new UnauthorizedException("Correo electrónico incorrecto.");
        }

        await this.userService.changePassword(idUser, changePassword.newPassword);

        return new ResponseDtoBuilder()
            .ok()
            .whitMessage("Contraseña cambiada con exito")
            .build();
    }

}