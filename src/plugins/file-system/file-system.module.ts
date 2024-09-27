import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { File, FileSchema } from "./domain/model/document/file.document";
import { FileRepositoryImpl } from "./application/file-mongo-repository";

const documents = [
    { name: File.name, schema: FileSchema },
];

const repositories = [
    FileRepositoryImpl
];

const services = [
    
];

const controllers = [
    
];

@Module({
    imports: [MongooseModule.forFeature(documents)],
    controllers,
    providers: [
        ...repositories,
        ...services,
    ],
    exports: [
        ...repositories,
        ...services,
    ],
})
export class FileSystemModule { }