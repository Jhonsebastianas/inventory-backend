import { ResponseDTO, ResponseDtoBuilder } from "@core/domain/response.dto";
import { MovementsFinancial } from "@financial-register/domain/model/document/movements-financial.document";
import { ExpenseDTO } from "@financial-register/domain/model/dto/expense.dto";
import { IncomeDTO } from "@financial-register/domain/model/dto/income.dto";
import { MovementsFinancialService } from "@financial-register/domain/service/movements-financial.service";
import { Injectable } from "@nestjs/common";
import { MovementsFinancialRepositoryImpl } from "./movements-financial-repository.impl";
import { FzUtil } from "@core/util/fz-util";
import { UserSessionServiceImpl } from "@login/application/user-session-service.impl";
import { UserMapper } from "@user/domain/repository/internal/mapper/user.mapper";
import { MovementOutDTO } from "@financial-register/domain/model/dto/movement-out.dto";
import { MovementsFinancialMapper } from "@financial-register/domain/repository/mapper/movements-financial.mapper";

@Injectable()
export class MovementsFinancialServiceImpl implements MovementsFinancialService {

    constructor(
        private movementsFinancialRepository: MovementsFinancialRepositoryImpl,
        private userSessionService: UserSessionServiceImpl,
    ) {}
    async findByMonthAndYearAndUser(month: string, year: string, idUser: string): Promise<MovementOutDTO> {
        return MovementsFinancialMapper.mapToMovementDTO(await this.movementsFinancialRepository.findByMonthAndYearAndUser(month, year, idUser));
    }

    async registerIncome(income: IncomeDTO): Promise<ResponseDTO> {
        const currentDate = FzUtil.getCurrentDate();
        const month: string = FzUtil.getMonthOfDate(currentDate).toString();
        const year = FzUtil.getYearOfDate(currentDate).toString();
        const userId: string = await this.userSessionService.getIdUser();
        let currentMovement: MovementsFinancial = await this.movementsFinancialRepository.findByMonthAndYearAndUser(month, year, userId);
        income.createAt = FzUtil.getCurrentDate();

        if (!currentMovement) {
            currentMovement = new MovementsFinancial();
            currentMovement.user = UserMapper.mapToUser(await this.userSessionService.getInfoUser())._id;
            currentMovement.month = month;
            currentMovement.year = year;
            currentMovement.expenses = [];
            currentMovement.totalExpenses = 0;
            currentMovement.totalIncome = 0; 
            currentMovement.balance = 0;
            currentMovement.income = [];
            currentMovement = await this.movementsFinancialRepository.save(currentMovement);
        }
        income.id = currentMovement.income.length + 1;
        currentMovement.income.push(income);
        currentMovement.balance += income.value;
        currentMovement.totalIncome += income.value;
        currentMovement = await this.movementsFinancialRepository.update(currentMovement);
        return new ResponseDtoBuilder().created(MovementsFinancialMapper.mapToMovementDTO(currentMovement)).build();
    }

    async registerExpense(expense: ExpenseDTO): Promise<ResponseDTO> {
        const currentDate = FzUtil.getCurrentDate();
        const month: string = FzUtil.getMonthOfDate(currentDate).toString();
        const year = FzUtil.getYearOfDate(currentDate).toString();
        const userId: string = await this.userSessionService.getIdUser();
        let currentMovement: MovementsFinancial = await this.movementsFinancialRepository.findByMonthAndYearAndUser(month, year, userId);
        expense.createAt = FzUtil.getCurrentDate();

        if (!currentMovement) {
            currentMovement = new MovementsFinancial();
            currentMovement.user = UserMapper.mapToUser(await this.userSessionService.getInfoUser())._id;
            currentMovement.month = month;
            currentMovement.year = year;
            currentMovement.expenses = [];
            currentMovement.totalExpenses = 0;
            currentMovement.totalIncome = 0; 
            currentMovement.balance = 0;
            currentMovement.income = [];
            currentMovement = await this.movementsFinancialRepository.save(currentMovement);
        }

        expense.id = currentMovement.expenses.length + 1;
        currentMovement.expenses.push(expense);
        currentMovement.balance -= expense.value;
        currentMovement.totalExpenses += expense.value;
        currentMovement = await this.movementsFinancialRepository.update(currentMovement);
        return new ResponseDtoBuilder().created(MovementsFinancialMapper.mapToMovementDTO(currentMovement)).build();
    }
    
    async getCurrentMovements(): Promise<MovementsFinancial> {
        throw new Error("Method not implemented.");
    }

}