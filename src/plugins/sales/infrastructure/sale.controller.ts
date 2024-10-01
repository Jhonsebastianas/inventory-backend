import { Body, Controller, Get, Post, UsePipes, ValidationPipe } from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { SaleServiceImpl } from "../application/sale-service.impl";
import { SaleDTO } from "../domain/model/dto/sale.dto";
import { ResponseDTO } from "@core/domain/response.dto";
import { CreateSaleDTO } from "../domain/model/dto/create-sale.dto";


@Controller('sales')
@ApiTags('sales')
export class SaleController {

    constructor(
        private saleService: SaleServiceImpl,
    ) { }


    // {
    //     "products": [
    //       {
    //          "id": "66f62d34536e81bd5157b149",
    //          "name": "Tornillo",
    //          "price": 500.0,
    //          "quantity": 2
    //       }
    //     ],
    //     "paymentMethods": [
    //       {
    //          "type": "Efectivo",
    //          "amount": 1000.0
    //       }
    //     ]
    //   }

    @Post()
    @ApiOperation({ description: 'Registra una venta.' })
    @UsePipes(new ValidationPipe({ transform: true }))
    @ApiResponse({
        status: 201,
        description: 'Venta creada con exito',
        type: ResponseDTO,
    })
    async registerProduct(@Body() saleToRegister: CreateSaleDTO): Promise<ResponseDTO> {
        return await this.saleService.registerSale(saleToRegister);
    }

    @Get()
    @ApiOperation({ description: 'Obtiene todas las ventas.' })
    async findAll(): Promise<SaleDTO[]> {
        return await this.saleService.findAll();
    }

}