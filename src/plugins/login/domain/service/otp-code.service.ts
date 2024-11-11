import { OtpCode } from "../model/document/otp-code.document";

export interface OtpCodeService {

    /**
     * Generate OTP code for user
     * Created on date 11/11/2024 at 14:48:37. <br>
     * 
     * @param userId user identification
     */
    generateOtp(userId: string): Promise<OtpCode>;

    /**
     * Verify OTP code by user
     * Created on date 11/11/2024 at 14:48:37. <br>
     * @param userId userIdentifier
     * @param code code of OTP
     */
    verifyOtp(userId: string, code: string): Promise<boolean>
} 