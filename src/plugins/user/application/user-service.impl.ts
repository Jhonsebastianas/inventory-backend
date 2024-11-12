import { Injectable } from "@nestjs/common";
import { UserService } from "../domain/service/user.service";
import { ResponseDTO, ResponseDtoBuilder } from "@core/domain/response.dto";
import { UserRegisterDTO } from "../domain/model/dto/user-register.dto";
import { UserRepositoryImpl } from "./user-mongo-repository.impl";
import { User } from "../domain/model/document/user.document";
import { EncryptService } from "@core/encryption/encrypt.service";
import { ConflictException, UnexpectedException } from "@core/exceptions/manager.exception";
import { UserDTO } from "../domain/model/dto/user.dto";
import { UserMapper } from "../domain/repository/internal/mapper/user.mapper";

@Injectable()
export class UserServiceImpl implements UserService {

    constructor(
        private userMongoRepository: UserRepositoryImpl,
    ) { }
    
    async registerUser(userRegister: UserRegisterDTO): Promise<ResponseDTO> {
        const user: User = await this.userMongoRepository.findByUsername(userRegister.username);

        if (user != null) {
            if (!user.active) {
                throw new ConflictException("A la espera de la activación de la cuenta, vaya a la sección de activación de cuenta.");
            }
            throw new ConflictException("El usuario está actualmente conectado al sistema, por favor vaya a la sección de inicio de sesión.");
        }
        // cifrado de la información.
        let claveEncriptada: string;
        try {
            claveEncriptada = await EncryptService.encrypt(userRegister.password);
        } catch (error) {
            throw new UnexpectedException("No fue posible encriptar la clave", error);
        }

        const newUser = new User();
        newUser.names = userRegister.names;
        newUser.password = claveEncriptada;
        newUser.username = userRegister.username;
        newUser.contact = userRegister.contact;
        await this.userMongoRepository.save(newUser);
        return new ResponseDtoBuilder().ok().whitMessage("Usuario registrado con éxito").build();
    }

    async changePassword(userId: string, newPassword: string): Promise<void> {
        let newEncryptedPassword: string;
        try {
            newEncryptedPassword = await EncryptService.encrypt(newPassword);
        } catch (error) {
            throw new UnexpectedException("No fue posible encriptar la clave", error);
        }
        const user = await this.userMongoRepository.findById(userId);
        user.password = newEncryptedPassword;
        await this.userMongoRepository.update(user);
    }

    async findById(id: string): Promise<UserDTO> {
        return UserMapper.mapToUserDTO(await this.userMongoRepository.findById(id));
    }

    async findByUsername(username: string): Promise<UserDTO> {
        return UserMapper.mapToUserDTO(await this.userMongoRepository.findByUsername(username));
    }

    async findByEmail(email: string): Promise<UserDTO> {
        return UserMapper.mapToUserDTO(await this.userMongoRepository.findByEmail(email));
    }

}