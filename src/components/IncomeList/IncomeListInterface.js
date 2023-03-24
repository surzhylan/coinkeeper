import {IncomeSource} from "../../data/models/IncomeSource";
import {IncomeTransaction} from "../../data/models/IncomeTransaction";

export interface IncomeListInterface {
        incomeSourceList: Array[IncomeSource]
        incomeTransactions: Array[IncomeTransaction]
        addIncome: any
        deleteIncome: any
        changeIncome: any
}