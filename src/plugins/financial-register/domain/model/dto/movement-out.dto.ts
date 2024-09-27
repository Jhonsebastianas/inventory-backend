import { ExpenseDTO } from "./expense.dto";
import { IncomeDTO } from "./income.dto";

export class MovementOutDTO {
    id: string;
    month: string;
    year: string;
    income: IncomeDTO[];
    expenses: ExpenseDTO[];
    totalIncome: number;
    totalExpenses: number;
    balance: number;
}