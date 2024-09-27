import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';

@Schema({ collection: 'files', timestamps: true })
export class File {
  _id: Types.ObjectId;

  @Prop({ required: true })
  filename: string;

  @Prop({ required: true })
  mimetype: string;

  @Prop({ required: true })
  size: number;

  @Prop({ required: true })
  data: Buffer; // Para almacenar el archivo como BSON (binario)

  @Prop({ required: true, name: 'upload_date' })
  uploadDate: Date;

  @Prop({ required: false })
  extension: string;
}

export const FileSchema = SchemaFactory.createForClass(File);
export type FileDocument = File & Document;
