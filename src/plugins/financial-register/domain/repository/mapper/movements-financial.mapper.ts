import { MovementsFinancial } from "@financial-register/domain/model/document/movements-financial.document";
import { MovementOutDTO } from "@financial-register/domain/model/dto/movement-out.dto";

export class MovementsFinancialMapper {

    static mapToMovementDTO(movementsFinancial: MovementsFinancial): MovementOutDTO {
        if (movementsFinancial == null) {
            return null;
        }
        const movement = new MovementOutDTO();
        movement.id = movementsFinancial._id.toString();
        movement.balance = movementsFinancial.balance;
        movement.expenses = movementsFinancial.expenses;
        movement.income = movementsFinancial.income;
        movement.month = movementsFinancial.month;
        movement.totalExpenses = movementsFinancial.totalExpenses;
        movement.totalIncome = movementsFinancial.totalIncome;
        movement.year = movementsFinancial.year;
        return movement;
    }

}  