import { Body, Controller, Get, Post, Query, UsePipes, ValidationPipe } from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { SaleServiceImpl } from "../application/sale-service.impl";
import { SaleDTO } from "../domain/model/dto/sale.dto";
import { ResponseDTO } from "@core/domain/response.dto";
import { CreateSaleDTO } from "../domain/model/dto/create-sale.dto";
import { SalesConsultationOutDTO } from "../domain/model/dto/sales-consultation-out.dto";
import { SalesConsultationInDTO } from "../domain/model/dto/sales-consultation-in.dto";
import { SaleDetailDTO } from "../domain/model/dto/sale-detail/sale-detail.dto";

@Controller('sales')
@ApiTags('sales')
export class SaleController {

    constructor(
        private saleService: SaleServiceImpl,
    ) { }

    @Post()
    @ApiOperation({ description: 'Registra una venta.' })
    @UsePipes(new ValidationPipe({ transform: true }))
    @ApiResponse({
        status: 201,
        description: 'Venta creada con exito',
        type: ResponseDTO,
    })
    async registerSale(@Body() saleToRegister: CreateSaleDTO): Promise<ResponseDTO> {
        return await this.saleService.registerSale(saleToRegister);
    }

    @Get()
    @ApiOperation({ description: 'Obtiene todas las ventas.' })
    async findAll(): Promise<SaleDTO[]> {
        return await this.saleService.findAll();
    }


    @Post("/consultation")
    @ApiOperation({ description: 'Consulta las ventas' })
    @UsePipes(new ValidationPipe({ transform: true }))
    @ApiResponse({
        status: 200,
        description: 'Ventas recuperadas con exito',
        type: ResponseDTO,
    })
    async salesConsultation(@Body() salesConsultation: SalesConsultationInDTO): Promise<SalesConsultationOutDTO> {
        return await this.saleService.salesConsultation(salesConsultation)
    }

    @Get("/saleDetail")
    @ApiOperation({ description: 'Consulta el detalle de una venta' })
    @ApiResponse({
        status: 200,
        description: 'Detalle de venta recuperado con exito',
        type: ResponseDTO,
    })
    async findSalesDetailByIdSale(@Query('idSale') idSale: string): Promise<SaleDetailDTO> {
        return await this.saleService.findSalesDetailByIdSale(idSale);
    }

}