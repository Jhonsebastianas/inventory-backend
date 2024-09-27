import { Types } from "mongoose";
import { User, UserDocument } from "../../../model/document/user.document";
import { UserDTO } from "../../../model/dto/user.dto";

export class UserMapper {

    static mapToUserDTO(user: User): UserDTO {
        const userDTO = new UserDTO();
        userDTO._id = user._id.toString();
        userDTO.names = user.names;
        userDTO.active = user.active;
        userDTO.password = user.password;
        userDTO.username = user.username;
        return userDTO;
    }

    static mapToUser(userDTO: UserDTO): User {
        const user = new User();
        user._id = new Types.ObjectId(userDTO._id);
        user.active = userDTO.active;
        user.names = userDTO.names;
        user.password = userDTO.password;
        user.username = userDTO.username;
        return user;
    }

}  