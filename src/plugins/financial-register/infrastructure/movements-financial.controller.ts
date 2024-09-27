import { ResponseDTO } from "@core/domain/response.dto";
import { MovementsFinancialServiceImpl } from "@financial-register/application/movements-financial-service.impl";
import { ExpenseDTO } from "@financial-register/domain/model/dto/expense.dto";
import { IncomeDTO } from "@financial-register/domain/model/dto/income.dto";
import { Body, Controller, Post, UsePipes, ValidationPipe } from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";


@Controller("movements")
@ApiTags("movements")
export class MovementsFinancialController {
    
    constructor(
        private movementsFinancialService: MovementsFinancialServiceImpl,
    ) {}

    @Post("/income")
    @ApiOperation({ description: 'Registrar ingreso' })
    @UsePipes(new ValidationPipe({ transform: true }))
    @ApiResponse({
        status: 200,
        description: 'Registro de ingreso exitoso',
        type: ResponseDTO,
    })
    async registerIncome(@Body() income: IncomeDTO): Promise<ResponseDTO> {
        return await this.movementsFinancialService.registerIncome(income);
    }

    @Post("/expense")
    @ApiOperation({ description: 'Registrar gasto' })
    @UsePipes(new ValidationPipe({ transform: true }))
    @ApiResponse({
        status: 200,
        description: 'Registro de gasto exitoso',
        type: ResponseDTO,
    })
    async registerExpense(@Body() expense: ExpenseDTO): Promise<ResponseDTO> {
        return await this.movementsFinancialService.registerExpense(expense);
    }
}