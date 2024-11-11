import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ collection: "otp_code" })
export class OtpCode extends Document {

    _id: Types.ObjectId;

    @Prop({ required: true })
    code: string;

    @Prop({ type: String, ref: 'User', required: true })
    userId: string;

    // Este campo se usará para eliminar automáticamente el documento
    @Prop({ default: Date.now, expires: '5m' })
    createdAt: Date;
}

export const OtpCodeSchema = SchemaFactory.createForClass(OtpCode);
export type OtpCodeDocument = OtpCode & Document;

