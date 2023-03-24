//Todo: Add per period
import {v4 as uuidv4} from "uuid";
import {IncomeTransaction} from "./IncomeTransaction";

export class IncomeSource {
    constructor(title: string, incomeAmount: number) {
        this.id = uuidv4()
        this.title = title
        this.plannedIncome = incomeAmount
    }
}