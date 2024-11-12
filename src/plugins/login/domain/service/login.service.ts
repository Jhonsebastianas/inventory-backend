import { ResponseRedirectDTO } from "@core/domain/response-redirect.dto";
import { ResponseDTO } from "@core/domain/response.dto";
import { SimpleLoginInDTO } from "@login/domain/model/dto/simple-login-in.dto";
import { SimpleLoginOutDTO } from "@login/domain/model/dto/simple-login-out.dto";
import { RecoverAccountInDTO } from "../model/dto/recover-account-in.dto";
import { RecoverAccountOutDTO } from "../model/dto/recover-account-out.dto";
import { ChangePasswordDTO } from "../model/dto/change-password.dto";

export interface LoginService {

    /**
     * Method in charge of logging into the application.
     * Created on 22/04/2024 at 06:38:16. <br>
     * 
     * @param { SimpleLoginInDTO } simpleLogin simple login information.
     */
    simpleLogin(simpleLogin: SimpleLoginInDTO): Promise<SimpleLoginOutDTO>;


    // https://docs.nestjs.com/security/authentication

    /**
     * Send verification code to recover account.
     * Created on date 11/11/2024 at 16:17:22. <br>
     * 
     * @param { RecoverAccountInDTO } recoverAccountInfo email of user to recover account
     */
    sendVerificationCodeRecoverAccount(recoverAccountInfo: RecoverAccountInDTO): Promise<ResponseDTO>;

    /**
     * Verify recovery code.
     * 
     * @param recoverAccount token and userId to recover
     */
    verifyRecoveryCode(recoverAccount: RecoverAccountOutDTO): Promise<ResponseDTO>;

    /**
     * 
     * @param changePassword change password info
     */
    changePasswordRecoverAccount(changePassword: ChangePasswordDTO): Promise<ResponseDTO>;
}