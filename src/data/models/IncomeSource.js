//Todo: Add per period
import {v4 as uuidv4} from "uuid";

export class IncomeSource {
    constructor(title: string, receiveAmount: number) {
        this.id = uuidv4()
        this.title = title
        this.receiveAmount = receiveAmount
    }
}