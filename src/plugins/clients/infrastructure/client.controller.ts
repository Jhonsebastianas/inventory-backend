import { Body, Controller, Get, Post, Query } from "@nestjs/common";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { RegisterClientInDTO } from "../domain/model/dto/register-client-in.dto";
import { ResponseDTO } from "@core/domain/response.dto";
import { ClientServiceImpl } from "../application/client-service.impl";
import { ClientDTO } from "../domain/model/dto/client.dto";


@Controller('clients')
@ApiTags('clients')
export class ClientController {

    constructor(
        private clientService: ClientServiceImpl,
    ) { }

    @Post()
    @ApiOperation({ description: 'Registra un nuevo cliente.' })
    async registerClient(@Body() registerClientDTO: RegisterClientInDTO): Promise<ResponseDTO> {
        return await this.clientService.registerClient(registerClientDTO);
    }

    @Get('/findClientByIdentification')
    @ApiOperation({ description: 'Obtiene un cliente por su identificación.' })
    async findClientByIdentification(@Query('idType') idType: string, @Query('numberIdentification') numberIdentification: string): Promise<ClientDTO> {
        return await this.clientService.findClientByIdentification(idType, numberIdentification);
    }
}