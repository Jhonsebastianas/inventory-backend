import { ResponseDTO } from "@core/domain/response.dto";
import { UserRegisterDTO } from "../model/dto/user-register.dto";
import { UserDTO } from "../model/dto/user.dto";

export interface UserService {

    /**
     * Register a user to the application.
     * Created on 23/04/2024 at 11:35:00. <br>
     * 
     * @param userRegister user to register in the app.
     */
    registerUser(userRegister: UserRegisterDTO): Promise<ResponseDTO>;

    /**
     * find user by username.
     * Created on 24/04/2024 at 15:35:38. <br>
     * 
     * @param username user access
     */
    findByUsername(username: string): Promise<UserDTO>;

    /**
     * Find user by email.
     * @param email user email.
     */
    findByEmail(email: string): Promise<UserDTO>;
    
}