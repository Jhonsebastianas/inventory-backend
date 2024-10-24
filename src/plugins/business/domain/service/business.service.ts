import { ResponseDTO } from "@core/domain/response.dto";
import { BusinessRegisterDTO } from "../model/dto/business-register.dto";
import { BusinessDTO } from "../model/dto/business.dto";

export interface BusinessService {

    /**
     * Create a business and asociate to user.
     * @param { BusinessRegisterDTO } businessToRegister business to register
     */
    createBusiness(businessToRegister: BusinessRegisterDTO): Promise<ResponseDTO>;
    
    /**
     * find businesses by owner id
     * 
     * @param ownerId owner id
     */
    findBusinessByOwnerId(ownerId: string): Promise<BusinessDTO>;

    /**
     * Get business Working on the user.
     */
    getBusinessWorkingOn(): Promise<BusinessDTO>;
}