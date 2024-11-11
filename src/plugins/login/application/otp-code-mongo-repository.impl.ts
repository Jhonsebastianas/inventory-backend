import { Injectable } from "@nestjs/common";
import { OtpCode } from "../domain/model/document/otp-code.document";
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import { OtpCodeRepository } from "../domain/repository/mongodb/otp-code.repository";

@Injectable()
export class OtpCodeRepositoryImpl implements OtpCodeRepository {

    constructor(@InjectModel(OtpCode.name) private otpCodeModel: Model<OtpCode>) { }

    async save(otpCode: OtpCode): Promise<OtpCode> {
        const newOtpCode = new this.otpCodeModel(otpCode);
        return await newOtpCode.save();
    }
    
    async update(otpCode: OtpCode): Promise<OtpCode> {
        return await this.otpCodeModel.findByIdAndUpdate(otpCode._id, otpCode, { new: true }).exec();
    }
    
    async delete(id: string): Promise<void> {
        await this.otpCodeModel.findByIdAndDelete(id).exec();
    }
    
    async findById(id: string): Promise<OtpCode> {
        return await this.otpCodeModel.findById(id).exec();
    }
    
    async findByCodeAndUserId(code: string, userId: string): Promise<OtpCode> {
        return await this.otpCodeModel.findOne({ code, userId });
    }

}