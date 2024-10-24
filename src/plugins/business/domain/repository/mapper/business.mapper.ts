import { Types } from "mongoose";
import { Business } from "../../model/document/business.document";
import { BusinessDTO } from "../../model/dto/business.dto";

export class BusinessMapper {

    static mapToBusinessDTO(business: Business): BusinessDTO {
        if (business == null) {
            return null;
        }
        const businessDTO = new BusinessDTO();
        businessDTO.id = business._id.toString();
        businessDTO.active = business.active;
        businessDTO.employeeId = business.employeeId.flatMap(id => id.toString());
        businessDTO.name = business.name;
        businessDTO.ownerId = business.ownerId.toString();
        return businessDTO;
    }

    static mapToBusiness(businessDTO: BusinessDTO): Business {
        if (businessDTO == null) {
            return null;
        }
        const business = new Business();
        business._id = new Types.ObjectId(businessDTO?.id);
        business.active = businessDTO.active;
        business.employeeId = businessDTO.employeeId.flatMap(id => new Types.ObjectId(id));
        business.name = businessDTO.name;
        business.ownerId = new Types.ObjectId(businessDTO.ownerId);
        return business;
    }

}  