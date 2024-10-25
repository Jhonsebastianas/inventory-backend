import { Injectable, Logger } from "@nestjs/common";
import { BusinessService } from "../domain/service/business.service";
import { BusinessRepositoryImpl } from "./business-mongo-repository.impl";
import { ResponseDTO, ResponseDtoBuilder } from "@core/domain/response.dto";
import { BusinessRegisterDTO } from "../domain/model/dto/business-register.dto";
import { BusinessDTO } from "../domain/model/dto/business.dto";
import { BusinessMapper } from "../domain/repository/mapper/business.mapper";
import { TokenServiceImpl } from "@login/application/token-service.impl";
import { FzUtil } from "@core/util/fz-util";
import { UserTokenDTO } from "@login/domain/model/dto/user-token.dto";
import { Business } from "../domain/model/document/business.document";
import { Types } from "mongoose";
import { ConflictException } from "@core/exceptions/manager.exception";

@Injectable()
export class BusinessServiceImpl implements BusinessService {

    private readonly logger = new Logger(BusinessServiceImpl.name, { timestamp: true });

    constructor(
        private businessRepository: BusinessRepositoryImpl,
        private tokenService: TokenServiceImpl,
    ) { }

    async createBusiness(businessToRegister: BusinessRegisterDTO): Promise<ResponseDTO> {
        const ownerUser = this.tokenService.getUserByToken();
        const existinBusiness = await this.findBusinessByOwnerId(ownerUser.id);

        if (existinBusiness) {
            throw new ConflictException("Ya tienes un negocio registrado.");
        }

        const newBusiness = new Business();
        newBusiness.name = businessToRegister.name;
        newBusiness.active = true;
        newBusiness.ownerId = new Types.ObjectId(ownerUser.id);
        newBusiness.employeeId = [];

        await this.businessRepository.save(newBusiness);

        return new ResponseDtoBuilder().ok().whitMessage("Negocio registrado con éxito").build();
    }

    async findBusinessByOwnerId(ownerId: string): Promise<BusinessDTO> {
        return BusinessMapper.mapToBusinessDTO(await this.businessRepository.findByOwnerId(ownerId));
    }

    async getBusinessWorkingOn(): Promise<BusinessDTO> {
        const user: UserTokenDTO = this.tokenService.getUserByToken();
        const business = await this.findBusinessByOwnerId(user.id);
        if (business == null) {
            const employeBusinesses = await this.businessRepository.findByEmployeeId(user.id);
            return BusinessMapper.mapToBusinessDTO(employeBusinesses);
        }
        return business;
    }

}