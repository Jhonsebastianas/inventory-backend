import { Types } from "mongoose";
import { File } from "../../../model/document/file.document";
import { FileDTO } from "../../../model/dto/file.dto";

export class FileMapper {

    static mapToFileDTO(file: File): FileDTO {
        const fileDTO = new FileDTO();
        fileDTO.id = file._id.toString();
        fileDTO.data = file.data.toString("base64");
        fileDTO.extension = file.extension;
        fileDTO.filename = file.filename;
        fileDTO.mimetype = file.mimetype;
        fileDTO.size = file.size;
        return fileDTO;
    }
    
    static mapToFile(fileDTO: FileDTO): File {
        const file = new File();
        file._id = new Types.ObjectId(fileDTO.id);
        file.data = new Buffer(fileDTO.data, "base64");
        file.extension = fileDTO.extension;
        file.filename = fileDTO.filename;
        file.mimetype = fileDTO.mimetype;
        file.size = fileDTO.size;
        return file;
    }

}  