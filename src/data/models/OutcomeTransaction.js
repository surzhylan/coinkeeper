import {v4 as uuidv4} from "uuid";

export class OutcomeTransaction {
    amount: number
    spendingType: SpendingType;
    comment: string

    constructor(amount: Number, spendingType: SpendingType, comment: string) {
        this.id = uuidv4()
        this.amount = amount
        this.spendingType = spendingType
        this.comment = comment
    }
}