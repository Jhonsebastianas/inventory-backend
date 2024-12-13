// src/financial/dto/financial-response.dto.ts

export class FinancialResponseDto {
    totalRevenue: number;
    totalProfit: number;
  
    constructor(totalRevenue: number, totalProfit: number) {
      this.totalRevenue = totalRevenue;
      this.totalProfit = totalProfit;
    }
  }
  