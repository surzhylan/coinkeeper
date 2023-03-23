/**
 @param transactionHistory {Array[Transaction]}
 @param title {string}
 @param balance {number}
 */
import {v4 as uuidv4} from "uuid";
import {OutcomeTransaction} from "./OutcomeTransaction";
import {IncomeTransaction} from "./IncomeTransaction";
import {IncomeSource} from "./IncomeSource";
import SpendingType from "./SpendingType";

//Todo: Add getStatistic()
export class Account {
    id: string
    private incomeTransactions: Array[IncomeTransaction] = []
    private outcomeTransactions: Array[OutcomeTransaction] = []

    title: String
    balance: Number

    constructor(title, balance,) {
        this.id = uuidv4()
        this.title = title
        this.balance = balance
    }

    getTotalIncome() {
        let total = 0
        for (const t: IncomeTransaction of this.incomeTransactions) {
            total += t.amount
        }
        return total
    }

    getTotalOutcome() {
        let total = 0
        for (const t: OutcomeTransaction of this.outcomeTransactions) {
            total += t.amount
        }
        return total
    }

    replenish(amount: number, source: IncomeSource) {
        this.balance += amount
        this.incomeTransactions.push(new IncomeTransaction(source, amount))
    }

    withdraw(amount: number, spendingType: SpendingType) {
        this.balance -= amount
        this.outcomeTransactions.push(new OutcomeTransaction(amount, spendingType))
    }

    changeBalance(newBalance: number) {
        this.balance = newBalance
    }
}