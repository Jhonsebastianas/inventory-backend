import { FinancialServiceImpl } from "@financial-register/application/financial-service.impl";
import { Controller, Get, Param } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";

// Consumir el método en un controlador
@Controller('financial')
@ApiTags('financial')
export class FinancialController {
  constructor(private readonly financialService: FinancialServiceImpl) {}

  @Get(':range/:date')
  async getFinancialStates(
    @Param('range') range: 'day' | 'week' | 'month' | 'year',
    @Param('date') date: string,
  ) {
    const parsedDate = new Date(date); // Parsear la fecha de los parámetros
    return this.financialService.getFinancialStates(range, parsedDate);
  }
}
