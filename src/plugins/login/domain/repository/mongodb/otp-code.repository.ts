import { OtpCode } from "@login/domain/model/document/otp-code.document";


/**
 * Interface in charge of defining the methods for the entity's data layer. <br>
 * Created on date 11/11/2024 at 14:35:00. <br>
 *
 * @author <a href="https://www.jhonsebastianas.com/">Sebastian Agudelo</a></br>
 */
export interface OtpCodeRepository {

    /**
     * Method in charge of inserting a record in the OtpCode entity <br>
     * Created on date 11/11/2024 at 14:35:00. <br>
     *
     * @author <a href="https://www.jhonsebastianas.com/">Sebastian Agudelo</a></br>
     * @param { OtpCode } otpCode
    */
    save(otpCode: OtpCode): Promise<OtpCode>;

    /**
     * Method in charge of updating a record in the OtpCode entity. <br>
     * Created on date 11/11/2024 at 14:35:00. <br>
     *
     * @author <a href="https://www.jhonsebastianas.com/">Sebastian Agudelo</a></br>
     * @param { OtpCode } otpCode
    */
    update(otpCode: OtpCode): Promise<OtpCode>;

    /**
     * Method in charge of deleting a record in the OtpCode entity <br>
     * Created on date 11/11/2024 at 14:35:00. <br>
     *
     * @author <a href="https://www.jhonsebastianas.com/">Sebastian Agudelo</a></br>
     * @param { string } id
    */
    delete(id: string): Promise<void>;

    /**
     * Method in charge of finding a record in the OtpCode entity by its Id. <br>
     * Created on date 11/11/2024 at 14:35:00. <br>
     *
     * @author <a href="https://www.jhonsebastianas.com/">Sebastian Agudelo</a></br>
     * @param { string } id
     * @return
    */
    findById(id: string): Promise<OtpCode>;

    /**
     * Find otp code by code and userId
     * Created on date 11/11/2024 at 14:36:56. <br>
     * 
     * @param code verification code
     * @param userId identifier of user
     */
    findByCodeAndUserId(code: string, userId: string): Promise<OtpCode>;

    /**
     * Find otp code by userId
     * Created on date 11/11/2024 at 16:46:52. <br>
     * 
     * @param userId identifier of user
     */
    findByUserId(userId: string): Promise<OtpCode>;

}