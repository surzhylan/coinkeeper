import {v4 as uuidv4} from "uuid";
import {IncomeSource} from "./IncomeSource";
export class IncomeTransaction {
    incomeSource: IncomeSource
    amount: number
    comment: string

    constructor(source: IncomeSource, amount: number, comment: string) {
        this.id = uuidv4()
        this.incomeSource = source
        this.amount = amount
        this.comment = comment
    }
}