import { UserDTO } from "src/plugins/user/domain/model/dto/user.dto";

export interface UserSessionService {
    /**
     * Get info user by cookie ses
     */
    getInfoUser(): Promise<UserDTO>;

    /**
     * get idUser from cookie header.
     */
    getIdUser(): Promise<string>;
}