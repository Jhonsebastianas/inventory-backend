import { Body, Controller, Get, Post } from "@nestjs/common";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { BusinessServiceImpl } from "../application/business-service.impl";
import { BusinessRegisterDTO } from "../domain/model/dto/business-register.dto";
import { ResponseDTO } from "@core/domain/response.dto";
import { BusinessDTO } from "../domain/model/dto/business.dto";


@Controller('business')
@ApiTags('business')
export class BusinessController {

    constructor(
        private businessService: BusinessServiceImpl,
    ) { }

    @Post()
    @ApiOperation({ description: 'Registra un nuevo producto.' })
    async registerProduct(@Body() businessToRegister: BusinessRegisterDTO): Promise<ResponseDTO> {
        return await this.businessService.createBusiness(businessToRegister)
    }

    @Get('getBusinessWorkingOn')
    @ApiOperation({ description: 'Obtiene un producto por su ID.' })
    async getBusinessWorkingOn(): Promise<BusinessDTO> {
        return await this.businessService.getBusinessWorkingOn();
    }

}