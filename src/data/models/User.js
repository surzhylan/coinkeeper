import {v4 as uuidv4} from "uuid";
import {IncomeSource} from "./IncomeSource";
import {Account} from "./Account";

export class User {
    name: string
    email: string
    private password: string
    incomeList: Array<IncomeSource>
    accountList: Array<Account>

    constructor(email, name, password) {
        this.id = uuidv4()
        this.email = email
        this.name = name
        this.password = password
    }

    addIncome(income: IncomeSource) {
        this.incomeList.push(income)
    }

    addAccount(account: Account) {
        this.accountList.push(account)
    }

    deleteIncome(incomeId: string) {
        return this.incomeList.find(e => e.id === incomeId)
    }

    deleteAccount(accountId: string) {
        return this.accountList.find(e => e.id === accountId)
    }
}