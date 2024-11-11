import { OtpCode } from "@login/domain/model/document/otp-code.document";
import { OtpCodeService } from "@login/domain/service/otp-code.service";
import { Injectable } from "@nestjs/common";
import { OtpCodeRepositoryImpl } from "./otp-code-mongo-repository.impl";


@Injectable()
export class OtpCodeServiceImpl implements OtpCodeService {

    constructor(
        private otpCodeRepository: OtpCodeRepositoryImpl,
    ) { }

    async generateOtp(userId: string): Promise<OtpCode> {
        const otp = this.generateOTP().toString();
        const newOtp = new OtpCode();
        newOtp.code = otp;
        newOtp.userId = userId;
        await this.otpCodeRepository.save(newOtp);
        return newOtp;
    }

    async verifyOtp(userId: string, code: string): Promise<boolean> {
        const otpRecord = await this.otpCodeRepository.findByCodeAndUserId(code, userId);
        if (!otpRecord) {
          return false; // OTP no encontrado o ya expirado
        }
        await this.otpCodeRepository.delete(otpRecord._id.toString()); // Elimina el OTP después de verificarlo
        return true; // OTP válido
    }


    generateOTP(): number {
        const randomNum = Math.random() * 9000
        return Math.floor(1000 + randomNum)
    }

}