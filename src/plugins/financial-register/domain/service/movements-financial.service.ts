import { ResponseDTO } from "@core/domain/response.dto";
import { IncomeDTO } from "../model/dto/income.dto";
import { ExpenseDTO } from "../model/dto/expense.dto";
import { MovementsFinancial } from "../model/document/movements-financial.document";
import { MovementOutDTO } from "../model/dto/movement-out.dto";

export interface MovementsFinancialService {

    /**
     * Register a income of user.
     * Created on 26/04/2024 at 15:18:38. <br>
     * 
     * @param income income information.
     */
    registerIncome(income: IncomeDTO): Promise<ResponseDTO>;

    /**
     * Registar a expense of user.
     * Created on 26/04/2024 at 15:19:49. <br>
     * 
     * @param expense expense information.
     */
    registerExpense(expense: ExpenseDTO): Promise<ResponseDTO>;

    /**
     * get current movements of user.
     */
    getCurrentMovements(): Promise<MovementsFinancial>;


    /**
     * find movements of user by month and year
     * Created on 26/04/2024 at 15:13:06. <br>
     * 
     * @param month month of movements
     * @param year year of movements
     * @param idUser id user
     */
    findByMonthAndYearAndUser(month: string, year: string, idUser: string): Promise<MovementOutDTO>;
}