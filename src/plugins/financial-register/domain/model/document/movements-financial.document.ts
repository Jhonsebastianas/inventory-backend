import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Types } from "mongoose";
import { IncomeDTO } from "../dto/income.dto";
import { ExpenseDTO } from "../dto/expense.dto";
import { User } from "@user/domain/model/document/user.document";

@Schema({ collection: "movements_financial" })
export class MovementsFinancial {
    
    _id: Types.ObjectId;

    @Prop({ type: Types.ObjectId, ref: 'users', required: true })
    user: Types.ObjectId;

    @Prop({ required: true })
    month: string;

    @Prop({ required: true })
    year: string;

    @Prop()
    income: IncomeDTO[];

    @Prop()
    expenses: ExpenseDTO[];

    @Prop()
    totalIncome: number;

    @Prop()
    totalExpenses: number;

    @Prop()
    balance: number;
}

export const MovementsFinancialSchema = SchemaFactory.createForClass(MovementsFinancial);
export type MovementsFinancialDocument = MovementsFinancial & Document;