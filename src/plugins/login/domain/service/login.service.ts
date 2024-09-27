import { ResponseRedirectDTO } from "@core/domain/response-redirect.dto";
import { SimpleLoginInDTO } from "@login/domain/model/dto/simple-login-in.dto";
import { SimpleLoginOutDTO } from "@login/domain/model/dto/simple-login-out.dto";

export interface LoginService {

    /**
     * Method in charge of activating the account through JWT.
     * Created on 22/04/2024 at 06:36:10. <br>
     * 
     * @param { string } token JWT token containing user information.
     */
    activateJWTaccount(token: string): Promise<ResponseRedirectDTO>;

    /**
     * Method in charge of logging into the application.
     * Created on 22/04/2024 at 06:38:16. <br>
     * 
     * @param { SimpleLoginInDTO } simpleLogin simple login information.
     */
    simpleLogin(simpleLogin: SimpleLoginInDTO): Promise<SimpleLoginOutDTO>;

    /**
     * Method for recovering a user's account by token.
     * Created on 22/04/2024 at 06:41:00. <br>
     * 
     * @param { string } oken JWT token containing user information.
     */
    retrieveJWTaccount(token: string): Promise<ResponseRedirectDTO>;

    /**
     * Method for account recovery via SMS message.
     * Created on 22/04/2024 at 06:45:49. <br>
     * 
     * @param smsCode SMS code sent by the user
     */
    retrieveAccountBySMS(smsCode: string): Promise<any>;
    // https://www.npmjs.com/package/@prymejo/nestjs-sms-and-email-module


    // https://docs.nestjs.com/security/authentication
}